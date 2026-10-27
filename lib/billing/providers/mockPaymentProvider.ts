import { PaymentProviderType,PaymentTransaction } from "@/lib/types/billing";
import { IPaymentProvider,ProcessPaymentParams } from "./provider";

export class MockPaymentProvider implements IPaymentProvider {
  id: PaymentProviderType = "mock";
  name = "QuizDorm Sandbox Test Gateway (Demonstration Only)";

  async processPayment(params: ProcessPaymentParams): Promise<PaymentTransaction> {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Mock payment gateway cannot be used in production.");
    }

    await new Promise((r) => setTimeout(r, 450)); // Simulated processing

    const invNum = `SANDBOX-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      id: `sandbox_mock_${Date.now()}`,
      subscriptionId: `sandbox_sub_${Date.now()}`,
      userId: params.userId,
      provider: "mock",
      amountUSD: params.amountUSD,
      amountINR: params.amountINR,
      currency: params.currency,
      status: "pending", // Explicitly pending/sandbox; never claim verified real payment
      paymentMethod: `${params.paymentMethod || "Credit Card"} [Sandbox Simulation]`,
      timestamp: new Date().toISOString(),
      invoiceNumber: invNum,
      taxAmountUSD: Number((params.amountUSD * 0.18).toFixed(2)),
      appliedCouponCode: params.couponCode,
    };
  }

  async refundPayment(transactionId: string): Promise<boolean> {
    void transactionId;
    await new Promise((r) => setTimeout(r, 200));
    return false;
  }
}
