import { AppRoute } from "@ts-rest/core";
import { z } from "zod";
import { menuSchema, menuStatusModel } from "@/models";

const GetMenus = {
  method: "GET",
  path: "/menu",
  query: z.object({
    status: z.string().optional(),
  }),
  responses: {
    200: z.array(menuSchema),
  },
} satisfies AppRoute;

const GetMenusOnAvailable = {
  method: "GET",
  path: "/menu/available",
  responses: {
    200: z.array(menuSchema),
  },
} satisfies AppRoute;

const CreateMenu = {
  method: "POST",
  path: "/menu",
  body: z.object({
    name: z.string().min(1),
    price: z.number().min(0),
    description: z.string(),
    image: z.string().url(),
    quantity: z.number().min(0),
    status: menuStatusModel,
  }),
  responses: {
    200: menuSchema,
  },
} satisfies AppRoute;

const GetMenu = {
  method: "GET",
  path: "/menu/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  responses: {
    200: menuSchema,
  },
} satisfies AppRoute;

const DeleteMenu = {
  method: "DELETE",
  path: "/menu/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({}),
  responses: {
    200: menuSchema,
  },
} satisfies AppRoute;

const UpdateMenu = {
  method: "PATCH",
  path: "/menu/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string(),
    price: z.number().min(0),
    description: z.string(),
    image: z.string(),
    quantity: z.number().min(0),
    status: menuStatusModel,
  }),
  responses: {
    200: menuSchema,
  },
} satisfies AppRoute;

const UpdateMenuStatus = {
  method: "PATCH",
  path: "/menu/:id/status",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({
    status: menuStatusModel,
  }),
  responses: {
    200: menuSchema,
  },
} satisfies AppRoute;

export { GetMenus, GetMenusOnAvailable, CreateMenu, GetMenu, DeleteMenu, UpdateMenu, UpdateMenuStatus };
