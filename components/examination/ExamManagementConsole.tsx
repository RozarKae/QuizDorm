"use client";

import React, { useState } from "react";
import { HighStakesExam, ExamSession, ExamCategory } from "@/lib/types/examination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShieldCheck, Plus, Search, Filter, Calendar, Users, Clock, 
  Lock, Copy, Archive, CheckCircle2, AlertCircle, Award, Layers, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockExams: HighStakesExam[] = [
  {
    id: "exam-101",
    code: "NAT-RECRUIT-2026",
    title: "National Engineering & Tech Recruitment Examination 2026",
    category: "Government Recruitment",
    authorityName: "National Examination Authority (NEA)",
    totalCandidates: 250000,
    totalSessions: 8,
    durationMinutes: 180,
    passingPercentage: 60,
    startDate: "Mar 10, 2026",
    endDate: "Mar 12, 2026",
    status: "In Progress",
    isEncrypted: true,
    proctoringLevel: "Strict AI + Human",
    createdAt: "Jan 10, 2026",
  },
  {
    id: "exam-102",
    code: "UNIV-SEM-PHY501",
    title: "University End-Semester Physics & Quantum Mechanics Final",
    category: "University Semester",
    authorityName: "Central University Academic Board",
    totalCandidates: 4500,
    totalSessions: 2,
    durationMinutes: 120,
    passingPercentage: 50,
    startDate: "Mar 15, 2026",
    endDate: "Mar 15, 2026",
    status: "Scheduled",
    isEncrypted: true,
    proctoringLevel: "Strict AI + Human",
    createdAt: "Feb 01, 2026",
  },
  {
    id: "exam-103",
    code: "BOARD-SENIOR-MATH",
    title: "Senior Secondary Board Examination — Higher Mathematics",
    category: "K-12 Board Exam",
    authorityName: "State Board of Secondary Education",
    totalCandidates: 120000,
    totalSessions: 4,
    durationMinutes: 180,
    passingPercentage: 35,
    startDate: "Apr 02, 2026",
    endDate: "Apr 03, 2026",
    status: "Scheduled",
    isEncrypted: true,
    proctoringLevel: "AI Automated",
    createdAt: "Feb 10, 2026",
  },
  {
    id: "exam-104",
    code: "CERT-AI-EXPERT",
    title: "Global Enterprise AI & Cloud Architect Certification",
    category: "Professional Certification",
    authorityName: "QuizDorm International Standards Institute",
    totalCandidates: 1800,
    totalSessions: 1,
    durationMinutes: 90,
    passingPercentage: 75,
    startDate: "Feb 20, 2026",
    endDate: "Feb 20, 2026",
    status: "Results Published",
    isEncrypted: true,
    proctoringLevel: "Strict AI + Human",
    createdAt: "Jan 05, 2026",
  },
];

export function ExamManagementConsole() {
  const [exams, setExams] = useState<HighStakesExam[]>(mockExams);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Exam Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<ExamCategory>("Government Recruitment");
  const [newAuthority, setNewAuthority] = useState("National Testing Agency");
  const [newCandidates, setNewCandidates] = useState(10000);
  const [newDuration, setNewDuration] = useState(180);

  const handleDuplicateExam = (exam: HighStakesExam) => {
    const duplicated: HighStakesExam = {
      ...exam,
      id: `exam-${Date.now()}`,
      code: `${exam.code}-COPY`,
      title: `${exam.title} (Copy)`,
      status: "Scheduled",
      createdAt: "Just now",
    };
    setExams([duplicated, ...exams]);
    toast.success(`Duplicated examination configuration: "${duplicated.title}"`);
  };

  const handleArchiveExam = (id: string) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Archived" as const } : e))
    );
    toast.info("Examination moved to vault archive.");
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newExam: HighStakesExam = {
      id: `exam-${Date.now()}`,
      code: `EXAM-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      category: newCategory,
      authorityName: newAuthority,
      totalCandidates: newCandidates,
      totalSessions: 2,
      durationMinutes: newDuration,
      passingPercentage: 50,
      startDate: "2026-04-01",
      endDate: "2026-04-02",
      status: "Scheduled",
      isEncrypted: true,
      proctoringLevel: "Strict AI + Human",
      createdAt: "Just now",
    };
    setExams([newExam, ...exams]);
    setIsCreateModalOpen(false);
    setNewTitle("");
    toast.success(`High-Stakes Examination "${newExam.title}" scheduled successfully!`);
  };

  const filteredExams = exams.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || e.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <ShieldCheck className="w-4 h-4 text-rose-400" /> Enterprise High-Stakes Examination Engine
            </div>
            <h1 className="text-3xl font-black tracking-tight">Examination Management Authority</h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl">
              Conduct national-scale entrance tests, university finals, government recruitment exams, and certification programs with encrypted test papers and AI proctoring controls.
            </p>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/30"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Create Examination
          </Button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exam code, title, or authority..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "Government Recruitment", "University Semester", "K-12 Board Exam", "Professional Certification"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Examination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {exam.code}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {exam.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{exam.title}</h3>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  exam.status === "In Progress"
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 animate-pulse border border-rose-500/30"
                    : exam.status === "Scheduled"
                    ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                    : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                }`}
              >
                {exam.status}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">Authority: {exam.authorityName}</p>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center text-xs">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Candidates</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{exam.totalCandidates.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Duration</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{exam.durationMinutes} mins</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Sessions</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{exam.totalSessions} Slots</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-500" /> AES-256 Paper Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> {exam.proctoringLevel}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => handleDuplicateExam(exam)}
                  variant="ghost"
                  size="sm"
                  className="text-xs rounded-xl text-slate-500"
                  title="Duplicate configuration"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Duplicate
                </Button>
                <Button
                  onClick={() => handleArchiveExam(exam.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs rounded-xl text-slate-500"
                  title="Archive exam"
                >
                  <Archive className="w-3.5 h-3.5 mr-1" /> Archive
                </Button>
              </div>

              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
                Control Center
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create High-Stakes Exam Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" /> Create High-Stakes Examination
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Examination Title *</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. National Medical College Entrance Test 2026"
                  className="rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ExamCategory)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="Government Recruitment">Government Recruitment</option>
                  <option value="University Semester">University Semester</option>
                  <option value="K-12 Board Exam">K-12 Board Exam</option>
                  <option value="Professional Certification">Professional Certification</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Examining Board / Authority</label>
                <Input
                  value={newAuthority}
                  onChange={(e) => setNewAuthority(e.target.value)}
                  placeholder="e.g. National Testing Agency"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Candidate Quota</label>
                  <Input
                    type="number"
                    value={newCandidates}
                    onChange={(e) => setNewCandidates(Number(e.target.value))}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Duration (Mins)</label>
                  <Input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                  Publish Examination
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
