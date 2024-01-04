import { Module, forwardRef } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { OrderModule } from "../order/order.module";
import { LockerController } from "./locker.controller";
import { LockerRepository } from "./locker.repository";
import { LockerUseCase } from "./locker.use-case";

@Module({
  imports: [forwardRef(() => OrderModule)],
  controllers: [LockerController],
  providers: [
    {
      provide: InjectToken["LOCKER_REPOSITORY"],
      useClass: LockerRepository,
    },
    LockerUseCase,
  ],
  exports: [LockerUseCase],
})
export class LockerModule {}
