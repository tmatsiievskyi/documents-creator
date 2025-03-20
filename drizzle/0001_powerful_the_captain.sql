CREATE TABLE "doc_verify_email" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"token_expires_at" timestamp,
	CONSTRAINT "doc_verify_email_email_unique" UNIQUE("email"),
	CONSTRAINT "doc_verify_email_token_unique" UNIQUE("token")
);
