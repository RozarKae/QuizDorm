import { GlobalPartnership } from "@/lib/types/global-network";

export const DEFAULT_PARTNERSHIPS: GlobalPartnership[] = [
  { id: "part-101", partner1Name: "Kerala State IT & Assessment League", partner2Name: "Government Model Higher Secondary Schools (TN)", type: "academic_exchange", status: "active" },
  { id: "part-102", partner1Name: "Choice Education Network (Kochi)", partner2Name: "Sourashtra Educational Council (Madurai)", type: "joint_olympiad", status: "active" },
];

export class GlobalPartnershipEngine {
  public static getPartnerships(): GlobalPartnership[] {
    return DEFAULT_PARTNERSHIPS;
  }
}
