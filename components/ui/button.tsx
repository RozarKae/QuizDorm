import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-[4px] border border-transparent font-medium whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#65F59A]/50 focus-visible:border-[#65F59A] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-semibold active:bg-[#43CA75] border-[#65F59A] shadow-[0_1px_10px_rgba(101,245,154,0.22)]",
        outline:
          "border border-[rgba(160,190,170,0.18)] bg-[#0C1210]/60 text-[#F2F7F3] hover:bg-[#17251E] hover:border-[rgba(160,190,170,0.32)] active:bg-[#17251E]/80",
        secondary:
          "border border-[rgba(160,190,170,0.14)] bg-[#111B17] text-[#F2F7F3] hover:bg-[#17251E] hover:border-[rgba(160,190,170,0.28)] active:bg-[#17251E]/90",
        ghost:
          "text-[#A0AEA5] hover:bg-[#17251E] hover:text-[#F2F7F3] active:bg-[#17251E]/80",
        destructive:
          "bg-[#F87171] hover:bg-[#EF4444] text-white font-semibold active:bg-[#DC2626] border-[#F87171]",
        mint:
          "bg-[#38D9B0] hover:bg-[#2EC49E] text-[#070B0A] font-bold active:bg-[#24AA88] border-[#38D9B0] shadow-[0_1px_10px_rgba(56,217,176,0.22)]",
        lime:
          "bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-bold active:bg-[#43CA75] border-[#65F59A]",
        link: "text-[#65F59A] underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-9 px-4 py-2 text-xs uppercase tracking-wider font-semibold gap-2",
        xs: "h-7 px-2.5 text-[11px] uppercase tracking-wider font-semibold gap-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3 text-xs uppercase tracking-wider font-semibold gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 px-6 text-sm uppercase tracking-wider font-bold gap-2.5",
        icon: "size-9",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
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
