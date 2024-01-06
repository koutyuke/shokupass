import { Injectable, Inject } from "@nestjs/common";
import { InjectToken } from "src/common/constant/injectToken";
import { PaypayService } from "src/common/paypay/paypay.service";
import { Item } from "src/common/paypay/paypay.type";
import { v4 as uuid } from "uuid";
import { Payment } from "./domain/payment.domain";
import { PaymentStatus } from "./dto/payment.enum";
import type { IPaymentRepository } from "./interface/IPaymentRepository";

@Injectable()
export class PaymentUseCase {
  constructor(
    @Inject(InjectToken["PAYMENT_REPOSITORY"])
    private readonly paymentRepository: IPaymentRepository,
    private readonly paypayService: PaypayService,
  ) {}

  async find(id: string) {
    const findPayment = await this.paymentRepository.find(id);
    return findPayment;
  }

  async create(price: number, redirectPath: string, items: Item[]) {
    const id = uuid();
    const paymentData = await this.paypayService.createPayment(id, price, redirectPath, items);
    if (!paymentData) {
      return null;
    }

    const payment = await this.paymentRepository.create({
      id,
      codeId: paymentData.codeId,
      deeplink: paymentData.link,
      expiresAt: paymentData.expiresAt,
    });

    return payment;
  }

  async delete(id: string) {
    const findPayment = await this.paymentRepository.find(id);
    if (!findPayment) {
      return null;
    }
    const { codeId } = findPayment;

    const res = await this.paypayService.deletePayment(codeId);

    if (!res) {
      return null;
    }

    return id;
  }

  async updateStatus(id: string) {
    const findPayment = await this.paymentRepository.find(id);
    if (!findPayment) {
      return null;
    }

    const updatedPaymentStatus = await this.paypayService.paymentStatus(findPayment.id);
    if (!updatedPaymentStatus) {
      return null;
    }

    if (updatedPaymentStatus === "CREATED") {
      if (findPayment.isDateExpired) {
        const updatedPayment = await this.paymentRepository.update(
          new Payment({
            ...findPayment,
            deeplink: "",
            status: PaymentStatus.EXPIRED,
          }),
        );
        return updatedPayment;
      }

      return findPayment;
    } else if (updatedPaymentStatus === "COMPLETED") {
      const updatedPayment = await this.paymentRepository.update(
        new Payment({
          ...findPayment,
          deeplink: "",
          status: PaymentStatus.COMPLETED,
        }),
      );

      return updatedPayment;
    } else if (updatedPaymentStatus === "REFUNDED") {
      const updatedPayment = await this.paymentRepository.update(
        new Payment({
          ...findPayment,
          deeplink: "",
          status: PaymentStatus.REFUNDED,
        }),
      );

      return updatedPayment;
    }

    const updatedPayment = await this.paymentRepository.update(
      new Payment({
        ...findPayment,
        deeplink: "",
        status: PaymentStatus.FAILED,
      }),
    );
    return updatedPayment;
  }

  async setExpired(id: string) {
    const findPayment = await this.paymentRepository.find(id);
    if (!findPayment) {
      return null;
    }

    const updatedPayment = await this.paymentRepository.update(
      new Payment({
        ...findPayment,
        deeplink: "",
        status: PaymentStatus.EXPIRED,
      }),
    );

    return updatedPayment;
  }
}
