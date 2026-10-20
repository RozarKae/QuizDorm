import React from "react";
import { Check, X } from "lucide-react";
import { PasswordValidationResult } from "@/lib/types/user";

interface PasswordStrengthIndicatorProps {
  password?: string;
  className?: string;
}

export function evaluatePasswordStrength(password: string = ""): PasswordValidationResult {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const criteria = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar];
  const passedCount = criteria.filter(Boolean).length;

  let score = 0;
  let label: PasswordValidationResult["label"] = "Very Weak";

  if (password.length === 0) {
    score = 0;
    label = "Very Weak";
  } else if (passedCount <= 2) {
    score = 1;
    label = "Weak";
  } else if (passedCount === 3) {
    score = 2;
    label = "Medium";
  } else if (passedCount === 4) {
    score = 3;
    label = "Strong";
  } else {
    score = 4;
    label = "Very Strong";
  }

  return {
    score,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    label,
  };
}

export default function PasswordStrengthIndicator({ password = "", className = "" }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const result = evaluatePasswordStrength(password);

  const getBarColor = (score: number) => {
    switch (score) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-amber-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-emerald-500";
      default:
        return "bg-gray-200 dark:bg-gray-800";
    }
  };

  const getLabelColor = (score: number) => {
    switch (score) {
      case 1:
        return "text-red-600 dark:text-red-400";
      case 2:
        return "text-amber-600 dark:text-amber-400";
      case 3:
        return "text-blue-600 dark:text-blue-400";
      case 4:
        return "text-emerald-600 dark:text-emerald-400";
      default:
        return "text-gray-400";
    }
  };

  const criteriaList = [
    { label: "At least 8 characters", valid: result.hasMinLength },
    { label: "Uppercase letter (A-Z)", valid: result.hasUppercase },
    { label: "Lowercase letter (a-z)", valid: result.hasLowercase },
    { label: "Number (0-9)", valid: result.hasNumber },
    { label: "Special character (!@#$)", valid: result.hasSpecialChar },
  ];

  return (
    <div className={`space-y-3 pt-1 ${className}`}>
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-zinc-400">Password Strength:</span>
          <span className={getLabelColor(result.score)}>{result.label}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full bg-[#1E232F] rounded-full overflow-hidden">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-full transition-all duration-300 ${
                step <= result.score ? getBarColor(result.score) : "bg-[#262B37]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
        {criteriaList.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center space-x-1.5 font-medium ${
              item.valid
                ? "text-emerald-400"
                : "text-zinc-400"
            }`}
          >
            {item.valid ? (
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
            ) : (
              <X className="w-3 h-3 text-zinc-600 shrink-0" />
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
