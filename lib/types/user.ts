export type UserRole = "admin" | "school" | "teacher" | "student";

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
