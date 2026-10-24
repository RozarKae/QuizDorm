"use client";

import Link from "next/link";
import {
  Users,
  Shield,
  BookOpen,
  Settings,
  Cpu,
  Zap,
  Activity,
  Layers,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Server,
  Database,
  BarChart3,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const stats = [
    {
      title: "Total Platform Users",
      value: "1,248",
      subtext: "Across 48 institutions",
      change: "+12% this month",
      isPositive: true,
      icon: <Users className="h-4 w-4 text-[#FF4D6D]" />,
    },
    {
      title: "Active Licenses",
      value: "48",
      subtext: "Enterprise & Campus tiers",
      change: "+3 new campuses",
      isPositive: true,
      icon: <BookOpen className="h-4 w-4 text-[#FF758F]" />,
    },
    {
      title: "Platform Security",
      value: "99.98%",
      subtext: "0 threat anomalies",
      change: "Optimal",
      isPositive: true,
      icon: <Shield className="h-4 w-4 text-[#FF4D6D]" />,
    },
    {
      title: "Cluster Load & Latency",
      value: "12%",
      subtext: "42ms median response",
      change: "Normal load",
      isPositive: true,
      icon: <Cpu className="h-4 w-4 text-[#FF758F]" />,
    },
  ];

  const infrastructureNodes = [
    {
      name: "QuizDorm AI Generation Engine",
      provider: "QuizDorm Multi-Model AI Router",
      status: "100% Operational",
      latency: "420ms",
      load: "18%",
      color: "text-[#FF4D6D]",
    },
    {
      name: "Realtime Arena Broadcast Engine",
      provider: "Server-Sent Events (SSE) Mesh",
      status: "Operational",
      latency: "18ms",
      load: "8%",
      color: "text-[#FF4D6D]",
    },
    {
      name: "Persistence & Vector Knowledge Store",
      provider: "Supabase PostgreSQL + pgvector",
      status: "Healthy",
      latency: "28ms",
      load: "14%",
      color: "text-[#FF758F]",
    },
    {
      name: "Edge Delivery Network & Assets",
      provider: "Vercel Global Edge Network",
      status: "99.99% Hit Ratio",
      latency: "12ms",
      load: "5%",
      color: "text-[#FF4D6D]",
    },
  ];

  const quickActions = [
    {
      title: "Users & Identity Access (IAM)",
      description: "Manage logins, UUIDs, elevate or downgrade roles, ban rogue users, and reset credentials.",
      href: "/admin/users",
      icon: <Users className="h-4 w-4 text-[#FF4D6D]" />,
      actionLabel: "User Directory",
    },
    {
      title: "Active Session & Token Control",
      description: "Monitor live authenticated client devices, IP geolocation telemetry, and revoke compromised tokens.",
      href: "/admin/sessions",
      icon: <Server className="h-4 w-4 text-[#FF758F]" />,
      actionLabel: "Session Monitor",
    },
    {
      title: "AI Engine & Prompt Studio",
      description: "Manage API keys, routing fallback tiers, rate limits, and custom prompt templates.",
      href: "/admin/ai",
      icon: <Sparkles className="h-4 w-4 text-[#FF4D6D]" />,
      actionLabel: "AI Studio",
    },
    {
      title: "Master Organization Governance",
      description: "Approve pending campuses, configure custom subdomains, and assign enterprise tier quotas.",
      href: "/admin/organizations",
      icon: <Layers className="h-4 w-4 text-[#FF4D6D]" />,
      actionLabel: "Master Orgs",
    },
    {
      title: "Enterprise Tenant Licensing",
      description: "Manage institutional tiers, credit quotas, seat allocations, and contract renewals.",
      href: "/admin/enterprise",
      icon: <Layers className="h-4 w-4" />,
      actionLabel: "Licensing Hub",
    },
    {
      title: "Cloud Infrastructure & Ops",
      description: "Inspect cluster uptime, real-time memory usage, and background cron schedules.",
      href: "/dashboard/cloud-ops",
      icon: <Server className="h-4 w-4 text-[#FF758F]" />,
      actionLabel: "Cloud Ops",
    },
    {
      title: "Financial & Billing Suite",
      description: "Track monthly recurring revenue, credit usage consumption, and enterprise invoices.",
      href: "/admin/billing",
      icon: <CreditCard className="h-4 w-4" />,
      actionLabel: "Billing Suite",
    },
    {
      title: "Platform Security & Logs",
      description: "Audit authentication events, role elevation requests, and API access tokens.",
      href: "/admin/analytics",
      icon: <Shield className="h-4 w-4" />,
      actionLabel: "Security Center",
    },
    {
      title: "Platform Reports & Audits",
      description: "Generate tenant compliance exports, system health audits, and usage packages.",
      href: "/admin/reports",
      icon: <BarChart3 className="h-4 w-4" />,
      actionLabel: "Platform Reports",
    },
  ];

  const activities = [
    {
      id: "1",
      title: "New campus onboarded: Government Model HSS Saidapet",
      description: "32 faculty licenses and 850 student seats provisioned under Enterprise tier.",
      time: "12 mins ago",
    },
    {
      id: "2",
      title: "Platform release v2.6 verified",
      description: "Zero downtime deployment completed across all 117 production endpoints.",
      time: "1 hour ago",
    },
    {
      id: "3",
      title: "Automated database backup finalized",
      description: "Snapshot verified and encrypted at rest in secondary cloud region.",
      time: "4 hours ago",
    },
    {
      id: "4",
      title: "WAF threat mitigation report",
      description: "Blocked 14 rogue scraping attempts; no credentials compromised.",
      time: "Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255, 77, 109,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                Root Authority // Master Platform Governance
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">Super Admin Command OS</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Super Admin Platform Command Center
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Monitor multi-tenant cloud infrastructure, AI quiz engine activity, school licensing, and security health in real time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/admin/ai">
              <Button className="h-10 px-5 rounded-[4px] bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(255, 77, 109,0.25)]">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                AI Studio
              </Button>
            </Link>
            <Link href="/dashboard/cloud-ops">
              <Button
                variant="outline"
                className="h-10 px-5 rounded-[4px] border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:border-[#FF4D6D]/50 hover:text-[#FF4D6D] font-mono text-xs uppercase font-bold tracking-wider"
              >
                Cloud Ops
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Platform Stats HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] hover:border-[rgba(240, 160, 180,0.28)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
                {stat.title}
              </span>
              <div className="p-1 rounded-[3px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)]">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2F7F3] tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#A0AEA5] mt-0.5 font-sans">{stat.subtext}</p>
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Workspace Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Infrastructure & Operations Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* Infrastructure Health Status Matrix */}
          <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(240, 160, 180,0.12)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#FF4D6D] rounded-[1px] shadow-[0_0_6px_#FF4D6D]" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                  Core Infrastructure Mesh Status
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#FF4D6D] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                All Systems Nominal
              </span>
            </div>

            <div className="space-y-3">
              {infrastructureNodes.map((node) => (
                <div
                  key={node.name}
                  className="p-3.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#F2F7F3]">{node.name}</h4>
                    <p className="font-mono text-[11px] text-[#A0AEA5] mt-0.5">{node.provider}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                    <div className="text-right">
                      <span className="text-[#69786F] block text-[10px] uppercase">Latency</span>
                      <span className="text-[#F2F7F3] font-bold">{node.latency}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#69786F] block text-[10px] uppercase">Load</span>
                      <span className="text-[#F2F7F3] font-bold">{node.load}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.2)]">
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Matrix */}
          <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-5">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[rgba(240, 160, 180,0.12)]">
              <div className="w-1.5 h-3 bg-[#FF758F] rounded-[1px] shadow-[0_0_6px_#FF758F]" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                Superadmin Platform Operations
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group block p-4 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)] hover:border-[#FF4D6D]/50 hover:bg-[#2A141A] transition-all relative"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[#FF4D6D]">
                      {action.icon}
                      <h4 className="font-display text-sm font-bold text-[#F2F7F3] group-hover:text-[#FF4D6D] transition-colors">
                        {action.title}
                      </h4>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#69786F] group-hover:text-[#FF4D6D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="mt-2 text-xs text-[#A0AEA5] leading-relaxed line-clamp-2">
                    {action.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-[#FF4D6D] tracking-wider">
                    <span>{action.actionLabel}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Security Stream & Audit */}
        <div className="space-y-6">
          <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(240, 160, 180,0.12)]">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#FF4D6D]" />
                <h3 className="font-display text-xs uppercase font-bold tracking-wider text-[#F2F7F3]">
                  System Audit & Security Feed
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#FF4D6D] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-ping" />
                Live
              </span>
            </div>

            <div className="divide-y divide-[rgba(240, 160, 180,0.08)]">
              {activities.map((act) => (
                <div key={act.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#F2F7F3] leading-snug">{act.title}</p>
                    <span className="font-mono text-[10px] text-[#69786F] shrink-0">{act.time}</span>
                  </div>
                  <p className="text-[11px] text-[#A0AEA5] leading-relaxed">{act.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Diagnostics Link Card */}
          <div className="p-4 rounded-[6px] bg-[rgba(255, 77, 109,0.06)] border border-[rgba(255, 77, 109,0.2)] space-y-2">
            <div className="flex items-center gap-2 text-[#FF4D6D]">
              <Sparkles className="h-4 w-4" />
              <h4 className="font-display text-xs uppercase font-bold text-[#F2F7F3]">
                AI Multi-Model Router
              </h4>
            </div>
            <p className="text-xs text-[#A0AEA5] leading-relaxed">
              QuizDorm AI models active as primary engines with automatic fallback engaged if provider latency exceeds 2.5s.
            </p>
            <Link
              href="/admin/ai"
              className="inline-block mt-1 font-mono text-[10px] text-[#FF4D6D] hover:underline font-bold uppercase tracking-wider"
            >
              Configure AI Providers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}