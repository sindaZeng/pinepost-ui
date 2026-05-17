import * as React from "react";
import { cn } from "../lib/cn";

export type AlertVariant = "info" | "success" | "warning" | "danger";
export type TagVariant = "leaf" | "stamp" | "parcel" | "sky";
export type ResultStatus = "info" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  description?: React.ReactNode;
  title: React.ReactNode;
  variant?: AlertVariant;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, description, title, variant = "info", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={typeof title === "string" ? title : undefined}
      className={cn("pinepost-alert", `pinepost-alert--${variant}`, className)}
      {...props}
    >
      <span className="pinepost-alert__stamp" aria-hidden="true" />
      <span className="pinepost-alert__body">
        <strong className="pinepost-alert__title">{title}</strong>
        {description && <span className="pinepost-alert__description">{description}</span>}
      </span>
    </div>
  )
);

Alert.displayName = "Alert";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "leaf", ...props }, ref) => (
    <span ref={ref} className={cn("pinepost-tag", `pinepost-tag--${variant}`, className)} {...props} />
  )
);

Tag.displayName = "Tag";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  alt?: string;
  fallback: React.ReactNode;
  size?: "sm" | "md" | "lg";
  src?: string;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ alt = "", className, fallback, size = "md", src, ...props }, ref) => (
    <span ref={ref} className={cn("pinepost-avatar", `pinepost-avatar--${size}`, className)} {...props}>
      {src ? <img className="pinepost-avatar__image" src={src} alt={alt} /> : <span className="pinepost-avatar__fallback">{fallback}</span>}
    </span>
  )
);

Avatar.displayName = "Avatar";

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  action?: React.ReactNode;
  description?: React.ReactNode;
  title: React.ReactNode;
}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ action, className, description, title, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-empty", className)} {...props}>
      <span className="pinepost-empty__mark" aria-hidden="true" />
      <strong className="pinepost-empty__title">{title}</strong>
      {description && <span className="pinepost-empty__description">{description}</span>}
      {action && <span className="pinepost-empty__action">{action}</span>}
    </div>
  )
);

Empty.displayName = "Empty";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  max?: number;
  value: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, label, max = 100, value, ...props }, ref) => {
    const normalized = Math.min(Math.max(value, 0), max);
    const percent = max > 0 ? (normalized / max) * 100 : 0;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={normalized}
        className={cn("pinepost-progress", className)}
        {...props}
      >
        <span className="pinepost-progress__track">
          <span className="pinepost-progress__bar" style={{ width: `${percent}%` }} />
        </span>
        {label && <span className="pinepost-progress__label">{label}</span>}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, count = 1, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-skeleton", className)} {...props}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="pinepost-skeleton__line" />
      ))}
    </div>
  )
);

Skeleton.displayName = "Skeleton";

export interface DescriptionItem {
  children: React.ReactNode;
  label: React.ReactNode;
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  items: DescriptionItem[];
  title?: React.ReactNode;
}

export const Descriptions = React.forwardRef<HTMLDivElement, DescriptionsProps>(
  ({ className, items, title, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-descriptions", className)} {...props}>
      {title && <strong className="pinepost-descriptions__title">{title}</strong>}
      <dl className="pinepost-descriptions__list">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <dt>{item.label}</dt>
            <dd>{item.children}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  )
);

Descriptions.displayName = "Descriptions";

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  label: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value: React.ReactNode;
}

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
  ({ className, label, prefix, suffix, value, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-statistic", className)} {...props}>
      <span className="pinepost-statistic__label">{label}</span>
      <strong className="pinepost-statistic__value">
        {prefix}
        <span>{value}</span>
        {suffix && <small>{suffix}</small>}
      </strong>
    </div>
  )
);

Statistic.displayName = "Statistic";

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  description?: React.ReactNode;
  status?: ResultStatus;
  title: React.ReactNode;
}

export const Result = React.forwardRef<HTMLDivElement, ResultProps>(
  ({ className, description, status = "info", title, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-result", `pinepost-result--${status}`, className)} {...props}>
      <span className="pinepost-result__seal" aria-hidden="true" />
      <strong className="pinepost-result__title">{title}</strong>
      {description && <span className="pinepost-result__description">{description}</span>}
    </div>
  )
);

Result.displayName = "Result";

export interface TimelineItem {
  description?: React.ReactNode;
  title: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, items, ...props }, ref) => (
    <ol ref={ref} className={cn("pinepost-timeline", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="pinepost-timeline__item">
          <span className="pinepost-timeline__dot" aria-hidden="true" />
          <strong>{item.title}</strong>
          {item.description && <span>{item.description}</span>}
        </li>
      ))}
    </ol>
  )
);

Timeline.displayName = "Timeline";

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

export const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(
  ({ children, className, content, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pinepost-watermark", className)}
      style={{ "--pinepost-watermark-content": `"${content}"`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
);

Watermark.displayName = "Watermark";
