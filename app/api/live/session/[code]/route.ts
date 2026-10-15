import { NextRequest, NextResponse } from "next/server";
import { LiveSessionManager, toPublicSessionState } from "@/lib/live/liveSessionManager";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const session = LiveSessionManager.getSession(code);

  if (!session) {
    return NextResponse.json(
      { success: false, error: "SESSION_NOT_FOUND: No active arena found with this PIN code." },
      { status: 404 }
    );
  }

  const participantId = req.nextUrl.searchParams.get("participantId") || undefined;
  const publicState = toPublicSessionState(session, participantId);

  return NextResponse.json({
    success: true,
    session: publicState,
  });
}
