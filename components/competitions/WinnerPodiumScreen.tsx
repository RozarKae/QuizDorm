"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LiveParticipant } from "@/lib/types/competition";
import { Trophy, Award, Sparkles, Share2, Home, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WinnerPodiumScreenProps {
  participants: LiveParticipant[];
  competitionTitle: string;
}

export function WinnerPodiumScreen({ participants, competitionTitle }: WinnerPodiumScreenProps) {
  const [copied, setCopied] = useState(false);

  const sorted = [...participants].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  const handleShare = async () => {
    const text = `🏆 QuizDorm Arena Results for "${competitionTitle}": Champion ${winner?.name || "Player 1"} scored ${winner?.score || 0} pts!`;
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : process.env.NEXT_PUBLIC_APP_URL || "https://quizclassroom.vercel.app";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Championship Standings: ${competitionTitle}`,
          text,
          url,
        });
        toast.success("Leaderboard shared!");
        return;
      } catch (err: any) {
        if (err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      toast.success("Final tournament results copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 text-center">
      {/* Confetti & Winner Banner */}
      <div className="bg-[#111318] p-8 sm:p-12 rounded-[4px] border border-border text-white shadow-2xl space-y-5 relative overflow-hidden">
        {/* Subtle grid watermark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[2px] bg-[#E85D3F]/20 text-[#E85D3F] border border-[#E85D3F]/40 text-xs font-mono font-bold uppercase tracking-widest relative z-10">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>TOURNAMENT CONCLUDED // WINNER CROWNED</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white relative z-10">
          {competitionTitle}
        </h1>

        <div className="pt-4 max-w-sm mx-auto bg-white/5 backdrop-blur-md p-6 rounded-[3px] border border-white/20 space-y-2 relative z-10">
          <Trophy className="w-14 h-14 text-[#DFFF43] mx-auto animate-bounce" />
          <p className="text-[10px] uppercase font-mono font-bold text-white/70 tracking-widest">CHAMPION 🥇</p>
          <h2 className="text-2xl font-black font-display text-white">{winner?.name || "No Competitors"}</h2>
          <p className="text-xl font-mono font-extrabold text-[#DFFF43]">{winner?.score || 0} Points</p>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto items-end">
        {sorted[1] ? (
          <div className="bg-card p-4 rounded-[4px] border border-border shadow-xs space-y-2">
            <span className="text-2xl">🥈</span>
            <p className="text-xs font-bold text-foreground truncate">{sorted[1].name}</p>
            <p className="text-xs font-mono font-extrabold text-[#2855F5]">{sorted[1].score} pts</p>
          </div>
        ) : <div />}

        {sorted[0] ? (
          <div className="bg-card p-5 rounded-[4px] border-2 border-[#DFFF43] shadow-md space-y-2 scale-105 bg-[#111318] text-white">
            <span className="text-3xl">🥇</span>
            <p className="text-sm font-extrabold text-white truncate">{sorted[0].name}</p>
            <p className="text-sm font-mono font-extrabold text-[#DFFF43]">{sorted[0].score} pts</p>
          </div>
        ) : <div />}

        {sorted[2] ? (
          <div className="bg-card p-4 rounded-[4px] border border-border shadow-xs space-y-2">
            <span className="text-2xl">🥉</span>
            <p className="text-xs font-bold text-foreground truncate">{sorted[2].name}</p>
            <p className="text-xs font-mono font-extrabold text-[#2855F5]">{sorted[2].score} pts</p>
          </div>
        ) : <div />}
      </div>

      {/* Complete Final Standings */}
      <div className="bg-card rounded-[4px] border border-border p-6 text-left max-w-2xl mx-auto space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
          Final Official Results Roster ({sorted.length} Competitors)
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {sorted.map((p, idx) => (
            <div
              key={p.id}
              className="p-2.5 rounded-[3px] bg-background border border-border flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold w-6 text-muted-foreground">#{idx + 1}</span>
                <span className="font-semibold text-foreground">{p.name}</span>
                {idx === 0 && <span className="text-[10px] text-amber-500 font-bold">🥇 1st Place</span>}
              </div>
              <span className="font-extrabold text-[#2855F5]">{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          onClick={handleShare}
          className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs font-bold rounded-[3px] px-6"
        >
          {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Share2 className="w-3.5 h-3.5 mr-1.5" />}
          {copied ? "Link Copied!" : "Share Leaderboard"}
        </Button>
        <Link href="/dashboard/competitions">
          <Button variant="outline" className="rounded-[3px] font-mono text-xs px-6">
            <Home className="w-3.5 h-3.5 mr-1.5" /> Return to Competitions
          </Button>
        </Link>
      </div>
    </div>
  );
}
