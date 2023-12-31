import { Injectable } from "@nestjs/common";
import PAYPAY from "@paypayopa/paypayopa-sdk-node";
import { HttpsClientSuccess } from "@paypayopa/paypayopa-sdk-node/dist/lib/httpsClient";
import { EnvService } from "src/config/environments/env.service";
import { Item, ResGetCodePaymentDetailsStatus, ResQRCodeCreateData } from "./paypay.type";

@Injectable()
export class PaypayService {
  private readonly paypay: typeof PAYPAY;
  constructor(private readonly env: EnvService) {
    this.paypay = PAYPAY;
    this.paypay.Configure({
      clientId: this.env.PaypayAPIKey, // PayPay APIキー
      clientSecret: this.env.PaypayAPISecret, // PayPay シークレット
      merchantId: this.env.PaypayMerchantId, // PayPay Merchant ID
      productionMode: false,
    });
  }

  public async createPayment(
    id: string,
    price: number,
    redirectPath: string,
    items: Item[],
  ): Promise<{ link: string; expiresAt: Date; codeId: string } | undefined> {
    const payload = {
      merchantPaymentId: id,
      amount: {
        amount: price,
        currency: "JPY",
      },
      codeType: "ORDER_QR",
      orderDescription: "Test Payment",
      orderItems: items.map(item => ({
        productId: item.id,
        name: item.name,

        category: item.category,
        quantity: item.quantity,
        unitPrice: {
          amount: item.unitPrice,
          currency: "JPY",
        },
      })),
      isAuthorization: false,
      redirectUrl: `shokupass://${redirectPath}`,
      redirectType: "APP_DEEP_LINK",
    };

    const res = await this.paypay.QRCodeCreate(payload).then(res => {
      console.log(res);
      if (res.STATUS === 201) {
        const successResponse = res as HttpsClientSuccess;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (successResponse.BODY as any).data as ResQRCodeCreateData;
      }
      return undefined;
    });

    return (
      res && {
        codeId: res.codeId,
        link: res.deeplink,
        expiresAt: new Date(res.expiryDate),
      }
    );
  }

  public async deletePayment(codeId: string) {
    return await this.paypay
      .QRCodeDelete([codeId])
      .then(() => codeId)
      .catch(() => undefined);
  }

  public async paymentStatus(id: string) {
    const status = await this.paypay
      .GetCodePaymentDetails([id])
      .then(res => {
        if (res.STATUS === 200) {
          const successResponse = res as HttpsClientSuccess;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (successResponse.BODY as any).data.status as ResGetCodePaymentDetailsStatus;
        }
        return undefined;
      })
      .catch(err => {
        console.log(err);
        return undefined;
      });

    return status;
  }
}
