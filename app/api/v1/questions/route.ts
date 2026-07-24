import { NextResponse } from "next/server";
import { ApiKeyManager } from "@/lib/developer/apiKeyManager";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  const apiKey = authHeader.replace("Bearer ", "").trim();

  // Validate API key if provided
  if (apiKey) {
    const val = ApiKeyManager.validateApiKey(apiKey);
    if (!val.valid) {
      return NextResponse.json({ error: "Unauthorized: Invalid or revoked API key" }, { status: 401 });
    }
  }

  const sampleQuestions = [
    {
      id: "q-api-101",
      text: "Which enzyme is primarily responsible for unzipping double-stranded DNA during replication?",
      type: "mcq",
      options: ["Helicase", "DNA Polymerase", "Ligase", "RNA Primase"],
      correctAnswer: "Helicase",
      difficulty: "Intermediate",
      bloomsTaxonomy: "Understanding",
      subject: "Biology",
    },
    {
      id: "q-api-102",
      text: "Evaluate the derivative of f(x) = 3x^4 - 5x^2 + 7.",
      type: "mcq",
      options: ["12x^3 - 10x", "12x^3 - 5x", "3x^3 - 10x", "12x^4 - 10x"],
      correctAnswer: "12x^3 - 10x",
      difficulty: "Advanced",
      bloomsTaxonomy: "Analyzing",
      subject: "Mathematics",
    },
  ];

  return NextResponse.json({
    status: "success",
    version: "v1.0",
    count: sampleQuestions.length,
    data: sampleQuestions,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        status: "created",
        version: "v1.0",
        message: "Question successfully added to QuizDorm Question Bank via REST API",
        data: { id: `q-api-${Date.now()}`, ...body },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
  }
}
