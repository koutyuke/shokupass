import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { User } from "./domain/user.domain";
import { IUserRepository } from "./interface/IUserRepository";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(userId: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user && new User(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map(user => new User(user));
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: user,
    });

    return createdUser && new User(createdUser);
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    return updatedUser && new User(updatedUser);
  }

  async delete(userId: string): Promise<User> {
    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });

    return deletedUser && new User(deletedUser);
  }
}
