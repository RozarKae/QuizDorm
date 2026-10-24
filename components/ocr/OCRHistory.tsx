"use client";

import React, { useState } from "react";
import { OCRJob } from "@/lib/types/ocr";
import { Search, Filter, Calendar, FileText, CheckCircle2, AlertCircle, Clock, Trash2, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OCRHistoryProps {
  jobs: OCRJob[];
  onSelectJob: (job: OCRJob) => void;
  onDeleteJob: (jobId: string) => void;
}

export function OCRHistory({ jobs, onSelectJob, onDeleteJob }: OCRHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.subject && job.subject.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesSubject = subjectFilter === "all" || job.subject === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  const subjects = Array.from(new Set(jobs.map((j) => j.subject || "General").filter(Boolean)));

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Clock className="w-5 h-5 text-indigo-600 mr-2" /> Searchable Import Audit History
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            View completed, draft, processing, and failed digitization jobs across your institution.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          Total Records: {filteredJobs.length}
        </span>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by file name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="review_ready">Pending Review</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="all">All Subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-900/50">
              <th className="p-3">File Name</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Uploaded Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Questions</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No OCR import history records found matching search filters.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors">
                  <td className="p-3 font-semibold flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="truncate max-w-[200px]">{job.fileName}</span>
                  </td>

                  <td className="p-3 font-medium">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[11px]">
                      {job.subject || "General"}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500">
                    {new Date(job.uploadedAt).toLocaleDateString()} {new Date(job.uploadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>

                  <td className="p-3 font-semibold">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] uppercase ${
                        job.status === "completed"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                          : job.status === "review_ready"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                          : job.status === "failed"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {job.status.replace(/_/g, " ")}
                    </span>
                  </td>

                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                    {job.extractedQuestions.length} Questions
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectJob(job)}
                      className="text-xs h-7 rounded-lg border-gray-200 dark:border-gray-800"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </Button>
                    <button
                      onClick={() => onDeleteJob(job.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-gray-100 dark:hover:bg-gray-900"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
