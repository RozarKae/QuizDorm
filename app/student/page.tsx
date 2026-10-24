"use client";

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import SubscriberDashboardView from "@/components/dashboard/subscriber/SubscriberDashboardView";
import StudentGenZDashboardView from "@/components/dashboard/student/StudentGenZDashboardView";

export default function StudentPage() {
  const { role } = useAuth();
  const isSubscriber = role === "subscriber";

  if (isSubscriber) {
    return <SubscriberDashboardView />;
  }

  return <StudentGenZDashboardView />;
}
