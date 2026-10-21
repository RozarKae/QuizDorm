import { EnterpriseWorkflow } from "@/lib/types/enterprise";

export const DEFAULT_WORKFLOWS: EnterpriseWorkflow[] = [
  {
    id: "wf-101",
    title: "Tamil Nadu & Kerala Inter-District Olympiad Gold Certificate Authorization",
    triggerEvent: "certificate_approval",
    approvalSteps: [
      { role: "Teacher & P.G. Assistant", approverName: "Dr. Harikrishnan Nair", approved: true, timestamp: "2026-07-24T08:30:00Z" },
      { role: "Department Head", approverName: "Prof. Meenakshi Sundaram", approved: true, timestamp: "2026-07-24T09:00:00Z" },
      { role: "Founder & Dean of Academics", approverName: "RK Akbar", approved: true, timestamp: "2026-07-24T09:15:00Z" },
    ],
    status: "approved",
    createdAt: "2026-07-24T08:00:00Z",
  },
  {
    id: "wf-102",
    title: "Regional Academic Institutional Tier Upgrade Authorization",
    triggerEvent: "billing_upgrade",
    approvalSteps: [
      { role: "Headmaster & Organization Admin", approverName: "Dr. K. Saravanan", approved: true, timestamp: "2026-07-24T10:00:00Z" },
      { role: "Financial Controller", approverName: "T. S. Soundararajan", approved: false },
    ],
    status: "pending",
    createdAt: "2026-07-24T10:00:00Z",
  },
];

export class EnterpriseWorkflowEngine {
  public static getWorkflows(): EnterpriseWorkflow[] {
    return DEFAULT_WORKFLOWS;
  }
}
