import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-[4px] border border-transparent font-medium whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D]/50 focus-visible:border-[#FF4D6D] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF4D6D] hover:bg-[#FF3366] text-[#0B0708] font-semibold active:bg-[#FB7185] border-[#FF4D6D] shadow-[0_1px_10px_rgba(255, 77, 109,0.22)]",
        outline:
          "border border-[rgba(240, 160, 180,0.18)] bg-[#140C0E]/60 text-[#F2F7F3] hover:bg-[#2A141A] hover:border-[rgba(240, 160, 180,0.32)] active:bg-[#2A141A]/80",
        secondary:
          "border border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#F2F7F3] hover:bg-[#2A141A] hover:border-[rgba(240, 160, 180,0.28)] active:bg-[#2A141A]/90",
        ghost:
          "text-[#A0AEA5] hover:bg-[#2A141A] hover:text-[#F2F7F3] active:bg-[#2A141A]/80",
        destructive:
          "bg-[#F87171] hover:bg-[#EF4444] text-white font-semibold active:bg-[#DC2626] border-[#F87171]",
        mint:
          "bg-[#FF758F] hover:bg-[#E11D48] text-[#0B0708] font-bold active:bg-[#E11D48] border-[#FF758F] shadow-[0_1px_10px_rgba(255, 117, 143,0.22)]",
        lime:
          "bg-[#FF4D6D] hover:bg-[#FF3366] text-[#0B0708] font-bold active:bg-[#FB7185] border-[#FF4D6D]",
        link: "text-[#FF4D6D] underline-offset-4 hover:underline p-0 h-auto font-normal",
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
