"use client";

import { CurrencySelector } from "@/components/billing/CurrencySelector";
import Logo from "@/components/layout/Logo";
import { CouponManager } from "@/lib/billing/couponManager";
import { CurrencyManager } from "@/lib/billing/currencyManager";
import { MockPaymentProvider } from "@/lib/billing/providers/mockPaymentProvider";
import { RazorpayPaymentProvider } from "@/lib/billing/providers/razorpayProvider";
import { StripePaymentProvider } from "@/lib/billing/providers/stripeProvider";
import { SubscriptionManager } from "@/lib/billing/subscriptionManager";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { IPaymentProvider } from "@/lib/billing/providers/provider";
import { PaymentProviderType, SubscriptionPlanId } from "@/lib/types/billing";
import { useRouter,useSearchParams } from "next/navigation";
import React,{ Suspense,useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle,ArrowLeft,CreditCard,FlaskConical,ShieldAlert } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currency, config } = useCurrency();

  const planId = (searchParams?.get("plan") as SubscriptionPlanId) || "professional";
  const cycle = searchParams?.get("cycle") === "annual" ? "annual" : "monthly";

  const plan = SubscriptionManager.getPlan(planId);
  const basePriceINR = cycle === "annual" ? plan.priceAnnualINR : plan.priceMonthlyINR;
  const basePriceSelected = currency === "INR" ? basePriceINR : CurrencyManager.convertINR(basePriceINR, currency);

  // Set default provider based on currency
  const [provider, setProvider] = useState<PaymentProviderType>(() => (currency === "INR" ? "razorpay" : "stripe"));
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [gstin, setGstin] = useState("");
  const [processing, setProcessing] = useState(false);

  // Auto-switch gateway when user toggles currency
  React.useEffect(() => {
    queueMicrotask(() => {
      setProvider((prev) => {
        if (currency === "INR" && prev === "stripe") return "razorpay";
        if (currency !== "INR" && prev === "razorpay") return "stripe";
        return prev;
      });
    });
  }, [currency]);

  const discountAmount = Number(((basePriceSelected * discountPercent) / 100).toFixed(2));
  const finalPrice = Math.max(0, basePriceSelected - discountAmount);

  // Indian GST applies at 18% for INR billing; standard zero-rated export for international
  const taxRate = currency === "INR" ? 0.18 : 0.0;
  const taxAmount = Number((finalPrice * taxRate).toFixed(2));
  const totalAmount = Number((finalPrice + taxAmount).toFixed(2));

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const res = CouponManager.validateCoupon(couponCode, basePriceSelected, config.symbol);
    if (res.valid) {
      // Extract coupon percent or standard 20%
      const pct = couponCode.toUpperCase().includes("50") ? 50 : 20;
      setDiscountPercent(pct);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const isProduction = process.env.NODE_ENV === "production";

  const handlePayNow = async () => {
    if (isProduction) {
      toast.error("Commercial checkout is disabled in production. Live payment gateways are not configured.");
      return;
    }

    setProcessing(true);
    try {
      let paymentEngine: IPaymentProvider = new MockPaymentProvider();
      if (provider === "razorpay") paymentEngine = new RazorpayPaymentProvider();
      else if (provider === "stripe") paymentEngine = new StripePaymentProvider();

      const txn = await paymentEngine.processPayment({
        userId: "usr-teacher-1",
        planId: plan.id,
        amountUSD: currency === "USD" ? totalAmount : CurrencyManager.convertINR(basePriceINR * 1.18, "USD"),
        amountINR: currency === "INR" ? totalAmount : basePriceINR * 1.18,
        currency: currency,
        paymentMethod: `${provider.toUpperCase()} Sandbox Simulation (${currency})`,
        couponCode: discountAmount > 0 ? couponCode : undefined,
      });

      // Security Remediation: Client-side self-activation of paid plans is forbidden.
      // Do NOT invoke SubscriptionManager.updateSubscription(plan.id, cycle) to grant paid privileges.
      toast.info(
        `Sandbox checkout simulation recorded (${txn.invoiceNumber}). Live payment processing is disabled; no actual charge was made and no paid entitlement was granted.`,
        { duration: 6000 }
      );
      router.push("/dashboard/billing");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout transaction failed.";
      toast.error(message);
    } finally {
      setProcessing(false);
    }
  };

  const formattedBase = CurrencyManager.format(basePriceSelected, currency);
  const formattedDiscount = CurrencyManager.format(discountAmount, currency);
  const formattedTax = CurrencyManager.format(taxAmount, currency);
  const formattedTotal = CurrencyManager.format(totalAmount, currency);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-[#F2F7F3]">
      {/* Sandbox Truthfulness Notice */}
      <div className="bg-[#1D1013] border border-[#FF4D6D]/30 rounded-[8px] p-4 flex items-start gap-3 shadow-lg">
        <AlertTriangle className="w-5 h-5 text-[#FF4D6D] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold font-mono text-[#FF4D6D] uppercase tracking-wider">
            Sandbox Demonstration Environment
          </h4>
          <p className="text-xs text-[#A0AEA5] font-mono leading-relaxed">
            QuizDorm live payment processing and automated subscription provisioning are currently in demonstration mode.
            Live gateway credentials (Stripe / Razorpay) are not connected. No bank charges, credit card debits, or paid plan activations will occur.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Order Summary & Currency */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.16)] rounded-[8px] p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-4">
              <h3 className="text-sm font-bold font-display text-[#F2F7F3] flex items-center">
                <CreditCard className="w-4 h-4 text-[#FF4D6D] mr-2" /> Order Summary
              </h3>
              <CurrencySelector />
            </div>

            <div className="p-4 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#F2F7F3] font-display">{plan.name}</span>
                <span className="text-[10px] font-mono uppercase bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] px-2 py-0.5 rounded-[2px] border border-[rgba(255, 77, 109,0.3)] font-bold">
                  {cycle}
                </span>
              </div>
              <p className="text-xs text-[#A0AEA5] font-mono leading-relaxed">{plan.description}</p>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#A0AEA5]">Plan Base Price ({cycle}):</span>
                <span className="font-semibold text-[#F2F7F3]">{formattedBase}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#FF4D6D]">
                  <span>Coupon Discount ({couponCode.toUpperCase()}):</span>
                  <span>-{formattedDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[#A0AEA5]">
                  {currency === "INR" ? "GST (18% Educational SAC 998431):" : "Applicable Regional Taxes (0%):"}
                </span>
                <span className="font-semibold text-[#F2F7F3]">{formattedTax}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#F2F7F3] border-t border-[rgba(240, 160, 180,0.12)] pt-3 font-mono">
                <span>Total Due Today:</span>
                <span className="text-[#FF4D6D] font-display">{formattedTotal}</span>
              </div>

              {currency !== "INR" && (
                <p className="text-[10px] text-[#69786F] italic">
                  * Converted dynamically from base rate ₹{basePriceINR.toLocaleString("en-IN")}.
                </p>
              )}
            </div>

            {/* Coupon Redeemer */}
            <div className="pt-2 border-t border-[rgba(240, 160, 180,0.12)]">
              <label className="text-[11px] font-mono text-[#A0AEA5] block mb-1.5">
                Have a Promotional Voucher?
              </label>
              <div className="flex space-x-2">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="TEACHER50"
                  className="bg-[#1D1013] text-xs font-mono uppercase border-[rgba(240, 160, 180,0.18)] text-[#F2F7F3] focus:border-[#FF4D6D] rounded-[4px] h-9"
                />
                <Button
                  onClick={handleApplyCoupon}
                  size="sm"
                  variant="outline"
                  className="text-xs font-mono rounded-[4px] border-[rgba(240, 160, 180,0.2)] hover:border-[#FF4D6D]/40 text-[#F2F7F3] h-9"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Gateway & Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.16)] rounded-[8px] p-6 space-y-5 shadow-xl">
            <h3 className="text-sm font-bold font-display text-[#F2F7F3] flex items-center border-b border-[rgba(240, 160, 180,0.12)] pb-4">
              <ShieldAlert className="w-4 h-4 text-[#FF4D6D] mr-2" /> Gateway Selection (Sandbox)
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#A0AEA5] block uppercase tracking-wider">
                {currency === "INR" ? "Indian Rails (Sandbox Simulation)" : "International Rails (Sandbox Simulation)"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {currency === "INR" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setProvider("razorpay")}
                      className={`p-3 rounded-[4px] border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                        provider === "razorpay"
                          ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.15)]"
                          : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#A0AEA5] hover:border-[rgba(240, 160, 180,0.25)]"
                      }`}
                    >
                      UPI (Sandbox)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProvider("stripe")}
                      className={`p-3 rounded-[4px] border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                        provider === "stripe"
                          ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.15)]"
                          : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#A0AEA5] hover:border-[rgba(240, 160, 180,0.25)]"
                      }`}
                    >
                      Cards (Sandbox)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProvider("mock")}
                      className={`p-3 rounded-[4px] border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                        provider === "mock"
                          ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.15)]"
                          : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#A0AEA5] hover:border-[rgba(240, 160, 180,0.25)]"
                      }`}
                    >
                      Test Adapter
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setProvider("stripe")}
                      className={`p-3 rounded-[4px] border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                        provider === "stripe"
                          ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.15)]"
                          : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#A0AEA5] hover:border-[rgba(240, 160, 180,0.25)]"
                      }`}
                    >
                      Stripe (Sandbox)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProvider("mock")}
                      className={`p-3 rounded-[4px] border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                        provider === "mock"
                          ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.15)]"
                          : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#A0AEA5] hover:border-[rgba(240, 160, 180,0.25)]"
                      }`}
                    >
                      Test Adapter
                    </button>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#A0AEA5] block mb-1.5">
                {currency === "INR" ? "Institution GSTIN (Optional):" : "Tax ID / VAT Number (Optional):"}
              </label>
              <Input
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                placeholder={currency === "INR" ? "33AAAAA0000A1Z5" : "EU123456789"}
                className="bg-[#1D1013] text-xs font-mono border-[rgba(240, 160, 180,0.18)] text-[#F2F7F3] focus:border-[#FF4D6D] rounded-[4px] h-9"
              />
            </div>

            {isProduction ? (
              <div className="space-y-2">
                <Button
                  disabled
                  className="w-full bg-[#1D1013] text-[#69786F] font-extrabold font-mono text-xs rounded-[4px] py-6 border border-[rgba(240, 160, 180,0.15)] cursor-not-allowed tracking-wider"
                >
                  LIVE CHECKOUT DISABLED (GATEWAY UNCONFIGURED)
                </Button>
                <p className="text-[10px] text-center font-mono text-[#FF4D6D]">
                  Production payments require server-side gateway webhooks and verified API secrets.
                </p>
              </div>
            ) : (
              <Button
                onClick={handlePayNow}
                disabled={processing}
                className="w-full bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-extrabold font-mono text-xs rounded-[4px] py-6 shadow-[0_0_20px_rgba(255, 77, 109,0.25)] tracking-wider transition-all cursor-pointer"
              >
                {processing ? "SIMULATING SANDBOX ORDER..." : `TEST SANDBOX ORDER (${formattedTotal}) — NO CHARGE`}
              </Button>
            )}

            <p className="text-[10px] text-center font-mono text-[#69786F]">
              Sandbox demonstration checkout. No real payment methods or bank accounts will be billed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#0B0708] text-[#F2F7F3] p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#FF4D6D] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
          </Link>
          <Logo />
        </div>
        <span className="text-[10px] font-mono font-bold text-[#FF4D6D] bg-[#1D1013] px-3 py-1 rounded-[3px] border border-[rgba(255, 77, 109,0.3)] flex items-center shadow-[0_0_10px_rgba(255, 77, 109,0.15)]">
          <FlaskConical className="w-3 h-3 mr-1" /> Sandbox Demonstration Checkout
        </span>
      </div>

      <Suspense fallback={<div className="text-center font-mono py-12 text-[#A0AEA5]">Loading Checkout Order...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
