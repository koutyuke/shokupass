import { Body, Controller, Delete, Get, Header, Patch, Post, UseGuards } from "@nestjs/common";
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
    const menus = await this.menuUseCase.findReleased();
    return menus;
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

  @Patch()
  @Header("Content-Type", "application/json")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async update(
    @Body()
    body: {
      id: string;
      name: string;
      description: string;
      price: number;
      image: string | null;
      waitingTime: number;
    },
  ) {
    const updateMenu = await this.menuUseCase.update({
      id: body.id,
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      waitingTime: body.waitingTime,
    });

    return updateMenu;
  }

  @Delete()
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async delete(
    @Body()
    body: {
      id: string;
    },
  ) {
    const deleteMenu = await this.menuUseCase.softDelete(body.id);
    return deleteMenu;
  }

  @Get("all")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getAll() {
    const menus = await this.menuUseCase.findAll();
    return menus;
  }

  @Get("undeleted")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  async getUndeleted() {
    const menus = await this.menuUseCase.findUndeleted();
    return menus;
  }
}
