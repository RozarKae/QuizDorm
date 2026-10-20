"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-[rgba(160,190,170,0.18)] p-8 sm:p-14 bg-[#0C1210] text-[#F2F7F3] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#65F59A]/5 blur-3xl pointer-events-none rounded-full" />
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#17251E] text-[#65F59A] border border-[#65F59A]/30 font-bold">
                SYSTEM DEPLOYMENT ACTIVE
              </span>
              <span className="font-mono text-[11px] text-[#A0AEA5]">
                // HIGH-CONCURRENCY ASSESSMENT ENGINE
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F2F7F3]">
              Experience the Future of Intelligent Assessment
            </h2>
            <p className="text-xs sm:text-sm text-[#A0AEA5] leading-relaxed font-normal">
              Empower educators and learners with verified question banks, live competition arenas, and real-time performance telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <Link href="/auth/register">
              <Button size="sm" className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-xl px-5 h-10 shadow-lg shadow-[#65F59A]/15 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 fill-current" />
                <span>Get Started Now</span>
              </Button>
            </Link>
            <Link href="/live/arena">
              <Button size="sm" variant="outline" className="border-[rgba(160,190,170,0.18)] bg-[#111B17] hover:bg-[#17251E] text-[#F2F7F3] hover:text-[#65F59A] font-mono text-xs rounded-xl px-4 h-10 flex items-center gap-1.5 transition-colors">
                <span>Enter Live Arena</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
