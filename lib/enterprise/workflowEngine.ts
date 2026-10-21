import { EnterpriseWorkflow } from "@/lib/types/enterprise";

export const DEFAULT_WORKFLOWS: EnterpriseWorkflow[] = [
  {
    id: "wf-101",
    title: "National Competition Gold Certificate Approval",
    triggerEvent: "certificate_approval",
    approvalSteps: [
      { role: "Teacher", approverName: "Dr. Eleanor Vance", approved: true, timestamp: "2026-07-24T08:30:00Z" },
      { role: "Department Head", approverName: "Prof. Arthur Pendelton", approved: true, timestamp: "2026-07-24T09:00:00Z" },
      { role: "Dean of Academics", approverName: "Dr. Marcus Sterling", approved: true, timestamp: "2026-07-24T09:15:00Z" },
    ],
    status: "approved",
    createdAt: "2026-07-24T08:00:00Z",
  },
  {
    id: "wf-102",
    title: "Enterprise Organization Billing Upgrade Approval",
    triggerEvent: "billing_upgrade",
    approvalSteps: [
      { role: "Organization Admin", approverName: "Dr. K. Saravanan", approved: true, timestamp: "2026-07-24T10:00:00Z" },
      { role: "Finance Director", approverName: "T. S. Soundararajan", approved: false },
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
