export interface ClassItem {
  id: string;
  name: string; // e.g. "Class 12-A"
  description?: string;
  department: string;
  academicYear: string;
  teacherId: string;
  teacherName: string;
  coTeachers: string[];
  studentCount: number;
  quizCount: number;
  code: string; // e.g. CLS-8819
  createdAt: string;
}

export type AssignmentType = "quiz" | "homework";
export type AssignmentStatus = "Active" | "Scheduled" | "Closed";

export interface AssignmentItem {
  id: string;
  title: string;
  description?: string;
  quizId?: string;
  quizTitle?: string;
  type: AssignmentType;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  dueTime: string;
  totalMarks: number;
  submittedCount: number;
  totalStudents: number;
  status: AssignmentStatus;
  createdAt: string;
}

export interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  status: "submitted" | "graded" | "pending";
  submittedAt: string;
  grade?: number;
  feedback?: string;
  attachmentUrl?: string;
}

export interface AnnouncementNotice {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  targetClass: string;
  postedDate: string;
  isImportant: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: "quiz" | "assignment" | "competition" | "event";
  link?: string;
  description?: string;
}
