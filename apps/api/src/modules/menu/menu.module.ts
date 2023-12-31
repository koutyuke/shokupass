import { Module } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { MenuController } from "./menu.controller";
import { MenuRepository } from "./menu.repository";
import { MenuUseCase } from "./menu.use-case";

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [
    {
      provide: InjectToken["MENU_REPOSITORY"],
      useClass: MenuRepository,
    },
    MenuUseCase,
  ],
  exports: [MenuUseCase],
})
export class MenuModule {}
