export interface SISStudentProfile {
  id: string;
  studentIdNumber: string; // e.g. STU-2026-9041
  fullName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  currentGradeBatch: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  bloodGroup: string;
  medicalNotes?: string;
  status: "Active" | "Graduated" | "Transferred" | "Suspended";
  photoUrl: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string; // e.g. APP-2026-4401
  applicantName: string;
  targetProgram: string;
  academicYear: string;
  previousSchool: string;
  gpaPrevious: number;
  entranceExamScore?: number;
  meritRank?: number;
  appliedDate: string;
  status: "Under Review" | "Merit Listed" | "Approved" | "Waitlisted" | "Rejected";
  documentChecklist: { docName: string; isUploaded: boolean; isVerified: boolean }[];
}

export interface AcademicTranscript {
  studentId: string;
  studentName: string;
  rollNumber: string;
  program: string;
  cumulativeGPA: number;
  totalCreditsEarned: number;
  totalCreditsRequired: number;
  graduationEligible: boolean;
  semesters: {
    semesterName: string;
    gpa: number;
    credits: number;
    courses: { code: string; title: string; grade: string; credits: number }[];
  }[];
}

export interface TimetableSlot {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  timeSlot: string; // e.g. "09:00 AM - 10:00 AM"
  subject: string;
  facultyName: string;
  roomNumber: string;
  batchSection: string;
  isConflict: boolean;
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-8801
  studentId: string;
  studentName: string;
  rollNumber: string;
  term: string;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  scholarshipDiscount: number;
  netPayable: number;
  amountPaid: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Overdue" | "Pending";
}

export interface FacultyStaffProfile {
  id: string;
  employeeId: string; // e.g. EMP-2026-101
  fullName: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  joinedDate: string;
  weeklyWorkloadHours: number;
  maxWorkloadHours: number;
  leaveBalanceDays: number;
  status: "Active" | "On Leave font" | "Resigned";
}

export interface OfficialCertificate {
  id: string;
  certificateType: "Transfer Certificate" | "Bonafide Certificate" | "Conduct Certificate" | "Graduation Diploma";
  certificateNumber: string;
  candidateName: string;
  rollNumber: string;
  issueDate: string;
  issuedBy: string;
  qrVerificationUrl: string;
  digitalSignatureHash: string;
}

export interface ParentPortalSummary {
  parentName: string;
  studentName: string;
  rollNumber: string;
  attendancePercent: number;
  currentGPA: number;
  feeStatus: "Paid in Full" | "Pending Dues";
  recentNoticesCount: number;
  aiProgressSummary: string;
}

export interface CampusAdministration {
  campusId: string;
  campusName: string;
  code: string;
  location: string;
  totalStudents: number;
  totalFaculty: number;
  activeBatches: number;
  houses: { houseName: string; color: string; points: number }[];
  clubs: { clubName: string; memberCount: number; leadFaculty: string }[];
}

export interface AlumniProfile {
  id: string;
  alumniId: string;
  fullName: string;
  graduationYear: string;
  degreeEarned: string;
  currentCompany: string;
  jobTitle: string;
  location: string;
  email: string;
  mentorshipOptIn: boolean;
}
