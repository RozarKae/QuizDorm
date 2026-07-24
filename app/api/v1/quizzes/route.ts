import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    version: "v1.0",
    quizzes: [
      {
        id: "qz-api-1",
        title: "Grade 12 Calculus & Derivatives Final Exam",
        subject: "Mathematics",
        questionCount: 25,
        timeLimitMinutes: 45,
        activeParticipants: 42,
      },
    ],
  });
}
