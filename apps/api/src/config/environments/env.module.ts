import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvService } from "./env.service";
import { validate } from "./validator";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env"],
      validate,
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
