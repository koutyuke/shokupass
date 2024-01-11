import { AppRouter } from "@ts-rest/core";
import { GetMyUser, GetMyOrder, UpdateMyOrderPayment, GetMyOrders } from "./user.contract";

const userRoutes = {
  GetMyUser,
  GetMyOrder,
  GetMyOrders,
  UpdateMyOrderPayment,
} satisfies AppRouter;

export { userRoutes };
