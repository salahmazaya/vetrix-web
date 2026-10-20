import fs from "fs";
import path from "path";
import pg from "pg";

const env = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
const match = env.match(/^DATABASE_URL=(.+)$/m);
if (!match) throw new Error("DATABASE_URL missing");
let url = match[1].trim();
if (url.includes("sslmode=require") && !url.includes("verify-full")) {
  url = url.replace("sslmode=require", "sslmode=verify-full");
}

const { up: mediaUp } = await import("../src/migrations/20261020_media_alt_en_ar.ts");
const { up: localesUp } = await import("../src/migrations/20261020_bilingual_en_ar_from_locales.ts");

/** Minimal drizzle-like adapter for migration `up` functions */
function dbAdapter(client) {
  return {
    execute: async (query) => {
      if (query?.queryChunks) {
        const text = query.queryChunks.join("");
        await client.query(text);
        return;
      }
      if (typeof query === "string") {
        await client.query(query);
        return;
      }
      throw new Error("Unknown query shape");
    },
  };
}

async function markRan(client, name, batch) {
  await client.query(
    `INSERT INTO payload_migrations (name, batch, created_at, updated_at)
     SELECT $1, $2, now(), now()
     WHERE NOT EXISTS (SELECT 1 FROM payload_migrations WHERE name = $1)`,
    [name, batch],
  );
}

async function alreadyRan(client, name) {
  const r = await client.query(`SELECT 1 FROM payload_migrations WHERE name = $1`, [name]);
  return r.rowCount > 0;
}

const client = new pg.Client({ connectionString: url });
await client.connect();

const batch = (
  await client.query(`SELECT COALESCE(MAX(batch), 0) + 1 AS b FROM payload_migrations`)
).rows[0].b;

for (const [name, up] of [
  ["20261020_media_alt_en_ar", mediaUp],
  ["20261020_bilingual_en_ar_from_locales", localesUp],
]) {
  if (await alreadyRan(client, name)) {
    console.log("skip (already ran):", name);
    continue;
  }
  console.log("running:", name);
  await up({ db: dbAdapter(client) });
  await markRan(client, name, batch);
  console.log("done:", name);
}

await client.end();
console.log("All pending migrations applied.");
