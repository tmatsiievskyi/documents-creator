/*
  Warnings:

  - You are about to drop the `CollaboratorAccess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DocumentAccessLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CollaboratorAccess" DROP CONSTRAINT "CollaboratorAccess_document_id_fkey";

-- DropForeignKey
ALTER TABLE "CollaboratorAccess" DROP CONSTRAINT "CollaboratorAccess_userId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentAccessLog" DROP CONSTRAINT "DocumentAccessLog_document_id_fkey";

-- DropForeignKey
ALTER TABLE "DocumentAccessLog" DROP CONSTRAINT "DocumentAccessLog_user_id_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_author_id_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_createdById_fkey";

-- DropTable
DROP TABLE "CollaboratorAccess";

-- DropTable
DROP TABLE "DocumentAccessLog";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "collaborator_access" (
    "id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "ECollaboratorRole" NOT NULL DEFAULT 'VIEWER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collaborator_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_access_logs" (
    "id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "action" "EAccessType" NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "username" VARCHAR(55) NOT NULL,
    "display_name" VARCHAR(55),
    "avatar_img" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "collaborator_access_userId_idx" ON "collaborator_access"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "collaborator_access_document_id_userId_key" ON "collaborator_access"("document_id", "userId");

-- CreateIndex
CREATE INDEX "document_access_logs_document_id_idx" ON "document_access_logs"("document_id");

-- CreateIndex
CREATE INDEX "document_access_logs_user_id_idx" ON "document_access_logs"("user_id");

-- CreateIndex
CREATE INDEX "document_access_logs_accessedAt_idx" ON "document_access_logs"("accessedAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_display_name_key" ON "users"("display_name");

-- AddForeignKey
ALTER TABLE "collaborator_access" ADD CONSTRAINT "collaborator_access_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborator_access" ADD CONSTRAINT "collaborator_access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_access_logs" ADD CONSTRAINT "document_access_logs_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_access_logs" ADD CONSTRAINT "document_access_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
