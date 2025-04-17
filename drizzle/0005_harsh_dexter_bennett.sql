CREATE TYPE "public"."company_request_join_status" AS ENUM('ACCEPTED', 'PENDING', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."company_role" AS ENUM('ADMIN', 'MANAGER', 'EDITOR', 'VIEWER');--> statement-breakpoint
CREATE TABLE "doc_company_invites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"status" "company_request_join_status" DEFAULT 'PENDING' NOT NULL,
	"token" text NOT NULL,
	"invite_expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "doc_company_invites_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "doc_users_to_companies" (
	"user_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"role" "company_role" DEFAULT 'VIEWER' NOT NULL,
	"invited_by" uuid,
	"invited_at" timestamp with time zone,
	"accepted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "doc_users_to_companies_user_id_company_id_pk" PRIMARY KEY("user_id","company_id")
);
--> statement-breakpoint
ALTER TABLE "doc_users" DROP CONSTRAINT "doc_users_company_id_doc_companies_id_fk";
--> statement-breakpoint
DROP INDEX "users_company_id_idx";--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "company_image_id" text;--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "owner_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_company_invites" ADD CONSTRAINT "doc_company_invites_user_id_doc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_company_invites" ADD CONSTRAINT "doc_company_invites_company_id_doc_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."doc_companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_users_to_companies" ADD CONSTRAINT "doc_users_to_companies_user_id_doc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_users_to_companies" ADD CONSTRAINT "doc_users_to_companies_company_id_doc_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."doc_companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_users_to_companies" ADD CONSTRAINT "doc_users_to_companies_invited_by_doc_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."doc_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_companies" ADD CONSTRAINT "doc_companies_owner_id_doc_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_users" DROP COLUMN "company_id";