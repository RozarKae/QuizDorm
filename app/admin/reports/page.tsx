import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function AdminReportsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="Platform Reports" description="Generate system health audits, usage reports, and invoices." />
      <EmptyDashboard
        title="No Reports Generated"
        description="Select criteria and filters to query logs and export document records."
      />
    </DashboardContainer>
  );
}
