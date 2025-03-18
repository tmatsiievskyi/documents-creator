CREATE TYPE "public"."type" AS ENUM('email', 'google', 'facebook');--> statement-breakpoint
CREATE TYPE "public"."document_owner_type" AS ENUM('USER', 'COMPANY');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED', 'TRASH');--> statement-breakpoint
CREATE TYPE "public"."document_visibility" AS ENUM('PRIVATE', 'TEAM', 'GROUP');--> statement-breakpoint
CREATE TABLE "doc_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"account_type" "type" NOT NULL,
	"facebook_id" text,
	"google_id" text,
	"password" text,
	"salt" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "doc_accounts_facebook_id_unique" UNIQUE("facebook_id"),
	CONSTRAINT "doc_accounts_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE "doc_companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"company_image" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "doc_companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "doc_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cover_image" text,
	"status" "document_status",
	"content" jsonb NOT NULL,
	"plain_text" text,
	"owner_type" "document_owner_type" NOT NULL,
	"owner_company_id" uuid,
	"owner_user_id" uuid,
	"author_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "document_owner_check" CHECK ("doc_documents"."owner_type" = 'USER' AND "doc_documents"."owner_user_id" IS NOT NULL AND "doc_documents"."owner_company_id" IS NULL
        OR "doc_documents"."owner_type" = 'COMPANY' AND "doc_documents"."owner_company_id" IS NOT NULL AND "doc_documents"."owner_user_id" IS NULL
      )
);
--> statement-breakpoint
CREATE TABLE "doc_magic_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"token_expires_at" timestamp,
	CONSTRAINT "doc_magic_links_email_unique" UNIQUE("email"),
	CONSTRAINT "doc_magic_links_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "doc_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" text,
	"image_id" text,
	"image" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "doc_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "doc_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "doc_sessions_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "doc_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256),
	"email_verified" timestamp,
	"company_id" uuid,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "doc_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "doc_accounts" ADD CONSTRAINT "doc_accounts_user_id_doc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_documents" ADD CONSTRAINT "doc_documents_owner_company_id_doc_companies_id_fk" FOREIGN KEY ("owner_company_id") REFERENCES "public"."doc_companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_documents" ADD CONSTRAINT "doc_documents_owner_user_id_doc_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."doc_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_documents" ADD CONSTRAINT "doc_documents_author_id_doc_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."doc_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_profiles" ADD CONSTRAINT "doc_profiles_user_id_doc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_sessions" ADD CONSTRAINT "doc_sessions_user_id_doc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_users" ADD CONSTRAINT "doc_users_company_id_doc_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."doc_companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_id_account_type_idx" ON "doc_accounts" USING btree ("user_id","account_type");--> statement-breakpoint
CREATE INDEX "companies_name_idx" ON "doc_companies" USING btree ("name");--> statement-breakpoint
CREATE INDEX "documents_author_id_idx" ON "doc_documents" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "documents_owner_user_id_idx" ON "doc_documents" USING btree ("owner_user_id");--> statement-breakpoint
CREATE INDEX "documents_owner_company_id_idx" ON "doc_documents" USING btree ("owner_company_id");--> statement-breakpoint
CREATE INDEX "documents_created_at_idx" ON "doc_documents" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "documents_updated_at_idx" ON "doc_documents" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "magic_links_token_idx" ON "doc_magic_links" USING btree ("token");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "doc_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_company_id_idx" ON "doc_users" USING btree ("company_id");