"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { School, Users, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionDivider from "@/components/ui/section-divider";

export default function Audience() {
  const cards = [
    {
      title: "For Schools",
      description: "Administer directories, validate classroom licenses, compile aggregate reports, and maintain platform security.",
      icon: <School className="h-6 w-6 text-blue-400" />,
      href: "/auth/register?role=school",
      action: "Register Institution",
    },
    {
      title: "For Teachers",
      description: "Build assessments in minutes with AI assistance, auto-grade quiz submissions, and analyze class grade curves.",
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      href: "/auth/register?role=teacher",
      action: "Create Teacher Account",
    },
    {
      title: "For Students",
      description: "Join live lobbies with classmates, master exam topics through flashcard modes, and dominate leaderboards.",
      icon: <GraduationCap className="h-6 w-6 text-amber-400" />,
      href: "/auth/register?role=student",
      action: "Join as Student",
    },
  ];

  return (
    <section id="audience" className="py-28 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
            Tailored Experiences
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight pt-2">
            Designed for Every Educational Role
          </h2>
          <p className="text-base sm:text-lg text-[#B8BCC8] leading-relaxed">
            Choose your learning portal to experience tailored tools, interactive dashboards, and real-time collaboration.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, filter: "blur(8px)", y: 24 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full"
            >
              <Card className="flex flex-col justify-between h-full w-full">
                <CardContent className="p-0 flex flex-col h-full justify-between space-y-8">
                  <div className="space-y-4">
                    <div className="p-3.5 bg-white/[0.05] border border-white/10 rounded-[18px] w-fit shadow-md">
                      {card.icon}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#B8BCC8] leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link href={card.href} className="w-full block">
                      <Button variant="outline" className="w-full justify-between group">
                        <span>{card.action}</span>
                        <ArrowRight className="h-4 w-4 text-[#B8BCC8] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="glow" />
    </section>
  );
}
