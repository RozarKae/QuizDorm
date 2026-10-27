"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight,Sparkles,Trophy } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 relative z-10 border-b border-border bg-background overflow-hidden transition-colors">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(190, 18, 60,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255, 77, 109,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-slate-200 dark:border-[rgba(240, 160, 180,0.2)] p-8 sm:p-14 bg-gradient-to-br from-white via-slate-50 to-rose-50/50 dark:from-[#140C0E] dark:via-[#1D1013] dark:to-[#140C0E] text-slate-900 dark:text-[#F2F7F3] shadow-xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(255, 77, 109,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden"
        >
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-300 dark:bg-[#2A141A] dark:text-[#FF4D6D] dark:border-[#FF4D6D]/30 font-bold shadow-xs">
                THE COGNITIVE DORMITORY
              </span>
              <span className="font-mono text-[11px] text-slate-500 dark:text-[#A0AEA5]">
                {"// UNIVERSAL QUIZ HABITAT"}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F2F7F3] leading-tight">
              Your Next Cognitive Leap <br />
              <span className="bg-gradient-to-r from-[#BE123C] to-[#0D9488] dark:from-[#FF4D6D] dark:to-[#FF758F] bg-clip-text text-transparent">
                Starts Right Here.
              </span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-[#A0AEA5] leading-relaxed font-normal max-w-xl">
              Step into live decathlon arenas, synthesize adaptive assessments from your curriculum, and accelerate your intellectual quotient with fellow scholars.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 relative z-10 shrink-0">
            <Link href="/auth/register">
              <Button className="bg-[#BE123C] hover:bg-[#9F1239] text-white dark:bg-[#FF4D6D] dark:hover:bg-[#FF3366] dark:text-[#0B0708] font-mono text-xs font-bold rounded-[6px] px-6 h-11 shadow-[0_0_20px_rgba(190, 18, 60,0.25)] dark:shadow-[0_0_20px_rgba(255, 77, 109,0.35)] flex items-center gap-2 group transition-all">
                <Sparkles className="h-4 w-4 fill-current group-hover:rotate-12 transition-transform" />
                <span>Enter QuizDorm</span>
              </Button>
            </Link>
            <Link href="/live/arena">
              <Button
                variant="outline"
                className="border-slate-300 bg-white hover:bg-slate-100 text-slate-800 hover:text-rose-700 dark:border-[rgba(240, 160, 180,0.25)] dark:bg-[#1D1013] dark:hover:bg-[#2A141A] dark:text-[#F2F7F3] dark:hover:text-[#FF4D6D] font-mono text-xs rounded-[6px] px-5 h-11 flex items-center gap-2 transition-all shadow-sm"
              >
                <Trophy className="h-3.5 w-3.5 text-rose-700 dark:text-[#FF758F]" />
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
