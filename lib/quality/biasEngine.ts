import { QuestionItem } from "@/lib/types/question";
import { BiasFairnessReport } from "@/lib/types/quality";

export class BiasFairnessEngine {
  public static auditBias(question: Partial<QuestionItem>): BiasFairnessReport {
    const text = (question.title || "").toLowerCase();
    const issues: string[] = [];
    const neutralAlternatives: string[] = [];

    let genderBias = false;
    let culturalBias = false;
    let sensitiveContent = false;

    // Check gender assumptions
    if (text.includes("mankind") || text.includes("man-made") || text.includes("fireman")) {
      genderBias = true;
      issues.push("Non-inclusive language detected (e.g. 'man-made' or 'mankind').");
      neutralAlternatives.push("Replace 'man-made' with 'artificial' or 'synthetic'.");
    }

    // Check cultural assumptions
    if (text.includes("dollar") && !text.includes("currency")) {
      culturalBias = true;
      issues.push("Localized currency assumption. Use universal terms or explicitly state currency.");
    }

    const hasBias = genderBias || culturalBias || sensitiveContent;

    return {
      hasBias,
      culturalBiasDetected: culturalBias,
      genderBiasDetected: genderBias,
      sensitiveContentDetected: sensitiveContent,
      issues,
      neutralAlternatives,
    };
  }
}
