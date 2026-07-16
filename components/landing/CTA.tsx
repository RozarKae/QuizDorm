"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden px-8 py-16 sm:py-24 sm:px-12 bg-primary shadow-2xl flex flex-col items-center text-center space-y-8"
        >
          {/* Subtle background abstract blobs */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-indigo-900 to-violet-850 opacity-95" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-400/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-purple-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to transform learning?
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              Create an account today and empower your classroom or organization with gamified quizzes and real-time analytical reports.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button className="bg-white text-primary hover:bg-slate-50 font-bold py-6 px-8 rounded-2xl text-base shadow-lg">
                Start Now
              </Button>
            </Link>
            <Link href="#">
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white hover:text-white font-bold py-6 px-8 rounded-2xl text-base">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
