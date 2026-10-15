import React from "react";
import { TrendingUp } from "lucide-react";

interface LineChartWidgetProps {
  title: string;
  subtitle?: string;
  data: { label: string; value: number }[];
}

export function LineChartWidget({ title, subtitle, data }: LineChartWidgetProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 100);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 300 + 10;
      const y = 140 - (d.value / maxVal) * 110;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-card p-6 rounded-[3px] border border-border space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
            {title}
          </h3>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#2855F5]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>TREND STABLE</span>
        </div>
      </div>

      <div className="relative h-44 w-full pt-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 320 150">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2855F5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2855F5" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Subtle grid lines */}
          <line x1="10" y1="30" x2="310" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2,2" />
          <line x1="10" y1="85" x2="310" y2="85" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2,2" />
          <line x1="10" y1="140" x2="310" y2="140" stroke="currentColor" strokeOpacity="0.12" />

          {/* Fill area */}
          <polygon points={`10,140 ${points} 310,140`} fill="url(#lineGrad)" />
          {/* Stroke Line */}
          <polyline fill="none" stroke="#2855F5" strokeWidth="2.5" strokeLinecap="round" points={points} />
          {/* Points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 300 + 10;
            const y = 140 - (d.value / maxVal) * 110;
            return <circle key={i} cx={x} cy={y} r="3.5" fill="#2855F5" stroke="#FFFFFF" strokeWidth="1.5" />;
          })}
        </svg>
      </div>

      {/* X Labels */}
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-1 pt-1 border-t border-border">
        {data.map((d, idx) => (
          <span key={idx}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

