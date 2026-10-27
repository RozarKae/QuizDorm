"use client";

import { Button } from "@/components/ui/button";
import { AdmissionApplication } from "@/lib/types/administration";
import {
Check,
FileText,
Sparkles
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockApplications: AdmissionApplication[] = [
  {
    id: "app-101",
    applicationNumber: "APP-2026-4401",
    applicantName: "Liam Gallagher",
    targetProgram: "B.Sc Advanced Computer Science",
    academicYear: "2026-2027",
    previousSchool: "St. Jude Senior Secondary",
    gpaPrevious: 3.92,
    entranceExamScore: 94.5,
    meritRank: 14,
    appliedDate: "Feb 10, 2026",
    status: "Merit Listed",
    documentChecklist: [
      { docName: "High School Transcript", isUploaded: true, isVerified: true },
      { docName: "National Identity ID Card", isUploaded: true, isVerified: true },
      { docName: "Medical Fitness Certificate", isUploaded: true, isVerified: true },
    ],
  },
  {
    id: "app-102",
    applicationNumber: "APP-2026-4402",
    applicantName: "Amara Johnson",
    targetProgram: "B.Sc Quantum Physics",
    academicYear: "2026-2027",
    previousSchool: "The Choice School, Tripunithura",
    gpaPrevious: 3.75,
    entranceExamScore: 88.0,
    meritRank: 42,
    appliedDate: "Feb 12, 2026",
    status: "Under Review",
    documentChecklist: [
      { docName: "High School Transcript", isUploaded: true, isVerified: true },
      { docName: "National Identity ID Card", isUploaded: true, isVerified: false },
    ],
  },
];

export function AdmissionManagementPortal() {
  const [applications, setApplications] = useState<AdmissionApplication[]>(mockApplications);
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);

  const handleApproveAdmission = (id: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Approved" as const } : a))
    );
    setSelectedApp(null);
    toast.success("Admission Approved! Automated Acceptance Letter sent via Email.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" /> Digital Admissions & Enrollment Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Digitize applications, verify uploaded documents, score entrance tests, compute merit rankings, and manage enrollments.
          </p>
        </div>

        <Button onClick={() => toast.success("Merit List updated based on entrance scores & GPA!")} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5" /> Re-Compute Merit Rankings
        </Button>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="p-3">Application #</th>
              <th className="p-3">Applicant Name</th>
              <th className="p-3">Target Program</th>
              <th className="p-3">Prior GPA</th>
              <th className="p-3">Entrance Score</th>
              <th className="p-3">Merit Rank</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Review Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{app.applicationNumber}</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{app.applicantName}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{app.targetProgram}</td>
                <td className="p-3 font-mono">{app.gpaPrevious}</td>
                <td className="p-3 font-mono font-bold text-rose-600">{app.entranceExamScore}%</td>
                <td className="p-3 font-mono font-bold text-purple-600">#{app.meritRank}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${app.status === "Approved" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Button
                    onClick={() => setSelectedApp(app)}
                    size="sm"
                    variant="outline"
                    className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
                  >
                    Inspect Dossier
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Application Review */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Dossier Review: {selectedApp.applicantName}
              </h3>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-slate-500">Document Verification Checklist:</p>
              {selectedApp.documentChecklist.map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{doc.docName}</span>
                  {doc.isVerified ? (
                    <span className="text-rose-500 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Verified</span>
                  ) : (
                    <span className="text-amber-500 font-bold">Pending Check</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" onClick={() => setSelectedApp(null)} className="rounded-xl text-xs">
                Cancel
              </Button>
              <Button onClick={() => handleApproveAdmission(selectedApp.id)} className="bg-rose-600 text-white rounded-xl text-xs font-bold">
                Approve & Enroll Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
