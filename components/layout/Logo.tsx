import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Editorial Intelligence Monogram Icon */}
      <div className="relative flex items-center justify-center w-7 h-7 bg-[#111318] rounded-[2px] border border-[#2E3547]">
        <span className="font-display font-black text-xs text-white tracking-tighter">
          QD
        </span>
        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#DFFF43] border border-[#111318]" />
      </div>

      {/* Editorial Wordmark */}
      <div className="flex items-baseline">
        <span className="font-display font-black text-lg tracking-tight text-white uppercase">
          QUIZ<span className="text-[#3864F8]">DORM</span>
        </span>
        <span className="inline-block w-1 h-1 bg-[#DFFF43] ml-0.5" />
      </div>
    </div>
  );
}
