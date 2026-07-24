export type ClubCategory = "school_club" | "quiz_institute" | "subject_club" | "olympiad_club" | "science_club" | "general";

export type DiscussionTag = "question_answer" | "study_notes" | "career_guidance" | "competition_prep" | "ai_tips";

export interface QuizClub {
  id: string;
  name: string;
  description: string;
  category: ClubCategory;
  membersCount: number;
  verifiedBadge: boolean;
  avatarUrl?: string;
  leaderName: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatarUrl?: string;
  title: string;
  content: string;
  tags: DiscussionTag[];
  upvotesCount: number;
  commentsCount: number;
  acceptedAnswer: boolean;
  timestamp: string;
  aiSummary?: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  membersCount: number;
  sharedNotesCount: number;
  sharedQuizzesCount: number;
  isPrivate: boolean;
}

export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  organization: string;
  rating: number;
  reviewsCount: number;
  availableOfficeHours: string;
  totalMentees: number;
}

export interface ReputationLeaderboard {
  rank: number;
  name: string;
  reputationPoints: number;
  badgeTitle: string;
}
