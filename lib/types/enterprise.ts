export type TenantIsolationMode = "single_tenant" | "multi_tenant" | "dedicated" | "hybrid";

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  primaryColor: string;
  theme: "dark" | "light" | "custom";
  isolationMode: TenantIsolationMode;
  region: "us-east" | "eu-central" | "ap-south" | "global-edge";
  status: "active" | "suspended" | "provisioning";
  createdAt: string;
  userCount: number;
  featuresEnabled: string[];
}

export interface SSOConfig {
  id: string;
  tenantId: string;
  provider: "saml2" | "openid" | "azure_ad" | "okta" | "google_workspace";
  issuerUrl: string;
  clientId: string;
  enabled: boolean;
  lastSyncAt?: string;
}

export interface AuditLogEntry {
  id: string;
  tenantId: string;
  actorName: string;
  actorRole: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  status: "success" | "warning" | "error";
}

export interface SecurityAlert {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  sourceIp?: string;
}

export interface ApprovalStep {
  role: string;
  approverName?: string;
  approved: boolean;
  timestamp?: string;
}

export interface EnterpriseWorkflow {
  id: string;
  title: string;
  triggerEvent: "certificate_approval" | "quiz_publishing" | "billing_upgrade" | "user_provisioning";
  approvalSteps: ApprovalStep[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface FeatureFlag {
  key: string;
  name: string;
  category: "ai" | "ocr" | "credentials" | "billing" | "apis";
  defaultEnabled: boolean;
  enabledForTenants: string[];
}

export interface ProviderHealthStatus {
  id: string;
  providerName: string;
  category: "ai" | "payment" | "communication" | "storage" | "cdn";
  latencyMs: number;
  status: "healthy" | "degraded" | "down";
  uptimePercent: number;
}
