import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "flex h-9 w-full min-w-0 rounded-[4px] border border-[rgba(160,190,170,0.18)] bg-[#17251E] px-3 py-1.5 text-xs font-mono font-medium text-[#F2F7F3] placeholder:text-[#69786F] transition-all outline-none focus-visible:border-[#65F59A] focus-visible:ring-1 focus-visible:ring-[#65F59A] focus-visible:shadow-[0_0_8px_rgba(101,245,154,0.15)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
