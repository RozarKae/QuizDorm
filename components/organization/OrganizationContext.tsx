"use client";

import { OrganizationBranding,OrganizationItem } from "@/lib/types/organization";
import React,{ createContext,useContext,useState } from "react";

const mockOrganizations: OrganizationItem[] = [
  {
    id: "org-1",
    name: "Government Model Higher Secondary School",
    logo: "",
    description: "Premier academic institution focusing on STEM, Samacheer Kalvi, and competitive state entrance preparation.",
    type: "School",
    country: "India",
    state: "Tamil Nadu",
    city: "Chennai",
    email: "admin@saidapetmodel.edu.in",
    website: "https://saidapetmodel.edu.in",
    timezone: "IST (UTC+5:30)",
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
    name: "The Choice School & Collegiate Academy",
    logo: "",
    description: "Premier educational institution in Kochi specializing in experiential STEM, robotics, and competitive learning.",
    type: "School",
    country: "India",
    state: "Kerala",
    city: "Kochi",
    email: "contact@choice.ac.in",
    website: "https://choice.ac.in",
    timezone: "IST (UTC+5:30)",
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
