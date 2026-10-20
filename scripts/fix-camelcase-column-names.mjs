/**
 * Payload flattens camelCase fields (e.g. form.nameLabel → form_namelabel_en).
 * Locale tables used snake names (form_name_label) — rename columns to match Payload.
 */
import fs from "fs";
import path from "path";
import pg from "pg";

const RENAMES = [
  // contact.form
  ["contact", "form_name_label_en", "form_namelabel_en"],
  ["contact", "form_name_label_ar", "form_namelabel_ar"],
  ["contact", "form_email_label_en", "form_emaillabel_en"],
  ["contact", "form_email_label_ar", "form_emaillabel_ar"],
  ["contact", "form_subject_label_en", "form_subjectlabel_en"],
  ["contact", "form_subject_label_ar", "form_subjectlabel_ar"],
  ["contact", "form_message_label_en", "form_messagelabel_en"],
  ["contact", "form_message_label_ar", "form_messagelabel_ar"],
  ["contact", "form_submit_label_en", "form_submitlabel_en"],
  ["contact", "form_submit_label_ar", "form_submitlabel_ar"],
  ["contact", "form_success_title_en", "form_successtitle_en"],
  ["contact", "form_success_title_ar", "form_successtitle_ar"],
  ["contact", "form_success_message_en", "form_successmessage_en"],
  ["contact", "form_success_message_ar", "form_successmessage_ar"],
];

const env = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
let url = env.match(/^DATABASE_URL=(.+)$/m)[1].trim();
url = url.replace(/sslmode=(prefer|require|verify-ca)/, "sslmode=verify-full");

const client = new pg.Client({ connectionString: url });
await client.connect();

for (const [table, from, to] of RENAMES) {
  const exists = await client.query(
    `SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name=$1 AND column_name=$2`,
    [table, from],
  );
  if (!exists.rowCount) {
    console.log("skip (no column):", table, from);
    continue;
  }
  const targetExists = await client.query(
    `SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name=$1 AND column_name=$2`,
    [table, to],
  );
  if (targetExists.rowCount) {
    console.log("skip (target exists):", table, to);
    continue;
  }
  await client.query(`ALTER TABLE "${table}" RENAME COLUMN "${from}" TO "${to}"`);
  console.log("renamed:", table, from, "→", to);
}

await client.end();
console.log("Done.");
