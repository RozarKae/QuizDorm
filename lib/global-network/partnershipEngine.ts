import { GlobalPartnership } from "@/lib/types/global-network";

export const DEFAULT_PARTNERSHIPS: GlobalPartnership[] = [
  { id: "part-101", partner1Name: "Cambridge International", partner2Name: "Oakridge Schools", type: "academic_exchange", status: "active" },
  { id: "part-102", partner1Name: "MIT Media Lab", partner2Name: "Singapore Science Council", type: "joint_olympiad", status: "active" },
];

export class GlobalPartnershipEngine {
  public static getPartnerships(): GlobalPartnership[] {
    return DEFAULT_PARTNERSHIPS;
  }
}
