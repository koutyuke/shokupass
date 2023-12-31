import { Module } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { PaypayModule } from "src/common/paypay/paypay.module";
import { PaymentRepository } from "./payment.repository";
import { PaymentUseCase } from "./payment.use-case";

@Module({
  imports: [PaypayModule],
  providers: [
    {
      provide: InjectToken["PAYMENT_REPOSITORY"],
      useClass: PaymentRepository,
    },
    PaymentUseCase,
  ],
  exports: [PaymentUseCase],
})
export class PaymentModule {}
