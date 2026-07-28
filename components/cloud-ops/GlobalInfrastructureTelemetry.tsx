"use client";

import React, { useState } from "react";
import { ClusterNode } from "@/lib/types/cloud-ops";
import { Button } from "@/components/ui/button";
import { 
  Server, Cpu, Activity, RefreshCw, CheckCircle2, Zap, Globe
} from "lucide-react";
import { toast } from "sonner";

const mockNodes: ClusterNode[] = [
  { nodeId: "node-us-east-1a", region: "US-East (N. Virginia)", kubernetesVersion: "v1.30.2-gke", cpuUsagePercent: 42, memoryUsagePercent: 58, activePodsCount: 142, nodeStatus: "Ready" },
  { nodeId: "node-eu-central-1b", region: "EU-Central (Frankfurt)", kubernetesVersion: "v1.30.2-gke", cpuUsagePercent: 38, memoryUsagePercent: 49, activePodsCount: 98, nodeStatus: "Ready" },
  { nodeId: "node-ap-south-1a", region: "AP-South (Mumbai)", kubernetesVersion: "v1.30.2-gke", cpuUsagePercent: 64, memoryUsagePercent: 71, activePodsCount: 210, nodeStatus: "Ready" },
];

export function GlobalInfrastructureTelemetry() {
  const [nodes, setNodes] = useState<ClusterNode[]>(mockNodes);

  const handleTriggerDeployment = () => {
    toast.success("Zero-Downtime Rolling Deployment initiated across 3 Kubernetes regions!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" /> Real-time Kubernetes Telemetry & Auto-Scaling
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-6 h-6 text-indigo-600" /> Global Infrastructure Telemetry
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kubernetes cluster health, edge CDN latency, pod orchestration, and multi-region load balancing.
          </p>
        </div>

        <Button onClick={handleTriggerDeployment} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Zap className="w-4 h-4 mr-1.5 text-amber-400" /> Zero-Downtime Rollout
        </Button>
      </div>

      {/* Cluster Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((node) => (
          <div key={node.nodeId} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{node.nodeId}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono font-bold text-[10px]">
                  {node.nodeStatus}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{node.region}</h4>
              <p className="text-[10px] text-slate-400 font-mono">K8s: {node.kubernetesVersion}</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">CPU Load:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{node.cpuUsagePercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div style={{ width: `${node.cpuUsagePercent}%` }} className="h-full bg-indigo-600 rounded-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Memory Load:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{node.memoryUsagePercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div style={{ width: `${node.memoryUsagePercent}%` }} className="h-full bg-purple-600 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-slate-400">
              <span>{node.activePodsCount} Active Pods</span>
              <span>Auto-Scaling On</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
