export type UserRole =
  | "admin"
  | "institution"
  | "handler"
  | "member"
  | "subscriber"
  // Legacy aliases for backward compatibility
  | "school"
  | "teacher"
  | "student";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PasswordValidationResult {
  score: number; // 0 to 4
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  label: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";
}

/**
 * Normalizes any legacy or canonical role name to its human-readable display label
 */
export function getRoleDisplayName(role: UserRole | string | undefined | null): string {
  switch (role) {
    case "admin":
      return "Platform Admin";
    case "institution":
    case "school":
      return "Institution";
    case "handler":
    case "teacher":
      return "Handler";
    case "member":
    case "student":
      return "Member";
    case "subscriber":
      return "Subscriber";
    default:
      return "Subscriber";
  }
}

/**
 * Maps legacy role tokens to their modern canonical system roles
 */
export function normalizeCanonicalRole(role: string | undefined | null): "admin" | "institution" | "handler" | "member" | "subscriber" {
  switch (role) {
    case "admin":
      return "admin";
    case "institution":
    case "school":
      return "institution";
    case "handler":
    case "teacher":
      return "handler";
    case "member":
    case "student":
      return "member";
    case "subscriber":
    default:
      return "subscriber";
  }
}
