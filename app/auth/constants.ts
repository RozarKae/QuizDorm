export interface TestAccount {
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "school" | "admin";
  password: string;
  redirectUrl: string;
}

export const TEST_ACCOUNTS: Record<string, TestAccount> = {
  "teacher@quizdorm.com": {
    id: "usr-teacher-01",
    email: "teacher@quizdorm.com",
    name: "Prof. Sarah Jenkins",
    role: "teacher",
    password: "Password123!",
    redirectUrl: "/teacher",
  },
  "school@quizdorm.com": {
    id: "usr-school-01",
    email: "school@quizdorm.com",
    name: "Oakridge Academy Admin",
    role: "school",
    password: "Password123!",
    redirectUrl: "/school",
  },
  "student@quizdorm.com": {
    id: "usr-student-01",
    email: "student@quizdorm.com",
    name: "Alex Rivera",
    role: "student",
    password: "Password123!",
    redirectUrl: "/student",
  },
};
