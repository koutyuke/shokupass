import { AppRouter } from "@ts-rest/core";
import { GetLockers, GetLocker, OpenLocker } from "./locker.contract";

const lockerRoutes = {
  GetLockers,
  GetLocker,
  OpenLocker,
} satisfies AppRouter;

export { lockerRoutes };
