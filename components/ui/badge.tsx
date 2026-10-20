import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-[3px] border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-ring [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-[rgba(160,190,170,0.1)] text-[#F2F7F3] border-[rgba(160,190,170,0.22)]",
        secondary:
          "bg-[#111B17] text-[#A0AEA5] border-[rgba(160,190,170,0.14)]",
        outline:
          "border-[rgba(160,190,170,0.2)] text-[#A0AEA5] bg-transparent",
        emerald:
          "bg-[rgba(101,245,154,0.12)] text-[#65F59A] border-[rgba(101,245,154,0.30)]",
        mint:
          "bg-[rgba(56,217,176,0.12)] text-[#38D9B0] border-[rgba(56,217,176,0.30)]",
        cobalt:
          "bg-[rgba(101,245,154,0.15)] text-[#65F59A] border-[rgba(101,245,154,0.35)]",
        lime:
          "bg-[rgba(101,245,154,0.15)] text-[#65F59A] border-[rgba(101,245,154,0.35)]",
        coral:
          "bg-[rgba(248,113,113,0.12)] text-[#F87171] border-[rgba(248,113,113,0.30)]",
        destructive:
          "bg-[rgba(248,113,113,0.12)] text-[#F87171] border-[rgba(248,113,113,0.30)]",
        ghost:
          "border-transparent bg-transparent text-[#A0AEA5] hover:bg-[#17251E]",
        link:
          "text-[#65F59A] underline-offset-4 hover:underline border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
