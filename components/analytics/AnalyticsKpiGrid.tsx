import React from "react";
import { AnalyticsMetric } from "@/lib/types/analytics";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnalyticsKpiGridProps {
  metrics: AnalyticsMetric[];
}

export function AnalyticsKpiGrid({ metrics }: AnalyticsKpiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="bg-[#140C0E] p-5 rounded-2xl border border-[rgba(240, 160, 180,0.14)] space-y-2 relative overflow-hidden shadow-lg group hover:border-[#FF4D6D]/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#A0AEA5] truncate">{m.title}</p>
            <div
              className={`inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                m.trend === "up"
                  ? "bg-[#2A141A] text-[#FF4D6D] border border-[#FF4D6D]/30"
                  : m.trend === "down"
                  ? "bg-[#251414] text-[#FF6B6B] border border-[#FF6B6B]/30"
                  : "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.15)]"
              }`}
            >
              {m.trend === "up" ? (
                <TrendingUp className="w-3 h-3 mr-1 text-[#FF4D6D]" />
              ) : m.trend === "down" ? (
                <TrendingDown className="w-3 h-3 mr-1 text-[#FF6B6B]" />
              ) : (
                <Minus className="w-3 h-3 mr-1 text-[#A0AEA5]" />
              )}
              <span>{m.change}</span>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-bold text-[#F2F7F3] font-mono tracking-tight">{m.value}</p>
          <p className="text-[10px] font-mono text-[#69786F]">{m.timeframe}</p>
        </div>
      ))}
    </div>
  );
}

