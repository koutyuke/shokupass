/*
  Warnings:

  - You are about to drop the `menu_order_junctions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Made the column `payment_id` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'DELETED';

-- DropForeignKey
ALTER TABLE "menu_order_junctions" DROP CONSTRAINT "menu_order_junctions_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_order_junctions" DROP CONSTRAINT "menu_order_junctions_order_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "payment_id" SET NOT NULL;

-- DropTable
DROP TABLE "menu_order_junctions";

-- CreateTable
CREATE TABLE "menu_orders" (
    "menu_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "menu_quantity" INTEGER NOT NULL,

    CONSTRAINT "menu_orders_pkey" PRIMARY KEY ("menu_id","order_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "deeplink" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_id_key" ON "orders"("payment_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_orders" ADD CONSTRAINT "menu_orders_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_orders" ADD CONSTRAINT "menu_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
