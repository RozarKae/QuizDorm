"use client";

import React from "react";
import Link from "next/link";
import { Lock, ArrowLeft, Sparkles, Building2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedFeatureNoticeProps {
  title?: string;
  description?: string;
  backHref?: string;
  unlockRequirement?: string;
}

export function LockedFeatureNotice({
  title = "Feature Locked for Subscribers",
  description = "This module requires an Institutional Member or Pro campus enrollment. As a Subscriber, you currently have access to practice quizzes, public leaderboards, and live arenas via Room PIN.",
  backHref = "/student",
  unlockRequirement = "Enrolled Campus / Dorm Member License",
}: LockedFeatureNoticeProps) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="rounded-[8px] bg-[#140C0E] border border-[rgba(248,113,113,0.3)] p-6 sm:p-8 space-y-5 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(248,113,113,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="mx-auto w-14 h-14 rounded-full bg-[rgba(248,113,113,0.12)] border border-[rgba(248,113,113,0.3)] flex items-center justify-center text-[#F87171] shadow-[0_0_20px_rgba(248,113,113,0.2)]">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.25)] text-[#F87171] font-mono text-[10px] font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Subscriber Tier Restriction</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-[#F2F7F3] uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#A0AEA5] leading-relaxed max-w-lg mx-auto">
            {description}
          </p>
        </div>

        <div className="p-3.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)] font-mono text-xs text-left space-y-1.5 max-w-md mx-auto">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#69786F] uppercase">Current Plan:</span>
            <span className="text-[#60A5FA] font-bold">SUBSCRIBER (FREE / SELF-PACED)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#69786F] uppercase">Required:</span>
            <span className="text-[#FF4D6D] font-bold uppercase">{unlockRequirement}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href={backHref}>
            <Button
              variant="outline"
              size="sm"
              className="border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] text-xs font-mono h-9"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Personal Hub
            </Button>
          </Link>
          <Link href="/dashboard/quizzes">
            <Button
              size="sm"
              className="bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF3366] font-mono text-xs font-bold uppercase tracking-wider h-9 shadow-[0_0_12px_rgba(255, 77, 109,0.25)]"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Practice Free Quizzes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
