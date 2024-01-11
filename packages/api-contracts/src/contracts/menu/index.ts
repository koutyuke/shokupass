import { AppRouter } from "@ts-rest/core";
import {
  GetMenus,
  GetMenusOnAvailable,
  CreateMenu,
  GetMenu,
  DeleteMenu,
  UpdateMenu,
  UpdateMenuStatus,
} from "./menu.contract";

const menuRoutes = {
  GetMenus,
  GetMenusOnAvailable,
  CreateMenu,
  GetMenu,
  DeleteMenu,
  UpdateMenu,
  UpdateMenuStatus,
} satisfies AppRouter;

export { menuRoutes };
