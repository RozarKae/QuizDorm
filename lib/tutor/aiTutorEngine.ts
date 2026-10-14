import { ChatMessage, SubjectTutor, ExplanationLevel } from "@/lib/types/tutor";

export const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "ai_tutor",
    text: "Hello Alex! I am your 1-on-1 AI Physics & Calculus Tutor. Ask me any question or paste a problem step, and I'll explain it clearly!",
    timestamp: "10:00 AM",
    subject: "physics",
    explanationLevel: "step_by_step",
  },
];

export class AITutorEngine {
  public static async generateResponse(userText: string, subject: SubjectTutor, level: ExplanationLevel): Promise<ChatMessage> {
    await new Promise((r) => setTimeout(r, 600)); // Simulated streaming latency

    let aiText = "";
    if (level === "analogy") {
      aiText = `Think of ${userText} like a water pipe flow! In ${subject.toUpperCase()}, energy flows continuously through potential differences until equilibrium is reached.`;
    } else if (level === "simplified") {
      aiText = `In simple terms: ${userText} means that every force creates an equal and opposite reaction in the system.`;
    } else {
      aiText = `Step 1: Identify given variables for ${userText}.\nStep 2: Apply the core ${subject.toUpperCase()} differential equation.\nStep 3: Integrate with boundary conditions to obtain the exact solution.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: "ai_tutor",
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject,
      explanationLevel: level,
    };
  }
}
