import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" varchar NOT NULL,
      "title_en" varchar,
      "title_ar" varchar,
      "headline_en" varchar,
      "headline_ar" varchar,
      "intro_en" varchar,
      "intro_ar" varchar,
      "content_en" varchar,
      "content_ar" varchar,
      "enabled" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "site_pages_slug_idx" ON "site_pages" ("slug");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_pages" CASCADE;
  `);
}
