"use client";

import React, { Suspense } from "react";
import { JoinArenaForm } from "@/components/competitions/JoinArenaForm";

export default function LiveJoinAliasPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center font-mono text-xs text-muted-foreground">Loading Arena Portal...</div>}>
        <JoinArenaForm />
      </Suspense>
    </div>
  );
}
