"use client";

import React, { useState, useEffect } from "react";
import { UserSubscription, SubscriptionPlanId } from "@/lib/types/billing";
import { SubscriptionManager } from "@/lib/billing/subscriptionManager";
import { SubscriptionCard } from "@/components/billing/SubscriptionCard";
import { AICreditTrackerCard } from "@/components/billing/AICreditTrackerCard";
import { PricingTable } from "@/components/billing/PricingTable";
import { PaymentHistoryTable } from "@/components/billing/PaymentHistoryTable";
import { CouponManager } from "@/lib/billing/couponManager";

import { CreditCard, Sparkles, Tag, ShieldCheck, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function BillingDashboardPage() {
  const [subscription, setSubscription] = useState<UserSubscription>(SubscriptionManager.getSubscription());
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    setSubscription(SubscriptionManager.getSubscription());
  }, []);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const res = CouponManager.validateCoupon(couponCode, 29);
    if (res.valid) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
                <CreditCard className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.6 SaaS Billing
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Subscriptions, Billing & AI Credits Platform
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Manage plans, active seat allocations, monthly AI/OCR credit quotas, tax invoices, and multi-gateway billing settings.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Promo Code (e.g. TEACHER50)..."
              className="bg-transparent text-white placeholder-indigo-200 border-none text-xs w-48 focus:ring-0"
            />
            <Button onClick={handleApplyCoupon} size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl">
              Apply Code
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription Summary & AI Credits Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <SubscriptionCard subscription={subscription} />
        </div>
        <div className="lg:col-span-6">
          <AICreditTrackerCard subscription={subscription} />
        </div>
      </div>

      {/* Pricing Table Plans Selector */}
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Subscription Tier Catalog
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="text-xs text-gray-500">
            Scalable plans for individual teachers, tutoring centers, schools, colleges, and enterprise training institutions.
          </p>
        </div>

        <PricingTable currentPlanId={subscription.planId} />
      </div>

      {/* Payment History & Invoice Audit Log */}
      <PaymentHistoryTable />
    </div>
  );
}
