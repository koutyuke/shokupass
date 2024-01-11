import { MenuStatus } from "../dto/menu.enum";

type Status = "RELEASED" | "PREPARATION" | "DELETED" | "UNRELEASED";

export class Menu {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string | null;
  readonly image: string | null;
  readonly quantity: number;
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
    this.status = menu.status;
    this.createdAt = menu.createdAt;
    this.updatedAt = menu.updatedAt;
  }

  get isReleased() {
    return this.status === MenuStatus.RELEASED;
  }

  get isPreparation() {
    return this.status === MenuStatus.PREPARATION;
  }

  get isDeleted() {
    return this.status === MenuStatus.DELETED;
  }

  get isUnreleased() {
    return this.status === MenuStatus.UNRELEASED;
  }

  get isOutOfStock() {
    return this.quantity <= 0;
  }

  get isInStock() {
    return this.quantity > 0;
  }
}
