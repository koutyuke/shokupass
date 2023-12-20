import { Inject, Injectable } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { User } from "./domain/user.domain";
import type { IUserRepository } from "./interface/IUserRepository";

@Injectable()
export class UserUseCase {
  constructor(
    @Inject(InjectToken["USER_REPOSITORY"])
    private readonly userRepository: IUserRepository,
  ) {}

  async find(userId: string) {
    const findUser = await this.userRepository.find(userId);
    return findUser;
  }

  async create(user: User) {
    const createUser = await this.userRepository.create(user);
    return createUser;
  }
}
