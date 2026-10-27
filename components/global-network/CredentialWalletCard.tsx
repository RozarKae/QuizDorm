"use client";

import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

export function CredentialWalletCard() {
  return (
    <Card className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-2xl bg-white/10 text-amber-300">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">Global Digital Credential & Transcript Wallet</h3>
            <span className="text-[10px] text-amber-300 font-mono">International Verification Protocol v3.9</span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/30">
          VERIFIED STUDENT WALLET
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Verified Certificates</span>
          <span className="font-bold text-rose-400 text-xl">14 Certificates</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Olympiad Badges</span>
          <span className="font-bold text-amber-400 text-xl">5 Gold Badges</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Global Verification Hash</span>
          <span className="font-bold text-indigo-300 text-xs truncate block">0x8f9a2b...4c1d</span>
        </div>
      </div>
    </Card>
  );
}
