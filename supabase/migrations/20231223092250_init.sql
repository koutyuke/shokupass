alter table "public"."orders" drop constraint "orders_menu_id_fkey";

create table "public"."menu_order_junctions" (
    "menu_id" text not null,
    "order_id" text not null
);


alter table "public"."orders" drop column "menu_id";

CREATE UNIQUE INDEX menu_order_junctions_pkey ON public.menu_order_junctions USING btree (menu_id, order_id);

alter table "public"."menu_order_junctions" add constraint "menu_order_junctions_pkey" PRIMARY KEY using index "menu_order_junctions_pkey";

alter table "public"."menu_order_junctions" add constraint "menu_order_junctions_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES menus(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."menu_order_junctions" validate constraint "menu_order_junctions_menu_id_fkey";

alter table "public"."menu_order_junctions" add constraint "menu_order_junctions_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."menu_order_junctions" validate constraint "menu_order_junctions_order_id_fkey";


