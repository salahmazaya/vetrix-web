import fs from "fs";

const HOME_REMAP = {
  meet_ve_generate_label: "meet_ve_generatelabel",
  meet_ve_chips_title: "meet_ve_chipstitle",
  about_access_label: "about_accesslabel",
  process_tools_title: "process_toolstitle",
};

const GLOBALS = new Set(["home", "header", "ai_core", "about", "solutions", "contact", "faq", "cta", "footer"]);

const s = fs.readFileSync("src/migrations/20261019_190500_localized_fields.ts", "utf8");
const re = /CREATE TABLE \\"([^\\"]+_locales)\\" \(([\s\S]*?)\);/g;
const specs = [];
for (const m of s.matchAll(re)) {
  const cols = [...m[2].matchAll(/\\"([a-z_]+)\\" varchar/g)]
    .map((c) => c[1])
    .filter((c) => c !== "id" && c !== "_parent_id");
  specs.push({ parent: m[1].replace(/_locales$/, ""), locales: m[1], cols });
}

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

const statements = [];

for (const { parent, locales, cols } of specs) {
  if (parent === "media") continue;
  for (const col of cols) {
    const base = targetBase(parent, col);
    statements.push(`ALTER TABLE "${parent}" ADD COLUMN IF NOT EXISTS "${base}_en" varchar;`);
    statements.push(`ALTER TABLE "${parent}" ADD COLUMN IF NOT EXISTS "${base}_ar" varchar;`);
  }
}

for (const { parent, locales, cols } of specs) {
  if (parent === "media") continue;
  const join = `l."_parent_id" = p."id"`;
  for (const col of cols) {
    const base = targetBase(parent, col);
    statements.push(
      `UPDATE "${parent}" AS p SET "${base}_en" = l."${col}" FROM "${locales}" AS l WHERE ${join} AND l."_locale" = 'en';`,
    );
    statements.push(
      `UPDATE "${parent}" AS p SET "${base}_ar" = l."${col}" FROM "${locales}" AS l WHERE ${join} AND l."_locale" = 'ar';`,
    );
  }
}

const stmtsJson = JSON.stringify(statements, null, 2);

const body = `import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

const STATEMENTS: string[] = ${stmtsJson};

/** Add \`*_en\` / \`*_ar\` columns and copy from existing \`*_locales\` rows (no data deleted). */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const statement of STATEMENTS) {
    await db.execute(sql.raw(statement));
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Intentionally empty — keeps locale tables and column data for rollback by hand if needed.
}
`;

fs.writeFileSync("src/migrations/20261020_bilingual_en_ar_from_locales.ts", body);
console.log("Wrote migration with", statements.length, "statements (batched loop)");
