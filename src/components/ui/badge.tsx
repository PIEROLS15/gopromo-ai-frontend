import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        primary: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-primary/30",
        // GoPromo AI Custom Variants - Solid backgrounds
        turquoise: "border-transparent bg-primary !text-white font-bold",
        orange: "border-transparent bg-secondary !text-white font-bold",
        success: "border-transparent bg-emerald-500 !text-white font-bold",
        verified: "border-transparent bg-primary !text-white gap-1 font-semibold",
        price: "border-transparent bg-secondary !text-white text-sm font-bold px-4 py-1.5",
        duration: "border-transparent bg-card text-foreground gap-1 shadow-sm",
        category: "border-transparent bg-primary text-primary-foreground font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
