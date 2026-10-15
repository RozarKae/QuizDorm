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
    <section id="audience" className="py-20 relative z-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold">
              ROLE ARCHITECTURE // ADAPTATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Dedicated Interfaces for Every Stakeholder
            </h2>
          </div>
          <p className="text-sm font-normal text-muted-foreground max-w-md leading-relaxed">
            Tailored permissions, specialized tooling, and custom workflows configured for students, instructors, and campus administrators.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex h-full"
            >
              <Card className="flex flex-col justify-between h-full w-full rounded-[3px] border border-border bg-card p-6 hover:border-cobalt/40 transition-colors shadow-xs">
                <CardContent className="p-0 flex flex-col h-full justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div className="p-2 bg-muted rounded-[2px] text-foreground border border-border">
                        {card.icon}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                        PROFILE 0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Link href={card.href} className="w-full block">
                      <Button variant="outline" className="w-full justify-between group rounded-[3px] border-border text-xs font-mono h-9 hover:bg-muted text-foreground">
                        <span>{card.action}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-cobalt group-hover:translate-x-1 transition-all" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="editorial" label="TELEMETRY INDEX" />
    </section>
  );
}
