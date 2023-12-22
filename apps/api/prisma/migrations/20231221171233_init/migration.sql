/*
  Warnings:

  - The values [VISIBLE,UNVISIBLE] on the enum `MenuStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MenuStatus_new" AS ENUM ('RELEASED', 'PREPARATION', 'DELETED');
ALTER TABLE "menus" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "menus" ALTER COLUMN "status" TYPE "MenuStatus_new" USING ("status"::text::"MenuStatus_new");
ALTER TYPE "MenuStatus" RENAME TO "MenuStatus_old";
ALTER TYPE "MenuStatus_new" RENAME TO "MenuStatus";
DROP TYPE "MenuStatus_old";
ALTER TABLE "menus" ALTER COLUMN "status" SET DEFAULT 'PREPARATION';
COMMIT;

-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "status" SET DEFAULT 'PREPARATION';
