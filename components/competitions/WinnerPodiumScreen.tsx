"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiveParticipant } from "@/lib/types/competition";
import { Trophy, Award, Sparkles, Share2, Home, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSound } from "@/components/audio/useSound";

interface WinnerPodiumScreenProps {
  participants: LiveParticipant[];
  competitionTitle: string;
}

export function WinnerPodiumScreen({ participants, competitionTitle }: WinnerPodiumScreenProps) {
  const [copied, setCopied] = useState(false);
  const { playFanfare, playTap } = useSound();

  const sorted = [...participants].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  // Play triumph fanfare on podium victory screen mount
  useEffect(() => {
    playFanfare();
  }, [playFanfare]);

  const handleShare = async () => {
    playTap();
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
      {/* Winner Spotlight Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0C1210] p-8 sm:p-12 rounded-[6px] border border-[rgba(160,190,170,0.14)] text-[#F2F7F3] shadow-2xl space-y-5 relative overflow-hidden"
      >
        {/* Cinematic emerald ambient light */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: "radial-gradient(circle at 50% 20%, rgba(101, 245, 154, 0.15), transparent 70%)",
          }}
        />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[3px] bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.3)] text-xs font-mono font-bold uppercase tracking-widest relative z-10 shadow-[0_0_12px_rgba(101,245,154,0.15)]">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>TOURNAMENT CONCLUDED // ARENA CHAMPION</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#F2F7F3] relative z-10">
          {competitionTitle}
        </h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="pt-4 max-w-sm mx-auto bg-[#111B17] p-6 rounded-[6px] border border-[#65F59A]/50 shadow-[0_0_36px_rgba(101,245,154,0.22)] space-y-2 relative z-10"
        >
          <Trophy className="w-14 h-14 text-[#65F59A] mx-auto filter drop-shadow-[0_0_12px_rgba(101,245,154,0.4)]" />
          <p className="text-[10px] uppercase font-mono font-bold text-[#A0AEA5] tracking-widest">CHAMPION 🥇</p>
          <h2 className="text-2xl font-black font-display text-[#F2F7F3]">{winner?.name || "No Competitors"}</h2>
          <p className="text-xl font-mono font-black text-[#65F59A]">{winner?.score || 0} Points</p>
        </motion.div>
      </motion.div>

      {/* Top 3 Podium Cards with Staggered Heights */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto items-end">
        {/* 2nd Place */}
        {sorted[1] ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(56,217,176,0.3)] shadow-xs space-y-2"
          >
            <span className="text-2xl">🥈</span>
            <p className="text-xs font-bold text-[#F2F7F3] truncate">{sorted[1].name}</p>
            <p className="text-xs font-mono font-bold text-[#38D9B0]">{sorted[1].score} pts</p>
            <div className="h-10 bg-[#17251E] rounded-t-[3px] border-t border-[rgba(56,217,176,0.3)] flex items-center justify-center font-mono text-[10px] text-[#38D9B0] font-bold">
              2ND
            </div>
          </motion.div>
        ) : <div />}

        {/* 1st Place */}
        {sorted[0] ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-[#111B17] p-5 rounded-[6px] border border-[#65F59A]/60 shadow-[0_0_24px_rgba(101,245,154,0.18)] space-y-2 scale-105 text-[#F2F7F3]"
          >
            <span className="text-3xl">🥇</span>
            <p className="text-sm font-extrabold text-[#F2F7F3] truncate">{sorted[0].name}</p>
            <p className="text-sm font-mono font-black text-[#65F59A]">{sorted[0].score} pts</p>
            <div className="h-16 bg-[#17251E] rounded-t-[3px] border-t-2 border-[#65F59A] flex items-center justify-center font-mono text-xs text-[#65F59A] font-extrabold shadow-[0_0_12px_rgba(101,245,154,0.2)]">
              WINNER
            </div>
          </motion.div>
        ) : <div />}

        {/* 3rd Place */}
        {sorted[2] ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(160,190,170,0.16)] shadow-xs space-y-2"
          >
            <span className="text-2xl">🥉</span>
            <p className="text-xs font-bold text-[#F2F7F3] truncate">{sorted[2].name}</p>
            <p className="text-xs font-mono font-bold text-[#A0AEA5]">{sorted[2].score} pts</p>
            <div className="h-6 bg-[#17251E] rounded-t-[3px] border-t border-[rgba(160,190,170,0.2)] flex items-center justify-center font-mono text-[10px] text-[#A0AEA5] font-bold">
              3RD
            </div>
          </motion.div>
        ) : <div />}
      </div>

      {/* Complete Final Standings */}
      <div className="bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] p-6 text-left max-w-2xl mx-auto space-y-3 shadow-xs">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A0AEA5] pb-2 border-b border-[rgba(160,190,170,0.12)]">
          Final Official Results Roster ({sorted.length} Competitors)
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {sorted.map((p, idx) => (
            <div
              key={p.id}
              className="p-2.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.12)] flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold w-6 text-[#69786F]">#{idx + 1}</span>
                <span className="font-semibold text-[#F2F7F3]">{p.name}</span>
                {idx === 0 && <span className="text-[10px] text-[#65F59A] font-bold">🥇 1st Place</span>}
              </div>
              <span className="font-extrabold text-[#65F59A]">{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          onClick={handleShare}
          className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-[4px] px-6 shadow-[0_0_15px_rgba(101,245,154,0.18)]"
        >
          {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Share2 className="w-3.5 h-3.5 mr-1.5" />}
          {copied ? "Link Copied!" : "Share Leaderboard"}
        </Button>
        <Link href="/dashboard/competitions">
          <Button variant="outline" className="rounded-[4px] font-mono text-xs px-6 border-[rgba(160,190,170,0.18)] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#65F59A]/30">
            <Home className="w-3.5 h-3.5 mr-1.5" /> Return to Competitions
          </Button>
        </Link>
      </div>
    </div>
  );
}
