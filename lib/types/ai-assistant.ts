export type BloomsLevel = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";

export interface AILessonPlan {
  id: string;
  topic: string;
  subject: string;
  gradeLevel: string;
  durationMinutes: number;
  learningObjectives: { level: BloomsLevel; text: string }[];
  timeline: { timeMinutes: number; phase: string; activity: string; teacherAction: string }[];
  homeworkSuggestion: string;
  recommendedResources: string[];
  createdAt: string;
}

export interface GeneratedContent {
  id: string;
  title: string;
  type: "Lecture Notes" | "Worksheet" | "Flashcards" | "Reading Passage" | "Mind Map";
  subject: string;
  content: string;
  flashcards?: { question: string; answer: string }[];
  createdAt: string;
}

export interface AIAssessmentDraft {
  id: string;
  title: string;
  subject: string;
  totalMarks: number;
  questions: {
    id: string;
    questionText: string;
    options?: string[];
    correctAnswer: string;
    difficulty: "Easy" | "Medium" | "Hard";
    bloomsLevel: BloomsLevel;
  }[];
  rubric: { criterion: string; maxPoints: number; guidance: string }[];
  createdAt: string;
}

export interface LiveClassroomSuggestion {
  id: string;
  timestamp: string;
  suggestionType: "Engagement Boost" | "Discussion Prompt" | "Icebreaker" | "Pacing Alert";
  text: string;
  recommendedAction: string;
}

export interface StudentSupportPlan {
  studentId: string;
  studentName: string;
  weakTopics: string[];
  recommendedDrills: string[];
  personalizedSchedule: string[];
  aiTutorPrompt: string;
}

export interface CommunicationDraft {
  id: string;
  recipientType: "Parent" | "Student" | "Faculty" | "School Admin";
  subjectLine: string;
  bodyText: string;
  targetLanguage: string;
  channel: "Email" | "SMS" | "WhatsApp" | "Notice";
  createdAt: string;
}

export interface InstructionalAnalytics {
  classId: string;
  className: string;
  masteryRate: number;
  engagementIndex: number;
  learningGaps: { topic: string; affectedStudentsCount: number }[];
  aiActionRecommendations: string[];
}

export interface ResourceRecommendation {
  id: string;
  title: string;
  type: "Book" | "Video" | "Article" | "Lab Activity" | "Interactive Game";
  url: string;
  relevanceScore: number;
  curriculumTopic: string;
}

export interface TeacherWorkspaceAgenda {
  date: string;
  pendingTasks: { id: string; title: string; dueTime: string; isDone: boolean; priority: "high" | "normal" }[];
  alerts: { id: string; text: string; severity: "warning" | "info" }[];
}

export interface AutonomousAIAgent {
  agentId: string;
  name: string;
  role: string;
  description: string;
  status: "Idle" | "Running" | "Completed";
  lastTaskExecuted: string;
  logs: string[];
}
