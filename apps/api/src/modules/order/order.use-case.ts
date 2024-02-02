import { Inject, Injectable } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { v4 as uuid } from "uuid";
import { PaymentUseCase } from "../payment/payment.use-case";
import { Order } from "./domain/order.domain";
import { OrderStatus } from "./dto/order.enum";
import { OrderStatus as OrderStatusType } from "./dto/order.type";
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

  async findManyById(ids: string[]) {
    const findManyOrder = await this.orderRepository.findMany(ids);
    return findManyOrder;
  }

  async findManyByUserId(userId: string) {
    const findManyOrderByUserId = await this.orderRepository.findManyByUserId(userId);
    return findManyOrderByUserId;
  }

  async findManyByStatus(status: OrderStatusType[]) {
    const findManyOrderByStatus = await this.orderRepository.findManyByStatus(status);
    return findManyOrderByStatus;
  }

  async create(order: Pick<Order, "userId" | "items" | "status">) {
    const id = uuid();
    const payment = await this.paymentUseCase.create(
      order.items.reduce((acc, cur) => acc + cur.menu.price * cur.quantity, 0),
      `orders/${id}`,
      order.items.map(item => ({
        id: item.menu.id,
        name: item.menu.name,
        quantity: item.quantity,
        unitPrice: item.menu.price,
        category: "Food",
      })),
    );

    if (!payment) {
      return null;
    }

    const createOrder = await this.orderRepository.create({
      ...order,
      id,
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
      `orders/${order.id}`,
      order.items.map(item => ({
        id: item.menu.id,
        name: item.menu.name,
        quantity: item.quantity,
        unitPrice: item.menu.price,
        category: "Food",
      })),
    );

    if (!newPayment) {
      return null;
    }

    const updatedOrder = await this.orderRepository.updatePaymentId(order.id, newPayment.id);

    return updatedOrder;
  }
}
