import { AppRoute } from "@ts-rest/core";
import { z } from "zod";
import { lockerModel, orderModel, orderStatusModel, paymentModel } from "@/models";

const GetOrders = {
  method: "GET",
  path: "/orders",
  query: z.object({
    status: z.string().optional(),
  }),
  responses: {
    200: z.array(orderModel),
  },
} satisfies AppRoute;

const CreateOrder = {
  method: "POST",
  path: "/orders",
  body: z.object({
    items: z.array(
      z.object({
        menuId: z.string(),
        quantity: z.number(),
      }),
    ),
  }),
  responses: {
    200: orderModel,
  },
} satisfies AppRoute;

const GetOrder = {
  method: "GET",
  path: "/orders/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  headers: z.object({}),
  responses: {
    200: orderModel,
  },
} satisfies AppRoute;

const DeleteOrder = {
  method: "DELETE",
  path: "/orders/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({}),
  responses: {
    200: orderModel,
  },
} satisfies AppRoute;

const UpdateOrderStatus = {
  method: "PATCH",
  path: "/orders/:id/status",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({
    status: orderStatusModel,
  }),
  responses: {
    200: orderModel,
  },
} satisfies AppRoute;

const UpdateOrderPayment = {
  method: "PATCH",
  path: "/orders/:id/payment",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({}),
  responses: {
    200: paymentModel,
  },
} satisfies AppRoute;

const UpdateOrderLocker = {
  method: "POST",
  path: "/orders/:id/locker",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({
    lockerId: z.string(),
  }),
  responses: {
    200: lockerModel.nullable(),
  },
} satisfies AppRoute;

export { GetOrders, CreateOrder, GetOrder, DeleteOrder, UpdateOrderStatus, UpdateOrderPayment, UpdateOrderLocker };
