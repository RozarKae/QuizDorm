export type NavItem = {
  name: string;
  href: string;
  icon?: string;
  badge?: string;
  category?: string;
  children?: NavItem[];
};

export type DashboardNavConfig = {
  [role: string]: {
    title: string;
    items: NavItem[];
  };
};

// Role-aware curated navigation structures
const adminNavItems: NavItem[] = [
  // Core Operations
  { name: "Overview", href: "/admin", icon: "dashboard", category: "Core Operations" },
  { name: "Organizations", href: "/dashboard/organizations", icon: "organization", category: "Core Operations" },
  { name: "Enterprise OS", href: "/admin/enterprise", icon: "enterprise_admin", badge: "v2.0", category: "Core Operations" },
  { name: "Tenant Controls", href: "/dashboard/enterprise", icon: "tenant_controls", badge: "Multi-Tenant", category: "Core Operations" },
  { name: "Subscriptions & Billing", href: "/admin/billing", icon: "billing", badge: "Pro SaaS", category: "Core Operations" },

  // Assessment & Competitions
  { name: "Question Bank", href: "/dashboard/questions", icon: "bank", category: "Assessment Engine" },
  { name: "Quizzes", href: "/dashboard/quizzes", icon: "quizzes", category: "Assessment Engine" },
  { name: "Question Builder", href: "/dashboard/quizzes/builder", icon: "builder", category: "Assessment Engine" },
  { name: "Live Competitions", href: "/dashboard/competitions", icon: "competitions", badge: "Live", category: "Assessment Engine" },
  { name: "Tournament Control", href: "/dashboard/competitions/organizer", icon: "tournament_control", badge: "Organizer", category: "Assessment Engine" },
  { name: "Global Olympiads", href: "/dashboard/competitions/global", icon: "global_olympiads", category: "Assessment Engine" },

  // Intelligence & AI Foundation
  { name: "AI Admin Panel", href: "/admin/ai", icon: "ai_admin", badge: "AI Core", category: "AI & Intelligence" },
  { name: "Document Intelligence", href: "/dashboard/ocr", icon: "ocr", badge: "OCR", category: "AI & Intelligence" },
  { name: "Quality & Audit", href: "/dashboard/quality", icon: "quality", badge: "Audit", category: "AI & Intelligence" },
  { name: "Adaptive Engine", href: "/dashboard/adaptive", icon: "adaptive", category: "AI & Intelligence" },

  // Analytics & Systems
  { name: "Platform Analytics", href: "/admin/analytics", icon: "ai_performance", category: "Analytics & Platform" },
  { name: "Audit Reports", href: "/admin/reports", icon: "credentials", category: "Analytics & Platform" },
  { name: "Developer APIs", href: "/dashboard/developer", icon: "developer", badge: "API", category: "Analytics & Platform" },
  { name: "Integrations Hub", href: "/dashboard/integrations", icon: "integrations", category: "Analytics & Platform" },
  { name: "Admin Settings", href: "/admin/settings", icon: "settings", category: "Analytics & Platform" },
];

const schoolNavItems: NavItem[] = [
  // School Operations
  { name: "School Overview", href: "/school", icon: "dashboard", category: "Institution" },
  { name: "Classrooms", href: "/dashboard/classes", icon: "school", category: "Institution" },
  { name: "Academic Directory", href: "/dashboard/organizations", icon: "organization", category: "Institution" },
  { name: "Campus Server", href: "/dashboard/campus", icon: "campus_server", badge: "LAN", category: "Institution" },
  { name: "Academic Integrations", href: "/dashboard/academic", icon: "academic_integrations", badge: "LMS", category: "Institution" },

  // Assessments
  { name: "Question Bank", href: "/dashboard/questions", icon: "bank", category: "Assessments" },
  { name: "Quizzes", href: "/dashboard/quizzes", icon: "quizzes", category: "Assessments" },
  { name: "Assignments", href: "/dashboard/assignments", icon: "assignments", category: "Assessments" },
  { name: "Gradebook Sync", href: "/dashboard/gradebook", icon: "gradebook_sync", category: "Assessments" },
  { name: "Competitions", href: "/dashboard/competitions", icon: "competitions", badge: "Live", category: "Assessments" },

  // Performance & Community
  { name: "School Analytics", href: "/school/analytics", icon: "ai_performance", category: "Insights & Family" },
  { name: "Performance Reports", href: "/school/reports", icon: "credentials", category: "Insights & Family" },
  { name: "Intervention Center", href: "/dashboard/performance/interventions", icon: "risk_interventions", badge: "At-Risk", category: "Insights & Family" },
  { name: "Parent Portal", href: "/dashboard/parent", icon: "parent_portal", category: "Insights & Family" },

  // Administrative
  { name: "Academic Calendar", href: "/dashboard/calendar", icon: "calendar", category: "Administration" },
  { name: "Announcements", href: "/dashboard/announcements", icon: "announcements", category: "Administration" },
  { name: "School Settings", href: "/school/settings", icon: "settings", category: "Administration" },
];

const teacherNavItems: NavItem[] = [
  // Classroom Instruction
  { name: "Teacher Workspace", href: "/teacher", icon: "dashboard", category: "Classroom" },
  { name: "My Classrooms", href: "/dashboard/classes", icon: "school", category: "Classroom" },
  { name: "Assignments", href: "/dashboard/assignments", icon: "assignments", category: "Classroom" },
  { name: "Academic Calendar", href: "/dashboard/calendar", icon: "calendar", category: "Classroom" },

  // Authoring Studio
  { name: "Question Bank", href: "/dashboard/questions", icon: "bank", category: "Authoring Studio" },
  { name: "Quiz Builder", href: "/dashboard/quizzes/builder", icon: "builder", category: "Authoring Studio" },
  { name: "Quizzes", href: "/dashboard/quizzes", icon: "quizzes", category: "Authoring Studio" },
  { name: "Document Intelligence", href: "/dashboard/ocr", icon: "ocr", badge: "AI OCR", category: "Authoring Studio" },
  { name: "Media Library", href: "/dashboard/media", icon: "media", category: "Authoring Studio" },

  // Competitions
  { name: "Live Competitions", href: "/dashboard/competitions", icon: "competitions", badge: "Live", category: "Live Arenas" },
  { name: "Tournament Organizer", href: "/dashboard/competitions/organizer", icon: "tournament_control", category: "Live Arenas" },
  { name: "Join Live Arena", href: "/live/join", icon: "swords", badge: "PIN", category: "Live Arenas" },

  // AI & Analytics
  { name: "Class Analytics", href: "/teacher/analytics", icon: "ai_performance", category: "Intelligence" },
  { name: "Student Reports", href: "/teacher/reports", icon: "credentials", category: "Intelligence" },
  { name: "AI Tutor Workspace", href: "/dashboard/tutor", icon: "ai_tutor", badge: "Copilot", category: "Intelligence" },
  { name: "Quality & Audit", href: "/dashboard/quality", icon: "quality", category: "Intelligence" },
  { name: "Teacher Settings", href: "/teacher/settings", icon: "settings", category: "Settings" },
];

const studentNavItems: NavItem[] = [
  // Learning Hub
  { name: "Personal Hub", href: "/student", icon: "dashboard", category: "Learning Space" },
  { name: "Assigned Quizzes", href: "/dashboard/assignments", icon: "assignments", category: "Learning Space" },
  { name: "Practice Quizzes", href: "/dashboard/quizzes", icon: "quizzes", category: "Learning Space" },
  { name: "Revision Center", href: "/dashboard/revision", icon: "revision", badge: "Spaced", category: "Learning Space" },

  // Arena & Competitions
  { name: "Join Live Arena", href: "/live/join", icon: "swords", badge: "Live", category: "Competition Arena" },
  { name: "Tournaments", href: "/dashboard/competitions", icon: "competitions", category: "Competition Arena" },
  { name: "Global Leaderboard", href: "/dashboard/leaderboard", icon: "leaderboard", category: "Competition Arena" },
  { name: "Quiz Clubs", href: "/dashboard/community/clubs", icon: "quiz_clubs", category: "Competition Arena" },

  // AI Study & Achievements
  { name: "AI Study Coach", href: "/dashboard/tutor/planner", icon: "ai_planner", badge: "Coach", category: "Progress & Growth" },
  { name: "Performance Analytics", href: "/student/analytics", icon: "ai_performance", category: "Progress & Growth" },
  { name: "Verified Badges", href: "/dashboard/credentials", icon: "credentials", category: "Progress & Growth" },

  // Profile & Settings
  { name: "Announcements", href: "/dashboard/announcements", icon: "announcements", category: "Account" },
  { name: "Profile", href: "/student/profile", icon: "profile", category: "Account" },
  { name: "Settings", href: "/student/settings", icon: "settings", category: "Account" },
];

export const dashboardNavConfig: DashboardNavConfig = {
  admin: {
    title: "Platform Admin",
    items: adminNavItems,
  },
  school: {
    title: "School Admin",
    items: schoolNavItems,
  },
  teacher: {
    title: "Teacher",
    items: teacherNavItems,
  },
  student: {
    title: "Student",
    items: studentNavItems,
  },
};
