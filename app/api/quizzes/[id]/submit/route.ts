import { submitQuizAttemptToDb } from "@/lib/supabase/quizPersistence";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const unwrapped = typeof (params as PromiseLike<unknown>)?.then === "function"
      ? await (params as Promise<{ id: string }>)
      : (params as { id: string });

    const quizId = unwrapped.id;
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { answers, timeTakenSeconds, idempotencyKey } = body;
    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Missing or invalid answers object" }, { status: 400 });
    }

    const result = await submitQuizAttemptToDb({
      quizId,
      answers,
      timeTakenSeconds: typeof timeTakenSeconds === "number" ? timeTakenSeconds : undefined,
      idempotencyKey: typeof idempotencyKey === "string" ? idempotencyKey : undefined,
    });

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error || "Submission failed" }, { status: 422 });
    }

    return NextResponse.json({ success: true, attempt: result.data }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error during quiz submission";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
