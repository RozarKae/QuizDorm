import { IPaymentProvider, ProcessPaymentParams } from "./provider";
import { PaymentProviderType, PaymentTransaction } from "@/lib/types/billing";

export class StripePaymentProvider implements IPaymentProvider {
  id: PaymentProviderType = "stripe";
  name = "Stripe Gateway (Global Credit / Debit Cards)";

  async processPayment(params: ProcessPaymentParams): Promise<PaymentTransaction> {
    await new Promise((r) => setTimeout(r, 520));
    const invNum = `INV-STR-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      id: `pi_stripe_${Date.now()}`,
      subscriptionId: `sub_str_${Date.now()}`,
      userId: params.userId,
      provider: "stripe",
      amountUSD: params.amountUSD,
      amountINR: params.amountINR,
      currency: params.currency || "USD",
      status: "success",
      paymentMethod: params.paymentMethod || "Visa / Mastercard",
      timestamp: new Date().toISOString(),
      invoiceNumber: invNum,
      taxAmountUSD: Number((params.amountUSD * 0.18).toFixed(2)),
      appliedCouponCode: params.couponCode,
    };
  }

  async refundPayment(transactionId: string): Promise<boolean> {
    return true;
  }
}
