import { NextRequest, NextResponse } from "next/server";
import { LiveSessionManager } from "@/lib/live/liveSessionManager";
import { CreateSessionOptions } from "@/lib/live/types";

export async function POST(req: NextRequest) {
  try {
    const body: CreateSessionOptions = await req.json();

    // Idempotency / conflict check: if code is supplied and session exists, never leak host secret
    if (body.code) {
      const existing = LiveSessionManager.getSession(body.code);
      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: `Arena session with code ${body.code} already exists. Session host credentials cannot be re-issued.`,
            code: existing.code,
          },
          { status: 409 }
        );
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
