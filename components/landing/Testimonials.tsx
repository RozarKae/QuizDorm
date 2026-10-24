"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, School, Award, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SectionDivider from "@/components/ui/section-divider";

const testimonials = [
  {
    quote:
      "QuizDorm has fundamentally transformed our Samacheer Kalvi and NEET/JEE preparatory training. Our scholars from Saidapet to across Chennai battle in synchronized decathlon rounds, and the instant cognitive telemetry pinpoints conceptual blindspots right away.",
    author: "Dr. K. Saravanan",
    community: "Hindu Community",
    role: "Headmaster & P.G. Assistant",
    organization: "Government Model Higher Secondary School, Saidapet, Chennai",
    board: "Tamil Nadu State Board & Samacheer Kalvi",
    avatar: "KS",
    rating: 5,
  },
  {
    quote:
      "The real-time live arena has elevated our inter-campus competitions across Kochi and Central Kerala. Hosting high-velocity physics and algorithmic decathlons with live podium shifts provides an electric campus experience.",
    author: "Mary Thomas",
    community: "Christian Community",
    role: "Vice Principal & Senior Academic Dean",
    organization: "The Choice School, Tripunithura, Kochi",
    board: "CBSE & International Curriculum",
    avatar: "MT",
    rating: 5,
  },
  {
    quote:
      "Implementing QuizDorm enabled our Saurashtra community scholars in Madurai to master competitive mathematics and state-rank assessment modules. The automated question synthesis and cognitive clarity are unparalleled.",
    author: "T. S. Soundararajan",
    community: "Saurashtrian Community (Pattunool)",
    role: "Academic Coordinator & Senior Mentor",
    organization: "Sourashtra Higher Secondary School, Madurai",
    board: "Tamil Nadu Higher Secondary & Matriculation",
    avatar: "TS",
    rating: 5,
  },
  {
    quote:
      "From Malappuram to Ernakulam, our scholars engage daily with timed decathlons and Knowledge Matrix quests. The platform founder RK Akbar's vision of bringing world-class assessment tech to Kerala's schools has yielded record distinctions in public exams.",
    author: "Dr. Shahul Hameed",
    community: "Muslim Community",
    role: "Director of Academics",
    organization: "Al-Ameen Universal Public School, Edappally, Kochi",
    board: "CBSE South Zone & Universal Education",
    avatar: "SH",
    rating: 5,
  },
  {
    quote:
      "The question verification and quality checks ensure top-tier questions for our inter-school trials. Students from Sowcarpet and George Town to Madurai experience exciting, fair live battles that boost their exam confidence.",
    author: "Prof. Parasmal Jain",
    community: "Jain Community",
    role: "Senior Controller of Examinations",
    organization: "Mahaveer International Academy, George Town, Chennai",
    board: "ICSE & National Assessment Council",
    avatar: "PJ",
    rating: 5,
  },
  {
    quote:
      "Conducting state-wide IT and algorithmic decathlons across Kerala's government higher secondary schools was once a logistical challenge. QuizDorm's SSE live room engine delivers seamless execution without latency.",
    author: "Harikrishnan Nair",
    community: "Hindu Community",
    role: "State IT & Science Fair Convener",
    organization: "Government Model Boys Higher Secondary School, Thrissur",
    board: "Kerala DHSE & General Education Dept",
    avatar: "HN",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative z-10 border-b border-border bg-background aurora-grid transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-50 dark:text-[#65F59A] dark:bg-[#111B17] px-3 py-1 rounded-full border border-emerald-300 dark:border-[#65F59A]/30 font-semibold shadow-xs">
                REGIONAL VALIDATION // TAMIL NADU &amp; KERALA
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-[#F2F7F3] tracking-tight">
              Endorsed by Premier <br />
              <span className="bg-gradient-to-r from-[#047857] via-[#0D9488] to-[#047857] dark:from-[#65F59A] dark:via-[#38D9B0] dark:to-[#65F59A] bg-clip-text text-transparent">
                Educational Institutions.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-[#A0AEA5] max-w-md leading-relaxed">
            Headmasters, academic directors, and Olympiad conveners across Government, Matriculation, CBSE, ICSE, and International institutions share their transformative outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-[6px] bg-card border border-border flex flex-col justify-between hover:border-emerald-600/40 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                  <div className="flex items-center space-x-1 text-amber-500 dark:text-[#65F59A]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-800 dark:text-[#65F59A] bg-emerald-50 dark:bg-[#111B17] px-2 py-0.5 rounded-[3px] border border-emerald-300 dark:border-[rgba(101,245,154,0.2)]">
                    {t.board}
                  </span>
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-emerald-600/20 dark:text-[#65F59A]/20 absolute -top-1 -left-1" />
                  <p className="text-slate-700 dark:text-[#C0CEC5] text-xs leading-relaxed italic mb-6 font-normal pl-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 rounded-[4px] border border-emerald-300 dark:border-[#65F59A]/30">
                    <AvatarFallback className="bg-emerald-50 dark:bg-[#111B17] text-emerald-800 dark:text-[#65F59A] font-mono text-xs font-bold rounded-[4px]">
                      {t.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold font-display text-slate-900 dark:text-[#F2F7F3] truncate group-hover:text-emerald-700 dark:group-hover:text-[#65F59A] transition-colors">
                      {t.author}
                    </h4>
                    <p className="text-[10px] text-emerald-700 dark:text-[#65F59A] font-mono truncate font-medium">
                      {t.role}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#111B17] p-2 rounded-[4px] border border-border">
                  <p className="text-[10px] font-mono text-slate-600 dark:text-[#A0AEA5] flex items-center gap-1.5 leading-tight">
                    <School className="w-3 h-3 text-teal-700 dark:text-[#38D9B0] shrink-0" />
                    <span className="truncate">{t.organization}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="editorial" label="ARENA PIPELINE" />
    </section>
  );
}
