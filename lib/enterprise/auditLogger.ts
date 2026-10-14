import { AuditLogEntry, SecurityAlert } from "@/lib/types/enterprise";

const STORAGE_KEY_AUDIT_LOGS = "quizdorm_audit_logs";

export const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-101",
    tenantId: "tnt-101",
    actorName: "Dr. Eleanor Vance",
    actorRole: "Global Administrator",
    action: "TENANT_WHITE_LABEL_UPDATE",
    resource: "Domain & Logo Theme",
    timestamp: "2026-07-24T10:30:00Z",
    ipAddress: "192.168.1.42",
    status: "success",
  },
  {
    id: "log-102",
    tenantId: "tnt-101",
    actorName: "System AI Router",
    actorRole: "Platform Engine",
    action: "AI_MODEL_DISCOVERY_AUTO_FAILOVER",
    resource: "Gemini 2.5 Flash -> Claude 3.5 Sonnet",
    timestamp: "2026-07-24T09:15:00Z",
    ipAddress: "10.0.4.12",
    status: "warning",
  },
  {
    id: "log-103",
    tenantId: "tnt-102",
    actorName: "Marcus Sterling",
    actorRole: "Tournament Director",
    action: "BULK_CERTIFICATE_ISSUANCE",
    resource: "420 Digital Certificates",
    timestamp: "2026-07-24T08:00:00Z",
    ipAddress: "172.16.0.8",
    status: "success",
  },
];

export const DEFAULT_SECURITY_ALERTS: SecurityAlert[] = [
  {
    id: "sec-101",
    severity: "low",
    title: "Multiple Failed Login Attempts",
    description: "3 failed login attempts detected from IP 203.0.113.42 for account admin@quizdorm.com.",
    timestamp: "2026-07-24T10:40:00Z",
    resolved: false,
    sourceIp: "203.0.113.42",
  },
  {
    id: "sec-102",
    severity: "medium",
    title: "API Rate Limit Exceeded",
    description: "API Key qd_test_3c9b71f exceeded burst limit (5000 req/min). Automated throttling applied.",
    timestamp: "2026-07-24T09:50:00Z",
    resolved: true,
  },
];

export class EnterpriseAuditLogger {
  public static getLogs(): AuditLogEntry[] {
    if (typeof window === "undefined") return DEFAULT_AUDIT_LOGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUDIT_LOGS);
      return saved ? JSON.parse(saved) : DEFAULT_AUDIT_LOGS;
    } catch {
      return DEFAULT_AUDIT_LOGS;
    }
  }

  public static getSecurityAlerts(): SecurityAlert[] {
    return DEFAULT_SECURITY_ALERTS;
  }
}
