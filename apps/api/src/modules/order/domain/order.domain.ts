import { Locker } from "src/modules/locker/domain/locker.domain";
import { Payment } from "src/modules/payment/domain/payment.domain";
import { OrderStatus } from "../dto/order.enum";
import { OrderStatus as OrderStatusType } from "../dto/order.type";
import { OrderItem } from "../dto/order.type";

export class Order {
  readonly id: string;
  readonly userId: string;
  readonly items: OrderItem[];
  readonly status: OrderStatusType;
  readonly payment: Payment;
  readonly locker: Locker | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(order: {
    id: string;
    userId: string;
    items: OrderItem[];
    status: OrderStatusType;
    payment: Payment;
    locker?: Locker | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = order.id;
    this.userId = order.userId;
    this.items = order.items;
    this.status = order.status;
    this.payment = order.payment;
    this.locker = order.locker || null;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }

  get isPending() {
    return this.status === OrderStatus.PENDING;
  }

  get isPayment() {
    return this.status === OrderStatus.PAYMENT;
  }

  get isCooking() {
    return this.status === OrderStatus.COOKING;
  }

  get isReadyForPickup() {
    return this.status === OrderStatus.READY_FOR_PICKUP;
  }

  get isCompleted() {
    return this.status === OrderStatus.COMPLETED;
  }

  get isCancelled() {
    return this.status === OrderStatus.CANCELLED;
  }

  get isRefunded() {
    return this.status === OrderStatus.REFUNDED;
  }

  get totalPrice() {
    return this.items.reduce((acc, item) => acc + item.menu.price * item.quantity, 0);
  }
}
