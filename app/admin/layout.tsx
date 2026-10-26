"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The Sovereign Admin Gateway (/admin/login) has its own dedicated full-page OS layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <DashboardLayout role="superadmin">{children}</DashboardLayout>;
}
