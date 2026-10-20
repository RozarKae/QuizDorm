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
    <Card className="bg-[#0C1210] border border-[rgba(160,190,170,0.14)] rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.12)] pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#17251E] border border-[#65F59A]/20 text-[#65F59A]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#F2F7F3] flex items-center">
              Central AI Router Active <ShieldCheck className="w-4 h-4 text-[#65F59A] ml-1.5" />
            </h3>
            <p className="text-xs text-[#A0AEA5]">
              Provider-independent intelligence gateway with automated retry, fallback routing & normalized execution.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-[#A0AEA5]">Primary Provider:</span>
          <ProviderBadge providerId={settings.defaultProvider} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
        <div className="p-3.5 rounded-xl bg-[#111B17] border border-[rgba(160,190,170,0.08)] space-y-1">
          <span className="text-[11px] font-mono text-[#69786F] uppercase">Default Model</span>
          <div className="font-mono text-xs font-semibold text-[#F2F7F3] truncate">{settings.defaultModel}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#111B17] border border-[rgba(160,190,170,0.08)] space-y-1">
          <span className="text-[11px] font-mono text-[#69786F] uppercase">Fallback Route</span>
          <div>
            <ProviderBadge providerId={settings.fallbackProvider} size="sm" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#111B17] border border-[rgba(160,190,170,0.08)] space-y-1">
          <span className="text-[11px] font-mono text-[#69786F] uppercase">Retry Policy</span>
          <div className="font-mono text-xs font-semibold text-[#F2F7F3]">{settings.retryAttempts} Attempts (Exponential)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#111B17] border border-[rgba(160,190,170,0.08)] space-y-1">
          <span className="text-[11px] font-mono text-[#69786F] uppercase">Response Cache</span>
          <div className="font-mono text-xs font-semibold text-[#65F59A]">
            {settings.enableCache ? "Active (TTL 1h)" : "Disabled"}
          </div>
        </div>
      </div>
    </Card>
  );
}
