import { Locker } from "../domain/locker.domain";

export interface ILockerRepository {
  find(lockerId: Locker["id"]): Promise<Locker | null>;
  findAll(): Promise<Locker[]>;
  updateOrderId(lockerId: Locker["id"], orderId: Locker["orderId"]): Promise<Locker>;
}
