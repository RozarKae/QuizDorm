"use client";

import React from "react";
import { AISettings } from "@/lib/types/ai";
import { ProviderBadge } from "./ProviderBadge";
import { Cpu, ShieldCheck, Zap, RefreshCw, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AIRouterStatusCardProps {
  settings: AISettings;
}

export function AIRouterStatusCard({ settings }: AIRouterStatusCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              Central AI Router Active <ShieldCheck className="w-4 h-4 text-emerald-500 ml-1.5" />
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Provider-independent intelligence gateway with automated retry, fallback routing & normalized execution.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-gray-500">Primary Provider:</span>
          <ProviderBadge providerId={settings.defaultProvider} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 font-medium">Default Model</span>
          <div className="font-mono font-bold text-gray-900 dark:text-white truncate">{settings.defaultModel}</div>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 font-medium">Fallback Route</span>
          <div>
            <ProviderBadge providerId={settings.fallbackProvider} size="sm" />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 font-medium">Retry Policy</span>
          <div className="font-bold text-gray-900 dark:text-white">{settings.retryAttempts} Attempts (Exponential)</div>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 font-medium">Response Cache</span>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">
            {settings.enableCache ? "Active (TTL 1h)" : "Disabled"}
          </div>
        </div>
      </div>
    </Card>
  );
}
