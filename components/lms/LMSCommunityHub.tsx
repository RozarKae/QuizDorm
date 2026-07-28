"use client";

import React, { useState } from "react";
import { LMSDiscussionTopic, StudyGroup } from "@/lib/types/lms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, MessageSquare, Plus, Sparkles, Pin, Search, Heart, UserPlus
} from "lucide-react";
import { toast } from "sonner";

const mockTopics: LMSDiscussionTopic[] = [
  { id: "top-1", courseId: "course-101", title: "Best resources for understanding Backpropagation calculus?", content: "Looking for intuitive visualizations on multivariable chain rule applications in PyTorch.", authorName: "Alexander Wright", postedAt: "2 hours ago", repliesCount: 12, isPinned: true },
  { id: "top-2", courseId: "course-101", title: "Qiskit vs PennyLane for Hybrid Quantum-Classical ML?", content: "Comparing quantum circuit optimization execution speeds.", authorName: "Sophia Rodriguez", postedAt: "5 hours ago", repliesCount: 6, isPinned: false },
];

const mockGroups: StudyGroup[] = [
  { id: "grp-1", name: "PyTorch Deep Learning Squad", topic: "Deep Learning Labs", memberCount: 14, maxMembers: 20, leaderName: "Marcus Chen" },
  { id: "grp-2", name: "Quantum Optics Study Group", topic: "Physics Problem Solving", memberCount: 8, maxMembers: 10, leaderName: "Dr. Vance" },
];

export function LMSCommunityHub() {
  const [topics, setTopics] = useState<LMSDiscussionTopic[]>(mockTopics);
  const [groups, setGroups] = useState<StudyGroup[]>(mockGroups);
  const [newPostTitle, setNewPostTitle] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;
    const item: LMSDiscussionTopic = {
      id: `top-${Date.now()}`,
      courseId: "course-101",
      title: newPostTitle,
      content: "Community discussion post content...",
      authorName: "You (Learner)",
      postedAt: "Just now",
      repliesCount: 0,
      isPinned: false,
    };
    setTopics([item, ...topics]);
    setNewPostTitle("");
    toast.success("Community discussion topic posted!");
  };

  const handleJoinGroup = (gName: string) => {
    toast.success(`You joined study group "${gName}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> Peer Collaboration & Study Groups
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Connect with peers, form virtual study pods, share collaborative notes, and discuss course topics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discussion Forum Feed (Cols 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
            <Input
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Ask a question or start a discussion..."
              className="rounded-xl text-xs"
            />
            <Button onClick={handleCreatePost} className="bg-indigo-600 text-white text-xs rounded-xl font-semibold shrink-0">
              Post Topic
            </Button>
          </div>

          <div className="space-y-3">
            {topics.map((t) => (
              <div key={t.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                    {t.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    {t.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">{t.postedAt}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{t.content}</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-400">
                  <span>By {t.authorName}</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t.repliesCount} Replies</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Study Groups Sidebar (Col 1) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" /> Virtual Study Groups
          </h3>

          <div className="space-y-3">
            {groups.map((g) => (
              <div key={g.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white">{g.name}</h4>
                  <span className="text-[10px] text-slate-400">{g.memberCount}/{g.maxMembers} Members</span>
                </div>
                <p className="text-slate-500 text-[11px]">Topic: {g.topic} • Leader: {g.leaderName}</p>
                <Button onClick={() => handleJoinGroup(g.name)} size="sm" variant="outline" className="w-full text-xs rounded-xl border-slate-200 dark:border-slate-700 mt-1">
                  <UserPlus className="w-3.5 h-3.5 mr-1" /> Join Study Group
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
