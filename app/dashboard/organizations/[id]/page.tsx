"use client";

import { BrandingPreview } from "@/components/organization/BrandingPreview";
import { useOrganization } from "@/components/organization/OrganizationContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
Building2,
FileText,
GraduationCap,
Settings,
UserPlus,
Users
} from "lucide-react";
import Link from "next/link";

export default function OrganizationProfilePage({ params }: { params: { id: string } }) {
  const { activeOrg } = useOrganization();

  return (
    <div className="space-y-8">
      {/* Header & Quick Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{activeOrg.name}</h1>
            <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
              {activeOrg.type}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">{activeOrg.city}, {activeOrg.state} • Workspace ID: {params.id}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/dashboard/organizations/${params.id}/members`}>
            <Button variant="outline" size="sm" className="text-xs">
              <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Members & Invites
            </Button>
          </Link>
          <Link href={`/dashboard/organizations/${params.id}/departments`}>
            <Button variant="outline" size="sm" className="text-xs">
              <Building2 className="w-3.5 h-3.5 mr-1.5" /> Departments
            </Button>
          </Link>
          <Link href={`/dashboard/organizations/${params.id}/settings`}>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
              <Settings className="w-3.5 h-3.5 mr-1.5" /> Branding & Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Executive Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm text-center">
          <Users className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{activeOrg.teacherCount}</p>
          <p className="text-xs text-gray-400">Total Teachers</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm text-center">
          <GraduationCap className="w-6 h-6 text-rose-600 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{activeOrg.studentCount}</p>
          <p className="text-xs text-gray-400">Total Students</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm text-center">
          <Building2 className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{activeOrg.departmentCount}</p>
          <p className="text-xs text-gray-400">Departments</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm text-center">
          <FileText className="w-6 h-6 text-purple-600 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{activeOrg.quizCount}</p>
          <p className="text-xs text-gray-400">Active Quizzes</p>
        </div>
      </div>

      {/* Main Grid: Overview & Branding Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-900 pb-3">
            Organization Details & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-400 font-medium">Contact Email</p>
              <p className="font-bold text-gray-900 dark:text-white">{activeOrg.email}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Website</p>
              <p className="font-bold text-indigo-600">{activeOrg.website || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Time Zone</p>
              <p className="font-bold text-gray-900 dark:text-white">{activeOrg.timezone}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Language</p>
              <p className="font-bold text-gray-900 dark:text-white">{activeOrg.preferredLanguage}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-900">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
              Recent Workspace Operations
            </h4>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <p className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">● Science Department added 5 new quiz assessments</p>
              <p className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">● 42 new student accounts invited by Admin</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <BrandingPreview branding={activeOrg.branding} orgName={activeOrg.name} />
        </div>
      </div>
    </div>
  );
}
