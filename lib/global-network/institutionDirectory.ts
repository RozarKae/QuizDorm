import { GlobalInstitution,InstitutionType } from "@/lib/types/global-network";

const STORAGE_KEY_INSTITUTIONS = "quizdorm_global_institutions";

export const DEFAULT_INSTITUTIONS: GlobalInstitution[] = [
  {
    id: "inst-101",
    name: "Cambridge International Education Network",
    country: "United Kingdom",
    region: "Europe (UK)",
    type: "university",
    accreditation: "fully_accredited",
    verifiedBadge: true,
    studentCount: 142000,
    programsCount: 120,
  },
  {
    id: "inst-102",
    name: "MIT Media Lab & STEM Foundation",
    country: "United States",
    region: "North America",
    type: "university",
    accreditation: "fully_accredited",
    verifiedBadge: true,
    studentCount: 98000,
    programsCount: 85,
  },
  {
    id: "inst-103",
    name: "Singapore National Science & Quiz Olympiad Council",
    country: "Singapore",
    region: "Asia (Southeast)",
    type: "certification_body",
    accreditation: "verified_partner",
    verifiedBadge: true,
    studentCount: 45000,
    programsCount: 40,
  },
];

export class GlobalInstitutionDirectory {
  public static getInstitutions(type?: InstitutionType): GlobalInstitution[] {
    if (typeof window === "undefined") return DEFAULT_INSTITUTIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INSTITUTIONS);
      const list: GlobalInstitution[] = saved ? JSON.parse(saved) : DEFAULT_INSTITUTIONS;
      return type ? list.filter((i) => i.type === type) : list;
    } catch {
      return DEFAULT_INSTITUTIONS;
    }
  }
}
