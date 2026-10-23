export interface TestAccount {
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "school" | "admin";
  password: string;
  redirectUrl: string;
}

export const TEST_ACCOUNTS: Record<string, TestAccount> = {
  "admin@quizdorm.com": {
    id: "usr-admin-01",
    email: "admin@quizdorm.com",
    name: "Master Superadmin",
    role: "admin",
    password: "Admin#QuizDorm2026!",
    redirectUrl: "/admin",
  },
  "school@quizdorm.com": {
    id: "usr-school-01",
    email: "school@quizdorm.com",
    name: "Govt Model & Matriculation Admin",
    role: "school",
    password: "School#Campus2026!",
    redirectUrl: "/school",
  },
  "teacher@quizdorm.com": {
    id: "usr-teacher-01",
    email: "teacher@quizdorm.com",
    name: "Prof. Sarah Jenkins",
    role: "teacher",
    password: "Teacher#Educator2026!",
    redirectUrl: "/teacher",
  },
  "student@quizdorm.com": {
    id: "usr-student-01",
    email: "student@quizdorm.com",
    name: "Karthik Rajendran",
    role: "student",
    password: "Student#Learner2026!",
    redirectUrl: "/student",
  },
};
