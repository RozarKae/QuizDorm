import { NextRequest, NextResponse } from "next/server";
import { LiveSessionManager } from "@/lib/live/liveSessionManager";
import { sanitizeParticipantName } from "@/lib/security/sanitizer";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await context.params;
    const body = await req.json();

    const name = sanitizeParticipantName(body.name);

    const result = LiveSessionManager.joinSession(code, {
      id: body.participantId,
      userId: body.userId,
      name,
      avatarUrl: body.avatarUrl,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      participantId: result.participantId,
      participantToken: result.participantToken,
      session: result.session,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to join session" },
      { status: 500 }
    );
  }
}
