"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { School, Users, GraduationCap, Trophy, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionDivider from "@/components/ui/section-divider";

export default function Audience() {
  const cards = [
    {
      title: "Schools & Institutions",
      description: "Administer directories, manage class rosters, monitor campus-wide assessment integrity, and view aggregate reports.",
      icon: <School className="h-5 w-5 text-[#65F59A]" />,
      href: "/auth/register?role=school",
      action: "Register Institution",
    },
    {
      title: "Teachers & Educators",
      description: "Build rigorous assessments with AI Studio assistance, auto-grade student submissions, and analyze difficulty curves.",
      icon: <Users className="h-5 w-5 text-[#38D9B0]" />,
      href: "/auth/register?role=teacher",
      action: "Create Teacher Account",
    },
    {
      title: "Students & Learners",
      description: "Participate in live arena matches, take adaptive practice quizzes, track learning telemetry, and earn achievements.",
      icon: <GraduationCap className="h-5 w-5 text-[#65F59A]" />,
      href: "/auth/register?role=student",
      action: "Join as Student",
    },
    {
      title: "Creators & Event Hosts",
      description: "Broadcast synchronized tournaments with PIN lobbies, custom timing parameters, live leaderboards, and instant podiums.",
      icon: <Trophy className="h-5 w-5 text-[#38D9B0]" />,
      href: "/live/arena",
      action: "Enter Competition Arena",
    },
  ];

  return (
    <section id="audience" className="py-20 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-2.5 py-0.5 rounded-full border border-[#65F59A]/20 font-semibold">
              ROLE ARCHITECTURE // WORKSPACES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F2F7F3] tracking-tight">
              Tailored Workspaces for Every Stakeholder
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Scoped permissions, specialized tooling, and focused workflows tailored for students, instructors, event hosts, and academic directors.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex h-full"
            >
              <Card className="flex flex-col justify-between h-full w-full rounded-2xl border border-[rgba(160,190,170,0.14)] bg-[#0C1210] p-6 hover:border-[#65F59A]/30 transition-all duration-300 shadow-xl">
                <CardContent className="p-0 flex flex-col h-full justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-[rgba(160,190,170,0.12)]">
                      <div className="p-2.5 bg-[#17251E] rounded-xl text-[#65F59A] border border-[#65F59A]/20">
                        {card.icon}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#69786F] font-semibold">
                        PROFILE 0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#A0AEA5] leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(160,190,170,0.1)]">
                    <Link href={card.href} className="w-full block">
                      <Button variant="outline" className="w-full justify-between group rounded-xl border-[rgba(160,190,170,0.15)] bg-[#111B17] text-xs font-mono h-9 hover:bg-[#17251E] text-[#F2F7F3] hover:text-[#65F59A] transition-colors">
                        <span>{card.action}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#69786F] group-hover:text-[#65F59A] group-hover:translate-x-1 transition-all" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="editorial" label="PLATFORM CTA" />
    </section>
  );
}
