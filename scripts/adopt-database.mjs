// Prepares a database that was built by `npm run dev` (which syncs the schema directly) to be used in
// production, where the schema is managed by the migrations in src/migrations.
//
// It marks every existing migration as already applied, so production starts without trying to
// create tables that are already there. Content is not touched.
//
// Usage: DATABASE_URL=... npm run db:adopt   (or put DATABASE_URL in .env)

import fs from "node:fs";
import path from "node:path";
import pg from "pg";

if (!process.env.DATABASE_URL && fs.existsSync(".env")) process.loadEnvFile(".env");
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Set DATABASE_URL to the database to prepare.");
  process.exit(1);
}

const names = fs
  .readdirSync(path.resolve("src/migrations"))
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  const { rows } = await client.query("select to_regclass('public.messages') as t, to_regclass('public.payload_migrations') as m");
  if (!rows[0].t || !rows[0].m) {
    console.error("This database doesn't have the latest tables. Run `npm run dev` against it once, then try again.");
    process.exit(1);
  }
  await client.query("begin");
  await client.query("delete from payload_migrations where name = 'dev'");
  const done = new Set((await client.query("select name from payload_migrations")).rows.map((r) => r.name));
  for (const name of names.filter((n) => !done.has(n))) {
    await client.query("insert into payload_migrations (name, batch) values ($1, 1)", [name]);
    console.log(`Marked as applied: ${name}`);
  }
  await client.query("commit");
  console.log("Done. This database is ready for production.");
} catch (err) {
  await client.query("rollback").catch(() => {});
  throw err;
} finally {
  await client.end();
}
