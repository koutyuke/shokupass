create type "public"."OrderStatus" as enum ('UNPAID', 'COOKING', 'UNRECEIVED', 'COMPLETED', 'CANCELED', 'EXPIRED');

create table "public"."orders" (
    "id" text not null,
    "user_id" text not null,
    "menu_id" text not null,
    "status" "OrderStatus" not null default 'UNPAID'::"OrderStatus",
    "payment_id" text,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null
);


CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."orders" add constraint "orders_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES menus(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."orders" validate constraint "orders_menu_id_fkey";

alter table "public"."orders" add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";


