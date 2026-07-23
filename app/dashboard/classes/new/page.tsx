"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, School, Save, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

export default function CreateClassPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("Mathematics");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [code] = useState(`CLS-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter classroom name");
      return;
    }
    toast.success(`Class "${name}" created successfully! PIN: ${code}`);
    router.push("/dashboard/classes");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2">
      <div>
        <Link href="/dashboard/classes" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Classes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <School className="w-6 h-6 text-indigo-600 mr-2" /> Create New Classroom Group
        </h1>
        <p className="text-sm text-gray-500">Set up classroom name, department wing, and generate student join code</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Classroom Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Grade 12-A Advanced Calculus"
            className="text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course section outline..."
            className="w-full rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 text-xs text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Department</label>
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              options={[
                { value: "Mathematics", label: "Mathematics" },
                { value: "Science", label: "Science" },
                { value: "Computer Science", label: "Computer Science" },
                { value: "English", label: "English" },
              ]}
              className="text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Academic Term</label>
            <Select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              options={[
                { value: "2025-2026", label: "2025-2026 Academic Term" },
                { value: "2026-2027", label: "2026-2027 Academic Term" },
              ]}
              className="text-xs font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Student Join Code</label>
          <Input value={code} readOnly className="text-xs font-mono font-bold bg-gray-50 dark:bg-gray-900" />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Link href="/dashboard/classes">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl px-6">
            <Save className="w-4 h-4 mr-1.5" /> Save Classroom
          </Button>
        </div>
      </form>
    </div>
  );
}
