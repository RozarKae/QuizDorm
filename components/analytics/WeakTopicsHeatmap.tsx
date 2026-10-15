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
    <div className="bg-card p-6 rounded-[3px] border border-border space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center">
          <Flame className="w-3.5 h-3.5 text-[#E85D3F] mr-1.5" /> Topic Weakness Heatmap
        </h3>
        <Badge variant="outline" className="border-[#E85D3F]/40 bg-[#E85D3F]/10 text-[#E85D3F] text-[9px] font-mono uppercase tracking-widest rounded-[2px]">
          ACTION NEEDED
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topics.map((item, idx) => {
          const isHighAlert = item.incorrectRate >= 35;
          return (
            <div
              key={idx}
              className={`p-4 rounded-[2px] border transition-all ${
                isHighAlert
                  ? "bg-[#E85D3F]/5 border-[#E85D3F]/30"
                  : "bg-muted/40 border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{item.subject}</span>
                <span className={`text-xs font-mono font-extrabold ${isHighAlert ? "text-[#E85D3F]" : "text-foreground"}`}>
                  {item.incorrectRate}% ERROR
                </span>
              </div>
              <h4 className="text-xs font-bold font-display text-foreground leading-snug">{item.topic}</h4>
              <p className="text-[10px] font-mono text-muted-foreground mt-2 border-t border-border/40 pt-1.5">
                LATENCY: {item.avgSpeedSec}s / ITEM
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

