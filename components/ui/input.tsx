import { cn } from "@/lib/utils";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "flex h-9 w-full min-w-0 rounded-[4px] border border-[rgba(240, 160, 180,0.18)] bg-[#2A141A] px-3 py-1.5 text-xs font-mono font-medium text-[#F2F7F3] placeholder:text-[#69786F] transition-all outline-none focus-visible:border-[#FF4D6D] focus-visible:ring-1 focus-visible:ring-[#FF4D6D] focus-visible:shadow-[0_0_8px_rgba(255, 77, 109,0.15)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
