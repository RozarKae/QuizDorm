"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  const routes = [
    { title: "Global EduCloud OS (Phase 4.9)", href: "/dashboard/cloud-ops" },
    { title: "Education Marketplace (Phase 4.8)", href: "/dashboard/marketplace" },
    { title: "Global Certifications (Phase 4.7)", href: "/dashboard/certifications" },
    { title: "Research & Content Studio (Phase 4.6)", href: "/dashboard/research-studio" },
    { title: "Academic Administration ERP (Phase 4.5)", href: "/dashboard/administration" },
    { title: "AI Teaching Assistant (Phase 4.4)", href: "/dashboard/ai-assistant" },
    { title: "LMS Platform (Phase 4.3)", href: "/dashboard/lms" },
    { title: "Examination Platform (Phase 4.2)", href: "/dashboard/examination" },
    { title: "Digital Classroom Suite (Phase 4.1)", href: "/dashboard/classroom" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-white text-slate-900 font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-bold">QuizDorm Dashboard</h1>
        <p className="text-xs text-slate-500">System metrics and platform modules overview.</p>
      </div>

      {/* Direct Module Links */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Platform Suites & Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {routes.map((r) => (
            <Link key={r.href} href={r.href}>
              <Button variant="outline" className="w-full justify-start text-xs border-slate-200 hover:bg-slate-100 font-medium">
                {r.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Metrics List */}
      <div className="space-y-2 pt-4 border-t border-slate-200">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">System Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 border border-slate-200 rounded">
            <span className="text-slate-500 block text-[10px]">Active Learners</span>
            <span className="font-bold text-base">12,450</span>
          </div>
          <div className="p-3 border border-slate-200 rounded">
            <span className="text-slate-500 block text-[10px]">Question Bank</span>
            <span className="font-bold text-base">1,280</span>
          </div>
          <div className="p-3 border border-slate-200 rounded">
            <span className="text-slate-500 block text-[10px]">Competitions</span>
            <span className="font-bold text-base">34</span>
          </div>
          <div className="p-3 border border-slate-200 rounded">
            <span className="text-slate-500 block text-[10px]">Institutions</span>
            <span className="font-bold text-base">186</span>
          </div>
        </div>
      </div>
    </div>
  );
}
