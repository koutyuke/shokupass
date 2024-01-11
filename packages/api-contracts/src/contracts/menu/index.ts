import { AppRouter } from "@ts-rest/core";
import {
  GetMenus,
  CreateMenu,
  GetMenu,
  DeleteMenu,
  UpdateMenu,
  UpdateMenuStatus,
  GetMenusByStatus,
} from "./menu.contract";

const menuRoutes = {
  GetMenus,
  GetMenusByStatus,
  CreateMenu,
  GetMenu,
  DeleteMenu,
  UpdateMenu,
  UpdateMenuStatus,
} satisfies AppRouter;

export { menuRoutes };
