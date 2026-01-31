import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-lg",
        "bg-[#0B1215]",
        "border border-white/10",
        "px-4 text-sm text-zinc-100",
        "placeholder:text-zinc-500",
        "shadow-inner",
        "transition-all duration-200",
        "focus-visible:outline-none",
        "focus-visible:border-emerald-400",
        "focus-visible:ring-2",
        "focus-visible:ring-emerald-400/70",
        "focus-visible:shadow-[0_0_0_3px_rgba(52,211,153,0.25)]",
        "hover:border-white/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }

