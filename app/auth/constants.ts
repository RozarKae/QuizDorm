import { UserRole } from "@/lib/types/user";

export interface TestAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  password: string;
  redirectUrl: string;
}

export const TEST_ACCOUNTS: Record<string, TestAccount> = {
  "superadmin@quizdorm.com": {
    id: "usr-superadmin-01",
    email: "superadmin@quizdorm.com",
    name: "Corporate Super Admin (Employees & Institutes)",
    role: "superadmin",
    roleLabel: "Super Admin",
    password: "SuperAdmin#2026!",
    redirectUrl: "/admin",
  },
  "masteradmin@quizdorm.com": {
    id: "usr-masteradmin-01",
    email: "masteradmin@quizdorm.com",
    name: "Academic Master Admin (Content, Quizzes & Subscribers)",
    role: "masteradmin",
    roleLabel: "Master Admin",
    password: "MasterAdmin#2026!",
    redirectUrl: "/admin/master",
  },
  "admin@quizdorm.com": {
    id: "usr-admin-01",
    email: "admin@quizdorm.com",
    name: "Corporate Super Admin",
    role: "superadmin",
    roleLabel: "Super Admin",
    password: "Admin#QuizDorm2026!",
    redirectUrl: "/admin",
  },
  "institution@quizdorm.com": {
    id: "usr-institution-01",
    email: "institution@quizdorm.com",
    name: "Govt Model & Matriculation Admin",
    role: "institution",
    roleLabel: "Institution",
    password: "School#Campus2026!",
    redirectUrl: "/school",
  },
  "school@quizdorm.com": {
    id: "usr-school-01",
    email: "school@quizdorm.com",
    name: "Govt Model & Matriculation Admin",
    role: "institution",
    roleLabel: "Institution",
    password: "School#Campus2026!",
    redirectUrl: "/school",
  },
  "handler@quizdorm.com": {
    id: "usr-handler-01",
    email: "handler@quizdorm.com",
    name: "Prof. Sarah Jenkins",
    role: "handler",
    roleLabel: "Handler",
    password: "Teacher#Educator2026!",
    redirectUrl: "/teacher",
  },
  "teacher@quizdorm.com": {
    id: "usr-teacher-01",
    email: "teacher@quizdorm.com",
    name: "Prof. Sarah Jenkins",
    role: "handler",
    roleLabel: "Handler",
    password: "Teacher#Educator2026!",
    redirectUrl: "/teacher",
  },
  "member@quizdorm.com": {
    id: "usr-member-01",
    email: "member@quizdorm.com",
    name: "Karthik Rajendran",
    role: "member",
    roleLabel: "Member",
    password: "Student#Learner2026!",
    redirectUrl: "/student",
  },
  "student@quizdorm.com": {
    id: "usr-student-01",
    email: "student@quizdorm.com",
    name: "Karthik Rajendran",
    role: "member",
    roleLabel: "Member",
    password: "Student#Learner2026!",
    redirectUrl: "/student",
  },
  "subscriber@quizdorm.com": {
    id: "usr-subscriber-01",
    email: "subscriber@quizdorm.com",
    name: "Devon Reed (Subscriber)",
    role: "subscriber",
    roleLabel: "Subscriber",
    password: "Subscriber#QuizDorm2026!",
    redirectUrl: "/student",
  },
};
