import { DirectMessage } from "@/lib/types/communication";

const STORAGE_KEY_DIRECT_MESSAGES = "quizdorm_direct_messages";

export const DEFAULT_DIRECT_MESSAGES: DirectMessage[] = [
  {
    id: "msg-101",
    senderId: "std-101",
    senderName: "Alex Rivera",
    senderRole: "Student",
    recipientId: "usr-teacher-1",
    recipientName: "Dr. Eleanor Vance",
    messageText: "Hello Dr. Vance, I had a question regarding the Circulatory Anatomy question #4 in today's practice quiz.",
    timestamp: "2026-07-24T10:00:00Z",
    read: true,
  },
  {
    id: "msg-102",
    senderId: "usr-teacher-1",
    senderName: "Dr. Eleanor Vance",
    senderRole: "Teacher",
    recipientId: "std-101",
    recipientName: "Alex Rivera",
    messageText: "Hi Alex! Sure, that question uses interactive hotspot labeling. Make sure to check the left atrium diagram.",
    timestamp: "2026-07-24T10:05:00Z",
    read: true,
  },
];

export class DirectMessagingService {
  public static getMessages(recipientId?: string): DirectMessage[] {
    if (typeof window === "undefined") return DEFAULT_DIRECT_MESSAGES;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DIRECT_MESSAGES);
      return saved ? JSON.parse(saved) : DEFAULT_DIRECT_MESSAGES;
    } catch {
      return DEFAULT_DIRECT_MESSAGES;
    }
  }

  public static sendMessage(params: {
    senderId: string;
    senderName: string;
    senderRole: string;
    recipientId: string;
    recipientName: string;
    messageText: string;
  }): DirectMessage {
    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId: params.senderId,
      senderName: params.senderName,
      senderRole: params.senderRole,
      recipientId: params.recipientId,
      recipientName: params.recipientName,
      messageText: params.messageText,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const current = this.getMessages();
    const updated = [...current, newMsg];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_DIRECT_MESSAGES, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to send message", e);
      }
    }
    return newMsg;
  }
}
