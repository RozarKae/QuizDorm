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
          "flex h-9 w-full rounded-[3px] border border-[rgba(160,190,170,0.18)] bg-[#17251E] px-3 py-1.5 text-xs font-mono font-medium text-[#F2F7F3] outline-none transition-colors focus-visible:border-[#65F59A] focus-visible:ring-1 focus-visible:ring-[#65F59A] focus-visible:shadow-[0_0_8px_rgba(101,245,154,0.15)] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer",
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
