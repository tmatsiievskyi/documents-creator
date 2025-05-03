CREATE TYPE "public"."user_notification_type" AS ENUM('MENTION_RECEIVED', 'MESSAGE_RECEIVED', 'COMPANY_REQUEST_TO_JOIN', 'USER_ADDED_TO_COMPANY', 'USER_REMOVED_FROM_COMPANY', 'ROLE_ASSIGNED');--> statement-breakpoint
CREATE TABLE "doc_notifications_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "user_notification_type" NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "doc_company_invites" ADD COLUMN "recepient_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doc_notifications_user" ADD CONSTRAINT "doc_notifications_user_user_id_doc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."doc_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "doc_notifications_user" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_type_idx" ON "doc_notifications_user" USING btree ("type");--> statement-breakpoint
CREATE INDEX "notification_is_read_idx" ON "doc_notifications_user" USING btree ("is_read");