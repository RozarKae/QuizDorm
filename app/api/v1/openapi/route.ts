import { NextResponse } from "next/server";
import { OpenAPIGenerator } from "@/lib/developer/openapiGenerator";

export async function GET() {
  const spec = OpenAPIGenerator.generateSpec();
  return NextResponse.json(spec);
}
