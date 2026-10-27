"use client";

import { Button } from "@/components/ui/button";
import { RegionalNode } from "@/lib/types/examination";
import {
CheckCircle2,
Globe,
Server,
Zap
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockNodes: RegionalNode[] = [
  { nodeId: "node-us-east", regionName: "US East (N. Virginia)", activeServers: 120, concurrentCandidates: 85000, cpuLoadPercent: 42, latencyMs: 14, status: "Healthy" },
  { nodeId: "node-asia-south", regionName: "Asia South (Mumbai)", activeServers: 250, concurrentCandidates: 142000, cpuLoadPercent: 68, latencyMs: 22, status: "Healthy" },
  { nodeId: "node-eu-central", regionName: "Europe Central (Frankfurt)", activeServers: 90, concurrentCandidates: 45000, cpuLoadPercent: 35, latencyMs: 18, status: "Healthy" },
  { nodeId: "node-asia-east", regionName: "Asia East (Tokyo)", activeServers: 110, concurrentCandidates: 62000, cpuLoadPercent: 88, latencyMs: 28, status: "High Load" },
];

export function NationalInfrastructureMonitor() {
  const [nodes, setNodes] = useState<RegionalNode[]>(mockNodes);

  const handleSimulateFailover = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.nodeId === nodeId
          ? { ...n, status: "Failover Active" as const, activeServers: n.activeServers + 40, cpuLoadPercent: 45 }
          : n
      )
    );
    toast.success(`Automated Zero-Downtime Failover activated for node ${nodeId}! Traffic rerouted.`);
  };

  const totalConcurrent = nodes.reduce((acc, n) => acc + n.concurrentCandidates, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-2 border border-rose-500/30">
            <Globe className="w-3.5 h-3.5 animate-pulse" /> National Scale Infrastructure Telemetry
          </div>
          <h2 className="text-2xl font-bold">Multi-Region Examination Cloud & Edge Matrix</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Supports 1 Million+ concurrent examination candidates across distributed edge nodes with automatic failover, load balancing, and disaster recovery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Live Candidates</span>
            <span className="text-xl font-black text-rose-400">{totalConcurrent.toLocaleString()} Active</span>
          </div>
        </div>
      </div>

      {/* Regional Edge Node Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((node) => (
          <div
            key={node.nodeId}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-600" /> {node.regionName}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">{node.nodeId}</p>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] uppercase ${
                    node.status === "Healthy"
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      : node.status === "High Load"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                  }`}
                >
                  {node.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Candidates</span>
                  <p className="font-extrabold text-slate-900 dark:text-white">{node.concurrentCandidates.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Servers</span>
                  <p className="font-extrabold text-slate-900 dark:text-white">{node.activeServers} Nodes</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Latency</span>
                  <p className="font-extrabold text-rose-600 font-mono">{node.latencyMs} ms</p>
                </div>
              </div>

              {/* CPU Load Bar */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Cloud Capacity Load:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{node.cpuLoadPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${node.cpuLoadPercent}%` }}
                    className={`h-full rounded-full ${node.cpuLoadPercent > 80 ? "bg-amber-500" : "bg-indigo-600"}`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" /> SLA: 99.999%
              </span>
              <Button
                onClick={() => handleSimulateFailover(node.nodeId)}
                size="sm"
                variant="outline"
                className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
              >
                <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" /> Test Failover
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
