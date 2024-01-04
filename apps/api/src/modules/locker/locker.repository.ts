import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { Locker } from "./domain/locker.domain";
import { ILockerRepository } from "./interface/ILockerRepository";

@Injectable()
export class LockerRepository implements ILockerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: Locker["id"]): Promise<Locker | null> {
    const locker = await this.prismaService.locker.findUnique({
      where: {
        id: id,
      },
    });

    return locker && new Locker(locker);
  }

  async findAll(): Promise<Locker[]> {
    const lockers = await this.prismaService.locker.findMany();

    return lockers.map(locker => new Locker(locker));
  }

  async updateOrderId(lockerId: Locker["id"], orderId: Locker["orderId"]): Promise<Locker> {
    const locker = await this.prismaService.locker.update({
      where: {
        id: lockerId,
      },
      data: {
        orderId: orderId,
      },
    });

    return new Locker(locker);
  }
}
