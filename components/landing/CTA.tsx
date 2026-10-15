"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 relative z-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[3px] border border-border p-8 sm:p-14 bg-foreground text-background shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-acid text-ink font-bold">
                ENROLLMENT ACTIVE
              </span>
              <span className="font-mono text-[11px] text-background/70">
                // INSTITUTION LICENSING
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Deploy Editorial Intelligence Across Your Campus
            </h2>
            <p className="text-xs sm:text-sm text-background/80 leading-relaxed font-normal">
              Empower educators with verified question banks, live multi-campus tournaments, and real-time performance analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/auth/register">
              <Button size="sm" className="bg-cobalt hover:bg-cobalt/90 text-white font-mono text-xs font-semibold rounded-[3px] px-5 h-10 shadow-xs flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-acid" />
                <span>Begin Institutional Setup</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" variant="outline" className="border-background/30 bg-transparent hover:bg-background/10 text-background font-mono text-xs rounded-[3px] px-4 h-10 flex items-center gap-1.5">
                <span>Contact Academic Team</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
