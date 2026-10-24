"use client";

import React, { useState } from "react";
import { Code2, Play, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ApiExplorerWidget() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("/api/v1/questions");
  const [responseJson, setResponseJson] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTestApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(selectedEndpoint);
      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
    } catch {
      setResponseJson(JSON.stringify({ error: "Failed to query API endpoint" }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold flex items-center">
          <Code2 className="w-5 h-5 text-indigo-400 mr-2" /> Interactive REST API Explorer (Swagger Console)
        </h3>
        <span className="text-xs font-mono text-rose-400 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
          OpenAPI 3.0 Standard
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <select
          value={selectedEndpoint}
          onChange={(e) => setSelectedEndpoint(e.target.value)}
          className="w-full sm:w-64 p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono font-bold text-indigo-300"
        >
          <option value="/api/v1/questions">GET /api/v1/questions</option>
          <option value="/api/v1/quizzes">GET /api/v1/quizzes</option>
          <option value="/api/v1/certificates?id=VER-2026-8A4F29">GET /api/v1/certificates</option>
          <option value="/api/v1/webhooks">GET /api/v1/webhooks</option>
          <option value="/api/v1/openapi">GET /api/v1/openapi</option>
        </select>

        <Button onClick={handleTestApi} disabled={loading} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
          <Play className="w-3.5 h-3.5 mr-1.5" /> {loading ? "Executing Request..." : "Send Test Request"}
        </Button>
      </div>

      {responseJson && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-rose-400 border-b border-slate-800 pb-2">
            <span>HTTP/1.1 200 OK</span>
            <span>Content-Type: application/json</span>
          </div>
          <pre className="text-[11px] font-mono text-indigo-200 overflow-x-auto max-h-60 p-2 scrollbar-thin">
            {responseJson}
          </pre>
        </div>
      )}
    </div>
  );
}
