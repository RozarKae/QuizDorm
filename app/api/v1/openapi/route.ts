import { OpenAPIGenerator } from "@/lib/developer/openapiGenerator";
import { NextResponse } from "next/server";

export async function GET() {
  const spec = OpenAPIGenerator.generateSpec();
  return NextResponse.json(spec);
}
