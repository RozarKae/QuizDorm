"use client";

import React from "react";
import { UserSubscription } from "@/lib/types/billing";
import { Sparkles, ScanText, Layers, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AICreditTrackerCardProps {
  subscription: UserSubscription;
}

export function AICreditTrackerCard({ subscription }: AICreditTrackerCardProps) {
  const aiPercent = Math.round((subscription.aiCreditsUsed / subscription.aiCreditsTotal) * 100);
  const ocrPercent = Math.round((subscription.ocrCreditsUsed / subscription.ocrCreditsTotal) * 100);

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="w-5 h-5 text-indigo-600 mr-2" /> Monthly AI & OCR Credit Allocation
        </h3>
        <span className="text-xs font-mono font-bold text-gray-400">Quota Resets Monthly</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        {/* AI Credits */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-2 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between font-bold">
            <span className="text-gray-700 dark:text-gray-300 flex items-center">
              <Sparkles className="w-4 h-4 text-indigo-500 mr-1.5" /> AI Question & Tutor Credits
            </span>
            <span className="font-mono text-indigo-600">
              {subscription.aiCreditsTotal - subscription.aiCreditsUsed} Left
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${aiPercent}%` }} />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-gray-400">
            <span>Used: {subscription.aiCreditsUsed} / {subscription.aiCreditsTotal}</span>
            <span>{aiPercent}% Consumed</span>
          </div>
        </div>

        {/* OCR Credits */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-2 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between font-bold">
            <span className="text-gray-700 dark:text-gray-300 flex items-center">
              <ScanText className="w-4 h-4 text-emerald-500 mr-1.5" /> OCR Document Scan Credits
            </span>
            <span className="font-mono text-emerald-600">
              {subscription.ocrCreditsTotal - subscription.ocrCreditsUsed} Left
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${ocrPercent}%` }} />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-gray-400">
            <span>Used: {subscription.ocrCreditsUsed} / {subscription.ocrCreditsTotal}</span>
            <span>{ocrPercent}% Consumed</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
