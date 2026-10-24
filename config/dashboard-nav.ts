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

// Role-aware curated navigation structures using the QuizDorm Creative Professional Lexicon

// 1. SuperAdmin: Operations, Employees (Staff) & Institutes (Campuses)
const superAdminNavItems: NavItem[] = [
  // Institutional & Staff Governance
  { name: "Executive Overview", href: "/admin", icon: "dashboard", category: "Institutional Governance" },
  { name: "Institutes & Campuses", href: "/admin/organizations", icon: "organization", badge: "Master", category: "Institutional Governance" },
  { name: "Employees & Faculty Mentors", href: "/admin/users", icon: "users", badge: "Staff", category: "Institutional Governance" },
  { name: "Classrooms & Cohorts", href: "/dashboard/classes", icon: "school", category: "Institutional Governance" },
  { name: "Enterprise OS", href: "/admin/enterprise", icon: "enterprise_admin", badge: "v2.0", category: "Institutional Governance" },
  { name: "Tenant Partitioning", href: "/dashboard/enterprise", icon: "tenant_controls", badge: "Multi-Tenant", category: "Institutional Governance" },

  // Operational Infrastructure & Security
  { name: "Active Live Sessions", href: "/admin/sessions", icon: "sessions", badge: "Live", category: "Security & Operations" },
  { name: "Contracts & Institutional Billing", href: "/admin/billing", icon: "billing", badge: "Pro SaaS", category: "Security & Operations" },
  { name: "AI Engine Infrastructure", href: "/admin/ai", icon: "ai_admin", badge: "Keys", category: "Security & Operations" },
  { name: "Global IQ Telemetry", href: "/admin/analytics", icon: "ai_performance", category: "Security & Operations" },
  { name: "Audit & Compliance Reports", href: "/admin/reports", icon: "credentials", category: "Security & Operations" },
  { name: "Developer APIs & Security", href: "/dashboard/developer", icon: "developer", badge: "API", category: "Security & Operations" },
  { name: "Super Admin Settings", href: "/admin/settings", icon: "settings", category: "Security & Operations" },
];

// 2. Master Admin: Academic, Content, Quizzes, Question Bank & Subscribers
const masterAdminNavItems: NavItem[] = [
  // Scholar Community & Subscribers
  { name: "Academic Directorate", href: "/admin/master", icon: "dashboard", category: "Scholar Community" },
  { name: "Subscribers & Contenders", href: "/admin/master/subscribers", icon: "users", badge: "Active", category: "Scholar Community" },
  { name: "Podium of Intellect", href: "/dashboard/leaderboard", icon: "credentials", category: "Scholar Community" },

  // The Dorm Vault & Knowledge Matrix
  { name: "The Dorm Vault (All Quizzes)", href: "/dashboard/quizzes", icon: "quizzes", badge: "Vault", category: "Curriculum & Assessments" },
  { name: "Curriculum Knowledge Matrix", href: "/dashboard/questions", icon: "bank", badge: "535+", category: "Curriculum & Assessments" },
  { name: "Assessment Architect", href: "/dashboard/quizzes/builder", icon: "builder", badge: "9 Formats", category: "Curriculum & Assessments" },
  { name: "Synchronized Arena Control", href: "/dashboard/competitions", icon: "competitions", badge: "Live", category: "Curriculum & Assessments" },
  { name: "Decathlon Director", href: "/dashboard/competitions/organizer", icon: "tournament_control", badge: "Proctor", category: "Curriculum & Assessments" },
  { name: "Global Olympiads", href: "/dashboard/competitions/global", icon: "global_olympiads", category: "Curriculum & Assessments" },

  // Intelligence & Quality
  { name: "Omni-Curriculum AI Synthesizer", href: "/dashboard/ocr", icon: "ocr", badge: "OCR", category: "Intelligence & Quality" },
  { name: "Quality Gate & Bloom's Audit", href: "/dashboard/quality", icon: "quality", badge: "Audit", category: "Intelligence & Quality" },
  { name: "Adaptive Engine", href: "/dashboard/adaptive", icon: "adaptive", category: "Intelligence & Quality" },
  { name: "Cognitive Depth Analytics", href: "/dashboard/analytics", icon: "ai_performance", category: "Intelligence & Quality" },
];

const schoolNavItems: NavItem[] = [
  // School Operations
  { name: "Academy Command Center", href: "/school", icon: "dashboard", category: "Institution" },
  { name: "Classrooms", href: "/dashboard/classes", icon: "school", category: "Institution" },
  { name: "Faculty & Scholar Directory", href: "/dashboard/organizations", icon: "organization", category: "Institution" },
  { name: "Campus Server", href: "/dashboard/campus", icon: "campus_server", badge: "LAN", category: "Institution" },
  { name: "Academic Integrations", href: "/dashboard/academic", icon: "academic_integrations", badge: "LMS", category: "Institution" },

  // Assessments
  { name: "Curriculum Knowledge Matrix", href: "/dashboard/questions", icon: "bank", category: "Assessments" },
  { name: "The Dorm Vault (All Quizzes)", href: "/dashboard/quizzes", icon: "quizzes", category: "Assessments" },
  { name: "Curriculum Quests", href: "/dashboard/assignments", icon: "assignments", category: "Assessments" },
  { name: "Gradebook Sync", href: "/dashboard/gradebook", icon: "gradebook_sync", category: "Assessments" },
  { name: "Battle Arenas", href: "/dashboard/competitions", icon: "competitions", badge: "Live", category: "Assessments" },

  // Performance & Community
  { name: "Academy IQ Analytics", href: "/school/analytics", icon: "ai_performance", category: "Insights & Family" },
  { name: "Performance Reports", href: "/school/reports", icon: "credentials", category: "Insights & Family" },
  { name: "Intervention Center", href: "/dashboard/performance/interventions", icon: "risk_interventions", badge: "At-Risk", category: "Insights & Family" },
  { name: "Parent Portal", href: "/dashboard/parent", icon: "parent_portal", category: "Insights & Family" },

  // Administrative
  { name: "Academic Calendar", href: "/dashboard/calendar", icon: "calendar", category: "Administration" },
  { name: "Announcements", href: "/dashboard/announcements", icon: "announcements", category: "Administration" },
  { name: "Academy Settings", href: "/school/settings", icon: "settings", category: "Administration" },
];

const teacherNavItems: NavItem[] = [
  // Classroom Instruction
  { name: "Faculty Mentor Console", href: "/teacher", icon: "dashboard", category: "Classroom" },
  { name: "Academic Classrooms", href: "/dashboard/classes", icon: "school", category: "Classroom" },
  { name: "Curriculum Quests", href: "/dashboard/assignments", icon: "assignments", category: "Classroom" },
  { name: "Academic Calendar", href: "/dashboard/calendar", icon: "calendar", category: "Classroom" },

  // Authoring Studio
  { name: "Curriculum Knowledge Matrix", href: "/dashboard/questions", icon: "bank", category: "Authoring Studio" },
  { name: "Assessment Architect", href: "/dashboard/quizzes/builder", icon: "builder", category: "Authoring Studio" },
  { name: "The Dorm Vault", href: "/dashboard/quizzes", icon: "quizzes", category: "Authoring Studio" },
  { name: "Omni-Curriculum AI Synthesizer", href: "/dashboard/ocr", icon: "ocr", badge: "AI OCR", category: "Authoring Studio" },
  { name: "Media Library", href: "/dashboard/media", icon: "media", category: "Authoring Studio" },

  // Competitions
  { name: "Synchronized Arena Control", href: "/dashboard/competitions", icon: "competitions", badge: "Live", category: "Live Arenas" },
  { name: "Decathlon Director", href: "/dashboard/competitions/organizer", icon: "tournament_control", category: "Live Arenas" },
  { name: "Enter Battle Arena", href: "/live/join", icon: "swords", badge: "PIN", category: "Live Arenas" },

  // AI & Analytics
  { name: "Cohort IQ Analytics", href: "/teacher/analytics", icon: "ai_performance", category: "Intelligence" },
  { name: "Scholar Diagnostics", href: "/teacher/reports", icon: "credentials", category: "Intelligence" },
  { name: "AI Cognitive Coach", href: "/dashboard/tutor", icon: "ai_tutor", badge: "Copilot", category: "Intelligence" },
  { name: "Quality & Audit", href: "/dashboard/quality", icon: "quality", category: "Intelligence" },
  { name: "Mentor Settings", href: "/teacher/settings", icon: "settings", category: "Settings" },
];

const studentNavItems: NavItem[] = [
  // Learning Hub
  { name: "Scholar's Hub", href: "/student", icon: "dashboard", category: "Learning Space" },
  { name: "Curriculum Quests", href: "/dashboard/assignments", icon: "assignments", category: "Learning Space" },
  { name: "The Dorm Vault (All Quizzes)", href: "/dashboard/quizzes", icon: "quizzes", category: "Learning Space" },
  { name: "Spaced Recall Engine", href: "/dashboard/revision", icon: "revision", badge: "Spaced", category: "Learning Space" },

  // Arena & Competitions
  { name: "Join Battle Arena", href: "/live/join", icon: "swords", badge: "Live", category: "Competition Arena" },
  { name: "Battle Arenas", href: "/dashboard/competitions", icon: "competitions", category: "Competition Arena" },
  { name: "Podium of Intellect", href: "/dashboard/leaderboard", icon: "leaderboard", category: "Competition Arena" },
  { name: "Quiz Clubs", href: "/dashboard/community/clubs", icon: "quiz_clubs", category: "Competition Arena" },

  // AI Study & Achievements
  { name: "AI Cognitive Coach", href: "/dashboard/tutor/planner", icon: "ai_planner", badge: "Coach", category: "Progress & Growth" },
  { name: "Cognitive IQ Telemetry", href: "/student/analytics", icon: "ai_performance", category: "Progress & Growth" },
  { name: "Dorm Honours & Badges", href: "/dashboard/credentials", icon: "credentials", category: "Progress & Growth" },

  // Profile & Settings
  { name: "Announcements", href: "/dashboard/announcements", icon: "announcements", category: "Account" },
  { name: "Profile", href: "/student/profile", icon: "profile", category: "Account" },
  { name: "Settings", href: "/student/settings", icon: "settings", category: "Account" },
];

const subscriberNavItems: NavItem[] = [
  // Free / Self-Paced Access
  { name: "Independent Scholar Hub", href: "/student", icon: "dashboard", category: "Subscriber Access" },
  { name: "The Dorm Vault (All Quizzes)", href: "/dashboard/quizzes", icon: "quizzes", category: "Subscriber Access" },
  { name: "Join Battle Arena", href: "/live/join", icon: "swords", badge: "PIN", category: "Subscriber Access" },
  { name: "Podium of Intellect", href: "/dashboard/leaderboard", icon: "leaderboard", category: "Subscriber Access" },

  // Locked Institutional Features
  { name: "Curriculum Quests", href: "/dashboard/assignments", icon: "assignments", badge: "Locked", category: "Locked Features" },
  { name: "Spaced Recall Engine", href: "/dashboard/revision", icon: "revision", badge: "Locked", category: "Locked Features" },
  { name: "AI Cognitive Coach", href: "/dashboard/tutor/planner", icon: "ai_planner", badge: "Locked", category: "Locked Features" },
  { name: "Academy Notices", href: "/dashboard/announcements", icon: "announcements", badge: "Locked", category: "Locked Features" },
  { name: "Academic Calendar", href: "/dashboard/calendar", icon: "calendar", badge: "Locked", category: "Locked Features" },

  // Profile & Settings
  { name: "Profile", href: "/student/profile", icon: "profile", category: "Account" },
  { name: "Settings", href: "/student/settings", icon: "settings", category: "Account" },
];

export const dashboardNavConfig: DashboardNavConfig = {
  superadmin: {
    title: "Super Admin Command OS",
    items: superAdminNavItems,
  },
  admin: {
    title: "Super Admin Command OS",
    items: superAdminNavItems,
  },
  masteradmin: {
    title: "Master Admin Content & Scholar OS",
    items: masterAdminNavItems,
  },
  institution: {
    title: "Academy Directorate",
    items: schoolNavItems,
  },
  school: {
    title: "Academy Directorate",
    items: schoolNavItems,
  },
  handler: {
    title: "Faculty Mentor Console",
    items: teacherNavItems,
  },
  teacher: {
    title: "Faculty Mentor Console",
    items: teacherNavItems,
  },
  member: {
    title: "Scholar's Hub",
    items: studentNavItems,
  },
  student: {
    title: "Scholar's Hub",
    items: studentNavItems,
  },
  subscriber: {
    title: "Independent Scholar Hub",
    items: subscriberNavItems,
  },
};
