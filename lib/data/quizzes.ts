import { DifficultyLevel,QuestionItem } from "@/lib/types/question";
import { QuizItem } from "@/lib/types/quiz";
import { ALL_DEFAULT_QUESTIONS,getStoredQuestions } from "./question-bank";

export const STORAGE_KEY_QUIZZES = "quizdorm_quizzes_v2";

export interface TopicSummary {
  topic: string;
  subject: string;
  questionCount: number;
  quizCount: number;
  gradeLevels: string[];
  difficulties: string[];
}

// Shuffling helper: Fisher-Yates algorithm on an array copy
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Creates an attempt-safe, randomized copy of a quiz and its questions/options.
 * - Does NOT mutate the stored quiz or questions.
 * - Shuffles questions if randomizeQuestions is true (or in Instant Quiz mode).
 * - Shuffles options if shuffleOptions is true, preserving each option's id & isCorrect.
 * - Correct-answer mapping is 100% preserved because userAnswer references option id.
 */
export function prepareQuizAttemptSession(
  quiz: QuizItem,
  options?: { forceShuffleQuestions?: boolean; forceShuffleOptions?: boolean }
): QuizItem {
  const shouldShuffleQuestions =
    options?.forceShuffleQuestions ?? quiz.randomizeQuestions;
  const shouldShuffleOptions =
    options?.forceShuffleOptions ?? quiz.shuffleOptions;

  // Deep copy questions
  let preparedQuestions: QuestionItem[] = quiz.questions.map((q) => {
    let opts = q.options ? [...q.options] : [];
    if (shouldShuffleOptions && opts.length > 1) {
      opts = shuffleArray(opts);
    }
    return {
      ...q,
      options: opts,
    };
  });

  if (shouldShuffleQuestions && preparedQuestions.length > 1) {
    preparedQuestions = shuffleArray(preparedQuestions);
  }

  return {
    ...quiz,
    questions: preparedQuestions,
  };
}

// Curate topic-based default quizzes from question bank
function buildDefaultQuizzes(): QuizItem[] {
  const allQ = ALL_DEFAULT_QUESTIONS;

  // Group questions by Topic
  const byTopic: Record<string, QuestionItem[]> = {};
  allQ.forEach((q) => {
    const t = q.topic || "General";
    if (!byTopic[t]) byTopic[t] = [];
    byTopic[t].push(q);
  });

  const quizzes: QuizItem[] = [
    // Pre-existing foundational quizzes
    {
      id: "q-101",
      title: "Advanced Algebra & Calculus Challenge",
      description: "Official assessment for high school and college calculus covering derivatives, integrals, and algebraic operations.",
      category: "Mathematics",
      subject: "Mathematics",
      topic: "Calculus",
      gradeLevel: "Grade 11-12",
      grade: "Grade 11-12",
      difficulty: "Hard",
      durationMinutes: 45,
      totalMarks: 25,
      passMarks: 15,
      status: "Published",
      randomizeQuestions: true,
      shuffleOptions: true,
      questions: allQ.filter((q) => q.topic.toLowerCase().includes("calculus") || q.subject === "Mathematics"),
      createdAt: "2026-07-20T00:00:00.000Z",
      updatedAt: "2026-10-13T12:00:00.000Z",
    },
    {
      id: "q-102",
      title: "Organic Chemistry Fundamentals",
      description: "Assess understanding of benzene rings, organic compounds, and molecular structures.",
      category: "Science",
      subject: "Science",
      topic: "Organic Chemistry",
      gradeLevel: "Grade 11-12",
      grade: "Grade 11-12",
      difficulty: "Medium",
      durationMinutes: 30,
      totalMarks: 20,
      passMarks: 12,
      status: "Published",
      randomizeQuestions: true,
      shuffleOptions: true,
      questions: allQ.filter((q) => q.topic.toLowerCase().includes("organic chemistry") || q.subject === "Science"),
      createdAt: "2026-07-18T00:00:00.000Z",
      updatedAt: "2026-10-13T12:00:00.000Z",
    },
  ];

  // Generate a premier quiz for each key topic from the PDF
  const topicConfigs: {
    topicKey: string;
    id: string;
    title: string;
    subject: string;
    desc: string;
    difficulty: DifficultyLevel;
    gradeLevel: string;
    duration: number;
  }[] = [
    {
      topicKey: "ISRO Missions & Space Exploration",
      id: "qz-topic-space-01",
      title: "ISRO Missions & Lunar Space Exploration Quiz",
      subject: "Space & Astronomy",
      desc: "Deep-dive quiz on Chandrayaan-3, Aditya-L1 solar observatory, XPoSat, and Gaganyaan human spaceflight.",
      difficulty: "Medium",
      gradeLevel: "Grade 9-10",
      duration: 30,
    },
    {
      topicKey: "Indian Constitution & Governance",
      id: "qz-topic-polity-02",
      title: "Indian Constitution, Parliament & Democratic Institutions",
      subject: "Politics & Governance",
      desc: "Comprehensive assessment covering Parliamentary procedures, Judiciary, Constitutional offices, and electoral reforms.",
      difficulty: "Medium",
      gradeLevel: "Grade 9-10",
      duration: 35,
    },
    {
      topicKey: "Emerging Science & Computing",
      id: "qz-topic-science-03",
      title: "Quantum Computing & Semiconductor Frontiers",
      subject: "Science & Technology",
      desc: "National Quantum Mission, SEMICON India chip fabrication, supercomputers, and cutting-edge RDI schemes.",
      difficulty: "Hard",
      gradeLevel: "Grade 11-12",
      duration: 30,
    },
    {
      topicKey: "Asian Games & Championships",
      id: "qz-topic-sports-04",
      title: "2026 Asian Games Champions & Sports Trivia",
      subject: "Sports & Athletics",
      desc: "Medal tallies, gold medalists in cricket, kabaddi, boxing, javelin throw, and upcoming Olympic bids.",
      difficulty: "Medium",
      gradeLevel: "Grade 9-10",
      duration: 25,
    },
    {
      topicKey: "Civilian Awards & Nobel Prizes",
      id: "qz-topic-awards-05",
      title: "Nobel Laureates, Bharat Ratna & National Honours",
      subject: "Awards & Honours",
      desc: "2026 Nobel prizes in Medicine (Optogenetics) and Physics (Neutrinos), plus Bharat Ratna and Padma awards.",
      difficulty: "Hard",
      gradeLevel: "Grade 11-12",
      duration: 30,
    },
    {
      topicKey: "India Current Affairs & Initiatives",
      id: "qz-topic-india-06",
      title: "National Initiatives, Centenary Milestones & Public Projects",
      subject: "National Affairs",
      desc: "UPSC centenary, VB-G RAM G rural infrastructure, IAF appointments, and 3D-printed housing projects.",
      difficulty: "Easy",
      gradeLevel: "Grade 6-8",
      duration: 25,
    },
    {
      topicKey: "Global Summits & International Relations",
      id: "qz-topic-world-07",
      title: "G20, ASEAN & International Diplomacy Assessment",
      subject: "World Affairs",
      desc: "G20 trade ministers summit, ASEAN 11th member admission (Timor-Leste), and global parliamentary assemblies.",
      difficulty: "Medium",
      gradeLevel: "Grade 9-10",
      duration: 25,
    },
    {
      topicKey: "Tamil Literature & Heritage",
      id: "qz-topic-tamil-08",
      title: "Tamil Nadu Cultural Heritage, Thirukkural & Literature",
      subject: "Tamil Nadu Heritage & GK",
      desc: "Classic Tamil literature, Thirukkural couplets, Sangam era poetry, state monuments, and governance.",
      difficulty: "Easy",
      gradeLevel: "Grade 6-8",
      duration: 25,
    },
    {
      topicKey: "Defence Forces & Technology",
      id: "qz-topic-defence-09",
      title: "Armed Forces, DRDO Missiles & Naval Capabilities",
      subject: "Defence & Security",
      desc: "INS Surya fleet support ship, HAL aero-engine milestone, BrahMos missile contracts, and high-altitude gear.",
      difficulty: "Medium",
      gradeLevel: "Grade 9-10",
      duration: 30,
    },
    {
      topicKey: "Climate Action & Biodiversity",
      id: "qz-topic-env-10",
      title: "Climate Action, COP Summits & Wildlife Conservation",
      subject: "Environment & Ecology",
      desc: "Renewable energy targets, COP agreements, wildlife sanctuaries, and environmental protection initiatives.",
      difficulty: "Medium",
      gradeLevel: "Grade 9-10",
      duration: 25,
    },
    {
      topicKey: "Indian Economy & Banking",
      id: "qz-topic-econ-11",
      title: "RBI Monetary Policy, Banking & Economic Growth",
      subject: "Economy & Business",
      desc: "India's growth metrics, RBI inflation targets, digital payments, trade agreements, and fiscal policies.",
      difficulty: "Hard",
      gradeLevel: "Grade 11-12",
      duration: 30,
    },
    {
      topicKey: "National & International Days",
      id: "qz-topic-days-12",
      title: "Important Observance Days & Global Themes",
      subject: "Important Days & Observances",
      desc: "International Yoga Day, Environment Day, National Doctors' Day, and commemorative dates.",
      difficulty: "Easy",
      gradeLevel: "Grade 6-8",
      duration: 20,
    },
  ];

  topicConfigs.forEach((cfg) => {
    // Collect questions matching this topic or subject
    const qList = allQ.filter(
      (q) =>
        q.topic.toLowerCase().includes(cfg.topicKey.toLowerCase()) ||
        q.subject.toLowerCase() === cfg.subject.toLowerCase()
    );

    const questionsSubset = qList.length >= 10 ? qList : allQ.filter((q) => q.subject === cfg.subject);

    if (questionsSubset.length > 0) {
      quizzes.push({
        id: cfg.id,
        title: cfg.title,
        description: cfg.desc,
        category: cfg.subject,
        subject: cfg.subject,
        topic: cfg.topicKey,
        gradeLevel: cfg.gradeLevel,
        grade: cfg.gradeLevel,
        difficulty: cfg.difficulty,
        durationMinutes: cfg.duration,
        totalMarks: questionsSubset.reduce((sum, q) => sum + (q.marks || 1), 0),
        passMarks: Math.ceil(questionsSubset.length * 0.6),
        status: "Published",
        randomizeQuestions: true,
        shuffleOptions: true,
        questions: questionsSubset,
        createdAt: "2026-10-13T12:00:00.000Z",
        updatedAt: "2026-10-13T12:00:00.000Z",
      });
    }
  });

  return quizzes;
}

export const ALL_DEFAULT_QUIZZES: QuizItem[] = buildDefaultQuizzes();

// Read quizzes from storage
export function getStoredQuizzes(): QuizItem[] {
  if (typeof window === "undefined") {
    return ALL_DEFAULT_QUIZZES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUIZZES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(ALL_DEFAULT_QUIZZES));
      return ALL_DEFAULT_QUIZZES;
    }
    const parsed = JSON.parse(raw) as QuizItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(ALL_DEFAULT_QUIZZES));
      return ALL_DEFAULT_QUIZZES;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to read quizzes from localStorage:", err);
    return ALL_DEFAULT_QUIZZES;
  }
}

// Persist quizzes
export function saveStoredQuizzes(quizzes: QuizItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(quizzes));
    window.dispatchEvent(new Event("quizdorm:quizzes-updated"));
  } catch (err) {
    console.error("Failed to save quizzes to localStorage:", err);
  }
}

// Queries
export function getAllQuizzes(): QuizItem[] {
  return getStoredQuizzes();
}

export function getQuizById(id: string): QuizItem | undefined {
  return getStoredQuizzes().find((q) => q.id === id);
}

export function getQuizzesByTopic(topic: string): QuizItem[] {
  if (!topic || topic === "All") return getStoredQuizzes();
  return getStoredQuizzes().filter(
    (q) => q.topic?.toLowerCase() === topic.toLowerCase()
  );
}

export function getQuizzesBySubject(subject: string): QuizItem[] {
  if (!subject || subject === "All") return getStoredQuizzes();
  return getStoredQuizzes().filter(
    (q) => q.subject.toLowerCase() === subject.toLowerCase()
  );
}

// Get all topics with metadata for topic-based browsing
export function getTopicsSummary(): TopicSummary[] {
  const quizzes = getStoredQuizzes();
  const questions = getStoredQuestions();

  const map = new Map<string, TopicSummary>();

  // Aggregate questions by topic - supporting multi-topic cross-indexing!
  questions.forEach((q) => {
    const topics = q.topics && q.topics.length > 0 ? q.topics : [q.topic || "General"];
    topics.forEach((topic) => {
      if (!map.has(topic)) {
        map.set(topic, {
          topic,
          subject: q.subject,
          questionCount: 0,
          quizCount: 0,
          gradeLevels: [],
          difficulties: [],
        });
      }
      const item = map.get(topic)!;
      item.questionCount++;
      const g = q.gradeLevel || q.grade;
      if (g && !item.gradeLevels.includes(g)) item.gradeLevels.push(g);
      if (q.difficulty && !item.difficulties.includes(q.difficulty)) item.difficulties.push(q.difficulty);
    });
  });

  // Aggregate quizzes count
  quizzes.forEach((quiz) => {
    const topic = quiz.topic || quiz.category;
    if (map.has(topic)) {
      map.get(topic)!.quizCount++;
    }
  });

  return Array.from(map.values()).sort((a, b) => b.questionCount - a.questionCount);
}

// Save/Update/Delete
export function saveQuiz(quiz: QuizItem): QuizItem {
  const current = getStoredQuizzes();
  const existingIdx = current.findIndex((q) => q.id === quiz.id);
  if (existingIdx >= 0) {
    current[existingIdx] = { ...quiz, updatedAt: new Date().toISOString() };
    saveStoredQuizzes(current);
  } else {
    saveStoredQuizzes([quiz, ...current]);
  }
  return quiz;
}

export function deleteQuiz(id: string): void {
  const current = getStoredQuizzes();
  const filtered = current.filter((q) => q.id !== id);
  saveStoredQuizzes(filtered);
}

/**
 * Generate a dynamic Instant Quiz from selected topic, grade level, and difficulty.
 * Randomizes questions on start!
 */
export function generateInstantQuiz(params: {
  topic?: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
  questionCount?: number;
  title?: string;
}): QuizItem {
  const allQ = getStoredQuestions();
  let pool = [...allQ];

  if (params.topic && params.topic !== "All") {
    pool = pool.filter(
      (q) => q.topic.toLowerCase() === params.topic!.toLowerCase()
    );
  }

  if (params.subject && params.subject !== "All") {
    pool = pool.filter(
      (q) => q.subject.toLowerCase() === params.subject!.toLowerCase()
    );
  }

  if (params.gradeLevel && params.gradeLevel !== "All") {
    pool = pool.filter(
      (q) => (q.gradeLevel || q.grade) === params.gradeLevel
    );
  }

  if (params.difficulty && params.difficulty !== "All") {
    pool = pool.filter((q) => q.difficulty === params.difficulty);
  }

  // If filtered pool is too small, relax constraints gracefully
  if (pool.length < 5 && params.topic && params.topic !== "All") {
    pool = allQ.filter(
      (q) => q.topic.toLowerCase() === params.topic!.toLowerCase()
    );
  }
  if (pool.length === 0) {
    pool = [...allQ];
  }

  const count = Math.min(params.questionCount || 10, pool.length);
  // Pick random questions from pool
  const selectedQuestions = shuffleArray(pool).slice(0, count);

  const topicName = params.topic || "Rapid Knowledge";
  const instantQuizId = `instant-quiz-${Date.now()}`;
  const quizTitle =
    params.title ||
    (params.topic && params.topic !== "All"
      ? `Instant Quiz: ${params.topic}`
      : "Instant Blitz Challenge");

  const instantQuiz: QuizItem = {
    id: instantQuizId,
    title: quizTitle,
    description: `Fast-paced instant practice quiz focused on ${topicName}. Questions and answers are automatically randomized for each attempt.`,
    category: params.subject || selectedQuestions[0]?.subject || "General Knowledge",
    subject: params.subject || selectedQuestions[0]?.subject || "General Knowledge",
    topic: params.topic || "Multi-Topic",
    gradeLevel: params.gradeLevel || "All Levels",
    grade: params.gradeLevel || "All Levels",
    difficulty: (params.difficulty as DifficultyLevel) || "Medium",
    durationMinutes: Math.max(5, Math.ceil(count * 1.5)),
    totalMarks: selectedQuestions.reduce((sum, q) => sum + (q.marks || 1), 0),
    passMarks: Math.ceil(count * 0.6),
    status: "Published",
    randomizeQuestions: true,
    shuffleOptions: true,
    questions: selectedQuestions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Persist into stored quizzes so it can be taken/reviewed
  saveQuiz(instantQuiz);

  return instantQuiz;
}
