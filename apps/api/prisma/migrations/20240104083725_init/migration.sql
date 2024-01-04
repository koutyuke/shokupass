-- CreateTable
CREATE TABLE "lockers" (
    "id" TEXT NOT NULL,
    "order_id" TEXT,

    CONSTRAINT "lockers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lockers_order_id_key" ON "lockers"("order_id");

-- AddForeignKey
ALTER TABLE "lockers" ADD CONSTRAINT "lockers_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
