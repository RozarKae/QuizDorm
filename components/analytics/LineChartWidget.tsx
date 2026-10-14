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
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
          <span>{title}</span>
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        </h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="relative h-44 w-full pt-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 320 150">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Fill area */}
          <polygon points={`10,140 ${points} 310,140`} fill="url(#lineGrad)" />
          {/* Stroke Line */}
          <polyline fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" points={points} />
          {/* Points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 300 + 10;
            const y = 140 - (d.value / maxVal) * 110;
            return <circle key={i} cx={x} cy={y} r="4" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />;
          })}
        </svg>
      </div>

      {/* X Labels */}
      <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1">
        {data.map((d, idx) => (
          <span key={idx}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
