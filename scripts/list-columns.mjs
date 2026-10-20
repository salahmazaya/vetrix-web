import pg from "pg";
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env");
const env = fs.readFileSync(envPath, "utf8");
const match = env.match(/^DATABASE_URL=(.+)$/m);
if (!match) throw new Error("DATABASE_URL missing");
const url = match[1].trim();

const c = new pg.Client({ connectionString: url });
await c.connect();
for (const t of ["home", "home_meet_ve_heart_features", "contact", "header", "cta"]) {
  const r = await c.query(
    `select column_name from information_schema.columns where table_schema='public' and table_name=$1 order by 1`,
    [t],
  );
  console.log(t + ":", r.rows.map((x) => x.column_name).join(", "));
}
await c.end();
