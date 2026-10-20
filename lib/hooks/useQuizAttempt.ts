"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { QuizItem } from "@/lib/types/quiz";
import { QuizAttempt, AttemptStatus } from "@/lib/types/attempt";
import { QuestionItem } from "@/lib/types/question";
import { prepareQuizAttemptSession } from "@/lib/data/quizzes";

export function useQuizAttempt(
  quiz: QuizItem,
  attemptId?: string,
  options?: { forceShuffleQuestions?: boolean; forceShuffleOptions?: boolean }
) {
  const effectiveAttemptId = attemptId || `att-${quiz.id}`;
  const storageKey = `qd_attempt_${quiz.id}_${effectiveAttemptId}`;

  // Initialize or restore attempt-specific randomized questions
  const [attemptQuestions, setAttemptQuestions] = useState<QuestionItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
            return parsed.questions;
          }
        }
      } catch {
        // Ignore storage read error
      }
    }
    // Fresh randomized session according to quiz settings
    const sessionQuiz = prepareQuizAttemptSession(quiz, options);
    return sessionQuiz.questions;
  });

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
        if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          setAttemptQuestions(parsed.questions);
        }
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
            questions: attemptQuestions,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch {
        // Ignore
      }
    }
  }, [answers, markedForReview, timeRemainingSeconds, status, storageKey, attemptQuestions]);

  // Submit Handler
  const submitQuiz = useCallback(
    (reason: "manual" | "timeout" = "manual") => {
      let correctCount = 0;
      let incorrectCount = 0;
      let unansweredCount = 0;
      let score = 0;

      attemptQuestions.forEach((q) => {
        const userAnswer = answers[q.id];
        if (userAnswer === undefined || userAnswer === null || userAnswer === "") {
          unansweredCount++;
        } else {
          // Check correctness based on question format
          let isCorrect = false;
          if (q.type === "mcq_single" || q.type === "image_based") {
            const correctOpt = q.options.find((o) => o.isCorrect);
            isCorrect = correctOpt?.id === userAnswer;
          } else if (q.type === "mcq_multiple") {
            const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id).sort();
            const userArr = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
            isCorrect =
              correctIds.length === userArr.length &&
              correctIds.every((val, index) => val === userArr[index]);
          } else if (q.type === "true_false") {
            const correctOpt = q.options.find((o) => o.isCorrect);
            const expectedStr = correctOpt ? correctOpt.text.toLowerCase() : "true";
            isCorrect = String(userAnswer).toLowerCase() === expectedStr;
          } else if (q.type === "fill_in_the_blank") {
            const val = String(userAnswer).trim().toLowerCase().replace(/\s+/g, " ");
            const acceptedAnswers = [
              ...(q.fillBlanks || []),
              ...q.options.filter((o) => o.isCorrect).map((o) => o.text),
            ].map((a) => String(a).trim().toLowerCase().replace(/\s+/g, " "));

            isCorrect = acceptedAnswers.length > 0 && acceptedAnswers.includes(val);
          } else if (q.type === "match_following") {
            const pairs = q.matchingPairs || [];
            if (pairs.length > 0) {
              if (typeof userAnswer === "object" && userAnswer !== null && !Array.isArray(userAnswer)) {
                isCorrect = pairs.every((p) => {
                  const submitted = (userAnswer as Record<string, string>)[p.id] ?? (userAnswer as Record<string, string>)[p.leftItem];
                  if (submitted === undefined || submitted === null) return false;
                  return String(submitted).trim().toLowerCase() === p.rightItem.trim().toLowerCase();
                });
              } else if (Array.isArray(userAnswer)) {
                isCorrect = pairs.every((p) => {
                  const match = (userAnswer as any[]).find(
                    (u: any) =>
                      u.id === p.id ||
                      (u.leftItem && String(u.leftItem).trim().toLowerCase() === p.leftItem.trim().toLowerCase())
                  );
                  return match && String(match.rightItem).trim().toLowerCase() === p.rightItem.trim().toLowerCase();
                });
              } else {
                isCorrect = false;
              }
            } else {
              isCorrect = false;
            }
          } else {
            isCorrect = false;
          }

          if (isCorrect) {
            correctCount++;
            score += q.marks;
          } else {
            incorrectCount++;
            if (q.negativeMarks) {
              score -= q.negativeMarks;
            }
          }
        }
      });

      const totalMarks = quiz.totalMarks || attemptQuestions.reduce((acc, q) => acc + q.marks, 0);
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
        questions: attemptQuestions,
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
    [answers, markedForReview, timeRemainingSeconds, quiz, storageKey, attemptId, attemptQuestions]
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
    questions: attemptQuestions,
    currentQuestion: attemptQuestions[currentIdx] as QuestionItem | undefined,
  };
}
