import { Module } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { PaypayModule } from "src/common/paypay/paypay.module";
import { MenuModule } from "../menu/menu.module";
import { PaymentModule } from "../payment/payment.module";
import { OrderController } from "./order.controller";
import { OrderRepository } from "./order.repository";
import { OrderUseCase } from "./order.use-case";

@Module({
  imports: [MenuModule, PaypayModule, PaymentModule],
  controllers: [OrderController],
  providers: [
    {
      provide: InjectToken["ORDER_REPOSITORY"],
      useClass: OrderRepository,
    },
    OrderUseCase,
  ],
  exports: [OrderUseCase],
})
export class OrderModule {}
