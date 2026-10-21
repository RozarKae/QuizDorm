"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CompetitionItem, CompetitionStatus } from "@/lib/types/competition";
import { JoinCompetitionModal } from "@/components/competitions/JoinCompetitionModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Trophy,
  Users,
  Flame,
  Plus,
  Key,
  Calendar,
  Clock,
  ArrowRight,
  Play,
  Trash2,
  Search,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const mockCompetitions: CompetitionItem[] = [
  {
    id: "comp-1",
    title: "National Science & Olympiad Championship 2026",
    description: "Compete against students nationwide in real-time.",
    quizId: "q-101",
    quizTitle: "Advanced Science & Physics Olympiad",
    code: "QD-8492",
    hostId: "usr-1",
    hostName: "Oakridge Quiz Federation",
    status: "Live",
    startDate: "Jul 23, 2026",
    startTime: "07:30 PM",
    durationMinutes: 45,
    maxParticipants: 1000,
    currentParticipantsCount: 840,
    isPublic: true,
    negativeMarking: true,
    timeBonus: true,
    participants: [],
    announcements: [],
    createdAt: "Jul 2026",
    updatedAt: "Jul 2026",
  },
  {
    id: "comp-2",
    title: "Inter-Institute Coding & Algo Battle",
    description: "High-speed competitive programming quiz tournament.",
    quizId: "q-102",
    quizTitle: "Algorithms & Data Structures",
    code: "QD-3104",
    hostId: "usr-2",
    hostName: "Metropolitan Tech Academy",
    status: "Upcoming",
    startDate: "Jul 24, 2026",
    startTime: "05:00 PM",
    durationMinutes: 60,
    maxParticipants: 500,
    currentParticipantsCount: 310,
    isPublic: true,
    negativeMarking: false,
    timeBonus: true,
    participants: [],
    announcements: [],
    createdAt: "Jul 2026",
    updatedAt: "Jul 2026",
  },
  {
    id: "comp-3",
    title: "Global High School History Bowl",
    description: "World history championship tournament.",
    quizId: "q-103",
    quizTitle: "20th Century World History",
    code: "QD-1250",
    hostId: "usr-3",
    hostName: "Apex Education Network",
    status: "Completed",
    startDate: "Jul 22, 2026",
    startTime: "04:00 PM",
    durationMinutes: 30,
    maxParticipants: 1500,
    currentParticipantsCount: 1250,
    isPublic: true,
    negativeMarking: true,
    timeBonus: true,
    participants: [],
    announcements: [],
    createdAt: "Jul 2026",
    updatedAt: "Jul 2026",
  },
];

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<CompetitionItem[]>(mockCompetitions);
  const [activeTab, setActiveTab] = useState<"All" | "Live" | "Upcoming" | "Completed" | "Draft">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const filtered = competitions.filter((comp) => {
    const matchesSearch =
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || comp.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleDelete = (id: string) => {
    setCompetitions(competitions.filter((c) => c.id !== id));
    toast.success("Competition deleted");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#F2F7F3]">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.14)] pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5]">
            <span className="w-1.5 h-1.5 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
            <span>SYNCHRONIZED MULTIPLAYER // TOURNAMENT ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
            <Trophy className="w-6 h-6 text-[#65F59A] mr-2" /> Live Competition Arena
          </h1>
          <p className="text-xs font-mono text-[#A0AEA5]">
            Host, organize, and participate in deterministic real-time quiz tournaments with synchronized leaderboards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJoinModalOpen(true)}
            className="text-xs font-mono tracking-wider rounded-[4px] border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#65F59A]/30 h-9"
          >
            <Key className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> ROOM PIN CODE
          </Button>
          <Link href="/dashboard/competitions/new">
            <Button size="sm" className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold tracking-wider rounded-[4px] h-9 shadow-[0_0_15px_rgba(101,245,154,0.18)]">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> HOST TOURNAMENT
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Live Tournament Editorial Banner */}
      <div className="border border-[rgba(160,190,170,0.18)] bg-[#0C1210] text-[#F2F7F3] p-6 sm:p-8 rounded-[8px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        {/* Soft radial emerald ambient glow */}
        <div className="absolute top-0 right-1/3 w-96 h-48 bg-[radial-gradient(ellipse_at_center,rgba(101,245,154,0.1)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.3)] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>FEATURED LIVE CHAMPIONSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
            National Science & Olympiad Championship 2026
          </h2>
          <p className="text-[#A0AEA5] text-xs sm:text-sm leading-relaxed">
            Compete against 840+ students nationwide in real-time. Deterministic scoring with live leaderboards synchronized across all nodes.
          </p>
          <div className="pt-2">
            <Link href="/dashboard/competitions/comp-1/live">
              <Button className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs tracking-wider font-bold rounded-[4px] px-6 py-2.5 shadow-[0_0_15px_rgba(101,245,154,0.2)] transition-all hover:shadow-[0_0_24px_rgba(101,245,154,0.35)]">
                <Play className="w-3.5 h-3.5 mr-2 fill-current" /> ENTER LIVE ARENA
              </Button>
            </Link>
          </div>
        </div>

        {/* PIN Code Specimen Box */}
        <div className="border border-[rgba(101,245,154,0.3)] bg-[#111B17] p-6 rounded-[6px] text-center shrink-0 w-full sm:w-64 relative z-10 shadow-[0_0_20px_rgba(101,245,154,0.1)]">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#A0AEA5] mb-1">ARENA ROOM PIN</p>
          <p className="text-3xl font-mono font-extrabold tracking-widest text-[#65F59A]">QD-8492</p>
          <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-[#38D9B0] mt-2">
            <span className="w-1.5 h-1.5 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
            <span>840 COMPETITORS ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#0C1210] p-3.5 rounded-[6px] border border-[rgba(160,190,170,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-1 bg-[#111B17] border border-[rgba(160,190,170,0.16)] p-1 rounded-[4px] w-full sm:w-auto overflow-x-auto">
          {(["All", "Live", "Upcoming", "Completed", "Draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-[3px] text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.3)] font-bold shadow-xs"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#69786F]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tournament or PIN..."
            className="pl-9 h-9 bg-[#111B17] text-xs font-mono rounded-[4px] border-[rgba(160,190,170,0.2)] text-[#F2F7F3] focus:border-[#65F59A]"
          />
        </div>
      </div>

      {/* Tournament Cards Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Competitions Found"
          description="Try selecting a different status filter or create a new competition tournament."
          actionLabel="Host Competition"
          onAction={() => (window.location.href = "/dashboard/competitions/new")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((comp) => (
            <motion.div
              key={comp.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] hover:border-[#65F59A]/40 transition-colors flex flex-col justify-between group shadow-sm hover:shadow-[0_12px_24px_rgba(0,0,0,0.6),0_0_15px_rgba(101,245,154,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className={`text-[9px] font-mono uppercase tracking-widest rounded-[3px] px-2 py-0.5 ${
                      comp.status === "Live"
                        ? "border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.12)] text-[#F87171] animate-pulse"
                        : comp.status === "Upcoming"
                        ? "border-[rgba(101,245,154,0.3)] bg-[rgba(101,245,154,0.12)] text-[#65F59A]"
                        : "border-[rgba(160,190,170,0.16)] bg-[#111B17] text-[#A0AEA5]"
                    }`}
                  >
                    ● {comp.status}
                  </Badge>
                  <span className="text-[10px] text-[#A0AEA5] font-mono font-bold">PIN: {comp.code}</span>
                </div>

                <h3 className="text-base font-bold font-display text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors line-clamp-2 mb-2">
                  {comp.title}
                </h3>
                <p className="text-xs text-[#A0AEA5] line-clamp-2 mb-4 leading-relaxed font-sans">{comp.description}</p>

                <div className="space-y-2 text-xs font-mono text-[#A0AEA5] mb-6 border-t border-[rgba(160,190,170,0.12)] pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-[#69786F]">
                      <Users className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> PARTICIPANTS
                    </span>
                    <span className="font-bold text-[#F2F7F3]">
                      {comp.currentParticipantsCount} / {comp.maxParticipants}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-[#69786F]">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-[#65F59A]" /> DURATION
                    </span>
                    <span className="font-bold text-[#F2F7F3]">{comp.durationMinutes} MINS</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(160,190,170,0.12)] flex items-center justify-between">
                <Link href={`/dashboard/competitions/${comp.id}/live`}>
                  <Button size="sm" className="bg-[#17251E] hover:bg-[#65F59A] text-[#65F59A] hover:text-[#070B0A] border border-[rgba(101,245,154,0.3)] font-mono text-xs tracking-wider rounded-[4px] font-bold transition-all">
                    <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> LAUNCH ROOM
                  </Button>
                </Link>

                <Button variant="ghost" size="icon" onClick={() => handleDelete(comp.id)} className="h-8 w-8 text-[#A0AEA5] hover:text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] rounded-[3px]">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Join Modal */}
      <JoinCompetitionModal
        open={joinModalOpen}
        onOpenChange={setJoinModalOpen}
        onJoinSuccess={(code) => (window.location.href = `/dashboard/competitions/comp-1/live`)}
      />
    </div>
  );
}
