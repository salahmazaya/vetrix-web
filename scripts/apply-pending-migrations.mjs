/**
 * Applies 20261020_* migrations statement-by-statement (Neon-safe, resumable).
 * Run: node scripts/apply-pending-migrations.mjs
 */
import fs from "fs";
import path from "path";
import pg from "pg";

const HOME_REMAP = {
  meet_ve_generate_label: "meet_ve_generatelabel",
  meet_ve_chips_title: "meet_ve_chipstitle",
  about_access_label: "about_accesslabel",
  process_tools_title: "process_toolstitle",
};

const CONTACT_REMAP = {
  form_name_label: "form_namelabel",
  form_email_label: "form_emaillabel",
  form_subject_label: "form_subjectlabel",
  form_message_label: "form_messagelabel",
  form_submit_label: "form_submitlabel",
  form_success_title: "form_successtitle",
  form_success_message: "form_successmessage",
};

function targetBase(parent, localeCol) {
  if (parent === "home" && HOME_REMAP[localeCol]) return HOME_REMAP[localeCol];
  if (parent === "contact" && CONTACT_REMAP[localeCol]) return CONTACT_REMAP[localeCol];
  return localeCol;
}

function buildLocaleStatements() {
  const s = fs.readFileSync("src/migrations/20261019_190500_localized_fields.ts", "utf8");
  const re = /CREATE TABLE \\"([^\\"]+_locales)\\" \(([\s\S]*?)\);/g;
  const specs = [];
  for (const m of s.matchAll(re)) {
    const cols = [...m[2].matchAll(/\\"([a-z_]+)\\" varchar/g)]
      .map((c) => c[1])
      .filter((c) => c !== "id" && c !== "_parent_id");
    specs.push({ parent: m[1].replace(/_locales$/, ""), locales: m[1], cols });
  }
  const statements = [];
  for (const { parent, cols } of specs) {
    if (parent === "media") continue;
    for (const col of cols) {
      const base = targetBase(parent, col);
      statements.push(`ALTER TABLE "${parent}" ADD COLUMN IF NOT EXISTS "${base}_en" varchar`);
      statements.push(`ALTER TABLE "${parent}" ADD COLUMN IF NOT EXISTS "${base}_ar" varchar`);
    }
  }
  for (const { parent, locales, cols } of specs) {
    if (parent === "media") continue;
    for (const col of cols) {
      const base = targetBase(parent, col);
      statements.push(
        `UPDATE "${parent}" AS p SET "${base}_en" = l."${col}" FROM "${locales}" AS l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en'`,
      );
      statements.push(
        `UPDATE "${parent}" AS p SET "${base}_ar" = l."${col}" FROM "${locales}" AS l WHERE l."_parent_id" = p."id" AND l."_locale" = 'ar'`,
      );
    }
  }
  return statements;
}

const MEDIA_STATEMENTS = [
  `ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "alt_en" varchar`,
  `ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "alt_ar" varchar`,
  `UPDATE "media" AS m SET "alt_en" = l."alt" FROM "media_locales" AS l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en'`,
  `UPDATE "media" AS m SET "alt_ar" = l."alt" FROM "media_locales" AS l WHERE l."_parent_id" = m."id" AND l."_locale" = 'ar'`,
];

const env = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
const match = env.match(/^DATABASE_URL=(.+)$/m);
if (!match) throw new Error("DATABASE_URL missing");
let url = match[1].trim();
if (/sslmode=(prefer|require|verify-ca)/.test(url)) {
  url = url.replace(/sslmode=(prefer|require|verify-ca)/, "sslmode=verify-full");
}

const client = new pg.Client({ connectionString: url });
await client.connect();

async function ran(name) {
  const r = await client.query(`SELECT 1 FROM payload_migrations WHERE name = $1`, [name]);
  return r.rowCount > 0;
}

async function mark(name) {
  const batch =
    (await client.query(`SELECT COALESCE(MAX(batch), 0) + 1 AS b FROM payload_migrations`)).rows[0].b;
  await client.query(
    `INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ($1, $2, now(), now())`,
    [name, batch],
  );
}

async function runSet(name, statements) {
  if (await ran(name)) {
    console.log("skip:", name);
    return;
  }
  console.log("start:", name, `(${statements.length} statements)`);
  let i = 0;
  for (const sql of statements) {
    i++;
    try {
      await client.query(sql);
    } catch (err) {
      console.error(`failed at ${i}/${statements.length}:`, sql.slice(0, 120));
      throw err;
    }
    if (i % 50 === 0) console.log(`  … ${i}/${statements.length}`);
  }
  await mark(name);
  console.log("done:", name);
}

await runSet("20261020_media_alt_en_ar", MEDIA_STATEMENTS);
await runSet("20261020_bilingual_en_ar_from_locales", buildLocaleStatements());

await client.end();
console.log("Finished.");
