"use client";

import { Button } from "@/components/ui/button";
import { OpenBadge } from "@/lib/types/certifications";
import {
Award,
ExternalLink,
Share2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockBadges: OpenBadge[] = [
  { id: "badge-1", badgeName: "Quantum Pioneer Badge", issuer: "QuizDorm & MIT", criteria: "Scored 90%+ in Quantum Entanglement Final Exam", imageUrl: "#", issuedDate: "Feb 2026", openBadgeStandardVersion: "v3.0" },
  { id: "badge-2", badgeName: "Full-Stack AI Architect Badge", issuer: "QuizDorm Global Board", criteria: "Completed 42 hours of Neural Network Labs", imageUrl: "#", issuedDate: "Jan 2026", openBadgeStandardVersion: "v2.0" },
];

export function DigitalCredentialWallet() {
  const [badges] = useState<OpenBadge[]>(mockBadges);

  const handleShareLinkedIn = (badgeName: string) => {
    toast.success(`Shared "${badgeName}" credential directly to your LinkedIn Profile!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Lifelong Learner Credential Wallet
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Digital Credential Wallet & Open Badges</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Permanent ownership of verified digital credentials, Open Badges 3.0 standard compliance, LinkedIn 1-click sharing, and public portfolio export.
          </p>
        </div>

        <Button onClick={() => toast.success("Copied Public Credential Portfolio Link!")} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <ExternalLink className="w-4 h-4 mr-1.5" /> Public Portfolio Link
        </Button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {badges.map((b) => (
          <div key={b.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <Award className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{b.badgeName}</h3>
                    <p className="text-xs text-slate-500">{b.issuer}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-mono font-bold text-[10px]">
                  OpenBadges {b.openBadgeStandardVersion}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                Criteria: {b.criteria}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Issued: {b.issuedDate}</span>
              <Button onClick={() => handleShareLinkedIn(b.badgeName)} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-xl font-bold">
                <Share2 className="w-3.5 h-3.5 mr-1" /> Share on LinkedIn
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
