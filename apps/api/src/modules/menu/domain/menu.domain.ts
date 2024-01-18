import { MenuStatus } from "../dto/menu.enum";
import { MenuStatus as MenuStatusType } from "../dto/menu.type";

export class Menu {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly image: string;
  readonly quantity: number;
  readonly status: MenuStatusType;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(menu: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    status: MenuStatusType;
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

  get isAvailable() {
    return this.status === MenuStatus.AVAILABLE;
  }

  get isPreparation() {
    return this.status === MenuStatus.PREPARATION;
  }

  get isDeleted() {
    return this.status === MenuStatus.DELETED;
  }

  get isOutOfStock() {
    return this.quantity <= 0;
  }

  get isInStock() {
    return this.quantity > 0;
  }
}
