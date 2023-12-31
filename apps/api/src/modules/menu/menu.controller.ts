import { Body, Controller, Delete, Get, Header, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { MenuStatus } from "@prisma/client";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { MenuUseCase } from "./menu.use-case";

@Controller("menus")
export class MenuController {
  constructor(private readonly menuUseCase: MenuUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  async get() {
    const menus = await this.menuUseCase.findMayByReleased();
    return menus;
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async getById(
    @Param()
    params: {
      id: string;
    },
  ) {
    const menu = await this.menuUseCase.find(params.id);
    return menu;
  }

  @Post()
  @Header("Content-Type", "application/json")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async create(
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      image: string | null;
      waitingTime: number;
    },
  ) {
    console.log(body);
    const createMenu = await this.menuUseCase.create({
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      waitingTime: body.waitingTime,
      quantity: 0,
      status: MenuStatus.PREPARATION,
    });

    return createMenu;
  }

  @Patch(":id")
  @Header("Content-Type", "application/json")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async update(
    @Param()
    params: {
      id: string;
    },
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      image: string | null;
      waitingTime: number;
    },
  ) {
    const updateMenu = await this.menuUseCase.update({
      id: params.id,
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      waitingTime: body.waitingTime,
    });

    return updateMenu;
  }

  @Delete(":id")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async delete(
    @Param()
    params: {
      id: string;
    },
  ) {
    const deleteMenu = await this.menuUseCase.softDelete(params.id);
    return deleteMenu;
  }

  @Get("all")
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  async getAll() {
    const menus = await this.menuUseCase.findAll();
    return menus;
  }

  @Get("undeleted")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getUndeleted() {
    const menus = await this.menuUseCase.findMayByUndeleted();
    return menus;
  }
}
