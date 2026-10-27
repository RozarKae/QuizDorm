import { MasteryLevel,StudentKnowledgeProfile } from "@/lib/types/adaptive";

const STORAGE_KEY_PROFILE = "quizdorm_student_profile";

export const DEFAULT_STUDENT_PROFILE: StudentKnowledgeProfile = {
  studentId: "std-101",
  studentName: "Karthik Rajendran",
  overallMasteryPercent: 82,
  overallAccuracyPercent: 86,
  overallAvgSpeedSeconds: 42,
  studyStreakDays: 7,
  totalQuizzesCompleted: 18,
  totalQuestionsAnswered: 142,
  subjectMastery: {
    Mathematics: 88,
    Biology: 74,
    Physics: 84,
    "Computer Science": 90,
  },
  topicMasteryList: [
    { topic: "Algebra & Calculus", subject: "Mathematics", masteryPercent: 92, level: "Master", totalAttempted: 45, correctCount: 42, avgResponseSeconds: 38 },
    { topic: "Circulatory Anatomy", subject: "Biology", masteryPercent: 62, level: "Intermediate", totalAttempted: 25, correctCount: 16, avgResponseSeconds: 52 },
    { topic: "Kinematics & Force", subject: "Physics", masteryPercent: 85, level: "Advanced", totalAttempted: 35, correctCount: 30, avgResponseSeconds: 40 },
    { topic: "Algorithms & Data Struct", subject: "Computer Science", masteryPercent: 90, level: "Master", totalAttempted: 37, correctCount: 34, avgResponseSeconds: 32 },
  ],
  bloomsLevelProgress: {
    Remember: 95,
    Understand: 88,
    Apply: 82,
    Analyze: 74,
    Evaluate: 68,
    Create: 60,
  },
  weakTopics: ["Circulatory Anatomy", "Cellular Respiration"],
  strongTopics: ["Algebra & Calculus", "Algorithms & Data Struct", "Kinematics & Force"],
  lastUpdated: new Date().toISOString(),
};

export class KnowledgeProfileManager {
  /**
   * Get student knowledge profile from localStorage
   */
  public static getProfile(): StudentKnowledgeProfile {
    if (typeof window === "undefined") return DEFAULT_STUDENT_PROFILE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT_PROFILE;
    } catch {
      return DEFAULT_STUDENT_PROFILE;
    }
  }

  /**
   * Update student profile after completing a quiz attempt
   */
  public static updateAfterAttempt(
    subject: string,
    topic: string,
    correct: boolean,
    responseTimeSec: number
  ): StudentKnowledgeProfile {
    const profile = this.getProfile();

    const topicItem = profile.topicMasteryList.find((t) => t.topic === topic) || {
      topic,
      subject,
      masteryPercent: 70,
      level: "Intermediate" as MasteryLevel,
      totalAttempted: 0,
      correctCount: 0,
      avgResponseSeconds: 45,
    };

    topicItem.totalAttempted += 1;
    if (correct) topicItem.correctCount += 1;
    topicItem.avgResponseSeconds = Math.round((topicItem.avgResponseSeconds + responseTimeSec) / 2);
    topicItem.masteryPercent = Math.round((topicItem.correctCount / topicItem.totalAttempted) * 100);

    if (topicItem.masteryPercent >= 90) topicItem.level = "Master";
    else if (topicItem.masteryPercent >= 80) topicItem.level = "Advanced";
    else if (topicItem.masteryPercent >= 65) topicItem.level = "Intermediate";
    else topicItem.level = "Beginner";

    profile.totalQuestionsAnswered += 1;
    profile.lastUpdated = new Date().toISOString();

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
      } catch (e) {
        console.error("Failed to update student profile", e);
      }
    }
    return profile;
  }
}
