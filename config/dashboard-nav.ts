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
  { name: "Document Intelligence", href: "/dashboard/ocr", icon: "ocr", badge: "AI OCR" },
  { name: "Media Library", href: "/dashboard/media", icon: "media", badge: "Rich Media" },
  { name: "Quality & Audit", href: "/dashboard/quality", icon: "quality", badge: "AI Quality" },
  { name: "Adaptive Learning", href: "/dashboard/adaptive", icon: "adaptive", badge: "AI Adaptive" },
  { name: "Revision Center", href: "/dashboard/revision", icon: "revision", badge: "Spaced Review" },
  { name: "Credentials & Badges", href: "/dashboard/credentials", icon: "credentials", badge: "Verified" },
  { name: "Subscriptions & Billing", href: "/dashboard/billing", icon: "billing", badge: "Pro SaaS" },
  { name: "Communication Hub", href: "/dashboard/communication", icon: "communication", badge: "Hub" },
  { name: "Internal Messages", href: "/dashboard/messaging", icon: "messaging", badge: "Chat" },
  { name: "Developer Portal", href: "/dashboard/developer", icon: "developer", badge: "APIs" },
  { name: "Integrations", href: "/dashboard/integrations", icon: "integrations", badge: "Marketplace" },
  { name: "Enterprise OS", href: "/admin/enterprise", icon: "enterprise_admin", badge: "v2.0" },
  { name: "Tenant Controls", href: "/dashboard/enterprise", icon: "tenant_controls", badge: "Multi-Tenant" },
  { name: "Mobile Platform", href: "/dashboard/mobile", icon: "mobile_platform", badge: "v3.0 PWA" },
  { name: "Offline Sync", href: "/dashboard/sync", icon: "offline_sync", badge: "Offline-First" },
  { name: "Parent Portal", href: "/dashboard/parent", icon: "parent_portal", badge: "Family" },
  { name: "Parent Insights", href: "/dashboard/parent/insights", icon: "parent_insights", badge: "AI Insights" },
  { name: "Edge Offline OS", href: "/dashboard/offline", icon: "edge_offline", badge: "Edge Computing" },
  { name: "Campus Server", href: "/dashboard/campus", icon: "campus_server", badge: "LAN Server" },
  { name: "Academic Integrations", href: "/dashboard/academic", icon: "academic_integrations", badge: "LMS / SIS" },
  { name: "Gradebook Sync", href: "/dashboard/gradebook", icon: "gradebook_sync", badge: "Bidirectional" },
  { name: "Global Olympiads", href: "/dashboard/competitions/global", icon: "global_olympiads", badge: "Global" },
  { name: "Tournament Control", href: "/dashboard/competitions/organizer", icon: "tournament_control", badge: "Organizer" },
  { name: "Marketplace", href: "/dashboard/marketplace", icon: "marketplace_hub", badge: "Creator Economy" },
  { name: "Creator Studio", href: "/dashboard/marketplace/creator", icon: "creator_studio", badge: "Studio" },
  { name: "AI Tutor Workspace", href: "/dashboard/tutor", icon: "ai_tutor", badge: "AI Copilot" },
  { name: "AI Study Coach", href: "/dashboard/tutor/planner", icon: "ai_planner", badge: "Study Coach" },
  { name: "AI Performance Coach", href: "/dashboard/performance", icon: "ai_performance", badge: "Predictive AI" },
  { name: "Intervention Center", href: "/dashboard/performance/interventions", icon: "risk_interventions", badge: "Interventions" },
  { name: "Community Hub", href: "/dashboard/community", icon: "community_hub", badge: "Social Learning" },
  { name: "Quiz Clubs & Mentors", href: "/dashboard/community/clubs", icon: "quiz_clubs", badge: "Clubs" },
  { name: "AI Admin Panel", href: "/admin/ai", icon: "ai_admin", badge: "AI Engine" },
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
