export type SubjectTutor = "mathematics" | "physics" | "chemistry" | "biology" | "computer_science" | "english" | "general";

export type ExplanationLevel = "step_by_step" | "simplified" | "advanced" | "analogy";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai_tutor";
  text: string;
  timestamp: string;
  subject: SubjectTutor;
  explanationLevel?: ExplanationLevel;
  referencedQuestionId?: string;
}

export interface AIFlashcard {
  id: string;
  subject: SubjectTutor;
  frontText: string;
  backText: string;
  formula?: string;
  intervalDays: number;
  masteryLevel: number;
}

export interface StudyGoal {
  id: string;
  title: string;
  subject: SubjectTutor;
  targetDate: string;
  progressPercent: number;
  status: "pending" | "completed";
}

export interface LearningPathMilestone {
  id: string;
  title: string;
  subject: SubjectTutor;
  estimatedMins: number;
  status: "completed" | "current" | "locked";
}
