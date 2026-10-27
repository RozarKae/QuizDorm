"use client";

import { Button } from "@/components/ui/button";
import { AIConnectionManager,ConnectionTestResult } from "@/lib/ai/services/connectionManager";
import { Activity,RefreshCw } from "lucide-react";
import { useCallback,useEffect,useState } from "react";
import { toast } from "sonner";
import { ProviderBadge } from "./ProviderBadge";

export function AIHealthWidget() {
  const [testResults, setTestResults] = useState<ConnectionTestResult[]>([]);
  const [loading, setLoading] = useState(true);

  const runHealthCheck = useCallback(async () => {
    setLoading(true);
    try {
      const results = await AIConnectionManager.testAllConnections();
      setTestResults(results);
    } catch {
      toast.error("Health check failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    AIConnectionManager.testAllConnections()
      .then((results) => {
        if (active) setTestResults(results);
      })
      .catch(() => {
        if (active) toast.error("Health check failed");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Activity className="w-5 h-5 text-indigo-600 mr-2" /> Real-Time Provider Health & Ping Monitor
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Automated connection verification, response latency (ms), and online status across AI providers.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={runHealthCheck}
          disabled={loading}
          className="text-xs rounded-xl border-gray-200 dark:border-gray-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Ping Connections
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {testResults.map((res) => (
          <div
            key={res.providerId}
            className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
              res.connected
                ? "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900"
                : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <ProviderBadge providerId={res.providerId} size="sm" />
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                res.connected ? "bg-rose-500 text-white" : "bg-rose-500 text-white"
              }`}>
                {res.connected ? "ONLINE" : "OFFLINE"}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-500">Latency:</span>
                <span className="font-bold text-gray-900 dark:text-white">{res.latencyMs} ms</span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2">{res.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
