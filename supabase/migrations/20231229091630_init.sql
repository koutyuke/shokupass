alter table "public"."payments" alter column "status" drop default;

alter type "public"."PaymentStatus" rename to "PaymentStatus__old_version_to_be_dropped";

create type "public"."PaymentStatus" as enum ('PENDING', 'COMPLETED', 'REFUNDED', 'EXPIRED');

alter table "public"."payments" alter column status type "public"."PaymentStatus" using status::text::"public"."PaymentStatus";

alter table "public"."payments" alter column "status" set default 'PENDING'::"PaymentStatus";

drop type "public"."PaymentStatus__old_version_to_be_dropped";


