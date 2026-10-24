"use client";

import React, { useState } from "react";
import { AlumniProfile } from "@/lib/types/administration";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Briefcase, MapPin, Users, Award, 
  CheckCircle2, Sparkles, Building
} from "lucide-react";
import { toast } from "sonner";

const mockAlumni: AlumniProfile[] = [
  { id: "alm-101", alumniId: "ALM-2024-012", fullName: "Dr. Marcus Chen", graduationYear: "2024", degreeEarned: "M.Sc Artificial Intelligence", currentCompany: "OpenAI / Anthropic Research", jobTitle: "Senior AI Alignment Engineer", location: "San Francisco, CA", email: "marcus.c@example.com", mentorshipOptIn: true },
  { id: "alm-102", alumniId: "ALM-2023-088", fullName: "Sophia Rodriguez", graduationYear: "2023", degreeEarned: "B.Sc Quantum Optics", currentCompany: "IBM Quantum Labs", jobTitle: "Quantum Circuit Optimization Lead", location: "Yorktown Heights, NY", email: "sophia.r@example.com", mentorshipOptIn: true },
];

export function GraduationAlumniManagement() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>(mockAlumni);

  const handleRequestMentorship = (name: string) => {
    toast.success(`Mentorship connection requested with Alumni ${name}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Post-Graduation Lifecycle & Alumni Network
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Graduation & Alumni Network Platform</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Graduation clearance protocols, corporate placement tracking, alumni career profiles, mentorship networking, and lifetime academic records.
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Placement Rate</span>
          <p className="text-2xl font-black text-rose-400">97.8% Placed</p>
        </div>
      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alumni.map((alm) => (
          <div key={alm.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    Class of '{alm.graduationYear}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{alm.fullName}</h3>
                  <p className="text-xs text-slate-500">{alm.degreeEarned}</p>
                </div>
                {alm.mentorshipOptIn && (
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold text-[10px]">
                    Mentor Active
                  </span>
                )}
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Company / Employer:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{alm.currentCompany}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Position:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{alm.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-500">{alm.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">{alm.email}</span>
              <Button onClick={() => handleRequestMentorship(alm.fullName)} size="sm" className="bg-indigo-600 text-white text-xs rounded-xl font-semibold">
                Connect Mentorship
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
