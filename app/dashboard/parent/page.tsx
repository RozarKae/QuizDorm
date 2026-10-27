"use client";

import { AttendanceService } from "@/lib/parent/attendanceService";
import { ParentManager } from "@/lib/parent/parentManager";
import { ParentGuardian } from "@/lib/types/parent";
import { useState } from "react";

import { DirectChatWindow } from "@/components/communication/DirectChatWindow";
import { AttendanceTrackerCard } from "@/components/parent/AttendanceTrackerCard";
import { ChildSwitcherCard } from "@/components/parent/ChildSwitcherCard";
import { ParentApprovalCard } from "@/components/parent/ParentApprovalCard";

import { Button } from "@/components/ui/button";
import { HeartHandshake,MessageSquare,Sparkles } from "lucide-react";
import Link from "next/link";

export default function ParentPortalPage() {
  const [parent] = useState<ParentGuardian>(ParentManager.getParentProfile());
  const [activeChildId, setActiveChildId] = useState(ParentManager.getActiveChildId());

  const activeChild = parent.linkedChildren.find((c) => c.id === activeChildId) || parent.linkedChildren[0];
  const attendanceRecords = AttendanceService.getAttendance(activeChild.id);

  const handleSelectChild = (id: string) => {
    setActiveChildId(id);
    ParentManager.setActiveChildId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-pink-300">
                <HeartHandshake className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.1 Family & Guardian Ecosystem
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Parent & Family Learning Portal
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Welcome back, {parent.name}! Monitor academic progress, track daily attendance, approve consent forms, and view AI-powered learning insights for your children.
            </p>
          </div>

          <Link href="/dashboard/parent/insights">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-purple-600/30">
              <Sparkles className="w-4 h-4 mr-1.5" /> View AI Parent Insights
            </Button>
          </Link>
        </div>
      </div>

      {/* Child Switcher Header Card */}
      <ChildSwitcherCard
        childrenList={parent.linkedChildren}
        activeChildId={activeChild.id}
        onSelectChild={handleSelectChild}
      />

      {/* Main Grid: Attendance & Consent Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <AttendanceTrackerCard records={attendanceRecords} />
        </div>
        <div className="lg:col-span-6">
          <ParentApprovalCard studentId={activeChild.id} />
        </div>
      </div>

      {/* Teacher Direct Messaging Window */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
          <MessageSquare className="w-4 h-4 text-indigo-600 mr-1.5" /> Direct Communication with {activeChild.name}&apos;s Teachers
        </h3>
        <DirectChatWindow />
      </div>
    </div>
  );
}
