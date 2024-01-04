export class Locker {
  readonly id: string;
  readonly orderId: string | null;

  constructor(args: { id: string; orderId: string | null }) {
    this.id = args.id;
    this.orderId = args.orderId;
  }
}
