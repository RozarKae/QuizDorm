export type ApiPermissionScope =
  | "read:questions"
  | "write:questions"
  | "read:quizzes"
  | "write:quizzes"
  | "read:students"
  | "manage:certificates"
  | "manage:webhooks"
  | "full_access";

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string; // e.g. qd_live_8a4f...
  secretHash: string;
  environment: "production" | "sandbox";
  scopes: ApiPermissionScope[];
  createdAt: string;
  lastUsedAt?: string;
  revoked: boolean;
  rateLimitPerMin: number;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  description: string;
  secret: string;
  events: string[];
  enabled: boolean;
  createdAt: string;
  totalDeliveries: number;
  failureRatePercent: number;
}

export interface WebhookDeliveryLog {
  id: string;
  endpointId: string;
  event: string;
  payload: any;
  responseStatusCode: number;
  durationMs: number;
  timestamp: string;
  status: "success" | "failed" | "retrying";
}

export interface OAuthApp {
  id: string;
  clientId: string;
  appName: string;
  redirectUris: string[];
  scopes: ApiPermissionScope[];
  createdAt: string;
}

export interface LMSIntegration {
  id: string;
  platform: "canvas" | "moodle" | "blackboard" | "google_classroom" | "ms_teams";
  name: string;
  status: "connected" | "disconnected" | "syncing";
  lastSyncAt?: string;
  syncedCoursesCount: number;
  syncedStudentsCount: number;
}

export interface CloudConnector {
  id: string;
  provider: "google_drive" | "onedrive" | "dropbox";
  connectedAccount: string;
  status: "active" | "inactive";
  lastBackupAt?: string;
}

export interface ApiUsageMetrics {
  totalRequestsToday: number;
  avgLatencyMs: number;
  successRatePercent: number;
  activeApiKeysCount: number;
  activeWebhooksCount: number;
}

export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  paths: Record<string, any>;
}
