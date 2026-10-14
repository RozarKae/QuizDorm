import { LicenseType } from "@/lib/types/marketplace";

export class DigitalLicensingEngine {
  public static generateLicenseKey(productId: string, licenseType: LicenseType): { licenseKey: string; maxSeats: number; watermarkedTag: string } {
    const key = `QD-LIC-${licenseType.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const maxSeats = licenseType === "personal" ? 1 : licenseType === "classroom" ? 35 : licenseType === "school" ? 500 : 5000;
    return {
      licenseKey: key,
      maxSeats,
      watermarkedTag: `Licensed to Organization via QuizDorm DRM (${key})`,
    };
  }
}
