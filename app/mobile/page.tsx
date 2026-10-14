"use client";

import React, { useState } from "react";
import Logo from "@/components/layout/Logo";
import { MobileAuthService } from "@/lib/mobile/mobileAuth";
import { Smartphone, Fingerprint, Lock, Play, RotateCcw, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function StandaloneMobilePwaPage() {
  const [unlocked, setUnlocked] = useState(true);

  const handleBiometricUnlock = async () => {
    const res = await MobileAuthService.authenticateBiometrics();
    if (res.success) {
      setUnlocked(true);
      toast.success(`Biometric Unlock Verified (${res.method})!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Logo />
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
            PWA OFFLINE ENGINE
          </span>
        </div>

        {unlocked ? (
          <div className="space-y-4">
            {/* Streak & Status */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-900 border border-purple-500/30 space-y-1">
              <span className="text-[10px] text-purple-200 font-extrabold uppercase">Learner Profile</span>
              <h2 className="text-xl font-extrabold text-white">Alex Rivera</h2>
              <p className="text-xs text-purple-200">7-Day Active Study Streak 🔥 • 92% Mastery</p>
            </div>

            {/* Offline Quiz Package */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-300">Grade 12 Calculus Master Set</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                  READY OFFLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">150 Questions cached locally in IndexedDB.</p>
              <Link href="/dashboard/quizzes/builder?mode=practice">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl py-5 shadow-lg shadow-indigo-600/30">
                  <Play className="w-4 h-4 mr-1.5" /> Launch Practice Session
                </Button>
              </Link>
            </div>

            {/* Revision Center */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-amber-400">
                <span className="flex items-center">
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> SM-2 Spaced Revision
                </span>
                <span>3 Due Today</span>
              </div>
              <Link href="/dashboard/revision">
                <Button size="sm" variant="outline" className="w-full text-xs rounded-xl border-slate-700">
                  Start SM-2 Revision Queue
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center mx-auto text-indigo-400">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">Biometric Authentication Required</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Please authenticate using Touch ID or Face ID to access your offline QuizDorm profile.
            </p>
            <Button onClick={handleBiometricUnlock} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl py-5 px-6">
              <Fingerprint className="w-5 h-5 mr-2" /> Unlock with Face ID
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
