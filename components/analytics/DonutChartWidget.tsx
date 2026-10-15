import React from "react";

interface DonutChartWidgetProps {
  title: string;
  slices: { label: string; value: number; color: string }[];
}

export function DonutChartWidget({ title, slices }: DonutChartWidgetProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;

  return (
    <div className="bg-card p-6 rounded-[3px] border border-border space-y-4 text-center">
      <div className="border-b border-border pb-3 text-left">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">{title}</h3>
      </div>

      <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90">
          {slices.map((slice, idx) => {
            const pct = slice.value / total;
            const strokeDasharray = `${pct * 282} 282`;
            return (
              <circle
                key={idx}
                cx="72"
                cy="72"
                r="45"
                fill="transparent"
                stroke={slice.color}
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                className="transition-all duration-700"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-foreground font-mono">{total}</span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Total Ratio</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-left pt-3 border-t border-border">
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-xs">
            <span className="w-2 h-2 rounded-[1px] shrink-0" style={{ backgroundColor: slice.color }} />
            <span className="text-muted-foreground font-medium truncate text-[11px]">{slice.label}</span>
            <span className="font-mono font-bold text-foreground ml-auto text-xs">{slice.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

