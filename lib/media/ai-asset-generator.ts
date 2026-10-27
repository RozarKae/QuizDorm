import { MediaAsset,MediaType } from "@/lib/types/media";

export class AIAssetGeneratorService {
  /**
   * Automatically generate accessible Alt Text for media assets
   */
  public static async generateAltText(fileName: string, type: MediaType): Promise<string> {
    await new Promise((r) => setTimeout(r, 300));
    const cleanName = fileName.replace(/[-_.]/g, " ").replace(/\b(png|jpg|mp3|mp4|pdf|webp)\b/gi, "").trim();

    if (type === "image") {
      return `Educational illustration showing ${cleanName} with labeled components for classroom assessment.`;
    } else if (type === "audio") {
      return `Clear audio narration passage discussing ${cleanName} for listening comprehension.`;
    } else if (type === "video") {
      return `Demonstration video showcasing ${cleanName} with step-by-step visual explanations.`;
    } else if (type === "diagram") {
      return `Scientific schematic diagram outlining key elements of ${cleanName}.`;
    }

    return `Educational asset depicting ${cleanName}`;
  }

  /**
   * Recommend educational stock assets for a given subject & topic
   */
  public static async suggestEducationalAssets(subject: string, topic: string): Promise<MediaAsset[]> {
    await new Promise((r) => setTimeout(r, 400));

    return [
      {
        id: `ai-rec-1-${Date.now()}`,
        name: `${topic.toLowerCase()}_concept_illustration.png`,
        url: "/images/placeholders/concept-illustration.png",
        type: "image",
        mimeType: "image/png",
        sizeBytes: 1200000,
        uploadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        altText: `AI recommended stock illustration for ${subject} (${topic})`,
        tags: [subject.toLowerCase(), topic.toLowerCase(), "ai-recommended"],
        isFavorite: false,
        isAiGenerated: true,
        usageCount: 0,
      },
      {
        id: `ai-rec-2-${Date.now()}`,
        name: `${topic.toLowerCase()}_audio_explanation.mp3`,
        url: "/audio/placeholders/explanation.mp3",
        type: "audio",
        mimeType: "audio/mpeg",
        sizeBytes: 2500000,
        uploadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        altText: `AI recommended audio explanation for ${topic}`,
        tags: [subject.toLowerCase(), "audio"],
        isFavorite: false,
        isAiGenerated: true,
        usageCount: 0,
      },
    ];
  }
}
