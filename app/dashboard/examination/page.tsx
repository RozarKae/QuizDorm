"use client";

import React, { useState } from "react";
import { ExamManagementConsole } from "@/components/examination/ExamManagementConsole";
import { SecureExamEngineSimulator } from "@/components/examination/SecureExamEngineSimulator";
import { AIProctoringDashboard } from "@/components/examination/AIProctoringDashboard";
import { CandidateAdmitCardManager } from "@/components/examination/CandidateAdmitCardManager";
import { QuestionPaperSecurityHub } from "@/components/examination/QuestionPaperSecurityHub";
import { EvaluationResultProcessor } from "@/components/examination/EvaluationResultProcessor";
import { CertificateVerificationPortal } from "@/components/examination/CertificateVerificationPortal";
import { ExamAnalyticsConsole } from "@/components/examination/ExamAnalyticsConsole";
import { ComplianceAuditLogger } from "@/components/examination/ComplianceAuditLogger";
import { NationalInfrastructureMonitor } from "@/components/examination/NationalInfrastructureMonitor";

import { 
  ShieldCheck, Lock, Eye, UserCheck, Key, Award, 
  QrCode, BarChart3, FileText, Server, GraduationCap
} from "lucide-react";

export type ExaminationModuleTab = 
  | "management" 
  | "secure-engine" 
  | "ai-proctoring" 
  | "candidates" 
  | "paper-security" 
  | "evaluation" 
  | "certificates" 
  | "analytics" 
  | "audit" 
  | "infrastructure";

export default function ExaminationAuthorityPlatformPage() {
  const [activeTab, setActiveTab] = useState<ExaminationModuleTab>("management");

  const tabs: { id: ExaminationModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "management", label: "Exam Management", icon: ShieldCheck },
    { id: "secure-engine", label: "Secure Test Engine", icon: Lock, badge: "LOCK" },
    { id: "ai-proctoring", label: "AI Proctoring", icon: Eye, badge: "AI" },
    { id: "candidates", label: "Candidates & Admit Cards", icon: UserCheck },
    { id: "paper-security", label: "Paper Vault Security", icon: Key, badge: "AES" },
    { id: "evaluation", label: "Evaluation & Results", icon: Award },
    { id: "certificates", label: "Certificates & QR", icon: QrCode },
    { id: "analytics", label: "Exam Analytics", icon: BarChart3 },
    { id: "audit", label: "Compliance & Audit", icon: FileText },
    { id: "infrastructure", label: "National Scale Infra", icon: Server, badge: "1M+" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Examination Authority Platform <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ml-2">PHASE 4.2</span>
              </h1>
              <p className="text-xs text-slate-500">
                Enterprise-grade examination platform for high-stakes school, university, recruitment, and certification testing with AI proctoring, locked test engine, paper encryption, and multi-region infrastructure.
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
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    tab.badge === "LOCK"
                      ? "bg-emerald-500 text-white"
                      : tab.badge === "AI"
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-indigo-500 text-white"
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
        {activeTab === "management" && <ExamManagementConsole />}
        {activeTab === "secure-engine" && <SecureExamEngineSimulator />}
        {activeTab === "ai-proctoring" && <AIProctoringDashboard />}
        {activeTab === "candidates" && <CandidateAdmitCardManager />}
        {activeTab === "paper-security" && <QuestionPaperSecurityHub />}
        {activeTab === "evaluation" && <EvaluationResultProcessor />}
        {activeTab === "certificates" && <CertificateVerificationPortal />}
        {activeTab === "analytics" && <ExamAnalyticsConsole />}
        {activeTab === "audit" && <ComplianceAuditLogger />}
        {activeTab === "infrastructure" && <NationalInfrastructureMonitor />}
      </div>
    </div>
  );
}
