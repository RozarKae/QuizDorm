"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-28 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] overflow-hidden p-10 sm:p-20 bg-white/[0.05] backdrop-blur-[24px] border border-white/[0.12] shadow-2xl shadow-blue-950/40 flex flex-col items-center text-center space-y-8"
        >
          {/* Subtle background abstract glows */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-600/20 via-emerald-500/20 to-indigo-600/20 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Get Started Today
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight pt-2">
              Ready to Elevate Your Institution?
            </h2>
            <p className="text-base sm:text-lg text-[#B8BCC8] leading-relaxed">
              Join thousands of educators and students leveraging AI-powered quizzes, live arena battles, and deep analytical reports today.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/auth/register">
              <Button size="lg" className="rounded-[16px] px-8 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-semibold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all">
                <Sparkles className="h-5 w-5 mr-1" />
                Start Creating Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-[16px] px-8 border-white/10 bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-base backdrop-blur-md group">
                <span>Talk to Sales</span>
                <ArrowRight className="h-4 w-4 ml-1 text-[#B8BCC8] group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
