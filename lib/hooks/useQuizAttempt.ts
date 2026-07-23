"use client";

import { useState, useEffect, useCallback } from "react";
import { QuizItem } from "@/lib/types/quiz";
import { QuizAttempt, AttemptStatus } from "@/lib/types/attempt";
import { QuestionItem } from "@/lib/types/question";

export function useQuizAttempt(quiz: QuizItem, attemptId?: string) {
  const storageKey = `qd_attempt_${quiz.id}`;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(quiz.durationMinutes * 60);
  const [status, setStatus] = useState<AttemptStatus>("in_progress");
  const [submittedAttempt, setSubmittedAttempt] = useState<QuizAttempt | null>(null);

  // Restore from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.markedForReview) setMarkedForReview(parsed.markedForReview);
        if (parsed.timeRemainingSeconds) setTimeRemainingSeconds(parsed.timeRemainingSeconds);
      }
    } catch {
      // Ignore storage errors
    }
  }, [storageKey]);

  // Auto-save to localStorage
  useEffect(() => {
    if (status === "in_progress") {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            answers,
            markedForReview,
            timeRemainingSeconds,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch {
        // Ignore
      }
    }
  }, [answers, markedForReview, timeRemainingSeconds, status, storageKey]);

  // Submit Handler
  const submitQuiz = useCallback(
    (reason: "manual" | "timeout" = "manual") => {
      let correctCount = 0;
      let incorrectCount = 0;
      let unansweredCount = 0;
      let score = 0;

      quiz.questions.forEach((q) => {
        const userAnswer = answers[q.id];
        if (userAnswer === undefined || userAnswer === null || userAnswer === "") {
          unansweredCount++;
        } else {
          // Check correctness based on question format
          let isCorrect = false;
          if (q.type === "mcq_single" || q.type === "image_based") {
            const correctOpt = q.options.find((o) => o.isCorrect);
            isCorrect = correctOpt?.id === userAnswer;
          } else if (q.type === "true_false") {
            isCorrect = String(userAnswer).toLowerCase() === "true";
          } else if (q.type === "fill_in_the_blank") {
            const val = String(userAnswer).trim().toLowerCase();
            isCorrect = (q.fillBlanks || []).some((b) => b.toLowerCase() === val);
          } else {
            isCorrect = true; // Default match/seq credit
          }

          if (isCorrect) {
            correctCount++;
            score += q.marks;
          } else {
            incorrectCount++;
          }
        }
      });

      const totalMarks = quiz.totalMarks || quiz.questions.reduce((acc, q) => acc + q.marks, 0);
      const percentage = Math.round((score / (totalMarks || 1)) * 100);
      const isPassed = percentage >= quiz.passMarks;
      const timeTakenSeconds = quiz.durationMinutes * 60 - timeRemainingSeconds;

      const resultAttempt: QuizAttempt = {
        id: attemptId || `att-${Date.now()}`,
        quizId: quiz.id,
        quizTitle: quiz.title,
        userId: "usr-101",
        userName: "Rozar Khan",
        status: reason === "timeout" ? "timed_out" : "submitted",
        startedAt: new Date(Date.now() - timeTakenSeconds * 1000).toISOString(),
        submittedAt: new Date().toISOString(),
        timeTakenSeconds,
        durationMinutes: quiz.durationMinutes,
        answers,
        markedForReview,
        score,
        totalMarks,
        passMarks: quiz.passMarks,
        percentage,
        isPassed,
        correctCount,
        incorrectCount,
        unansweredCount,
        questions: quiz.questions,
      };

      setStatus(reason === "timeout" ? "timed_out" : "submitted");
      setSubmittedAttempt(resultAttempt);

      // Clean up localStorage
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // Ignore
      }

      return resultAttempt;
    },
    [answers, markedForReview, timeRemainingSeconds, quiz, storageKey, attemptId]
  );

  // Timer Tick Hook
  useEffect(() => {
    if (status !== "in_progress") return;

    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitQuiz("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, submitQuiz]);

  const saveAnswer = (questionId: string, answerValue: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
  };

  const clearAnswer = (questionId: string) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const toggleMarkForReview = (questionId: string) => {
    setMarkedForReview((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  return {
    currentIdx,
    setCurrentIdx,
    answers,
    saveAnswer,
    clearAnswer,
    markedForReview,
    toggleMarkForReview,
    timeRemainingSeconds,
    status,
    submittedAttempt,
    submitQuiz,
    currentQuestion: quiz.questions[currentIdx] as QuestionItem | undefined,
  };
}
