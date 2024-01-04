alter table "public"."lockers" drop constraint "lockers_order_id_fkey";

alter table "public"."lockers" alter column "order_id" set not null;

alter table "public"."lockers" add constraint "lockers_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."lockers" validate constraint "lockers_order_id_fkey";


