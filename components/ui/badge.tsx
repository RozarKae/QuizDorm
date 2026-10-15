import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-[2px] border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-ring [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background border-foreground",
        secondary:
          "bg-muted text-foreground border-border",
        outline:
          "border-border text-foreground bg-transparent",
        cobalt:
          "bg-[#2855F5] text-white border-[#2855F5]",
        lime:
          "bg-[#DFFF43] text-[#111318] border-[#DFFF43]",
        coral:
          "bg-[#E85D3F] text-white border-[#E85D3F]",
        destructive:
          "bg-[#E85D3F]/10 text-[#E85D3F] border-[#E85D3F]/30 dark:bg-[#E85D3F]/20 dark:border-[#E85D3F]/40",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-muted",
        link:
          "text-[#2855F5] underline-offset-4 hover:underline border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

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
  })
}

export { Badge, badgeVariants }
