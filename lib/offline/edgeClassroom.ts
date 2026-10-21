import { EdgeClassroomSession } from "@/lib/types/offline";

export const DEFAULT_EDGE_SESSIONS: EdgeClassroomSession[] = [
  {
    id: "edge-7741",
    sessionPin: "4829",
    teacherName: "Dr. Eleanor Vance",
    subject: "Grade 12 Advanced Physics (LAN Mode)",
    activeStudentsCount: 28,
    status: "active",
    createdAt: "2026-07-24T10:00:00Z",
    leaderboard: [
      { rank: 1, studentName: "Karthik Rajendran", score: 980, timeSeconds: 142 },
      { rank: 2, studentName: "Kevin Fernandez", score: 940, timeSeconds: 155 },
      { rank: 3, studentName: "Anandhi K. Bapu", score: 910, timeSeconds: 168 },
    ],
  },
];

export class EdgeClassroomService {
  public static getSessions(): EdgeClassroomSession[] {
    return DEFAULT_EDGE_SESSIONS;
  }

  public static createSession(subject: string, teacherName: string): EdgeClassroomSession {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const newSession: EdgeClassroomSession = {
      id: `edge-${Date.now()}`,
      sessionPin: pin,
      teacherName,
      subject,
      activeStudentsCount: 1,
      status: "active",
      createdAt: new Date().toISOString(),
      leaderboard: [],
    };
    return newSession;
  }
}
