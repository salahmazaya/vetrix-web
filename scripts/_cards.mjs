import fs from "node:fs";
import pg from "pg";

const text = fs.readFileSync(".env", "utf8");
const line = text.split(/\r?\n/).find((entry) => entry.startsWith("DATABASE_URL="));
const connectionString = line.slice("DATABASE_URL=".length).trim().replace(/^['"]|['"]$/g, "");
const client = new pg.Client({ connectionString, connectionTimeoutMillis: 15000 });
await client.connect();

const cards = await client.query(`
  select c._order, c.title, c.image_id, m.filename, m.url, m.width, m.height
  from home_scale_cards c
  left join media m on m.id = c.image_id
  order by c._order
`);
console.log("CARDS");
for (const row of cards.rows) console.log(JSON.stringify(row));

const media = await client.query(`
  select id, filename, url from media where filename ilike '%card-assistant%' or filename ilike '%card-phone%' or filename ilike '%card-integrations%'
`);
console.log("MEDIA");
for (const row of media.rows) console.log(JSON.stringify(row));

const cols = await client.query(`
  select column_name from information_schema.columns
  where table_name = 'home_scale_cards' order by ordinal_position
`);
console.log("COLS", cols.rows.map((row) => row.column_name).join(", "));

await client.end();
