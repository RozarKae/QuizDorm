import { QuestionItem } from "@/lib/types/question";
import { BloomsTaxonomyLevel } from "@/lib/types/quality";

export class BloomsClassifier {
  /**
   * Classify question into Bloom's Taxonomy cognitive level based on action verbs and intent
   */
  public static classifyBlooms(question: Partial<QuestionItem>): BloomsTaxonomyLevel {
    const text = (question.title || "").toLowerCase();

    if (text.match(/\b(design|construct|create|formulate|author|compose|build)\b/)) {
      return "Create";
    }
    if (text.match(/\b(evaluate|judge|appraise|defend|critique|justify)\b/)) {
      return "Evaluate";
    }
    if (text.match(/\b(analyze|compare|contrast|differentiate|dissect|examine)\b/)) {
      return "Analyze";
    }
    if (text.match(/\b(apply|calculate|solve|use|implement|execute|demonstrate)\b/)) {
      return "Apply";
    }
    if (text.match(/\b(explain|describe|discuss|identify|summarize|interpret|classify)\b/)) {
      return "Understand";
    }
    return "Remember"; // default baseline recall
  }
}
