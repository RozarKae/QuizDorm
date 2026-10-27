"use client";

import { AIProctoringDashboard } from "@/components/examination/AIProctoringDashboard";
import { CandidateAdmitCardManager } from "@/components/examination/CandidateAdmitCardManager";
import { CertificateVerificationPortal } from "@/components/examination/CertificateVerificationPortal";
import { ComplianceAuditLogger } from "@/components/examination/ComplianceAuditLogger";
import { EvaluationResultProcessor } from "@/components/examination/EvaluationResultProcessor";
import { ExamAnalyticsConsole } from "@/components/examination/ExamAnalyticsConsole";
import { ExamManagementConsole } from "@/components/examination/ExamManagementConsole";
import { NationalInfrastructureMonitor } from "@/components/examination/NationalInfrastructureMonitor";
import { QuestionPaperSecurityHub } from "@/components/examination/QuestionPaperSecurityHub";
import { SecureExamEngineSimulator } from "@/components/examination/SecureExamEngineSimulator";
import React,{ useState } from "react";

import {
Award,
BarChart3,
Eye,
FileText,
Key,
Lock,
QrCode,
Server,
ShieldCheck,
UserCheck
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
    <div className="space-y-6 pb-12 max-w-7xl mx-auto text-[#F2F7F3]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(240, 160, 180,0.14)] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5] mb-1">
            <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-pulse shadow-[0_0_8px_#FF4D6D]" />
            <span>EXAMINATION AUTHORITY // HIGH-STAKES OS</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[4px] bg-[#2A141A] border border-[rgba(255, 77, 109,0.3)] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#FF4D6D]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#F2F7F3] flex items-center gap-2">
                Examination Authority Platform
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)]">
                  ENTERPRISE
                </span>
              </h1>
              <p className="text-xs font-mono text-[#A0AEA5] mt-0.5">
                Secure exam testing hall, protected question papers, timed student credentials & live exam monitor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="bg-[#140C0E] p-1.5 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-[3px] text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap border ${
                isActive
                  ? "bg-[#2A141A] text-[#FF4D6D] border-[rgba(255, 77, 109,0.3)] font-bold shadow-[0_0_10px_rgba(255, 77, 109,0.1)]"
                  : "border-transparent text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#1D1013]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded-[2px] ${
                    tab.badge === "LOCK"
                      ? "bg-[rgba(255, 77, 109,0.18)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)]"
                      : tab.badge === "AI"
                      ? "bg-[rgba(248,113,113,0.18)] text-[#F87171] border border-[rgba(248,113,113,0.3)] animate-pulse"
                      : "bg-[#1D1013] text-[#FF758F] border border-[rgba(255, 117, 143,0.3)]"
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
