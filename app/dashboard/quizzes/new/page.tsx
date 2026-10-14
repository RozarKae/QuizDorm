"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

export default function CreateQuizPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Quiz created successfully! Opening Question Builder...");
      router.push("/dashboard/quizzes/builder");
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/dashboard/quizzes" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Quizzes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Quiz</h1>
        <p className="text-sm text-gray-500">Configure title, difficulty, category and time limit</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Quiz Title
          </label>
          <Input required placeholder="e.g. Grade 10 Science Midterm Quiz" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <Select
              options={[
                { value: "Mathematics", label: "Mathematics" },
                { value: "Science", label: "Science" },
                { value: "Computer Science", label: "Computer Science" },
                { value: "History", label: "History" },
                { value: "General Knowledge", label: "General Knowledge" },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Difficulty
            </label>
            <Select
              options={[
                { value: "Easy", label: "Easy" },
                { value: "Medium", label: "Medium" },
                { value: "Hard", label: "Hard" },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Time Limit (Minutes)
            </label>
            <Input type="number" defaultValue={30} min={5} max={180} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Pass Percentage (%)
            </label>
            <Input type="number" defaultValue={60} min={10} max={100} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Description / Instructions
          </label>
          <textarea
            rows={3}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            placeholder="Write optional instructions for participants..."
          />
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex justify-end space-x-3">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Creating..." : "Save & Add Questions"}
          </Button>
        </div>
      </form>
    </div>
  );
}
