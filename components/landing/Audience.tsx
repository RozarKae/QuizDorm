"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { School, Users, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Audience() {
  const cards = [
    {
      title: "For Schools",
      description: "Administer directories, validate classroom licenses, compile grade reports, and maintain platform security.",
      icon: <School className="h-6 w-6 text-primary" />,
      href: "/auth/register?role=school",
      action: "Register Institution",
    },
    {
      title: "For Teachers",
      description: "Build assessments in minutes, auto-grade quiz submissions, sync classes, and analyze student analytics.",
      icon: <Users className="h-6 w-6 text-primary" />,
      href: "/auth/register?role=teacher",
      action: "Create Teacher Account",
    },
    {
      title: "For Students",
      description: "Join lobbies with classmates, complete exams, learn topics, and track personal leaderboard standings.",
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      href: "/auth/register?role=student",
      action: "Join as Student",
    },
  ];

  return (
    <section id="audience" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest">
            Audience
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed for every learning context
          </p>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            Select your role to explore how QuizDorm makes studying collaborative and fun.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex h-full"
            >
              <Card className="flex flex-col justify-between h-full border border-slate-200 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 shadow-sm hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 rounded-3xl p-6 overflow-hidden">
                <CardContent className="p-0 flex flex-col h-full justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/10 rounded-2xl w-fit text-primary">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link href={card.href} className="w-full">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-gray-850 dark:hover:bg-gray-800 text-white font-medium py-5 rounded-2xl flex items-center justify-center space-x-2">
                        <span>{card.action}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
