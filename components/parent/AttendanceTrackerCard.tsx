"use client";

import React from "react";
import { AttendanceRecord } from "@/lib/types/parent";
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttendanceTrackerCardProps {
  records: AttendanceRecord[];
}

export function AttendanceTrackerCard({ records }: AttendanceTrackerCardProps) {
  const presentCount = records.filter((r) => r.status === "present").length;
  const lateCount = records.filter((r) => r.status === "late").length;
  const attendanceRate = Math.round(((presentCount + lateCount) / records.length) * 100);

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Calendar className="w-5 h-5 text-indigo-600 mr-2" /> Attendance Tracker & Check-in History
        </h3>
        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
          {attendanceRate}% Monthly Rate
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {records.map((r) => (
          <div key={r.id} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {r.status === "present" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              {r.status === "late" && <Clock className="w-4 h-4 text-amber-500" />}
              {r.status === "absent" && <XCircle className="w-4 h-4 text-rose-500" />}
              <span className="font-mono font-bold text-gray-900 dark:text-white">{r.date}</span>
            </div>

            <div className="flex items-center space-x-3">
              {r.checkInTime && <span className="font-mono text-gray-400 text-[10px]">{r.checkInTime}</span>}
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  r.status === "present"
                    ? "bg-emerald-100 text-emerald-800"
                    : r.status === "late"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
