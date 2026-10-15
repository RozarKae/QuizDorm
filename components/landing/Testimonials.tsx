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
    <section className="py-20 relative z-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold">
              INSTITUTIONAL ENDORSEMENTS // DISPATCH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Validated by Premier Academic Institutions
            </h2>
          </div>
          <p className="text-sm font-normal text-muted-foreground max-w-md leading-relaxed">
            Leading department heads, Olympiad coaches, and academic directors recount platform adoption and measurable exam outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-[3px] bg-card border border-border flex flex-col justify-between hover:border-cobalt/40 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                  <div className="flex items-center space-x-1 text-acid font-mono text-xs">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-cobalt text-cobalt" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    REVIEW #{idx + 1}
                  </span>
                </div>

                <p className="text-foreground text-xs leading-relaxed italic mb-6 font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <Avatar className="h-9 w-9 rounded-[3px] border border-border">
                  <AvatarFallback className="bg-primary text-primary-foreground font-mono text-xs font-bold rounded-[3px]">
                    {t.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xs font-bold font-display text-foreground">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-cobalt font-mono">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">{t.organization}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="editorial" label="NEXT STEP" />
    </section>
  );
}
