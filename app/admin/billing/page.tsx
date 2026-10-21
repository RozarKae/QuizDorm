"use client";

import React from "react";
import { BillingAnalytics } from "@/lib/types/billing";
import { PaymentHistoryTable } from "@/components/billing/PaymentHistoryTable";
import { DollarSign, TrendingUp, Users, RefreshCw, BarChart3, CreditCard, Tag, Sparkles } from "lucide-react";

export default function AdminBillingPage() {
  const analytics: BillingAnalytics = {
    monthlyRecurringRevenueUSD: 14850,
    annualRecurringRevenueUSD: 178200,
    activeSubscribersCount: 420,
    churnRatePercent: 1.2,
    totalTransactionsCount: 1840,
    aiCreditsConsumedTotal: 420000,
    ocrScansConsumedTotal: 84000,
  };

  const metrics = [
    {
      label: "Monthly Recurring (MRR)",
      value: `$${analytics.monthlyRecurringRevenueUSD.toLocaleString()}`,
      subtext: "+14.2% MoM growth",
      change: "+14.2%",
      isPositive: true,
      icon: <DollarSign className="w-4 h-4 text-[#65F59A]" />,
    },
    {
      label: "Annual Run-Rate (ARR)",
      value: `$${analytics.annualRecurringRevenueUSD.toLocaleString()}`,
      subtext: "Contracted annualized run-rate",
      change: "+18.6%",
      isPositive: true,
      icon: <TrendingUp className="w-4 h-4 text-[#38D9B0]" />,
    },
    {
      label: "Active Paid Subscribers",
      value: analytics.activeSubscribersCount.toString(),
      subtext: "Institutional & teacher seats",
      change: "+28 accounts",
      isPositive: true,
      icon: <Users className="w-4 h-4 text-[#65F59A]" />,
    },
    {
      label: "Subscriber Churn Rate",
      value: `${analytics.churnRatePercent}%`,
      subtext: "Top-decile SaaS benchmark",
      change: "-0.4% delta",
      isPositive: true,
      icon: <RefreshCw className="w-4 h-4 text-[#38D9B0]" />,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(101,245,154,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.1)] border border-[rgba(101,245,154,0.25)] text-[#65F59A] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
                Revenue & Billing // Finance Hub
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">PCI-DSS Tier 1</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Financial Operations & Billing Suite
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Real-time Monthly Recurring Revenue (MRR), Annual Run-Rate (ARR), subscriber churn rates, and PCI-DSS compliant payment transaction ledgers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.14)] font-mono text-xs text-[#65F59A] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#65F59A]" />
              Stripe & Razorpay Mesh
            </span>
          </div>
        </div>
      </div>

      {/* 2. Precision Financial HUD Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[rgba(160,190,170,0.28)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
                {m.label}
              </span>
              <div className="p-1 rounded-[3px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
                {m.icon}
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2F7F3] tabular-nums tracking-tight">
                  {m.value}
                </p>
                <p className="text-[11px] text-[#A0AEA5] mt-0.5 font-sans">{m.subtext}</p>
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.25)]">
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Transaction Log Table */}
      <PaymentHistoryTable />
    </div>
  );
}