import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

export type ToastVariant = "default" | "destructive" | "success";

export type ToastProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Root
> & {
  variant?: ToastVariant;
};

export type ToastActionElement = React.ReactElement<
  typeof ToastPrimitives.Action
>;
