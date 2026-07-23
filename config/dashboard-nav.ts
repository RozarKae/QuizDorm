export type NavItem = {
  name: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
};

export type DashboardNavConfig = {
  [role: string]: {
    title: string;
    items: NavItem[];
  };
};

const defaultNavItems: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: "dashboard" },
  { name: "Organizations", href: "/dashboard/organizations", icon: "organization" },
  { name: "Classrooms", href: "/dashboard/classes", icon: "school" },
  { name: "Assignments", href: "/dashboard/assignments", icon: "assignments" },
  { name: "Question Bank", href: "/dashboard/questions", icon: "bank" },
  { name: "Quizzes", href: "/dashboard/quizzes", icon: "quizzes" },
  { name: "Question Builder", href: "/dashboard/quizzes/builder", icon: "builder" },
  { name: "Competitions", href: "/dashboard/competitions", icon: "competitions", badge: "Live" },
  { name: "Calendar", href: "/dashboard/calendar", icon: "calendar" },
  { name: "Announcements", href: "/dashboard/announcements", icon: "announcements" },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: "leaderboard" },
  { name: "Profile", href: "/dashboard/profile", icon: "profile" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export const dashboardNavConfig: DashboardNavConfig = {
  admin: {
    title: "Platform Admin",
    items: defaultNavItems,
  },
  school: {
    title: "School Admin",
    items: defaultNavItems,
  },
  teacher: {
    title: "Teacher",
    items: defaultNavItems,
  },
  student: {
    title: "Student",
    items: [
      { name: "Overview", href: "/dashboard", icon: "dashboard" },
      { name: "Assignments", href: "/dashboard/assignments", icon: "assignments" },
      { name: "Quizzes", href: "/dashboard/quizzes", icon: "quizzes" },
      { name: "Competitions", href: "/dashboard/competitions", icon: "competitions", badge: "Live" },
      { name: "Calendar", href: "/dashboard/calendar", icon: "calendar" },
      { name: "Announcements", href: "/dashboard/announcements", icon: "announcements" },
      { name: "Leaderboard", href: "/dashboard/leaderboard", icon: "leaderboard" },
      { name: "Profile", href: "/dashboard/profile", icon: "profile" },
      { name: "Settings", href: "/dashboard/settings", icon: "settings" },
    ],
  },
};
