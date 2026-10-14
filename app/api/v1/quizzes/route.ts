import { NextResponse } from "next/server";
import {
  getAllQuizzes,
  getTopicsSummary,
  generateInstantQuiz,
} from "@/lib/data/quizzes";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topic = url.searchParams.get("topic") || undefined;
  const gradeLevel = url.searchParams.get("grade") || url.searchParams.get("gradeLevel") || undefined;
  const subject = url.searchParams.get("subject") || undefined;
  const difficulty = url.searchParams.get("difficulty") || undefined;
  const includeTopics = url.searchParams.get("includeTopics") === "true";

  let quizzes = getAllQuizzes();

  if (topic && topic !== "All") {
    quizzes = quizzes.filter(
      (q) => q.topic?.toLowerCase() === topic.toLowerCase()
    );
  }

  if (gradeLevel && gradeLevel !== "All") {
    quizzes = quizzes.filter(
      (q) =>
        (q.gradeLevel && q.gradeLevel.toLowerCase() === gradeLevel.toLowerCase()) ||
        (q.grade && q.grade.toLowerCase() === gradeLevel.toLowerCase())
    );
  }

  if (subject && subject !== "All") {
    quizzes = quizzes.filter(
      (q) => q.subject.toLowerCase() === subject.toLowerCase()
    );
  }

  if (difficulty && difficulty !== "All") {
    quizzes = quizzes.filter(
      (q) => q.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  const response: Record<string, any> = {
    status: "success",
    version: "v1.0",
    filters: {
      topic: topic || "All",
      gradeLevel: gradeLevel || "All",
      subject: subject || "All",
      difficulty: difficulty || "All",
    },
    count: quizzes.length,
    quizzes: quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      topic: q.topic,
      subject: q.subject,
      gradeLevel: q.gradeLevel || q.grade,
      difficulty: q.difficulty,
      questionCount: q.questions?.length || 0,
      durationMinutes: q.durationMinutes,
      totalMarks: q.totalMarks,
      randomizeQuestions: q.randomizeQuestions,
      shuffleOptions: q.shuffleOptions,
      status: q.status,
    })),
  };

  if (includeTopics) {
    response.topics = getTopicsSummary();
  }

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // If requested to generate an Instant Quiz
    if (body.type === "instant" || body.action === "generate_instant") {
      const instantQuiz = generateInstantQuiz({
        topic: body.topic,
        subject: body.subject,
        gradeLevel: body.gradeLevel || body.grade,
        difficulty: body.difficulty,
        questionCount: body.questionCount || 10,
        title: body.title,
      });

      return NextResponse.json(
        {
          status: "created",
          message: "Instant quiz generated with randomized question and option order",
          quiz: instantQuiz,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Use type 'instant' to generate an instant quiz via this endpoint",
      },
      { status: 400 }
    );
  } catch {
    return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
  }
}
