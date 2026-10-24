import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, options, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-9 w-full rounded-[3px] border border-[rgba(240, 160, 180,0.18)] bg-[#2A141A] px-3 py-1.5 text-xs font-mono font-medium text-[#F2F7F3] outline-none transition-colors focus-visible:border-[#FF4D6D] focus-visible:ring-1 focus-visible:ring-[#FF4D6D] focus-visible:shadow-[0_0_8px_rgba(255, 77, 109,0.15)] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                {opt.label}
              </option>
            ))
          : children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
