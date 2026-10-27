"use client";

import { AIClassroomAssistantPanel } from "@/components/classroom/AIClassroomAssistantPanel";
import { AssignmentHomeworkCenter } from "@/components/classroom/AssignmentHomeworkCenter";
import { AttendanceAutomationSystem } from "@/components/classroom/AttendanceAutomationSystem";
import { ClassroomAnalyticsDashboard } from "@/components/classroom/ClassroomAnalyticsDashboard";
import { ClassroomCollaborationHub } from "@/components/classroom/ClassroomCollaborationHub";
import { ClassroomManagementHub } from "@/components/classroom/ClassroomManagementHub";
import { ClassroomResourceLibrary } from "@/components/classroom/ClassroomResourceLibrary";
import { HybridLearningConsole } from "@/components/classroom/HybridLearningConsole";
import { LiveTeachingStudio } from "@/components/classroom/LiveTeachingStudio";
import { SmartWhiteboardStudio } from "@/components/classroom/SmartWhiteboardStudio";
import {
BarChart3,Cast,
FileText,
Folder,
GraduationCap,
MessageSquare,
PenTool,
School,
Sparkles,
UserCheck,
Video
} from "lucide-react";
import React,{ useState } from "react";

export type DigitalClassroomModuleTab = 
  | "management" 
  | "live-studio" 
  | "whiteboard" 
  | "attendance" 
  | "assignments" 
  | "collaboration" 
  | "resources" 
  | "ai-assistant" 
  | "analytics" 
  | "hybrid";

export default function DigitalClassroomSuitePage() {
  const [activeTab, setActiveTab] = useState<DigitalClassroomModuleTab>("management");

  const tabs: { id: DigitalClassroomModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "management", label: "Virtual Classrooms", icon: School },
    { id: "live-studio", label: "Live Teaching Studio", icon: Video, badge: "LIVE" },
    { id: "whiteboard", label: "Smart Whiteboard", icon: PenTool },
    { id: "attendance", label: "Attendance Automation", icon: UserCheck },
    { id: "assignments", label: "Assignments & Homework", icon: FileText },
    { id: "collaboration", label: "Collaboration Hub", icon: MessageSquare },
    { id: "resources", label: "Resource Library", icon: Folder },
    { id: "ai-assistant", label: "AI Assistant", icon: Sparkles, badge: "AI" },
    { id: "analytics", label: "Classroom Analytics", icon: BarChart3 },
    { id: "hybrid", label: "Hybrid Console", icon: Cast },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Digital Classroom Suite <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ml-2">PHASE 4.1</span>
              </h1>
              <p className="text-xs text-slate-500">
                Enterprise virtual classroom platform with live video, smart whiteboard, attendance automation, assignments, AI teaching assistant, and hybrid hardware integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    tab.badge === "LIVE"
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module Workspace Content */}
      <div className="pt-2">
        {activeTab === "management" && <ClassroomManagementHub />}
        {activeTab === "live-studio" && <LiveTeachingStudio />}
        {activeTab === "whiteboard" && <SmartWhiteboardStudio />}
        {activeTab === "attendance" && <AttendanceAutomationSystem />}
        {activeTab === "assignments" && <AssignmentHomeworkCenter />}
        {activeTab === "collaboration" && <ClassroomCollaborationHub />}
        {activeTab === "resources" && <ClassroomResourceLibrary />}
        {activeTab === "ai-assistant" && <AIClassroomAssistantPanel />}
        {activeTab === "analytics" && <ClassroomAnalyticsDashboard />}
        {activeTab === "hybrid" && <HybridLearningConsole />}
      </div>
    </div>
  );
}
