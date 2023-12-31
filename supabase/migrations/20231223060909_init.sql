alter table "public"."orders" alter column "status" drop default;

alter type "public"."OrderStatus" rename to "OrderStatus__old_version_to_be_dropped";

create type "public"."OrderStatus" as enum ('PENDING', 'PAYMENT', 'COOKING', 'READY_FOR_PICKUP', 'REFUNDED', 'COMPLETED', 'CANCELLED');

alter table "public"."orders" alter column status type "public"."OrderStatus" using status::text::"public"."OrderStatus";

alter table "public"."orders" alter column "status" set default 'PENDING'::"OrderStatus";

drop type "public"."OrderStatus__old_version_to_be_dropped";


