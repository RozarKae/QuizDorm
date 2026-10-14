"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Globe, DollarSign, ShieldCheck, CheckCircle2, Sparkles, Cpu
} from "lucide-react";
import { toast } from "sonner";

export function GlobalCommercePlatform() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD ($)");

  const handleCurrencyChange = (curr: string) => {
    setSelectedCurrency(curr);
    toast.success(`Marketplace prices converted to ${curr}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <Globe className="w-3.5 h-3.5 text-indigo-400" /> Multi-Currency & International Tax Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Global Commerce Infrastructure & API Marketplace</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Multi-currency checkout support, regional VAT/GST tax compliance, developer API plugin marketplace, and international seller payouts.
          </p>
        </div>
      </div>

      {/* Currency Selector Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-600" /> Select Global Preferred Currency
        </h3>

        <div className="flex flex-wrap gap-2">
          {["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)", "JPY (¥)"].map((curr) => (
            <button
              key={curr}
              onClick={() => handleCurrencyChange(curr)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCurrency === curr ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
