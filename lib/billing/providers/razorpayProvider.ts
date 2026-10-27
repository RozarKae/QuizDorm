import { PaymentProviderType,PaymentTransaction } from "@/lib/types/billing";
import { IPaymentProvider,ProcessPaymentParams } from "./provider";

export class RazorpayPaymentProvider implements IPaymentProvider {
  id: PaymentProviderType = "razorpay";
  name = "Razorpay Gateway (Sandbox Simulation)";

  async processPayment(params: ProcessPaymentParams): Promise<PaymentTransaction> {
    // In production, live charges are strictly forbidden without verified provider SDK credentials
    if (process.env.NODE_ENV === "production" && !process.env.RAZORPAY_KEY_ID) {
      throw new Error(
        "Razorpay live payment processing is disabled: RAZORPAY_KEY_ID is not configured. Live charges cannot be processed."
      );
    }

    await new Promise((r) => setTimeout(r, 500));
    const invNum = `SANDBOX-RZP-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      id: `sandbox_rzp_sim_${Date.now()}`,
      subscriptionId: `sandbox_sub_${Date.now()}`,
      userId: params.userId,
      provider: "razorpay",
      amountUSD: params.amountUSD,
      amountINR: params.amountINR,
      currency: "INR",
      status: "pending", // Explicitly pending/sandbox; never claim verified real payment
      paymentMethod: `${params.paymentMethod || "UPI (Google Pay / PhonePe)"} [Sandbox Demo]`,
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
