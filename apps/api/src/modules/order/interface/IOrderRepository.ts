import type { Order } from "../domain/order.domain";

export interface IOrderRepository {
  find(id: Order["id"]): Promise<Order | null>;
  findByUserIdAndId(userId: Order["userId"], id: Order["id"]): Promise<Order | null>;
  findMany(ids: Order["id"][]): Promise<Order[]>;
  findManyByUserId(userId: Order["userId"]): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  create(
    order: {
      paymentId: string;
    } & Pick<Order, "userId" | "items" | "status">,
  ): Promise<Order>;
  update(id: Order["id"], update: Partial<Pick<Order, "status">>): Promise<Order>;
  updatePaymentId(id: Order["id"], paymentId: string): Promise<Order>;
  delete(id: Order["id"]): Promise<Order>;
}
