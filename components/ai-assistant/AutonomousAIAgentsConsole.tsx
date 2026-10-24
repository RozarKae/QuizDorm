"use client";

import React, { useState } from "react";
import { AutonomousAIAgent } from "@/lib/types/ai-assistant";
import { Button } from "@/components/ui/button";
import { 
  Bot, Play, RefreshCw, CheckCircle2, Terminal, Sparkles, Cpu, Layers
} from "lucide-react";
import { toast } from "sonner";

const mockAgents: AutonomousAIAgent[] = [
  { agentId: "agent-1", name: "Lesson Planning Agent", role: "Curriculum Specialist", description: "Automates daily & weekly lesson plans mapped to Bloom's Taxonomy", status: "Idle", lastTaskExecuted: "Generated Quantum Optics Plan", logs: ["Agent initialized", "Prompt template loaded"] },
  { agentId: "agent-2", name: "Question Generation Agent", role: "Assessment Architect", description: "Cooks up MCQs, quick questions, and rubrics with difficulty tuning", status: "Idle", lastTaskExecuted: "Built 10 Pauli Matrix MCQs", logs: ["Agent initialized"] },
  { agentId: "agent-3", name: "Assignment Agent", role: "Coursework Coordinator", description: "Formats lab assignments, rubrics, and submission dropboxes", status: "Idle", lastTaskExecuted: "Created Circuit Analysis Lab 2", logs: ["Agent initialized"] },
  { agentId: "agent-4", name: "Homework Agent", role: "Practice Engineer", description: "Generates weekly homework exercises & step-by-step solution keys", status: "Idle", lastTaskExecuted: "Generated Chapter 4 Homework", logs: ["Agent initialized"] },
  { agentId: "agent-5", name: "Classroom Management Agent", role: "In-Class Copilot", description: "Monitors real-time engagement and generates live discussion prompts", status: "Running", lastTaskExecuted: "Monitoring PHY-9042 Live Stream", logs: ["Monitoring engagement", "Engagement at 92%"] },
  { agentId: "agent-6", name: "Grading Agent", role: "Evaluation Evaluator", description: "Auto-grades objective tests & suggests descriptive feedback", status: "Idle", lastTaskExecuted: "Graded 36 Submissions for Lab 1", logs: ["Agent initialized"] },
  { agentId: "agent-7", name: "Student Mentor Agent", role: "Remediation Advisor", description: "Identifies weak topic gaps and constructs personalized revision drills", status: "Idle", lastTaskExecuted: "Created Remediation Plan for Alexander", logs: ["Agent initialized"] },
  { agentId: "agent-8", name: "Parent Communication Agent", role: "Stakeholder Liaison", description: "Drafts personalized parent updates & multi-language SMS reports", status: "Idle", lastTaskExecuted: "Drafted 4 Parent Performance Emails", logs: ["Agent initialized"] },
  { agentId: "agent-9", name: "Curriculum Advisor Agent", role: "Standards Mapper", description: "Aligns course topics to national accreditation standards", status: "Idle", lastTaskExecuted: "Mapped CS-401 to ABET Standards", logs: ["Agent initialized"] },
  { agentId: "agent-10", name: "Academic Research Agent", role: "Literature Scanner", description: "Scans recent academic papers & suggests relevant teaching papers", status: "Idle", lastTaskExecuted: "Scanned ArXiv for Qiskit Tutorials", logs: ["Agent initialized"] },
];

export function AutonomousAIAgentsConsole() {
  const [agents, setAgents] = useState<AutonomousAIAgent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<AutonomousAIAgent>(mockAgents[0]);

  const handleRunAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.agentId === id
          ? {
              ...a,
              status: "Running" as const,
              logs: [...a.logs, `[${new Date().toLocaleTimeString()}] Task execution initiated by instructor...`],
            }
          : a
      )
    );
    toast.success(`Autonomous Agent "${id}" started task execution!`);

    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.agentId === id
            ? {
                ...a,
                status: "Completed" as const,
                logs: [...a.logs, `[${new Date().toLocaleTimeString()}] Autonomous task executed successfully. Result verified.`],
              }
            : a
        )
      );
      toast.success(`Agent "${id}" completed task successfully!`);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <Bot className="w-3.5 h-3.5 text-purple-400" /> Multi-Agent AI Orchestration Architecture
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Autonomous Educational AI Agents</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Deploy specialized autonomous AI agents for lesson planning, question generation, grading, student mentoring, parent communication, and curriculum research.
          </p>
        </div>

        <div className="bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Agents</span>
          <p className="text-2xl font-black text-purple-400">10 Autonomous Nodes</p>
        </div>
      </div>

      {/* Agents Grid & Log View Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List Cards (Cols 2) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((ag) => (
            <div
              key={ag.agentId}
              onClick={() => setSelectedAgent(ag)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                selectedAgent.agentId === ag.agentId
                  ? "bg-purple-500/10 border-purple-500/40 ring-2 ring-purple-500/20 shadow-md"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      ag.status === "Running"
                        ? "bg-amber-500 text-black animate-pulse"
                        : ag.status === "Completed"
                        ? "bg-rose-500 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {ag.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{ag.name}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2">{ag.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Role: {ag.role}</span>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRunAgent(ag.agentId);
                  }}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] h-7 rounded-lg font-bold"
                >
                  <Play className="w-3 h-3 mr-1" /> Run Agent
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Agent Real-time Logs (Col 1) */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Agent Console Logs
              </span>
              <span className="text-[10px] text-slate-400">{selectedAgent.name}</span>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 h-64 overflow-y-auto">
              {selectedAgent.logs.map((log, idx) => (
                <div key={idx} className="text-rose-400">{log}</div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => handleRunAgent(selectedAgent.agentId)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
          >
            Execute Selected Agent Task
          </Button>
        </div>
      </div>
    </div>
  );
}
