import { OrganizationType } from "@/lib/types/organization";
import { SubscriptionPlanId } from "@/lib/types/billing";

export type TenantApprovalStatus = "approved" | "pending_review" | "suspended";
export type TenantIsolationTier = "multi_tenant" | "dedicated" | "isolated_vpc";
export type HostingRegion = "global-edge" | "ap-south-1" | "us-east-1" | "eu-central-1";

export interface MasterOrganization {
  id: string; // e.g. "org-101"
  name: string;
  slug: string; // e.g. "saidapetmodel"
  domain: string; // e.g. "saidapetmodel.quizdorm.org"
  type: OrganizationType;
  country: string;
  state: string;
  city: string;
  primaryAdminName: string;
  primaryAdminEmail: string;
  planTier: SubscriptionPlanId;
  isolationMode: TenantIsolationTier;
  hostingRegion: HostingRegion;
  approvalStatus: TenantApprovalStatus;
  studentSeatsAllocated: number;
  studentSeatsUsed: number;
  facultySeatsAllocated: number;
  facultySeatsUsed: number;
  quizCount: number;
  whiteLabelEnabled: boolean;
  ssoConfigured: boolean;
  primaryColor: string;
  createdAt: string;
  lastActiveAt: string;
  notes?: string;
}

const STORAGE_KEY_MASTER_ORGS = "quizdorm_master_organizations_db";

export const SEED_MASTER_ORGS: MasterOrganization[] = [
  {
    id: "org-101",
    name: "Government Model Higher Secondary School",
    slug: "saidapetmodel",
    domain: "saidapetmodel.quizdorm.org",
    type: "School",
    country: "India",
    state: "Tamil Nadu",
    city: "Chennai",
    primaryAdminName: "Govt Model & Matriculation Admin",
    primaryAdminEmail: "school@quizdorm.com",
    planTier: "institution",
    isolationMode: "multi_tenant",
    hostingRegion: "ap-south-1",
    approvalStatus: "approved",
    studentSeatsAllocated: 1200,
    studentSeatsUsed: 940,
    facultySeatsAllocated: 25,
    facultySeatsUsed: 18,
    quizCount: 142,
    whiteLabelEnabled: true,
    ssoConfigured: false,
    primaryColor: "#4F46E5",
    createdAt: "2025-06-12T14:20:00Z",
    lastActiveAt: "Just now",
    notes: "State-recognized lead digital exam center.",
  },
  {
    id: "org-102",
    name: "St. Jude International School District",
    slug: "stjude",
    domain: "portal.stjude.org",
    type: "School",
    country: "United States",
    state: "New York",
    city: "Albany",
    primaryAdminName: "Dr. Alan Vance",
    primaryAdminEmail: "alan.vance@stjude.org",
    planTier: "enterprise",
    isolationMode: "dedicated",
    hostingRegion: "us-east-1",
    approvalStatus: "approved",
    studentSeatsAllocated: 5000,
    studentSeatsUsed: 3120,
    facultySeatsAllocated: 100,
    facultySeatsUsed: 42,
    quizCount: 520,
    whiteLabelEnabled: true,
    ssoConfigured: true,
    primaryColor: "#059669",
    createdAt: "2026-02-15T10:00:00Z",
    lastActiveAt: "12 mins ago",
    notes: "SAML 2.0 Okta directory sync active. Dedicated Postgres instance.",
  },
  {
    id: "org-103",
    name: "Delhi Public Global Academy",
    slug: "delhipublic",
    domain: "delhipublic.quizdorm.org",
    type: "School",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    primaryAdminName: "Rajeev Singhal",
    primaryAdminEmail: "admin@delhipublic.org",
    planTier: "institution",
    isolationMode: "multi_tenant",
    hostingRegion: "ap-south-1",
    approvalStatus: "approved",
    studentSeatsAllocated: 2500,
    studentSeatsUsed: 2150,
    facultySeatsAllocated: 25,
    facultySeatsUsed: 24,
    quizCount: 380,
    whiteLabelEnabled: true,
    ssoConfigured: false,
    primaryColor: "#2563EB",
    createdAt: "2025-10-14T16:45:00Z",
    lastActiveAt: "1 hour ago",
    notes: "Faculty seat quota near saturation (24/25).",
  },
  {
    id: "org-104",
    name: "Cambridge International Partner Campus",
    slug: "cambridge-intl",
    domain: "cambridge.quizdorm.org",
    type: "College",
    country: "United Kingdom",
    state: "Cambridgeshire",
    city: "Cambridge",
    primaryAdminName: "Elena Rostova",
    primaryAdminEmail: "elena.rostova@cambridge-intl.ac.uk",
    planTier: "professional",
    isolationMode: "multi_tenant",
    hostingRegion: "eu-central-1",
    approvalStatus: "pending_review",
    studentSeatsAllocated: 500,
    studentSeatsUsed: 40,
    facultySeatsAllocated: 5,
    facultySeatsUsed: 1,
    quizCount: 18,
    whiteLabelEnabled: false,
    ssoConfigured: true,
    primaryColor: "#7C3AED",
    createdAt: "2026-10-22T09:30:00Z",
    lastActiveAt: "Yesterday",
    notes: "Institutional application pending Superadmin verification.",
  },
  {
    id: "org-105",
    name: "Apex Coaching & Test Prep Institute",
    slug: "apexprep",
    domain: "apexprep.quizdorm.org",
    type: "Coaching Centre",
    country: "India",
    state: "Rajasthan",
    city: "Kota",
    primaryAdminName: "Sanjay Verma",
    primaryAdminEmail: "accounts@apexprep.edu",
    planTier: "basic",
    isolationMode: "multi_tenant",
    hostingRegion: "ap-south-1",
    approvalStatus: "suspended",
    studentSeatsAllocated: 200,
    studentSeatsUsed: 198,
    facultySeatsAllocated: 1,
    facultySeatsUsed: 1,
    quizCount: 64,
    whiteLabelEnabled: false,
    ssoConfigured: false,
    primaryColor: "#F59E0B",
    createdAt: "2026-03-01T10:00:00Z",
    lastActiveAt: "2 weeks ago",
    notes: "Subscription payment overdue; workspace suspended.",
  },
];

export class OrganizationMasterManager {
  public static getOrganizations(): MasterOrganization[] {
    if (typeof window === "undefined") return SEED_MASTER_ORGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTER_ORGS);
      if (!saved) {
        localStorage.setItem(
          STORAGE_KEY_MASTER_ORGS,
          JSON.stringify(SEED_MASTER_ORGS)
        );
        return SEED_MASTER_ORGS;
      }
      return JSON.parse(saved);
    } catch {
      return SEED_MASTER_ORGS;
    }
  }

  private static save(orgs: MasterOrganization[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_MASTER_ORGS, JSON.stringify(orgs));
    } catch (e) {
      console.error("Failed to persist master organizations:", e);
    }
  }

  public static getOrgById(id: string): MasterOrganization | undefined {
    return this.getOrganizations().find((o) => o.id === id);
  }

  public static updateApprovalStatus(
    id: string,
    status: TenantApprovalStatus
  ): MasterOrganization[] {
    const orgs = this.getOrganizations().map((o) =>
      o.id === id ? { ...o, approvalStatus: status } : o
    );
    this.save(orgs);
    return orgs;
  }

  public static updatePlanTier(
    id: string,
    planTier: SubscriptionPlanId
  ): MasterOrganization[] {
    const orgs = this.getOrganizations().map((o) =>
      o.id === id ? { ...o, planTier } : o
    );
    this.save(orgs);
    return orgs;
  }

  public static updateDomain(
    id: string,
    domain: string,
    whiteLabelEnabled: boolean
  ): MasterOrganization[] {
    const orgs = this.getOrganizations().map((o) =>
      o.id === id ? { ...o, domain, whiteLabelEnabled } : o
    );
    this.save(orgs);
    return orgs;
  }

  public static deleteOrganization(id: string): MasterOrganization[] {
    const orgs = this.getOrganizations().filter((o) => o.id !== id);
    this.save(orgs);
    return orgs;
  }

  public static createOrganization(
    data: Omit<
      MasterOrganization,
      | "id"
      | "createdAt"
      | "lastActiveAt"
      | "studentSeatsUsed"
      | "facultySeatsUsed"
      | "quizCount"
    >
  ): MasterOrganization {
    const newOrg: MasterOrganization = {
      ...data,
      id: `org-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      lastActiveAt: "Just now (Newly Provisioned)",
      studentSeatsUsed: 0,
      facultySeatsUsed: 1,
      quizCount: 0,
    };

    const orgs = [newOrg, ...this.getOrganizations()];
    this.save(orgs);
    return newOrg;
  }

  public static resetToSeed(): MasterOrganization[] {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_MASTER_ORGS);
    }
    return SEED_MASTER_ORGS;
  }
}
