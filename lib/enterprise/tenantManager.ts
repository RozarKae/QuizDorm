import { Tenant, TenantIsolationMode } from "@/lib/types/enterprise";

const STORAGE_KEY_TENANTS = "quizdorm_enterprise_tenants";

export const DEFAULT_TENANTS: Tenant[] = [
  {
    id: "tnt-101",
    name: "QuizDorm Global Academy (Primary)",
    domain: "quizdorm.com",
    logoUrl: "/logo.png",
    primaryColor: "#4f46e5",
    theme: "dark",
    isolationMode: "multi_tenant",
    region: "global-edge",
    status: "active",
    createdAt: "2025-01-01T00:00:00Z",
    userCount: 4200,
    featuresEnabled: ["ai", "ocr", "credentials", "billing", "apis", "adaptive"],
  },
  {
    id: "tnt-102",
    name: "St. Jude International School District",
    domain: "stjude.quizdorm.org",
    logoUrl: "/stjude-logo.png",
    primaryColor: "#059669",
    theme: "light",
    isolationMode: "dedicated",
    region: "us-east",
    status: "active",
    createdAt: "2026-02-15T10:00:00Z",
    userCount: 1850,
    featuresEnabled: ["ai", "ocr", "credentials", "adaptive"],
  },
];

export class TenantManager {
  public static getTenants(): Tenant[] {
    if (typeof window === "undefined") return DEFAULT_TENANTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TENANTS);
      return saved ? JSON.parse(saved) : DEFAULT_TENANTS;
    } catch {
      return DEFAULT_TENANTS;
    }
  }

  public static updateTenant(id: string, updates: Partial<Tenant>): Tenant[] {
    const tenants = this.getTenants();
    const updated = tenants.map((t) => (t.id === id ? { ...t, ...updates } : t));
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_TENANTS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update tenant", e);
      }
    }
    return updated;
  }
}
