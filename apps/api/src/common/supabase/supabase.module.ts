import { Global, Module } from "@nestjs/common";
import { EnvModule } from "src/config/environments/env.module";
import { SupabaseService } from "./supabase.service";

@Global()
@Module({
  imports: [EnvModule],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
