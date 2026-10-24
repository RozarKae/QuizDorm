"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Laptop,
  Smartphone,
  Tablet,
  Radio,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Clock,
  Search,
  Filter,
  RefreshCw,
  PowerOff,
  UserX,
  Copy,
  ExternalLink,
  Lock,
  XCircle,
  CheckCircle2,
  Cpu,
  Trash2,
  Server,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AdminSession,
  AdminSessionManager,
  SessionStatus,
  SessionRiskScore,
  DeviceCategory,
} from "@/lib/admin/sessionManager";
import { getRoleDisplayName } from "@/lib/types/user";

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [deviceFilter, setDeviceFilter] = useState<string>("all");

  // Inspection Modal State
  const [selectedSession, setSelectedSession] = useState<AdminSession | null>(null);

  // Load sessions
  useEffect(() => {
    setSessions(AdminSessionManager.getSessions());
  }, []);

  const refreshList = () => {
    setSessions(AdminSessionManager.getSessions());
  };

  // Filter logic
  const filteredSessions = sessions.filter((s) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      s.userName.toLowerCase().includes(query) ||
      s.userEmail.toLowerCase().includes(query) ||
      s.ipAddress.toLowerCase().includes(query) ||
      s.location.toLowerCase().includes(query) ||
      s.browser.toLowerCase().includes(query) ||
      s.os.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const matchesRisk =
      riskFilter === "all" ||
      (riskFilter === "high_critical"
        ? s.riskScore === "high" || s.riskScore === "critical"
        : s.riskScore === riskFilter);
    const matchesDevice = deviceFilter === "all" || s.deviceCategory === deviceFilter;

    return matchesSearch && matchesStatus && matchesRisk && matchesDevice;
  });

  // Action Handlers
  const handleRevokeSession = (session: AdminSession, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (session.isCurrentSession) {
      if (!confirm("This is your CURRENT active Superadmin session. Revoking it will log you out immediately. Proceed?")) {
        return;
      }
    }

    const updated = AdminSessionManager.revokeSession(session.id);
    setSessions(updated);
    if (selectedSession?.id === session.id) {
      setSelectedSession({ ...selectedSession, status: "revoked" });
    }

    toast.error(`Session Terminated: ${session.id}`, {
      description: `JWT token invalidated for ${session.userEmail} on ${session.browser}.`,
    });
  };

  const handleRevokeAllForUser = (session: AdminSession, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (confirm(`Revoke ALL active device sessions for ${session.userName} (${session.userEmail})?`)) {
      const updated = AdminSessionManager.revokeAllForUser(session.userId);
      setSessions(updated);
      toast.error(`All Sessions Terminated: ${session.userName}`, {
        description: `Logged out across all concurrent devices.`,
      });
    }
  };

  const handlePurgeInactive = () => {
    const updated = AdminSessionManager.purgeRevokedAndIdle();
    setSessions(updated);
    toast.success("Inactive Sessions Purged", {
      description: "Cleared all terminated and idle session nodes from cache.",
    });
  };

  const handleCopy = (text: string, label: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      description: text,
    });
  };

  // Metrics Counters
  const activeSessionsCount = sessions.filter((s) => s.status === "active").length;
  const uniqueUsersCount = new Set(
    sessions.filter((s) => s.status === "active").map((s) => s.userId)
  ).size;
  const flaggedNodesCount = sessions.filter(
    (s) => s.riskScore === "high" || s.riskScore === "critical"
  ).length;
  const idleSessionsCount = sessions.filter((s) => s.status === "idle").length;

  const getDeviceIcon = (category: DeviceCategory) => {
    switch (category) {
      case "mobile":
        return <Smartphone className="h-4 w-4 text-[#FF758F]" />;
      case "tablet":
        return <Tablet className="h-4 w-4 text-[#FF758F]" />;
      case "bot":
      case "headless":
        return <AlertTriangle className="h-4 w-4 text-[#F87171]" />;
      default:
        return <Laptop className="h-4 w-4 text-[#FF4D6D]" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255, 77, 109,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-ping" />
                Live Telemetry // Session Gateway
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">Token Control</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Active Session Command & Device Control
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Real-time audit of concurrent authenticated client nodes, IP geolocations, token lifespans, and instant multi-device revocation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              onClick={handlePurgeInactive}
              variant="outline"
              className="h-10 px-4 rounded-[4px] border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#FF4D6D]/40 font-mono text-xs uppercase font-bold tracking-wider"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Purge Inactive
            </Button>
            <Button
              onClick={refreshList}
              className="h-10 px-4 rounded-[4px] bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(255, 77, 109,0.25)]"
            >
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Sync Stream
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Precision HUD Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Live Active Sessions
            </span>
            <Radio className="h-4 w-4 text-[#FF4D6D]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FF4D6D] tabular-nums">
              {activeSessionsCount}
            </p>
            <span className="font-mono text-[10px] text-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] px-1.5 py-0.5 rounded-[2px]">
              Connected Now
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Unique Active Users
            </span>
            <ShieldCheck className="h-4 w-4 text-[#FF758F]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#F2F7F3] tabular-nums">
              {uniqueUsersCount}
            </p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">Concurrent Users</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              High-Risk / Suspicious
            </span>
            <ShieldAlert className="h-4 w-4 text-[#F87171]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#F87171] tabular-nums">
              {flaggedNodesCount}
            </p>
            <span className="font-mono text-[10px] text-[#F87171] bg-[rgba(248,113,113,0.1)] px-1.5 py-0.5 rounded-[2px]">
              Tor / Scrapers
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Idle Sessions
            </span>
            <Clock className="h-4 w-4 text-[#69786F]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#A0AEA5] tabular-nums">
              {idleSessionsCount}
            </p>
            <span className="font-mono text-[10px] text-[#69786F]">Awaiting Expiry</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Multi-Filter Matrix */}
      <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#69786F]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by user, IP address, OS, city, or session ID..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#FF4D6D]/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#FF4D6D]/50"
            >
              <option value="all">All States</option>
              <option value="active">Active Streams</option>
              <option value="idle">Idle Sessions</option>
              <option value="flagged">Flagged / High Risk</option>
              <option value="revoked">Terminated / Revoked</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div className="md:col-span-2">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#FF4D6D]/50"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk (Verified)</option>
              <option value="medium">Medium Risk</option>
              <option value="high_critical">High & Critical Risk</option>
            </select>
          </div>

          {/* Device Category Filter */}
          <div className="md:col-span-2">
            <select
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#FF4D6D]/50"
            >
              <option value="all">All Devices</option>
              <option value="desktop">Desktop / Workstation</option>
              <option value="mobile">Mobile Phones</option>
              <option value="tablet">Tablets & iPads</option>
              <option value="bot">Automated / Bots</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-1 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setRiskFilter("all");
                setDeviceFilter("all");
                refreshList();
              }}
              className="h-9 w-full md:w-auto px-2.5 border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
              title="Reset Filters"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Active Sessions Table */}
      <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1D1013] border-b border-[rgba(240, 160, 180,0.14)] text-[#69786F] font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Client Device & OS</th>
                <th className="px-4 py-3">Authenticated Account</th>
                <th className="px-4 py-3">Network IP & Origin</th>
                <th className="px-4 py-3">State & Threat Level</th>
                <th className="px-4 py-3">Heartbeat / Expiry</th>
                <th className="px-4 py-3 text-right">Revocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(240, 160, 180,0.08)]">
              {filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[#A0AEA5]">
                    <div className="max-w-sm mx-auto space-y-2">
                      <Radio className="h-8 w-8 mx-auto text-[#69786F]" />
                      <p className="font-semibold text-sm text-[#F2F7F3]">No Active Sessions Matching Query</p>
                      <p className="text-xs text-[#69786F]">
                        Try resetting filters or adjusting search parameters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session) => {
                  const isRevoked = session.status === "revoked";
                  const isFlagged = session.status === "flagged";
                  return (
                    <tr
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className={`hover:bg-[#1D1013]/60 transition-colors cursor-pointer ${
                        isRevoked
                          ? "opacity-50 bg-[rgba(248,113,113,0.03)]"
                          : isFlagged
                          ? "bg-[rgba(248,113,113,0.06)]"
                          : ""
                      }`}
                    >
                      {/* Device & OS */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] shrink-0">
                            {getDeviceIcon(session.deviceCategory)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-[#F2F7F3] block">
                                {session.browser}
                              </span>
                              {session.isCurrentSession && (
                                <span className="px-1.5 py-0.2 rounded-[2px] text-[9px] font-mono font-bold uppercase bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[#FF4D6D]/30">
                                  Current Device
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[10px] text-[#A0AEA5] block mt-0.5">
                              {session.os}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* User Account */}
                      <td className="px-4 py-3.5">
                        <span className="font-medium text-[#F2F7F3] block">
                          {session.userName}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px] text-[#69786F]">
                          <span className="truncate max-w-[160px]">{session.userEmail}</span>
                          <span>•</span>
                          <span className="text-[#FF4D6D] uppercase font-bold">
                            {getRoleDisplayName(session.userRole)}
                          </span>
                        </div>
                      </td>

                      {/* IP & Geolocation */}
                      <td className="px-4 py-3.5 font-mono text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#F2F7F3] font-bold">{session.ipAddress}</span>
                          <button
                            onClick={(e) => handleCopy(session.ipAddress, "IP Address", e)}
                            className="text-[#69786F] hover:text-[#FF4D6D] transition-colors"
                            title="Copy IP"
                          >
                            <Copy className="h-2.5 w-2.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-[#A0AEA5] block mt-0.5 truncate max-w-[200px]">
                          {session.location}
                        </span>
                      </td>

                      {/* Status & Threat */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase ${
                              session.status === "active"
                                ? "bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]"
                                : session.status === "idle"
                                ? "bg-[rgba(240, 160, 180,0.1)] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.2)]"
                                : session.status === "flagged"
                                ? "bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.3)]"
                                : "bg-[rgba(248,113,113,0.08)] text-[#A0AEA5] line-through border border-[rgba(240, 160, 180,0.15)]"
                            }`}
                          >
                            {session.status === "active" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                            )}
                            {session.status}
                          </span>

                          <span
                            className={`px-1.5 py-0.5 rounded-[2px] font-mono text-[9px] font-bold uppercase ${
                              session.riskScore === "critical"
                                ? "bg-[rgba(248,113,113,0.2)] text-[#F87171] border border-[#F87171]/40"
                                : session.riskScore === "high"
                                ? "bg-[rgba(251,191,36,0.2)] text-[#FBBF24] border border-[#FBBF24]/40"
                                : "text-[#69786F]"
                            }`}
                          >
                            {session.riskScore !== "low" && `Threat: ${session.riskScore}`}
                          </span>
                        </div>
                      </td>

                      {/* Heartbeat / Expiry */}
                      <td className="px-4 py-3.5 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5 text-[#F2F7F3]">
                          <Clock className="h-3 w-3 text-[#FF4D6D]" />
                          <span>Active {session.lastActiveAt}</span>
                        </div>
                        <span className="text-[10px] text-[#69786F] block mt-0.5">
                          Expires: {session.jwtExpiresAt}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {session.status !== "revoked" ? (
                            <>
                              <button
                                onClick={(e) => handleRevokeSession(session, e)}
                                className="px-2.5 py-1 rounded-[3px] border border-[rgba(248,113,113,0.25)] text-[#F87171] hover:bg-[rgba(248,113,113,0.12)] font-mono text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                                title="Terminate Session Token"
                              >
                                <PowerOff className="h-3 w-3" />
                                <span>Revoke</span>
                              </button>

                              <button
                                onClick={(e) => handleRevokeAllForUser(session, e)}
                                className="p-1 rounded-[3px] border border-[rgba(240, 160, 180,0.15)] text-[#A0AEA5] hover:text-[#F87171] hover:bg-[rgba(248,113,113,0.08)] transition-colors"
                                title="Log Out User From All Devices"
                              >
                                <UserX className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <span className="font-mono text-[10px] text-[#69786F] uppercase">
                              Revoked
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Deep Session Dossier Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0708]/85 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.2)] p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-start justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-[4px] bg-[#2A141A] border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D]">
                  {getDeviceIcon(selectedSession.deviceCategory)}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                    {selectedSession.browser} on {selectedSession.os}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-[#A0AEA5]">
                    <span>Node ID: {selectedSession.id}</span>
                    <span>•</span>
                    <span className="text-[#FF4D6D]">{selectedSession.userName}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedSession(null)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Authenticated Account</span>
                <span className="text-[#F2F7F3] font-bold select-all">{selectedSession.userEmail}</span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Session State</span>
                <span
                  className={`font-bold uppercase ${
                    selectedSession.status === "active"
                      ? "text-[#FF4D6D]"
                      : selectedSession.status === "flagged"
                      ? "text-[#F87171]"
                      : "text-[#A0AEA5]"
                  }`}
                >
                  {selectedSession.status}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Client Network IP</span>
                <span className="text-[#F2F7F3] font-bold">{selectedSession.ipAddress}</span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Origin Geolocation</span>
                <span className="text-[#F2F7F3]">{selectedSession.location}</span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Threat Evaluation</span>
                <span
                  className={`font-bold uppercase ${
                    selectedSession.riskScore === "critical"
                      ? "text-[#F87171]"
                      : selectedSession.riskScore === "high"
                      ? "text-[#FBBF24]"
                      : "text-[#FF4D6D]"
                  }`}
                >
                  {selectedSession.riskScore}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Client Fingerprint</span>
                <span className="text-[#FF4D6D]">{selectedSession.clientFingerprint}</span>
              </div>
            </div>

            {/* Raw User Agent Box */}
            <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)] font-mono text-[10px] space-y-1">
              <span className="text-[#69786F] uppercase block">Raw HTTP User-Agent String:</span>
              <p className="text-[#A0AEA5] break-all leading-relaxed bg-[#140C0E] p-2 rounded-[3px] border border-[rgba(240, 160, 180,0.08)]">
                {selectedSession.userAgent}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[rgba(240, 160, 180,0.12)]">
              {selectedSession.status !== "revoked" ? (
                <Button
                  variant="outline"
                  onClick={() => handleRevokeSession(selectedSession)}
                  className="border-[rgba(248,113,113,0.3)] text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] text-xs font-mono h-9 uppercase tracking-wider"
                >
                  <PowerOff className="mr-1.5 h-3.5 w-3.5" />
                  Terminate Session
                </Button>
              ) : (
                <span className="text-xs font-mono text-[#F87171] font-bold uppercase">
                  Session Node Terminated
                </span>
              )}

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleCopy(selectedSession.id, "Session ID")}
                  className="bg-[#1D1013] border border-[rgba(240, 160, 180,0.2)] text-[#F2F7F3] hover:text-[#FF4D6D] text-xs font-mono h-9"
                >
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy ID
                </Button>
                <Button
                  onClick={() => setSelectedSession(null)}
                  className="bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 text-xs font-mono font-bold h-9 uppercase"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
