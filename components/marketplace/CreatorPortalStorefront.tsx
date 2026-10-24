"use client";

import React, { useState } from "react";
import { CreatorProfile } from "@/lib/types/marketplace";
import { Button } from "@/components/ui/button";
import { 
  Store, DollarSign, Package, TrendingUp, Plus, ShieldCheck, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockCreator: CreatorProfile = {
  creatorId: "cr-101",
  name: "Dr. Eleanor Vance",
  storeName: "Quantum Physics & AI Education Press",
  tagline: "Premier verified question banks & curriculum materials for STEM educators",
  totalProductsCount: 14,
  totalEarningsUSD: 24850.0,
  totalSalesUSD: 24850.0,
  followersCount: 1420,
  ratingAverage: 4.9,
  verifiedCreator: true,
  topSellingProduct: "1,000+ Quantum Physics MCQs Bank",
};

export function CreatorPortalStorefront() {
  const [creator, setCreator] = useState<CreatorProfile>(mockCreator);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> Verified Marketplace Educator Storefront
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{creator.storeName}</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">{creator.tagline}</p>
        </div>

        <Button onClick={() => toast.info("Opening Product Publishing Wizard...")} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Plus className="w-4 h-4 mr-1.5" /> Publish New Item
        </Button>
      </div>

      {/* Revenue & Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Total Creator Earnings</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">${(creator.totalEarningsUSD ?? 0).toLocaleString()}</p>
          <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Published Products</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{creator.totalProductsCount} Items</p>
          <p className="text-[11px] text-slate-400">All Verified</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Store Rating</span>
          <p className="text-3xl font-black text-amber-500">{creator.ratingAverage} / 5.0</p>
          <p className="text-[11px] text-amber-600 font-semibold">5-Star Educator Trust</p>
        </div>
      </div>
    </div>
  );
}
