import fs from "fs";
import path from "path";
import pg from "pg";

const env = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
const url = env.match(/^DATABASE_URL=(.+)$/m)[1].trim().replace("sslmode=require", "sslmode=verify-full");
const c = new pg.Client({ connectionString: url });
await c.connect();
const r = await c.query(`SELECT eyebrow_en, title_en FROM cta LIMIT 1`);
console.log("cta sample:", r.rows[0]);
await c.end();
