import { Controller, Header, NotFoundException, UseGuards } from "@nestjs/common";
import { apiContract } from "@shokupass/api-contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { MenuStatus } from "./dto/menu.enum";
import { MenuUseCase } from "./menu.use-case";

@Controller()
export class MenuController {
  constructor(private readonly menuUseCase: MenuUseCase) {}

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.menu.GetMenus)
  async getMenus() {
    return tsRestHandler(apiContract.menu.GetMenus, async ({ query }) => {
      if (!query.status) {
        const menus = await this.menuUseCase.findAll();
        return {
          status: 200,
          body: menus,
        };
      }

      const ununiqueStatus = query.status.split(",").reduce((acc, cur) => {
        Object.values(MenuStatus).includes(cur as MenuStatus) && acc.push(cur as MenuStatus);
        return acc;
      }, [] as MenuStatus[]);
      const uniqueStatus = [...new Set(ununiqueStatus)] as MenuStatus[];
      const menus = await this.menuUseCase.findManyByStatus(uniqueStatus);

      return {
        status: 200,
        body: menus,
      };
    });
  }

  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.menu.GetMenusOnAvailable)
  async getMenusOnAvailable() {
    return tsRestHandler(apiContract.menu.GetMenusOnAvailable, async () => {
      const menus = await this.menuUseCase.findManyByStatus([MenuStatus.AVAILABLE]);
      return {
        status: 200,
        body: menus,
      };
    });
  }

  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.menu.GetMenu)
  async getMenu() {
    return tsRestHandler(apiContract.menu.GetMenu, async ({ params }) => {
      const menu = await this.menuUseCase.find(params.id);
      if (!menu) {
        throw new NotFoundException();
      }
      return {
        status: 200,
        body: menu,
      };
    });
  }

  @Header("Content-Type", "application/json")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.menu.CreateMenu)
  async createMenu() {
    return tsRestHandler(apiContract.menu.CreateMenu, async ({ body }) => {
      const createMenu = await this.menuUseCase.create({
        name: body.name,
        price: body.price,
        description: body.description,
        image: body.image,
        quantity: body.quantity,
        status: body.status,
      });

      return {
        status: 200,
        body: createMenu,
      };
    });
  }

  @Header("Content-Type", "application/json")
  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.menu.UpdateMenu)
  async updateMenu() {
    return tsRestHandler(apiContract.menu.UpdateMenu, async ({ params, body }) => {
      const findMenu = await this.menuUseCase.find(params.id);
      if (!findMenu) {
        throw new NotFoundException();
      }

      const updateMenu = await this.menuUseCase.update({
        id: params.id,
        name: body.name,
        price: body.price,
        description: body.description,
        image: body.image,
        quantity: body.quantity,
        status: body.status,
      });

      return {
        status: 200,
        body: updateMenu,
      };
    });
  }

  @Roles([Role.MODERATOR, Role.ADMIN])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.menu.DeleteMenu)
  async deleteMenu() {
    return tsRestHandler(apiContract.menu.DeleteMenu, async ({ params }) => {
      const deleteMenu = await this.menuUseCase.softDelete(params.id);
      return {
        status: 200,
        body: deleteMenu,
      };
    });
  }

  @Roles([Role.ADMIN, Role.MODERATOR])
  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.menu.UpdateMenuStatus)
  async updateMenuStatus() {
    return tsRestHandler(apiContract.menu.UpdateMenuStatus, async ({ params, body }) => {
      const findMenu = await this.menuUseCase.find(params.id);
      if (!findMenu) {
        throw new NotFoundException();
      }

      const updateMenu = await this.menuUseCase.update({
        ...findMenu,
        status: body.status,
      });

      return {
        status: 200,
        body: updateMenu,
      };
    });
  }
}
