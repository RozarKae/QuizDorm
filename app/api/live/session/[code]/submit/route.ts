import { LiveSessionManager } from "@/lib/live/liveSessionManager";
import { NextRequest,NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await context.params;
    const body = await req.json();

    const { participantId, questionIndex, optionId } = body;

    if (!participantId || questionIndex === undefined || !optionId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: participantId, questionIndex, optionId" },
        { status: 400 }
      );
    }

    const result = LiveSessionManager.submitAnswer(
      code,
      participantId,
      Number(questionIndex),
      String(optionId)
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      isCorrect: result.isCorrect,
      scoreAwarded: result.scoreAwarded,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to submit answer";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
