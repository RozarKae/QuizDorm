"use client";

import React, { useState } from "react";
import { DiscussionTopic, QuestionBoardItem, LivePoll, BrainstormItem } from "@/lib/types/classroom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, MessageSquare, HelpCircle, BarChart3, StickyNote, ThumbsUp, 
  CheckCircle2, Plus, Sparkles, Pin, Tag, Send
} from "lucide-react";
import { toast } from "sonner";

const mockDiscussions: DiscussionTopic[] = [
  {
    id: "disc-1",
    title: "Interpretation of Wave Function Collapse",
    content: "Is Copenhagen interpretation superior to Many-Worlds when modeling quantum decoherence in thermal environments?",
    authorName: "Marcus Chen",
    createdAt: "2 hours ago",
    repliesCount: 14,
    isPinned: true,
    tags: ["Quantum", "Interpretation", "Physics"],
  },
  {
    id: "disc-2",
    title: "Recommended Linear Algebra References",
    content: "Sharing Gilbert Strang's OCW lecture series notes for matrix diagonalizations.",
    authorName: "Sophia Rodriguez",
    createdAt: "1 day ago",
    repliesCount: 8,
    isPinned: false,
    tags: ["Math", "Resources"],
  },
];

const mockQuestions: QuestionBoardItem[] = [
  {
    id: "q-1",
    question: "Why does Pauli X matrix act as a bit-flip operator in quantum computing?",
    authorName: "Liam Gallagher",
    upvotes: 19,
    isAnswered: true,
    answer: "Because X|0⟩ = |1⟩ and X|1⟩ = |0⟩, swapping the basis states of a single qubit.",
    askedAt: "3 hours ago",
  },
  {
    id: "q-2",
    question: "How do we compute the normalization constant for a 3D Gaussian wave packet?",
    authorName: "Amara Johnson",
    upvotes: 12,
    isAnswered: false,
    askedAt: "5 hours ago",
  },
];

const mockPoll: LivePoll = {
  id: "poll-1",
  question: "Which topic should we cover in Friday's live problem workshop?",
  options: [
    { id: "opt-1", text: "Quantum Harmonic Oscillator ladder operators", votes: 24 },
    { id: "opt-2", text: "Perturbation Theory & Zeeman Effect", votes: 14 },
    { id: "opt-3", text: "Variational Principle & Helium Atom", votes: 7 },
  ],
  totalVotes: 45,
  isActive: true,
  createdAt: "Today at 10:00 AM",
};

const mockBrainstorm: BrainstormItem[] = [
  { id: "bs-1", text: "Use Qiskit to simulate Bell inequality violation!", authorName: "Marcus", color: "#fef08a", x: 20, y: 20 },
  { id: "bs-2", text: "Build 3D Bloch Sphere visualization tool in Three.js", authorName: "Sophia", color: "#bbf7d0", x: 220, y: 40 },
  { id: "bs-3", text: "Compare classical Monte Carlo vs Quantum Monte Carlo", authorName: "Dr. Vance", color: "#bfdbfe", x: 420, y: 20 },
];

export function ClassroomCollaborationHub() {
  const [activeTab, setActiveTab] = useState<"discussions" | "qa" | "polls" | "brainstorm">("discussions");
  const [discussions, setDiscussions] = useState<DiscussionTopic[]>(mockDiscussions);
  const [questions, setQuestions] = useState<QuestionBoardItem[]>(mockQuestions);
  const [poll, setPoll] = useState<LivePoll>(mockPoll);
  const [brainstorms, setBrainstorms] = useState<BrainstormItem[]>(mockBrainstorm);

  // Inputs
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newQText, setNewQText] = useState("");
  const [newStickyText, setNewStickyText] = useState("");

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;
    const item: DiscussionTopic = {
      id: `disc-${Date.now()}`,
      title: newTopicTitle,
      content: newTopicContent,
      authorName: "You (Student)",
      createdAt: "Just now",
      repliesCount: 0,
      isPinned: false,
      tags: ["Discussion"],
    };
    setDiscussions([item, ...discussions]);
    setNewTopicTitle("");
    setNewTopicContent("");
    toast.success("Discussion topic posted!");
  };

  const handleUpvoteQ = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
    toast.success("Question upvoted!");
  };

  const handleVotePoll = (optId: string) => {
    const updatedOptions = poll.options.map((opt) =>
      opt.id === optId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setPoll({
      ...poll,
      options: updatedOptions,
      totalVotes: poll.totalVotes + 1,
    });
    toast.success("Your vote was registered in the live poll!");
  };

  const handleAddBrainstorm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyText.trim()) return;
    const colors = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fbcfe8"];
    const item: BrainstormItem = {
      id: `bs-${Date.now()}`,
      text: newStickyText,
      authorName: "You",
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 300,
      y: Math.random() * 150,
    };
    setBrainstorms([...brainstorms, item]);
    setNewStickyText("");
    toast.success("Idea sticky note added to collaborative canvas!");
  };

  return (
    <div className="space-y-6">
      {/* Collaboration Sub-Nav Bar */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("discussions")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === "discussions"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Discussion Forum
        </button>

        <button
          onClick={() => setActiveTab("qa")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === "qa"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Question Board
        </button>

        <button
          onClick={() => setActiveTab("polls")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === "polls"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Live Polls
        </button>

        <button
          onClick={() => setActiveTab("brainstorm")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === "brainstorm"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <StickyNote className="w-4 h-4" /> Brainstorm Canvas
        </button>
      </div>

      {/* Tab Content: Discussion Forums */}
      {activeTab === "discussions" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {discussions.map((d) => (
              <div
                key={d.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {d.isPinned && <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{d.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400">{d.createdAt}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{d.content}</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    {d.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <span>By {d.authorName}</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{d.repliesCount} Replies</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Discussion Sidebar Form */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> Start Discussion Topic
            </h3>
            <form onSubmit={handleCreateTopic} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Topic Title</label>
                <Input
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="e.g. Question on Matrix Mechanics"
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Elaborate your post</label>
                <textarea
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  rows={4}
                  placeholder="Share ideas or questions with class..."
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-xs"
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 text-white text-xs font-semibold rounded-xl">
                Publish Post
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Content: Q&A Question Board */}
      {activeTab === "qa" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <Input
              value={newQText}
              onChange={(e) => setNewQText(e.target.value)}
              placeholder="Ask a question to the instructor and peer community..."
              className="rounded-xl text-xs"
            />
            <Button
              onClick={() => {
                if (!newQText.trim()) return;
                setQuestions([{ id: `q-${Date.now()}`, question: newQText, authorName: "You", upvotes: 1, isAnswered: false, askedAt: "Just now" }, ...questions]);
                setNewQText("");
                toast.success("Question submitted to classroom board!");
              }}
              className="bg-indigo-600 text-white text-xs rounded-xl font-semibold shrink-0"
            >
              Ask Question
            </Button>
          </div>

          <div className="space-y-3">
            {questions.map((q) => (
              <div key={q.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <button
                  onClick={() => handleUpvoteQ(q.id)}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 shrink-0"
                >
                  <ThumbsUp className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-slate-900 dark:text-white text-xs mt-1">{q.upvotes}</span>
                </button>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{q.question}</h4>
                    {q.isAnswered && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Answered
                      </span>
                    )}
                  </div>

                  {q.answer && (
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-950 dark:text-indigo-200 space-y-1">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Accepted Instructor Answer:</span>
                      <p>{q.answer}</p>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400">Asked by {q.authorName} • {q.askedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Live Polls */}
      {activeTab === "polls" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" /> Active Live Poll
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px] animate-pulse">
              LIVE
            </span>
          </div>

          <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{poll.question}</p>

          <div className="space-y-4">
            {poll.options.map((opt) => {
              const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
              return (
                <div key={opt.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{opt.text}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{pct}% ({opt.votes} votes)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${pct}%` }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 rounded-full"
                    />
                  </div>
                  <Button
                    onClick={() => handleVotePoll(opt.id)}
                    size="sm"
                    variant="outline"
                    className="text-[11px] rounded-lg mt-1 h-7 border-slate-200 dark:border-slate-700"
                  >
                    Vote for this option
                  </Button>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-400 text-center pt-2">Total responses: {poll.totalVotes} student votes</p>
        </div>
      )}

      {/* Tab Content: Brainstorm Sticky Board */}
      {activeTab === "brainstorm" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <Input
              value={newStickyText}
              onChange={(e) => setNewStickyText(e.target.value)}
              placeholder="Type an idea or hypothesis for the collaborative board..."
              className="rounded-xl text-xs"
            />
            <Button onClick={handleAddBrainstorm} className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl">
              Post Sticky Idea
            </Button>
          </div>

          <div className="min-h-[360px] bg-slate-950 rounded-2xl border border-slate-800 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {brainstorms.map((item) => (
              <div
                key={item.id}
                style={{ backgroundColor: item.color }}
                className="p-4 rounded-2xl shadow-xl text-slate-900 space-y-2 flex flex-col justify-between"
              >
                <p className="font-semibold text-xs leading-relaxed">{item.text}</p>
                <span className="text-[10px] text-slate-700 text-right font-bold">— {item.authorName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
