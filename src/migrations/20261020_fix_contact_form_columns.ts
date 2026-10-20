import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

const RENAMES: [string, string][] = [
  ["form_name_label_en", "form_namelabel_en"],
  ["form_name_label_ar", "form_namelabel_ar"],
  ["form_email_label_en", "form_emaillabel_en"],
  ["form_email_label_ar", "form_emaillabel_ar"],
  ["form_subject_label_en", "form_subjectlabel_en"],
  ["form_subject_label_ar", "form_subjectlabel_ar"],
  ["form_message_label_en", "form_messagelabel_en"],
  ["form_message_label_ar", "form_messagelabel_ar"],
  ["form_submit_label_en", "form_submitlabel_en"],
  ["form_submit_label_ar", "form_submitlabel_ar"],
  ["form_success_title_en", "form_successtitle_en"],
  ["form_success_title_ar", "form_successtitle_ar"],
  ["form_success_message_en", "form_successmessage_en"],
  ["form_success_message_ar", "form_successmessage_ar"],
];

/** Align contact form columns with Payload camelCase flattening (nameLabel → namelabel). */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [from, to] of RENAMES) {
    await db.execute(sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'contact' AND column_name = '${from}'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'contact' AND column_name = '${to}'
        ) THEN
          ALTER TABLE "contact" RENAME COLUMN "${from}" TO "${to}";
        END IF;
      END $$;
    `));
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const [from, to] of RENAMES) {
    await db.execute(sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'contact' AND column_name = '${to}'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'contact' AND column_name = '${from}'
        ) THEN
          ALTER TABLE "contact" RENAME COLUMN "${to}" TO "${from}";
        END IF;
      END $$;
    `));
  }
}
