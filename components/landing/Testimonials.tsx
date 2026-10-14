"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SectionDivider from "@/components/ui/section-divider";

const testimonials = [
  {
    quote:
      "QuizDorm completely transformed how we conduct our weekly inter-school science quizzes. The automated scoring and live leaderboards save us hours every week!",
    author: "Dr. Sarah Jenkins",
    role: "Dean of Academics",
    organization: "Oakridge International School",
    avatar: "SJ",
    rating: 5,
  },
  {
    quote:
      "The Question Builder is super intuitive. Creating multi-choice questions with difficulty tags and instant previews has doubled our quiz creation output.",
    author: "Prof. Michael Zhang",
    role: "Head of Science Department",
    organization: "Metropolitan Quiz Academy",
    avatar: "MZ",
    rating: 5,
  },
  {
    quote:
      "Students love the competitive leaderboard features and countdown timers. Engagement levels in our exam prep sessions are at an all-time high.",
    author: "Elena Rostova",
    role: "Senior Educator",
    organization: "Apex Olympiad Institute",
    avatar: "ER",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
            Trusted Worldwide
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight pt-2">
            Endorsed by Top Educational Leaders
          </h2>
          <p className="text-base sm:text-lg text-[#B8BCC8] leading-relaxed">
            See how premier institutions elevate student engagement and streamline quiz evaluation with QuizDorm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, filter: "blur(8px)", y: 24 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-[24px] bg-white/[0.05] backdrop-blur-[20px] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1.5 shadow-2xl shadow-black/40"
            >
              <div>
                <div className="flex items-center space-x-1 mb-6 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-8 font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-6 border-t border-white/[0.06]">
                <Avatar className="h-11 w-11 border border-blue-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm">
                    {t.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-blue-400 font-medium">
                    {t.role}
                  </p>
                  <p className="text-xs text-[#6B7280]">{t.organization}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="glow" />
    </section>
  );
}
