import { CurriculumExchangePackage } from "@/lib/types/global-network";

export const DEFAULT_PACKAGES: CurriculumExchangePackage[] = [
  {
    id: "pkg-101",
    title: "International Baccalaureate (IB) Higher Level Physics Framework",
    institutionName: "Cambridge International Education Network",
    country: "United Kingdom",
    subject: "Physics",
    gradeLevel: "Grade 11 - 12",
    licensingType: "Open Educational Resource (OER)",
    downloadsCount: 3420,
  },
  {
    id: "pkg-102",
    title: "Advanced STEM & AI Ethics Assessment Curriculum",
    institutionName: "MIT Media Lab",
    country: "United States",
    subject: "Computer Science",
    gradeLevel: "Undergraduate / K-12",
    licensingType: "Institutional License",
    downloadsCount: 2150,
  },
];

export class CurriculumExchangeEngine {
  public static getPackages(): CurriculumExchangePackage[] {
    return DEFAULT_PACKAGES;
  }
}
