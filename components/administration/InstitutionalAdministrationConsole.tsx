"use client";

import React, { useState } from "react";
import { CampusAdministration } from "@/lib/types/administration";
import { Button } from "@/components/ui/button";
import { 
  Building2, Users, Trophy, ShieldCheck, Award, Plus, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockCampuses: CampusAdministration[] = [
  {
    campusId: "camp-1",
    campusName: "Metropolitan Central Campus",
    code: "METRO-MAIN",
    location: "New York, USA",
    totalStudents: 14500,
    totalFaculty: 420,
    activeBatches: 24,
    houses: [
      { houseName: "Phoenix House", color: "#ef4444", points: 1420 },
      { houseName: "Griffin House", color: "#3b82f6", points: 1380 },
      { houseName: "Dragon House", color: "#10b981", points: 1510 },
    ],
    clubs: [
      { clubName: "AI & Robotics Society", memberCount: 120, leadFaculty: "Dr. Eleanor Vance" },
      { clubName: "Quantum Physics Guild", memberCount: 85, leadFaculty: "Prof. Alan Turing" },
    ],
  },
];

export function InstitutionalAdministrationConsole() {
  const [campuses, setCampuses] = useState<CampusAdministration[]>(mockCampuses);
  const activeCampus = campuses[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2 border border-indigo-500/30">
            <Building2 className="w-3.5 h-3.5" /> Multi-Campus Governance & Institutional Control
          </div>
          <h2 className="text-2xl font-bold">{activeCampus.campusName} ({activeCampus.code})</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Location: {activeCampus.location} • {activeCampus.totalStudents.toLocaleString()} Students • {activeCampus.totalFaculty} Faculty Members
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Multi-Campus Configuration...")} variant="outline" className="text-xs rounded-xl border-slate-700 text-white">
          Manage Campuses
        </Button>
      </div>

      {/* House System & Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* House System Points */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" /> Institutional House System Standings
          </h3>

          <div className="space-y-3">
            {activeCampus.houses.map((h) => (
              <div key={h.houseName} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: h.color }} />
                  <span className="font-bold text-slate-900 dark:text-white">{h.houseName}</span>
                </div>
                <span className="font-mono font-black text-slate-900 dark:text-white text-sm">{h.points} Points</span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Clubs */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" /> Student Clubs & Societies
          </h3>

          <div className="space-y-3">
            {activeCampus.clubs.map((c) => (
              <div key={c.clubName} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{c.clubName}</h4>
                  <p className="text-[10px] text-slate-400">Advisor: {c.leadFaculty}</p>
                </div>
                <span className="font-mono text-indigo-600 font-bold">{c.memberCount} Members</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
