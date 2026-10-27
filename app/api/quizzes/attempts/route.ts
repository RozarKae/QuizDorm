import { getStudentAttemptHistoryFromDb } from "@/lib/supabase/quizPersistence";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getStudentAttemptHistoryFromDb();
    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error || "Failed to load attempt history" }, { status: 400 });
    }

    return NextResponse.json({ data: result.data, attempts: result.data }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
