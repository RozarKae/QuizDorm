import { AIFlashcard,SubjectTutor } from "@/lib/types/tutor";

export const DEFAULT_FLASHCARDS: AIFlashcard[] = [
  { id: "fc-1", subject: "mathematics", frontText: "What is the Power Rule for Derivatives?", backText: "The derivative of x^n with respect to x is n * x^(n-1).", formula: "d/dx(x^n) = n·x^(n-1)", intervalDays: 3, masteryLevel: 4 },
  { id: "fc-2", subject: "physics", frontText: "State Newton's Second Law of Motion", backText: "Force equals mass times acceleration.", formula: "F = m · a", intervalDays: 5, masteryLevel: 5 },
  { id: "fc-3", subject: "biology", frontText: "What is the main function of Mitochondria?", backText: "Produces ATP energy through cellular respiration.", intervalDays: 2, masteryLevel: 3 },
];

export class AIFlashcardGenerator {
  public static getCards(subject?: SubjectTutor): AIFlashcard[] {
    return subject ? DEFAULT_FLASHCARDS.filter((c) => c.subject === subject) : DEFAULT_FLASHCARDS;
  }
}
