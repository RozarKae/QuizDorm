"use client";

import { DepartmentCard } from "@/components/organization/DepartmentCard";
import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DepartmentItem } from "@/lib/types/organization";
import { ArrowLeft,Building2,Plus } from "lucide-react";
import Link from "next/link";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockDepartments: DepartmentItem[] = [
  { id: "dept-1", orgId: "org-1", name: "Science Wing", description: "Physics, Chemistry, and Biology laboratories", headName: "Dr. Robert Vance", memberCount: 14, quizCount: 45 },
  { id: "dept-2", orgId: "org-1", name: "Mathematics & Stats", description: "Algebra, Geometry, and Calculus section", headName: "Prof. Sarah Jenkins", memberCount: 12, quizCount: 52 },
  { id: "dept-3", orgId: "org-1", name: "Computer Science", description: "Programming, AI, and IT division", headName: "Michael Chang", memberCount: 8, quizCount: 38 },
];

export default function DepartmentsPage({ params }: { params: { id: string } }) {
  const [departments, setDepartments] = useState<DepartmentItem[]>(mockDepartments);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [headName, setHeadName] = useState("");

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Department name is required");
      return;
    }
    const newDept: DepartmentItem = {
      id: `dept-${Date.now()}`,
      orgId: params.id,
      name,
      description,
      headName,
      memberCount: 0,
      quizCount: 0,
    };
    setDepartments([...departments, newDept]);
    setModalOpen(false);
    setName("");
    setDescription("");
    setHeadName("");
    toast.success(`Department "${name}" created!`);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
    toast.success("Department removed");
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
              <Building2 className="w-6 h-6 text-indigo-600 mr-2" /> Department Hierarchy Manager
            </h1>
            <p className="text-sm text-gray-500">Organize faculty and students into academic departments and wings</p>
          </div>
          <Button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
            <Plus className="w-4 h-4 mr-1.5" /> Add Department
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <DepartmentCard key={dept.id} department={dept} onDelete={handleDelete} />
        ))}
      </div>

      {/* Add Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-gray-900 dark:text-white">
              <Building2 className="w-5 h-5 text-indigo-600 mr-2" /> Create Academic Department
            </DialogTitle>
            <DialogDescription>Define department name and assign a department head</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddDepartment} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Department Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Commerce Wing" className="text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Department Head</label>
              <Input value={headName} onChange={(e) => setHeadName(e.target.value)} placeholder="e.g. Dr. Jane Doe" className="text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
              <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full text-xs p-3 border rounded-xl" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-indigo-600 text-white font-bold">Create Department</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
