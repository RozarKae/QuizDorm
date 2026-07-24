import { CurriculumFramework } from "@/lib/types/academic-integration";

export const DEFAULT_CURRICULUM_FRAMEWORKS: CurriculumFramework[] = [
  { id: "cur-1", name: "CBSE", subject: "Mathematics & Physics Class 12", mappedUnitsCount: 14, mappedQuestionsCount: 450, coveragePercent: 96 },
  { id: "cur-2", name: "IB", subject: "International Baccalaureate Higher Level Biology", mappedUnitsCount: 12, mappedQuestionsCount: 380, coveragePercent: 92 },
  { id: "cur-3", name: "Cambridge", subject: "Cambridge A-Level Advanced Mathematics", mappedUnitsCount: 10, mappedQuestionsCount: 310, coveragePercent: 90 },
  { id: "cur-4", name: "ICSE", subject: "ICSE Class 10 Science & Mathematics", mappedUnitsCount: 16, mappedQuestionsCount: 520, coveragePercent: 98 },
];

export class CurriculumMappingEngine {
  public static getFrameworks(): CurriculumFramework[] {
    return DEFAULT_CURRICULUM_FRAMEWORKS;
  }
}
