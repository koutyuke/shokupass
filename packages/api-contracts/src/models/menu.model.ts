import { z } from "zod";

export type MenuStatusType = "RELEASED" | "PREPARATION" | "DELETED" | "UNRELEASED";

export enum MenuStatusEnum {
  RELEASED = "RELEASED",
  PREPARATION = "PREPARATION",
  UNRELEASED = "UNRELEASED",
  DELETED = "DELETED",
}

export const menuStatusModel = z.enum(["RELEASED", "PREPARATION", "DELETED", "UNRELEASED"]);

export const menuModel = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  quantity: z.number(),
  status: menuStatusModel,
  createdAt: z.date(),
  updatedAt: z.date(),
});
