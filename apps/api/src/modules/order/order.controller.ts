import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { AuthGuard, type RequestWithUser } from "src/guard/auth/auth.guard";
import { LockerUseCase } from "../locker/locker.use-case";
import { MenuUseCase } from "../menu/menu.use-case";
import { OrderStatus } from "./dto/order.enum";
import { OrderUseCase } from "./order.use-case";

@Controller("orders")
export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private readonly menuUseCase: MenuUseCase,
    private readonly lockerUseCase: LockerUseCase,
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
  ) {
    const menus = await this.menuUseCase.findManyById(body.items.map(item => item.menuId));
    const purchaseableMenus = menus.filter(menu => menu.isReleased && menu.isInStock);
    console.log(purchaseableMenus);
    if (purchaseableMenus.length !== body.items.length) {
      throw new BadRequestException();
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
  ) {
    const findOrder = await this.orderUseCase.find(params.id);

    if (!findOrder) {
      throw new BadRequestException();
    }

    return findOrder;
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

  @Patch(":id/status")
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

  @Patch(":id/payment")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getPayment(
    @Param()
    params: {
      id: string;
    },
  ) {
    const findOrder = await this.orderUseCase.find(params.id);
    if (!findOrder) {
      throw new NotFoundException();
    }

    if (findOrder.isPayment) {
      const updatedPayment = await this.orderUseCase.updatePayment(params.id);
      if (!updatedPayment) {
        throw new BadRequestException();
      }

      if (updatedPayment.isExpired) {
        const updatedOrder = await this.orderUseCase.setNewPayment(findOrder);
        if (!updatedOrder) {
          throw new BadRequestException();
        }
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

  @Post(":id/locker")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async setLocker(
    @Param()
    params: {
      id: string;
    },
    @Body()
    body: {
      lockerId: string;
    },
  ) {
    console.log(body, params);
    const findOrder = await this.orderUseCase.find(params.id);
    if (!findOrder) {
      throw new NotFoundException();
    }
    // statusの更新
    // lockerの接続
    await this.lockerUseCase.updateOrderId(body.lockerId, params.id);
    const updatedOrder = await this.orderUseCase.update(params.id, {
      status: OrderStatus.READY_FOR_PICKUP,
    });
    // push通知

    return updatedOrder.locker;
  }
}
