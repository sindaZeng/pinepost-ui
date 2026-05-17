import * as React from "react";
import { cn } from "../lib/cn";

export type BadgeVariant = "leaf" | "stamp" | "parcel" | "sky";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "leaf", ...props }, ref) => (
    <span ref={ref} className={cn("pinepost-badge", `pinepost-badge--${variant}`, className)} {...props} />
  )
);

Badge.displayName = "Badge";
