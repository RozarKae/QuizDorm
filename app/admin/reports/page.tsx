"use client";

import { Button } from "@/components/ui/button";
import {
Download,
Filter
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const platformReports = [
    {
      id: "rep-101",
      name: "Tenant Quota & API Usage Audit — Q4",
      category: "Licensing",
      date: "2026-10-20",
      recordsCount: "48 Campuses",
      status: "Compliant",
      fileSize: "2.4 MB",
    },
    {
      id: "rep-102",
      name: "AI Multi-Model Latency & Synthetics Throughput",
      category: "Infrastructure",
      date: "2026-10-19",
      recordsCount: "142,500 Generations",
      status: "Optimal",
      fileSize: "5.1 MB",
    },
    {
      id: "rep-103",
      name: "WAF Security & Vulnerability Scan Log",
      category: "Security",
      date: "2026-10-18",
      recordsCount: "1.2M Events",
      status: "Clean",
      fileSize: "18.6 MB",
    },
    {
      id: "rep-104",
      name: "Global Edge Network Uptime & SSE Availability",
      category: "Infrastructure",
      date: "2026-10-15",
      recordsCount: "99.98% SLA",
      status: "Certified",
      fileSize: "1.1 MB",
    },
  ];

  const filtered =
    selectedCategory === "all"
      ? platformReports
      : platformReports.filter((r) => r.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleExport = (name: string) => {
    toast.success(`Exporting ${name}`, {
      description: "Platform audit log downloaded securely.",
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(240, 160, 180,0.14)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase font-bold text-[#FF4D6D] tracking-widest">
              SYSTEM ROOT // AUDIT & COMPLIANCE LOGS
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
            Platform Governance Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
            Generate system health audits, API throughput analytics, security incident reports, and tenant billing packages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleExport("Master-Platform-Audit-Report.json")}
            className="h-9 px-4 rounded-[4px] bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(255, 77, 109,0.2)]"
          >
            <Download className="mr-2 h-3.5 w-3.5" />
            Export System Log
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Platform Uptime SLA
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FF4D6D] tabular-nums">99.98%</p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">Last 90 days</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            AI Tokens Processed
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FF758F] tabular-nums">14.2M</p>
            <span className="font-mono text-[10px] text-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] px-1.5 py-0.5 rounded-[2px]">
              +18% this month
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Security Incident Count
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#F2F7F3] tabular-nums">0</p>
            <span className="font-mono text-[10px] text-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] px-1.5 py-0.5 rounded-[2px]">
              All Clear
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Tenant Quota Health
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FF4D6D] tabular-nums">100%</p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">48/48 Within Quota</span>
          </div>
        </div>
      </div>

      {/* 3. Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#FF4D6D]" />
          <span className="font-mono text-xs uppercase font-bold text-[#F2F7F3]">Filter by Category:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Audit Logs" },
            { id: "licensing", label: "Licensing" },
            { id: "infrastructure", label: "Infrastructure" },
            { id: "security", label: "Security" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1 rounded-[3px] font-mono text-[11px] font-bold uppercase transition-all ${
                selectedCategory === c.id
                  ? "bg-[#FF4D6D] text-[#0B0708]"
                  : "bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(240, 160, 180,0.14)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table */}
      <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1D1013] border-b border-[rgba(240, 160, 180,0.14)] text-[#69786F] font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Report Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Generated Date</th>
                <th className="px-4 py-3">Records Scope</th>
                <th className="px-4 py-3">File Size</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(240, 160, 180,0.08)]">
              {filtered.map((rep) => (
                <tr key={rep.id} className="hover:bg-[#1D1013]/60 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-[#F2F7F3]">
                    {rep.name}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#A0AEA5]">
                    {rep.category}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#69786F]">
                    {rep.date}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#F2F7F3]">
                    {rep.recordsCount}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#A0AEA5]">
                    {rep.fileSize}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.2)]">
                      {rep.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleExport(rep.name)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#FF4D6D] hover:underline uppercase"
                    >
                      <Download className="h-3 w-3" />
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}