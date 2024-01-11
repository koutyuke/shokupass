import { AppRouter } from "@ts-rest/core";
import {
  GetOrders,
  CreateOrder,
  GetOrder,
  DeleteOrder,
  UpdateOrderStatus,
  UpdateOrderPayment,
  UpdateOrderLocker,
} from "./order.contract";

const orderRoutes = {
  GetOrders,
  CreateOrder,
  GetOrder,
  DeleteOrder,
  UpdateOrderStatus,
  UpdateOrderPayment,
  UpdateOrderLocker,
} satisfies AppRouter;

export { orderRoutes };
