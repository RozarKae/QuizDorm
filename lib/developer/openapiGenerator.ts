import { OpenAPISpec } from "@/lib/types/developer";

export class OpenAPIGenerator {
  public static generateSpec(): OpenAPISpec {
    return {
      openapi: "3.0.3",
      info: {
        title: "QuizDorm Open Developer Platform REST API",
        version: "v1.0.0",
        description:
          "Enterprise OpenAPI 3.0 specification for QuizDorm Question Bank, Quiz Engine, AI Router, Digital Certificate Verification, and Webhook Ecosystem.",
      },
      paths: {
        "/api/v1/questions": {
          get: {
            summary: "Search & Fetch Question Bank items",
            security: [{ ApiKeyAuth: [] }],
            parameters: [
              { name: "subject", in: "query", schema: { type: "string" } },
              { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
            ],
            responses: {
              "200": { description: "List of matching questions" },
              "401": { description: "Invalid or missing API key" },
            },
          },
          post: {
            summary: "Create a new question in Question Bank",
            security: [{ ApiKeyAuth: [] }],
            responses: {
              "201": { description: "Question created successfully" },
            },
          },
        },
        "/api/v1/quizzes": {
          get: {
            summary: "Fetch active quizzes & attempt results",
            security: [{ ApiKeyAuth: [] }],
            responses: { "200": { description: "Active quizzes payload" } },
          },
        },
        "/api/v1/certificates": {
          get: {
            summary: "Verify authenticity of a digital certificate",
            parameters: [{ name: "id", in: "query", required: true, schema: { type: "string" } }],
            responses: { "200": { description: "Verification payload" } },
          },
        },
      },
    };
  }
}
