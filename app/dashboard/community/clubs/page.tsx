"use client";

import React, { useState } from "react";
import { QuizClubManager } from "@/lib/community/clubManager";
import { MentorshipEngine } from "@/lib/community/mentorshipEngine";
import { QuizClubCard } from "@/components/community/QuizClubCard";
import { MentorBookingCard } from "@/components/community/MentorBookingCard";

import { Users, Shield, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuizClubsAndMentorsPage() {
  const clubs = QuizClubManager.getClubs();
  const mentors = MentorshipEngine.getMentors();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
              <Users className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Quiz Clubs & Mentorship Platform
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Quiz Clubs, Study Groups & 1-on-1 Mentorship Office Hours
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Join verified school and Olympiad clubs, collaborate with study group peers, and schedule office hours with expert academic mentors.
          </p>
        </div>
      </div>

      {/* Quiz Clubs Section */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Users className="w-5 h-5 text-indigo-600 mr-2" /> Featured School & Olympiad Quiz Clubs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((c) => (
            <QuizClubCard key={c.id} club={c} />
          ))}
        </div>
      </div>

      {/* Mentorship Platform Section */}
      <div className="space-y-3 pt-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Calendar className="w-5 h-5 text-indigo-600 mr-2" /> Certified Mentors & Office Hours Scheduling
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mentors.map((m) => (
            <MentorBookingCard key={m.id} mentor={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
