import { AppRoute } from "@ts-rest/core";
import { z } from "zod";
import { menuModel, menuStatusModel } from "@/models";

const GetMenus = {
  method: "GET",
  path: "/menu",
  responses: {
    200: z.array(menuModel),
  },
} satisfies AppRoute;

const CreateMenu = {
  method: "POST",
  path: "/menu",
  body: z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string(),
  }),
  responses: {
    200: menuModel,
  },
} satisfies AppRoute;

const GetMenu = {
  method: "GET",
  path: "/menu/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  responses: {
    200: menuModel,
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
    200: menuModel,
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
    price: z.number(),
    description: z.string(),
    image: z.string(),
  }),
  responses: {
    200: menuModel,
  },
} satisfies AppRoute;

const GetMenusByStatus = {
  method: "GET",
  path: "/menu/status/",
  query: z.object({
    status: z.string(),
  }),
  responses: {
    200: z.array(menuModel),
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
    200: menuModel,
  },
} satisfies AppRoute;

export { GetMenus, CreateMenu, GetMenu, DeleteMenu, UpdateMenu, GetMenusByStatus, UpdateMenuStatus };
