"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExamCandidate } from "@/lib/types/examination";
import {
Download,FileText,
QrCode,
Search,
Shield,
UserCheck
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockCandidates: ExamCandidate[] = [
  { id: "c-101", rollNumber: "2026-ENG-8810", fullName: "Alexander Wright", email: "alexander.w@example.com", identityDocNumber: "ID-9042-881", photoUrl: "#", allocatedHall: "Hall A (Engineering Wing)", seatNumber: "A-104", examCenter: "Metropolitan Examination Center - Campus 1", verificationStatus: "Verified", admitCardGenerated: true, attendanceStatus: "Present" },
  { id: "c-102", rollNumber: "2026-ENG-8811", fullName: "Beatriz Morales", email: "beatriz.m@example.com", identityDocNumber: "ID-1104-442", photoUrl: "#", allocatedHall: "Hall B (Main Auditorium)", seatNumber: "B-212", examCenter: "Metropolitan Examination Center - Campus 1", verificationStatus: "Verified", admitCardGenerated: true, attendanceStatus: "Present" },
  { id: "c-103", rollNumber: "2026-ENG-8812", fullName: "Charles Darwin Jr.", email: "charles.d@example.com", identityDocNumber: "ID-5591-302", photoUrl: "#", allocatedHall: "Hall A (Engineering Wing)", seatNumber: "A-105", examCenter: "Metropolitan Examination Center - Campus 1", verificationStatus: "Pending", admitCardGenerated: false, attendanceStatus: "Absent" },
];

export function CandidateAdmitCardManager() {
  const [candidates, setCandidates] = useState<ExamCandidate[]>(mockCandidates);
  const [selectedAdmitCard, setSelectedAdmitCard] = useState<ExamCandidate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGenerateBulkAdmitCards = () => {
    setCandidates((prev) =>
      prev.map((c) => ({ ...c, admitCardGenerated: true, verificationStatus: "Verified" }))
    );
    toast.success("Generated official Admit Cards for all enrolled candidates!");
  };

  const filteredCandidates = candidates.filter(
    (c) => c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || c.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-indigo-600" /> Candidate & Admit Card Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Register candidates, issue official roll numbers, allocate examination halls, and print digital Admit Cards with QR verification.
          </p>
        </div>

        <Button
          onClick={handleGenerateBulkAdmitCards}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg"
        >
          <QrCode className="w-4 h-4 mr-1.5" /> Generate All Admit Cards
        </Button>
      </div>

      {/* Roster & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate or roll number..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Total Candidates: <span className="font-bold text-slate-900 dark:text-white">{candidates.length}</span>
        </div>
      </div>

      {/* Candidates List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="p-3">Roll Number</th>
              <th className="p-3">Candidate Name</th>
              <th className="p-3">Identity Doc ID</th>
              <th className="p-3">Exam Hall / Seat</th>
              <th className="p-3">Verification</th>
              <th className="p-3 text-right">Admit Card Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredCandidates.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{c.rollNumber}</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{c.fullName}</td>
                <td className="p-3 font-mono text-slate-500">{c.identityDocNumber}</td>
                <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">
                  {c.allocatedHall} • <span className="font-bold text-slate-900 dark:text-white">Seat {c.seatNumber}</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${c.verificationStatus === "Verified" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}>
                    {c.verificationStatus}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Button
                    onClick={() => setSelectedAdmitCard(c)}
                    size="sm"
                    variant="outline"
                    className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1 text-indigo-600" /> View Admit Card
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Official Admit Card Preview */}
      {selectedAdmitCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <Shield className="w-5 h-5 text-indigo-600" /> Official Hall Ticket / Admit Card
              </h3>
              <button onClick={() => setSelectedAdmitCard(null)} className="text-slate-400">✕</button>
            </div>

            {/* Official Pass Printable Document View */}
            <div className="p-5 rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    NATIONAL RECRUITMENT BOARD
                  </h4>
                  <p className="text-[10px] text-slate-500">Official Examination Hall Pass 2026</p>
                </div>
                <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center shadow-sm">
                  <QrCode className="w-10 h-10 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Candidate Name</span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedAdmitCard.fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Roll Number</span>
                  <p className="font-mono font-black text-indigo-600 dark:text-indigo-400">{selectedAdmitCard.rollNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Allocated Hall</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedAdmitCard.allocatedHall}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Seat Designation</span>
                  <p className="font-bold text-slate-900 dark:text-white">Seat {selectedAdmitCard.seatNumber}</p>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">Examination Center:</span>
                <p className="text-slate-600 dark:text-slate-400">{selectedAdmitCard.examCenter}</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Reporting Time: 09:00 AM Sharp</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => toast.success("Admit Card PDF downloaded!")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download Admit Card PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
