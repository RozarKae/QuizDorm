"use client";

import React, { useState } from "react";
import { EncryptedQuestionPaper } from "@/lib/types/examination";
import { Button } from "@/components/ui/button";
import { 
  Lock, Key, ShieldCheck, FileCheck, CheckCircle2, Clock, 
  AlertTriangle, RefreshCw, Layers, Sparkles, UserCheck, Eye
} from "lucide-react";
import { toast } from "sonner";

const mockPapers: EncryptedQuestionPaper[] = [
  {
    id: "paper-101",
    examId: "exam-101",
    paperTitle: "NAT-2026 Higher Physics & Applied Engineering Set A",
    subjectCode: "PHY-901A",
    encryptionAlgorithm: "AES-256-GCM",
    approvalStatus: "Approved by Board",
    approvalChain: [
      { name: "Dr. Eleanor Vance", role: "Lead Chief Examiner", signedAt: "Feb 10, 2026" },
      { name: "Prof. Alan Turing", role: "Board Secretary", signedAt: "Feb 12, 2026" },
      { name: "Marcus Sterling", role: "Chief Controller of Examinations", signedAt: "Feb 14, 2026" },
    ],
    scheduledDecryptionTime: "Mar 10, 2026 at 08:30 AM (30 mins before exam)",
    isDecrypted: false,
    watermarkPattern: "CONFIDENTIAL • NAT-2026 • CANDIDATE-HASH",
    totalMarks: 100,
    questionCount: 60,
    version: "v3.2-FINAL",
  },
  {
    id: "paper-102",
    examId: "exam-101",
    paperTitle: "NAT-2026 Emergency Backup Question Paper Set B",
    subjectCode: "PHY-901B-BACKUP",
    encryptionAlgorithm: "AES-256-GCM",
    approvalStatus: "Pending Approval",
    approvalChain: [
      { name: "Dr. Eleanor Vance", role: "Lead Chief Examiner", signedAt: "Feb 10, 2026" },
      { name: "Prof. Alan Turing", role: "Board Secretary" },
    ],
    scheduledDecryptionTime: "On Emergency Trigger Only",
    isDecrypted: false,
    watermarkPattern: "EMERGENCY BACKUP • CONFIDENTIAL",
    totalMarks: 100,
    questionCount: 60,
    version: "v1.0-BACKUP",
  },
];

export function QuestionPaperSecurityHub() {
  const [papers, setPapers] = useState<EncryptedQuestionPaper[]>(mockPapers);
  const [selectedPaper, setSelectedPaper] = useState<EncryptedQuestionPaper | null>(null);

  const handleTriggerEmergencyPaper = (id: string) => {
    toast.warning("EMERGENCY REPLACEMENT TRIGGERED: Encrypted Backup Set B deployed to all examination centers!");
  };

  const handleSignOffApproval = (paperId: string) => {
    setPapers((prev) =>
      prev.map((p) =>
        p.id === paperId ? { ...p, approvalStatus: "Approved by Board" as const } : p
      )
    );
    toast.success("Board sign-off signature added to cryptographic paper hash!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-2 border border-rose-500/30">
            <Lock className="w-3.5 h-3.5" /> AES-256 Cryptographic Paper Vault
          </div>
          <h2 className="text-2xl font-bold">Question Paper Security & Time-Lock Vault</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            End-to-end encrypted question paper vault with multi-level board approvals, time-locked decryption key release, and dynamic watermark tracking.
          </p>
        </div>

        <Button
          onClick={() => handleTriggerEmergencyPaper(papers[1].id)}
          variant="destructive"
          className="text-xs font-bold rounded-xl shadow-lg bg-red-600 hover:bg-red-700"
        >
          <AlertTriangle className="w-4 h-4 mr-1.5" /> Trigger Emergency Paper Switch
        </Button>
      </div>

      {/* Question Papers Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {paper.subjectCode}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{paper.paperTitle}</h3>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase shrink-0 ${
                    paper.approvalStatus === "Approved by Board"
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {paper.approvalStatus}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Encryption Standard:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> {paper.encryptionAlgorithm}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Scheduled Key Release:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{paper.scheduledDecryptionTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dynamic Watermark:</span>
                  <span className="font-mono text-[10px] text-slate-500">{paper.watermarkPattern}</span>
                </div>
              </div>

              {/* Approval Chain Progress */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Board Approval Sign-Off Chain</span>
                <div className="space-y-1.5">
                  {paper.approvalChain.map((sign, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{sign.name}</span>
                        <span className="text-[10px] text-slate-400 block">{sign.role}</span>
                      </div>
                      {sign.signedAt ? (
                        <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Signed {sign.signedAt}
                        </span>
                      ) : (
                        <Button
                          onClick={() => handleSignOffApproval(paper.id)}
                          size="sm"
                          className="bg-indigo-600 text-white text-[10px] h-6 rounded-md"
                        >
                          Sign Off
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">{paper.questionCount} Questions • {paper.totalMarks} Marks</span>
              <Button
                onClick={() => setSelectedPaper(paper)}
                variant="outline"
                size="sm"
                className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
              >
                <Eye className="w-3.5 h-3.5 mr-1" /> View Paper Hash
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Hash Signature */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-600" /> Cryptographic Integrity Proof
              </h3>
              <button onClick={() => setSelectedPaper(null)} className="text-slate-400">✕</button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-white space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">SHA-256 Paper Checksum</span>
              <p className="font-mono text-[11px] text-rose-400 break-all bg-slate-900 p-2 rounded-lg border border-slate-800">
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </p>
              <p className="text-slate-400 text-[10px]">Tamper-evident verification status: VERIFIED & SEALED.</p>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setSelectedPaper(null)} className="bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
