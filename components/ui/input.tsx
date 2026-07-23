import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-[#6B7280] backdrop-blur-md transition-all duration-200 outline-none focus-visible:border-blue-500/60 focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    />
  );
}

export { Input };
