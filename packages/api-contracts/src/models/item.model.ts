import { z } from "zod";
import { menuSchema } from "./menu.model";

export const itemSchema = z.object({
  menu: menuSchema,
  quantity: z.number(),
});

export type Item = z.infer<typeof itemSchema>;
