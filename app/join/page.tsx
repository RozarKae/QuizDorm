"use client";

import { JoinArenaForm } from "@/components/competitions/JoinArenaForm";
import { Suspense } from "react";

export default function PublicJoinPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0708] text-[#F2F7F3] aurora-grid">
      <Suspense fallback={<div className="text-center font-mono text-xs text-[#A0AEA5]">Loading Arena Portal...</div>}>
        <JoinArenaForm />
      </Suspense>
    </div>
  );
}
