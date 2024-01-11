import { BadRequestException, Controller, NotFoundException, UseGuards } from "@nestjs/common";
import { apiContract } from "@shokupass/api-contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { OrderStatus } from "../order/dto/order.enum";
import { OrderUseCase } from "../order/order.use-case";
import { LockerUseCase } from "./locker.use-case";

@Controller()
export class LockerController {
  constructor(
    private readonly lockerUseCase: LockerUseCase,
    private readonly orderUseCase: OrderUseCase,
  ) {}

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.locker.GetLockers)
  async getLockers() {
    return tsRestHandler(apiContract.locker.GetLockers, async () => {
      const lockers = await this.lockerUseCase.findAll();
      return {
        status: 200,
        body: lockers,
      };
    });
  }

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.locker.GetLocker)
  async getLocker() {
    return tsRestHandler(apiContract.locker.GetLocker, async ({ params }) => {
      const locker = await this.lockerUseCase.find(params.id);
      if (!locker) {
        throw new NotFoundException();
      }
      return {
        status: 200,
        body: locker,
      };
    });
  }

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.locker.OpenLocker)
  async openLocker() {
    return tsRestHandler(apiContract.locker.OpenLocker, async ({ params, body }) => {
      const locker = await this.lockerUseCase.find(params.id);
      if (!locker) {
        throw new NotFoundException();
      }
      if (locker.orderId !== body.orderId) {
        throw new BadRequestException();
      }

      await this.orderUseCase.update(locker.orderId, {
        status: OrderStatus.COMPLETED,
      });
      const updatedLocker = await this.lockerUseCase.updateOrderId(params.id, null);
      return {
        status: 200,
        body: updatedLocker,
      };
    });
  }
}
