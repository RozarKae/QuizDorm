"use client";

import { useSound } from "@/components/audio/useSound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveParticipant } from "@/lib/types/competition";
import { AnimatePresence,motion } from "framer-motion";
import { ArrowDown,ArrowRight,ArrowUp,CheckCircle2,Flame,Minus,Trophy,Zap } from "lucide-react";
import { useEffect,useRef } from "react";

interface AnimatedLeaderboardProps {
  participants: LiveParticipant[];
  onNextQuestion?: () => void;
  isHost?: boolean;
  questionExplanation?: string;
  correctOptionText?: string;
}

export function AnimatedLeaderboard({
  participants,
  onNextQuestion,
  isHost = true,
  questionExplanation,
  correctOptionText,
}: AnimatedLeaderboardProps) {
  const { playRankSwap, playTap } = useSound();
  const prevOrderRef = useRef<string[]>([]);

  // Sort participants by score descending
  const sorted = [...participants].sort((a, b) => b.score - a.score);

  // Play kinetic rank swap audio when leaderboard positions shift
  useEffect(() => {
    const currentOrder = sorted.map((p) => p.id);
    if (prevOrderRef.current.length > 0) {
      const hasOrderChanged = currentOrder.some(
        (id, idx) => id !== prevOrderRef.current[idx]
      );
      if (hasOrderChanged) {
        playRankSwap();
      }
    }
    prevOrderRef.current = currentOrder;
  }, [sorted, playRankSwap]);

  return (
    <div className="space-y-6">
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#140C0E] text-[#F2F7F3] p-5 sm:p-6 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xl relative overflow-hidden">
        {/* Soft emerald ambient light */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at 80% 30%, rgba(255, 77, 109, 0.08), transparent 60%)",
          }}
        />

        <div className="space-y-1 relative z-10">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#FF4D6D]">
            <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-pulse shadow-[0_0_8px_#FF4D6D]" />
            <span>INTERMEDIATE LEADERBOARD // LIVE RANKINGS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display flex items-center text-[#F2F7F3]">
            <Trophy className="w-5 h-5 text-[#FF4D6D] mr-2" /> Live Arena Standings
          </h2>
        </div>

        {isHost ? (
          onNextQuestion && (
            <Button
              onClick={() => {
                playTap();
                onNextQuestion();
              }}
              className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono text-xs font-bold rounded-[4px] px-6 py-2 shadow-[0_0_15px_rgba(255, 77, 109,0.22)] relative z-10 transition-all hover:shadow-[0_0_24px_rgba(255, 77, 109,0.35)]"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )
        ) : (
          <Badge className="bg-[#1D1013] text-[#A0AEA5] font-mono text-xs border border-[rgba(240, 160, 180,0.18)] self-start sm:self-center">
            Waiting for host to proceed...
          </Badge>
        )}
      </div>

      {/* Revealed Solution Card if present */}
      {(correctOptionText || questionExplanation) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[rgba(255, 77, 109,0.08)] border border-[rgba(255, 77, 109,0.25)] p-4 rounded-[6px] space-y-1"
        >
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#FF4D6D]">
            <CheckCircle2 className="w-4 h-4 text-[#FF4D6D]" />
            <span>CORRECT ANSWER REVEALED</span>
          </div>
          {correctOptionText && (
            <p className="text-sm font-bold text-[#F2F7F3]">
              {correctOptionText}
            </p>
          )}
          {questionExplanation && (
            <p className="text-xs text-[#A0AEA5] leading-relaxed pt-1 font-mono">
              {questionExplanation}
            </p>
          )}
        </motion.div>
      )}

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center items-end max-w-xl mx-auto py-2">
        {/* 2nd Place */}
        {sorted[1] ? (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(255, 117, 143,0.3)] shadow-xs space-y-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#2A141A] text-[#FF758F] border border-[rgba(255, 117, 143,0.4)] font-mono font-bold text-xs mx-auto flex items-center justify-center">
              2
            </div>
            <p className="text-xs font-bold text-[#F2F7F3] truncate">{sorted[1].name}</p>
            <p className="text-xs font-mono font-bold text-[#FF758F]">{sorted[1].score} pts</p>
          </motion.div>
        ) : <div />}

        {/* 1st Place */}
        {sorted[0] ? (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1D1013] p-5 rounded-[6px] border border-[#FF4D6D]/60 shadow-[0_0_24px_rgba(255, 77, 109,0.18)] space-y-2 text-[#F2F7F3]"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF4D6D] text-[#0B0708] font-mono font-black text-sm mx-auto flex items-center justify-center shadow-sm">
              1
            </div>
            <p className="text-sm font-extrabold text-[#F2F7F3] truncate">{sorted[0].name}</p>
            <p className="text-sm font-mono font-black text-[#FF4D6D]">{sorted[0].score} pts</p>
          </motion.div>
        ) : <div />}

        {/* 3rd Place */}
        {sorted[2] ? (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.16)] shadow-xs space-y-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#2A141A] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.2)] font-mono font-bold text-xs mx-auto flex items-center justify-center">
              3
            </div>
            <p className="text-xs font-bold text-[#F2F7F3] truncate">{sorted[2].name}</p>
            <p className="text-xs font-mono font-bold text-[#A0AEA5]">{sorted[2].score} pts</p>
          </motion.div>
        ) : <div />}
      </div>

      {/* Full Leaderboard Table with Fluid Motion Swaps */}
      <div className="bg-[#140C0E] rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs overflow-hidden p-4 sm:p-5 space-y-2">
        <AnimatePresence mode="popLayout">
          {sorted.map((p, idx) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className={`p-3 rounded-[4px] border flex items-center justify-between transition-colors ${
                idx === 0
                  ? "border-[rgba(255, 77, 109,0.35)] bg-[rgba(255, 77, 109,0.08)] shadow-[0_0_12px_rgba(255, 77, 109,0.06)]"
                  : "border-[rgba(240, 160, 180,0.1)] bg-[#1D1013]/60 hover:bg-[#1D1013]"
              }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className={`font-extrabold text-xs w-6 font-mono ${idx === 0 ? "text-[#FF4D6D]" : "text-[#69786F]"}`}>
                  #{idx + 1}
                </span>

                {/* Movement indicator */}
                <div className="flex items-center text-xs font-mono font-bold w-9">
                  {(p.rankChange || 0) > 0 ? (
                    <span className="text-[#FF4D6D] flex items-center">
                      <ArrowUp className="w-3.5 h-3.5 mr-0.5" />+{(p.rankChange || 0)}
                    </span>
                  ) : (p.rankChange || 0) < 0 ? (
                    <span className="text-[#F87171] flex items-center">
                      <ArrowDown className="w-3.5 h-3.5 mr-0.5" />{(p.rankChange || 0)}
                    </span>
                  ) : (
                    <span className="text-[#69786F] flex items-center">
                      <Minus className="w-3.5 h-3.5 mr-0.5" />=
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-[3px] bg-[#2A141A] text-[#FF4D6D] font-mono font-bold text-xs flex items-center justify-center border border-[rgba(255, 77, 109,0.2)]">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs font-semibold text-[#F2F7F3]">{p.name}</p>
                      {idx === 0 && (
                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[rgba(255, 77, 109,0.18)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)]">
                          LEADER
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      {(p.streak || 0) >= 2 && (
                        <span className="inline-flex items-center text-[10px] text-[#FF4D6D] font-mono font-semibold">
                          <Flame className="w-3 h-3 mr-0.5 fill-current" /> {p.streak} Streak
                        </span>
                      )}
                      {(p.streak || 0) >= 4 && (
                        <span className="inline-flex items-center text-[9px] text-[#FF758F] font-mono font-semibold">
                          <Zap className="w-2.5 h-2.5 mr-0.5 fill-current" /> 1.5x Multiplier
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-mono text-xs sm:text-sm font-bold text-[#FF4D6D] tabular-nums">
                {p.score} pts
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
