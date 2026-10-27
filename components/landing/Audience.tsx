"use client";

import SectionDivider from "@/components/ui/section-divider";
import { motion } from "framer-motion";
import { ArrowRight,GraduationCap,School,Trophy,Users } from "lucide-react";
import Link from "next/link";

export default function Audience() {
  const cards = [
    {
      title: "Academies & Institutions",
      description: "Administer campus directories, govern assessment integrity, configure institution question adding, and track aggregate cognitive metrics.",
      icon: <School className="h-5 w-5 text-rose-700 dark:text-[#FF4D6D]" />,
      href: "/auth/register?role=school",
      action: "Register Academy",
    },
    {
      title: "Faculty Mentors & Educators",
      description: "Synthesize high-rigor assessments with AI, automate multi-format grading in milliseconds, and pinpoint conceptual bottlenecks.",
      icon: <Users className="h-5 w-5 text-rose-700 dark:text-[#FF758F]" />,
      href: "/auth/register?role=teacher",
      action: "Mentor Workspace",
    },
    {
      title: "Dorm Scholars & Contenders",
      description: "Compete in live arenas with fellow scholars, accelerate your cognitive quotient, track your IQ trajectory, and claim podium honours.",
      icon: <GraduationCap className="h-5 w-5 text-rose-700 dark:text-[#FF4D6D]" />,
      href: "/auth/register?role=student",
      action: "Scholar Portal",
    },
    {
      title: "Decathlon & Arena Hosts",
      description: "Organize high-stakes live showdowns with collision-resistant PINs, microsecond scoring jumps, synchronized delivery, and live victory podiums.",
      icon: <Trophy className="h-5 w-5 text-rose-700 dark:text-[#FF758F]" />,
      href: "/live/arena",
      action: "Enter Live Arena",
    },
  ];

  return (
    <section id="audience" className="py-24 relative z-10 border-b border-border bg-background aurora-grid transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-rose-800 bg-rose-50 dark:text-[#FF4D6D] dark:bg-[#2A141A] px-2.5 py-0.5 rounded-full border border-rose-300 dark:border-[#FF4D6D]/20 font-semibold shadow-xs">
              ROLE ARCHITECTURE // THE COGNITIVE DORMITORY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-[#F2F7F3] tracking-tight">
              Intellect Without <br />
              <span className="text-rose-700 dark:text-[#FF4D6D]">Boundaries.</span>
            </h2>
          </div>
          <p className="text-sm font-normal text-slate-600 dark:text-[#A0AEA5] max-w-md leading-relaxed">
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
              className="p-6 rounded-2xl bg-card border border-border hover:border-rose-600/40 transition-all duration-300 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg group"
            >
              <div>
                <div className="p-2.5 bg-rose-50 dark:bg-[#2A141A] rounded-xl text-rose-800 dark:text-[#FF4D6D] border border-rose-200 dark:border-[#FF4D6D]/20 w-fit mb-4 group-hover:border-rose-500/40 transition-colors shadow-xs">
                  {card.icon}
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-[#F2F7F3] mb-2 group-hover:text-rose-700 dark:group-hover:text-[#FF4D6D] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#A0AEA5] leading-relaxed font-normal mb-6">
                  {card.description}
                </p>
              </div>

              <Link
                href={card.href}
                className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-rose-700 hover:text-rose-700 dark:text-[#FF4D6D] dark:hover:text-[#FF758F] transition-colors font-semibold"
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
