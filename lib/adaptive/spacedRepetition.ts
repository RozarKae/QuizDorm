import { SpacedRevisionItem } from "@/lib/types/adaptive";

const STORAGE_KEY_REVISION_QUEUE = "quizdorm_spaced_revision_queue";

export const DEFAULT_REVISION_ITEMS: SpacedRevisionItem[] = [
  {
    id: "rev-1",
    questionId: "q-102",
    questionTitle: "Human Body Circulatory System & Pumping Organ",
    subject: "Biology",
    topic: "Circulatory Anatomy",
    dueTimestamp: new Date().toISOString(), // due today
    intervalDays: 1,
    easeFactor: 2.5,
    repetitionsCount: 1,
    status: "due",
  },
  {
    id: "rev-2",
    questionId: "q-103",
    questionTitle: "Cellular Respiration ATP Yield Breakdown",
    subject: "Biology",
    topic: "Cellular Respiration",
    dueTimestamp: new Date(Date.now() - 86400000).toISOString(), // overdue
    intervalDays: 3,
    easeFactor: 2.3,
    repetitionsCount: 2,
    status: "due",
  },
  {
    id: "rev-3",
    questionId: "q-101",
    questionTitle: "Derivative of polynomial terms using power rule",
    subject: "Mathematics",
    topic: "Algebra & Calculus",
    dueTimestamp: new Date(Date.now() + 172800000).toISOString(), // due in 2 days
    intervalDays: 6,
    easeFactor: 2.6,
    repetitionsCount: 3,
    status: "upcoming",
  },
];

export class SpacedRepetitionEngine {
  /**
   * Get all revision items from localStorage
   */
  public static getRevisionQueue(): SpacedRevisionItem[] {
    if (typeof window === "undefined") return DEFAULT_REVISION_ITEMS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REVISION_QUEUE);
      return saved ? JSON.parse(saved) : DEFAULT_REVISION_ITEMS;
    } catch {
      return DEFAULT_REVISION_ITEMS;
    }
  }

  /**
   * Apply SM-2 Spaced Repetition calculation after reviewing an item
   * qualityRating: 0 (blackout) to 5 (perfect recall)
   */
  public static reviewItem(itemId: string, qualityRating: number): SpacedRevisionItem[] {
    const queue = this.getRevisionQueue();
    const updatedQueue = queue.map((item) => {
      if (item.id !== itemId) return item;

      let { intervalDays, repetitionsCount, easeFactor } = item;

      if (qualityRating >= 3) {
        if (repetitionsCount === 0) intervalDays = 1;
        else if (repetitionsCount === 1) intervalDays = 6;
        else intervalDays = Math.round(intervalDays * easeFactor);

        repetitionsCount += 1;
      } else {
        repetitionsCount = 0;
        intervalDays = 1;
      }

      // Update Ease Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
      easeFactor = easeFactor + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));
      if (easeFactor < 1.3) easeFactor = 1.3;

      const nextDueDate = new Date(Date.now() + intervalDays * 86400000).toISOString();

      return {
        ...item,
        intervalDays,
        repetitionsCount,
        easeFactor: Number(easeFactor.toFixed(2)),
        dueTimestamp: nextDueDate,
        status: "upcoming" as const,
        lastReviewedAt: new Date().toISOString(),
      };
    });

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_REVISION_QUEUE, JSON.stringify(updatedQueue));
      } catch (e) {
        console.error("Failed to save revision queue", e);
      }
    }

    return updatedQueue;
  }
}
