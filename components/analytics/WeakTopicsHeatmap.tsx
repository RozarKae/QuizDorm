import React from "react";
import { AlertCircle, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeakTopicItem {
  topic: string;
  subject: string;
  incorrectRate: number; // e.g. 42%
  avgSpeedSec: number;
}

interface WeakTopicsHeatmapProps {
  topics: WeakTopicItem[];
}

export function WeakTopicsHeatmap({ topics }: WeakTopicsHeatmapProps) {
  return (
    <div className="bg-[#0C1210] p-6 rounded-2xl border border-[rgba(160,190,170,0.14)] space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
          <Flame className="w-3.5 h-3.5 text-[#FF6B6B] mr-1.5" /> Topic Weakness Heatmap
        </h3>
        <Badge variant="outline" className="border-[#FF6B6B]/40 bg-[#251414] text-[#FF6B6B] text-[9px] font-mono uppercase tracking-widest rounded-full">
          ACTION NEEDED
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topics.map((item, idx) => {
          const isHighAlert = item.incorrectRate >= 35;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isHighAlert
                  ? "bg-[#251414] border-[#FF6B6B]/30"
                  : "bg-[#111B17] border-[rgba(160,190,170,0.1)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5]">{item.subject}</span>
                <span className={`text-xs font-mono font-bold ${isHighAlert ? "text-[#FF6B6B]" : "text-[#F2F7F3]"}`}>
                  {item.incorrectRate}% ERROR
                </span>
              </div>
              <h4 className="text-xs font-bold font-display text-[#F2F7F3] leading-snug">{item.topic}</h4>
              <p className="text-[10px] font-mono text-[#69786F] mt-2 border-t border-[rgba(160,190,170,0.1)] pt-1.5">
                LATENCY: {item.avgSpeedSec}s / ITEM
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

