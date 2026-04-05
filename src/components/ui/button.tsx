import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-md",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
        secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        // GoPromo AI Custom Variants
        hero: "bg-gradient-to-r from-secondary to-orange-500 text-white shadow-orange hover:shadow-lg hover:scale-[1.02] text-base py-6 px-8 rounded-xl font-bold",
        turquoise: "bg-gradient-to-r from-primary to-teal-400 text-white shadow-glow hover:shadow-lg hover:scale-[1.02]",
        glass: "bg-white/90 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary/10",
        chat: "bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full",
        step: "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border-2 border-transparent hover:border-primary",
        stepActive: "bg-primary text-white shadow-glow",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10 rounded-full",
        iconLg: "h-12 w-12 rounded-full",
        iconXl: "h-14 w-14 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
