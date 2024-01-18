/*
  Warnings:

  - Made the column `description` on table `menus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `menus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL;
