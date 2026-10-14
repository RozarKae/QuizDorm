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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Trophy className="w-6 h-6 text-amber-500 mr-2" /> Live Competition Arena
          </h1>
          <p className="text-sm text-gray-500">Host, organize, and participate in real-time synchronized quiz tournaments</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setJoinModalOpen(true)} className="text-xs">
            <Key className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Enter Room Code
          </Button>
          <Link href="/dashboard/competitions/new">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
              <Plus className="w-4 h-4 mr-1.5" /> Host Competition
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Live Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Featured Live Event</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            National Science & Olympiad Championship 2026
          </h2>
          <p className="text-amber-100 text-sm">
            Compete against 800+ students nationwide in real-time. Live leaderboards updated after every question.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <Link href="/dashboard/competitions/comp-1/live">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 font-extrabold rounded-xl px-6 py-3 text-sm shadow-md">
                <Play className="w-4 h-4 mr-2 fill-current" /> Join Arena Now
              </Button>
            </Link>
          </div>
        </div>

        {/* PIN Code Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-64">
          <p className="text-xs uppercase font-semibold text-amber-200 mb-1">ROOM PIN CODE</p>
          <p className="text-3xl font-mono font-extrabold tracking-widest text-white">QD-8492</p>
          <p className="text-[11px] text-amber-100 mt-2">840 Participants Active</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {(["All", "Live", "Upcoming", "Completed", "Draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tournament or PIN..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>
      </div>

      {/* Grid */}
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
              className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    className={
                      comp.status === "Live"
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse"
                        : comp.status === "Upcoming"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }
                  >
                    ● {comp.status}
                  </Badge>
                  <span className="text-xs text-gray-400 font-mono font-bold">PIN: {comp.code}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {comp.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{comp.description}</p>

                <div className="space-y-2 text-xs text-gray-500 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1 text-gray-400" /> Participants
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {comp.currentParticipantsCount} / {comp.maxParticipants}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" /> Duration
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{comp.durationMinutes} mins</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
                <Link href={`/dashboard/competitions/${comp.id}/live`}>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                    <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Launch Room
                  </Button>
                </Link>

                <Button variant="ghost" size="icon" onClick={() => handleDelete(comp.id)} className="h-8 w-8 text-red-500">
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
