create type "public"."Provider" as enum ('GOOGLE', 'DISCORD');

create type "public"."Role" as enum ('ADMIN', 'USER');

drop index if exists "public"."User_email_key";

alter table "public"."User" drop column "createdAt";

alter table "public"."User" drop column "email";

alter table "public"."User" drop column "token";

alter table "public"."User" drop column "updatedAt";

alter table "public"."User" add column "icon_image" text;

alter table "public"."User" add column "provider" "Provider" not null;

alter table "public"."User" add column "role" "Role" not null default 'USER'::"Role";


