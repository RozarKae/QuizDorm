"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { QuestionEditor } from "@/components/question-bank/QuestionEditor";
import { useAuth } from "@/components/auth/AuthProvider";
import { GovernanceSettingsManager } from "@/lib/admin/governanceSettingsManager";
import { Button } from "@/components/ui/button";

export default function CreateQuestionPage() {
  const router = useRouter();
  const { role } = useAuth();
  const addPermission = GovernanceSettingsManager.canAddQuestions(role);

  if (!addPermission.allowed) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-[rgba(248,113,113,0.12)] border border-[rgba(248,113,113,0.3)] mx-auto flex items-center justify-center text-[#F87171]">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display uppercase tracking-tight text-[#F2F7F3]">
            Question Authoring Restricted
          </h2>
          <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-md mx-auto leading-relaxed">
            {addPermission.reason || "Only Platform Superadmins and authorized Institutions can create or import Question Bank items."}
          </p>
        </div>
        <div className="pt-2">
          <Link href="/dashboard/questions">
            <Button variant="outline" size="sm" className="border-[rgba(240, 160, 180,0.2)] text-xs font-mono">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Question Bank
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
