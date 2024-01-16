import { z } from "zod";

export type MenuStatusType = "AVAILABLE" | "PREPARATION" | "DELETED";

export enum MenuStatusEnum {
  AVAILABLE = "AVAILABLE",
  PREPARATION = "PREPARATION",
  DELETED = "DELETED",
}

export const menuStatusModel = z.enum(["AVAILABLE", "PREPARATION", "DELETED"]);

export const menuSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  quantity: z.number(),
  status: menuStatusModel,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Menu = z.infer<typeof menuSchema>;
