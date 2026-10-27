import { DashboardContainer,EmptyDashboard,PageHeader } from "@/components/dashboard/DashboardComponents";

export default function SchoolProfilePage() {
  return (
    <DashboardContainer>
      <PageHeader title="School Profile" description="Manage school administrator credentials and contact details." />
      <EmptyDashboard
        title="Admin Information"
        description="Verify security settings, set two-factor authentication, or update avatar details."
      />
    </DashboardContainer>
  );
}
