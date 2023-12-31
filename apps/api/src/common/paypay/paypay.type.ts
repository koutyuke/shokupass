export type Item = { id: string; name: string; unitPrice: number; quantity: number; category: string };

export type ResQRCodeCreateData = {
  codeId: string;
  url: string;
  deeplink: string;
  expiryDate: number;
  merchantPaymentId: string;
  amount: {
    amount: number;
    currency: string;
  };
  orderDescription: string;
  redirectUrl: string;
  redirectType: string;
};

export type ResGetCodePaymentDetailsStatus = "CREATED" | "COMPLETED" | "AUTHORIZED" | "REFUNDED";
