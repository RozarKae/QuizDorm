import React from "react";
import Image from "next/image";

export function OfficialEmblem({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`relative ${className} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
      <Image
        src="/official-logo.png"
        alt="QuizDorm Official 3D Emblem"
        width={64}
        height={64}
        className="w-full h-full object-contain dark:drop-shadow-[0_0_12px_rgba(101,245,154,0.45)] drop-shadow-[0_0_8px_rgba(4,120,87,0.25)]"
        priority
      />
    </div>
  );
}

export default function Logo({
  className = "",
  showWordmark = true,
  iconSize = "w-7 h-7",
}: {
  className?: string;
  showWordmark?: boolean;
  iconSize?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <OfficialEmblem className={iconSize} />

      {showWordmark && (
        <div className="flex items-baseline">
          <span className="font-display font-bold text-base tracking-tight text-[#0F172A] dark:text-[#F2F7F3] uppercase transition-colors">
            QUIZ<span className="text-[#047857] dark:text-[#65F59A] transition-colors">DORM</span>
          </span>
          <span className="inline-block w-1 h-1 bg-[#047857] dark:bg-[#65F59A] ml-1 rounded-full animate-pulse transition-colors" />
        </div>
      )}
    </div>
  );
}
