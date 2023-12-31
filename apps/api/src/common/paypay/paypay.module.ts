import { Module } from "@nestjs/common";
import { EnvModule } from "src/config/environments/env.module";
import { PaypayService } from "./paypay.service";

@Module({
  imports: [EnvModule],
  providers: [PaypayService],
  exports: [PaypayService],
})
export class PaypayModule {}
