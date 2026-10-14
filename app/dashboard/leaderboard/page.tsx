"use client";

import React, { useState } from "react";
import { Award, Trophy, ArrowUp, ArrowDown, Minus, Search, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
  { rank: 1, name: "Elena Rostova", avatar: "ER", school: "Apex Olympiad Institute", score: 2890, quizzesTaken: 34, movement: "up", movementCount: 2 },
  { rank: 2, name: "Alex Chen", avatar: "AC", school: "Oakridge High School", score: 2750, quizzesTaken: 30, movement: "same" },
  { rank: 3, name: "David Kim", avatar: "DK", school: "Metropolitan Quiz Academy", score: 2610, quizzesTaken: 28, movement: "down", movementCount: 1 },
  { rank: 4, name: "Sophia Martinez", avatar: "SM", school: "St. Jude Science Academy", score: 2480, quizzesTaken: 26, movement: "up", movementCount: 3 },
  { rank: 5, name: "Liam O'Connor", avatar: "LO", school: "Cambridge High", score: 2390, quizzesTaken: 25, movement: "same" },
  { rank: 6, name: "Priya Sharma", avatar: "PS", school: "Delhi Public School", score: 2310, quizzesTaken: 24, movement: "up", movementCount: 1 },
  { rank: 7, name: "Marcus Vance", avatar: "MV", school: "Westlake High School", score: 2240, quizzesTaken: 22, movement: "down", movementCount: 2 },
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Award className="w-6 h-6 text-amber-500 mr-2" /> Global Leaderboard
          </h1>
          <p className="text-sm text-gray-500">Track top performing students across all quizzes and competitions</p>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="h-10 text-xs font-semibold"
            options={[
              { value: "All-Time", label: "All-Time" },
              { value: "This Month", label: "This Month" },
              { value: "This Week", label: "This Week" },
            ]}
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* 2nd Place */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center text-center relative order-2 md:order-1 mt-0 md:mt-6">
          <span className="absolute -top-4 w-9 h-9 rounded-full bg-slate-300 text-slate-800 font-extrabold flex items-center justify-center text-sm shadow">
            🥈
          </span>
          <Avatar className="h-16 w-16 mb-3 border-2 border-slate-300">
            <AvatarFallback className="bg-slate-200 text-slate-800 font-bold">{top3[1].avatar}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-gray-900 dark:text-white">{top3[1].name}</h3>
          <p className="text-xs text-gray-500 mb-3">{top3[1].school}</p>
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 text-xs px-3 py-1 font-mono">
            {top3[1].score} pts
          </Badge>
        </div>

        {/* 1st Place Gold Podium */}
        <div className="bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/30 dark:to-gray-950 p-8 rounded-3xl border-2 border-amber-300 dark:border-amber-700/60 shadow-xl flex flex-col items-center text-center relative order-1 md:order-2 scale-105">
          <span className="absolute -top-5 w-11 h-11 rounded-full bg-amber-400 text-amber-950 font-extrabold flex items-center justify-center text-lg shadow-md animate-bounce">
            🥇
          </span>
          <Avatar className="h-20 w-20 mb-3 border-4 border-amber-400 shadow-md">
            <AvatarFallback className="bg-amber-500 text-white font-bold text-lg">{top3[0].avatar}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">{top3[0].name}</h3>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-3">{top3[0].school}</p>
          <Badge className="bg-amber-400 text-amber-950 font-mono font-extrabold text-sm px-4 py-1">
            {top3[0].score} pts
          </Badge>
        </div>

        {/* 3rd Place */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center text-center relative order-3 mt-0 md:mt-6">
          <span className="absolute -top-4 w-9 h-9 rounded-full bg-amber-700 text-amber-100 font-extrabold flex items-center justify-center text-sm shadow">
            🥉
          </span>
          <Avatar className="h-16 w-16 mb-3 border-2 border-amber-700">
            <AvatarFallback className="bg-amber-800 text-white font-bold">{top3[2].avatar}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-gray-900 dark:text-white">{top3[2].name}</h3>
          <p className="text-xs text-gray-500 mb-3">{top3[2].school}</p>
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs px-3 py-1 font-mono">
            {top3[2].score} pts
          </Badge>
        </div>
      </div>

      {/* Search & Leaderboard Table */}
      <div className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student or school..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-900 text-xs uppercase font-semibold text-gray-500 border-b border-gray-100 dark:border-gray-850">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">School / Institute</th>
                <th className="py-3.5 px-4">Quizzes Taken</th>
                <th className="py-3.5 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
              {filteredUsers.map((user) => (
                <tr key={user.rank} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span className="w-6">{user.rank}</span>
                    {user.movement === "up" && (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-600">
                        <ArrowUp className="w-3 h-3 mr-0.5" />+{user.movementCount}
                      </span>
                    )}
                    {user.movement === "down" && (
                      <span className="inline-flex items-center text-[10px] font-bold text-red-500">
                        <ArrowDown className="w-3 h-3 mr-0.5" />-{user.movementCount}
                      </span>
                    )}
                    {user.movement === "same" && <Minus className="w-3 h-3 text-gray-300" />}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-gray-500">{user.school}</td>
                  <td className="py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{user.quizzesTaken}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">
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
