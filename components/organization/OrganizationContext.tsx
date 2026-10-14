"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { OrganizationItem, OrganizationBranding } from "@/lib/types/organization";

const mockOrganizations: OrganizationItem[] = [
  {
    id: "org-1",
    name: "Oakridge International Academy",
    logo: "",
    description: "Premier K-12 international school focusing on STEM and competitive learning.",
    type: "School",
    country: "United States",
    state: "California",
    city: "San Francisco",
    email: "admin@oakridge.edu",
    website: "https://oakridge.edu",
    timezone: "PST (UTC-8)",
    preferredLanguage: "English",
    branding: {
      primaryColor: "#4F46E5",
      secondaryColor: "#10B981",
      dashboardTheme: "light",
    },
    teacherCount: 38,
    studentCount: 940,
    departmentCount: 6,
    quizCount: 124,
    createdAt: "Jan 2026",
    updatedAt: "Jul 2026",
  },
  {
    id: "org-2",
    name: "Metropolitan Institute of Technology",
    logo: "",
    description: "Higher education university specializing in Computer Science and Engineering.",
    type: "College",
    country: "United States",
    state: "New York",
    city: "New York",
    email: "contact@mit-edu.org",
    website: "https://mit-edu.org",
    timezone: "EST (UTC-5)",
    preferredLanguage: "English",
    branding: {
      primaryColor: "#2563EB",
      secondaryColor: "#F59E0B",
      dashboardTheme: "light",
    },
    teacherCount: 65,
    studentCount: 2400,
    departmentCount: 12,
    quizCount: 310,
    createdAt: "Mar 2026",
    updatedAt: "Jul 2026",
  },
];

interface OrganizationContextType {
  activeOrg: OrganizationItem;
  organizations: OrganizationItem[];
  switchOrganization: (orgId: string) => void;
  updateBranding: (branding: Partial<OrganizationBranding>) => void;
}

const OrganizationContext = createContext<OrganizationContextType>({
  activeOrg: mockOrganizations[0],
  organizations: mockOrganizations,
  switchOrganization: () => {},
  updateBranding: () => {},
});

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [organizations, setOrganizations] = useState<OrganizationItem[]>(mockOrganizations);
  const [activeOrg, setActiveOrg] = useState<OrganizationItem>(mockOrganizations[0]);

  const switchOrganization = (orgId: string) => {
    const target = organizations.find((o) => o.id === orgId);
    if (target) {
      setActiveOrg(target);
    }
  };

  const updateBranding = (brandingUpdates: Partial<OrganizationBranding>) => {
    const updatedBranding = { ...activeOrg.branding, ...brandingUpdates };
    const updatedOrg = { ...activeOrg, branding: updatedBranding };
    setActiveOrg(updatedOrg);
    setOrganizations((prev) => prev.map((o) => (o.id === activeOrg.id ? updatedOrg : o)));
  };

  return (
    <OrganizationContext.Provider value={{ activeOrg, organizations, switchOrganization, updateBranding }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  return useContext(OrganizationContext);
}
