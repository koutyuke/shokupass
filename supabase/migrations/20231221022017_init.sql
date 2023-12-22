create type "public"."MenuStatus" as enum ('VISIBLE', 'UNVISIBLE', 'DELETED');

alter table "public"."menus" add column "status" "MenuStatus" not null default 'UNVISIBLE'::"MenuStatus";


