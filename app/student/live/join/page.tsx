"use client";

import React, { Suspense } from "react";
import { JoinArenaForm } from "@/components/competitions/JoinArenaForm";

export default function StudentLiveJoinPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#070B0A] text-[#F2F7F3]">
      <Suspense fallback={<div className="text-center font-mono text-xs text-[#A0AEA5]">Loading Arena Portal...</div>}>
        <JoinArenaForm />
      </Suspense>
    </div>
  );
}
