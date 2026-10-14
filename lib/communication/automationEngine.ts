import { AutomationRule } from "@/lib/types/communication";

export const DEFAULT_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: "rule-101",
    name: "Automatic Digital Certificate Notification",
    eventTrigger: "certificate_issued",
    channels: ["in_app", "email", "whatsapp"],
    messageTemplate: "Congratulations {{student_name}}! Your official {{certificate_title}} has been issued and verified.",
    enabled: true,
    executionsCount: 342,
  },
  {
    id: "rule-102",
    name: "Spaced Repetition Revision Alert",
    eventTrigger: "streak_alert",
    channels: ["in_app", "web_push"],
    messageTemplate: "Time for your daily SM-2 revision session! You have {{due_count}} items due today.",
    enabled: true,
    executionsCount: 1250,
  },
  {
    id: "rule-103",
    name: "Payment Receipt & Invoice Delivery",
    eventTrigger: "payment_completed",
    channels: ["email", "in_app"],
    messageTemplate: "Thank you for your payment of {{amount}}. Your invoice {{invoice_number}} is attached.",
    enabled: true,
    executionsCount: 184,
  },
];

export class WorkflowAutomationEngine {
  public static getRules(): AutomationRule[] {
    return DEFAULT_AUTOMATION_RULES;
  }
}
