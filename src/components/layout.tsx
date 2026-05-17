import * as React from "react";
import { cn } from "../lib/cn";

export type SpaceSize = "sm" | "md" | "lg" | number;
export type SpaceDirection = "horizontal" | "vertical";

const spaceSizeMap = {
  sm: "8px",
  md: "12px",
  lg: "18px"
};

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: SpaceDirection;
  size?: SpaceSize;
  wrap?: boolean;
}

export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  ({ className, direction = "horizontal", size = "md", wrap = true, style, ...props }, ref) => {
    const gap = typeof size === "number" ? `${size}px` : spaceSizeMap[size];

    return (
      <div
        ref={ref}
        className={cn("pinepost-space", `pinepost-space--${direction}`, className)}
        data-wrap={wrap}
        style={{ "--pinepost-space-gap": gap, ...style } as React.CSSProperties}
        {...props}
      />
    );
  }
);

Space.displayName = "Space";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn("pinepost-divider", `pinepost-divider--${orientation}`, className)}
      {...props}
    />
  )
);

Divider.displayName = "Divider";
