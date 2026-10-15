import { NextRequest, NextResponse } from "next/server";
import { LiveSessionManager } from "@/lib/live/liveSessionManager";

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
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit answer" },
      { status: 500 }
    );
  }
}
