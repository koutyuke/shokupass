/*
  Warnings:

  - You are about to drop the column `menu_id` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_menu_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "menu_id";

-- CreateTable
CREATE TABLE "menu_order_junctions" (
    "menu_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "menu_order_junctions_pkey" PRIMARY KEY ("menu_id","order_id")
);

-- AddForeignKey
ALTER TABLE "menu_order_junctions" ADD CONSTRAINT "menu_order_junctions_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_order_junctions" ADD CONSTRAINT "menu_order_junctions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
