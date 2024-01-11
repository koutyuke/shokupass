import { z } from "zod";
import { itemModel } from "./item.model";
import { lockerModel } from "./locker.model";
import { paymentModel } from "./payment.model";

export type OrderStatusType =
  | "PENDING"
  | "PAYMENT"
  | "COOKING"
  | "READY_FOR_PICKUP"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED"
  | "DELETED";

export enum OrderStatusEnum {
  PENDING = "PENDING",
  PAYMENT = "PAYMENT",
  COOKING = "COOKING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  DELETED = "DELETED",
}

export const orderStatusModel = z.enum([
  "PENDING",
  "PAYMENT",
  "COOKING",
  "READY_FOR_PICKUP",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
  "DELETED",
]);

export const orderModel = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(itemModel),
  status: orderStatusModel,
  payment: paymentModel,
  locker: lockerModel.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
