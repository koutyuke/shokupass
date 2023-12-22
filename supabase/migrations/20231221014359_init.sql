alter table "public"."User" drop constraint "User_pkey";

drop index if exists "public"."User_pkey";

drop table "public"."User";

create table "public"."menus" (
    "id" text not null,
    "name" text not null,
    "price" integer not null,
    "description" text,
    "image" text,
    "quantity" integer not null default 0,
    "waiting_time" integer not null,
    "create_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "update_at" timestamp(3) without time zone not null
);


create table "public"."users" (
    "id" text not null,
    "name" text not null,
    "icon_image" text,
    "role" "Role" not null default 'USER'::"Role",
    "provider" "Provider" not null
);


CREATE UNIQUE INDEX menus_pkey ON public.menus USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."menus" add constraint "menus_pkey" PRIMARY KEY using index "menus_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";


