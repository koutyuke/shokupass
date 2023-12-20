import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard, type RequestWithUser } from "src/guard/auth/auth.guard";
import { UserUseCase } from "./user.use-case";

@Controller("user")
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get("@me")
  @UseGuards(AuthGuard)
  async create(@Req() request: RequestWithUser) {
    const reqUser = request.user;
    const findUser = await this.userUseCase.find(request.user.id);
    if (findUser) {
      return findUser;
    }

    const provider = reqUser.app_metadata.provider;
    if (provider === "discord") {
      const createUser = await this.userUseCase.create({
        id: request.user.id,
        name: reqUser.user_metadata["custom_claims"].global_name,
        iconImage: reqUser.user_metadata["avatar_url"],
        provider: "DISCORD",
        role: "USER",
      });
      return createUser;
    } else if (provider === "google") {
      const createUser = await this.userUseCase.create({
        id: request.user.id,
        name: reqUser.user_metadata["full_name"],
        iconImage: reqUser.user_metadata["avatar_url"],
        provider: "GOOGLE",
        role: "USER",
      });
      return createUser;
    }
    return "not found";
  }
}
