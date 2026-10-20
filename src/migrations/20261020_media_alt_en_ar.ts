import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

/** Copy existing locale rows into explicit `alt_en` / `alt_ar` on media. Keeps `media_locales` until schema drop. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "alt_en" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "alt_ar" varchar;
  `);
  await db.execute(sql`
    UPDATE "media" AS m
    SET "alt_en" = l."alt"
    FROM "media_locales" AS l
    WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
  `);
  await db.execute(sql`
    UPDATE "media" AS m
    SET "alt_ar" = l."alt"
    FROM "media_locales" AS l
    WHERE l."_parent_id" = m."id" AND l."_locale" = 'ar';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "alt_en";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "alt_ar";
  `);
}
