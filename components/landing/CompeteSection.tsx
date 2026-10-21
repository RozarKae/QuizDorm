"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Clock, Zap, ArrowRight, Flame, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionDivider from "@/components/ui/section-divider";

export default function CompeteSection() {
  const [activeLeaderboard, setActiveLeaderboard] = useState([
    { rank: 1, name: "Maya Chen", score: 2840, streak: 5, badge: "🥇", delta: "+450" },
    { rank: 2, name: "Alex Rivera", score: 2690, streak: 4, badge: "🥈", delta: "+390" },
    { rank: 3, name: "Liam Vance", score: 2410, streak: 3, badge: "🥉", delta: "+310" },
    { rank: 4, name: "Sofia Patel", score: 2150, streak: 2, badge: "4th", delta: "+280" },
  ]);

  const [selectedOption, setSelectedOption] = useState<string>("B");
  const [timerSeconds, setTimerSeconds] = useState(7);

  // Gentle demonstration cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 1 ? prev - 1 : 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A] aurora-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-3 py-1 rounded-full border border-[#65F59A]/30 font-semibold shadow-[0_0_12px_rgba(101,245,154,0.15)]">
                REAL-TIME TOURNAMENT ENGINE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F7F3] tracking-tight">
              Step Into <br />
              <span className="bg-gradient-to-r from-[#65F59A] via-[#38D9B0] to-[#65F59A] bg-clip-text text-transparent">
                The Arena.
              </span>
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Experience high-concurrency multiplayer decathlons powered by Server-Sent Events (SSE), synchronized countdowns, and real-time podium reveals.
          </p>
        </div>

        {/* Live Arena Simulation Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 cols): Simulated Active Arena Terminal */}
          <div className="lg:col-span-7 bg-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(101,245,154,0.1)] space-y-6">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-4">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65F59A] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#F2F7F3] font-bold">
                  ARENA #QD-8492 // LIVE ROUND 03
                </span>
              </div>
              <div
                className={`font-mono text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors ${
                  timerSeconds <= 3
                    ? "bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/40 animate-pulse"
                    : "bg-[#111B17] text-[#65F59A] border border-[#65F59A]/30 shadow-[0_0_10px_rgba(101,245,154,0.15)]"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>0{timerSeconds}s REMAINING</span>
              </div>
            </div>

            {/* Question Stem */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#69786F]">
                <span>Question 03 of 10 • Quantum & Classical Computing</span>
                <span className="text-[#38D9B0]">+500 Base Points</span>
              </div>
              <p className="font-display text-base sm:text-lg font-bold text-[#F2F7F3] leading-snug">
                Which physical phenomenon provides the exponential computational state space utilized in Shor&apos;s factorization algorithm?
              </p>
            </div>

            {/* Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
              {[
                { id: "A", text: "Thermal Annealing", correct: false },
                { id: "B", text: "Quantum Superposition & Entanglement", correct: true },
                { id: "C", text: "Electromagnetic Polarization", correct: false },
                { id: "D", text: "Asynchronous Pipelining", correct: false },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedOption(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedOption === opt.id
                      ? "border-[#65F59A] bg-[#17251E] text-[#F2F7F3] shadow-[0_0_15px_rgba(101,245,154,0.2)]"
                      : "border-[rgba(160,190,170,0.14)] bg-[#111B17] text-[#A0AEA5] hover:border-[#65F59A]/30 hover:text-[#F2F7F3]"
                  }`}
                >
                  <span className="flex items-center">
                    <span className="font-bold text-[#65F59A] mr-2">{opt.id}.</span>
                    <span className="truncate">{opt.text}</span>
                  </span>
                  {selectedOption === opt.id && (
                    <Zap className="w-3.5 h-3.5 text-[#65F59A] shrink-0 ml-1.5" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer Bar */}
            <div className="pt-4 border-t border-[rgba(160,190,170,0.12)] flex items-center justify-between text-xs font-mono text-[#A0AEA5]">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#65F59A]" /> 42 Competitors Synchronized
              </span>
              <span className="text-[#65F59A] font-bold">Answer Locked: Instant Response</span>
            </div>
          </div>

          {/* Right Column (5 cols): Real-Time Shifting Leaderboard */}
          <div className="lg:col-span-5 bg-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-[#65F59A]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#F2F7F3]">
                  Live Standings
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-[#38D9B0] bg-[#111B17] px-2 py-0.5 rounded-full border border-[rgba(160,190,170,0.14)]">
                SSE Live Stream
              </span>
            </div>

            <div className="space-y-2.5">
              {activeLeaderboard.map((player) => (
                <div
                  key={player.name}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    player.rank === 1
                      ? "bg-[#111B17] border-[#65F59A]/40 shadow-[0_0_15px_rgba(101,245,154,0.12)]"
                      : "bg-[#070B0A] border-[rgba(160,190,170,0.1)] text-[#A0AEA5]"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="font-mono text-xs font-extrabold w-6 text-center text-[#F2F7F3]">
                      {player.badge}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold text-[#F2F7F3] truncate">{player.name}</p>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#69786F]">
                        <Flame className="w-3 h-3 text-[#F87171] fill-current" />
                        <span>Streak: {player.streak}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono font-black text-[#65F59A]">{player.score} pts</p>
                    <span className="text-[9px] font-mono text-[#38D9B0]">{player.delta}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Action Gateway */}
            <div className="pt-4 border-t border-[rgba(160,190,170,0.12)] space-y-2.5">
              <Link href="/live/arena">
                <Button className="w-full bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono text-xs font-bold rounded-[6px] h-10 shadow-[0_0_15px_rgba(101,245,154,0.3)] transition-all flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Enter Competition Arena</span>
                </Button>
              </Link>
              <Link href="/live/join">
                <Button variant="outline" className="w-full border-[rgba(160,190,170,0.18)] bg-[#111B17] hover:bg-[#17251E] text-[#A0AEA5] hover:text-[#F2F7F3] font-mono text-xs rounded-[6px] h-9">
                  <span>Join with Room PIN Code &rarr;</span>
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <SectionDivider variant="editorial" label="PERFORMANCE INTELLIGENCE" />
    </section>
  );
}
