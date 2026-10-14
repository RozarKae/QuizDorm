"use client";

import React from "react";
import { TournamentBracketCard } from "@/components/competition/TournamentBracketCard";
import { AntiCheatConsoleCard } from "@/components/competition/AntiCheatConsoleCard";
import { Swords, ShieldAlert, Play, Pause, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OrganizerConsolePage() {
  const handleEventControl = (action: string) => {
    toast.success(`Event Control Action Triggered: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
                <Swords className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Tournament Organizer Control Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Interactive Tournament Brackets & Anti-Cheat Monitor
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Manage elimination brackets, control live tournament timers, broadcast announcements, and monitor real-time fair play anti-cheat flags.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button onClick={() => handleEventControl("Live Competition Resumed")} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl">
              <Play className="w-4 h-4 mr-1" /> Resume Tournament
            </Button>
            <Button onClick={() => handleEventControl("Competition Paused")} variant="outline" className="text-xs rounded-xl text-white border-white/20">
              <Pause className="w-4 h-4 mr-1" /> Pause Event
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TournamentBracketCard />
        </div>
        <div className="lg:col-span-5">
          <AntiCheatConsoleCard />
        </div>
      </div>
    </div>
  );
}
