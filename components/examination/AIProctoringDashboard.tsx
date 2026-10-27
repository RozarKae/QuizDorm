"use client";

import { Button } from "@/components/ui/button";
import { ProctorIncident } from "@/lib/types/examination";
import {
AlertTriangle,
Eye,
RefreshCw,
ShieldAlert
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockIncidents: ProctorIncident[] = [
  { id: "inc-1", candidateId: "c-101", candidateName: "Marcus Chen", rollNumber: "2026-ENG-8810", examId: "exam-101", timestamp: "10:14:22 AM", incidentType: "Multiple Faces", severity: "critical", status: "Pending Review" },
  { id: "inc-2", candidateId: "c-102", candidateName: "Sophia Rodriguez", rollNumber: "2026-ENG-8811", examId: "exam-101", timestamp: "10:18:05 AM", incidentType: "Mobile Device Detected", severity: "high", status: "Pending Review" },
  { id: "inc-3", candidateId: "c-103", candidateName: "Liam Gallagher", rollNumber: "2026-ENG-8812", examId: "exam-101", timestamp: "10:22:40 AM", incidentType: "Tab Switch", severity: "medium", status: "Pending Review" },
  { id: "inc-4", candidateId: "c-104", candidateName: "Amara Johnson", rollNumber: "2026-ENG-8813", examId: "exam-101", timestamp: "10:25:12 AM", incidentType: "Gaze Deviation", severity: "low", status: "Dismissed" },
];

export function AIProctoringDashboard() {
  const [incidents, setIncidents] = useState<ProctorIncident[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<ProctorIncident | null>(null);
  const [filterSeverity] = useState<string>("All");

  const handleActionOnIncident = (id: string, newStatus: "Verified Violation" | "Dismissed") => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc))
    );
    setSelectedIncident(null);
    toast.success(`Incident status updated to: ${newStatus}`);
  };

  const filteredIncidents = incidents.filter(
    (inc) => filterSeverity === "All" || inc.severity === filterSeverity
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold mb-2 border border-red-500/30">
            <Eye className="w-3.5 h-3.5 animate-pulse" /> Live AI Proctoring Supervision
          </div>
          <h2 className="text-2xl font-bold">AI Proctoring Incident Operations</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Real-time biometric computer vision monitoring detects secondary faces, unauthorized mobile phones, gaze deviations, and tab switching during live examinations.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 font-bold text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> 3 Critical Alerts
          </div>
          <Button
            onClick={() => toast.info("Refreshing AI proctoring stream...")}
            variant="outline"
            size="sm"
            className="text-xs rounded-xl border-slate-700 text-white"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Sync Video Feeds
          </Button>
        </div>
      </div>

      {/* Live Video Feed Candidates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            className={`bg-slate-900 rounded-2xl border p-4 space-y-3 relative overflow-hidden transition-all shadow-lg ${
              inc.severity === "critical"
                ? "border-red-500/50 shadow-red-500/10"
                : inc.severity === "high"
                ? "border-amber-500/50"
                : "border-slate-800"
            }`}
          >
            {/* Simulated Live Webcam Stream Frame */}
            <div className="w-full h-36 bg-slate-950 rounded-xl border border-slate-800 relative flex flex-col items-center justify-center overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-lg">
                {inc.candidateName.charAt(0)}
              </div>
              <span className="text-[11px] text-slate-300 font-bold mt-2">{inc.candidateName}</span>

              {/* Bounding Box Visualizer for Detection */}
              {inc.incidentType === "Multiple Faces" && (
                <div className="absolute top-2 right-2 border-2 border-red-500 bg-red-500/20 px-2 py-0.5 rounded text-[9px] font-bold text-red-300 animate-pulse">
                  2 Faces Detected
                </div>
              )}
              {inc.incidentType === "Mobile Device Detected" && (
                <div className="absolute top-2 right-2 border-2 border-amber-500 bg-amber-500/20 px-2 py-0.5 rounded text-[9px] font-bold text-amber-300 animate-pulse">
                  Mobile Bounding Box
                </div>
              )}

              <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-white font-mono">
                {inc.timestamp}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white truncate">{inc.incidentType}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    inc.severity === "critical"
                      ? "bg-red-500 text-white"
                      : inc.severity === "high"
                      ? "bg-amber-500 text-black"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {inc.severity}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Roll: {inc.rollNumber}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-semibold">{inc.status}</span>
              <Button
                onClick={() => setSelectedIncident(inc)}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] h-7 rounded-lg"
              >
                Inspect Flag
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Incident Review & Decision */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-800 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Proctor Review: {selectedIncident.candidateName}
              </h3>
              <button onClick={() => setSelectedIncident(null)} className="text-slate-400">✕</button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Violation Flag:</span>
                <span className="font-bold text-red-400 text-sm">{selectedIncident.incidentType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-mono">{selectedIncident.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Candidate Roll Number:</span>
                <span className="font-mono font-bold text-indigo-400">{selectedIncident.rollNumber}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                onClick={() => handleActionOnIncident(selectedIncident.id, "Dismissed")}
                variant="outline"
                className="text-xs rounded-xl border-slate-700 text-slate-300"
              >
                Dismiss False Alarm
              </Button>
              <Button
                onClick={() => handleActionOnIncident(selectedIncident.id, "Verified Violation")}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Confirm Violation & Disqualify
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
