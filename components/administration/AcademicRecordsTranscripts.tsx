"use client";

import React, { useState } from "react";
import { AcademicTranscript } from "@/lib/types/administration";
import { Button } from "@/components/ui/button";
import { 
  Award, Download, CheckCircle2, GraduationCap, FileText, Sparkles, BookOpen
} from "lucide-react";
import { toast } from "sonner";

const mockTranscript: AcademicTranscript = {
  studentId: "sis-101",
  studentName: "Alexander Wright",
  rollNumber: "2026-PHY-01",
  program: "B.Sc Quantum Physics & Mathematics",
  cumulativeGPA: 3.94,
  totalCreditsEarned: 112,
  totalCreditsRequired: 120,
  graduationEligible: true,
  semesters: [
    {
      semesterName: "Semester 5 (Fall 2025)",
      gpa: 4.0,
      credits: 16,
      courses: [
        { code: "PHY-501", title: "Quantum Entanglement & Pauli Mechanics", grade: "A+", credits: 4 },
        { code: "MATH-410", title: "Linear Algebra & Hilbert Spaces", grade: "A+", credits: 4 },
        { code: "CS-301", title: "Data Structures & Neural Nets", grade: "A", credits: 4 },
        { code: "PHYS-LAB", title: "Experimental Optics & Lasers Lab", grade: "A+", credits: 4 },
      ],
    },
  ],
};

export function AcademicRecordsTranscripts() {
  const [transcript, setTranscript] = useState<AcademicTranscript>(mockTranscript);

  const handleExportOfficialTranscript = () => {
    toast.success("Generated Official Cryptographic Academic Transcript (PDF format)!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600" /> Academic Records & Digital Transcripts
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Institutional gradebook, cumulative GPA/CGPA calculation, credit audits, and official transcript generation.
          </p>
        </div>

        <Button onClick={handleExportOfficialTranscript} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export Official Transcript (PDF)
        </Button>
      </div>

      {/* Transcript Header Overview */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="font-mono text-xs text-indigo-400 font-bold">Roll: {transcript.rollNumber}</span>
            <h3 className="text-xl font-bold">{transcript.studentName}</h3>
            <p className="text-xs text-slate-400">{transcript.program}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Cumulative GPA</span>
              <p className="text-3xl font-black text-emerald-400">{transcript.cumulativeGPA} / 4.0</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Credits</span>
              <p className="text-2xl font-bold text-white">{transcript.totalCreditsEarned} / {transcript.totalCreditsRequired}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" /> Graduation Eligibility: CONFIRMED
          </span>
          <span className="text-slate-400">Class Rank: #1 of 140</span>
        </div>
      </div>

      {/* Semesters Course Grades Table */}
      <div className="space-y-4">
        {transcript.semesters.map((sem, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{sem.semesterName}</h4>
              <span className="font-mono text-slate-500 font-bold">Term GPA: {sem.gpa} • {sem.credits} Credits</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {sem.courses.map((crs) => (
                <div key={crs.code} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{crs.code}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{crs.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400">{crs.credits} Credits</span>
                    <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">{crs.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
