"use client";

import { QuestionEditor } from "@/components/question-bank/QuestionEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/questions" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Question Bank
        </Link>
      </div>

      <QuestionEditor
        initialQuestion={{
          id: params.id,
          title: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
          type: "mcq_single",
          subject: "Mathematics",
          category: "Algebra",
          topic: "Calculus",
          difficulty: "Medium",
          marks: 4,
          timeLimitSeconds: 60,
          options: [
            { id: "opt-1", text: "3x^2 + 8x - 5", isCorrect: true },
            { id: "opt-2", text: "3x^2 + 4x - 5", isCorrect: false },
            { id: "opt-3", text: "x^2 + 8x - 5", isCorrect: false },
          ],
        }}
        onSave={() => {
          router.push("/dashboard/questions");
        }}
      />
    </div>
  );
}
