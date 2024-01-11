import { z } from "zod";
import { menuModel } from "./menu.model";

export const itemModel = z.object({
  menu: menuModel,
  quantity: z.number(),
});
