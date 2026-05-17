import * as React from "react";
import { cn } from "../lib/cn";
import type { PinepostSize } from "./types";

export type ButtonVariant = "primary" | "soft" | "stamp" | "parcel";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: PinepostSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn("pinepost-button", `pinepost-button--${variant}`, `pinepost-button--${size}`, className)}
      {...props}
    />
  )
);

Button.displayName = "Button";
