export type ClassroomTemplate = "STEM" | "Humanities" | "Corporate Training" | "Quiz Prep" | "General Academic";

export interface VirtualClassroom {
  id: string;
  name: string;
  code: string;
  subject: string;
  department: string;
  batch: string;
  section: string;
  semester: string;
  academicYear: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  coTeachers: string[];
  studentCount: number;
  template: ClassroomTemplate;
  bannerColor: string;
  isArchived: boolean;
  announcementsCount: number;
  activeLiveSession?: boolean;
  createdAt: string;
}

export interface ClassroomAnnouncement {
  id: string;
  classroomId: string;
  authorName: string;
  authorRole: string;
  title: string;
  content: string;
  postedAt: string;
  isPinned: boolean;
}

export interface Participant {
  id: string;
  name: string;
  role: "host" | "co-host" | "student" | "guest";
  avatarUrl?: string;
  hasVideo: boolean;
  hasAudio: boolean;
  isScreenSharing: boolean;
  handRaised: boolean;
  status: "in-class" | "waiting-room" | "left";
  joinedAt: string;
  attendanceVerified: boolean;
}

export interface LiveSession {
  id: string;
  classroomId: string;
  classroomName: string;
  topic: string;
  startedAt: string;
  isRecording: boolean;
  activeBreakoutRooms: number;
  participants: Participant[];
  waitingRoomCount: number;
}

export interface LiveChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
  isAnnouncement?: boolean;
}

export interface BreakoutRoom {
  id: string;
  name: string;
  participantIds: string[];
  maxCapacity: number;
}

export type WhiteboardTool = "select" | "pen" | "highlighter" | "eraser" | "rectangle" | "circle" | "line" | "arrow" | "text" | "sticky" | "laser" | "pointer" | "formula";

export interface WhiteboardElement {
  id: string;
  type: WhiteboardTool;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  size: number;
  points?: { x: number; y: number }[];
  text?: string;
  latex?: string;
}

export type AttendanceMethod = "AI Face Recognition" | "QR Code" | "PIN Code" | "GPS Geo-Fence" | "Manual";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: "Present" | "Late" | "Absent" | "Excused";
  method: AttendanceMethod;
  timestamp: string;
  entryTime: string;
  exitTime?: string;
  locationDetails?: string;
  confidenceScore?: number;
}

export interface RubricCriterion {
  id: string;
  title: string;
  maxPoints: number;
  description: string;
}

export interface Assignment {
  id: string;
  classroomId: string;
  title: string;
  description: string;
  type: "Assignment" | "Homework" | "Lab Report" | "Project";
  dueDate: string;
  dueTime: string;
  totalPoints: number;
  rubrics: RubricCriterion[];
  attachedFiles: { name: string; size: string; url: string }[];
  submittedCount: number;
  gradedCount: number;
  totalStudents: number;
  status: "Active" | "Draft" | "Closed";
  createdAt: string;
}

export interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  isLate: boolean;
  files: { name: string; url: string }[];
  status: "pending" | "graded";
  score?: number;
  feedback?: string;
  aiGradingSuggestion?: {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  };
}

export interface DiscussionTopic {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  repliesCount: number;
  isPinned: boolean;
  tags: string[];
}

export interface QuestionBoardItem {
  id: string;
  question: string;
  authorName: string;
  upvotes: number;
  isAnswered: boolean;
  answer?: string;
  askedAt: string;
}

export interface LivePollOption {
  id: string;
  text: string;
  votes: number;
}

export interface LivePoll {
  id: string;
  question: string;
  options: LivePollOption[];
  totalVotes: number;
  isActive: boolean;
  createdAt: string;
}

export interface BrainstormItem {
  id: string;
  text: string;
  authorName: string;
  color: string;
  x: number;
  y: number;
}

export interface ClassroomResource {
  id: string;
  title: string;
  category: "Lecture Notes" | "PDF" | "Video" | "Presentation" | "Audio" | "Link";
  fileSize?: string;
  url: string;
  folderId?: string;
  downloads: number;
  uploadedBy: string;
  uploadedAt: string;
  version: string;
}

export interface AILectureSummary {
  id: string;
  sessionTopic: string;
  date: string;
  keyTakeaways: string[];
  actionItems: string[];
  suggestedHomework: string[];
  transcriptExcerpt: string;
}

export interface AITeachingInsight {
  id: string;
  metric: string;
  insight: string;
  type: "positive" | "warning" | "recommendation";
}

export interface ClassroomAnalyticsData {
  averageAttendanceRate: number;
  participationScore: number;
  assignmentCompletionRate: number;
  engagementTrend: { date: string; score: number }[];
  weeklyHeatmap: { day: string; hours: number[] }[];
  topPerformersCount: number;
  needsAttentionCount: number;
}

export interface HybridDeviceSync {
  deviceId: string;
  deviceName: string;
  deviceType: "Smart TV" | "Interactive Board" | "Tablet" | "Mobile";
  status: "Connected" | "Syncing" | "Offline";
  physicalRoomStudents: number;
  onlineStreamStudents: number;
  lastSyncedAt: string;
}
