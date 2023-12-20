import { Module } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserUseCase } from "./user.use-case";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: InjectToken["USER_REPOSITORY"],
      useClass: UserRepository,
    },
    UserUseCase,
  ],
})
export class UserModule {}
