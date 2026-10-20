import { QuestionItem, DifficultyLevel, QuestionType } from "@/lib/types/question";
import importedQuestionsJson from "./imported-questions.json";

export const STORAGE_KEY_QUESTIONS = "quizdorm_question_bank_v3";

// Base questions that existed initially in mock files
export const INITIAL_BASE_QUESTIONS: QuestionItem[] = [
  {
    id: "q-101",
    title: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
    type: "mcq_single",
    subject: "Mathematics",
    category: "Mathematics",
    topic: "Calculus",
    difficulty: "Medium",
    gradeLevel: "Grade 11-12",
    grade: "Grade 11-12",
    marks: 4,
    timeLimitSeconds: 60,
    options: [
      { id: "opt-1", text: "3x^2 + 8x - 5", isCorrect: true },
      { id: "opt-2", text: "3x^2 + 4x - 5", isCorrect: false },
      { id: "opt-3", text: "x^2 + 8x - 5", isCorrect: false },
    ],
    fillBlanks: ["3x^2 + 8x - 5"],
    explanation: "Using the power rule d/dx(x^n) = n*x^(n-1): d/dx(x^3) = 3x^2, d/dx(4x^2) = 8x, d/dx(-5x) = -5, d/dx(7) = 0.",
    tags: ["calculus", "derivatives"],
    createdAt: "2026-07-20T00:00:00.000Z",
    updatedAt: "2026-07-23T00:00:00.000Z",
  },
  {
    id: "q-102",
    title: "Which of the following organic compounds contain a benzene ring?",
    type: "mcq_multiple",
    subject: "Science",
    category: "Science",
    topic: "Organic Chemistry",
    difficulty: "Hard",
    gradeLevel: "Grade 11-12",
    grade: "Grade 11-12",
    marks: 5,
    timeLimitSeconds: 90,
    options: [
      { id: "o1", text: "Toluene", isCorrect: true },
      { id: "o2", text: "Phenol", isCorrect: true },
      { id: "o3", text: "Methane", isCorrect: false },
    ],
    explanation: "Toluene (methylbenzene) and Phenol (hydroxybenzene) are aromatic compounds with benzene rings. Methane is an alkane.",
    tags: ["chemistry", "benzene", "organic"],
    createdAt: "2026-07-18T00:00:00.000Z",
    updatedAt: "2026-07-23T00:00:00.000Z",
  },
  {
    id: "q-103",
    title: "Light travels faster in water than in vacuum.",
    type: "true_false",
    subject: "Science",
    category: "Science",
    topic: "Optics & Physics",
    difficulty: "Easy",
    gradeLevel: "Grade 9-10",
    grade: "Grade 9-10",
    marks: 2,
    timeLimitSeconds: 30,
    options: [
      { id: "tf-1", text: "True", isCorrect: false },
      { id: "tf-2", text: "False", isCorrect: true },
    ],
    fillBlanks: ["false"],
    explanation: "Light travels fastest in a vacuum (approximately 3x10^8 m/s). In water, light slows down due to the refractive index of 1.33.",
    tags: ["physics", "optics"],
    createdAt: "2026-07-15T00:00:00.000Z",
    updatedAt: "2026-07-23T00:00:00.000Z",
  },
];

// PDF Imported Questions cast as QuestionItem[]
export const PDF_IMPORTED_QUESTIONS: QuestionItem[] = (importedQuestionsJson as unknown) as QuestionItem[];

// Combined full pool
export const ALL_DEFAULT_QUESTIONS: QuestionItem[] = [
  ...INITIAL_BASE_QUESTIONS,
  ...PDF_IMPORTED_QUESTIONS,
];

// In-memory store for server-side execution and test environments
let serverMemoryQuestions: QuestionItem[] | null = null;

function getServerQuestions(): QuestionItem[] {
  if (!serverMemoryQuestions) {
    serverMemoryQuestions = [...ALL_DEFAULT_QUESTIONS];
  }
  return serverMemoryQuestions;
}

// Helper to get questions with persistence in browser
export function getStoredQuestions(): QuestionItem[] {
  if (typeof window === "undefined") {
    return getServerQuestions();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(ALL_DEFAULT_QUESTIONS));
      return ALL_DEFAULT_QUESTIONS;
    }
    const parsed = JSON.parse(raw) as QuestionItem[];
    if (
      !Array.isArray(parsed) ||
      parsed.length === 0 ||
      parsed.some((q) => q.id.startsWith("q-bank-")) ||
      parsed.length < ALL_DEFAULT_QUESTIONS.length
    ) {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(ALL_DEFAULT_QUESTIONS));
      return ALL_DEFAULT_QUESTIONS;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to read questions from localStorage:", err);
    return ALL_DEFAULT_QUESTIONS;
  }
}

// Persist questions to storage
export function saveStoredQuestions(questions: QuestionItem[]): void {
  if (typeof window === "undefined") {
    serverMemoryQuestions = [...questions];
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    window.dispatchEvent(new Event("quizdorm:questions-updated"));
  } catch (err) {
    console.error("Failed to save questions to localStorage:", err);
  }
}

// Query helpers
export function getAllQuestions(): QuestionItem[] {
  return getStoredQuestions();
}

export function getQuestionById(id: string): QuestionItem | undefined {
  return getStoredQuestions().find((q) => q.id === id);
}

export function getQuestionsByTopic(topic: string): QuestionItem[] {
  if (!topic || topic === "All") return getStoredQuestions();
  return getStoredQuestions().filter(
    (q) => q.topic.toLowerCase() === topic.toLowerCase()
  );
}

export function getQuestionsBySubject(subject: string): QuestionItem[] {
  if (!subject || subject === "All") return getStoredQuestions();
  return getStoredQuestions().filter(
    (q) => q.subject.toLowerCase() === subject.toLowerCase()
  );
}

export function getAllTopics(): string[] {
  const questions = getStoredQuestions();
  const topicsSet = new Set<string>();
  questions.forEach((q) => {
    if (q.topic) topicsSet.add(q.topic);
  });
  return Array.from(topicsSet).sort();
}

export function getAllSubjects(): string[] {
  const questions = getStoredQuestions();
  const subjectsSet = new Set<string>();
  questions.forEach((q) => {
    if (q.subject) subjectsSet.add(q.subject);
  });
  return Array.from(subjectsSet).sort();
}

export function getAllGradeLevels(): string[] {
  const questions = getStoredQuestions();
  const gradesSet = new Set<string>();
  questions.forEach((q) => {
    const g = q.gradeLevel || q.grade;
    if (g) gradesSet.add(g);
  });
  return Array.from(gradesSet).sort();
}

// Add a single question
export function addQuestion(question: QuestionItem): QuestionItem {
  const current = getStoredQuestions();
  const updated = [question, ...current];
  saveStoredQuestions(updated);
  return question;
}

// Update a question
export function updateQuestion(id: string, updates: Partial<QuestionItem>): QuestionItem | undefined {
  const current = getStoredQuestions();
  const idx = current.findIndex((q) => q.id === id);
  if (idx === -1) return undefined;
  current[idx] = { ...current[idx], ...updates, updatedAt: new Date().toISOString() };
  saveStoredQuestions(current);
  return current[idx];
}

// Delete a question
export function deleteQuestion(id: string): void {
  const current = getStoredQuestions();
  const filtered = current.filter((q) => q.id !== id);
  saveStoredQuestions(filtered);
}

// Bulk import with duplicate prevention
export function importQuestions(newQuestions: QuestionItem[]): { imported: number; skipped: number } {
  const current = getStoredQuestions();
  const existingTitles = new Set(current.map((q) => q.title.toLowerCase().trim()));
  const toAdd: QuestionItem[] = [];
  let skipped = 0;

  for (const nq of newQuestions) {
    const norm = nq.title.toLowerCase().trim();
    if (existingTitles.has(norm)) {
      skipped++;
    } else {
      existingTitles.add(norm);
      toAdd.push(nq);
    }
  }

  if (toAdd.length > 0) {
    saveStoredQuestions([...current, ...toAdd]);
  }

  return { imported: toAdd.length, skipped };
}

export interface QuestionFilterOptions {
  search?: string;
  topic?: string;
  gradeLevel?: string;
  subject?: string;
  category?: string;
  difficulty?: string;
  type?: string;
}

export function filterQuestions(options: QuestionFilterOptions = {}): QuestionItem[] {
  let list = getStoredQuestions();
  const { search, topic, gradeLevel, subject, category, difficulty, type } = options;

  if (topic && topic !== "All") {
    list = list.filter((q) => q.topic?.toLowerCase() === topic.toLowerCase());
  }

  if (gradeLevel && gradeLevel !== "All") {
    list = list.filter(
      (q) =>
        (q.gradeLevel && q.gradeLevel.toLowerCase() === gradeLevel.toLowerCase()) ||
        (q.grade && q.grade.toLowerCase() === gradeLevel.toLowerCase())
    );
  }

  if (subject && subject !== "All") {
    list = list.filter((q) => q.subject?.toLowerCase() === subject.toLowerCase());
  }

  if (category && category !== "All") {
    list = list.filter((q) => q.category?.toLowerCase() === category.toLowerCase());
  }

  if (difficulty && difficulty !== "All") {
    list = list.filter((q) => q.difficulty?.toLowerCase() === difficulty.toLowerCase());
  }

  if (type && type !== "All") {
    list = list.filter((q) => q.type === type);
  }

  if (search && search.trim()) {
    const term = search.toLowerCase().trim();
    list = list.filter(
      (q) =>
        q.title.toLowerCase().includes(term) ||
        (q.topic && q.topic.toLowerCase().includes(term)) ||
        (q.subject && q.subject.toLowerCase().includes(term)) ||
        (q.tags && q.tags.some((t) => t.toLowerCase().includes(term)))
    );
  }

  return list;
}
