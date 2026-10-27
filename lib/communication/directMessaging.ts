import { DirectMessage } from "@/lib/types/communication";

const STORAGE_KEY_DIRECT_MESSAGES = "quizdorm_direct_messages";

export const DEFAULT_DIRECT_MESSAGES: DirectMessage[] = [
  {
    id: "msg-101",
    senderId: "std-101",
    senderName: "Karthik Rajendran",
    senderRole: "Student",
    recipientId: "usr-teacher-1",
    recipientName: "Dr. K. Saravanan",
    messageText: "Vanakkam Dr. Saravanan, I had a question regarding the Circulatory Anatomy question #4 in today's practice quiz.",
    timestamp: "2026-07-24T10:00:00Z",
    read: true,
  },
  {
    id: "msg-102",
    senderId: "usr-teacher-1",
    senderName: "Dr. K. Saravanan",
    senderRole: "Teacher",
    recipientId: "std-101",
    recipientName: "Karthik Rajendran",
    messageText: "Hello Karthik! Sure, that question uses interactive hotspot labeling. Make sure to check the left atrium diagram.",
    timestamp: "2026-07-24T10:05:00Z",
    read: true,
  },
];

export class DirectMessagingService {
  public static getMessages(recipientId?: string): DirectMessage[] {
    let messages = DEFAULT_DIRECT_MESSAGES;
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_DIRECT_MESSAGES);
        if (saved) messages = JSON.parse(saved);
      } catch {
        messages = DEFAULT_DIRECT_MESSAGES;
      }
    }
    return recipientId
      ? messages.filter((m) => m.recipientId === recipientId || m.senderId === recipientId)
      : messages;
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
