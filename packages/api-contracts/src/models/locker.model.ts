import { z } from "zod";

export const lockerSchema = z.object({
  id: z.string(),
  orderId: z.string().nullable(),
});

export type Locker = z.infer<typeof lockerSchema>;
