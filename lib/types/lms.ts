export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "Masterclass";
export type CourseStatus = "Published" | "Draft" | "Archived";

export interface LMSCourse {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  subject: string;
  level: CourseLevel;
  instructorName: string;
  instructorTitle: string;
  enrolledStudents: number;
  rating: number;
  totalChapters: number;
  totalLessons: number;
  durationHours: number;
  prerequisites: string[];
  thumbnailUrl: string;
  status: CourseStatus;
  createdAt: string;
}

export interface LMSLesson {
  id: string;
  courseId: string;
  chapterTitle: string;
  lessonTitle: string;
  lessonType: "Video" | "Audio" | "Interactive" | "Reading";
  durationMinutes: number;
  contentBody: string;
  videoUrl?: string;
  audioUrl?: string;
  isCompleted: boolean;
  orderIndex: number;
}

export interface LMSContentResource {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Audio" | "Presentation" | "Document" | "External Link";
  fileSize?: string;
  courseId?: string;
  downloads: number;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
}

export interface SkillMilestone {
  id: string;
  title: string;
  requiredSkill: string;
  points: number;
  isUnlocked: boolean;
  order: number;
}

export interface LearningPath {
  id: string;
  title: string;
  targetRole: string;
  description: string;
  totalCourses: number;
  completedCourses: number;
  milestones: SkillMilestone[];
  progressPercent: number;
}

export interface PracticeExercise {
  id: string;
  lessonId: string;
  title: string;
  type: "Quiz" | "Coding" | "Interactive";
  question: string;
  options?: string[];
  correctAnswer?: string;
  starterCode?: string;
  solutionCode?: string;
  points: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
}

export interface StudentLearningProfile {
  studentId: string;
  studentName: string;
  enrolledCount: number;
  completedCount: number;
  totalHoursLearned: number;
  currentStreakDays: number;
  badges: AchievementBadge[];
  weakTopics: { topic: string; score: number }[];
}

export interface LMSDiscussionTopic {
  id: string;
  courseId: string;
  title: string;
  content: string;
  authorName: string;
  postedAt: string;
  repliesCount: number;
  isPinned: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  memberCount: number;
  maxMembers: number;
  leaderName: string;
}

export interface LMSAnalyticsData {
  courseCompletionRate: number;
  avgTimeSpentMinutes: number;
  activeLearnersDaily: number;
  popularLessons: { title: string; views: number }[];
  weeklyHeatmap: { day: string; hours: number[] }[];
}

export interface EnterpriseInstitution {
  id: string;
  name: string;
  code: string;
  departmentsCount: number;
  facultyCount: number;
  studentQuota: number;
  activeStudents: number;
  creditSystemActive: boolean;
  whiteLabelDomain: string;
}
