"use client";

import React, { useState } from "react";
import { Award, Trophy, ArrowUp, ArrowDown, Minus, Search, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  school: string;
  score: number;
  quizzesTaken: number;
  movement: "up" | "down" | "same";
  movementCount?: number;
}

const mockLeaderboard: LeaderboardUser[] = [
  { rank: 1, name: "Karthik Rajendran", avatar: "KR", school: "Govt Model HSS Saidapet, Chennai", score: 2890, quizzesTaken: 34, movement: "up", movementCount: 2 },
  { rank: 2, name: "Fathima Nasreen", avatar: "FN", school: "Al-Ameen Universal, Kochi", score: 2750, quizzesTaken: 30, movement: "same" },
  { rank: 3, name: "Kevin Fernandez", avatar: "KF", school: "The Choice School, Tripunithura", score: 2610, quizzesTaken: 28, movement: "down", movementCount: 1 },
  { rank: 4, name: "Anandhi K. Bapu", avatar: "AB", school: "Sourashtra HSS, Madurai", score: 2480, quizzesTaken: 26, movement: "up", movementCount: 3 },
  { rank: 5, name: "Gautham Chand Jain", avatar: "GJ", school: "Mahaveer Int. Academy, Chennai", score: 2390, quizzesTaken: 25, movement: "same" },
  { rank: 6, name: "Harikrishnan Nair", avatar: "HN", school: "Govt Model Boys HSS, Thrissur", score: 2310, quizzesTaken: 24, movement: "up", movementCount: 1 },
  { rank: 7, name: "Asif Mohammed", avatar: "AM", school: "Kerala State IT Academy, Trivandrum", score: 2240, quizzesTaken: 22, movement: "down", movementCount: 2 },
];

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("All-Time");

  const filteredUsers = mockLeaderboard.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top3 = mockLeaderboard.slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#F2F7F3]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.14)] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5] mb-1">
            <span className="w-1.5 h-1.5 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
            <span>GLOBAL STANDINGS // ACADEMIC TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
            <Trophy className="w-6 h-6 text-[#65F59A] mr-2" /> Global Academic Leaderboard
          </h1>
          <p className="text-xs font-mono text-[#A0AEA5] mt-1">
            Verified rankings across institutional assessments, live decathlons, and competitive tournaments.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="h-9 text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px]"
            options={[
              { value: "All-Time", label: "All-Time Roster" },
              { value: "This Month", label: "This Month" },
              { value: "This Week", label: "This Week" },
            ]}
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-end max-w-4xl mx-auto">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0C1210] p-6 rounded-[8px] border border-[rgba(56,217,176,0.3)] shadow-xl flex flex-col items-center text-center relative order-2 md:order-1"
        >
          <span className="w-8 h-8 rounded-full bg-[#17251E] text-[#38D9B0] border border-[rgba(56,217,176,0.4)] font-mono font-bold text-xs flex items-center justify-center mb-3">
            2ND
          </span>
          <Avatar className="h-16 w-16 mb-3 border-2 border-[rgba(56,217,176,0.4)]">
            <AvatarFallback className="bg-[#17251E] text-[#38D9B0] font-mono font-bold">{top3[1].avatar}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-[#F2F7F3] font-display text-sm">{top3[1].name}</h3>
          <p className="text-[11px] text-[#A0AEA5] mb-3 font-mono">{top3[1].school}</p>
          <Badge className="bg-[#17251E] text-[#38D9B0] border border-[rgba(56,217,176,0.3)] text-xs px-3 py-1 font-mono font-bold">
            {top3[1].score} pts
          </Badge>
        </motion.div>

        {/* 1st Place Gold/Emerald Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#111B17] p-8 rounded-[8px] border-2 border-[#65F59A]/60 shadow-[0_0_36px_rgba(101,245,154,0.2)] flex flex-col items-center text-center relative order-1 md:order-2 scale-105"
        >
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.18)] text-[#65F59A] border border-[rgba(101,245,154,0.4)] font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>CHAMPION</span>
          </div>
          <Avatar className="h-20 w-20 mb-3 border-2 border-[#65F59A] shadow-[0_0_15px_rgba(101,245,154,0.3)]">
            <AvatarFallback className="bg-[#17251E] text-[#65F59A] font-mono font-extrabold text-lg">{top3[0].avatar}</AvatarFallback>
          </Avatar>
          <h3 className="text-base font-extrabold text-[#F2F7F3] font-display">{top3[0].name}</h3>
          <p className="text-xs text-[#38D9B0] font-mono font-semibold mb-3">{top3[0].school}</p>
          <Badge className="bg-[#65F59A] text-[#070B0A] font-mono font-black text-sm px-4 py-1 shadow-[0_0_12px_rgba(101,245,154,0.3)]">
            {top3[0].score} pts
          </Badge>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0C1210] p-6 rounded-[8px] border border-[rgba(160,190,170,0.16)] shadow-xl flex flex-col items-center text-center relative order-3"
        >
          <span className="w-8 h-8 rounded-full bg-[#17251E] text-[#A0AEA5] border border-[rgba(160,190,170,0.2)] font-mono font-bold text-xs flex items-center justify-center mb-3">
            3RD
          </span>
          <Avatar className="h-16 w-16 mb-3 border-2 border-[rgba(160,190,170,0.2)]">
            <AvatarFallback className="bg-[#17251E] text-[#A0AEA5] font-mono font-bold">{top3[2].avatar}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-[#F2F7F3] font-display text-sm">{top3[2].name}</h3>
          <p className="text-[11px] text-[#A0AEA5] mb-3 font-mono">{top3[2].school}</p>
          <Badge className="bg-[#17251E] text-[#A0AEA5] border border-[rgba(160,190,170,0.18)] text-xs px-3 py-1 font-mono font-bold">
            {top3[2].score} pts
          </Badge>
        </motion.div>
      </div>

      {/* Search & Leaderboard Table */}
      <div className="bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs overflow-hidden space-y-4 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#69786F]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student or school..."
            className="pl-9 h-9 bg-[#111B17] text-xs font-mono rounded-[4px] border-[rgba(160,190,170,0.2)] text-[#F2F7F3] focus:border-[#65F59A]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A0AEA5]">
            <thead className="bg-[#111B17] text-[10px] font-mono uppercase font-bold tracking-wider text-[#69786F] border-b border-[rgba(160,190,170,0.12)]">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">School / Institute</th>
                <th className="py-3 px-4">Quizzes Taken</th>
                <th className="py-3 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(160,190,170,0.08)]">
              {filteredUsers.map((user) => (
                <tr key={user.rank} className="hover:bg-[#111B17]/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#F2F7F3] flex items-center space-x-2">
                    <span className="w-6 text-xs">{user.rank}</span>
                    {user.movement === "up" && (
                      <span className="inline-flex items-center text-[10px] font-mono font-bold text-[#65F59A]">
                        <ArrowUp className="w-3 h-3 mr-0.5" />+{user.movementCount}
                      </span>
                    )}
                    {user.movement === "down" && (
                      <span className="inline-flex items-center text-[10px] font-mono font-bold text-[#F87171]">
                        <ArrowDown className="w-3 h-3 mr-0.5" />-{user.movementCount}
                      </span>
                    )}
                    {user.movement === "same" && <Minus className="w-3 h-3 text-[#69786F]" />}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.3)] font-mono font-bold text-xs">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-[#F2F7F3] text-xs">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-[#A0AEA5]">{user.school}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#F2F7F3]">{user.quizzesTaken}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#65F59A] text-xs">
                    {user.score} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
