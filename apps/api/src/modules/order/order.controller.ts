import { BadRequestException, Controller, Header, NotFoundException, Req, UseGuards } from "@nestjs/common";
import { apiContract } from "@shokupass/api-contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { AuthGuard, type RequestWithUser } from "src/guard/auth/auth.guard";
import { LockerUseCase } from "../locker/locker.use-case";
import { MenuUseCase } from "../menu/menu.use-case";
import { OrderStatus } from "./dto/order.enum";
import { OrderUseCase } from "./order.use-case";

@Controller()
export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private readonly menuUseCase: MenuUseCase,
    private readonly lockerUseCase: LockerUseCase,
  ) {}

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.order.GetOrders)
  async getOrders() {
    return tsRestHandler(apiContract.order.GetOrders, async ({ query }) => {
      if (!query.status) {
        const orders = await this.orderUseCase.findAll();
        return {
          status: 200,
          body: orders,
        };
      }

      const ununiqueStatus = query.status.split(",").reduce((acc, cur) => {
        Object.values(OrderStatus).includes(cur as OrderStatus) && acc.push(cur as OrderStatus);
        return acc;
      }, [] as OrderStatus[]);
      const uniqueStatus = [...new Set(ununiqueStatus)] as OrderStatus[];
      const orders = await this.orderUseCase.findManyByStatus(uniqueStatus);

      return {
        status: 200,
        body: orders,
      };
    });
  }

  @Header("Content-Type", "application/json")
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.order.CreateOrder)
  async createOrder(
    @Req()
    request: RequestWithUser,
  ) {
    return tsRestHandler(apiContract.order.CreateOrder, async ({ body }) => {
      const menus = await this.menuUseCase.findManyById(body.items.map(item => item.menuId));
      const purchaseableMenus = menus.filter(menu => menu.isAvailable && menu.isInStock);
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

      if (!createOrder) {
        throw new BadRequestException();
      }

      return {
        status: 200,
        body: createOrder,
      };
    });
  }

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.order.GetOrder)
  async get() {
    return tsRestHandler(apiContract.order.GetOrder, async ({ params }) => {
      const findOrder = await this.orderUseCase.find(params.id);

      if (!findOrder) {
        throw new BadRequestException();
      }

      return {
        status: 200,
        body: findOrder,
      };
    });
  }

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.order.DeleteOrder)
  async delete() {
    return tsRestHandler(apiContract.order.DeleteOrder, async ({ params }) => {
      const deletedOrder = await this.orderUseCase.softDelete(params.id);
      return {
        status: 200,
        body: deletedOrder,
      };
    });
  }

  @Header("Content-Type", "application/json")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.order.UpdateOrderStatus)
  async updateOrderStatus() {
    return tsRestHandler(apiContract.order.UpdateOrderStatus, async ({ params, body }) => {
      const findOrder = await this.orderUseCase.find(params.id);
      if (!findOrder) {
        throw new NotFoundException();
      }

      const updatedOrder = await this.orderUseCase.update(params.id, {
        status: body.status,
      });
      return {
        status: 200,
        body: updatedOrder,
      };
    });
  }

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.order.UpdateOrderPayment)
  async updateOrderPayment() {
    return tsRestHandler(apiContract.order.UpdateOrderPayment, async ({ params }) => {
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
          return {
            status: 200,
            body: updatedOrder.payment,
          };
        }
        if (updatedPayment.isCompleted) {
          const updatedOrder = await this.orderUseCase.update(params.id, {
            status: OrderStatus.COOKING,
          });
          return {
            status: 200,
            body: updatedOrder.payment,
          };
        }
      }

      return {
        status: 200,
        body: findOrder.payment,
      };
    });
  }

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.order.UpdateOrderLocker)
  async updateOrderLocker() {
    return tsRestHandler(apiContract.order.UpdateOrderLocker, async ({ params, body }) => {
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

      return {
        status: 200,
        body: updatedOrder.locker,
      };
    });
  }
}
