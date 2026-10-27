import { LiveSessionManager } from "@/lib/live/liveSessionManager";
import { NextRequest,NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await context.params;
    const body = await req.json();

    const authHeader = req.headers.get("authorization");
    const bearerSecret = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
    const hostSecret = body.hostSecret || bearerSecret || "";

    const action = body.action;
    if (!action) {
      return NextResponse.json(
        { success: false, error: "Missing action parameter" },
        { status: 400 }
      );
    }

    const result = LiveSessionManager.executeHostAction(
      code,
      hostSecret,
      action,
      body.payload
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error?.startsWith("UNAUTHORIZED") ? 403 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      session: result.session,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to execute host action";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
