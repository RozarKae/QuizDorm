"use client";

import React, { useState } from "react";
import { StudentInformationSystemHub } from "@/components/administration/StudentInformationSystemHub";
import { AdmissionManagementPortal } from "@/components/administration/AdmissionManagementPortal";
import { AcademicRecordsTranscripts } from "@/components/administration/AcademicRecordsTranscripts";
import { TimetableSchedulingStudio } from "@/components/administration/TimetableSchedulingStudio";
import { FeeFinancialManagementHub } from "@/components/administration/FeeFinancialManagementHub";
import { FacultyStaffManagementConsole } from "@/components/administration/FacultyStaffManagementConsole";
import { CertificateDocumentManagement } from "@/components/administration/CertificateDocumentManagement";
import { ParentGuardianPortalConsole } from "@/components/administration/ParentGuardianPortalConsole";
import { InstitutionalAdministrationConsole } from "@/components/administration/InstitutionalAdministrationConsole";
import { GraduationAlumniManagement } from "@/components/administration/GraduationAlumniManagement";

import { 
  Building2, Users, FileText, GraduationCap, Calendar, 
  CreditCard, Briefcase, Heart, Trophy, Sparkles
} from "lucide-react";

export type AdminModuleTab = 
  | "sis" 
  | "admissions" 
  | "transcripts" 
  | "timetables" 
  | "finance" 
  | "faculty" 
  | "certificates" 
  | "parent-portal" 
  | "institutional" 
  | "alumni";

export default function AcademicAdministrationSuitePage() {
  const [activeTab, setActiveTab] = useState<AdminModuleTab>("sis");

  const tabs: { id: AdminModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "sis", label: "Student SIS Roster", icon: Users, badge: "CORE" },
    { id: "admissions", label: "Admissions Portal", icon: FileText },
    { id: "transcripts", label: "Academic Records", icon: GraduationCap },
    { id: "timetables", label: "Timetables & AI Scheduling", icon: Calendar },
    { id: "finance", label: "Fee & Finances", icon: CreditCard },
    { id: "faculty", label: "Faculty & Staff HR", icon: Briefcase },
    { id: "certificates", label: "Digital Certificates", icon: FileText },
    { id: "parent-portal", label: "Parent Portal", icon: Heart },
    { id: "institutional", label: "Campus Governance", icon: Building2 },
    { id: "alumni", label: "Graduation & Alumni", icon: Trophy },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-500/30">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Academic Administration Suite (Education ERP) <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ml-2">PHASE 4.5</span>
              </h1>
              <p className="text-xs text-slate-500">
                Complete educational lifecycle ERP managing student SIS rosters, admissions, academic transcripts, conflict-free AI timetables, fee collection, faculty HR, certificates, parent portals, campus governance, and alumni networks.
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
                  ? "bg-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-purple-500 text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module Workspace Content */}
      <div className="pt-2">
        {activeTab === "sis" && <StudentInformationSystemHub />}
        {activeTab === "admissions" && <AdmissionManagementPortal />}
        {activeTab === "transcripts" && <AcademicRecordsTranscripts />}
        {activeTab === "timetables" && <TimetableSchedulingStudio />}
        {activeTab === "finance" && <FeeFinancialManagementHub />}
        {activeTab === "faculty" && <FacultyStaffManagementConsole />}
        {activeTab === "certificates" && <CertificateDocumentManagement />}
        {activeTab === "parent-portal" && <ParentGuardianPortalConsole />}
        {activeTab === "institutional" && <InstitutionalAdministrationConsole />}
        {activeTab === "alumni" && <GraduationAlumniManagement />}
      </div>
    </div>
  );
}
