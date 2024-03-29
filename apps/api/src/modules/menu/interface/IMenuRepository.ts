import type { Menu } from "../domain/menu.domain";

export interface IMenuRepository {
  find(id: Menu["id"]): Promise<Menu | null>;
  findManyById(ids: Menu["id"][]): Promise<Menu[]>;
  findManyByStatus(status: Menu["status"][]): Promise<Menu[]>;
  findAll(): Promise<Menu[]>;
  create(menu: {
    id?: Menu["id"];
    name: Menu["name"];
    price: Menu["price"];
    description: Menu["description"];
    image: Menu["image"];
    quantity: Menu["quantity"];
    status: Menu["status"];
    createdAt?: Menu["createdAt"];
    updatedAt?: Menu["updatedAt"];
  }): Promise<Menu>;
  update(menu: Menu): Promise<Menu>;
  delete(id: Menu["id"]): Promise<Menu>;
}
