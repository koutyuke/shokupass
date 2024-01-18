import { z } from "zod";
import { itemSchema } from "./item.model";
import { lockerSchema } from "./locker.model";
import { paymentSchema } from "./payment.model";

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

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(itemSchema),
  status: orderStatusModel,
  payment: paymentSchema,
  locker: lockerSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Order = z.infer<typeof orderSchema>;
