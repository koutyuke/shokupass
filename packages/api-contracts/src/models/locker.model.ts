import { z } from "zod";

export const lockerModel = z.object({
  id: z.string(),
  orderId: z.string().nullable(),
});
