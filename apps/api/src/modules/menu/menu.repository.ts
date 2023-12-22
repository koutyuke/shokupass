import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { Menu } from "./domain/menu.domain";
import { IMenuRepository } from "./interface/IMenuRepository";

@Injectable()
export class MenuRepository implements IMenuRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: Menu["id"]): Promise<Menu | null> {
    const menu = await this.prismaService.menu.findUnique({
      where: {
        id: id,
      },
    });

    return menu && new Menu(menu);
  }

  async findMany(ids: string[]): Promise<Menu[]> {
    const menus = await this.prismaService.menu.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return menus.map(menu => new Menu(menu));
  }

  async create(menu: {
    id?: Menu["id"];
    name: Menu["name"];
    price: Menu["price"];
    description: Menu["description"];
    image: Menu["image"];
    waitingTime: Menu["waitingTime"];
    quantity: Menu["quantity"];
    status: Menu["status"];
    createdAt?: Menu["createdAt"];
    updatedAt?: Menu["updatedAt"];
  }): Promise<Menu> {
    const createdMenu = await this.prismaService.menu.create({
      data: menu,
    });

    return createdMenu && new Menu(createdMenu);
  }

  async findAll(): Promise<Menu[]> {
    const menus = await this.prismaService.menu.findMany();

    return menus.map(menu => new Menu(menu));
  }

  async update(menu: Menu): Promise<Menu> {
    const updatedMenu = await this.prismaService.menu.update({
      where: {
        id: menu.id,
      },
      data: menu,
    });

    return updatedMenu && new Menu(updatedMenu);
  }

  async delete(id: Menu["id"]): Promise<Menu> {
    const deletedMenu = await this.prismaService.menu.delete({
      where: {
        id: id,
      },
    });

    return deletedMenu && new Menu(deletedMenu);
  }
}
