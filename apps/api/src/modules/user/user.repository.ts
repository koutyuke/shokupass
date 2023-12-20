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

    return (
      user &&
      new User({
        ...user,
        iconImage: user.icon_image,
      })
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map(
      user =>
        new User({
          ...user,
          iconImage: user.icon_image,
        }),
    );
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: {
        id: user.id,
        name: user.name,
        icon_image: user.iconImage,
        provider: user.provider,
      },
    });

    return (
      createdUser &&
      new User({
        ...createdUser,
        iconImage: createdUser.icon_image,
      })
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        icon_image: user.iconImage,
      },
    });

    return (
      updatedUser &&
      new User({
        ...updatedUser,
        iconImage: updatedUser.icon_image,
      })
    );
  }

  async delete(userId: string): Promise<User> {
    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });

    return (
      deletedUser &&
      new User({
        ...deletedUser,
        iconImage: deletedUser.icon_image,
      })
    );
  }
}
