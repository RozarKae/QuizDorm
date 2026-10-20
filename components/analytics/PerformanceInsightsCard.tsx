import React from "react";
import { PerformanceInsight } from "@/lib/types/analytics";
import { Sparkles, AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface PerformanceInsightsCardProps {
  insights: PerformanceInsight[];
}

export function PerformanceInsightsCard({ insights }: PerformanceInsightsCardProps) {
  return (
    <div className="bg-[#0C1210] p-6 rounded-2xl border border-[rgba(160,190,170,0.14)] space-y-4 shadow-xl">
      <div className="border-b border-[rgba(160,190,170,0.12)] pb-3 flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
          <Sparkles className="w-3.5 h-3.5 text-[#65F59A] mr-1.5" /> Performance & Instructional Insights
        </h3>
        <span className="text-[10px] font-mono text-[#A0AEA5]">AI INTELLIGENCE SYNTHESIS</span>
      </div>

      <div className="space-y-3">
        {insights.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border space-y-2 text-xs transition-all ${
              item.type === "warning"
                ? "bg-[#251414] border-[#FF6B6B]/30"
                : item.type === "success"
                ? "bg-[#17251E] border-[#65F59A]/30"
                : "bg-[#111B17] border-[rgba(160,190,170,0.1)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center font-bold font-display text-xs text-[#F2F7F3]">
                {item.type === "warning" ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B6B] mr-1.5 shrink-0" />
                ) : item.type === "success" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#65F59A] mr-1.5 shrink-0" />
                ) : (
                  <Info className="w-3.5 h-3.5 text-[#38D9B0] mr-1.5 shrink-0" />
                )}
                {item.title}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#070B0A] border border-[rgba(160,190,170,0.15)] text-[#A0AEA5]">
                {item.type}
              </span>
            </div>
            <p className="text-[#A0AEA5] text-xs leading-relaxed">{item.description}</p>
            <div className="text-[11px] font-mono text-[#65F59A] pt-1.5 border-t border-[rgba(160,190,170,0.1)]">
              ACTION: {item.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

