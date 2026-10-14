import { GlobalCompetition } from "@/lib/types/competition";

export const DEFAULT_OLYMPIADS: GlobalCompetition[] = [
  {
    id: "olym-101",
    title: "International Mathematics & Physics Olympiad 2026",
    format: "single_elimination",
    tier: "international_olympiad",
    scope: "international",
    startDate: "2026-08-01T00:00:00Z",
    endDate: "2026-08-05T00:00:00Z",
    participantsCount: 14200,
    prizePool: "$50,000 Global Scholarship",
    status: "upcoming",
  },
  {
    id: "olym-102",
    title: "National Science & AI Knowledge Championship",
    format: "swiss",
    tier: "national_olympiad",
    scope: "national",
    startDate: "2026-07-24T09:00:00Z",
    endDate: "2026-07-25T18:00:00Z",
    participantsCount: 4500,
    prizePool: "$15,000 Academic Grants",
    status: "live",
  },
];

export class OlympiadManager {
  public static getOlympiads(): GlobalCompetition[] {
    return DEFAULT_OLYMPIADS;
  }
}
