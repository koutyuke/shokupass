import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { lockerRoutes } from "./locker";
import { menuRoutes } from "./menu";
import { orderRoutes } from "./order";
import { userRoutes } from "./user";

const c = initContract();

export const apiContract = c.router(
  {
    user: userRoutes,
    order: orderRoutes,
    menu: menuRoutes,
    locker: lockerRoutes,
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  },
);
