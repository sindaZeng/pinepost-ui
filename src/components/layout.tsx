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

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, direction = "vertical", ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-container", `pinepost-container--${direction}`, className)} {...props} />
  )
);

Container.displayName = "Container";

export const Header = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <header ref={ref} className={cn("pinepost-layout-header", className)} {...props} />
);

Header.displayName = "Header";

export const Aside = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <aside ref={ref} className={cn("pinepost-layout-aside", className)} {...props} />
);

Aside.displayName = "Aside";

export const Main = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <main ref={ref} className={cn("pinepost-layout-main", className)} {...props} />
);

Main.displayName = "Main";

export const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <footer ref={ref} className={cn("pinepost-layout-footer", className)} {...props} />
);

Footer.displayName = "Footer";

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: SpaceSize;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, gap = "md", style, ...props }, ref) => {
    const normalizedGap = typeof gap === "number" ? `${gap}px` : spaceSizeMap[gap];

    return (
      <div
        ref={ref}
        className={cn("pinepost-row", className)}
        style={{ "--pinepost-row-gap": normalizedGap, ...style } as React.CSSProperties}
        {...props}
      />
    );
  }
);

Row.displayName = "Row";

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
}

export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  ({ className, span = 12, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pinepost-col", className)}
      style={{ "--pinepost-col-span": span, ...style } as React.CSSProperties}
      {...props}
    />
  )
);

Col.displayName = "Col";

export interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string;
}

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ className, maxHeight = 220, style, ...props }, ref) => {
    const height = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

    return (
      <div
        ref={ref}
        className={cn("pinepost-scrollbar", className)}
        style={{ "--pinepost-scrollbar-max-height": height, ...style } as React.CSSProperties}
        {...props}
      />
    );
  }
);

Scrollbar.displayName = "Scrollbar";

export interface SplitterProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const Splitter = React.forwardRef<HTMLDivElement, SplitterProps>(
  ({ children, className, ratio = 0.5, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pinepost-splitter", className)}
      style={{ "--pinepost-splitter-ratio": ratio, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
);

Splitter.displayName = "Splitter";
