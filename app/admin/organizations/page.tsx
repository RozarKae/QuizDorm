"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Building,
  School,
  Globe,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Search,
  Filter,
  RefreshCw,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sliders,
  ExternalLink,
  Copy,
  Layers,
  Lock,
  Server,
  Zap,
  Tag,
  Trash2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  MasterOrganization,
  OrganizationMasterManager,
  TenantApprovalStatus,
  TenantIsolationTier,
  HostingRegion,
} from "@/lib/admin/organizationMasterManager";
import { SubscriptionPlanId } from "@/lib/types/billing";
import { OrganizationType } from "@/lib/types/organization";

export default function AdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState<MasterOrganization[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  // Modals State
  const [selectedOrg, setSelectedOrg] = useState<MasterOrganization | null>(
    null
  );
  const [isProvisionOpen, setIsProvisionOpen] = useState(false);
  const [editingDomainOrg, setEditingDomainOrg] =
    useState<MasterOrganization | null>(null);

  // Domain modal state
  const [customDomain, setCustomDomain] = useState("");
  const [whiteLabelToggle, setWhiteLabelToggle] = useState(false);

  // Provision form state
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formType, setFormType] = useState<OrganizationType>("School");
  const [formCountry, setFormCountry] = useState("India");
  const [formCity, setFormCity] = useState("Chennai");
  const [formAdminName, setFormAdminName] = useState("");
  const [formAdminEmail, setFormAdminEmail] = useState("");
  const [formPlanTier, setFormPlanTier] =
    useState<SubscriptionPlanId>("institution");
  const [formIsolation, setFormIsolation] =
    useState<TenantIsolationTier>("multi_tenant");
  const [formRegion, setFormRegion] = useState<HostingRegion>("ap-south-1");

  useEffect(() => {
    setOrganizations(OrganizationMasterManager.getOrganizations());
  }, []);

  const refreshList = () => {
    setOrganizations(OrganizationMasterManager.getOrganizations());
  };

  // Filter Logic
  const filteredOrgs = organizations.filter((org) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      org.name.toLowerCase().includes(q) ||
      org.domain.toLowerCase().includes(q) ||
      org.primaryAdminEmail.toLowerCase().includes(q) ||
      org.city.toLowerCase().includes(q) ||
      org.country.toLowerCase().includes(q) ||
      org.id.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || org.approvalStatus === statusFilter;
    const matchesType = typeFilter === "all" || org.type === typeFilter;
    const matchesPlan = planFilter === "all" || org.planTier === planFilter;

    return matchesSearch && matchesStatus && matchesType && matchesPlan;
  });

  // Action Handlers
  const handleApprove = (org: MasterOrganization, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = OrganizationMasterManager.updateApprovalStatus(
      org.id,
      "approved"
    );
    setOrganizations(updated);
    toast.success(`Organization Approved: ${org.name}`, {
      description: `Domain ${org.domain} is now live and routing traffic.`,
    });
  };

  const handleToggleStatus = (org: MasterOrganization, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextStatus: TenantApprovalStatus =
      org.approvalStatus === "approved" ? "suspended" : "approved";
    const updated = OrganizationMasterManager.updateApprovalStatus(
      org.id,
      nextStatus
    );
    setOrganizations(updated);
    if (nextStatus === "suspended") {
      toast.error(`Campus Suspended: ${org.name}`, {
        description: "Student and faculty access locked.",
      });
    } else {
      toast.success(`Campus Restored: ${org.name}`, {
        description: "Institutional workspace reactivated.",
      });
    }
  };

  const handlePlanChange = (
    org: MasterOrganization,
    newPlan: SubscriptionPlanId,
    e?: React.SyntheticEvent
  ) => {
    if (e) e.stopPropagation();
    const updated = OrganizationMasterManager.updatePlanTier(org.id, newPlan);
    setOrganizations(updated);
    toast.success(`Tier Updated to [${newPlan.toUpperCase()}]`, {
      description: `Assigned plan tier for ${org.name}.`,
    });
  };

  const openDomainModal = (org: MasterOrganization, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingDomainOrg(org);
    setCustomDomain(org.domain);
    setWhiteLabelToggle(org.whiteLabelEnabled);
  };

  const handleSaveDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDomainOrg) return;

    const updated = OrganizationMasterManager.updateDomain(
      editingDomainOrg.id,
      customDomain.trim(),
      whiteLabelToggle
    );
    setOrganizations(updated);
    toast.success(`Domain Configuration Saved!`, {
      description: `Routing updated to ${customDomain.trim()}.`,
    });
    setEditingDomainOrg(null);
  };

  const handleProvisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAdminEmail.trim()) {
      toast.error("Please fill in campus name and administrator email.");
      return;
    }

    const cleanSlug =
      formSlug.trim() ||
      formName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .substring(0, 20);
    const domain = `${cleanSlug}.quizdorm.org`;

    const newOrg = OrganizationMasterManager.createOrganization({
      name: formName.trim(),
      slug: cleanSlug,
      domain,
      type: formType,
      country: formCountry,
      state: "Standard State",
      city: formCity,
      primaryAdminName: formAdminName.trim() || "Campus Administrator",
      primaryAdminEmail: formAdminEmail.trim().toLowerCase(),
      planTier: formPlanTier,
      isolationMode: formIsolation,
      hostingRegion: formRegion,
      approvalStatus: "approved",
      studentSeatsAllocated: formPlanTier === "enterprise" ? 5000 : 1000,
      facultySeatsAllocated: formPlanTier === "enterprise" ? 100 : 25,
      whiteLabelEnabled: true,
      ssoConfigured: formPlanTier === "enterprise",
      primaryColor: "#4F46E5",
      notes: "Direct superadmin provisioning.",
    });

    setOrganizations(OrganizationMasterManager.getOrganizations());
    setIsProvisionOpen(false);
    toast.success(`Campus Provisioned: ${newOrg.name}`, {
      description: `Domain: ${newOrg.domain} with ${newOrg.planTier.toUpperCase()} tier.`,
    });

    setFormName("");
    setFormSlug("");
    setFormAdminEmail("");
  };

  const handleCopy = (text: string, label: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      description: text,
    });
  };

  // Metrics Counters
  const totalOrgs = organizations.length;
  const approvedCount = organizations.filter(
    (o) => o.approvalStatus === "approved"
  ).length;
  const pendingCount = organizations.filter(
    (o) => o.approvalStatus === "pending_review"
  ).length;
  const totalStudents = organizations.reduce(
    (acc, o) => acc + o.studentSeatsUsed,
    0
  );
  const totalFaculty = organizations.reduce(
    (acc, o) => acc + o.facultySeatsUsed,
    0
  );

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
                Root Authority // Multi-Tenant Controller
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">
                Institutional Directory
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Master Organization & Campus Governance
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Consolidated command over institutional tenants, custom domain routing, plan tier licensing, approval workflows, and data residency isolation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={() => setIsProvisionOpen(true)}
              className="h-10 px-5 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(101,245,154,0.25)]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Provision Campus
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Precision HUD Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Total Managed Campuses
            </span>
            <Building2 className="h-4 w-4 text-[#65F59A]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#F2F7F3] tabular-nums">
              {totalOrgs}
            </p>
            <span className="font-mono text-[10px] text-[#65F59A]">
              {approvedCount} Live & Active
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Enrolled Students
            </span>
            <Users className="h-4 w-4 text-[#38D9B0]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#38D9B0] tabular-nums">
              {totalStudents.toLocaleString()}
            </p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">
              Active Learner Seats
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Active Faculty Roster
            </span>
            <School className="h-4 w-4 text-[#65F59A]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#F2F7F3] tabular-nums">
              {totalFaculty}
            </p>
            <span className="font-mono text-[10px] text-[#65F59A]">
              Teacher Licenses
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
              Pending Approval Queue
            </span>
            <AlertTriangle className="h-4 w-4 text-[#FBBF24]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p
              className={`font-display text-3xl font-extrabold tabular-nums ${
                pendingCount > 0 ? "text-[#FBBF24]" : "text-[#65F59A]"
              }`}
            >
              {pendingCount}
            </p>
            <span
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded-[2px] ${
                pendingCount > 0
                  ? "bg-[rgba(251,191,36,0.1)] text-[#FBBF24]"
                  : "bg-[rgba(101,245,154,0.1)] text-[#65F59A]"
              }`}
            >
              {pendingCount > 0 ? "Action Required" : "All Clear"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#69786F]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by institution name, domain, admin email, or city..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#65F59A]/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#65F59A]/50"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved & Live</option>
              <option value="pending_review">Pending Review</option>
              <option value="suspended">Suspended / Inactive</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="md:col-span-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#65F59A]/50"
            >
              <option value="all">All Types</option>
              <option value="School">K-12 School</option>
              <option value="College">Collegiate & University</option>
              <option value="Quiz Institute">Quiz Institute</option>
              <option value="Coaching Centre">Coaching Centre</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div className="md:col-span-2">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#65F59A]/50"
            >
              <option value="all">All Tiers</option>
              <option value="enterprise">Enterprise Custom</option>
              <option value="institution">School & College</option>
              <option value="professional">Pro Institute</option>
              <option value="basic">Teacher Starter</option>
            </select>
          </div>

          {/* Reset */}
          <div className="md:col-span-1 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setTypeFilter("all");
                setPlanFilter("all");
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

      {/* 4. Master Organizations Table */}
      <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111B17] border-b border-[rgba(160,190,170,0.14)] text-[#69786F] font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Campus & Domain Routing</th>
                <th className="px-4 py-3">Primary Administrator</th>
                <th className="px-4 py-3">Licensed Plan Tier</th>
                <th className="px-4 py-3">Data Isolation & Cloud</th>
                <th className="px-4 py-3">Seats (Students / Faculty)</th>
                <th className="px-4 py-3">Governance Status</th>
                <th className="px-4 py-3 text-right">Superadmin Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(160,190,170,0.08)]">
              {filteredOrgs.map((org) => {
                const isPending = org.approvalStatus === "pending_review";
                const isSuspended = org.approvalStatus === "suspended";

                return (
                  <tr
                    key={org.id}
                    onClick={() => setSelectedOrg(org)}
                    className={`hover:bg-[#111B17]/60 transition-colors cursor-pointer ${
                      isPending
                        ? "bg-[rgba(251,191,36,0.04)]"
                        : isSuspended
                        ? "bg-[rgba(248,113,113,0.04)] opacity-70"
                        : ""
                    }`}
                  >
                    {/* Campus Name & Domain */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: org.primaryColor }}
                        />
                        <div>
                          <span className="font-semibold text-[#F2F7F3] block hover:text-[#65F59A] transition-colors">
                            {org.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5 font-mono text-[10px]">
                            <span className="text-[#65F59A] font-bold">
                              {org.domain}
                            </span>
                            <span>•</span>
                            <span className="text-[#A0AEA5]">{org.city}, {org.country}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Primary Admin */}
                    <td className="px-4 py-3.5">
                      <span className="text-[#F2F7F3] block font-medium">
                        {org.primaryAdminName}
                      </span>
                      <span className="font-mono text-[10px] text-[#69786F] block mt-0.5">
                        {org.primaryAdminEmail}
                      </span>
                    </td>

                    {/* Plan Tier Selector */}
                    <td
                      className="px-4 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={org.planTier}
                        onChange={(e) =>
                          handlePlanChange(
                            org,
                            e.target.value as SubscriptionPlanId,
                            e
                          )
                        }
                        className={`text-xs px-2 py-1 rounded-[3px] font-mono font-bold uppercase tracking-wider border cursor-pointer ${
                          org.planTier === "enterprise"
                            ? "bg-[rgba(101,245,154,0.12)] text-[#65F59A] border-[#65F59A]/30"
                            : org.planTier === "institution"
                            ? "bg-[rgba(56,217,176,0.12)] text-[#38D9B0] border-[#38D9B0]/30"
                            : org.planTier === "professional"
                            ? "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border-[#FBBF24]/30"
                            : "bg-[#111B17] text-[#A0AEA5] border-[rgba(160,190,170,0.15)]"
                        }`}
                      >
                        <option value="enterprise">Enterprise</option>
                        <option value="institution">Institution</option>
                        <option value="professional">Professional</option>
                        <option value="basic">Basic</option>
                      </select>
                    </td>

                    {/* Isolation & Region */}
                    <td className="px-4 py-3.5 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded-[2px] text-[9px] font-bold uppercase bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.2)]">
                          {org.isolationMode}
                        </span>
                        {org.ssoConfigured && (
                          <span className="px-1.5 py-0.2 rounded-[2px] text-[9px] font-bold uppercase bg-[rgba(56,217,176,0.15)] text-[#38D9B0]">
                            SSO
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#69786F] block mt-1">
                        Region: {org.hostingRegion}
                      </span>
                    </td>

                    {/* Seats */}
                    <td className="px-4 py-3.5 font-mono text-xs">
                      <div>
                        <span className="text-[#F2F7F3] font-bold">
                          {org.studentSeatsUsed} / {org.studentSeatsAllocated}
                        </span>
                        <span className="text-[10px] text-[#69786F] ml-1">students</span>
                      </div>
                      <div className="text-[10px] text-[#A0AEA5] mt-0.5">
                        <span>{org.facultySeatsUsed} / {org.facultySeatsAllocated}</span>
                        <span className="text-[#69786F] ml-1">faculty</span>
                      </div>
                    </td>

                    {/* Approval Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase ${
                          org.approvalStatus === "approved"
                            ? "bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.25)]"
                            : org.approvalStatus === "pending_review"
                            ? "bg-[rgba(251,191,36,0.15)] text-[#FBBF24] border border-[rgba(251,191,36,0.3)] animate-pulse"
                            : "bg-[rgba(248,113,113,0.1)] text-[#F87171] border border-[rgba(248,113,113,0.25)]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            org.approvalStatus === "approved"
                              ? "bg-[#65F59A]"
                              : org.approvalStatus === "pending_review"
                              ? "bg-[#FBBF24]"
                              : "bg-[#F87171]"
                          }`}
                        />
                        {org.approvalStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="px-4 py-3.5 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Click Approve for Pending */}
                        {isPending && (
                          <button
                            onClick={(e) => handleApprove(org, e)}
                            className="px-2.5 py-1 rounded-[3px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-[10px] font-bold uppercase transition-all shadow-[0_0_10px_rgba(101,245,154,0.3)] cursor-pointer"
                            title="Approve and activate institutional workspace"
                          >
                            Approve
                          </button>
                        )}

                        {/* Edit Domain & White-label */}
                        <button
                          onClick={(e) => openDomainModal(org, e)}
                          className="px-2 py-1 rounded-[3px] border border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#F2F7F3] hover:text-[#65F59A] hover:border-[#65F59A]/40 font-mono text-[10px] font-semibold uppercase transition-all flex items-center gap-1 cursor-pointer"
                          title="Domain & White-label Config"
                        >
                          <Globe className="h-3 w-3" />
                          <span>Domain</span>
                        </button>

                        {/* Suspend / Reactivate */}
                        <button
                          onClick={(e) => handleToggleStatus(org, e)}
                          className={`p-1.5 rounded-[3px] border transition-colors cursor-pointer ${
                            org.approvalStatus === "approved"
                              ? "border-[rgba(248,113,113,0.25)] text-[#F87171] hover:bg-[rgba(248,113,113,0.12)]"
                              : "border-[rgba(101,245,154,0.25)] text-[#65F59A] hover:bg-[rgba(101,245,154,0.12)]"
                          }`}
                          title={
                            org.approvalStatus === "approved"
                              ? "Suspend Workspace Access"
                              : "Reactivate Workspace Access"
                          }
                        >
                          {org.approvalStatus === "approved" ? (
                            <AlertTriangle className="h-3 w-3" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Organization Dossier Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B0A]/85 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.2)] p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-start justify-between border-b border-[rgba(160,190,170,0.12)] pb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-[6px] flex items-center justify-center font-bold text-base text-white shadow-md"
                  style={{ backgroundColor: selectedOrg.primaryColor }}
                >
                  {selectedOrg.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                    {selectedOrg.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-[#A0AEA5]">
                    <span className="text-[#65F59A]">{selectedOrg.domain}</span>
                    <span>•</span>
                    <span className="uppercase">{selectedOrg.type}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrg(null)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">
                  Tenant Node ID
                </span>
                <span className="text-[#F2F7F3] font-bold select-all">
                  {selectedOrg.id}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">
                  Primary Administrator
                </span>
                <span className="text-[#F2F7F3] font-bold truncate block">
                  {selectedOrg.primaryAdminEmail}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">
                  Data Isolation Mode
                </span>
                <span className="text-[#65F59A] font-bold uppercase">
                  {selectedOrg.isolationMode}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">
                  Cloud Hosting Region
                </span>
                <span className="text-[#38D9B0] font-bold uppercase">
                  {selectedOrg.hostingRegion}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">
                  Student Enrolled Seats
                </span>
                <span className="text-[#F2F7F3] font-bold">
                  {selectedOrg.studentSeatsUsed} / {selectedOrg.studentSeatsAllocated}
                </span>
              </div>

              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <span className="text-[#69786F] text-[10px] uppercase block">
                  Faculty Seats
                </span>
                <span className="text-[#F2F7F3] font-bold">
                  {selectedOrg.facultySeatsUsed} / {selectedOrg.facultySeatsAllocated}
                </span>
              </div>
            </div>

            {selectedOrg.notes && (
              <div className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)] font-mono text-[11px] space-y-1">
                <span className="text-[#69786F] uppercase text-[10px] block">
                  Institutional Governance Notes
                </span>
                <p className="text-[#A0AEA5]">{selectedOrg.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-[rgba(160,190,170,0.12)]">
              <Button
                variant="outline"
                onClick={() => handleToggleStatus(selectedOrg)}
                className={`text-xs font-mono h-9 ${
                  selectedOrg.approvalStatus === "approved"
                    ? "border-[rgba(248,113,113,0.3)] text-[#F87171] hover:bg-[rgba(248,113,113,0.1)]"
                    : "border-[rgba(101,245,154,0.3)] text-[#65F59A] hover:bg-[rgba(101,245,154,0.1)]"
                }`}
              >
                {selectedOrg.approvalStatus === "approved"
                  ? "Suspend Workspace"
                  : "Activate Workspace"}
              </Button>

              <div className="flex items-center gap-2">
                <Link href={`/dashboard/organizations/${selectedOrg.id}`}>
                  <Button className="bg-[#111B17] border border-[rgba(160,190,170,0.2)] text-[#F2F7F3] hover:text-[#65F59A] text-xs font-mono h-9">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Open Workspace
                  </Button>
                </Link>
                <Button
                  onClick={() => setSelectedOrg(null)}
                  className="bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 text-xs font-mono font-bold h-9 uppercase"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: Domain & White-Label Config */}
      {editingDomainOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B0A]/85 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-[8px] bg-[#0C1210] border border-[#65F59A]/30 p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-start justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#65F59A] uppercase font-bold tracking-widest block">
                  DOMAIN ROUTER & BRANDING
                </span>
                <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                  {editingDomainOrg.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingDomainOrg(null)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDomain} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">
                  Custom Subdomain or CNAME
                </label>
                <input
                  type="text"
                  required
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#65F59A] font-bold focus:outline-none focus:border-[#65F59A]/50"
                />
                <span className="text-[10px] text-[#69786F]">
                  Supports *.quizdorm.org subdomains or verified custom domains.
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
                <div>
                  <span className="text-[#F2F7F3] font-bold block">
                    White-Label Custom Theming
                  </span>
                  <span className="text-[10px] text-[#A0AEA5]">
                    Enables custom school logo and brand colors on login
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={whiteLabelToggle}
                  onChange={(e) => setWhiteLabelToggle(e.target.checked)}
                  className="h-4 w-4 accent-[#65F59A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[rgba(160,190,170,0.1)]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingDomainOrg(null)}
                  className="border-[rgba(160,190,170,0.2)] text-[#A0AEA5] text-xs font-mono h-9"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 text-xs font-mono font-bold h-9 uppercase tracking-wider"
                >
                  Save Configuration
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: Provision New Campus */}
      {isProvisionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B0A]/85 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.2)] p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-[#65F59A]" />
                <h3 className="font-display text-sm uppercase font-bold text-[#F2F7F3]">
                  Provision New Institutional Tenant
                </h3>
              </div>
              <button
                onClick={() => setIsProvisionOpen(false)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleProvisionSubmit}
              className="space-y-4 text-xs font-mono"
            >
              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">
                  Campus / Institution Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oxford Collegiate Academy"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">
                    Subdomain Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. oxford-collegiate"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#65F59A] focus:outline-none focus:border-[#65F59A]/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">
                    Institution Type
                  </label>
                  <select
                    value={formType}
                    onChange={(e) =>
                      setFormType(e.target.value as OrganizationType)
                    }
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                  >
                    <option value="School">School</option>
                    <option value="College">College</option>
                    <option value="Quiz Institute">Quiz Institute</option>
                    <option value="Coaching Centre">Coaching Centre</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">
                    Designated Administrator Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="dean@oxford.edu"
                    value={formAdminEmail}
                    onChange={(e) => setFormAdminEmail(e.target.value)}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">
                    Administrator Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Arthur Davies"
                    value={formAdminName}
                    onChange={(e) => setFormAdminName(e.target.value)}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">
                    License Plan Tier
                  </label>
                  <select
                    value={formPlanTier}
                    onChange={(e) =>
                      setFormPlanTier(e.target.value as SubscriptionPlanId)
                    }
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#65F59A] font-bold focus:outline-none focus:border-[#65F59A]/50"
                  >
                    <option value="institution">School & College ($79/mo)</option>
                    <option value="enterprise">Enterprise Custom ($199/mo)</option>
                    <option value="professional">Pro Institute ($29/mo)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px]">
                    Cloud Isolation Tier
                  </label>
                  <select
                    value={formIsolation}
                    onChange={(e) =>
                      setFormIsolation(e.target.value as TenantIsolationTier)
                    }
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] focus:outline-none focus:border-[#65F59A]/50"
                  >
                    <option value="multi_tenant">Multi-Tenant (Shared Edge)</option>
                    <option value="dedicated">Dedicated DB Schema</option>
                    <option value="isolated_vpc">Isolated VPC Instance</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[rgba(160,190,170,0.1)]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProvisionOpen(false)}
                  className="border-[rgba(160,190,170,0.2)] text-[#A0AEA5] text-xs font-mono h-9"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 text-xs font-mono font-bold h-9 uppercase tracking-wider"
                >
                  Provision & Route
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
