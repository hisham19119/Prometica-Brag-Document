import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-[hsl(var(--destructive))]/20 dark:aria-invalid:ring-[hsl(var(--destructive))]/40 aria-invalid:border-[hsl(var(--destructive))] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] [a&]:hover:bg-[hsl(var(--primary))]/90",
        secondary:
          "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] [a&]:hover:bg-[hsl(var(--secondary))]/90",
        destructive:
          "border-transparent bg-[hsl(var(--destructive))] text-white [a&]:hover:bg-[hsl(var(--destructive))]/90 focus-visible:ring-[hsl(var(--destructive))]/20 dark:focus-visible:ring-[hsl(var(--destructive))]/40 dark:bg-[hsl(var(--destructive))]/60",
        outline:
          "text-[hsl(var(--foreground))] [a&]:hover:bg-[hsl(var(--accent))] [a&]:hover:text-[hsl(var(--accent-foreground))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
