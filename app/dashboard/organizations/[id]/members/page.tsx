"use client";

import React, { useState } from "react";
import Link from "next/link";
import { OrgMemberItem } from "@/lib/types/organization";
import { InviteMemberModal } from "@/components/organization/InviteMemberModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, UserPlus, Search, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";

const mockMembers: OrgMemberItem[] = [
  { id: "m1", orgId: "org-1", name: "Dr. K. Saravanan", email: "saravanan@saidapetmodel.edu.in", role: "Administrator", department: "Science & Assessments", status: "Active", joinedDate: "Jan 2026" },
  { id: "m2", orgId: "org-1", name: "Mary Thomas", email: "mary@choice.ac.in", role: "Teacher", department: "Mathematics", status: "Active", joinedDate: "Feb 2026" },
  { id: "m3", orgId: "org-1", name: "Karthik Rajendran", email: "karthik@saidapetmodel.edu.in", role: "Student", department: "Mathematics", status: "Active", joinedDate: "Mar 2026" },
  { id: "m4", orgId: "org-1", name: "Fathima Nasreen", email: "fathima@alameen.edu.in", role: "Student", department: "Science", status: "Pending", joinedDate: "Jul 2026" },
  { id: "m5", orgId: "org-1", name: "T. S. Soundararajan", email: "soundararajan@sourashtra.edu.in", role: "Teacher", department: "Statistics", status: "Active", joinedDate: "Apr 2026" },
  { id: "m6", orgId: "org-1", name: "Gautham Chand Jain", email: "gautham@mahaveer.ac.in", role: "Student", department: "Computer Science", status: "Active", joinedDate: "May 2026" },
];

export default function OrganizationMembersPage({ params }: { params: { id: string } }) {
  const [members, setMembers] = useState<OrgMemberItem[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const filtered = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDelete = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    toast.success("Member removed from organization");
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/dashboard/organizations/${params.id}`} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Organization Profile
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Users className="w-6 h-6 text-indigo-600 mr-2" /> Member Roster & Invitation System
            </h1>
            <p className="text-sm text-gray-500">Manage organization owners, administrators, teachers, and students</p>
          </div>
          <Button onClick={() => setInviteModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
            <UserPlus className="w-4 h-4 mr-1.5" /> Invite Members
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search member by name or email..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>

        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-10 text-xs font-medium w-full sm:w-44"
          options={[
            { value: "All", label: "All Roles" },
            { value: "Administrator", label: "Administrators" },
            { value: "Teacher", label: "Teachers" },
            { value: "Student", label: "Students" },
          ]}
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-900 text-xs uppercase font-semibold text-gray-500 border-b border-gray-100 dark:border-gray-850">
              <tr>
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <span>{m.name}</span>
                  </td>
                  <td className="py-4 px-4 text-xs font-mono">{m.email}</td>
                  <td className="py-4 px-4">
                    <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs">
                      {m.role}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-xs font-medium">{m.department}</td>
                  <td className="py-4 px-4">
                    <Badge className={m.status === "Active" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}>
                      ● {m.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)} className="h-8 w-8 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InviteMemberModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} orgName="Government Model Higher Secondary School" />
    </div>
  );
}
