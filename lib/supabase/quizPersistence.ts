import { AttemptStatus,QuizAttempt } from "@/lib/types/attempt";
import { DifficultyLevel,QuestionItem,QuestionOption,QuestionType } from "@/lib/types/question";
import { QuizItem,QuizStatus } from "@/lib/types/quiz";
import { createClient,isSupabaseConfigured } from "./server";

export interface ServiceResult<T> {
  data?: T;
  error?: string;
}

/**
 * Maps Supabase database row to QuestionItem domain model
 */
export function mapDbQuestionToDomain(
  row: Record<string, unknown>,
  options: Array<Record<string, unknown>> = [],
  includeAnswerKeys = true
): QuestionItem {
  const diffRaw = String(row.difficulty || "medium").toLowerCase();
  const difficulty: DifficultyLevel =
    diffRaw === "easy" ? "Easy" : diffRaw === "hard" ? "Hard" : "Medium";

  const domainOptions: QuestionOption[] = options.map((opt) => ({
    id: String(opt.id),
    text: String(opt.option_text || ""),
    isCorrect: includeAnswerKeys ? Boolean(opt.is_correct) : undefined,
  }));

  return {
    id: String(row.id),
    title: String(row.title || ""),
    type: (row.type as QuestionType) || "mcq_single",
    subject: String(row.subject || ""),
    category: String(row.category || row.subject || ""),
    topic: String(row.topic || ""),
    difficulty,
    marks: Number(row.marks) || 1,
    negativeMarks: Number(row.negative_marks) || 0,
    timeLimitSeconds: 60,
    explanation: includeAnswerKeys ? (row.explanation ? String(row.explanation) : undefined) : undefined,
    image: row.image_url ? String(row.image_url) : undefined,
    options: domainOptions,
    tags: row.topic ? [String(row.topic)] : [],
    createdAt: String(row.created_at || new Date().toISOString()),
    updatedAt: String(row.created_at || new Date().toISOString()),
  };
}

/**
 * Maps Supabase database row to QuizItem domain model
 */
export function mapDbQuizToDomain(
  row: Record<string, unknown>,
  questions: QuestionItem[] = []
): QuizItem {
  const diffRaw = String(row.difficulty || "medium").toLowerCase();
  const difficulty: DifficultyLevel =
    diffRaw === "easy" ? "Easy" : diffRaw === "hard" ? "Hard" : "Medium";

  const status: QuizStatus = row.is_published ? "Published" : "Draft";

  return {
    id: String(row.id),
    title: String(row.title || ""),
    description: row.description ? String(row.description) : undefined,
    category: String(row.category || row.subject || ""),
    subject: String(row.subject || ""),
    topic: row.category ? String(row.category) : undefined,
    difficulty,
    durationMinutes: Number(row.duration_minutes) || 30,
    totalMarks: Number(row.total_marks) || 100,
    passMarks: Number(row.pass_marks) || 50,
    status,
    randomizeQuestions: Boolean(row.randomize_questions),
    shuffleOptions: Boolean(row.shuffle_options),
    questions,
    createdAt: String(row.created_at || new Date().toISOString()),
    updatedAt: String(row.updated_at || new Date().toISOString()),
  };
}

/**
 * -----------------------------------------------------------------------------
 * 1. QUIZ SERVICE OPERATIONS
 * -----------------------------------------------------------------------------
 */

export async function getQuizzesFromDb(filters?: {
  subject?: string;
  difficulty?: string;
  publishedOnly?: boolean;
}): Promise<ServiceResult<QuizItem[]>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured. Supabase credentials are missing." };
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("quizzes")
      .select(
        `
        id,
        title,
        description,
        subject,
        category,
        difficulty,
        duration_minutes,
        total_marks,
        pass_marks,
        is_published,
        randomize_questions,
        shuffle_options,
        created_at,
        updated_at,
        questions (
          id,
          title,
          type,
          subject,
          category,
          topic,
          difficulty,
          marks,
          negative_marks,
          explanation,
          image_url,
          created_at,
          question_options (
            id,
            option_text,
            is_correct,
            option_order
          )
        )
      `
      )
      .order("created_at", { ascending: false });

    if (filters?.publishedOnly) {
      query = query.eq("is_published", true);
    }
    if (filters?.subject && filters.subject !== "All") {
      query = query.ilike("subject", filters.subject);
    }
    if (filters?.difficulty && filters.difficulty !== "All") {
      query = query.eq("difficulty", filters.difficulty.toLowerCase());
    }

    const { data, error } = await query;
    if (error) {
      return { error: `Failed to fetch quizzes: ${error.message}` };
    }

    const domainQuizzes = (data || []).map((qRow: Record<string, unknown>) => {
      const qList = (qRow.questions as Array<Record<string, unknown>>) || [];
      const domainQuestions = qList.map((questRow) => {
        const opts = (questRow.question_options as Array<Record<string, unknown>>) || [];
        return mapDbQuestionToDomain(questRow, opts, true);
      });
      return mapDbQuizToDomain(qRow, domainQuestions);
    });

    return { data: domainQuizzes };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error while reading quizzes";
    return { error: message };
  }
}

export async function getQuizByIdFromDb(
  quizId: string,
  options: { forStudent?: boolean } = {}
): Promise<ServiceResult<QuizItem>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured. Supabase credentials are missing." };
  }

  try {
    const supabase = await createClient();
    const { data: qRow, error } = await supabase
      .from("quizzes")
      .select(
        `
        id,
        title,
        description,
        subject,
        category,
        difficulty,
        duration_minutes,
        total_marks,
        pass_marks,
        is_published,
        randomize_questions,
        shuffle_options,
        created_at,
        updated_at,
        questions (
          id,
          title,
          type,
          subject,
          category,
          topic,
          difficulty,
          marks,
          negative_marks,
          explanation,
          image_url,
          created_at,
          question_options (
            id,
            option_text,
            is_correct,
            option_order
          )
        )
      `
      )
      .eq("id", quizId)
      .single();

    if (error || !qRow) {
      return { error: error ? error.message : "Quiz not found in database." };
    }

    const includeAnswerKeys = !options.forStudent;
    const qList = (qRow.questions as Array<Record<string, unknown>>) || [];
    const domainQuestions = qList.map((questRow) => {
      const opts = (questRow.question_options as Array<Record<string, unknown>>) || [];
      return mapDbQuestionToDomain(questRow, opts, includeAnswerKeys);
    });

    return { data: mapDbQuizToDomain(qRow, domainQuestions) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error while reading quiz";
    return { error: message };
  }
}

export async function createQuizInDb(
  quizInput: Omit<QuizItem, "id" | "createdAt" | "updatedAt">
): Promise<ServiceResult<QuizItem>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured. Supabase credentials are missing." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const insertQuizPayload = {
      creator_id: user?.id || null,
      title: quizInput.title,
      description: quizInput.description || null,
      subject: quizInput.subject || "General",
      category: quizInput.category || quizInput.subject || "General",
      difficulty: quizInput.difficulty.toLowerCase(),
      duration_minutes: quizInput.durationMinutes || 30,
      total_marks: quizInput.totalMarks || 100,
      pass_marks: quizInput.passMarks || 50,
      is_published: quizInput.status === "Published",
      randomize_questions: Boolean(quizInput.randomizeQuestions),
      shuffle_options: Boolean(quizInput.shuffleOptions),
    };

    const { data: createdQuiz, error: quizError } = await supabase
      .from("quizzes")
      .insert(insertQuizPayload)
      .select()
      .single();

    if (quizError || !createdQuiz) {
      return { error: `Failed to create quiz record: ${quizError?.message}` };
    }

    const createdQuestions: QuestionItem[] = [];

    // Insert questions and options
    for (const q of quizInput.questions || []) {
      const { data: createdQuestion, error: qError } = await supabase
        .from("questions")
        .insert({
          quiz_id: createdQuiz.id,
          title: q.title,
          type: q.type || "mcq_single",
          subject: q.subject || quizInput.subject,
          category: q.category || quizInput.category,
          topic: q.topic || null,
          difficulty: q.difficulty?.toLowerCase() || "medium",
          marks: q.marks || 1,
          negative_marks: q.negativeMarks || 0,
          explanation: q.explanation || null,
          image_url: q.image || null,
        })
        .select()
        .single();

      if (qError || !createdQuestion) {
        continue;
      }

      const domainOptions: QuestionOption[] = [];
      if (Array.isArray(q.options) && q.options.length > 0) {
        const optionsPayload = q.options.map((opt, idx) => ({
          question_id: createdQuestion.id,
          option_text: opt.text,
          is_correct: Boolean(opt.isCorrect),
          option_order: idx + 1,
        }));

        const { data: insertedOpts } = await supabase
          .from("question_options")
          .insert(optionsPayload)
          .select();

        if (insertedOpts) {
          insertedOpts.forEach((io: Record<string, unknown>) => {
            domainOptions.push({
              id: String(io.id),
              text: String(io.option_text),
              isCorrect: Boolean(io.is_correct),
            });
          });
        }
      }

      createdQuestions.push(mapDbQuestionToDomain(createdQuestion, domainOptions as unknown as Array<Record<string, unknown>>, true));
    }

    return { data: mapDbQuizToDomain(createdQuiz, createdQuestions) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating quiz in database";
    return { error: message };
  }
}

export async function deleteQuizFromDb(quizId: string): Promise<ServiceResult<boolean>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("quizzes").delete().eq("id", quizId);
    if (error) {
      return { error: error.message };
    }
    return { data: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to delete quiz" };
  }
}

/**
 * -----------------------------------------------------------------------------
 * 2. QUESTION BANK SERVICE OPERATIONS
 * -----------------------------------------------------------------------------
 */

export async function getQuestionsFromDb(filters?: {
  subject?: string;
  topic?: string;
  difficulty?: string;
  type?: string;
  search?: string;
}): Promise<ServiceResult<QuestionItem[]>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured. Supabase credentials are missing." };
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("questions")
      .select(
        `
        id,
        quiz_id,
        title,
        type,
        subject,
        category,
        topic,
        difficulty,
        marks,
        negative_marks,
        explanation,
        image_url,
        created_at,
        question_options (
          id,
          option_text,
          is_correct,
          option_order
        )
      `
      )
      .order("created_at", { ascending: false });

    if (filters?.subject && filters.subject !== "All") {
      query = query.ilike("subject", filters.subject);
    }
    if (filters?.difficulty && filters.difficulty !== "All") {
      query = query.eq("difficulty", filters.difficulty.toLowerCase());
    }
    if (filters?.type && filters.type !== "All") {
      query = query.eq("type", filters.type);
    }
    if (filters?.search) {
      query = query.ilike("title", `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) {
      return { error: error.message };
    }

    const domainQuestions = (data || []).map((row: Record<string, unknown>) => {
      const opts = (row.question_options as Array<Record<string, unknown>>) || [];
      return mapDbQuestionToDomain(row, opts, true);
    });

    return { data: domainQuestions };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to fetch questions from database" };
  }
}

export async function createQuestionInDb(
  q: Omit<QuestionItem, "id" | "createdAt" | "updatedAt"> & { quizId?: string }
): Promise<ServiceResult<QuestionItem>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured." };
  }

  try {
    const supabase = await createClient();
    const { data: createdQ, error: qErr } = await supabase
      .from("questions")
      .insert({
        quiz_id: q.quizId || null,
        title: q.title,
        type: q.type || "mcq_single",
        subject: q.subject || "General",
        category: q.category || q.subject || "General",
        topic: q.topic || null,
        difficulty: q.difficulty?.toLowerCase() || "medium",
        marks: q.marks || 1,
        negative_marks: q.negativeMarks || 0,
        explanation: q.explanation || null,
        image_url: q.image || null,
      })
      .select()
      .single();

    if (qErr || !createdQ) {
      return { error: qErr?.message || "Failed to insert question" };
    }

    const domainOptions: QuestionOption[] = [];
    if (Array.isArray(q.options) && q.options.length > 0) {
      const optionsPayload = q.options.map((opt, idx) => ({
        question_id: createdQ.id,
        option_text: opt.text,
        is_correct: Boolean(opt.isCorrect),
        option_order: idx + 1,
      }));

      const { data: insertedOpts } = await supabase
        .from("question_options")
        .insert(optionsPayload)
        .select();

      if (insertedOpts) {
        insertedOpts.forEach((io: Record<string, unknown>) => {
          domainOptions.push({
            id: String(io.id),
            text: String(io.option_text),
            isCorrect: Boolean(io.is_correct),
          });
        });
      }
    }

    return {
      data: mapDbQuestionToDomain(createdQ, domainOptions as unknown as Array<Record<string, unknown>>, true),
    };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Error creating question in database" };
  }
}

export async function deleteQuestionFromDb(questionId: string): Promise<ServiceResult<boolean>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("questions").delete().eq("id", questionId);
    if (error) {
      return { error: error.message };
    }
    return { data: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to delete question" };
  }
}

/**
 * -----------------------------------------------------------------------------
 * 3. AUTHORITATIVE SERVER-SIDE GRADING & ATTEMPT SUBMISSION
 * -----------------------------------------------------------------------------
 */

export interface SubmitQuizParams {
  quizId: string;
  answers: Record<string, unknown>; // questionId -> answer
  timeTakenSeconds?: number;
  idempotencyKey?: string;
}

export async function submitQuizAttemptToDb(
  params: SubmitQuizParams
): Promise<ServiceResult<QuizAttempt>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured. Supabase credentials are missing." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 1. Check idempotency to prevent duplicate submissions
    if (params.idempotencyKey) {
      const { data: existingAttempt } = await supabase
        .from("quiz_attempts")
        .select("id, status, score, total_marks, percentage, is_passed, correct_count, incorrect_count, unanswered_count, started_at, submitted_at, quiz_id")
        .eq("idempotency_key", params.idempotencyKey)
        .maybeSingle();

      if (existingAttempt) {
        // Return existing attempt result directly
        const attemptDomain: QuizAttempt = {
          id: existingAttempt.id,
          quizId: existingAttempt.quiz_id,
          quizTitle: "Assessment Attempt",
          userId: user?.id || "guest",
          userName: user?.user_metadata?.name || "Student",
          status: existingAttempt.status as AttemptStatus,
          startedAt: existingAttempt.started_at,
          submittedAt: existingAttempt.submitted_at,
          timeTakenSeconds: params.timeTakenSeconds || 0,
          durationMinutes: 30,
          answers: params.answers,
          markedForReview: [],
          score: existingAttempt.score,
          totalMarks: existingAttempt.total_marks,
          passMarks: 50,
          percentage: Number(existingAttempt.percentage),
          isPassed: existingAttempt.is_passed,
          correctCount: existingAttempt.correct_count,
          incorrectCount: existingAttempt.incorrect_count,
          unansweredCount: existingAttempt.unanswered_count,
          questions: [],
        };
        return { data: attemptDomain };
      }
    }

    // 2. Fetch authoritative quiz and questions with answer keys from database
    const { data: qRow, error: qError } = await supabase
      .from("quizzes")
      .select(
        `
        id,
        title,
        duration_minutes,
        total_marks,
        pass_marks,
        is_published,
        questions (
          id,
          title,
          type,
          marks,
          negative_marks,
          explanation,
          question_options (
            id,
            option_text,
            is_correct
          )
        )
      `
      )
      .eq("id", params.quizId)
      .single();

    if (qError || !qRow) {
      return { error: "Quiz not found or inaccessible for grading." };
    }

    // 3. Strict Server-Side Grading Algorithm
    const questionsList = (qRow.questions as Array<Record<string, unknown>>) || [];
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let score = 0;

    const answerAuditRecords: Array<{
      question_id: string;
      user_answer: unknown;
      is_correct: boolean;
      score_awarded: number;
    }> = [];

    for (const q of questionsList) {
      const qId = String(q.id);
      const userAnswer = params.answers[qId];
      const marks = Number(q.marks) || 1;
      const negMarks = Number(q.negative_marks) || 0;
      const opts = (q.question_options as Array<Record<string, unknown>>) || [];

      if (userAnswer === undefined || userAnswer === null || userAnswer === "") {
        unansweredCount++;
        answerAuditRecords.push({
          question_id: qId,
          user_answer: null,
          is_correct: false,
          score_awarded: 0,
        });
        continue;
      }

      let isCorrect = false;
      const qType = String(q.type);

      if (qType === "mcq_single" || qType === "image_based") {
        const correctOpt = opts.find((o) => o.is_correct === true);
        isCorrect = correctOpt !== undefined && String(correctOpt.id) === String(userAnswer);
      } else if (qType === "mcq_multiple") {
        const correctOptIds = opts.filter((o) => o.is_correct === true).map((o) => String(o.id)).sort();
        const userArr = Array.isArray(userAnswer) ? userAnswer.map(String).sort() : [];
        isCorrect =
          correctOptIds.length === userArr.length &&
          correctOptIds.every((id, idx) => id === userArr[idx]);
      } else if (qType === "true_false") {
        const correctOpt = opts.find((o) => (o as Record<string, unknown>).is_correct === true) as Record<string, unknown> | undefined;
        const expected = String(correctOpt?.option_text || "true").toLowerCase().trim();
        isCorrect = String(userAnswer).toLowerCase().trim() === expected;
      } else if (qType === "fill_in_the_blank") {
        const userStr = String(userAnswer).trim().toLowerCase().replace(/\s+/g, " ");
        const correctOpts = opts.map((o) => String(o.option_text).trim().toLowerCase().replace(/\s+/g, " "));
        isCorrect = correctOpts.includes(userStr);
      }

      let awarded = 0;
      if (isCorrect) {
        correctCount++;
        score += marks;
        awarded = marks;
      } else {
        incorrectCount++;
        if (negMarks > 0) {
          score -= negMarks;
          awarded = -negMarks;
        }
      }

      answerAuditRecords.push({
        question_id: qId,
        user_answer: userAnswer,
        is_correct: isCorrect,
        score_awarded: awarded,
      });
    }

    const totalMarks = Number(qRow.total_marks) || questionsList.reduce((acc, q) => acc + (Number(q.marks) || 1), 0);
    const passMarks = Number(qRow.pass_marks) || 50;
    const percentage = Math.max(0, Math.round((score / (totalMarks || 1)) * 100));
    const isPassed = percentage >= passMarks;

    const startedAt = new Date(Date.now() - (params.timeTakenSeconds || 60) * 1000).toISOString();
    const submittedAt = new Date().toISOString();

    // 4. Persist Attempt Record in Supabase
    const { data: attemptRow, error: attemptErr } = await supabase
      .from("quiz_attempts")
      .insert({
        quiz_id: params.quizId,
        user_id: user?.id || null,
        status: "submitted",
        score,
        total_marks: totalMarks,
        percentage,
        is_passed: isPassed,
        correct_count: correctCount,
        incorrect_count: incorrectCount,
        unanswered_count: unansweredCount,
        started_at: startedAt,
        submitted_at: submittedAt,
        idempotency_key: params.idempotencyKey || null,
      })
      .select()
      .single();

    if (attemptErr || !attemptRow) {
      return { error: `Failed to persist quiz attempt: ${attemptErr?.message}` };
    }

    // 5. Persist Answer Breakdown Records in Supabase
    if (answerAuditRecords.length > 0) {
      const answersPayload = answerAuditRecords.map((rec) => ({
        attempt_id: attemptRow.id,
        question_id: rec.question_id,
        user_answer: rec.user_answer,
        is_correct: rec.is_correct,
        score_awarded: rec.score_awarded,
      }));

      await supabase.from("student_answers").insert(answersPayload);
    }

    const finalDomainAttempt: QuizAttempt = {
      id: attemptRow.id,
      quizId: params.quizId,
      quizTitle: String(qRow.title),
      userId: user?.id || "guest",
      userName: user?.user_metadata?.name || "Student",
      status: "submitted",
      startedAt,
      submittedAt,
      timeTakenSeconds: params.timeTakenSeconds || 0,
      durationMinutes: Number(qRow.duration_minutes) || 30,
      answers: params.answers,
      markedForReview: [],
      score,
      totalMarks,
      passMarks,
      percentage,
      isPassed,
      correctCount,
      incorrectCount,
      unansweredCount,
      questions: [],
    };

    return { data: finalDomainAttempt };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error executing quiz submission";
    return { error: message };
  }
}

/**
 * -----------------------------------------------------------------------------
 * 4. RESULTS, REVIEW, AND HISTORY FETCHERS
 * -----------------------------------------------------------------------------
 */

export async function getAttemptResultFromDb(
  attemptId: string
): Promise<ServiceResult<{ attempt: QuizAttempt; quizTitle: string }>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured." };
  }

  try {
    const supabase = await createClient();
    const { data: attRow, error } = await supabase
      .from("quiz_attempts")
      .select(
        `
        id,
        quiz_id,
        user_id,
        status,
        score,
        total_marks,
        percentage,
        is_passed,
        correct_count,
        incorrect_count,
        unanswered_count,
        started_at,
        submitted_at,
        quizzes (
          id,
          title,
          duration_minutes,
          pass_marks
        )
      `
      )
      .eq("id", attemptId)
      .single();

    if (error || !attRow) {
      return { error: error ? error.message : "Attempt record not found." };
    }

    const quizRaw = attRow.quizzes;
    const quizInfo = (Array.isArray(quizRaw) ? quizRaw[0] : quizRaw) as unknown as Record<string, unknown> || {};
    const quizTitle = String(quizInfo.title || "Assessment");

    const timeTakenSeconds = attRow.submitted_at && attRow.started_at
      ? Math.max(0, Math.round((new Date(attRow.submitted_at).getTime() - new Date(attRow.started_at).getTime()) / 1000))
      : 0;

    const domainAttempt: QuizAttempt = {
      id: attRow.id,
      quizId: attRow.quiz_id,
      quizTitle,
      userId: attRow.user_id || "",
      userName: "Student",
      status: attRow.status as AttemptStatus,
      startedAt: attRow.started_at,
      submittedAt: attRow.submitted_at,
      timeTakenSeconds,
      durationMinutes: Number(quizInfo.duration_minutes) || 30,
      answers: {},
      markedForReview: [],
      score: attRow.score,
      totalMarks: attRow.total_marks,
      passMarks: Number(quizInfo.pass_marks) || 50,
      percentage: Number(attRow.percentage),
      isPassed: attRow.is_passed,
      correctCount: attRow.correct_count,
      incorrectCount: attRow.incorrect_count,
      unansweredCount: attRow.unanswered_count,
      questions: [],
    };

    return { data: { attempt: domainAttempt, quizTitle } };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to load attempt result" };
  }
}

export async function getAttemptReviewFromDb(
  attemptId: string
): Promise<ServiceResult<{
  attempt: QuizAttempt;
  questions: Array<QuestionItem & { userAnswer: unknown; isCorrect: boolean; scoreAwarded: number }>;
}>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured." };
  }

  try {
    const supabase = await createClient();
    
    // 1. Fetch attempt and quiz
    const { data: attRow, error: attError } = await supabase
      .from("quiz_attempts")
      .select(
        `
        id,
        quiz_id,
        user_id,
        status,
        score,
        total_marks,
        percentage,
        is_passed,
        correct_count,
        incorrect_count,
        unanswered_count,
        started_at,
        submitted_at,
        quizzes (
          id,
          title,
          duration_minutes,
          pass_marks
        )
      `
      )
      .eq("id", attemptId)
      .single();

    if (attError || !attRow) {
      return { error: "Attempt record not found." };
    }

    const quizRaw = attRow.quizzes;
    const quizInfo = (Array.isArray(quizRaw) ? quizRaw[0] : quizRaw) as unknown as Record<string, unknown> || {};
    const quizTitle = String(quizInfo.title || "Assessment");

    // 2. Fetch student answers for this attempt
    const { data: studentAnswers, error: ansError } = await supabase
      .from("student_answers")
      .select("question_id, user_answer, is_correct, score_awarded")
      .eq("attempt_id", attemptId);

    if (ansError) {
      return { error: `Failed to fetch answer records: ${ansError.message}` };
    }

    const answerMap = new Map<string, { userAnswer: unknown; isCorrect: boolean; scoreAwarded: number }>();
    (studentAnswers || []).forEach((sa) => {
      answerMap.set(sa.question_id, {
        userAnswer: sa.user_answer,
        isCorrect: sa.is_correct,
        scoreAwarded: Number(sa.score_awarded) || 0,
      });
    });

    // 3. Fetch questions and options for this quiz
    const { data: questionsList, error: qError } = await supabase
      .from("questions")
      .select(
        `
        id,
        title,
        type,
        subject,
        category,
        topic,
        difficulty,
        marks,
        negative_marks,
        explanation,
        image_url,
        created_at,
        question_options (
          id,
          option_text,
          is_correct,
          option_order
        )
      `
      )
      .eq("quiz_id", attRow.quiz_id);

    if (qError) {
      return { error: `Failed to load review questions: ${qError.message}` };
    }

    const reviewQuestions = (questionsList || []).map((qRow: Record<string, unknown>) => {
      const opts = (qRow.question_options as Array<Record<string, unknown>>) || [];
      const domainQ = mapDbQuestionToDomain(qRow, opts, true);
      const ansInfo = answerMap.get(domainQ.id) || {
        userAnswer: null,
        isCorrect: false,
        scoreAwarded: 0,
      };

      return {
        ...domainQ,
        userAnswer: ansInfo.userAnswer,
        isCorrect: ansInfo.isCorrect,
        scoreAwarded: ansInfo.scoreAwarded,
      };
    });

    const timeTakenSeconds = attRow.submitted_at && attRow.started_at
      ? Math.max(0, Math.round((new Date(attRow.submitted_at).getTime() - new Date(attRow.started_at).getTime()) / 1000))
      : 0;

    const domainAttempt: QuizAttempt = {
      id: attRow.id,
      quizId: attRow.quiz_id,
      quizTitle,
      userId: attRow.user_id || "",
      userName: "Student",
      status: attRow.status as AttemptStatus,
      startedAt: attRow.started_at,
      submittedAt: attRow.submitted_at,
      timeTakenSeconds,
      durationMinutes: Number(quizInfo.duration_minutes) || 30,
      answers: Object.fromEntries(Array.from(answerMap.entries()).map(([k, v]) => [k, v.userAnswer])),
      markedForReview: [],
      score: attRow.score,
      totalMarks: attRow.total_marks,
      passMarks: Number(quizInfo.pass_marks) || 50,
      percentage: Number(attRow.percentage),
      isPassed: attRow.is_passed,
      correctCount: attRow.correct_count,
      incorrectCount: attRow.incorrect_count,
      unansweredCount: attRow.unanswered_count,
      questions: reviewQuestions,
    };

    return {
      data: {
        attempt: domainAttempt,
        questions: reviewQuestions,
      },
    };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to load attempt review" };
  }
}

export async function getStudentAttemptHistoryFromDb(): Promise<ServiceResult<QuizAttempt[]>> {
  if (!isSupabaseConfigured()) {
    return { error: "Database service is not configured." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let query = supabase
      .from("quiz_attempts")
      .select(
        `
        id,
        quiz_id,
        user_id,
        status,
        score,
        total_marks,
        percentage,
        is_passed,
        correct_count,
        incorrect_count,
        unanswered_count,
        started_at,
        submitted_at,
        quizzes (
          id,
          title,
          duration_minutes,
          pass_marks
        )
      `
      )
      .order("started_at", { ascending: false });

    // If user is authenticated, isolate to their attempts
    if (user?.id) {
      query = query.eq("user_id", user.id);
    }

    const { data: attemptsList, error } = await query;
    if (error) {
      return { error: error.message };
    }

    const domainAttempts: QuizAttempt[] = (attemptsList || []).map((attRow: Record<string, unknown>) => {
      const quizRaw = attRow.quizzes;
      const quizInfo = (Array.isArray(quizRaw) ? quizRaw[0] : quizRaw) as unknown as Record<string, unknown> || {};
      const timeTakenSeconds = attRow.submitted_at && attRow.started_at
        ? Math.max(0, Math.round((new Date(attRow.submitted_at as string).getTime() - new Date(attRow.started_at as string).getTime()) / 1000))
        : 0;

      return {
        id: String(attRow.id),
        quizId: String(attRow.quiz_id),
        quizTitle: String(quizInfo.title || "Assessment"),
        userId: String(attRow.user_id || ""),
        userName: user?.user_metadata?.name || "Student",
        status: attRow.status as AttemptStatus,
        startedAt: String(attRow.started_at),
        submittedAt: attRow.submitted_at ? String(attRow.submitted_at) : undefined,
        timeTakenSeconds,
        durationMinutes: Number(quizInfo.duration_minutes) || 30,
        answers: {},
        markedForReview: [],
        score: Number(attRow.score) || 0,
        totalMarks: Number(attRow.total_marks) || 100,
        passMarks: Number(quizInfo.pass_marks) || 50,
        percentage: Number(attRow.percentage) || 0,
        isPassed: Boolean(attRow.is_passed),
        correctCount: Number(attRow.correct_count) || 0,
        incorrectCount: Number(attRow.incorrect_count) || 0,
        unansweredCount: Number(attRow.unanswered_count) || 0,
        questions: [],
      };
    });

    return { data: domainAttempts };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Failed to load attempt history" };
  }
}
