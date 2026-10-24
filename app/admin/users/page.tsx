"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  Search,
  Filter,
  UserCheck,
  UserX,
  Key,
  Copy,
  Plus,
  RefreshCw,
  MoreVertical,
  Building,
  GraduationCap,
  School,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  Laptop,
  Globe,
  Trash2,
  Lock,
  ChevronRight,
  UserPlus,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  AdminUser,
  AdminUserManager,
  UserStatus,
  AuthProviderType,
} from "@/lib/admin/userManager";
import { UserRole, getRoleDisplayName } from "@/lib/types/user";
import { GovernanceSettingsManager } from "@/lib/admin/governanceSettingsManager";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  // Modals & Inspection State
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [resetCodeInfo, setResetCodeInfo] = useState<{
    user: AdminUser;
    code: string;
  } | null>(null);

  // New User Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("subscriber");
  const [newOrg, setNewOrg] = useState("Public Subscriber Community");
  const [newDept, setNewDept] = useState("General Department");

  // Platform Governance State
  const [instQuestionAllowed, setInstQuestionAllowed] = useState(true);

  // Load initial data
  useEffect(() => {
    setUsers(AdminUserManager.getUsers());
    setInstQuestionAllowed(GovernanceSettingsManager.getSettings().institutionQuestionBankAdding);
  }, []);

  const handleToggleInstitutionQuestionAdding = () => {
    const nextVal = !instQuestionAllowed;
    GovernanceSettingsManager.setInstitutionQuestionAdding(nextVal);
    setInstQuestionAllowed(nextVal);
    if (nextVal) {
      toast.success("Institution Question Adding ENABLED", {
        description: "Institutions can now create and import Question Bank items.",
      });
    } else {
      toast.warning("Institution Question Adding DISABLED", {
        description: "Only Platform Superadmin can now create or import questions. Institutions are blocked.",
      });
    }
  };

  const refreshList = () => {
    setUsers(AdminUserManager.getUsers());
  };

  // Filter Logic
  const filteredUsers = users.filter((u) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query) ||
      (u.organizationName && u.organizationName.toLowerCase().includes(query)) ||
      (u.department && u.department.toLowerCase().includes(query));

    const matchesRole =
      roleFilter === "all" ||
      u.role === roleFilter ||
      (roleFilter === "superadmin" && (u.role === "superadmin" || u.role === "admin")) ||
      (roleFilter === "masteradmin" && u.role === "masteradmin") ||
      (roleFilter === "employees" && (u.role === "handler" || u.role === "teacher")) ||
      (roleFilter === "institution" && (u.role === "institution" || u.role === "school")) ||
      (roleFilter === "handler" && (u.role === "handler" || u.role === "teacher")) ||
      (roleFilter === "member" && (u.role === "member" || u.role === "student")) ||
      (roleFilter === "subscriber" && u.role === "subscriber");
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    const matchesProvider =
      providerFilter === "all" || u.authProvider === providerFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesProvider;
  });

  // Action Handlers
  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    toast.success("User ID copied to clipboard", {
      description: id,
    });
  };

  const handleRoleChange = (user: AdminUser, targetRole: UserRole) => {
    const updated = AdminUserManager.updateUserRole(user.id, targetRole);
    setUsers(updated);
    if (selectedUser?.id === user.id) {
      setSelectedUser({ ...selectedUser, role: targetRole });
    }
    toast.success(`Role elevated to [${targetRole.toUpperCase()}]`, {
      description: `Privileges updated for ${user.name} (${user.email}).`,
    });
  };

  const handleToggleStatus = (user: AdminUser) => {
    const nextStatus: UserStatus = user.status === "active" ? "suspended" : "active";
    const updated = AdminUserManager.toggleUserStatus(user.id, nextStatus);
    setUsers(updated);
    if (selectedUser?.id === user.id) {
      setSelectedUser({ ...selectedUser, status: nextStatus });
    }
    if (nextStatus === "suspended") {
      toast.error(`Account Suspended: ${user.name}`, {
        description: `User ID ${user.id} has been blocked from logging in.`,
      });
    } else {
      toast.success(`Account Restored: ${user.name}`, {
        description: `User ID ${user.id} can now log in normally.`,
      });
    }
  };

  const handleResetPassword = (user: AdminUser) => {
    const res = AdminUserManager.resetPassword(user.id);
    setResetCodeInfo({ user, code: res.tempCode });
    toast.info(`Recovery Key Generated for ${user.email}`, {
      description: `Temporary recovery code: ${res.tempCode}`,
    });
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (user.role === "admin" && users.filter((u) => u.role === "admin").length <= 1) {
      toast.error("Action Prohibited", {
        description: "Cannot delete the sole Root Superadmin account.",
      });
      return;
    }

    if (confirm(`Are you sure you want to delete user ${user.name} (${user.email})?`)) {
      const updated = AdminUserManager.deleteUser(user.id);
      setUsers(updated);
      if (selectedUser?.id === user.id) setSelectedUser(null);
      toast.success(`User ${user.name} removed from registry.`);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      toast.error("Please provide both name and email.");
      return;
    }

    const created = AdminUserManager.createUser({
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      role: newRole,
      status: "active",
      authProvider: "email",
      organizationName: newOrg,
      department: newDept,
      twoFactorEnabled: false,
    });

    setUsers(AdminUserManager.getUsers());
    setIsCreateOpen(false);
    setNewName("");
    setNewEmail("");
    toast.success(`User provisioned successfully!`, {
      description: `ID: ${created.id} assigned with role ${created.role.toUpperCase()}`,
    });
  };

  // Metrics Counters
  const totalCount = users.length;
  const adminCount = users.filter(
    (u) => u.role === "admin" || u.role === "superadmin" || u.role === "masteradmin"
  ).length;
  const facultyCount = users.filter(
    (u) =>
      u.role === "handler" ||
      u.role === "teacher" ||
      u.role === "institution" ||
      u.role === "school"
  ).length;
  const memberSubscriberCount = users.filter(
    (u) =>
      u.role === "member" ||
      u.role === "student" ||
      u.role === "subscriber"
  ).length;
  const suspendedCount = users.filter((u) => u.status === "suspended").length;
  const activeSessionsTotal = users.reduce((acc, u) => acc + u.activeSessionsCount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(101,245,154,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.1)] border border-[rgba(101,245,154,0.25)] text-[#65F59A] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
                Root Authority // IAM Directory
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">RBAC Engine</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              User Identity & Access Governance
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Full administrative command over logins, platform user IDs, credential policies, role elevation, and account suspension across all institutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleToggleInstitutionQuestionAdding}
              className={`h-10 px-4 rounded-[4px] font-mono text-xs font-bold tracking-wider uppercase border transition-all ${
                instQuestionAllowed
                  ? "bg-[#111B17] border-[rgba(56,217,176,0.3)] text-[#38D9B0] hover:bg-[rgba(56,217,176,0.1)]"
                  : "bg-[rgba(248,113,113,0.12)] border-[rgba(248,113,113,0.4)] text-[#F87171] hover:bg-[rgba(248,113,113,0.2)]"
              }`}
              title="Admin Rule: Toggle whether Institutions can add/import Question Bank items"
            >
              <Database className="mr-2 h-3.5 w-3.5" />
              Inst. Q-Bank: {instQuestionAllowed ? "Adding Active" : "Disabled by Admin"}
            </Button>

            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-10 px-5 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(101,245,154,0.25)]"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Provision User
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Platform Identity HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Total Identified Users
            </span>
            <Users className="h-4 w-4 text-[#65F59A]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#F2F7F3] tabular-nums">
              {totalCount}
            </p>
            <span className="font-mono text-[10px] text-[#65F59A]">In Active Store</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Superadmins
            </span>
            <Shield className="h-4 w-4 text-[#65F59A]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#65F59A] tabular-nums">
              {adminCount}
            </p>
            <span className="font-mono text-[10px] text-[#69786F]">Root Access</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Institutions & Handlers
            </span>
            <School className="h-4 w-4 text-[#38D9B0]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#38D9B0] tabular-nums">
              {facultyCount}
            </p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">Faculty / Admins</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Active Sessions
            </span>
            <Laptop className="h-4 w-4 text-[#65F59A]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#F2F7F3] tabular-nums">
              {activeSessionsTotal}
            </p>
            <span className="font-mono text-[10px] text-[#65F59A]">Live Nodes</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Suspended / Flagged
            </span>
            <UserX className="h-4 w-4 text-[#F87171]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-2xl font-extrabold text-[#F87171] tabular-nums">
              {suspendedCount}
            </p>
            <span className="font-mono text-[10px] text-[#F87171]">Banned Logins</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Multi-Filter Control Matrix */}
      <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-4 space-y-4">
        {/* Quick Filter Governance Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-[rgba(160,190,170,0.1)]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#69786F] mr-1">
            Governance View:
          </span>
          <button
            type="button"
            onClick={() => setRoleFilter("all")}
            className={`px-3 py-1 rounded-[3px] font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
              roleFilter === "all"
                ? "bg-[#65F59A] text-[#070B0A]"
                : "bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(160,190,170,0.15)]"
            }`}
          >
            All Identities
          </button>
          <button
            type="button"
            onClick={() => setRoleFilter("employees")}
            className={`px-3 py-1 rounded-[3px] font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
              roleFilter === "employees"
                ? "bg-[#65F59A] text-[#070B0A]"
                : "bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(160,190,170,0.15)]"
            }`}
          >
            Employees & Faculty Handlers
          </button>
          <button
            type="button"
            onClick={() => setRoleFilter("institution")}
            className={`px-3 py-1 rounded-[3px] font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
              roleFilter === "institution"
                ? "bg-[#65F59A] text-[#070B0A]"
                : "bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(160,190,170,0.15)]"
            }`}
          >
            Institutes & Campuses
          </button>
          <button
            type="button"
            onClick={() => setRoleFilter("subscriber")}
            className={`px-3 py-1 rounded-[3px] font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
              roleFilter === "subscriber"
                ? "bg-[#65F59A] text-[#070B0A]"
                : "bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(160,190,170,0.15)]"
            }`}
          >
            Subscribers & Scholars
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#69786F]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, user UUID, or campus..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#65F59A]/50 transition-colors"
            />
          </div>

          {/* Role Filter */}
          <div className="md:col-span-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#65F59A]/50"
            >
              <option value="all">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="masteradmin">Master Admin</option>
              <option value="employees">Employees / Handlers</option>
              <option value="institution">Institutes / Campuses</option>
              <option value="subscriber">Subscribers / Scholars</option>
              <option value="member">Students / Members</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#65F59A]/50"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Accounts</option>
              <option value="suspended">Suspended / Banned</option>
              <option value="pending">Pending Verification</option>
            </select>
          </div>

          {/* Auth Provider Filter */}
          <div className="md:col-span-2">
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#65F59A]/50"
            >
              <option value="all">All Providers</option>
              <option value="email">Email + Password</option>
              <option value="google">Google OAuth</option>
              <option value="sso">Enterprise SSO</option>
              <option value="saml">SAML 2.0</option>
            </select>
          </div>

          {/* Reset button */}
          <div className="md:col-span-1 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
                setProviderFilter("all");
                refreshList();
              }}
              className="h-9 w-full md:w-auto px-2.5 border-[rgba(160,190,170,0.18)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3]"
              title="Reset Filters"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Main Interactive User & Identity Table */}
      <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111B17] border-b border-[rgba(160,190,170,0.14)] text-[#69786F] font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">User & System ID</th>
                <th className="px-4 py-3">Auth & Contact</th>
                <th className="px-4 py-3">Institution & Dept</th>
                <th className="px-4 py-3">Role Control</th>
                <th className="px-4 py-3">Account State</th>
                <th className="px-4 py-3">Sessions</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(160,190,170,0.08)]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[#A0AEA5]">
                    <div className="max-w-sm mx-auto space-y-2">
                      <Users className="h-8 w-8 mx-auto text-[#69786F]" />
                      <p className="font-semibold text-sm text-[#F2F7F3]">No Users Matching Criteria</p>
                      <p className="text-xs text-[#69786F]">
                        Try modifying search parameters or clearing active filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSuspended = user.status === "suspended";
                  return (
                    <tr
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`hover:bg-[#111B17]/60 transition-colors cursor-pointer ${
                        isSuspended ? "bg-[rgba(248,113,113,0.04)]" : ""
                      }`}
                    >
                      {/* Name & ID */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-[#17251E] border border-[rgba(160,190,170,0.18)] flex items-center justify-center font-mono font-bold text-xs text-[#65F59A] shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-medium text-[#F2F7F3] block hover:text-[#65F59A] transition-colors">
                              {user.name}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-[10px] text-[#69786F] tracking-tight">
                                {user.id}
                              </span>
                              <button
                                onClick={(e) => handleCopyId(user.id, e)}
                                className="text-[#69786F] hover:text-[#65F59A] transition-colors"
                                title="Copy User UUID"
                              >
                                <Copy className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact & Provider */}
                      <td className="px-4 py-3.5 font-mono text-[11px]">
                        <span className="text-[#A0AEA5] block">{user.email}</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="px-1.5 py-0.2 rounded-[2px] text-[9px] font-mono uppercase bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.2)]">
                            {user.authProvider}
                          </span>
                          {user.twoFactorEnabled && (
                            <span className="px-1.5 py-0.2 rounded-[2px] text-[9px] font-mono text-[#38D9B0] bg-[rgba(56,217,176,0.1)] border border-[rgba(56,217,176,0.25)]">
                              2FA ON
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Org & Dept */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-[#F2F7F3] block font-medium truncate max-w-[180px]">
                          {user.organizationName || "Global Platform"}
                        </span>
                        <span className="text-[10px] font-mono text-[#69786F] block truncate max-w-[180px]">
                          {user.department || "General"}
                        </span>
                      </td>

                      {/* Role Selector */}
                      <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user, e.target.value as UserRole)}
                          className={`text-xs px-2 py-1 rounded-[3px] font-mono font-bold uppercase tracking-wider border cursor-pointer ${
                            user.role === "admin" || user.role === "superadmin"
                              ? "bg-[rgba(101,245,154,0.12)] text-[#65F59A] border-[rgba(101,245,154,0.3)]"
                              : user.role === "masteradmin"
                              ? "bg-[rgba(168,85,247,0.12)] text-[#C084FC] border-[rgba(168,85,247,0.3)]"
                              : user.role === "institution" || user.role === "school"
                              ? "bg-[rgba(56,217,176,0.12)] text-[#38D9B0] border-[rgba(56,217,176,0.3)]"
                              : user.role === "handler" || user.role === "teacher"
                              ? "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border-[rgba(251,191,36,0.3)]"
                              : user.role === "member" || user.role === "student"
                              ? "bg-[rgba(101,245,154,0.08)] text-[#65F59A] border-[rgba(101,245,154,0.2)]"
                              : "bg-[rgba(96,165,250,0.12)] text-[#60A5FA] border-[rgba(96,165,250,0.3)]"
                          }`}
                        >
                          <option value="superadmin">Super Admin</option>
                          <option value="masteradmin">Master Admin</option>
                          <option value="institution">Institution</option>
                          <option value="handler">Handler (Employee)</option>
                          <option value="member">Member</option>
                          <option value="subscriber">Subscriber</option>
                        </select>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase ${
                            user.status === "active"
                              ? "bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.25)]"
                              : user.status === "suspended"
                              ? "bg-[rgba(248,113,113,0.1)] text-[#F87171] border border-[rgba(248,113,113,0.25)]"
                              : "bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              user.status === "active"
                                ? "bg-[#65F59A]"
                                : user.status === "suspended"
                                ? "bg-[#F87171]"
                                : "bg-[#FBBF24]"
                            }`}
                          />
                          {user.status}
                        </span>
                      </td>

                      {/* Sessions */}
                      <td className="px-4 py-3.5 font-mono text-xs">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-1.5 py-0.5 rounded-[2px] font-bold ${
                              user.activeSessionsCount > 0
                                ? "bg-[rgba(101,245,154,0.12)] text-[#65F59A]"
                                : "bg-[#111B17] text-[#69786F]"
                            }`}
                          >
                            {user.activeSessionsCount} active
                          </span>
                        </div>
                        <span className="text-[10px] text-[#69786F] block mt-0.5">
                          {user.lastLoginAt}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Suspend / Unban Toggle */}
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className={`p-1.5 rounded-[3px] border transition-colors ${
                              user.status === "active"
                                ? "border-[rgba(248,113,113,0.2)] text-[#F87171] hover:bg-[rgba(248,113,113,0.1)]"
                                : "border-[rgba(101,245,154,0.2)] text-[#65F59A] hover:bg-[rgba(101,245,154,0.1)]"
                            }`}
                            title={user.status === "active" ? "Suspend Account" : "Activate Account"}
                          >
                            {user.status === "active" ? (
                              <UserX className="h-3.5 w-3.5" />
                            ) : (
                              <UserCheck className="h-3.5 w-3.5" />
                            )}
                          </button>

                          {/* Reset Password */}
                          <button
                            onClick={() => handleResetPassword(user)}
                            className="p-1.5 rounded-[3px] border border-[rgba(160,190,170,0.15)] text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#17251E] transition-colors"
                            title="Generate Password Recovery Code"
                          >
                            <Key className="h-3.5 w-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 rounded-[3px] border border-[rgba(160,190,170,0.15)] text-[#69786F] hover:text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
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

      {/* 5. User Details Inspection Dossier Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B0A]/80 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.2)] p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-start justify-between border-b border-[rgba(160,190,170,0.12)] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#17251E] border border-[#65F59A]/30 flex items-center justify-center font-mono font-bold text-sm text-[#65F59A]">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                    {selectedUser.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-[#A0AEA5]">
                    <span>{selectedUser.email}</span>
                    <span>•</span>
                    <span className="text-[#65F59A] uppercase font-bold">
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Platform UUID</span>
                <span className="text-[#F2F7F3] font-bold select-all">{selectedUser.id}</span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Account Status</span>
                <span
                  className={`font-bold uppercase ${
                    selectedUser.status === "active"
                      ? "text-[#65F59A]"
                      : selectedUser.status === "suspended"
                      ? "text-[#F87171]"
                      : "text-[#FBBF24]"
                  }`}
                >
                  {selectedUser.status}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Institution Workspace</span>
                <span className="text-[#F2F7F3] font-bold">
                  {selectedUser.organizationName || "Global Root"}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Department Unit</span>
                <span className="text-[#F2F7F3] font-bold">
                  {selectedUser.department || "None"}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Auth Identity Mode</span>
                <span className="text-[#65F59A] font-bold uppercase">{selectedUser.authProvider}</span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Last Known IP Node</span>
                <span className="text-[#F2F7F3]">{selectedUser.lastKnownIp || "Unknown"}</span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Active Device Sessions</span>
                <span className="text-[#65F59A] font-bold">{selectedUser.activeSessionsCount} concurrent</span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">Account Created At</span>
                <span className="text-[#A0AEA5]">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Admin Role Control Section */}
            <div className="p-3.5 rounded-[4px] bg-[#111B17] border border-[rgba(101,245,154,0.25)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#65F59A] font-bold">
                  Admin Authority: Change Assigned Role
                </span>
                <span className="text-[10px] font-mono text-[#A0AEA5]">
                  Current: <strong className="text-[#F2F7F3] uppercase">{getRoleDisplayName(selectedUser.role)}</strong>
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {(["subscriber", "member", "handler", "institution", "admin"] as const).map((r) => {
                  const isCur = selectedUser.role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRoleChange(selectedUser, r)}
                      className={`px-2 py-1.5 rounded-[3px] font-mono text-[10px] uppercase font-bold transition-all border ${
                        isCur
                          ? "bg-[#65F59A] text-[#070B0A] border-[#65F59A] shadow-[0_0_8px_rgba(101,245,154,0.3)]"
                          : "bg-[#0C1210] text-[#A0AEA5] hover:text-[#F2F7F3] border-[rgba(160,190,170,0.18)] hover:border-[#65F59A]/40"
                      }`}
                    >
                      {r === "subscriber" ? "Sub" : r === "member" ? "Member" : r === "handler" ? "Handler" : r === "institution" ? "Inst" : "Admin"}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[rgba(160,190,170,0.12)]">
              <Button
                variant="outline"
                onClick={() => handleToggleStatus(selectedUser)}
                className={`text-xs font-mono h-9 ${
                  selectedUser.status === "active"
                    ? "border-[rgba(248,113,113,0.3)] text-[#F87171] hover:bg-[rgba(248,113,113,0.1)]"
                    : "border-[rgba(101,245,154,0.3)] text-[#65F59A] hover:bg-[rgba(101,245,154,0.1)]"
                }`}
              >
                {selectedUser.status === "active" ? "Suspend Account Access" : "Reactivate Account Access"}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleResetPassword(selectedUser)}
                  className="bg-[#111B17] border border-[rgba(160,190,170,0.2)] text-[#F2F7F3] hover:text-[#65F59A] hover:border-[#65F59A]/50 text-xs font-mono h-9"
                >
                  <Key className="mr-1.5 h-3.5 w-3.5 text-[#65F59A]" />
                  Reset Key
                </Button>
                <Button
                  onClick={() => setSelectedUser(null)}
                  className="bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 text-xs font-mono font-bold h-9"
                >
                  Close Dossier
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Provision User Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B0A]/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.2)] p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4 text-[#65F59A]" />
                <h3 className="font-display text-sm uppercase font-bold text-[#F2F7F3]">
                  Provision Platform Identity
                </h3>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. David Miller"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="david.miller@campus.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">Assigned Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                  >
                    <option value="subscriber">Subscriber</option>
                    <option value="member">Member</option>
                    <option value="handler">Handler (Employee)</option>
                    <option value="institution">Institution</option>
                    <option value="masteradmin">Master Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">Department</label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">Primary Institution</label>
                <input
                  type="text"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  className="border-[rgba(160,190,170,0.2)] text-[#A0AEA5] text-xs font-mono h-9"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 text-xs font-mono font-bold h-9 uppercase tracking-wider"
                >
                  Create & Activate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Password Recovery Key Dialog */}
      {resetCodeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B0A]/85 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-[8px] bg-[#0C1210] border border-[#65F59A]/30 p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center space-x-2 text-[#65F59A]">
              <Key className="h-4 w-4" />
              <h3 className="font-display text-sm uppercase font-bold text-[#F2F7F3]">
                Recovery Key Dispatched
              </h3>
            </div>

            <p className="text-xs text-[#A0AEA5] leading-relaxed">
              A one-time emergency access passcode has been generated for{" "}
              <strong className="text-[#F2F7F3]">{resetCodeInfo.user.email}</strong>.
            </p>

            <div className="p-3 rounded-[4px] bg-[#111B17] border border-[#65F59A]/40 text-center font-mono text-base font-extrabold text-[#65F59A] tracking-widest select-all">
              {resetCodeInfo.code}
            </div>

            <p className="text-[11px] text-[#69786F]">
              Provide this key to the account owner or trigger a direct magic link.
            </p>

            <Button
              onClick={() => setResetCodeInfo(null)}
              className="w-full bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs font-bold uppercase tracking-wider h-9"
            >
              Acknowledged
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
