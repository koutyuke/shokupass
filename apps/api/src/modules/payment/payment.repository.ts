import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { Payment } from "./domain/payment.domain";
import { IPaymentRepository } from "./interface/IPaymentRepository";

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(paymentId: Payment["id"]): Promise<Payment | null> {
    const payment = await this.prismaService.payment.findUnique({
      where: {
        id: paymentId,
      },
    });

    return payment && new Payment(payment);
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.prismaService.payment.findMany();

    return payments.map(payment => new Payment(payment));
  }

  async create(payment: {
    id?: Payment["id"];
    codeId: Payment["codeId"];
    expiresAt: Payment["expiresAt"];
    deeplink: Payment["deeplink"];
    status?: Payment["status"];
  }): Promise<Payment> {
    const createdPayment = await this.prismaService.payment.create({
      data: payment,
    });

    return createdPayment && new Payment(createdPayment);
  }

  async update(payment: Payment): Promise<Payment> {
    const updatedPayment = await this.prismaService.payment.update({
      where: {
        id: payment.id,
      },
      data: payment,
    });

    return updatedPayment && new Payment(updatedPayment);
  }

  async delete(paymentId: Payment["id"]): Promise<Payment> {
    const deletedPayment = await this.prismaService.payment.delete({
      where: {
        id: paymentId,
      },
    });

    return deletedPayment && new Payment(deletedPayment);
  }
}
