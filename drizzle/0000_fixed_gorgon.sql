CREATE TYPE "public"."document_owner_type" AS ENUM('USER', 'COMPANY');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED', 'TRASH');--> statement-breakpoint
CREATE TYPE "public"."document_visibility" AS ENUM('PRIVATE', 'TEAM', 'GROUP');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"company_image" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "documents" (
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
	CONSTRAINT "document_owner_check" CHECK ("documents"."owner_type" = 'USER' AND "documents"."owner_user_id" IS NOT NULL AND "documents"."owner_company_id" IS NULL
        OR "documents"."owner_type" = 'COMPANY' AND "documents"."owner_company_id" IS NOT NULL AND "documents"."owner_user_id" IS NULL
      )
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256),
	"email_verified" timestamp,
	"company_id" uuid,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_owner_company_id_companies_id_fk" FOREIGN KEY ("owner_company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "companies_name_idx" ON "companies" USING btree ("name");--> statement-breakpoint
CREATE INDEX "documents_author_id_idx" ON "documents" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "documents_owner_user_id_idx" ON "documents" USING btree ("owner_user_id");--> statement-breakpoint
CREATE INDEX "documents_owner_company_id_idx" ON "documents" USING btree ("owner_company_id");--> statement-breakpoint
CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_company_id_idx" ON "users" USING btree ("company_id");