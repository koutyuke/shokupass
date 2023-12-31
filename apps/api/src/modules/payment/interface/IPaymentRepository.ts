import { Payment } from "../domain/payment.domain";

export interface IPaymentRepository {
  find(paymentId: Payment["id"]): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
  create(payment: {
    id?: Payment["id"];
    codeId: Payment["codeId"];
    expiresAt: Payment["expiresAt"];
    deeplink: Payment["deeplink"];
    status?: Payment["status"];
  }): Promise<Payment>;
  update(payment: Payment): Promise<Payment>;
  delete(paymentId: Payment["id"]): Promise<Payment>;
}
