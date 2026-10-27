import { DashboardContainer,EmptyDashboard,PageHeader } from "@/components/dashboard/DashboardComponents";

export default function SchoolSettingsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="School Settings" description="Configure school metadata, subject catalog, and calendar details." />
      <EmptyDashboard
        title="Settings Locked"
        description="Configuration parameters will unlock upon starting a valid academic term."
      />
    </DashboardContainer>
  );
}
