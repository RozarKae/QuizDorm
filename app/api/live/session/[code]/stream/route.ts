import { NextRequest } from "next/server";
import {
  LiveSessionManager,
  toPublicSessionState,
  subscribeToSession,
} from "@/lib/live/liveSessionManager";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const session = LiveSessionManager.getSession(code);

  if (!session) {
    return new Response("Session not found", { status: 404 });
  }

  const encoder = new TextEncoder();
  let unsubscribe: (() => void) | null = null;
  let heartbeatInterval: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial public state immediately
      const initialPublic = toPublicSessionState(session);
      controller.enqueue(
        encoder.encode(`event: session_update\ndata: ${JSON.stringify(initialPublic)}\n\n`)
      );

      // Subscribe to session events
      unsubscribe = subscribeToSession(code, () => {
        const currentSession = LiveSessionManager.getSession(code);
        if (currentSession) {
          const publicState = toPublicSessionState(currentSession);
          try {
            controller.enqueue(
              encoder.encode(`event: session_update\ndata: ${JSON.stringify(publicState)}\n\n`)
            );
          } catch {
            // Stream closed
          }
        }
      });

      // Heartbeat comment every 15 seconds to prevent browser/proxy timeouts
      heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch {
          if (heartbeatInterval) clearInterval(heartbeatInterval);
        }
      }, 15000);
    },
    cancel() {
      if (unsubscribe) unsubscribe();
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
