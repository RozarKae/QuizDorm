import { getQuizByIdFromDb } from "@/lib/supabase/quizPersistence";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const unwrapped = typeof (params as PromiseLike<unknown>)?.then === "function"
      ? await (params as Promise<{ id: string }>)
      : (params as { id: string });

    const quizId = unwrapped?.id?.trim();
    if (!quizId) {
      return NextResponse.json({ error: "Missing or invalid quiz ID" }, { status: 400 });
    }

    const url = new URL(request.url);
    const forStudent = url.searchParams.get("forStudent") === "true";

    const result = await getQuizByIdFromDb(quizId, { forStudent });
    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error || "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
