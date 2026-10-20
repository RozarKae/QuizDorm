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
          "flex h-9 w-full min-w-0 rounded-[3px] border border-[#2A303F] bg-[#161922] px-3 py-1.5 text-xs font-mono font-medium text-white placeholder:text-zinc-500 transition-colors outline-none focus-visible:border-[#3864F8] focus-visible:ring-1 focus-visible:ring-[#3864F8] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
