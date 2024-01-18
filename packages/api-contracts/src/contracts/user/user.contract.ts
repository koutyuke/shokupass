import { AppRoute } from "@ts-rest/core";
import { z } from "zod";
import { orderSchema, paymentSchema, userSchema } from "@/models";

const GetMyUser = {
  method: "GET",
  path: "/users/@me",
  responses: {
    200: userSchema,
  },
} satisfies AppRoute;

const GetMyOrders = {
  method: "GET",
  path: "/users/@me/orders",
  responses: {
    200: z.array(orderSchema),
  },
} satisfies AppRoute;

const GetMyOrder = {
  method: "GET",
  path: "/users/@me/orders/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  responses: {
    200: orderSchema,
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
    200: paymentSchema,
  },
} satisfies AppRoute;

export { GetMyUser, GetMyOrders, GetMyOrder, UpdateMyOrderPayment };
