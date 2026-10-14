import { IPaymentProvider, ProcessPaymentParams } from "./provider";
import { PaymentProviderType, PaymentTransaction } from "@/lib/types/billing";

export class RazorpayPaymentProvider implements IPaymentProvider {
  id: PaymentProviderType = "razorpay";
  name = "Razorpay Gateway (UPI / Cards / NetBanking)";

  async processPayment(params: ProcessPaymentParams): Promise<PaymentTransaction> {
    await new Promise((r) => setTimeout(r, 500));
    const invNum = `INV-RZP-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      id: `rzp_pay_${Date.now()}`,
      subscriptionId: `sub_rzp_${Date.now()}`,
      userId: params.userId,
      provider: "razorpay",
      amountUSD: params.amountUSD,
      amountINR: params.amountINR,
      currency: "INR",
      status: "success",
      paymentMethod: params.paymentMethod || "UPI (Google Pay / PhonePe)",
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
