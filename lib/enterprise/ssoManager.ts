import { SSOConfig } from "@/lib/types/enterprise";

export const DEFAULT_SSO_CONFIGS: SSOConfig[] = [
  {
    id: "sso-101",
    tenantId: "tnt-101",
    provider: "okta",
    issuerUrl: "https://auth.quizdorm.com/oauth2/default",
    clientId: "okta_client_8a4f91e20c",
    enabled: true,
    lastSyncAt: "2026-07-24T10:00:00Z",
  },
  {
    id: "sso-102",
    tenantId: "tnt-102",
    provider: "saml2",
    issuerUrl: "https://idp.stjude.edu/saml2/sso",
    clientId: "saml_entity_stjude_01",
    enabled: true,
    lastSyncAt: "2026-07-24T09:30:00Z",
  },
];

export class SSOManager {
  public static getSSOConfigs(): SSOConfig[] {
    return DEFAULT_SSO_CONFIGS;
  }
}
