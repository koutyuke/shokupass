alter table "public"."menus" alter column "status" drop default;

alter type "public"."MenuStatus" rename to "MenuStatus__old_version_to_be_dropped";

create type "public"."MenuStatus" as enum ('RELEASED', 'PREPARATION', 'DELETED', 'UNRELEASED');

alter table "public"."menus" alter column status type "public"."MenuStatus" using status::text::"public"."MenuStatus";

alter table "public"."menus" alter column "status" set default 'PREPARATION'::"MenuStatus";

drop type "public"."MenuStatus__old_version_to_be_dropped";


