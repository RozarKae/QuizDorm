"use client";

import { useSound } from "@/components/audio/useSound";
import { useAuth } from "@/components/auth/AuthProvider";
import { AntiCheatConsoleCard } from "@/components/competition/AntiCheatConsoleCard";
import { TournamentBracketCard } from "@/components/competition/TournamentBracketCard";
import { Button } from "@/components/ui/button";
import { GovernanceSettingsManager } from "@/lib/admin/governanceSettingsManager";
import { ArrowLeft,Pause,Play,ShieldAlert,Swords } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function OrganizerConsolePage() {
  const { role } = useAuth();
  const canHost = GovernanceSettingsManager.canHostArena(role).allowed;
  const { playTap } = useSound();

  if (!canHost) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-[rgba(248,113,113,0.12)] border border-[rgba(248,113,113,0.3)] mx-auto flex items-center justify-center text-[#F87171]">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display uppercase tracking-tight text-[#F2F7F3]">
            Organizer Console Restricted
          </h2>
          <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-md mx-auto leading-relaxed">
            Students, Members, and Subscribers cannot access tournament organizer controls. Only Handlers, Institutions, and Superadmins are permitted to manage brackets and live event telemetry.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link href="/dashboard/competitions">
            <Button variant="outline" size="sm" className="border-[rgba(240, 160, 180,0.2)] text-xs font-mono">
              Back to Competitions
            </Button>
          </Link>
          <Link href="/live/join">
            <Button size="sm" className="bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF3366] font-mono text-xs font-bold uppercase">
              Join Arena via Room PIN
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEventControl = (action: string) => {
    playTap();
    toast.success(`Event Control Action Triggered: ${action}`);
  };

  return (
    <div className="space-y-6 text-[#F2F7F3]">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/dashboard/competitions"
          onClick={playTap}
          className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#FF4D6D] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> BACK TO COMPETITIONS
        </Link>

        {/* Masthead Header */}
        <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8 rounded-[6px] relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-1/4 w-80 h-36 bg-[radial-gradient(ellipse_at_center,rgba(255, 77, 109,0.1)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse shadow-[0_0_8px_#FF4D6D]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4D6D]">
                  TOURNAMENT CONTROL // ELIMINATION BRACKET &amp; INTEGRITY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
                <Swords className="w-6 h-6 text-[#FF4D6D] mr-2.5" />
                Organizer Command &amp; Anti-Cheat Monitor
              </h1>
              <p className="text-xs font-mono text-[#A0AEA5] max-w-2xl leading-relaxed">
                Manage tournament brackets, broadcast live announcements to players, and monitor live match integrity.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                onClick={() => handleEventControl("Live Competition Resumed")}
                className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono font-bold text-xs rounded-[4px] h-9 shadow-[0_0_12px_rgba(255, 77, 109,0.2)]"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Resume Event
              </Button>
              <Button
                onClick={() => handleEventControl("Competition Paused")}
                variant="outline"
                className="text-xs font-mono rounded-[4px] h-9 border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
              >
                <Pause className="w-3.5 h-3.5 mr-1.5" /> Pause
              </Button>
            </div>
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
