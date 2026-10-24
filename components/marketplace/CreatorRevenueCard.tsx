"use client";

import React, { useState } from "react";
import { CreatorRevenueEngine } from "@/lib/marketplace/revenueEngine";
import { CreatorPayout } from "@/lib/types/marketplace";
import { DollarSign, ArrowUpRight, CheckCircle2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CreatorRevenueCardProps {
  totalSalesUSD: number;
}

export function CreatorRevenueCard({ totalSalesUSD }: CreatorRevenueCardProps) {
  const [payouts, setPayouts] = useState<CreatorPayout[]>(CreatorRevenueEngine.getPayouts());
  const calc = CreatorRevenueEngine.calculateEarnings(totalSalesUSD);

  const handleRequestPayout = () => {
    toast.success(`Requested payout of $${calc.netEarningsUSD.toLocaleString()} via Stripe Connect!`);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <DollarSign className="w-5 h-5 text-rose-500 mr-2" /> Creator Earnings & Revenue Share (80/20)
        </h3>
        <Button onClick={handleRequestPayout} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl">
          <ArrowUpRight className="w-4 h-4 mr-1" /> Request Earnings Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Gross Storefront Sales</span>
          <span className="font-bold text-gray-900 dark:text-white text-lg">${totalSalesUSD.toLocaleString()}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Creator Net Share (80%)</span>
          <span className="font-bold text-rose-600 text-lg">${calc.netEarningsUSD.toLocaleString()}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Platform Tech Fee (20%)</span>
          <span className="font-bold text-indigo-600 text-lg">${calc.platformFeeUSD.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs pt-2">
        <span className="font-bold text-gray-900 dark:text-white block text-[11px] font-sans uppercase">Recent Payout Transactions</span>
        {payouts.map((p) => (
          <div key={p.id} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between font-mono">
            <span>Payout #${p.id}</span>
            <span className="font-bold text-rose-600">${p.amountUSD.toLocaleString()} USD</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-rose-100 text-rose-800 font-bold uppercase">{p.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
