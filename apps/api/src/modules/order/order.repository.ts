import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { Locker } from "../locker/domain/locker.domain";
import { Menu } from "../menu/domain/menu.domain";
import { Payment } from "../payment/domain/payment.domain";
import { Order } from "./domain/order.domain";
import { IOrderRepository } from "./interface/IOrderRepository";

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: Order["id"]): Promise<Order | null> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: id,
      },
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return (
      order &&
      new Order({
        ...order,
        items: order.MenuOrder.map(menuOrder => ({
          menu: new Menu(menuOrder.menu),
          quantity: menuOrder.menuQuantity,
        })),
        payment: order.payment && new Payment(order.payment),
        locker: order.locker && new Locker(order.locker),
      })
    );
  }

  async findByUserIdAndId(userId: Order["userId"], id: Order["id"]): Promise<Order | null> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return (
      order &&
      new Order({
        ...order,
        items: order.MenuOrder.map(menuOrder => ({
          menu: new Menu(menuOrder.menu),
          quantity: menuOrder.menuQuantity,
        })),
        payment: order.payment && new Payment(order.payment),
        locker: order.locker && new Locker(order.locker),
      })
    );
  }

  async findMany(ids: string[]): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return orders.map(
      order =>
        new Order({
          ...order,
          items: order.MenuOrder.map(menuOrder => ({
            menu: new Menu(menuOrder.menu),
            quantity: menuOrder.menuQuantity,
          })),
          payment: order.payment && new Payment(order.payment),
          locker: order.locker && new Locker(order.locker),
        }),
    );
  }

  async findManyByUserId(userId: Order["userId"]): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return orders.map(
      order =>
        new Order({
          ...order,
          items: order.MenuOrder.map(menuOrder => ({
            menu: new Menu(menuOrder.menu),
            quantity: menuOrder.menuQuantity,
          })),
          payment: order.payment && new Payment(order.payment),
          locker: order.locker && new Locker(order.locker),
        }),
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return orders.map(
      order =>
        new Order({
          ...order,
          items: order.MenuOrder.map(menuOrder => ({
            menu: new Menu(menuOrder.menu),
            quantity: menuOrder.menuQuantity,
          })),
          payment: order.payment && new Payment(order.payment),
          locker: order.locker && new Locker(order.locker),
        }),
    );
  }

  async create(order: {
    id?: Order["id"];
    userId: Order["userId"];
    items: Order["items"];
    status: Order["status"];
    paymentId: string;
  }): Promise<Order> {
    const { items, ...restOrder } = order;
    const createdOrder = await this.prismaService.order.create({
      data: {
        ...restOrder,
        MenuOrder: {
          create: items.map(item => ({
            menuId: item.menu.id,
            menuQuantity: item.quantity,
          })),
        },
      },
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return (
      createdOrder &&
      new Order({
        ...createdOrder,
        items: createdOrder.MenuOrder.map(menuOrder => ({
          menu: new Menu(menuOrder.menu),
          quantity: menuOrder.menuQuantity,
        })),
        payment: createdOrder.payment && new Payment(createdOrder.payment),
        locker: createdOrder.locker && new Locker(createdOrder.locker),
      })
    );
  }

  async update(id: Order["id"], update: Partial<Pick<Order, "status">>): Promise<Order> {
    const updatedOrder = await this.prismaService.order.update({
      where: {
        id: id,
      },
      data: update,
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return (
      updatedOrder &&
      new Order({
        ...updatedOrder,
        items: updatedOrder.MenuOrder.map(menuOrder => ({
          menu: new Menu(menuOrder.menu),
          quantity: menuOrder.menuQuantity,
        })),
        payment: updatedOrder.payment && new Payment(updatedOrder.payment),
        locker: updatedOrder.locker && new Locker(updatedOrder.locker),
      })
    );
  }

  async updatePaymentId(id: Order["id"], paymentId: string): Promise<Order> {
    const updatedOrder = await this.prismaService.order.update({
      where: {
        id: id,
      },
      data: {
        paymentId: paymentId,
      },
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return (
      updatedOrder &&
      new Order({
        ...updatedOrder,
        items: updatedOrder.MenuOrder.map(menuOrder => ({
          menu: new Menu(menuOrder.menu),
          quantity: menuOrder.menuQuantity,
        })),
        payment: updatedOrder.payment && new Payment(updatedOrder.payment),
        locker: updatedOrder.locker && new Locker(updatedOrder.locker),
      })
    );
  }

  async delete(id: Order["id"]): Promise<Order> {
    const deletedOrder = await this.prismaService.order.delete({
      where: {
        id: id,
      },
      include: {
        MenuOrder: {
          include: {
            menu: true,
          },
        },
        payment: true,
        locker: true,
      },
    });

    return (
      deletedOrder &&
      new Order({
        ...deletedOrder,
        items: deletedOrder.MenuOrder.map(menuOrder => ({
          menu: new Menu(menuOrder.menu),
          quantity: menuOrder.menuQuantity,
        })),
        payment: deletedOrder.payment && new Payment(deletedOrder.payment),
        locker: deletedOrder.locker && new Locker(deletedOrder.locker),
      })
    );
  }
}
