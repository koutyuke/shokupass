/*
  Warnings:

  - You are about to drop the column `create_at` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `menus` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `menus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menus" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
