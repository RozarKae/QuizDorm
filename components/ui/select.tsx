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
          "flex h-9 w-full rounded-[3px] border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground outline-none transition-colors focus-visible:border-[#2855F5] focus-visible:ring-1 focus-visible:ring-[#2855F5] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer",
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
