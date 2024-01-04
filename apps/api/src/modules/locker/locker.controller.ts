import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { OrderStatus } from "../order/dto/order.enum";
import { OrderUseCase } from "../order/order.use-case";
import { LockerUseCase } from "./locker.use-case";

@Controller("lockers")
export class LockerController {
  constructor(
    private readonly lockerUseCase: LockerUseCase,
    private readonly orderUseCase: OrderUseCase,
  ) {}

  @Get()
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getLockers() {
    const lockers = await this.lockerUseCase.findAll();
    return lockers;
  }

  @Get(":id")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getLocker(
    @Param()
    params: {
      id: string;
    },
  ) {
    const locker = await this.lockerUseCase.find(params.id);
    return locker;
  }

  @Post(":id/open")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async openLocker(
    @Param()
    params: {
      id: string;
    },
    @Body()
    body: {
      orderId: string;
    },
    @Res({ passthrough: true })
    res: Response,
  ) {
    const locker = await this.lockerUseCase.find(params.id);
    if (!locker) {
      res.status(HttpStatus.NOT_FOUND).send("Not Found");
      return;
    }
    if (locker.orderId !== body.orderId) {
      res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
      return;
    }

    await this.orderUseCase.update(locker.orderId, {
      status: OrderStatus.COMPLETED,
    });
    await this.lockerUseCase.updateOrderId(params.id, null);
    res.status(HttpStatus.OK).send("OK");
    return;
  }
}
