create table "public"."lockers" (
    "id" text not null,
    "order_id" text
);


CREATE UNIQUE INDEX lockers_order_id_key ON public.lockers USING btree (order_id);

CREATE UNIQUE INDEX lockers_pkey ON public.lockers USING btree (id);

alter table "public"."lockers" add constraint "lockers_pkey" PRIMARY KEY using index "lockers_pkey";

alter table "public"."lockers" add constraint "lockers_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."lockers" validate constraint "lockers_order_id_fkey";


