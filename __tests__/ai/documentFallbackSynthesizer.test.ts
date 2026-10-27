import { DocumentFallbackSynthesizer } from "@/lib/ai/server/documentFallbackSynthesizer";
import { IQuestionIntelligenceProvider } from "@/lib/ai/server/IQuestionIntelligenceProvider";
import { QuestionIntelligenceService } from "@/lib/ai/services/questionIntelligenceService";
import assert from "node:assert";
import test from "node:test";

test("DocumentFallbackSynthesizer: synthesizes questions across all supported types from raw text", () => {
  const sampleText = `
    Photosynthesis is the fundamental biological process by which green plants synthesize carbohydrates from carbon dioxide and water using sunlight.
    Chlorophyll pigments embedded within the chloroplast thylakoid membranes absorb photon energy primarily in blue and red wavelengths.
    The light-dependent reactions generate ATP and NADPH through photophosphorylation in the stroma boundary.
    The Calvin cycle utilizes ribulose-1,5-bisphosphate carboxylase-oxygenase (RuBisCO) to catalyze carbon fixation into 3-phosphoglycerate.
    Atmospheric oxygen is evolved as a byproduct resulting from the photolysis of water molecules at the photosystem II reaction center.
  `;

  const result = DocumentFallbackSynthesizer.synthesizeFromExtractedText(sampleText, {
    fileName: "cellular_biology_ch4.pdf",
    subject: "Biology",
    topic: "Photosynthesis",
    questionCount: 7,
    questionTypes: [
      "mcq_single",
      "true_false",
      "fill_in_the_blank",
      "match_following",
      "error_spotting",
      "sequence_ordering",
      "assertion_reasoning",
    ],
  });

  assert.strictEqual(result.questions.length, 7);
  assert.strictEqual(result.detectedSubject, "Biology");
  assert.strictEqual(result.detectedTopic, "Photosynthesis");

  const types = result.questions.map((q) => q.question.type);
  assert.ok(types.includes("mcq_single"));
  assert.ok(types.includes("true_false"));
  assert.ok(types.includes("fill_in_the_blank"));
  assert.ok(types.includes("match_following"));
  assert.ok(types.includes("error_spotting"));
  assert.ok(types.includes("sequence_ordering"));
  assert.ok(types.includes("assertion_reasoning"));

  // Check validation passes for all generated questions
  for (const item of result.questions) {
    assert.strictEqual(item.validation.isValid, true);
    assert.ok(item.validation.qualityScore >= 70);
  }
});

test("QuestionIntelligenceService: gracefully engages DocumentFallbackSynthesizer when provider throws", async () => {
  // Mock failing provider
  const failingProvider: IQuestionIntelligenceProvider = {
    id: "failing-gemini-mock",
    name: "Failing Gemini Mock",
    generateQuestionRaw: async () => {
      throw new Error("Simulated GEMINI_API_KEY unconfigured or network outage");
    },
    generateQuestionsFromDocumentBuffer: async () => {
      throw new Error("[AI_CONFIGURATION_ERROR] GEMINI_API_KEY is not configured in the server environment.");
    },
    checkHealth: async () => ({
      configured: false,
      model: "mock",
    }),
  };

  const sampleBuffer = Buffer.from(
    "%PDF-1.4\n1 0 obj\n<< /Length 120 >>\nstream\nBT\n/F1 12 Tf\n(Raft is a distributed consensus algorithm designed for state machine replication.) Tj\nET\nendstream\nendobj\n%%EOF"
  );

  const result = await QuestionIntelligenceService.generateBatchFromDocumentBuffer(
    sampleBuffer,
    "application/pdf",
    {
      fileName: "raft_consensus.pdf",
      subject: "Computer Science",
      topic: "Distributed Systems",
      questionCount: 4,
    },
    {
      providerOverride: failingProvider,
    }
  );

  assert.strictEqual(result.success, true);
  assert.strictEqual(result.modelUsed, "document-text-synthesizer-fallback");
  assert.ok(result.warning?.includes("AI API key is unconfigured"));
  assert.ok(result.questions.length >= 1);
});
