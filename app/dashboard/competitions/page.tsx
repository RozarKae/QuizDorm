"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  Users,
  Flame,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Competition {
  id: string;
  title: string;
  organizer: string;
  status: "Live" | "Upcoming" | "Completed";
  startTime: string;
  participantsCount: number;
  prizePool: string;
  remainingSeconds: number;
}

const mockCompetitions: Competition[] = [
  {
    id: "comp-1",
    title: "National Science & Olympiad Championship 2026",
    organizer: "Oakridge Quiz Federation",
    status: "Live",
    startTime: "Started 15 mins ago",
    participantsCount: 840,
    prizePool: "Gold Trophy + $500",
    remainingSeconds: 2700, // 45 mins
  },
  {
    id: "comp-2",
    title: "Inter-Institute Coding & Algo Battle",
    organizer: "Metropolitan Tech Academy",
    status: "Upcoming",
    startTime: "Starts in 2 hours",
    participantsCount: 310,
    prizePool: "Silver Shield + Certificates",
    remainingSeconds: 7200,
  },
  {
    id: "comp-3",
    title: "Global High School History Bowl",
    organizer: "Apex Education Network",
    status: "Completed",
    startTime: "Ended Yesterday",
    participantsCount: 1250,
    prizePool: "Medals & Honor Board",
    remainingSeconds: 0,
  },
];

export default function CompetitionsPage() {
  const [competitions] = useState<Competition[]>(mockCompetitions);

  // Live Timer Countdown Hook
  const formatTime = (totalSec: number) => {
    if (totalSec <= 0) return "00:00:00";
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleJoin = (title: string) => {
    toast.success(`Joined competition: ${title}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Trophy className="w-6 h-6 text-amber-500 mr-2" /> Live Competitions
          </h1>
          <p className="text-sm text-gray-500">Participate in scheduled quiz tournaments and earn medals</p>
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
            <Button onClick={() => handleJoin("National Science Championship")} className="bg-white text-orange-600 hover:bg-gray-100 font-bold rounded-xl px-6 py-3">
              Join Championship Now
            </Button>
          </div>
        </div>

        {/* Countdown Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-64">
          <p className="text-xs uppercase font-semibold text-amber-200 mb-1">Time Remaining</p>
          <p className="text-3xl font-mono font-extrabold tracking-widest text-white">00:45:00</p>
          <p className="text-[11px] text-amber-100 mt-2">Live Ranking Active</p>
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitions.map((comp) => (
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
                <span className="text-xs text-gray-400 font-medium">{comp.organizer}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-3">
                {comp.title}
              </h3>

              <div className="space-y-2 text-xs text-gray-500 mb-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-gray-400" /> Participants
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{comp.participantsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Trophy className="w-3.5 h-3.5 mr-1 text-amber-500" /> Reward / Prize
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{comp.prizePool}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
              <Link href={`/dashboard/competitions/${comp.id}`}>
                <Button variant="ghost" size="sm" className="text-xs text-gray-600 dark:text-gray-400">
                  View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
              {comp.status !== "Completed" && (
                <Button
                  onClick={() => handleJoin(comp.title)}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
                >
                  Join Competition
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
