import { Inject, Injectable } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { Locker } from "./domain/locker.domain";
import type { ILockerRepository } from "./interface/ILockerRepository";

@Injectable()
export class LockerUseCase {
  constructor(
    @Inject(InjectToken["LOCKER_REPOSITORY"])
    private readonly lockerRepository: ILockerRepository,
  ) {}

  async find(lockerId: Locker["id"]) {
    const findLocker = await this.lockerRepository.find(lockerId);
    return findLocker;
  }

  async findAll() {
    const findAllLocker = await this.lockerRepository.findAll();
    return findAllLocker;
  }

  async updateOrderId(lockerId: Locker["id"], orderId: Locker["orderId"]) {
    const updateOrderId = await this.lockerRepository.updateOrderId(lockerId, orderId);
    return updateOrderId;
  }
}
