"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Globe, Building2, CheckCircle2, Sparkles, Cpu, Award
} from "lucide-react";
import { toast } from "sonner";

interface NetworkNode {
  nodeName: string;
  category: "Government Edu Program" | "International University Consortium" | "Corporate Academy";
  region: string;
  activeLearners: number;
  status: "Connected to EduOS Mainnet";
}

const mockNodes: NetworkNode[] = [
  { nodeName: "National Digital Education Gateway (India & UK)", category: "Government Edu Program", region: "AP-South & EU-West", activeLearners: 4200000, status: "Connected to EduOS Mainnet" },
  { nodeName: "Global Quantum Physics Research Consortium", category: "International University Consortium", region: "Worldwide Multi-Region", activeLearners: 890000, status: "Connected to EduOS Mainnet" },
];

export function GlobalEducationEcosystem() {
  const [nodes, setNodes] = useState<NetworkNode[]>(mockNodes);

  const handleConnectNode = () => {
    toast.success("Connected new National Education Program node to QuizDorm EduOS Mainnet!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-3 border border-rose-500/30">
            <Globe className="w-3.5 h-3.5 text-rose-400" /> Worldwide Education Operating System (EduOS)
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Global Education Ecosystem & EduOS Network</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Worldwide education network connecting national government digital learning programs, international university research consortiums, corporate learning academies, and certification authorities.
          </p>
        </div>

        <Button onClick={handleConnectNode} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5" /> Connect Ecosystem Node
        </Button>
      </div>

      {/* Network Nodes Grid */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-mono text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <Globe className="w-4 h-4" /> EduOS Active Federated Nodes Map
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Total Federated Learners: 5.09M</span>
        </div>

        <div className="space-y-3">
          {nodes.map((n) => (
            <div key={n.nodeName} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">{n.nodeName}</span>
                <span className="text-rose-400 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {n.status}
                </span>
              </div>
              <p className="text-slate-300">Category: {n.category} • Region: {n.region}</p>
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Active Learners: {n.activeLearners.toLocaleString()}</span>
                <span>Latency: 14ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
