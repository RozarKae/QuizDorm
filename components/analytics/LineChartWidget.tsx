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
    <div className="bg-[#140C0E] p-6 rounded-2xl border border-[rgba(240, 160, 180,0.14)] space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3]">
            {title}
          </h3>
          {subtitle && <p className="text-[11px] text-[#A0AEA5] mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#FF4D6D] bg-[#2A141A] px-2 py-0.5 rounded-full border border-[#FF4D6D]/20">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>TREND STABLE</span>
        </div>
      </div>

      <div className="relative h-44 w-full pt-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 320 150">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Subtle grid lines */}
          <line x1="10" y1="30" x2="310" y2="30" stroke="rgba(240, 160, 180, 0.12)" strokeDasharray="3,3" />
          <line x1="10" y1="85" x2="310" y2="85" stroke="rgba(240, 160, 180, 0.12)" strokeDasharray="3,3" />
          <line x1="10" y1="140" x2="310" y2="140" stroke="rgba(240, 160, 180, 0.18)" />

          {/* Fill area */}
          <polygon points={`10,140 ${points} 310,140`} fill="url(#lineGrad)" />
          {/* Stroke Line */}
          <polyline fill="none" stroke="#FF4D6D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
          {/* Points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 300 + 10;
            const y = 140 - (d.value / maxVal) * 110;
            return <circle key={i} cx={x} cy={y} r="3.5" fill="#FF4D6D" stroke="#140C0E" strokeWidth="2" />;
          })}
        </svg>
      </div>

      {/* X Labels */}
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5] px-1 pt-2 border-t border-[rgba(240, 160, 180,0.12)]">
        {data.map((d, idx) => (
          <span key={idx}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

