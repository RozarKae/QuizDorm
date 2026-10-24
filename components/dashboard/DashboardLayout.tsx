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
  // 1. Explicit admin route prefix -> enforce admin
  // 2. Explicit school route prefix -> enforce institution
  // 3. Explicit teacher route prefix -> enforce handler
  // 4. Explicit student route prefix -> student/member/subscriber
  // 5. In shared /dashboard/* routes or root: if logged-in user is admin, enforce admin
  // 6. Fallback to authRole or propRole
  let effectiveRole = propRole || "subscriber";
  if (pathname.startsWith("/admin")) {
    effectiveRole = "admin";
  } else if (pathname.startsWith("/school")) {
    effectiveRole = "institution";
  } else if (pathname.startsWith("/teacher")) {
    effectiveRole = "handler";
  } else if (pathname.startsWith("/student")) {
    effectiveRole = authRole || propRole || "subscriber";
  } else if (authRole === "admin") {
    effectiveRole = "admin";
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
