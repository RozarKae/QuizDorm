import { PaymentProviderType,PaymentTransaction } from "@/lib/types/billing";
import { IPaymentProvider,ProcessPaymentParams } from "./provider";

export class StripePaymentProvider implements IPaymentProvider {
  id: PaymentProviderType = "stripe";
  name = "Stripe Gateway (Sandbox Simulation)";

  async processPayment(params: ProcessPaymentParams): Promise<PaymentTransaction> {
    // In production, live charges are strictly forbidden without verified provider SDK credentials
    if (process.env.NODE_ENV === "production" && !process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "Stripe live payment processing is disabled: STRIPE_SECRET_KEY is not configured. Live charges cannot be processed."
      );
    }

    await new Promise((r) => setTimeout(r, 520));
    const invNum = `SANDBOX-STR-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      id: `sandbox_stripe_sim_${Date.now()}`,
      subscriptionId: `sandbox_sub_${Date.now()}`,
      userId: params.userId,
      provider: "stripe",
      amountUSD: params.amountUSD,
      amountINR: params.amountINR,
      currency: params.currency || "USD",
      status: "pending", // Explicitly pending/sandbox; never claim verified real payment
      paymentMethod: `${params.paymentMethod || "Visa / Mastercard"} [Sandbox Demo]`,
      timestamp: new Date().toISOString(),
      invoiceNumber: invNum,
      taxAmountUSD: Number((params.amountUSD * 0.18).toFixed(2)),
      appliedCouponCode: params.couponCode,
    };
  }

  async refundPayment(transactionId: string): Promise<boolean> {
    void transactionId;
    // Cannot claim real refund occurred in sandbox simulation
    return false;
  }
}
