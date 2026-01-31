"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

/* ---------------- VIEWPORT ---------------- */

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-6 right-6 z-100 flex max-h-screen w-full max-w-sm flex-col gap-3",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

/* ---------------- VARIANTS ---------------- */

const toastVariants = cva(
  "group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border p-4 pr-10 shadow-2xl backdrop-blur-md transition-all duration-300 data-[state=open]:animate-slide-in-from-top-2 data-[state=closed]:animate-fade-out-80",
  {
    variants: {
      variant: {
        default:
          "bg-white/90 text-gray-900 border-gray-200 dark:bg-zinc-900/90 dark:text-zinc-100 dark:border-zinc-800",
        success:
          "bg-emerald-500/90 text-white border-emerald-500 shadow-emerald-500/30",
        destructive:
          "bg-red-500/90 text-white border-red-500 shadow-red-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/* ---------------- ROOT ---------------- */

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  >
    {/* ICON */}
    <div className="pt-1">
      {variant === "success" && <CheckCircle className="h-5 w-5" />}
      {variant === "destructive" && <AlertTriangle className="h-5 w-5" />}
    </div>

    {/* CONTENT */}
    <div className="flex-1">{children}</div>
  </ToastPrimitives.Root>
))
Toast.displayName = ToastPrimitives.Root.displayName

/* ---------------- TITLE ---------------- */

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>((props, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className="text-sm font-semibold leading-tight"
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

/* ---------------- DESCRIPTION ---------------- */

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>((props, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className="text-sm opacity-90"
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

/* ---------------- CLOSE ---------------- */

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>((props, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className="absolute right-3 top-3 rounded-full p-1 text-white/80 hover:text-white hover:bg-white/20 transition"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

/* ---------------- TYPES ---------------- */

type ToastProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Root
> &
  VariantProps<typeof toastVariants>

type ToastActionElement = React.ReactElement<
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>

/* ---------------- EXPORTS ---------------- */

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
}

export type { ToastProps, ToastActionElement }
