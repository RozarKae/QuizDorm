import { DashboardContainer,EmptyDashboard,PageHeader } from "@/components/dashboard/DashboardComponents";

export default function AdminSettingsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="Platform Settings" description="Configure global system preferences, limits, and authentication." />
      <EmptyDashboard
        title="Settings Locked"
        description="Configuration parameters can be modified after establishing primary tenant configurations."
      />
    </DashboardContainer>
  );
}
