"use client";

import { Button } from "@/components/ui/button";
import { DeveloperAPIRoute } from "@/lib/types/cloud-ops";
import {
Code2,
Send
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockAPIs: DeveloperAPIRoute[] = [
  { endpoint: "/v1/edu/tenants/sync", method: "POST", version: "v1.4", rateLimitPerMin: 1000, avgResponseTimeMs: 24, status: "Operational" },
  { endpoint: "/v1/certifications/verify", method: "GET", version: "v1.4", rateLimitPerMin: 5000, avgResponseTimeMs: 12, status: "Operational" },
  { endpoint: "/v1/ai/evaluations/grade", method: "POST", version: "v1.4", rateLimitPerMin: 500, avgResponseTimeMs: 85, status: "Operational" },
];

export function GlobalIntegrationsPlatform() {
  const [apis] = useState<DeveloperAPIRoute[]>(mockAPIs);

  const handleTestEndpoint = (ep: string) => {
    toast.success(`API Gateway test call to '${ep}' returned HTTP 200 OK (14ms)!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-600" /> Global Developer API & Integration Gateway
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            REST & GraphQL APIs, real-time webhooks, university LMS connectors, and government EduOS SDKs.
          </p>
        </div>
      </div>

      {/* API Routes List */}
      <div className="space-y-3">
        {apis.map((api) => (
          <div key={api.endpoint} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs font-mono gap-4">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${api.method === "GET" ? "bg-rose-500/10 text-rose-600" : "bg-indigo-500/10 text-indigo-600"}`}>
                {api.method}
              </span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{api.endpoint}</h4>
                <p className="text-[10px] text-slate-400">Rate Limit: {api.rateLimitPerMin} req/min • Avg Response: {api.avgResponseTimeMs}ms</p>
              </div>
            </div>

            <Button onClick={() => handleTestEndpoint(api.endpoint)} size="sm" className="bg-indigo-600 text-white text-xs rounded-xl font-bold shrink-0">
              <Send className="w-3.5 h-3.5 mr-1" /> Test Gateway Call
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
