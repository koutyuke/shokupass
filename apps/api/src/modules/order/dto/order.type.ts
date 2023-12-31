import { Menu } from "src/modules/menu/domain/menu.domain";

export type OrderItem = {
  menu: Menu;
  quantity: number;
};
