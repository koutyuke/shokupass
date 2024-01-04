import { Module } from "@nestjs/common";
import { SupabaseModule } from "src/common/supabase/supabase.module";
import { EnvModule } from "src/config/environments/env.module";
import { PrismaModule } from "src/infra/prisma/prisma.module";
import { LockerModule } from "src/modules/locker/locker.module";
import { MenuModule } from "src/modules/menu/menu.module";
import { OrderModule } from "src/modules/order/order.module";
import { UserModule } from "src/modules/user/user.module";

@Module({
  imports: [EnvModule, SupabaseModule, UserModule, PrismaModule, MenuModule, OrderModule, LockerModule],
})
export class AppModule {}
