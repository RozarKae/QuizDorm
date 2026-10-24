"use client";

import React from "react";
import { MarketplaceSalesAnalytics } from "@/lib/types/marketplace";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, TrendingUp, DollarSign, Download, ShoppingBag
} from "lucide-react";
import { toast } from "sonner";

const mockAnalytics: MarketplaceSalesAnalytics = {
  totalGrossRevenueUSD: 148500.0,
  totalOrdersCount: 3420,
  averageOrderValueUSD: 43.42,
  topCategoryBySales: "Question Banks & Quiz Templates",
  activeSellersCount: 420,
};

export function MarketplaceAnalyticsConsole() {
  const handleExportDigest = () => {
    toast.success("Exported Marketplace Revenue Analytics Digest (PDF format)!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" /> Marketplace Business Intelligence & Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track gross merchandise volume (GMV), seller payouts, conversion rates, and product category popularity metrics.
          </p>
        </div>

        <Button onClick={handleExportDigest} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export Commerce Digest
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Gross Revenue (GMV)</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">${mockAnalytics.totalGrossRevenueUSD.toLocaleString()}</p>
          <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Total Orders</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.totalOrdersCount.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Completed Checkout Orders</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Average Order Value</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">${mockAnalytics.averageOrderValueUSD}</p>
          <p className="text-[11px] text-indigo-500 font-semibold">High Cart Conversion</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Active Educators/Sellers</span>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400">{mockAnalytics.activeSellersCount}</p>
          <p className="text-[11px] text-slate-400">Verified Stores</p>
        </div>
      </div>
    </div>
  );
}
