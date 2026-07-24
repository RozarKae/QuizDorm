"use client";

import React, { useState, useEffect } from "react";
import { AILogEntry } from "@/lib/types/ai";
import { AILogger } from "@/lib/ai/analytics/analytics";
import { ProviderBadge } from "./ProviderBadge";
import { Search, Filter, Clock, Trash2, Eye, FileText, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AILogsViewer() {
  const [logs, setLogs] = useState<AILogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    setLogs(AILogger.getLogs());
  };

  const handleClearLogs = () => {
    AILogger.clearLogs();
    setLogs([]);
    toast.success("AI Request audit logs cleared.");
  };

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.featureId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.promptText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" /> Searchable AI Request Audit Log
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time audit history of every prompt routed through QuizDorm AI Router.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={loadLogs} className="text-xs rounded-xl border-gray-200 dark:border-gray-800">
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
          </Button>
          <Button size="sm" variant="ghost" onClick={handleClearLogs} className="text-xs rounded-xl text-rose-600">
            <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear Logs
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search logs by feature, prompt text, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="fallback_success">Fallback Success</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-900/50">
              <th className="p-3">Timestamp</th>
              <th className="p-3">Feature</th>
              <th className="p-3">Provider / Model</th>
              <th className="p-3">Status</th>
              <th className="p-3">Tokens</th>
              <th className="p-3">Latency</th>
              <th className="p-3 text-right">Cost (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-gray-800 dark:text-gray-200">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400 font-sans">
                  No AI request audit logs recorded yet. Run a prompt in the AI Playground.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors">
                  <td className="p-3 text-gray-400 text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </td>

                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                    {log.featureId}
                  </td>

                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <ProviderBadge providerId={log.provider} size="sm" />
                      <span className="text-gray-500 text-[10px]">{log.model}</span>
                    </div>
                  </td>

                  <td className="p-3 font-semibold font-sans">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${
                        log.status === "success"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : log.status === "fallback_success"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      }`}
                    >
                      {log.status.replace(/_/g, " ")}
                    </span>
                  </td>

                  <td className="p-3 font-bold">{log.tokensTotal}</td>
                  <td className="p-3 text-gray-500">{log.latencyMs} ms</td>
                  <td className="p-3 text-right font-bold text-emerald-600">${log.costEstimateUSD.toFixed(5)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
