import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_socials_platform" AS ENUM('facebook', 'instagram', 'x', 'linkedin');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"messages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_label" varchar NOT NULL,
  	"button_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_meet_ve_heart_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "home_about_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "home_about_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"color" varchar NOT NULL
  );
  
  CREATE TABLE "home_edge_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "home_process_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_process_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_process_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "home_process_reef_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_process_groups_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "home_process_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_impact_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_scale_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"hero_primary_button_label" varchar NOT NULL,
  	"hero_primary_button_href" varchar NOT NULL,
  	"hero_secondary_button_label" varchar NOT NULL,
  	"hero_secondary_button_href" varchar NOT NULL,
  	"meet_ve_eyebrow" varchar NOT NULL,
  	"meet_ve_title" varchar NOT NULL,
  	"meet_ve_description" varchar,
  	"meet_ve_intro_card_title" varchar NOT NULL,
  	"meet_ve_intro_card_highlight" varchar,
  	"meet_ve_intro_card_caption" varchar,
  	"meet_ve_trusted_card_label" varchar NOT NULL,
  	"meet_ve_trusted_card_value" varchar NOT NULL,
  	"meet_ve_trusted_card_caption" varchar NOT NULL,
  	"meet_ve_trusted_card_avatars_id" integer NOT NULL,
  	"meet_ve_generate_label" varchar NOT NULL,
  	"meet_ve_stat_card_value" varchar NOT NULL,
  	"meet_ve_stat_card_label" varchar NOT NULL,
  	"meet_ve_chips_title" varchar NOT NULL,
  	"meet_ve_heart_title" varchar NOT NULL,
  	"about_eyebrow" varchar NOT NULL,
  	"about_button_label" varchar NOT NULL,
  	"about_button_href" varchar NOT NULL,
  	"about_access_label" varchar NOT NULL,
  	"edge_eyebrow" varchar NOT NULL,
  	"edge_title" varchar NOT NULL,
  	"edge_description" varchar,
  	"process_eyebrow" varchar NOT NULL,
  	"process_title" varchar NOT NULL,
  	"process_description" varchar,
  	"process_reef_title" varchar NOT NULL,
  	"process_tools_title" varchar NOT NULL,
  	"impact_eyebrow" varchar NOT NULL,
  	"impact_title" varchar NOT NULL,
  	"impact_description" varchar,
  	"scale_eyebrow" varchar NOT NULL,
  	"scale_title" varchar NOT NULL,
  	"scale_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ai_core_numbers_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "ai_core_features_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "ai_core_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "ai_core" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_title" varchar NOT NULL,
  	"header_headline" varchar NOT NULL,
  	"header_intro" varchar NOT NULL,
  	"brain_title" varchar NOT NULL,
  	"brain_body" varchar NOT NULL,
  	"brain_image_id" integer NOT NULL,
  	"features_eyebrow" varchar NOT NULL,
  	"features_title" varchar NOT NULL,
  	"framework_eyebrow" varchar NOT NULL,
  	"framework_title" varchar NOT NULL,
  	"framework_description" varchar,
  	"framework_image_id" integer NOT NULL,
  	"steps_eyebrow" varchar NOT NULL,
  	"steps_title" varchar NOT NULL,
  	"steps_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_identity_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_mission_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_vision_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_what_we_do_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "about_standard_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "about_technologies_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_title" varchar NOT NULL,
  	"header_headline" varchar NOT NULL,
  	"header_intro" varchar NOT NULL,
  	"identity_eyebrow" varchar NOT NULL,
  	"identity_title" varchar NOT NULL,
  	"identity_image_id" integer NOT NULL,
  	"mission_eyebrow" varchar NOT NULL,
  	"mission_title" varchar NOT NULL,
  	"mission_body" varchar NOT NULL,
  	"vision_eyebrow" varchar NOT NULL,
  	"vision_title" varchar NOT NULL,
  	"vision_body" varchar NOT NULL,
  	"what_we_do_eyebrow" varchar NOT NULL,
  	"what_we_do_title" varchar NOT NULL,
  	"what_we_do_description" varchar,
  	"what_we_do_button_label" varchar NOT NULL,
  	"what_we_do_button_href" varchar NOT NULL,
  	"standard_eyebrow" varchar NOT NULL,
  	"standard_title" varchar NOT NULL,
  	"standard_description" varchar,
  	"technologies_eyebrow" varchar NOT NULL,
  	"technologies_title" varchar NOT NULL,
  	"technologies_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "solutions_core_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL
  );
  
  CREATE TABLE "solutions_methodology_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_title" varchar NOT NULL,
  	"header_headline" varchar NOT NULL,
  	"header_intro" varchar NOT NULL,
  	"deliver_title" varchar NOT NULL,
  	"deliver_body" varchar NOT NULL,
  	"deliver_button_label" varchar NOT NULL,
  	"deliver_button_href" varchar NOT NULL,
  	"deliver_image_id" integer NOT NULL,
  	"core_eyebrow" varchar NOT NULL,
  	"core_title" varchar NOT NULL,
  	"core_description" varchar,
  	"methodology_eyebrow" varchar NOT NULL,
  	"methodology_title" varchar NOT NULL,
  	"methodology_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_title" varchar NOT NULL,
  	"header_headline" varchar NOT NULL,
  	"header_intro" varchar NOT NULL,
  	"form_title" varchar NOT NULL,
  	"form_name_label" varchar NOT NULL,
  	"form_email_label" varchar NOT NULL,
  	"form_subject_label" varchar NOT NULL,
  	"form_message_label" varchar NOT NULL,
  	"form_submit_label" varchar NOT NULL,
  	"form_success_title" varchar NOT NULL,
  	"form_success_message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"button_label" varchar NOT NULL,
  	"button_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_links" ADD CONSTRAINT "header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_meet_ve_heart_features" ADD CONSTRAINT "home_meet_ve_heart_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_intro" ADD CONSTRAINT "home_about_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_pills" ADD CONSTRAINT "home_about_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_edge_cards" ADD CONSTRAINT "home_edge_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_process_stages" ADD CONSTRAINT "home_process_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_process_categories" ADD CONSTRAINT "home_process_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_process_sources" ADD CONSTRAINT "home_process_sources_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_process_sources" ADD CONSTRAINT "home_process_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_process_reef_chips" ADD CONSTRAINT "home_process_reef_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_process_groups_tiles" ADD CONSTRAINT "home_process_groups_tiles_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_process_groups_tiles" ADD CONSTRAINT "home_process_groups_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_process_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_process_groups" ADD CONSTRAINT "home_process_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_impact_stats" ADD CONSTRAINT "home_impact_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_scale_cards" ADD CONSTRAINT "home_scale_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_scale_cards" ADD CONSTRAINT "home_scale_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_meet_ve_trusted_card_avatars_id_media_id_fk" FOREIGN KEY ("meet_ve_trusted_card_avatars_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ai_core_numbers_stats" ADD CONSTRAINT "ai_core_numbers_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_core"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_core_features_cards" ADD CONSTRAINT "ai_core_features_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_core"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_core_steps_items" ADD CONSTRAINT "ai_core_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_core"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_core" ADD CONSTRAINT "ai_core_brain_image_id_media_id_fk" FOREIGN KEY ("brain_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ai_core" ADD CONSTRAINT "ai_core_framework_image_id_media_id_fk" FOREIGN KEY ("framework_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_identity_stats" ADD CONSTRAINT "about_identity_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_mission_points" ADD CONSTRAINT "about_mission_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_vision_points" ADD CONSTRAINT "about_vision_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_what_we_do_items" ADD CONSTRAINT "about_what_we_do_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_standard_cards" ADD CONSTRAINT "about_standard_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_standard_cards" ADD CONSTRAINT "about_standard_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_technologies_badges" ADD CONSTRAINT "about_technologies_badges_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_technologies_badges" ADD CONSTRAINT "about_technologies_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_identity_image_id_media_id_fk" FOREIGN KEY ("identity_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_core_cards" ADD CONSTRAINT "solutions_core_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_core_cards" ADD CONSTRAINT "solutions_core_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_methodology_steps" ADD CONSTRAINT "solutions_methodology_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_deliver_image_id_media_id_fk" FOREIGN KEY ("deliver_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_items" ADD CONSTRAINT "faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_socials" ADD CONSTRAINT "footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_links_order_idx" ON "header_links" USING btree ("_order");
  CREATE INDEX "header_links_parent_id_idx" ON "header_links" USING btree ("_parent_id");
  CREATE INDEX "home_meet_ve_heart_features_order_idx" ON "home_meet_ve_heart_features" USING btree ("_order");
  CREATE INDEX "home_meet_ve_heart_features_parent_id_idx" ON "home_meet_ve_heart_features" USING btree ("_parent_id");
  CREATE INDEX "home_about_intro_order_idx" ON "home_about_intro" USING btree ("_order");
  CREATE INDEX "home_about_intro_parent_id_idx" ON "home_about_intro" USING btree ("_parent_id");
  CREATE INDEX "home_about_pills_order_idx" ON "home_about_pills" USING btree ("_order");
  CREATE INDEX "home_about_pills_parent_id_idx" ON "home_about_pills" USING btree ("_parent_id");
  CREATE INDEX "home_edge_cards_order_idx" ON "home_edge_cards" USING btree ("_order");
  CREATE INDEX "home_edge_cards_parent_id_idx" ON "home_edge_cards" USING btree ("_parent_id");
  CREATE INDEX "home_process_stages_order_idx" ON "home_process_stages" USING btree ("_order");
  CREATE INDEX "home_process_stages_parent_id_idx" ON "home_process_stages" USING btree ("_parent_id");
  CREATE INDEX "home_process_categories_order_idx" ON "home_process_categories" USING btree ("_order");
  CREATE INDEX "home_process_categories_parent_id_idx" ON "home_process_categories" USING btree ("_parent_id");
  CREATE INDEX "home_process_sources_order_idx" ON "home_process_sources" USING btree ("_order");
  CREATE INDEX "home_process_sources_parent_id_idx" ON "home_process_sources" USING btree ("_parent_id");
  CREATE INDEX "home_process_sources_logo_idx" ON "home_process_sources" USING btree ("logo_id");
  CREATE INDEX "home_process_reef_chips_order_idx" ON "home_process_reef_chips" USING btree ("_order");
  CREATE INDEX "home_process_reef_chips_parent_id_idx" ON "home_process_reef_chips" USING btree ("_parent_id");
  CREATE INDEX "home_process_groups_tiles_order_idx" ON "home_process_groups_tiles" USING btree ("_order");
  CREATE INDEX "home_process_groups_tiles_parent_id_idx" ON "home_process_groups_tiles" USING btree ("_parent_id");
  CREATE INDEX "home_process_groups_tiles_logo_idx" ON "home_process_groups_tiles" USING btree ("logo_id");
  CREATE INDEX "home_process_groups_order_idx" ON "home_process_groups" USING btree ("_order");
  CREATE INDEX "home_process_groups_parent_id_idx" ON "home_process_groups" USING btree ("_parent_id");
  CREATE INDEX "home_impact_stats_order_idx" ON "home_impact_stats" USING btree ("_order");
  CREATE INDEX "home_impact_stats_parent_id_idx" ON "home_impact_stats" USING btree ("_parent_id");
  CREATE INDEX "home_scale_cards_order_idx" ON "home_scale_cards" USING btree ("_order");
  CREATE INDEX "home_scale_cards_parent_id_idx" ON "home_scale_cards" USING btree ("_parent_id");
  CREATE INDEX "home_scale_cards_image_idx" ON "home_scale_cards" USING btree ("image_id");
  CREATE INDEX "home_meet_ve_trusted_card_meet_ve_trusted_card_avatars_idx" ON "home" USING btree ("meet_ve_trusted_card_avatars_id");
  CREATE INDEX "ai_core_numbers_stats_order_idx" ON "ai_core_numbers_stats" USING btree ("_order");
  CREATE INDEX "ai_core_numbers_stats_parent_id_idx" ON "ai_core_numbers_stats" USING btree ("_parent_id");
  CREATE INDEX "ai_core_features_cards_order_idx" ON "ai_core_features_cards" USING btree ("_order");
  CREATE INDEX "ai_core_features_cards_parent_id_idx" ON "ai_core_features_cards" USING btree ("_parent_id");
  CREATE INDEX "ai_core_steps_items_order_idx" ON "ai_core_steps_items" USING btree ("_order");
  CREATE INDEX "ai_core_steps_items_parent_id_idx" ON "ai_core_steps_items" USING btree ("_parent_id");
  CREATE INDEX "ai_core_brain_brain_image_idx" ON "ai_core" USING btree ("brain_image_id");
  CREATE INDEX "ai_core_framework_framework_image_idx" ON "ai_core" USING btree ("framework_image_id");
  CREATE INDEX "about_identity_stats_order_idx" ON "about_identity_stats" USING btree ("_order");
  CREATE INDEX "about_identity_stats_parent_id_idx" ON "about_identity_stats" USING btree ("_parent_id");
  CREATE INDEX "about_mission_points_order_idx" ON "about_mission_points" USING btree ("_order");
  CREATE INDEX "about_mission_points_parent_id_idx" ON "about_mission_points" USING btree ("_parent_id");
  CREATE INDEX "about_vision_points_order_idx" ON "about_vision_points" USING btree ("_order");
  CREATE INDEX "about_vision_points_parent_id_idx" ON "about_vision_points" USING btree ("_parent_id");
  CREATE INDEX "about_what_we_do_items_order_idx" ON "about_what_we_do_items" USING btree ("_order");
  CREATE INDEX "about_what_we_do_items_parent_id_idx" ON "about_what_we_do_items" USING btree ("_parent_id");
  CREATE INDEX "about_standard_cards_order_idx" ON "about_standard_cards" USING btree ("_order");
  CREATE INDEX "about_standard_cards_parent_id_idx" ON "about_standard_cards" USING btree ("_parent_id");
  CREATE INDEX "about_standard_cards_image_idx" ON "about_standard_cards" USING btree ("image_id");
  CREATE INDEX "about_technologies_badges_order_idx" ON "about_technologies_badges" USING btree ("_order");
  CREATE INDEX "about_technologies_badges_parent_id_idx" ON "about_technologies_badges" USING btree ("_parent_id");
  CREATE INDEX "about_technologies_badges_logo_idx" ON "about_technologies_badges" USING btree ("logo_id");
  CREATE INDEX "about_identity_identity_image_idx" ON "about" USING btree ("identity_image_id");
  CREATE INDEX "solutions_core_cards_order_idx" ON "solutions_core_cards" USING btree ("_order");
  CREATE INDEX "solutions_core_cards_parent_id_idx" ON "solutions_core_cards" USING btree ("_parent_id");
  CREATE INDEX "solutions_core_cards_image_idx" ON "solutions_core_cards" USING btree ("image_id");
  CREATE INDEX "solutions_methodology_steps_order_idx" ON "solutions_methodology_steps" USING btree ("_order");
  CREATE INDEX "solutions_methodology_steps_parent_id_idx" ON "solutions_methodology_steps" USING btree ("_parent_id");
  CREATE INDEX "solutions_deliver_deliver_image_idx" ON "solutions" USING btree ("deliver_image_id");
  CREATE INDEX "faq_items_order_idx" ON "faq_items" USING btree ("_order");
  CREATE INDEX "faq_items_parent_id_idx" ON "faq_items" USING btree ("_parent_id");
  CREATE INDEX "footer_socials_order_idx" ON "footer_socials" USING btree ("_order");
  CREATE INDEX "footer_socials_parent_id_idx" ON "footer_socials" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "messages" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_links" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "home_meet_ve_heart_features" CASCADE;
  DROP TABLE "home_about_intro" CASCADE;
  DROP TABLE "home_about_pills" CASCADE;
  DROP TABLE "home_edge_cards" CASCADE;
  DROP TABLE "home_process_stages" CASCADE;
  DROP TABLE "home_process_categories" CASCADE;
  DROP TABLE "home_process_sources" CASCADE;
  DROP TABLE "home_process_reef_chips" CASCADE;
  DROP TABLE "home_process_groups_tiles" CASCADE;
  DROP TABLE "home_process_groups" CASCADE;
  DROP TABLE "home_impact_stats" CASCADE;
  DROP TABLE "home_scale_cards" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "ai_core_numbers_stats" CASCADE;
  DROP TABLE "ai_core_features_cards" CASCADE;
  DROP TABLE "ai_core_steps_items" CASCADE;
  DROP TABLE "ai_core" CASCADE;
  DROP TABLE "about_identity_stats" CASCADE;
  DROP TABLE "about_mission_points" CASCADE;
  DROP TABLE "about_vision_points" CASCADE;
  DROP TABLE "about_what_we_do_items" CASCADE;
  DROP TABLE "about_standard_cards" CASCADE;
  DROP TABLE "about_technologies_badges" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "solutions_core_cards" CASCADE;
  DROP TABLE "solutions_methodology_steps" CASCADE;
  DROP TABLE "solutions" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "cta" CASCADE;
  DROP TABLE "footer_socials" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_footer_socials_platform";`)
}
