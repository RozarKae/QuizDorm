"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  CreditCard,
  Sparkles,
  Trophy,
  Award,
  CheckCircle2,
  Clock,
  UserX,
  UserCheck,
  RefreshCw,
  Plus,
  ShieldAlert,
  ArrowLeft,
  ChevronRight,
  Flame,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AdminUser, AdminUserManager } from "@/lib/admin/userManager";

interface ScholarSubscriber {
  id: string;
  name: string;
  email: string;
  tier: "free" | "basic" | "pro" | "annual";
  status: "active" | "suspended" | "trial";
  quizzesCompleted: number;
  studyStreakDays: number;
  monthlyQuotaUsed: number;
  monthlyQuotaLimit: number;
  joinedDate: string;
  lastActive: string;
}

const SEED_SUBSCRIBERS: ScholarSubscriber[] = [
  {
    id: "usr-sub-101",
    name: "Devon Reed",
    email: "subscriber@quizdorm.com",
    tier: "pro",
    status: "active",
    quizzesCompleted: 64,
    studyStreakDays: 19,
    monthlyQuotaUsed: 42,
    monthlyQuotaLimit: 100,
    joinedDate: "2025-08-14",
    lastActive: "12 mins ago",
  },
  {
    id: "usr-sub-102",
    name: "Kavya Subramaniam",
    email: "kavya.subramaniam@gmail.com",
    tier: "annual",
    status: "active",
    quizzesCompleted: 142,
    studyStreakDays: 45,
    monthlyQuotaUsed: 88,
    monthlyQuotaLimit: 500,
    joinedDate: "2025-06-01",
    lastActive: "25 mins ago",
  },
  {
    id: "usr-sub-103",
    name: "Marcus Vance",
    email: "marcus.vance@stanford.alumni.edu",
    tier: "basic",
    status: "active",
    quizzesCompleted: 38,
    studyStreakDays: 7,
    monthlyQuotaUsed: 18,
    monthlyQuotaLimit: 30,
    joinedDate: "2025-10-12",
    lastActive: "1 hour ago",
  },
  {
    id: "usr-sub-104",
    name: "Priya Nair",
    email: "priya.nair@aiims.res.in",
    tier: "pro",
    status: "active",
    quizzesCompleted: 96,
    studyStreakDays: 28,
    monthlyQuotaUsed: 64,
    monthlyQuotaLimit: 100,
    joinedDate: "2025-09-04",
    lastActive: "3 hours ago",
  },
  {
    id: "usr-sub-105",
    name: "Liam O'Connor",
    email: "liam.oconnor@tcd.ie",
    tier: "free",
    status: "trial",
    quizzesCompleted: 12,
    studyStreakDays: 3,
    monthlyQuotaUsed: 10,
    monthlyQuotaLimit: 10,
    joinedDate: "2026-01-20",
    lastActive: "Yesterday",
  },
  {
    id: "usr-sub-106",
    name: "Ayesha Siddiqui",
    email: "ayesha.s@karachi-prep.edu",
    tier: "annual",
    status: "active",
    quizzesCompleted: 210,
    studyStreakDays: 62,
    monthlyQuotaUsed: 120,
    monthlyQuotaLimit: 500,
    joinedDate: "2025-05-18",
    lastActive: "4 hours ago",
  },
  {
    id: "usr-sub-107",
    name: "Scraper Bot Network #4",
    email: "bot-spammer@crawler-network.net",
    tier: "free",
    status: "suspended",
    quizzesCompleted: 1,
    studyStreakDays: 0,
    monthlyQuotaUsed: 1,
    monthlyQuotaLimit: 10,
    joinedDate: "2026-10-18",
    lastActive: "3 days ago (Banned)",
  },
];

export default function MasterAdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<ScholarSubscriber[]>(SEED_SUBSCRIBERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSubscribers = subscribers.filter((sub) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      sub.name.toLowerCase().includes(q) ||
      sub.email.toLowerCase().includes(q) ||
      sub.id.toLowerCase().includes(q);

    const matchesTier = tierFilter === "all" || sub.tier === tierFilter;
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleToggleStatus = (sub: ScholarSubscriber) => {
    const nextStatus = sub.status === "active" ? "suspended" : "active";
    setSubscribers((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: nextStatus } : s))
    );
    toast.success(`Subscriber ${sub.name} is now ${nextStatus.toUpperCase()}`);
  };

  const handleUpgradeTier = (sub: ScholarSubscriber, newTier: ScholarSubscriber["tier"]) => {
    setSubscribers((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, tier: newTier } : s))
    );
    toast.success(`Upgraded ${sub.name} to ${newTier.toUpperCase()} tier`);
  };

  const totalActive = subscribers.filter((s) => s.status === "active").length;
  const proCount = subscribers.filter((s) => s.tier === "pro" || s.tier === "annual").length;
  const totalCompleted = subscribers.reduce((acc, s) => acc + s.quizzesCompleted, 0);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255, 77, 109,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link
                href="/admin/master"
                className="text-xs font-mono text-[#69786F] hover:text-[#FF4D6D] flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Master Admin Hub
              </Link>
              <span className="text-[#69786F]">&bull;</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] font-mono text-[10px] font-bold uppercase tracking-widest">
                Subscriber OS
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Independent Scholars & Contenders
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Curate active subscriptions, AI generation quotas, quiz completions, and academic study streaks for independent subscribers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/dashboard/quizzes">
              <Button
                variant="outline"
                className="h-10 px-4 rounded-[4px] border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:text-[#FF4D6D] font-mono text-xs uppercase font-bold"
              >
                The Dorm Vault
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Metrics HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Active Subscribers
            </span>
            <Users className="h-4 w-4 text-[#FF4D6D]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#F2F7F3] tabular-nums">
              {totalActive}
            </p>
            <span className="font-mono text-[10px] text-[#FF4D6D]">In Active Cohort</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Pro & Annual Tiers
            </span>
            <Sparkles className="h-4 w-4 text-[#FF758F]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#FF758F] tabular-nums">
              {proCount}
            </p>
            <span className="font-mono text-[10px] text-[#FF758F]">Paid Scholars</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Total Quizzes Completed
            </span>
            <Trophy className="h-4 w-4 text-[#FF4D6D]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#FF4D6D] tabular-nums">
              {totalCompleted}
            </p>
            <span className="font-mono text-[10px] text-[#69786F]">Dorm Runs</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Peak Study Streak
            </span>
            <Flame className="h-4 w-4 text-[#FBBF24]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#FBBF24] tabular-nums">
              62 Days
            </p>
            <span className="font-mono text-[10px] text-[#FBBF24]">Top Contender</span>
          </div>
        </div>
      </div>

      {/* 3. Filters & Search */}
      <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#69786F]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search scholar by name, email, or UUID..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#FF4D6D]/50 transition-colors"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#FF4D6D]/50"
            >
              <option value="all">All Subscription Tiers</option>
              <option value="free">Free Scholar (10 Qs/mo)</option>
              <option value="basic">Scholar Basic (30 Qs/mo)</option>
              <option value="pro">Scholar Pro (100 Qs/mo)</option>
              <option value="annual">Scholar Annual (500 Qs/mo)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#FF4D6D]/50"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Accounts</option>
              <option value="trial">Trial Scholars</option>
              <option value="suspended">Suspended / Banned</option>
            </select>
          </div>

          <div className="md:col-span-1 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setTierFilter("all");
                setStatusFilter("all");
              }}
              className="h-9 w-full md:w-auto px-2.5 border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
              title="Reset Filters"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Subscribers Table */}
      <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(240, 160, 180,0.12)] bg-[#0B0708]/60 font-mono text-[10px] uppercase text-[#69786F] tracking-wider">
                <th className="px-4 py-3">Scholar Identity</th>
                <th className="px-4 py-3">Subscription Tier</th>
                <th className="px-4 py-3">Dorm Run Velocity</th>
                <th className="px-4 py-3">Quota Usage</th>
                <th className="px-4 py-3">Account Status</th>
                <th className="px-4 py-3 text-right">Master Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(240, 160, 180,0.08)]">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-xs font-mono text-[#69786F]">
                    No subscribers matched the specified filters.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-[#1D1013]/60 transition-colors"
                  >
                    {/* Scholar Identity */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#2A141A] border border-[rgba(255, 77, 109,0.3)] flex items-center justify-center font-mono font-bold text-xs text-[#FF4D6D]">
                          {sub.name.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#F2F7F3] block">
                            {sub.name}
                          </span>
                          <span className="font-mono text-[11px] text-[#A0AEA5]">
                            {sub.email}
                          </span>
                          <span className="font-mono text-[9px] text-[#69786F] block mt-0.5">
                            {sub.id} &bull; Joined {sub.joinedDate}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Subscription Tier */}
                    <td className="px-4 py-3.5 font-mono text-xs">
                      <select
                        value={sub.tier}
                        onChange={(e) =>
                          handleUpgradeTier(sub, e.target.value as ScholarSubscriber["tier"])
                        }
                        className={`text-xs px-2 py-1 rounded-[3px] font-mono font-bold uppercase tracking-wider border cursor-pointer ${
                          sub.tier === "annual"
                            ? "bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border-[rgba(255, 77, 109,0.35)]"
                            : sub.tier === "pro"
                            ? "bg-[rgba(255, 117, 143,0.15)] text-[#FF758F] border-[rgba(255, 117, 143,0.35)]"
                            : sub.tier === "basic"
                            ? "bg-[rgba(96,165,250,0.12)] text-[#60A5FA] border-[rgba(96,165,250,0.3)]"
                            : "bg-[#1D1013] text-[#A0AEA5] border-[rgba(240, 160, 180,0.15)]"
                        }`}
                      >
                        <option value="free">Free Scholar</option>
                        <option value="basic">Scholar Basic (₹149)</option>
                        <option value="pro">Scholar Pro (₹249)</option>
                        <option value="annual">Scholar Annual (₹649)</option>
                      </select>
                    </td>

                    {/* Dorm Velocity */}
                    <td className="px-4 py-3.5 font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5 text-[#FF4D6D]" />
                        <span className="text-[#F2F7F3] font-bold">
                          {sub.quizzesCompleted} Quizzes
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-[#FBBF24]">
                        <Flame className="h-3 w-3" />
                        <span>{sub.studyStreakDays} Day Streak</span>
                      </div>
                    </td>

                    {/* Quota Usage */}
                    <td className="px-4 py-3.5 font-mono text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#A0AEA5]">
                            {sub.monthlyQuotaUsed} / {sub.monthlyQuotaLimit} Qs
                          </span>
                          <span className="text-[#FF4D6D] font-bold">
                            {Math.round((sub.monthlyQuotaUsed / sub.monthlyQuotaLimit) * 100)}%
                          </span>
                        </div>
                        <div className="w-24 h-1.5 bg-[#2A141A] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF4D6D] rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round((sub.monthlyQuotaUsed / sub.monthlyQuotaLimit) * 100)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Account Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase ${
                          sub.status === "active"
                            ? "bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]"
                            : sub.status === "suspended"
                            ? "bg-[rgba(248,113,113,0.1)] text-[#F87171] border border-[rgba(248,113,113,0.25)]"
                            : "bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sub.status === "active"
                              ? "bg-[#FF4D6D]"
                              : sub.status === "suspended"
                              ? "bg-[#F87171]"
                              : "bg-[#FBBF24]"
                          }`}
                        />
                        {sub.status}
                      </span>
                      <span className="font-mono text-[9px] text-[#69786F] block mt-1">
                        Active {sub.lastActive}
                      </span>
                    </td>

                    {/* Master Controls */}
                    <td className="px-4 py-3.5 text-right font-mono text-xs">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(sub)}
                          className={`h-7 px-2.5 rounded-[3px] font-mono text-[10px] uppercase font-bold border transition-colors ${
                            sub.status === "active"
                              ? "border-[rgba(248,113,113,0.3)] text-[#F87171] hover:bg-[rgba(248,113,113,0.1)]"
                              : "border-[rgba(255, 77, 109,0.3)] text-[#FF4D6D] hover:bg-[rgba(255, 77, 109,0.1)]"
                          }`}
                        >
                          {sub.status === "active" ? (
                            <>
                              <UserX className="h-3 w-3 mr-1" /> Suspend
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-3 w-3 mr-1" /> Reinstate
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
