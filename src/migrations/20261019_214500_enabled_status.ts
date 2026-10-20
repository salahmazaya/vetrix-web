import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    UPDATE "users" SET "enabled" = true WHERE "enabled" IS NULL;
    UPDATE "media" SET "enabled" = true WHERE "enabled" IS NULL;
    UPDATE "messages" SET "enabled" = true WHERE "enabled" IS NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "messages" DROP COLUMN IF EXISTS "enabled";
  `);
}
