import { Inject, Injectable } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { MenuStatus } from "src/common/dto/enum";
import { Menu } from "./domain/menu.domain";
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
    const findManyMenu = await this.menuRepository.findMany(ids);
    return findManyMenu;
  }

  async findReleased() {
    const visibleMenus = await this.findMany(menu => menu.status === MenuStatus.RELEASED);
    return visibleMenus;
  }

  async findUndeleted() {
    const notDeletedMenus = await this.findMany(menu => menu.status !== MenuStatus.DELETED);
    return notDeletedMenus;
  }

  async findAll() {
    const findAll = await this.menuRepository.findAll();
    return findAll;
  }

  async create(menu: Pick<Menu, "name" | "price" | "description" | "image" | "waitingTime" | "quantity" | "status">) {
    const createMenu = await this.menuRepository.create(menu);
    return createMenu;
  }

  async update(args: {
    id: Menu["id"];
    name?: Menu["name"];
    price?: Menu["price"];
    description?: Menu["description"];
    image?: Menu["image"];
    waitingTime?: Menu["waitingTime"];
    quantity?: Menu["quantity"];
    status?: Menu["status"];
  }) {
    const findMenu = await this.menuRepository.find(args.id);
    if (!findMenu) {
      throw new Error("Menu not found");
    }
    const updateMenu = await this.menuRepository.update(
      new Menu({
        id: args.id,
        name: args.name || findMenu.name,
        price: args.price || findMenu.price,
        description: args.description || findMenu.description,
        image: args.image || findMenu.image,
        waitingTime: args.waitingTime || findMenu.waitingTime,
        quantity: args.quantity || findMenu.quantity,
        status: args.status || findMenu.status,
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
