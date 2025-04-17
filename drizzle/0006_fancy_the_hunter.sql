CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION');--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "status" "status" DEFAULT 'PENDING_VERIFICATION' NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "doc_companies" ADD COLUMN "address" jsonb;