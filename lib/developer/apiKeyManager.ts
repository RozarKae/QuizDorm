import { ApiKey, ApiPermissionScope } from "@/lib/types/developer";

const STORAGE_KEY_API_KEYS = "quizdorm_developer_api_keys";

export const DEFAULT_API_KEYS: ApiKey[] = [
  {
    id: "key-101",
    name: "Production LMS Integration Key",
    keyPrefix: "qd_live_8a4f91e",
    secretHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    environment: "production",
    scopes: ["read:questions", "write:questions", "read:quizzes", "manage:certificates"],
    createdAt: "2026-07-20T12:00:00Z",
    lastUsedAt: "2026-07-24T10:45:00Z",
    revoked: false,
    rateLimitPerMin: 1000,
  },
  {
    id: "key-102",
    name: "Development Sandbox Key",
    keyPrefix: "qd_test_3c9b71f",
    secretHash: "a458b92d6e3c108428f72c4e9124a56b829e1d3c456a789b012c345d678e901f",
    environment: "sandbox",
    scopes: ["full_access"],
    createdAt: "2026-07-22T08:30:00Z",
    lastUsedAt: "2026-07-24T10:50:00Z",
    revoked: false,
    rateLimitPerMin: 5000,
  },
];

export class ApiKeyManager {
  public static getApiKeys(): ApiKey[] {
    if (typeof window === "undefined") return DEFAULT_API_KEYS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_API_KEYS);
      return saved ? JSON.parse(saved) : DEFAULT_API_KEYS;
    } catch {
      return DEFAULT_API_KEYS;
    }
  }

  public static createApiKey(params: {
    name: string;
    environment: "production" | "sandbox";
    scopes: ApiPermissionScope[];
  }): { apiKey: ApiKey; rawKey: string } {
    const envPrefix = params.environment === "production" ? "qd_live_" : "qd_test_";
    const randomHex = Array.from(new Uint8Array(24))
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

    const rawKey = `${envPrefix}${randomHex}`;
    const keyPrefix = rawKey.substring(0, 15);

    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: params.name,
      keyPrefix,
      secretHash: "hash_" + Date.now(),
      environment: params.environment,
      scopes: params.scopes,
      createdAt: new Date().toISOString(),
      revoked: false,
      rateLimitPerMin: params.environment === "production" ? 1000 : 5000,
    };

    const current = this.getApiKeys();
    const updated = [newKey, ...current];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_API_KEYS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save API key", e);
      }
    }

    return { apiKey: newKey, rawKey };
  }

  public static validateApiKey(rawKey: string): { valid: boolean; apiKey?: ApiKey } {
    const keys = this.getApiKeys();
    const found = keys.find((k) => rawKey.startsWith(k.keyPrefix) && !k.revoked);
    if (!found) return { valid: false };
    return { valid: true, apiKey: found };
  }
}
