"use client";

import { ProviderHealthMonitor } from "@/lib/enterprise/healthMonitor";
import { Activity } from "lucide-react";

export function ProviderHealthMonitorCard() {
  const healthList = ProviderHealthMonitor.getHealth();

  return (
    <div className="p-5 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
          <Activity className="w-4 h-4 text-[#FF4D6D] mr-2" />
          Live Provider & Infrastructure Health Monitor
        </h3>
        <span className="text-[10px] font-mono font-bold text-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] px-2.5 py-0.5 rounded-[2px] uppercase border border-[rgba(255, 77, 109,0.2)]">
          All Systems Nominal
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono">
        {healthList.map((h) => (
          <div
            key={h.id}
            className="p-3.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)] hover:border-[rgba(240, 160, 180,0.22)] transition-all space-y-2"
          >
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-[#F2F7F3] text-[11px] truncate">{h.providerName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#69786F]">Latency:</span>
              <span className="font-bold text-[#FF4D6D]">{h.latencyMs}ms</span>
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#69786F]">Uptime:</span>
              <span className="font-bold text-[#FF758F]">{h.uptimePercent}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}