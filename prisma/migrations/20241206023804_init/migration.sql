/*
  Warnings:

  - A unique constraint covering the columns `[user_id,review_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `review_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "review_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Comment_user_id_review_id_key" ON "Comment"("user_id", "review_id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
