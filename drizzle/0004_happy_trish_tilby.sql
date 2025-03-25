ALTER TABLE "doc_accounts" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_accounts" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "doc_accounts" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_accounts" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_accounts" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_companies" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_companies" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "doc_companies" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_companies" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_companies" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_documents" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_documents" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "doc_documents" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_documents" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_documents" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_magic_links" ALTER COLUMN "token_expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_profiles" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_profiles" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "doc_profiles" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_profiles" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_profiles" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_sessions" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_sessions" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "doc_sessions" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_sessions" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_sessions" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_users" ALTER COLUMN "email_verified" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "doc_users" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_users" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ALTER COLUMN "token_expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "doc_verify_email" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp with time zone;