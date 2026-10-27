import { VerificationService } from "@/lib/credentials/verificationService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verId = searchParams.get("id") || "VER-2026-8A4F29";

  const result = VerificationService.verifyCertificate(verId);
  return NextResponse.json(result);
}
