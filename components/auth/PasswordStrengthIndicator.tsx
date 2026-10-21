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
        return "bg-rose-500";
      case 2:
        return "bg-amber-400";
      case 3:
        return "bg-[#38D9B0]";
      case 4:
        return "bg-[#65F59A]";
      default:
        return "bg-[#17251E]";
    }
  };

  const getLabelColor = (score: number) => {
    switch (score) {
      case 1:
        return "text-rose-400";
      case 2:
        return "text-amber-400";
      case 3:
        return "text-[#38D9B0]";
      case 4:
        return "text-[#65F59A]";
      default:
        return "text-[#A0AEA5]";
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
          <span className="text-[#A0AEA5] font-mono text-[11px]">Password Strength:</span>
          <span className={`font-mono text-[11px] font-bold ${getLabelColor(result.score)}`}>{result.label}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full bg-[#111B17] rounded-full overflow-hidden border border-[rgba(160,190,170,0.12)]">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-full transition-all duration-300 ${
                step <= result.score ? getBarColor(result.score) : "bg-[#17251E]"
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
