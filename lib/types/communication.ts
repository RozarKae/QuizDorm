export type ChannelType = "in_app" | "email" | "sms" | "whatsapp" | "web_push";

export type NotificationCategory =
  | "system"
  | "quiz"
  | "assignment"
  | "competition"
  | "certificate"
  | "payment"
  | "ai_alert"
  | "announcement";

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: NotificationCategory;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  priority: "normal" | "important" | "urgent";
  targetAudience: "all" | "teachers" | "students" | "organization" | "class";
  targetClassId?: string;
  createdAt: string;
  expiresAt?: string;
  pinned?: boolean;
}

export interface AutomationRule {
  id: string;
  name: string;
  eventTrigger:
    | "user_registered"
    | "quiz_assigned"
    | "quiz_submitted"
    | "certificate_issued"
    | "payment_completed"
    | "streak_alert";
  channels: ChannelType[];
  messageTemplate: string;
  enabled: boolean;
  executionsCount: number;
}

export interface CommunicationCampaign {
  id: string;
  title: string;
  channel: ChannelType;
  targetAudience: string;
  status: "draft" | "scheduled" | "active" | "completed";
  scheduledAt: string;
  totalRecipients: number;
  deliveredCount: number;
  openRatePercent: number;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string;
  recipientName: string;
  messageText: string;
  timestamp: string;
  read: boolean;
}

export interface UserCommunicationPreferences {
  userId: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  pushNotifications: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}
