import * as React from "react";
import { cn } from "../lib/cn";

export const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("pinepost-breadcrumb", className)} {...props} />
  )
);

Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("pinepost-breadcrumb__list", className)} {...props} />
  )
);

BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("pinepost-breadcrumb__item", className)} {...props} />
  )
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn("pinepost-breadcrumb__link", className)} {...props} />
  )
);

BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, children = "/", ...props }, ref) => (
    <li ref={ref} aria-hidden="true" className={cn("pinepost-breadcrumb__separator", className)} {...props}>
      {children}
    </li>
  )
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-current="page" className={cn("pinepost-breadcrumb__page", className)} {...props} />
  )
);

BreadcrumbPage.displayName = "BreadcrumbPage";

export interface MenuItem {
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
}

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  items: MenuItem[];
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  value?: string;
}

export const Menu = React.forwardRef<HTMLElement, MenuProps>(
  ({ className, items, onValueChange, orientation = "horizontal", value, ...props }, ref) => (
    <nav ref={ref} className={cn("pinepost-menu", `pinepost-menu--${orientation}`, className)} {...props}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className="pinepost-menu__item"
          data-state={value === item.value ? "active" : "inactive"}
          disabled={item.disabled}
          onClick={() => onValueChange?.(item.value)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
);

Menu.displayName = "Menu";

export interface StepItem {
  description?: React.ReactNode;
  title: React.ReactNode;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  active?: number;
  items: StepItem[];
  orientation?: "horizontal" | "vertical";
}

export const Steps = React.forwardRef<HTMLOListElement, StepsProps>(
  ({ active = 0, className, items, orientation = "horizontal", ...props }, ref) => (
    <ol ref={ref} className={cn("pinepost-steps", `pinepost-steps--${orientation}`, className)} {...props}>
      {items.map((item, index) => {
        const state = index < active ? "done" : index === active ? "active" : "pending";

        return (
          <li key={index} className="pinepost-steps__item">
            <span className="pinepost-steps__marker" data-state={state}>
              {index + 1}
            </span>
            <span className="pinepost-steps__body">
              <strong data-state={state}>{item.title}</strong>
              {item.description && <span>{item.description}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  )
);

Steps.displayName = "Steps";

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  onPageChange?: (page: number) => void;
  page: number;
  pageCount: number;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, onPageChange, page, pageCount, ...props }, ref) => {
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

    return (
      <div ref={ref} className={cn("pinepost-pagination", className)} {...props}>
        <button type="button" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)} aria-label="Previous page">
          Previous
        </button>
        {pages.map((item) => (
          <button
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            data-state={item === page ? "active" : "inactive"}
            onClick={() => onPageChange?.(item)}
          >
            {item}
          </button>
        ))}
        <button type="button" disabled={page >= pageCount} onClick={() => onPageChange?.(page + 1)} aria-label="Next page">
          Next
        </button>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export interface SegmentedOption {
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
}

export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  onValueChange?: (value: string) => void;
  options: SegmentedOption[];
  value?: string;
}

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  ({ className, onValueChange, options, value, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-segmented", className)} role="group" {...props}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          data-state={value === option.value ? "active" : "inactive"}
          disabled={option.disabled}
          onClick={() => onValueChange?.(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
);

Segmented.displayName = "Segmented";
