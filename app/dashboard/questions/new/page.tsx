"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { QuestionEditor } from "@/components/question-bank/QuestionEditor";

export default function CreateQuestionPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/questions" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Question Bank
        </Link>
      </div>

      <QuestionEditor
        onSave={() => {
          router.push("/dashboard/questions");
        }}
      />
    </div>
  );
}
