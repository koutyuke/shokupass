-- DropForeignKey
ALTER TABLE "lockers" DROP CONSTRAINT "lockers_order_id_fkey";

-- AlterTable
ALTER TABLE "lockers" ALTER COLUMN "order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lockers" ADD CONSTRAINT "lockers_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
