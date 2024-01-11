import { AppRoute } from "@ts-rest/core";
import { z } from "zod";
import { orderModel, paymentModel, userModel } from "@/models";

const GetMyUser = {
  method: "GET",
  path: "/users/@me",
  responses: {
    200: userModel,
  },
} satisfies AppRoute;

const GetMyOrders = {
  method: "GET",
  path: "/users/@me/orders",
  responses: {
    200: z.array(orderModel),
  },
} satisfies AppRoute;

const GetMyOrder = {
  method: "GET",
  path: "/users/@me/orders/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  responses: {
    200: orderModel,
  },
} satisfies AppRoute;

const UpdateMyOrderPayment = {
  method: "PATCH",
  path: "/users/@me/orders/:id/payment",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({}),
  responses: {
    200: paymentModel,
  },
} satisfies AppRoute;

export { GetMyUser, GetMyOrders, GetMyOrder, UpdateMyOrderPayment };
