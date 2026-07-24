"use client";

import React from "react";
import { BillingAnalytics } from "@/lib/types/billing";
import { PaymentHistoryTable } from "@/components/billing/PaymentHistoryTable";
import { DollarSign, TrendingUp, Users, RefreshCw, BarChart3, CreditCard, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";

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

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300">
              <DollarSign className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              SaaS Financial Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Revenue, Subscriptions & Financial Audit Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Real-time Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), subscriber churn rates, and transaction logs.
          </p>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500 mr-1" /> Monthly Recurring (MRR)
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            ${analytics.monthlyRecurringRevenueUSD.toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Annual Run-Rate (ARR)
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            ${analytics.annualRecurringRevenueUSD.toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <Users className="w-3.5 h-3.5 text-purple-500 mr-1" /> Active Subscribers
          </span>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
            {analytics.activeSubscribersCount}
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <RefreshCw className="w-3.5 h-3.5 text-amber-500 mr-1" /> Churn Rate
          </span>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
            {analytics.churnRatePercent}%
          </div>
        </Card>
      </div>

      {/* Transaction Log Table */}
      <PaymentHistoryTable />
    </div>
  );
}
