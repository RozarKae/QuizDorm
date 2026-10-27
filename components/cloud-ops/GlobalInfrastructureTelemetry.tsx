"use client";

import { Button } from "@/components/ui/button";
import { ClusterNode } from "@/lib/types/cloud-ops";
import {
Activity,
Server,
Zap
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockNodes: ClusterNode[] = [
  {
    nodeId: "node-us-east-1a",
    region: "US-East (N. Virginia)",
    kubernetesVersion: "v1.30.2-gke",
    cpuUsagePercent: 42,
    memoryUsagePercent: 58,
    activePodsCount: 142,
    nodeStatus: "Ready",
  },
  {
    nodeId: "node-eu-central-1b",
    region: "EU-Central (Frankfurt)",
    kubernetesVersion: "v1.30.2-gke",
    cpuUsagePercent: 38,
    memoryUsagePercent: 49,
    activePodsCount: 98,
    nodeStatus: "Ready",
  },
  {
    nodeId: "node-ap-south-1a",
    region: "AP-South (Mumbai)",
    kubernetesVersion: "v1.30.2-gke",
    cpuUsagePercent: 64,
    memoryUsagePercent: 71,
    activePodsCount: 210,
    nodeStatus: "Ready",
  },
];

export function GlobalInfrastructureTelemetry() {
  const [nodes] = useState<ClusterNode[]>(mockNodes);

  const handleTriggerDeployment = () => {
    toast.success("Zero-Downtime Rolling Deployment initiated across 3 Kubernetes regions!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#140C0E] p-6 rounded-[8px] border border-[rgba(240, 160, 180,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] text-[10px] font-mono font-bold uppercase tracking-wider mb-2 border border-[rgba(255, 77, 109,0.2)]">
            <Activity className="w-3.5 h-3.5" />
            Real-time Kubernetes Telemetry & Auto-Scaling
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-[#F2F7F3] flex items-center gap-2">
            <Server className="w-5 h-5 text-[#FF4D6D]" />
            Global Infrastructure Telemetry
          </h2>
          <p className="text-xs text-[#A0AEA5] mt-1">
            Kubernetes cluster health, edge CDN latency, pod orchestration, and multi-region load balancing.
          </p>
        </div>

        <Button
          onClick={handleTriggerDeployment}
          className="h-9 px-4 rounded-[4px] bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(255, 77, 109,0.2)] shrink-0"
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Zero-Downtime Rollout
        </Button>
      </div>

      {/* Cluster Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((node) => (
          <div
            key={node.nodeId}
            className="bg-[#140C0E] p-5 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] hover:border-[rgba(240, 160, 180,0.28)] transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#FF4D6D]">{node.nodeId}</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] font-mono font-bold text-[10px] uppercase border border-[rgba(255, 77, 109,0.2)]">
                  {node.nodeStatus}
                </span>
              </div>
              <h4 className="font-display font-bold text-[#F2F7F3] text-sm uppercase">{node.region}</h4>
              <p className="text-[10px] text-[#69786F] font-mono">K8s: {node.kubernetesVersion}</p>
            </div>

            <div className="p-3 bg-[#1D1013] rounded-[4px] border border-[rgba(240, 160, 180,0.1)] space-y-2 text-xs font-mono">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#69786F]">CPU Load</span>
                  <span className="text-[#F2F7F3] font-bold">{node.cpuUsagePercent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#2A141A] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      node.cpuUsagePercent > 60
                        ? "bg-amber-400"
                        : "bg-gradient-to-r from-[#FF4D6D] to-[#FF758F]"
                    }`}
                    style={{ width: `${node.cpuUsagePercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#69786F]">Memory Allocation</span>
                  <span className="text-[#F2F7F3] font-bold">{node.memoryUsagePercent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#2A141A] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF758F] to-[#FF4D6D]"
                    style={{ width: `${node.memoryUsagePercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[rgba(240, 160, 180,0.1)] text-xs font-mono">
              <span className="text-[#A0AEA5]">{node.activePodsCount} Active Pods</span>
              <span className="text-[#FF4D6D] flex items-center gap-1 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                Live Node
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}