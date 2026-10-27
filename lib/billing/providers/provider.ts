import { CurrencyCode,PaymentProviderType,PaymentTransaction } from "@/lib/types/billing";

export interface ProcessPaymentParams {
  userId: string;
  planId: string;
  amountUSD: number;
  amountINR: number;
  currency: CurrencyCode;
  paymentMethod: string;
  couponCode?: string;
}

export interface IPaymentProvider {
  id: PaymentProviderType;
  name: string;
  processPayment(params: ProcessPaymentParams): Promise<PaymentTransaction>;
  refundPayment(transactionId: string): Promise<boolean>;
}
