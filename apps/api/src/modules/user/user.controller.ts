import { Controller, Get, HttpStatus, Param, Req, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import { Role, Provider } from "src/common/dto/enum";
import { AuthGuard, type RequestWithUser } from "src/guard/auth/auth.guard";
import { OrderStatus } from "../order/dto/order.enum";
import { OrderUseCase } from "../order/order.use-case";
import { UserUseCase } from "./user.use-case";

@Controller("users")
export class UserController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private readonly userUseCase: UserUseCase,
  ) {}

  @Get("@me")
  @UseGuards(AuthGuard)
  async create(
    @Req()
    request: RequestWithUser,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const reqUser = request.user;
    const findUser = await this.userUseCase.find(request.user.id);
    if (findUser) {
      return findUser;
    }

    const provider = reqUser.app_metadata.provider;
    if (provider === "discord") {
      const createUser = await this.userUseCase.create({
        id: request.user.id,
        name: reqUser.user_metadata["custom_claims"].global_name,
        iconImage: reqUser.user_metadata["avatar_url"],
        provider: Provider.DISCORD,
        role: Role.USER,
      });
      return createUser;
    } else if (provider === "google") {
      const createUser = await this.userUseCase.create({
        id: request.user.id,
        name: reqUser.user_metadata["full_name"],
        iconImage: reqUser.user_metadata["avatar_url"],
        provider: Provider.GOOGLE,
        role: Role.USER,
      });
      return createUser;
    }
    res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    return;
  }

  @Get("@me/orders")
  @UseGuards(AuthGuard)
  async getOrders(@Req() request: RequestWithUser) {
    const findOrders = await this.orderUseCase.findManyByUserId(request.user.id);
    return findOrders;
  }

  @Get("@me/orders/:id")
  @UseGuards(AuthGuard)
  async getOrder(
    @Req()
    request: RequestWithUser,
    @Param()
    params: {
      id: string;
    },
    @Res({ passthrough: true })
    res: Response,
  ) {
    const findOrder = await this.orderUseCase.findByUserIdAndId(request.user.id, params.id);

    if (!findOrder) {
      res.status(HttpStatus.NOT_FOUND).send("Not Found");
      return;
    }

    if (findOrder.isPayment) {
      const updatedPayment = await this.orderUseCase.updatePayment(params.id);
      if (!updatedPayment) {
        res.status(HttpStatus.BAD_REQUEST).send("not found");
        return;
      }

      if (updatedPayment.isExpired || updatedPayment.isFailed) {
        const updatedOrder = await this.orderUseCase.setNewPayment(findOrder);
        return updatedOrder;
      }
      if (updatedPayment.isCompleted) {
        const updatedOrder = await this.orderUseCase.update(params.id, {
          status: OrderStatus.COOKING,
        });
        return updatedOrder;
      }
    }
    return findOrder;
  }

  @Get("@me/orders/:id/payment")
  @UseGuards(AuthGuard)
  async getOrderPayment(
    @Req()
    request: RequestWithUser,
    @Param()
    params: {
      id: string;
    },
    @Res({ passthrough: true })
    res: Response,
  ) {
    const findOrder = await this.orderUseCase.findByUserIdAndId(request.user.id, params.id);

    if (!findOrder) {
      res.status(HttpStatus.NOT_FOUND).send("Not Found");
      return;
    }

    if (findOrder.isPayment) {
      const updatedPayment = await this.orderUseCase.updatePayment(params.id);
      if (!updatedPayment) {
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
        return;
      }

      if (updatedPayment.isExpired) {
        const updatedOrder = await this.orderUseCase.setNewPayment(findOrder);
        return updatedOrder.payment;
      }
      if (updatedPayment.isCompleted) {
        const updatedOrder = await this.orderUseCase.update(params.id, {
          status: OrderStatus.COOKING,
        });
        return updatedOrder.payment;
      }
    }

    return findOrder.payment;
  }
}
