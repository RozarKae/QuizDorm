import { InAppNotification, NotificationCategory } from "@/lib/types/communication";

const STORAGE_KEY_NOTIFICATIONS = "quizdorm_inapp_notifications";

export const DEFAULT_NOTIFICATIONS: InAppNotification[] = [
  {
    id: "notif-101",
    userId: "usr-teacher-1",
    title: "Digital Certificate Issued",
    message: "Mastery Certification in Algebra & Calculus was successfully generated for Karthik Rajendran.",
    category: "certificate",
    read: false,
    timestamp: "2026-07-24T10:15:00Z",
    actionUrl: "/dashboard/credentials",
    priority: "high",
  },
  {
    id: "notif-102",
    userId: "usr-teacher-1",
    title: "AI Quality Audit Completed",
    message: "25 newly generated physics questions passed Quality & Bias Audit with a 94/100 score.",
    category: "ai_alert",
    read: false,
    timestamp: "2026-07-24T09:30:00Z",
    actionUrl: "/dashboard/quality",
    priority: "medium",
  },
  {
    id: "notif-103",
    userId: "usr-teacher-1",
    title: "Payment Received & Subscription Renewed",
    message: "Invoice INV-2026-884920 of $29.00 was successfully processed via Razorpay.",
    category: "payment",
    read: true,
    timestamp: "2026-07-24T08:00:00Z",
    actionUrl: "/dashboard/billing",
    priority: "low",
  },
];

export class InAppNotificationService {
  public static getNotifications(): InAppNotification[] {
    if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  }

  public static markAsRead(id: string): InAppNotification[] {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update notification state", e);
      }
    }
    return updated;
  }

  public static addNotification(params: {
    userId: string;
    title: string;
    message: string;
    category: NotificationCategory;
    actionUrl?: string;
    priority?: "low" | "medium" | "high";
  }): InAppNotification {
    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      userId: params.userId,
      title: params.title,
      message: params.message,
      category: params.category,
      read: false,
      timestamp: new Date().toISOString(),
      actionUrl: params.actionUrl,
      priority: params.priority || "medium",
    };

    const current = this.getNotifications();
    const updated = [newNotif, ...current];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to add notification", e);
      }
    }
    return newNotif;
  }
}
