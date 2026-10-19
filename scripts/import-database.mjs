// Loads a folder made by `npm run db:export` into this server's database and media folder.
// The database must be new: run `npm run payload migrate` first to create the empty tables.
//
// Usage: npm run db:import -- <path to vetrix-export folder>   (reads DATABASE_URL from .env)

import fs from "node:fs";
import path from "node:path";
import pg from "pg";

if (!process.env.DATABASE_URL && fs.existsSync(".env")) process.loadEnvFile(".env");
const dir = path.resolve(process.argv[2] ?? "vetrix-export");
const sqlFile = path.join(dir, "database.sql");
if (!process.env.DATABASE_URL) {
  console.error("Set DATABASE_URL to the database to fill.");
  process.exit(1);
}
if (!fs.existsSync(sqlFile)) {
  console.error(`Can't find ${sqlFile}. Pass the unzipped export folder, e.g. npm run db:import -- ./vetrix-export`);
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  const { rows } = await client.query("select to_regclass('public.home') as home, to_regclass('public.payload_migrations') as mig");
  if (!rows[0].home || !rows[0].mig) {
    console.error("The tables don't exist yet. Run `npm run payload migrate` first, then import again.");
    process.exit(1);
  }
  const filled = await client.query("select count(*)::int as n from home");
  if (filled.rows[0].n) {
    console.error("This database already has content. Import only into a new, empty database.");
    process.exit(1);
  }
  await client.query(fs.readFileSync(sqlFile, "utf8"));
  console.log("Database content imported.");
} finally {
  await client.end();
}

const media = path.join(dir, "media");
if (fs.existsSync(media)) {
  fs.cpSync(media, path.resolve("media"), { recursive: true });
  console.log(`Copied ${fs.readdirSync(media).length} image files into ./media`);
}
