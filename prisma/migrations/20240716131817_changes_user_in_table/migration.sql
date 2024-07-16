-- AlterTable
ALTER TABLE "user" ADD COLUMN     "block_reason" TEXT,
ADD COLUMN     "is_profile_completed" BOOLEAN NOT NULL DEFAULT false;
