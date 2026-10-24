"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-24 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A] overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(101,245,154,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-[rgba(160,190,170,0.2)] p-8 sm:p-14 bg-gradient-to-br from-[#0C1210] via-[#111B17] to-[#0C1210] text-[#F2F7F3] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(101,245,154,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden"
        >
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#17251E] text-[#65F59A] border border-[#65F59A]/30 font-bold shadow-[0_0_10px_rgba(101,245,154,0.2)]">
                THE COGNITIVE DORMITORY
              </span>
              <span className="font-mono text-[11px] text-[#A0AEA5]">
                // UNIVERSAL QUIZ HABITAT
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F2F7F3] leading-tight">
              Your Next Cognitive Leap <br />
              <span className="bg-gradient-to-r from-[#65F59A] to-[#38D9B0] bg-clip-text text-transparent">
                Starts Right Here.
              </span>
            </h2>
            <p className="text-sm text-[#A0AEA5] leading-relaxed font-normal max-w-xl">
              Step into live decathlon arenas, synthesize adaptive assessments from your curriculum, and accelerate your intellectual quotient with fellow scholars.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 relative z-10 shrink-0">
            <Link href="/auth/register">
              <Button className="bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono text-xs font-bold rounded-[6px] px-6 h-11 shadow-[0_0_20px_rgba(101,245,154,0.35)] flex items-center gap-2 group transition-all">
                <Sparkles className="h-4 w-4 fill-current group-hover:rotate-12 transition-transform" />
                <span>Enter QuizDorm</span>
              </Button>
            </Link>
            <Link href="/live/arena">
              <Button
                variant="outline"
                className="border-[rgba(160,190,170,0.25)] bg-[#111B17] hover:bg-[#17251E] text-[#F2F7F3] hover:text-[#65F59A] font-mono text-xs rounded-[6px] px-5 h-11 flex items-center gap-2 transition-all shadow-sm"
              >
                <Trophy className="h-3.5 w-3.5 text-[#38D9B0]" />
                <span>Step Into the Arena</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
