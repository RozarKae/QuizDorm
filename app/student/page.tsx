"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import StudentGenZDashboardView from "@/components/dashboard/student/StudentGenZDashboardView";
import SubscriberDashboardView from "@/components/dashboard/subscriber/SubscriberDashboardView";

export default function StudentPage() {
  const { role } = useAuth();
  const isSubscriber = role === "subscriber";

  if (isSubscriber) {
    return <SubscriberDashboardView />;
  }

  return <StudentGenZDashboardView />;
}
