import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-[3px] border border-transparent font-medium whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#2855F5]/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-[#2855F5] hover:bg-[#1E44D6] text-white font-semibold active:bg-[#1534AA] border-[#2855F5]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/40 active:bg-foreground/10",
        secondary:
          "border border-border bg-muted text-foreground hover:bg-muted/80 hover:border-foreground/30 active:bg-muted/60",
        ghost:
          "text-foreground/80 hover:bg-foreground/5 hover:text-foreground active:bg-foreground/10",
        destructive:
          "bg-[#E85D3F] hover:bg-[#D04B2E] text-white font-semibold active:bg-[#B33B22] border-[#E85D3F]",
        lime:
          "bg-[#DFFF43] hover:bg-[#CEEF2A] text-[#111318] font-bold active:bg-[#BBDD18] border-[#DFFF43]",
        link: "text-[#2855F5] underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-10 px-4 py-2 text-xs uppercase tracking-wider font-semibold gap-2",
        xs: "h-7 px-2.5 text-[11px] uppercase tracking-wider font-semibold gap-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3 text-xs uppercase tracking-wider font-semibold gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 px-6 text-sm uppercase tracking-wider font-bold gap-2.5",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
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
