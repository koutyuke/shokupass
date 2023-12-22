import { Module } from "@nestjs/common";
import { SupabaseModule } from "src/common/supabase/supabase.module";
import { EnvModule } from "src/config/environments/env.module";
import { PrismaModule } from "src/infra/prisma/prisma.module";
import { MenuModule } from "src/modules/menu/menu.module";
import { UserModule } from "src/modules/user/user.module";

@Module({
  imports: [EnvModule, SupabaseModule, UserModule, PrismaModule, MenuModule],
})
export class AppModule {}
