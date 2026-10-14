import { NextResponse } from "next/server";
import { ApiKeyManager } from "@/lib/developer/apiKeyManager";
import { filterQuestions, addQuestion } from "@/lib/data/question-bank";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  const apiKey = authHeader.replace("Bearer ", "").trim();

  // Mandatory API key authentication check
  if (!apiKey) {
    return NextResponse.json({ error: "Unauthorized: Missing Authorization header with API key" }, { status: 401 });
  }

  const val = ApiKeyManager.validateApiKey(apiKey);
  if (!val.valid) {
    return NextResponse.json({ error: "Unauthorized: Invalid or revoked API key" }, { status: 401 });
  }

  const url = new URL(request.url);
  const topic = url.searchParams.get("topic") || undefined;
  const gradeLevel = url.searchParams.get("grade") || url.searchParams.get("gradeLevel") || undefined;
  const subject = url.searchParams.get("subject") || undefined;
  const difficulty = url.searchParams.get("difficulty") || undefined;
  const search = url.searchParams.get("search") || url.searchParams.get("q") || undefined;
  const type = url.searchParams.get("type") || undefined;
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "50", 10)));
  const offset = Math.max(0, parseInt(url.searchParams.get("offset") || "0", 10));

  const allFiltered = filterQuestions({
    topic,
    gradeLevel,
    subject,
    difficulty,
    search,
    type,
  });

  const paginated = allFiltered.slice(offset, offset + limit);

  return NextResponse.json({
    status: "success",
    version: "v1.0",
    filters: {
      topic: topic || "All",
      gradeLevel: gradeLevel || "All",
      subject: subject || "All",
      difficulty: difficulty || "All",
    },
    total: allFiltered.length,
    offset,
    limit,
    count: paginated.length,
    data: paginated,
  });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  const apiKey = authHeader.replace("Bearer ", "").trim();

  if (!apiKey) {
    return NextResponse.json({ error: "Unauthorized: Missing Authorization header with API key" }, { status: 401 });
  }

  const val = ApiKeyManager.validateApiKey(apiKey);
  if (!val.valid) {
    return NextResponse.json({ error: "Unauthorized: Invalid or revoked API key" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newQuestion = {
      id: `q-api-${Date.now()}`,
      title: body.title || body.text || "Untitled Question",
      type: body.type || "mcq_single",
      subject: body.subject || "General Knowledge",
      category: body.category || body.subject || "General Knowledge",
      topic: body.topic || "General",
      gradeLevel: body.gradeLevel || body.grade || "All Levels",
      grade: body.grade || body.gradeLevel || "All Levels",
      difficulty: body.difficulty || "Medium",
      marks: body.marks || 1,
      timeLimitSeconds: body.timeLimitSeconds || 60,
      options: body.options || [],
      explanation: body.explanation || "",
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addQuestion(newQuestion);

    return NextResponse.json(
      {
        status: "created",
        version: "v1.0",
        message: "Question successfully added to QuizDorm Question Bank via REST API",
        data: newQuestion,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
  }
}
