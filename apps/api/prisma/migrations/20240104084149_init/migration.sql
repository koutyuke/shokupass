/*
  Warnings:

  - Made the column `order_id` on table `lockers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "lockers" DROP CONSTRAINT "lockers_order_id_fkey";

-- AlterTable
ALTER TABLE "lockers" ALTER COLUMN "order_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "lockers" ADD CONSTRAINT "lockers_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
