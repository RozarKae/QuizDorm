import { AttendanceRecord } from "@/lib/types/parent";

export const DEFAULT_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { id: "att-1", studentId: "std-101", date: "2026-07-24", status: "present", checkInTime: "08:14 AM" },
  { id: "att-2", studentId: "std-101", date: "2026-07-23", status: "present", checkInTime: "08:10 AM" },
  { id: "att-3", studentId: "std-101", date: "2026-07-22", status: "late", checkInTime: "08:35 AM", notes: "School bus delay" },
  { id: "att-4", studentId: "std-101", date: "2026-07-21", status: "present", checkInTime: "08:12 AM" },
  { id: "att-5", studentId: "std-101", date: "2026-07-20", status: "present", checkInTime: "08:08 AM" },
];

export class AttendanceService {
  public static getAttendance(studentId: string): AttendanceRecord[] {
    return DEFAULT_ATTENDANCE_RECORDS.filter((a) => a.studentId === studentId);
  }
}
