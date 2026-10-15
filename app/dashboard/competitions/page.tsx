"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CompetitionItem, CompetitionStatus } from "@/lib/types/competition";
import { JoinCompetitionModal } from "@/components/competitions/JoinCompetitionModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
  Edit,
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-[#E85D3F] rounded-full animate-pulse" />
            <span>SYNCHRONIZED MULTIPLAYER // TOURNAMENT ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground flex items-center">
            <Trophy className="w-6 h-6 text-[#2855F5] mr-2" /> Live Competition Arena
          </h1>
          <p className="text-xs text-muted-foreground">
            Host, organize, and participate in deterministic real-time quiz tournaments with live leaderboards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJoinModalOpen(true)}
            className="text-xs font-mono tracking-wider rounded-[3px] border-border"
          >
            <Key className="w-3.5 h-3.5 mr-1.5 text-[#2855F5]" /> ROOM PIN CODE
          </Button>
          <Link href="/dashboard/competitions/new">
            <Button size="sm" className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs tracking-wider rounded-[3px]">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> HOST TOURNAMENT
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Live Tournament Editorial Banner */}
      <div className="border border-border bg-[#111318] text-white p-6 sm:p-8 rounded-[3px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle grid watermark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-[2px] bg-[#E85D3F]/20 text-[#E85D3F] border border-[#E85D3F]/40 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>FEATURED LIVE CHAMPIONSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F7F5EF]">
            National Science & Olympiad Championship 2026
          </h2>
          <p className="text-[#E7E5DF]/80 text-xs sm:text-sm leading-relaxed">
            Compete against 840+ students nationwide in real-time. Deterministic scoring with live leaderboards synchronized across all nodes.
          </p>
          <div className="pt-2">
            <Link href="/dashboard/competitions/comp-1/live">
              <Button className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs tracking-wider font-bold rounded-[3px] px-5 py-2.5">
                <Play className="w-3.5 h-3.5 mr-2 fill-current" /> ENTER LIVE ARENA
              </Button>
            </Link>
          </div>
        </div>

        {/* PIN Code Specimen Box */}
        <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-6 rounded-[2px] text-center shrink-0 w-full sm:w-64 relative z-10">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1">ARENA ROOM PIN</p>
          <p className="text-3xl font-mono font-extrabold tracking-widest text-[#DFFF43]">QD-8492</p>
          <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-white/80 mt-2">
            <span className="w-1.5 h-1.5 bg-[#DFFF43] rounded-full animate-pulse" />
            <span>840 COMPETITORS ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-[3px] border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-background border border-border p-1 rounded-[2px] w-full sm:w-auto overflow-x-auto">
          {(["All", "Live", "Upcoming", "Completed", "Draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === tab ? "bg-[#2855F5] text-white font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tournament or PIN..."
            className="pl-9 h-9 bg-background text-xs font-mono rounded-[3px] border-border"
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
            <div
              key={comp.id}
              className="bg-card p-6 rounded-[3px] border border-border hover:border-[#2855F5] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className={`text-[9px] font-mono uppercase tracking-widest rounded-[2px] px-2 py-0.5 ${
                      comp.status === "Live"
                        ? "border-[#E85D3F]/40 bg-[#E85D3F]/10 text-[#E85D3F] animate-pulse"
                        : comp.status === "Upcoming"
                        ? "border-[#2855F5]/40 bg-[#2855F5]/10 text-[#2855F5]"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    ● {comp.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-mono font-bold">PIN: {comp.code}</span>
                </div>

                <h3 className="text-base font-bold font-display text-foreground group-hover:text-[#2855F5] transition-colors line-clamp-2 mb-2">
                  {comp.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{comp.description}</p>

                <div className="space-y-2 text-xs font-mono text-muted-foreground mb-6 border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> PARTICIPANTS
                    </span>
                    <span className="font-bold text-foreground">
                      {comp.currentParticipantsCount} / {comp.maxParticipants}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> DURATION
                    </span>
                    <span className="font-bold text-foreground">{comp.durationMinutes} MINS</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link href={`/dashboard/competitions/${comp.id}/live`}>
                  <Button size="sm" className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs tracking-wider rounded-[3px]">
                    <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> LAUNCH ROOM
                  </Button>
                </Link>

                <Button variant="ghost" size="icon" onClick={() => handleDelete(comp.id)} className="h-8 w-8 text-[#E85D3F] hover:bg-[#E85D3F]/10 rounded-[3px]">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
