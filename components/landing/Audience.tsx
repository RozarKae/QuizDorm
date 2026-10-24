"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { School, Users, GraduationCap, Trophy, ArrowRight } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function Audience() {
  const cards = [
    {
      title: "Academies & Institutions",
      description: "Administer campus directories, govern assessment integrity, configure institution question adding, and track aggregate cognitive metrics.",
      icon: <School className="h-5 w-5 text-[#65F59A]" />,
      href: "/auth/register?role=school",
      action: "Register Academy",
    },
    {
      title: "Faculty Mentors & Educators",
      description: "Synthesize high-rigor assessments with AI, automate multi-format grading in milliseconds, and pinpoint conceptual bottlenecks.",
      icon: <Users className="h-5 w-5 text-[#38D9B0]" />,
      href: "/auth/register?role=teacher",
      action: "Mentor Workspace",
    },
    {
      title: "Dorm Scholars & Contenders",
      description: "Compete in live arenas with fellow scholars, accelerate your cognitive quotient, track your IQ trajectory, and claim podium honours.",
      icon: <GraduationCap className="h-5 w-5 text-[#65F59A]" />,
      href: "/auth/register?role=student",
      action: "Scholar Portal",
    },
    {
      title: "Decathlon & Arena Hosts",
      description: "Organize high-stakes live showdowns with collision-resistant PINs, microsecond scoring jumps, synchronized delivery, and live victory podiums.",
      icon: <Trophy className="h-5 w-5 text-[#38D9B0]" />,
      href: "/live/arena",
      action: "Enter Live Arena",
    },
  ];

  return (
    <section id="audience" className="py-24 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A] aurora-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-2.5 py-0.5 rounded-full border border-[#65F59A]/20 font-semibold">
              ROLE ARCHITECTURE // THE COGNITIVE DORMITORY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F7F3] tracking-tight">
              Intellect Without <br />
              <span className="text-[#65F59A]">Boundaries.</span>
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Specialized portals tailored for scholars, faculty mentors, tournament proctors, and academy leadership.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[#65F59A]/40 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(101,245,154,0.1)] group"
            >
              <div>
                <div className="p-2.5 bg-[#17251E] rounded-xl text-[#65F59A] border border-[#65F59A]/20 w-fit mb-4 group-hover:border-[#65F59A]/40 transition-colors">
                  {card.icon}
                </div>
                <h3 className="font-display text-base font-bold text-[#F2F7F3] mb-2 group-hover:text-[#65F59A] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-[#A0AEA5] leading-relaxed font-normal mb-6">
                  {card.description}
                </p>
              </div>

              <Link
                href={card.href}
                className="pt-4 border-t border-[rgba(160,190,170,0.1)] flex items-center justify-between text-xs font-mono text-[#65F59A] group-hover:text-[#38D9B0] transition-colors font-medium"
              >
                <span>{card.action}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="editorial" label="JOIN THE ARENA" />
    </section>
  );
}
