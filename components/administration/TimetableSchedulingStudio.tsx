"use client";

import React, { useState } from "react";
import { TimetableSlot } from "@/lib/types/administration";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, AlertTriangle, CheckCircle2, Building2, Sparkles, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const mockSlots: TimetableSlot[] = [
  { id: "slot-1", day: "Monday", timeSlot: "09:00 AM - 10:30 AM", subject: "Quantum Physics (PHY-501)", facultyName: "Dr. Eleanor Vance", roomNumber: "Lab B-4", batchSection: "Grade 12-A", isConflict: false },
  { id: "slot-2", day: "Monday", timeSlot: "10:45 AM - 12:15 PM", subject: "Linear Algebra (MATH-410)", facultyName: "Prof. Alan Turing", roomNumber: "Hall A", batchSection: "Grade 12-A", isConflict: false },
  { id: "slot-3", day: "Tuesday", timeSlot: "09:00 AM - 10:30 AM", subject: "Neural Networks (CS-301)", facultyName: "Dr. Eleanor Vance", roomNumber: "Lab B-4", batchSection: "Grade 12-B", isConflict: true },
];

export function TimetableSchedulingStudio() {
  const [slots, setSlots] = useState<TimetableSlot[]>(mockSlots);

  const handleResolveConflicts = () => {
    setSlots((prev) =>
      prev.map((s) => (s.isConflict ? { ...s, isConflict: false, roomNumber: "Lab C-2 (Reallocated)" } : s))
    );
    toast.success("AI Timetable Optimizer resolved room double-booking conflict!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Conflict-Free Schedule Optimizer
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" /> Timetable & Scheduling Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Schedule class timetables, faculty workloads, lecture hall allocations, and run AI conflict detection for double-bookings.
          </p>
        </div>

        <Button onClick={handleResolveConflicts} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" /> Run AI Conflict Solver
        </Button>
      </div>

      {/* Timetable Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`p-5 rounded-2xl border transition-all shadow-sm space-y-3 flex flex-col justify-between ${
              slot.isConflict
                ? "bg-red-500/5 border-red-500/40 ring-2 ring-red-500/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">{slot.day}</span>
                {slot.isConflict ? (
                  <span className="px-2 py-0.5 rounded bg-red-500 text-white font-bold text-[10px] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> CONFLICT
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                    VALID
                  </span>
                )}
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{slot.subject}</h4>
              <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {slot.timeSlot}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Faculty:</span>
                <span className="font-semibold">{slot.facultyName}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Room / Hall:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{slot.roomNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
