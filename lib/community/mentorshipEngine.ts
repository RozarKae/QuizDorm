import { MentorProfile } from "@/lib/types/community";

export const DEFAULT_MENTORS: MentorProfile[] = [
  {
    id: "men-101",
    name: "Dr. Eleanor Vance",
    title: "Professor of Theoretical Physics",
    organization: "Cambridge Science Institute",
    rating: 4.9,
    reviewsCount: 84,
    availableOfficeHours: "Tuesdays & Thursdays, 4:00 PM EST",
    totalMentees: 42,
  },
  {
    id: "men-102",
    name: "Prof. Arthur Pendelton",
    title: "Senior AI Researcher & Olympiad Coach",
    organization: "MIT Media Lab",
    rating: 5.0,
    reviewsCount: 110,
    availableOfficeHours: "Mondays & Wednesdays, 6:00 PM EST",
    totalMentees: 68,
  },
];

export class MentorshipEngine {
  public static getMentors(): MentorProfile[] {
    return DEFAULT_MENTORS;
  }
}
