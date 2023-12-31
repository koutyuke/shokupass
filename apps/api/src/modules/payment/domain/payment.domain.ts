import { PaymentStatus } from "../dto/payment.enum";

type Status = "PENDING" | "COMPLETED" | "REFUNDED" | "EXPIRED" | "FAILED";

export class Payment {
  readonly id: string;
  readonly codeId: string;
  readonly status: Status;
  readonly deeplink: string;
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(payment: {
    id: string;
    codeId: string;
    status: Status;
    deeplink: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = payment.id;
    this.codeId = payment.codeId;
    this.status = payment.status;
    this.deeplink = payment.deeplink;
    this.expiresAt = payment.expiresAt;
    this.createdAt = payment.createdAt;
    this.updatedAt = payment.updatedAt;
  }

  get isPending() {
    return this.status === PaymentStatus.PENDING;
  }

  get isCompleted() {
    return this.status === PaymentStatus.COMPLETED;
  }

  get isRefunded() {
    return this.status === PaymentStatus.REFUNDED;
  }

  get isExpired() {
    return this.status === PaymentStatus.EXPIRED;
  }

  get isFailed() {
    return this.status === PaymentStatus.FAILED;
  }

  get isDateExpired() {
    return new Date() > this.expiresAt;
  }
}
