"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SubscriptionPlanId, PaymentProviderType } from "@/lib/types/billing";
import { SubscriptionManager } from "@/lib/billing/subscriptionManager";
import { MockPaymentProvider } from "@/lib/billing/providers/mockPaymentProvider";
import { RazorpayPaymentProvider } from "@/lib/billing/providers/razorpayProvider";
import { StripePaymentProvider } from "@/lib/billing/providers/stripeProvider";
import { CouponManager } from "@/lib/billing/couponManager";
import Logo from "@/components/layout/Logo";

import { CreditCard, ShieldCheck, Lock, Check, Zap, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planId = (searchParams?.get("plan") as SubscriptionPlanId) || "professional";
  const cycle = searchParams?.get("cycle") === "annual" ? "annual" : "monthly";

  const plan = SubscriptionManager.getPlan(planId);
  const basePriceUSD = cycle === "annual" ? plan.priceAnnualUSD : plan.priceMonthlyUSD;

  const [provider, setProvider] = useState<PaymentProviderType>("mock");
  const [couponCode, setCouponCode] = useState("");
  const [discountUSD, setDiscountUSD] = useState(0);
  const [gstin, setGstin] = useState("");
  const [processing, setProcessing] = useState(false);

  const finalPriceUSD = Math.max(0, basePriceUSD - discountUSD);
  const taxUSD = Number((finalPriceUSD * 0.18).toFixed(2));
  const totalAmountUSD = Number((finalPriceUSD + taxUSD).toFixed(2));

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const res = CouponManager.validateCoupon(couponCode, basePriceUSD);
    if (res.valid) {
      setDiscountUSD(res.discountAmountUSD);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handlePayNow = async () => {
    setProcessing(true);
    try {
      let paymentEngine: any = new MockPaymentProvider();
      if (provider === "razorpay") paymentEngine = new RazorpayPaymentProvider();
      else if (provider === "stripe") paymentEngine = new StripePaymentProvider();

      const txn = await paymentEngine.processPayment({
        userId: "usr-teacher-1",
        planId: plan.id,
        amountUSD: totalAmountUSD,
        amountINR: totalAmountUSD * 83,
        currency: "USD",
        paymentMethod: `${provider.toUpperCase()} Gateway (1-Click Safe)`,
        couponCode: discountUSD > 0 ? couponCode : undefined,
      });

      SubscriptionManager.updateSubscription(plan.id, cycle as any);
      toast.success(`Payment verified! Invoice ${txn.invoiceNumber} generated.`);
      router.push("/dashboard/billing");
    } catch {
      toast.error("Checkout transaction failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Order Summary & Coupon */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center">
            <CreditCard className="w-5 h-5 text-indigo-400 mr-2" /> Order Summary
          </h3>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-indigo-300">{plan.name}</span>
              <span className="text-xs font-mono uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                {cycle}
              </span>
            </div>
            <p className="text-xs text-slate-400">{plan.description}</p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Plan Base Price:</span>
              <span>${basePriceUSD.toFixed(2)}</span>
            </div>

            {discountUSD > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Coupon Discount ({couponCode.toUpperCase()}):</span>
                <span>-${discountUSD.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-slate-400">GST / Tax (18%):</span>
              <span>${taxUSD.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-white border-t border-slate-800 pt-2 font-mono">
              <span>Total Due Today:</span>
              <span className="text-emerald-400">${totalAmountUSD.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Redeemer */}
          <div className="pt-2">
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Have a Promo Coupon?</label>
            <div className="flex space-x-2">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="TEACHER50"
                className="bg-slate-950 text-xs font-mono uppercase border-slate-800"
              />
              <Button onClick={handleApplyCoupon} size="sm" variant="outline" className="text-xs rounded-xl border-slate-700">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Payment Method & Pay Button */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" /> Payment Gateway & Details
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Select Payment Gateway</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "mock", label: "Mock 1-Click" },
                { id: "razorpay", label: "Razorpay (UPI)" },
                { id: "stripe", label: "Stripe (Cards)" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvider(p.id as any)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                    provider === p.id
                      ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/20"
                      : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Organization GSTIN (Optional)</label>
            <Input
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              placeholder="27AAACQ1234F1Z9"
              className="bg-slate-950 text-xs font-mono border-slate-800"
            />
          </div>

          <Button
            onClick={handlePayNow}
            disabled={processing}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm rounded-2xl py-6 shadow-lg shadow-emerald-500/30"
          >
            {processing ? "Processing Order..." : `Pay $${totalAmountUSD.toFixed(2)} & Activate Plan`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-white/10 pb-4">
        <Logo />
        <span className="text-xs font-mono font-bold text-emerald-400 bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center">
          <Lock className="w-3.5 h-3.5 mr-1" /> 256-Bit SSL Encrypted Checkout
        </span>
      </div>

      <Suspense fallback={<div className="text-center font-mono py-12 text-slate-400">Loading Checkout Order...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
