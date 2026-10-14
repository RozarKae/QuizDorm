export interface CloudRegionNode {
  regionId: string;
  location: string;
  status: "healthy" | "degraded";
  dataResidencyCompliance: string;
  latencyMs: number;
}

export const DEFAULT_CLOUD_REGIONS: CloudRegionNode[] = [
  { regionId: "us-east-1", location: "N. Virginia, USA", status: "healthy", dataResidencyCompliance: "FERPA & COPPA Compliant", latencyMs: 18 },
  { regionId: "eu-central-1", location: "Frankfurt, Germany", status: "healthy", dataResidencyCompliance: "GDPR Compliant", latencyMs: 32 },
  { regionId: "ap-south-1", location: "Mumbai, India", status: "healthy", dataResidencyCompliance: "DPDP Compliant", latencyMs: 24 },
  { regionId: "ap-east-1", location: "Singapore", status: "healthy", dataResidencyCompliance: "PDPA Compliant", latencyMs: 28 },
];

export class FederatedCloudManager {
  public static getRegionNodes(): CloudRegionNode[] {
    return DEFAULT_CLOUD_REGIONS;
  }
}
