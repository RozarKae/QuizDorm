import { FeatureFlag } from "@/lib/types/enterprise";

export const DEFAULT_FEATURE_FLAGS: FeatureFlag[] = [
  { key: "flag_ai_generation", name: "AI Question Generation & Tutor", category: "ai", defaultEnabled: true, enabledForTenants: ["tnt-101", "tnt-102"] },
  { key: "flag_ocr_intelligence", name: "Document OCR Intelligence", category: "ocr", defaultEnabled: true, enabledForTenants: ["tnt-101", "tnt-102"] },
  { key: "flag_digital_credentials", name: "Digital Certificates & QR Verification", category: "credentials", defaultEnabled: true, enabledForTenants: ["tnt-101", "tnt-102"] },
  { key: "flag_saas_billing", name: "Multi-Gateway Subscriptions & Invoicing", category: "billing", defaultEnabled: true, enabledForTenants: ["tnt-101"] },
  { key: "flag_public_apis", name: "REST APIs & Webhooks Gateway", category: "apis", defaultEnabled: true, enabledForTenants: ["tnt-101"] },
];

export class FeatureFlagManager {
  public static getFlags(): FeatureFlag[] {
    return DEFAULT_FEATURE_FLAGS;
  }
}
