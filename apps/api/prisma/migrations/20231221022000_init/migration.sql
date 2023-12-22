-- CreateEnum
CREATE TYPE "MenuStatus" AS ENUM ('VISIBLE', 'UNVISIBLE', 'DELETED');

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "status" "MenuStatus" NOT NULL DEFAULT 'UNVISIBLE';
