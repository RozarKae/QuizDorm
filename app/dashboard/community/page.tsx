"use client";

import React, { useState } from "react";
import { DiscussionForumEngine } from "@/lib/community/discussionEngine";
import { CommunityPost, DiscussionTag } from "@/lib/types/community";
import { CommunityFeedCard } from "@/components/community/CommunityFeedCard";
import { ReputationBadgeCard } from "@/components/community/ReputationBadgeCard";
import { CreateDiscussionModal } from "@/components/community/CreateDiscussionModal";

import { Users, Plus, Search, MessageSquare, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function CommunityHubPage() {
  const [selectedTag, setSelectedTag] = useState<DiscussionTag | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const posts = DiscussionForumEngine.getPosts(selectedTag === "all" ? undefined : selectedTag);
  const filtered = posts.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-amber-300">
                <Users className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.8 Collaborative Educational Social Network
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              QuizDorm Educational Community & Q&A Discussion Forum
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/80 max-w-2xl">
              Ask academic questions, share study notes, get verified answers, earn community karma points, and connect with global learners.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/dashboard/community/clubs">
              <Button variant="outline" className="text-xs rounded-2xl text-white border-white/20">
                Browse Quiz Clubs & Mentors
              </Button>
            </Link>
            <Button onClick={() => setModalOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-amber-500/30">
              <Plus className="w-4 h-4 mr-1.5" /> Start Q&A Discussion
            </Button>
          </div>
        </div>
      </div>

      {/* Reputation Badge Card */}
      <ReputationBadgeCard />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-950 p-4 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, calculus notes..."
            className="pl-9 text-xs rounded-xl"
          />
        </div>

        <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl text-[11px] font-bold w-full sm:w-auto">
          {(["all", "question_answer", "study_notes", "competition_prep"] as (DiscussionTag | "all")[]).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1 rounded-xl capitalize transition-all ${
                selectedTag === t ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Social Activity Feed Grid */}
      <div className="space-y-4">
        {filtered.map((p) => (
          <CommunityFeedCard key={p.id} post={p} />
        ))}
      </div>

      {/* Create Discussion Modal */}
      <CreateDiscussionModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
