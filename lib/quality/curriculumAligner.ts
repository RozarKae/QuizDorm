import { CurriculumAlignment } from "@/lib/types/quality";
import { QuestionItem } from "@/lib/types/question";

export class CurriculumAligner {
  public static alignCurriculum(question: Partial<QuestionItem>): CurriculumAlignment {
    const subject = question.subject || "Mathematics";
    const category = question.category || "Algebra";
    const topic = question.topic || "General";

    const learningOutcomes = [
      `Demonstrate mastery of key concepts in ${category} (${topic}).`,
      `Apply analytical problem-solving techniques to ${subject} assessment items.`,
    ];

    const curriculumTags = [
      subject.toLowerCase(),
      category.toLowerCase(),
      topic.toLowerCase().replace(/\s+/g, "_"),
      "grade_12",
    ];

    return {
      subject,
      category,
      topic,
      suggestedSubtopic: question.subtopic || `${topic} Foundations`,
      gradeLevel: "Grade 12 / Higher Sec",
      learningOutcomes,
      curriculumTags,
      alignmentScore: 94,
    };
  }
}
