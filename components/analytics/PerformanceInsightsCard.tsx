import React from "react";
import { PerformanceInsight } from "@/lib/types/analytics";
import { Sparkles, AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface PerformanceInsightsCardProps {
  insights: PerformanceInsight[];
}

export function PerformanceInsightsCard({ insights }: PerformanceInsightsCardProps) {
  return (
    <div className="bg-card p-6 rounded-[3px] border border-border space-y-4">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center">
          <Sparkles className="w-3.5 h-3.5 text-[#2855F5] mr-1.5" /> Performance & Instructional Insights
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground">AI RECOMMENDATIONS</span>
      </div>

      <div className="space-y-3">
        {insights.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-[2px] border space-y-2 text-xs transition-all ${
              item.type === "warning"
                ? "bg-[#E85D3F]/5 border-[#E85D3F]/30"
                : item.type === "success"
                ? "bg-[#DFFF43]/10 border-[#DFFF43]/40"
                : "bg-muted/30 border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center font-bold font-display text-xs text-foreground">
                {item.type === "warning" ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#E85D3F] mr-1.5 shrink-0" />
                ) : item.type === "success" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2855F5] mr-1.5 shrink-0" />
                ) : (
                  <Info className="w-3.5 h-3.5 text-[#2855F5] mr-1.5 shrink-0" />
                )}
                {item.title}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-background border border-border text-muted-foreground">
                {item.type}
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
            <div className="text-[11px] font-mono text-[#2855F5] pt-1 border-t border-border/40">
              ACTION: {item.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

