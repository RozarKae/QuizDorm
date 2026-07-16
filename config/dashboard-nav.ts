export type NavItem = {
  name: string;
  href: string;
  icon?: string;
  children?: NavItem[];
};

export type DashboardNavConfig = {
  [role: string]: {
    title: string;
    items: NavItem[];
  };
};

export const dashboardNavConfig: DashboardNavConfig = {
  admin: {
    title: "Platform Admin",
    items: [
      { name: "Dashboard", href: "/admin", icon: "dashboard" },
      { name: "Analytics", href: "/admin/analytics", icon: "analytics" },
      { name: "Reports", href: "/admin/reports", icon: "reports" },
      { name: "Settings", href: "/admin/settings", icon: "settings" },
      { name: "Profile", href: "/admin/profile", icon: "profile" },
    ],
  },
  school: {
    title: "School Admin",
    items: [
      { name: "Dashboard", href: "/school", icon: "dashboard" },
      { name: "Analytics", href: "/school/analytics", icon: "analytics" },
      { name: "Reports", href: "/school/reports", icon: "reports" },
      { name: "Settings", href: "/school/settings", icon: "settings" },
      { name: "Profile", href: "/school/profile", icon: "profile" },
    ],
  },
  teacher: {
    title: "Teacher",
    items: [
      { name: "Dashboard", href: "/teacher", icon: "dashboard" },
      { name: "Analytics", href: "/teacher/analytics", icon: "analytics" },
      { name: "Reports", href: "/teacher/reports", icon: "reports" },
      { name: "Settings", href: "/teacher/settings", icon: "settings" },
      { name: "Profile", href: "/teacher/profile", icon: "profile" },
    ],
  },
  student: {
    title: "Student",
    items: [
      { name: "Dashboard", href: "/student", icon: "dashboard" },
      { name: "Analytics", href: "/student/analytics", icon: "analytics" },
      { name: "Reports", href: "/student/reports", icon: "reports" },
      { name: "Settings", href: "/student/settings", icon: "settings" },
      { name: "Profile", href: "/student/profile", icon: "profile" },
    ],
  },
};
