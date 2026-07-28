"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, BookOpen, Sparkles, Megaphone, CheckCircle2, 
  Search, Upload, ArrowUpRight, Award, Layers
} from "lucide-react";
import { toast } from "sonner";

const mockStudentsProgress = [
  { id: "s1", name: "Alexander Wright", course: "CS-401 Full-Stack AI", progressPercent: 88, lastActive: "10 mins ago" },
  { id: "s2", name: "Beatriz Morales", course: "PHY-302 Quantum Physics", progressPercent: 65, lastActive: "1 hour ago" },
  { id: "s3", name: "Charles Darwin Jr.", course: "CS-401 Full-Stack AI", progressPercent: 42, lastActive: "3 hours ago" },
];

export function InstructorWorkspaceConsole() {
  const [students, setStudents] = useState(mockStudentsProgress);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    toast.success("Live Announcement broadcasted to all enrolled students!");
    setBroadcastMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" /> Instructor Command Center
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" /> Instructor Workspace & Publishing
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor student cohort progression, publish course updates, broadcast announcements, and review AI teaching performance insights.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Course Content Studio...")} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Upload className="w-4 h-4 mr-1.5" /> Publish New Module
        </Button>
      </div>

      {/* Broadcast Announcement Bar */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white shadow-xl space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <Megaphone className="w-4 h-4" /> Live Cohort Announcement Broadcast
        </h3>
        <form onSubmit={handleBroadcast} className="flex gap-2 text-xs">
          <Input
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="Broadcast notice to all enrolled students..."
            className="bg-slate-800 border-slate-700 text-white rounded-xl"
          />
          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shrink-0">
            Broadcast
          </Button>
        </form>
      </div>

      {/* Cohort Progress Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Enrolled Student Cohort Progress</h3>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="p-3">Student Name</th>
              <th className="p-3">Active Course</th>
              <th className="p-3">Progress</th>
              <th className="p-3 text-right">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((st) => (
              <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-bold text-slate-900 dark:text-white">{st.name}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{st.course}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div style={{ width: `${st.progressPercent}%` }} className="h-full bg-indigo-600 rounded-full" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-[11px]">{st.progressPercent}%</span>
                  </div>
                </td>
                <td className="p-3 text-right text-slate-400">{st.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
