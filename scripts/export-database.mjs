// Saves all the site's content into one folder that can be moved to another server:
//   vetrix-export/database.sql   every row from the database (pages, images list, messages, admin users)
//   vetrix-export/media/         the uploaded image files
// Zip the folder and hand it over; the other side runs `npm run db:import` (see DEPLOY.md).
//
// Usage: npm run db:export   (reads DATABASE_URL from .env)

import fs from "node:fs";
import path from "node:path";
import pg from "pg";

if (!process.env.DATABASE_URL && fs.existsSync(".env")) process.loadEnvFile(".env");
if (!process.env.DATABASE_URL) {
  console.error("Set DATABASE_URL to the database to export.");
  process.exit(1);
}

const OUT = path.resolve("vetrix-export");
// Migration bookkeeping belongs to each database, so it is not copied
const SKIP = new Set(["payload_migrations"]);

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  const tables = (
    await client.query(
      "select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE'",
    )
  ).rows
    .map((r) => r.table_name)
    .filter((t) => !SKIP.has(t));

  // Parents before children, so foreign keys are satisfied while importing
  const deps = new Map(tables.map((t) => [t, new Set()]));
  const fks = await client.query(`
    select tc.table_name as child, ccu.table_name as parent
    from information_schema.table_constraints tc
    join information_schema.constraint_column_usage ccu on tc.constraint_name = ccu.constraint_name
    where tc.constraint_type = 'FOREIGN KEY' and tc.table_schema = 'public'`);
  for (const { child, parent } of fks.rows) if (child !== parent && deps.has(child) && deps.has(parent)) deps.get(child).add(parent);
  const ordered = [];
  const seen = new Set();
  const visit = (t, stack = new Set()) => {
    if (seen.has(t) || stack.has(t)) return;
    stack.add(t);
    for (const p of deps.get(t)) visit(p, stack);
    seen.add(t);
    ordered.push(t);
  };
  tables.sort().forEach((t) => visit(t));

  const lines = ["-- Vetrix content export", `-- ${new Date().toISOString()}`, "BEGIN;"];
  let total = 0;
  for (const t of ordered) {
    const { rows } = await client.query(`select coalesce(json_agg(x), '[]'::json) as data, count(*)::int as n from "${t}" x`);
    if (!rows[0].n) continue;
    total += rows[0].n;
    const json = JSON.stringify(rows[0].data);
    lines.push(`INSERT INTO "${t}" SELECT * FROM json_populate_recordset(NULL::"${t}", ${client.escapeLiteral(json)});`);
  }
  // Keep id counters ahead of the copied rows
  const seqs = await client.query(`
    select c.table_name, c.column_name, pg_get_serial_sequence(format('%I', c.table_name), c.column_name) as seq
    from information_schema.columns c
    where c.table_schema = 'public' and c.column_default like 'nextval%'`);
  for (const s of seqs.rows) {
    if (!s.seq || SKIP.has(s.table_name)) continue;
    lines.push(
      `SELECT setval('${s.seq}', COALESCE((SELECT MAX("${s.column_name}") FROM "${s.table_name}"), 0) + 1, false);`,
    );
  }
  lines.push("COMMIT;", "");

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "database.sql"), lines.join("\n"));
  const media = path.resolve("media");
  const files = fs.existsSync(media) ? fs.readdirSync(media) : [];
  if (files.length) fs.cpSync(media, path.join(OUT, "media"), { recursive: true });

  console.log(`Exported ${total} rows from ${ordered.length} tables and ${files.length} image files.`);
  console.log(`Folder: ${OUT}\nZip it and send it over.`);
} finally {
  await client.end();
}
