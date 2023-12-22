import { MenuStatus } from "src/common/dto/enum";

type Status = "RELEASED" | "PREPARATION" | "DELETED";

export class Menu {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string | null;
  readonly image: string | null;
  readonly quantity: number;
  readonly waitingTime: number;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(menu: {
    id: string;
    name: string;
    price: number;
    description: string | null;
    image: string | null;
    quantity: number;
    waitingTime: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = menu.id;
    this.name = menu.name;
    this.price = menu.price;
    this.description = menu.description;
    this.image = menu.image;
    this.quantity = menu.quantity;
    this.waitingTime = menu.waitingTime;
    this.status = menu.status;
    this.createdAt = menu.createdAt;
    this.updatedAt = menu.updatedAt;
  }

  get isReleased() {
    return this.status === MenuStatus.RELEASED;
  }
}
