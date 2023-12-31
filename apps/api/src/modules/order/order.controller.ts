import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { OrderStatus } from "@prisma/client";
import type { Response } from "express";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { AuthGuard, type RequestWithUser } from "src/guard/auth/auth.guard";
import { MenuUseCase } from "../menu/menu.use-case";
import { OrderUseCase } from "./order.use-case";

@Controller("orders")
export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private readonly menuUseCase: MenuUseCase,
  ) {}

  @Get()
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getOrders() {
    const orders = await this.orderUseCase.findAll();
    return orders;
  }

  @Post()
  @Header("Content-Type", "application/json")
  @UseGuards(AuthGuard)
  async create(
    @Req()
    request: RequestWithUser,
    @Body()
    body: {
      items: {
        menuId: string;
        quantity: number;
      }[];
    },
    @Res({ passthrough: true })
    res: Response,
  ) {
    const menus = await this.menuUseCase.findManyById(body.items.map(item => item.menuId));
    const purchaseableMenus = menus.filter(menu => menu.isReleased && menu.isInStock);
    console.log(purchaseableMenus);
    if (purchaseableMenus.length !== body.items.length) {
      res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
      return;
    }

    const createOrder = await this.orderUseCase.create({
      userId: request.user.id,
      items: body.items.map(item => ({
        menu: menus.find(menu => menu.id === item.menuId)!,
        quantity: item.quantity,
      })),
      status: OrderStatus.PAYMENT,
    });

    return createOrder;
  }

  @Get(":id")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async get(
    @Param()
    params: {
      id: string;
    },
    @Res({ passthrough: true })
    res: Response,
  ) {
    const findOrder = await this.orderUseCase.find(params.id);

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

  @Get(":id/payment")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getPayment(
    @Param()
    params: {
      id: string;
    },
    @Res({ passthrough: true })
    res: Response,
  ) {
    const findOrder = await this.orderUseCase.find(params.id);
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

  @Patch(":id")
  @Header("Content-Type", "application/json")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async update(
    @Param()
    params: {
      id: string;
    },
    @Body()
    body: {
      status: OrderStatus;
    },
  ) {
    const updatedOrder = await this.orderUseCase.update(params.id, {
      status: body.status,
    });
    return updatedOrder;
  }

  @Delete(":id")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async delete(
    @Param()
    params: {
      id: string;
    },
  ) {
    const deletedOrder = await this.orderUseCase.softDelete(params.id);
    return deletedOrder;
  }
}
