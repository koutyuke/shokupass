import { Inject, Injectable } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { Menu } from "./domain/menu.domain";
import { MenuStatus } from "./dto/menu.type";
import type { IMenuRepository } from "./interface/IMenuRepository";

@Injectable()
export class MenuUseCase {
  constructor(
    @Inject(InjectToken["MENU_REPOSITORY"])
    private readonly menuRepository: IMenuRepository,
  ) {}

  async find(id: string) {
    const findMenu = await this.menuRepository.find(id);
    return findMenu;
  }

  async findMany(func: (menu: Menu) => boolean) {
    const findAll = await this.menuRepository.findAll();
    const findManyMenu = findAll.filter(func);
    return findManyMenu;
  }

  async findManyById(ids: string[]) {
    const findManyMenu = await this.menuRepository.findManyById(ids);
    return findManyMenu;
  }

  async findManyByStatus(status: MenuStatus[]) {
    const visibleMenus = await this.findMany(menu => status.includes(menu.status));
    return visibleMenus;
  }

  async findAll() {
    const findAll = await this.menuRepository.findAll();
    return findAll;
  }

  async create(menu: Pick<Menu, "name" | "price" | "description" | "image" | "quantity" | "status">) {
    const createMenu = await this.menuRepository.create(menu);
    return createMenu;
  }

  async update(
    args: {
      id: Menu["id"];
    } & Partial<Pick<Menu, "name" | "price" | "description" | "image" | "quantity" | "status">>,
  ) {
    const findMenu = await this.menuRepository.find(args.id);
    if (!findMenu) {
      throw new Error("Menu not found");
    }
    const updateMenu = await this.menuRepository.update(
      new Menu({
        id: args.id,
        name: args.name === undefined ? findMenu.name : args.name,
        price: args.price === undefined ? findMenu.price : args.price,
        description: args.description === undefined ? findMenu.description : args.description,
        image: args.image === undefined ? findMenu.image : args.image,
        quantity: args.quantity === undefined ? findMenu.quantity : args.quantity,
        status: args.status === undefined ? findMenu.status : args.status,
        createdAt: findMenu.createdAt,
        updatedAt: findMenu.updatedAt,
      }),
    );
    return updateMenu;
  }

  async delete(id: string) {
    const deleteMenu = await this.menuRepository.delete(id);
    return deleteMenu;
  }

  async softDelete(id: string) {
    const updatedMenu = await this.update({
      id: id,
      status: "DELETED",
    });
    return updatedMenu;
  }

  async setStatus(id: string, status: MenuStatus) {
    const updatedMenu = await this.update({
      id: id,
      status: status,
    });
    return updatedMenu;
  }

  async decrementQuantity(id: string) {
    const updatedMenu = await this.update({
      id: id,
      quantity: -1,
    });
    return updatedMenu;
  }
}
