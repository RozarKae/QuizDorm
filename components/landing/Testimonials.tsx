"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <section className="py-24 bg-gray-50/60 dark:bg-gray-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Trusted by Educators
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Loved by Schools & Institutes Worldwide
          </p>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            See how top educational institutions drive student engagement and streamline assessment with QuizDorm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 dark:border-gray-900">
                <Avatar className="h-11 w-11 border border-indigo-100 dark:border-indigo-900">
                  <AvatarFallback className="bg-indigo-600 text-white font-bold text-sm">
                    {t.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {t.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.organization}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
