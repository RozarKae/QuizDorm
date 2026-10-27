import { WebhookEngine } from "@/lib/developer/webhookEngine";
import { NextResponse } from "next/server";

export async function GET() {
  const endpoints = WebhookEngine.getEndpoints();
  return NextResponse.json({ status: "success", endpoints });
}

export async function POST(request: Request) {
  try {
    const { event, payload } = await request.json();
    const logs = await WebhookEngine.triggerWebhook(event || "quiz.submitted", payload || { sample: true });
    return NextResponse.json({ status: "success", deliveredLogs: logs });
  } catch {
    return NextResponse.json({ error: "Invalid webhook trigger payload" }, { status: 400 });
  }
}
