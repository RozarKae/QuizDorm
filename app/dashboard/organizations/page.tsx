"use client";

import { OrganizationCard } from "@/components/organization/OrganizationCard";
import { useOrganization } from "@/components/organization/OrganizationContext";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Building2,Plus,Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function OrganizationsPage() {
  const { activeOrg, organizations, switchOrganization } = useOrganization();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredOrgs = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || org.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Building2 className="w-6 h-6 text-indigo-600 mr-2" /> Organization Workspaces
          </h1>
          <p className="text-sm text-gray-500">Multi-tenant school, college, and academy organization management</p>
        </div>

        <Link href="/dashboard/organizations/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
            <Plus className="w-4 h-4 mr-1.5" /> Register Organization
          </Button>
        </Link>
      </div>

      {/* Active Organization Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            Active Workspace
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{activeOrg.name}</h2>
          <p className="text-indigo-100 text-sm">{activeOrg.description}</p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link href={`/dashboard/organizations/${activeOrg.id}`}>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-extrabold rounded-xl px-6 py-3 text-sm shadow-md">
              Manage Active Workspace
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by school name or location..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>

        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="h-10 text-xs font-medium w-full sm:w-48"
          options={[
            { value: "All", label: "All Organization Types" },
            { value: "School", label: "School" },
            { value: "College", label: "College" },
            { value: "Quiz Institute", label: "Quiz Institute" },
            { value: "Coaching Centre", label: "Coaching Centre" },
          ]}
        />
      </div>

      {/* Organizations Grid */}
      {filteredOrgs.length === 0 ? (
        <EmptyState
          title="No Organizations Found"
          description="Try adjusting search terms or register your institution."
          actionLabel="Register Organization"
          onAction={() => (window.location.href = "/dashboard/organizations/new")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrgs.map((org) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              isActive={activeOrg.id === org.id}
              onSelect={() => {
                switchOrganization(org.id);
                toast.success(`Switched workspace to ${org.name}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
