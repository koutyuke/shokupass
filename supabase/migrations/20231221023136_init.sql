alter table "public"."users" alter column "role" drop default;

alter type "public"."Role" rename to "Role__old_version_to_be_dropped";

create type "public"."Role" as enum ('ADMIN', 'USER', 'MODERATOR');

alter table "public"."users" alter column role type "public"."Role" using role::text::"public"."Role";

alter table "public"."users" alter column "role" set default 'USER'::"Role";

drop type "public"."Role__old_version_to_be_dropped";


