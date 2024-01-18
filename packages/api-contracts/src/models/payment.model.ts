import { z } from "zod";

export type PaymentStatusType = "PENDING" | "COMPLETED" | "REFUNDED" | "EXPIRED" | "FAILED";

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
}

export const paymentStatusModel = z.enum(["PENDING", "COMPLETED", "REFUNDED", "EXPIRED", "FAILED"]);

export const paymentSchema = z.object({
  id: z.string(),
  codeId: z.string(),
  status: paymentStatusModel,
  deeplink: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Payment = z.infer<typeof paymentSchema>;
