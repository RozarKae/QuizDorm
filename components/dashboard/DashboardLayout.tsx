"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "@/components/layout/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: string;
}

export default function DashboardLayout({ children, role: propRole }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { role: authRole } = useAuth();

  // Dynamic role resolution:
  // 1. Explicit /admin/master route prefix -> enforce masteradmin
  // 2. Explicit admin route prefix -> enforce superadmin (or masteradmin if logged in as masteradmin)
  // 3. Explicit school route prefix -> enforce institution
  // 4. Explicit teacher route prefix -> enforce handler
  // 5. Explicit student route prefix -> student/member/subscriber
  // 6. In shared /dashboard/* routes or root: prioritize logged-in role
  let effectiveRole = propRole || "subscriber";
  if (pathname.startsWith("/admin/master")) {
    effectiveRole = "masteradmin";
  } else if (pathname.startsWith("/admin")) {
    effectiveRole = authRole === "masteradmin" ? "masteradmin" : "superadmin";
  } else if (pathname.startsWith("/school")) {
    effectiveRole = "institution";
  } else if (pathname.startsWith("/teacher")) {
    effectiveRole = "handler";
  } else if (pathname.startsWith("/student")) {
    effectiveRole = authRole || propRole || "subscriber";
  } else if (authRole === "masteradmin") {
    effectiveRole = "masteradmin";
  } else if (authRole === "superadmin" || authRole === "admin") {
    effectiveRole = "superadmin";
  } else if (authRole) {
    effectiveRole = authRole;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        role={effectiveRole}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <Topbar role={effectiveRole} onMenuClick={() => setMobileOpen(true)} />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </main>

        {/* Dashboard Footer */}
        <Footer />
      </div>
    </div>
  );
}
