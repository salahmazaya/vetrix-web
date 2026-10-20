import fs from "fs";
import path from "path";
import pg from "pg";

const name = process.argv[2];
if (!name) throw new Error("Usage: node scripts/mark-migration-ran.mjs <migration_name>");

const env = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
let url = env.match(/^DATABASE_URL=(.+)$/m)[1].trim().replace("sslmode=require", "sslmode=verify-full");
const client = new pg.Client({ connectionString: url });
await client.connect();
const batch = Number(
  (await client.query(`SELECT COALESCE(MAX(batch), 0) + 1 AS b FROM payload_migrations`)).rows[0].b,
);
await client.query(
  `INSERT INTO payload_migrations (name, batch, created_at, updated_at)
   SELECT $1::varchar, $2::numeric, now(), now()
   WHERE NOT EXISTS (SELECT 1 FROM payload_migrations WHERE name = $1)`,
  [name, batch],
);
await client.end();
console.log("marked:", name);
