alter table "public"."menus" drop column "create_at";

alter table "public"."menus" drop column "update_at";

alter table "public"."menus" add column "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP;

alter table "public"."menus" add column "updated_at" timestamp(3) without time zone not null;


