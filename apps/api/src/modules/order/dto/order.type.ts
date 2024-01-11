import { Menu } from "src/modules/menu/domain/menu.domain";

export type OrderItem = {
  menu: Menu;
  quantity: number;
};

export type OrderStatus =
  | "PENDING"
  | "PAYMENT"
  | "COOKING"
  | "READY_FOR_PICKUP"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED"
  | "DELETED";
