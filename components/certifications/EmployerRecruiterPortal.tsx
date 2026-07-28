"use client";

import React, { useState } from "react";
import { VerifiedTalentCandidate } from "@/lib/types/certifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, Search, CheckCircle2, ShieldCheck, Mail, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockTalent: VerifiedTalentCandidate[] = [
  {
    candidateId: "cand-101",
    name: "Alexander Wright",
    email: "alexander.w@example.com",
    primaryRole: "Senior Quantum AI Engineer",
    verifiedCertifications: [
      "Certified Full-Stack Quantum Systems Engineer (CFSQE)",
      "Enterprise AI Infrastructure Specialist (EAIS)",
    ],
    topSkills: [
      { skillName: "Quantum Mechanics", proficiencyPercent: 96 },
      { skillName: "PennyLane SDK", proficiencyPercent: 92 },
      { skillName: "PyTorch AI", proficiencyPercent: 94 },
    ],
    matchScorePercent: 98,
  },
];

export function EmployerRecruiterPortal() {
  const [candidates, setCandidates] = useState<VerifiedTalentCandidate[]>(mockTalent);
  const [skillFilter, setSkillFilter] = useState("");

  const handleInviteInterview = (name: string) => {
    toast.success(`Interview Invitation sent to verified candidate ${name}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" /> Recruiter & Employer Verified Talent Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Search verified candidates holding 100% authenticated credentials, validated skill proficiencies, and instant hiring invitations.
          </p>
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 gap-4">
        {candidates.map((cand) => (
          <div key={cand.candidateId} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{cand.name}</h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Credentials
                  </span>
                </div>
                <p className="text-xs text-slate-500">{cand.primaryRole}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm">
                  {cand.matchScorePercent}% Skill Match
                </span>
                <Button onClick={() => handleInviteInterview(cand.name)} className="bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg">
                  <Mail className="w-4 h-4 mr-1.5" /> Invite to Interview
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-400 uppercase text-[10px]">Verified Skills & Proficiency</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {cand.topSkills.map((sk) => (
                  <div key={sk.skillName} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
                    <span className="font-semibold text-slate-900 dark:text-white">{sk.skillName}</span>
                    <span className="font-mono font-bold text-emerald-600">{sk.proficiencyPercent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
