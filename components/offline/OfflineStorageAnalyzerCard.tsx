"use client";

import React from "react";
import { UniversalOfflineEngine } from "@/lib/offline/edgeEngine";
import { HardDrive, PieChart, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function OfflineStorageAnalyzerCard() {
  const stats = UniversalOfflineEngine.getStorageStats();
  const usagePercent = Math.round((stats.usedMB / stats.maxQuotaMB) * 100);

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <HardDrive className="w-5 h-5 text-indigo-600 mr-2" /> Encrypted Storage Quota & Cache Analyzer
        </h3>
        <span className="text-xs font-mono font-bold text-rose-600">
          {stats.usedMB} MB / {stats.maxQuotaMB} MB Quota
        </span>
      </div>

      <div className="space-y-2">
        <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-full h-3 overflow-hidden">
          <div className="bg-indigo-600 h-3 transition-all duration-300" style={{ width: `${usagePercent}%` }} />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px] pt-2">
          <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-400 block text-[9px] font-sans">Quizzes & Qs</span>
            <span className="font-bold text-indigo-600">42.5 MB</span>
          </div>
          <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-400 block text-[9px] font-sans">Competitions</span>
            <span className="font-bold text-purple-600">28.1 MB</span>
          </div>
          <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-400 block text-[9px] font-sans">Certificates</span>
            <span className="font-bold text-rose-600">14.2 MB</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
