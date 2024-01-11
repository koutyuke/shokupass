import { AppRoute } from "@ts-rest/core";
import { z } from "zod";
import { lockerModel } from "@/models";

const GetLockers = {
  method: "GET",
  path: "/lockers",
  responses: {
    200: z.array(lockerModel),
  },
} satisfies AppRoute;

const GetLocker = {
  method: "GET",
  path: "/lockers/:id",
  pathParams: z.object({
    id: z.string(),
  }),
  responses: {
    200: lockerModel,
  },
} satisfies AppRoute;

const OpenLocker = {
  method: "POST",
  path: "/lockers/:id/open",
  pathParams: z.object({
    id: z.string(),
  }),
  body: z.object({
    orderId: z.string(),
  }),
  responses: {
    200: lockerModel,
  },
} satisfies AppRoute;

export { GetLockers, GetLocker, OpenLocker };
