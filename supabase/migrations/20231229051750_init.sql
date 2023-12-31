create type "public"."PaymentStatus" as enum ('PENDING', 'COMPLETED', 'REFUNDED');

alter table "public"."menu_order_junctions" drop constraint "menu_order_junctions_menu_id_fkey";

alter table "public"."menu_order_junctions" drop constraint "menu_order_junctions_order_id_fkey";

alter table "public"."menu_order_junctions" drop constraint "menu_order_junctions_pkey";

drop index if exists "public"."menu_order_junctions_pkey";

drop table "public"."menu_order_junctions";

alter table "public"."orders" alter column "status" drop default;

alter type "public"."OrderStatus" rename to "OrderStatus__old_version_to_be_dropped";

create type "public"."OrderStatus" as enum ('PENDING', 'PAYMENT', 'COOKING', 'READY_FOR_PICKUP', 'REFUNDED', 'COMPLETED', 'CANCELLED', 'DELETED');

create table "public"."menu_orders" (
    "menu_id" text not null,
    "order_id" text not null,
    "menu_quantity" integer not null
);


create table "public"."payments" (
    "id" text not null,
    "codeId" text not null,
    "status" "PaymentStatus" not null default 'PENDING'::"PaymentStatus",
    "deeplink" text not null,
    "expires_at" timestamp(3) without time zone not null,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null
);


alter table "public"."orders" alter column status type "public"."OrderStatus" using status::text::"public"."OrderStatus";

alter table "public"."orders" alter column "status" set default 'PENDING'::"OrderStatus";

drop type "public"."OrderStatus__old_version_to_be_dropped";

alter table "public"."orders" alter column "payment_id" set not null;

CREATE UNIQUE INDEX menu_orders_pkey ON public.menu_orders USING btree (menu_id, order_id);

CREATE UNIQUE INDEX orders_payment_id_key ON public.orders USING btree (payment_id);

CREATE UNIQUE INDEX payments_pkey ON public.payments USING btree (id);

alter table "public"."menu_orders" add constraint "menu_orders_pkey" PRIMARY KEY using index "menu_orders_pkey";

alter table "public"."payments" add constraint "payments_pkey" PRIMARY KEY using index "payments_pkey";

alter table "public"."menu_orders" add constraint "menu_orders_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES menus(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."menu_orders" validate constraint "menu_orders_menu_id_fkey";

alter table "public"."menu_orders" add constraint "menu_orders_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."menu_orders" validate constraint "menu_orders_order_id_fkey";

alter table "public"."orders" add constraint "orders_payment_id_fkey" FOREIGN KEY (payment_id) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."orders" validate constraint "orders_payment_id_fkey";


