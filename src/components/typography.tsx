import * as React from "react";
import { cn } from "../lib/cn";

export type TextTone = "default" | "muted" | "success" | "warning" | "danger";
export type TextSize = "sm" | "md" | "lg";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: TextSize;
  tone?: TextTone;
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, size = "md", tone = "default", ...props }, ref) => (
    <span ref={ref} className={cn("pinepost-text", `pinepost-text--${size}`, `pinepost-text--${tone}`, className)} {...props} />
  )
);

Text.displayName = "Text";

export const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn("pinepost-link", className)} {...props} />
  )
);

Link.displayName = "Link";
