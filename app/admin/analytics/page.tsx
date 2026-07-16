import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function AdminAnalyticsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="Platform Analytics" description="Detailed platform charts, system metrics, and usage analytics." />
      <EmptyDashboard
        title="No Analytics Data Available"
        description="We are gathering platform diagnostics. Check back shortly to view interactive data visualizations."
      />
    </DashboardContainer>
  );
}
