ALTER TABLE "doc_verify_email" DROP CONSTRAINT "doc_verify_email_email_unique";--> statement-breakpoint
ALTER TABLE "doc_verify_email" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "doc_verify_email" ADD CONSTRAINT "doc_verify_email_user_id_doc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doc_verify_email" DROP COLUMN "email";