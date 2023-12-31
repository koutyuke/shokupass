import { Inject, Injectable } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { PaymentUseCase } from "../payment/payment.use-case";
import { Order } from "./domain/order.domain";
import { OrderStatus } from "./dto/order.enum";
import type { IOrderRepository } from "./interface/IOrderRepository";

@Injectable()
export class OrderUseCase {
  constructor(
    @Inject(InjectToken["ORDER_REPOSITORY"])
    private readonly orderRepository: IOrderRepository,
    private readonly paymentUseCase: PaymentUseCase,
  ) {}

  async find(id: string) {
    const findOrder = await this.orderRepository.find(id);
    return findOrder;
  }

  async findByUserIdAndId(userId: string, id: string) {
    const findOrderByUserIdAndId = await this.orderRepository.findByUserIdAndId(userId, id);
    return findOrderByUserIdAndId;
  }

  async findAll() {
    const findAllOrder = await this.orderRepository.findAll();
    return findAllOrder;
  }

  async findMany(func: (order: Order) => boolean) {
    const findAll = await this.orderRepository.findAll();
    const findManyOrder = findAll.filter(func);
    return findManyOrder;
  }

  async findManyById(ids: string[]) {
    const findManyOrder = await this.orderRepository.findMany(ids);
    return findManyOrder;
  }

  async findManyByUserId(userId: string) {
    const findManyOrderByUserId = await this.orderRepository.findManyByUserId(userId);
    return findManyOrderByUserId;
  }

  async create(order: Pick<Order, "userId" | "items" | "status">) {
    const payment = await this.paymentUseCase.create(
      order.items.reduce((acc, cur) => acc + cur.menu.price * cur.quantity, 0),
      "",
      order.items.map(item => ({
        id: item.menu.id,
        name: item.menu.name,
        quantity: item.quantity,
        unitPrice: item.menu.price,
        category: "Food",
      })),
    );

    const createOrder = await this.orderRepository.create({
      ...order,
      paymentId: payment.id,
    });
    return createOrder;
  }

  async update(id: string, update: Partial<Pick<Order, "status">>) {
    const updatedOrder = await this.orderRepository.update(id, update);
    return updatedOrder;
  }

  async delete(id: string) {
    const deletedOrder = await this.orderRepository.delete(id);
    return deletedOrder;
  }

  async softDelete(id: string) {
    const softDeletedOrder = await this.update(id, {
      status: OrderStatus.CANCELLED,
    });
    return softDeletedOrder;
  }

  async updatePayment(id: string) {
    const findOrder = await this.find(id);
    if (!findOrder) {
      return null;
    }
    return await this.paymentUseCase.updateStatus(findOrder.payment.id);
  }

  async setNewPayment(order: Order) {
    const newPayment = await this.paymentUseCase.create(
      order.items.reduce((acc, cur) => acc + cur.menu.price * cur.quantity, 0),
      "",
      order.items.map(item => ({
        id: item.menu.id,
        name: item.menu.name,
        quantity: item.quantity,
        unitPrice: item.menu.price,
        category: "Food",
      })),
    );

    const updatedOrder = await this.orderRepository.updatePaymentId(order.id, newPayment.id);

    return updatedOrder;
  }
}