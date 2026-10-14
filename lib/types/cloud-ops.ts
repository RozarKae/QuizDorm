export interface CloudTenant {
  tenantId: string;
  institutionName: string;
  customDomain: string; // e.g. "metrotech.quizdorm.edu"
  region: "US-East (N. Virginia)" | "EU-Central (Frankfurt)" | "AP-South (Mumbai)" | "SA-East (São Paulo)";
  isolatedDatabase: boolean;
  allocatedCpuCores: number;
  allocatedRamGB: number;
  activeUsersCount: number;
  status: "Active" | "Provisioning" | "Suspended";
}

export interface ClusterNode {
  nodeId: string;
  region: string;
  kubernetesVersion: string;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  activePodsCount: number;
  nodeStatus: "Ready" | "NotReady" | "Scaling";
}

export interface DisasterRecoveryPlan {
  planId: string;
  activeRegion: string;
  standbyRegion: string;
  rpoSeconds: number; // Recovery Point Objective (0s = zero data loss)
  rtoMinutes: number; // Recovery Time Objective (1min = instant failover)
  lastBackupSnapshotTime: string;
  failoverStatus: "Active-Active Sync" | "Failover Triggered" | "Testing";
}

export interface ZeroTrustIdentity {
  providerId: string;
  ssoProtocol: "SAML 2.0" | "OAuth2 / OIDC" | "Azure AD" | "Okta SSO";
  tenantDomain: string;
  enforceMFA: boolean;
  activeSessionsCount: number;
  threatAlertsCount: number;
}

export interface AIModelInstance {
  modelId: string;
  modelName: string; // e.g. "Gemini-Education-Pro-1.5", "Llama-3-Edu-70B"
  gpuAllocatedType: "NVIDIA H100 SXM5" | "NVIDIA A100 80GB";
  gpuClusterNodes: number;
  inferenceLatencyMs: number;
  ragVectorCount: number;
  status: "Serving" | "Warmup" | "Offline";
}

export interface DeveloperAPIRoute {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  version: string;
  rateLimitPerMin: number;
  avgResponseTimeMs: number;
  status: "Operational" | "Degraded" | "Maintenance";
}

export interface ComplianceFramework {
  frameworkName: "GDPR (EU Data Privacy)" | "FERPA (US Educational Rights)" | "SOC 2 Type II" | "ISO/IEC 27001:2022";
  complianceScorePercent: number;
  auditTrailLogsCount: number;
  dataResidencyRegion: string;
  status: "Certified & Compliant" | "Audit Pending";
}

export interface OperationsCenterMetric {
  globalUptimePercent: number; // e.g. 99.999%
  globalRequestsPerSec: number;
  totalStorageTB: number;
  activeEduNodes: number;
}
