"use client";

import React from "react";
import { GradebookSyncService } from "@/lib/academic-integration/gradebookSync";
import { GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";

export function GradebookSyncTable() {
  const logs = GradebookSyncService.getLogs();

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <GraduationCap className="w-5 h-5 text-indigo-600 mr-2" /> Bidirectional Gradebook Sync Logs
          </h3>
          <p className="text-xs text-gray-500">
            Real-time score transfers between QuizDorm assessment attempts and external LMS gradebooks.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-900/50">
              <th className="p-3">Student Name</th>
              <th className="p-3">Quiz Title</th>
              <th className="p-3">Quiz Score</th>
              <th className="p-3">LMS Gradebook Target</th>
              <th className="p-3">Synced At</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors">
                <td className="p-3 font-bold text-gray-900 dark:text-white font-sans">{log.studentName}</td>
                <td className="p-3 font-sans text-gray-600 dark:text-gray-300">{log.quizTitle}</td>
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{log.quizScore}</td>
                <td className="p-3 font-sans text-gray-500">{log.gradebookTarget}</td>
                <td className="p-3 text-gray-400">{new Date(log.syncedAt).toLocaleTimeString()}</td>
                <td className="p-3 font-sans">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
