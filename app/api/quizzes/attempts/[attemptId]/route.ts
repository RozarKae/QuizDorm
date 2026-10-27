import { getAttemptResultFromDb } from "@/lib/supabase/quizPersistence";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ attemptId: string }> | { attemptId: string } }
) {
  try {
    const unwrapped = typeof (params as PromiseLike<unknown>)?.then === "function"
      ? await (params as Promise<{ attemptId: string }>)
      : (params as { attemptId: string });

    const attemptId = unwrapped?.attemptId?.trim();
    if (!attemptId) {
      return NextResponse.json({ error: "Missing or invalid attempt ID" }, { status: 400 });
    }
    const result = await getAttemptResultFromDb(attemptId);

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error || "Attempt not found" }, { status: 404 });
    }

    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
