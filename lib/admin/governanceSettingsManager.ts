import { UserRole } from "@/lib/types/user";

export interface GovernanceSettings {
  institutionQuestionBankAdding: boolean; // Admin can toggle whether institutions can add questions
  allowPublicCompetitions: boolean;
  maintenanceMode: boolean;
  lastUpdatedBy?: string;
  updatedAt: string;
}

const STORAGE_KEY_GOVERNANCE = "quizdorm_governance_settings_v1";

const DEFAULT_GOVERNANCE: GovernanceSettings = {
  institutionQuestionBankAdding: true, // Enabled by default, can be disabled by admin
  allowPublicCompetitions: true,
  maintenanceMode: false,
  lastUpdatedBy: "Master Superadmin",
  updatedAt: "2026-10-23T12:00:00Z",
};

export class GovernanceSettingsManager {
  public static getSettings(): GovernanceSettings {
    if (typeof window === "undefined") return DEFAULT_GOVERNANCE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GOVERNANCE);
      if (!saved) {
        localStorage.setItem(STORAGE_KEY_GOVERNANCE, JSON.stringify(DEFAULT_GOVERNANCE));
        return DEFAULT_GOVERNANCE;
      }
      return JSON.parse(saved);
    } catch {
      return DEFAULT_GOVERNANCE;
    }
  }

  public static saveSettings(settings: GovernanceSettings): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_GOVERNANCE, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to persist governance settings:", e);
    }
  }

  /**
   * Toggle or set whether institutions are allowed to add/import questions to the Question Bank
   */
  public static setInstitutionQuestionAdding(allowed: boolean): GovernanceSettings {
    const current = this.getSettings();
    const updated: GovernanceSettings = {
      ...current,
      institutionQuestionBankAdding: allowed,
      updatedAt: new Date().toISOString(),
    };
    this.saveSettings(updated);
    return updated;
  }

  /**
   * Ground Rule: Question Bank adding features disabled except admin and institution.
   * That too can be disabled for institution by admin.
   */
  public static canAddQuestions(role: UserRole | string | undefined | null): {
    allowed: boolean;
    reason?: string;
  } {
    if (!role) return { allowed: false, reason: "Authentication required" };

    // 1. Superadmin can always add questions
    if (role === "admin" || role === "superadmin" || role === "masteradmin") {
      return { allowed: true };
    }

    // 2. Institutions can add questions UNLESS disabled by admin
    if (role === "institution" || role === "school") {
      const settings = this.getSettings();
      if (!settings.institutionQuestionBankAdding) {
        return {
          allowed: false,
          reason: "Question Bank addition for institutions has been paused by the Platform Administrator.",
        };
      }
      return { allowed: true };
    }

    // 3. Students/Members, Handlers, and Subscribers are strictly disabled
    if (role === "member" || role === "student") {
      return {
        allowed: false,
        reason: "Students and Members cannot author Question Bank items. Practice available in quizzes.",
      };
    }

    if (role === "subscriber") {
      return {
        allowed: false,
        reason: "Question Bank authoring requires an authorized Institution or Administrator license.",
      };
    }

    if (role === "handler" || role === "teacher") {
      return {
        allowed: false,
        reason: "Question Bank creation is reserved for verified Institutions and Superadmins. Contact your Campus Administrator.",
      };
    }

    return { allowed: false, reason: "Unauthorized role for Question Bank item authoring." };
  }

  /**
   * Ground Rule: Students/Members cannot host arena. Subscribers cannot host arena.
   * Only Handlers, Institutions, and Superadmins can host.
   */
  public static canHostArena(role: UserRole | string | undefined | null): {
    allowed: boolean;
    reason?: string;
  } {
    if (!role) return { allowed: false, reason: "Authentication required" };

    if (
      role === "superadmin" ||
      role === "masteradmin" ||
      role === "admin" ||
      role === "institution" ||
      role === "school" ||
      role === "handler" ||
      role === "teacher"
    ) {
      return { allowed: true };
    }

    if (role === "member" || role === "student") {
      return {
        allowed: false,
        reason: "Students and Members cannot host live arenas. You can join active arenas using a Room PIN or invite link.",
      };
    }

    if (role === "subscriber") {
      return {
        allowed: false,
        reason: "Subscriber tier cannot host live arenas. Upgrade to Handler or Institution to host tournaments.",
      };
    }

    return { allowed: false, reason: "Only Handlers, Institutions, and Admins can host arena sessions." };
  }

  /**
   * Ground Rule: Subscriber Dashboard features lock verification
   */
  public static isSubscriberFeatureLocked(featureKey: string): boolean {
    const lockedFeatures = [
      "assignments", // Assigned Quizzes & Homework
      "announcements", // Classroom Notices
      "calendar", // Academic Agenda Calendar
      "tutor", // AI Study Coach
      "planner", // Personalized Study Planner
      "revision", // Spaced Repetition Engine
      "question_bank", // Question Authoring
      "host_arena", // Host Competitions
    ];
    return lockedFeatures.includes(featureKey);
  }
}
