import { IPaymentProvider, ProcessPaymentParams } from "./provider";
import { PaymentProviderType, PaymentTransaction } from "@/lib/types/billing";

export class MockPaymentProvider implements IPaymentProvider {
  id: PaymentProviderType = "mock";
  name = "QuizDorm 1-Click Simulation Gateway";

  async processPayment(params: ProcessPaymentParams): Promise<PaymentTransaction> {
    await new Promise((r) => setTimeout(r, 450)); // Simulated processing

    const invNum = `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      id: `txn-${Date.now()}`,
      subscriptionId: `sub-${Date.now()}`,
      userId: params.userId,
      provider: "mock",
      amountUSD: params.amountUSD,
      amountINR: params.amountINR,
      currency: params.currency,
      status: "success",
      paymentMethod: params.paymentMethod || "Credit Card (Simulated)",
      timestamp: new Date().toISOString(),
      invoiceNumber: invNum,
      taxAmountUSD: Number((params.amountUSD * 0.18).toFixed(2)),
      appliedCouponCode: params.couponCode,
    };
  }

  async refundPayment(transactionId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 200));
    return true;
  }
}
