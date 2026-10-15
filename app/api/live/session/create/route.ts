import { NextRequest, NextResponse } from "next/server";
import { LiveSessionManager } from "@/lib/live/liveSessionManager";
import { CreateSessionOptions } from "@/lib/live/types";

export async function POST(req: NextRequest) {
  try {
    const body: CreateSessionOptions = await req.json();

    // Idempotency check: if code is supplied and session exists, return existing
    if (body.code) {
      const existing = LiveSessionManager.getSession(body.code);
      if (existing) {
        return NextResponse.json({
          success: true,
          code: existing.code,
          sessionId: existing.id,
          hostSecret: existing.hostSecret,
          session: existing,
        });
      }
    }

    const { session, hostSecret } = LiveSessionManager.createSession(body);

    return NextResponse.json({
      success: true,
      code: session.code,
      sessionId: session.id,
      hostSecret,
      session,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create live session" },
      { status: 500 }
    );
  }
}
