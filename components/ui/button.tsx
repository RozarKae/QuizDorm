import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-[16px] border border-transparent font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 shimmer-effect border-blue-400/20",
        outline:
          "border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.09] hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md shadow-none",
        secondary:
          "border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md",
        ghost:
          "text-slate-300 hover:bg-white/[0.06] hover:text-white backdrop-blur-sm",
        destructive:
          "bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/35 hover:-translate-y-0.5 active:translate-y-0",
        link: "text-blue-400 underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm gap-2",
        xs: "h-8 px-3 text-xs gap-1.5 rounded-[12px] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 px-4 text-xs gap-1.5 rounded-[14px] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-13 px-7 text-base gap-2.5 rounded-[18px]",
        icon: "size-11 rounded-[16px]",
        "icon-xs": "size-8 rounded-[12px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-[14px]",
        "icon-lg": "size-13 rounded-[18px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
