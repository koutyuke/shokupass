import { AppRoute } from "@ts-rest/core";
import { z } from "zod";
import { lockerSchema, orderSchema, orderStatusModel, paymentSchema } from "@/models";

const GetOrders = {
  method: "GET",
  path: "/orders",
  query: z.object({
    status: z.string().optional(),
  }),
  responses: {
    200: z.array(orderSchema),
  },
} satisfies AppRoute;

const CreateOrder = {
  method: "POST",
  path: "/orders",
  body: z.object({
    items: z.array(
      z.object({
        menuId: z.string(),
        quantity: z.number().min(1),
      }),
    ),
  }),
  responses: {
    200: orderSchema,
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
    200: orderSchema,
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
    200: orderSchema,
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
    200: orderSchema,
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
    200: paymentSchema,
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
    200: lockerSchema.nullable(),
  },
} satisfies AppRoute;

export { GetOrders, CreateOrder, GetOrder, DeleteOrder, UpdateOrderStatus, UpdateOrderPayment, UpdateOrderLocker };
