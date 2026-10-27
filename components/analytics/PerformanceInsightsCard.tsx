import { PerformanceInsight } from "@/lib/types/analytics";
import { AlertTriangle,CheckCircle2,Info,Sparkles } from "lucide-react";

interface PerformanceInsightsCardProps {
  insights: PerformanceInsight[];
}

export function PerformanceInsightsCard({ insights }: PerformanceInsightsCardProps) {
  return (
    <div className="bg-[#140C0E] p-6 rounded-2xl border border-[rgba(240, 160, 180,0.14)] space-y-4 shadow-xl">
      <div className="border-b border-[rgba(240, 160, 180,0.12)] pb-3 flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4D6D] mr-1.5" /> Performance & Instructional Insights
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
                ? "bg-[#2A141A] border-[#FF4D6D]/30"
                : "bg-[#1D1013] border-[rgba(240, 160, 180,0.1)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center font-bold font-display text-xs text-[#F2F7F3]">
                {item.type === "warning" ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B6B] mr-1.5 shrink-0" />
                ) : item.type === "success" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D6D] mr-1.5 shrink-0" />
                ) : (
                  <Info className="w-3.5 h-3.5 text-[#FF758F] mr-1.5 shrink-0" />
                )}
                {item.title}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#0B0708] border border-[rgba(240, 160, 180,0.15)] text-[#A0AEA5]">
                {item.type}
              </span>
            </div>
            <p className="text-[#A0AEA5] text-xs leading-relaxed">{item.description}</p>
            <div className="text-[11px] font-mono text-[#FF4D6D] pt-1.5 border-t border-[rgba(240, 160, 180,0.1)]">
              ACTION: {item.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

