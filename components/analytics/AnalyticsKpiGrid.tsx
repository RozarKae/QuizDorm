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
          className="bg-card p-5 rounded-[3px] border border-border space-y-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">{m.title}</p>
            <div
              className={`inline-flex items-center text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] ${
                m.trend === "up"
                  ? "bg-[#DFFF43]/20 text-foreground border border-[#DFFF43]/40"
                  : m.trend === "down"
                  ? "bg-[#E85D3F]/15 text-[#E85D3F] border border-[#E85D3F]/30"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {m.trend === "up" ? (
                <TrendingUp className="w-3 h-3 mr-0.5 text-[#2855F5]" />
              ) : m.trend === "down" ? (
                <TrendingDown className="w-3 h-3 mr-0.5 text-[#E85D3F]" />
              ) : (
                <Minus className="w-3 h-3 mr-0.5" />
              )}
              <span>{m.change}</span>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono tracking-tight">{m.value}</p>
          <p className="text-[10px] font-mono text-muted-foreground">{m.timeframe}</p>
        </div>
      ))}
    </div>
  );
}

