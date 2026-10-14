import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function StudentSettingsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="Student Settings" description="Configure notifications, display theme, and practice rules." />
      <EmptyDashboard
        title="Settings Locked"
        description="Configuration parameters will unlock once a classroom is configured."
      />
    </DashboardContainer>
  );
}
