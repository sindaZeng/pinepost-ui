import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../lib/cn";
import { Button } from "./button";
import { Spinner } from "./form-controls";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  overlay?: boolean;
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ children, className, label = "Loading", overlay = false, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-loading", className)} data-overlay={overlay} {...props}>
      {children}
      <span className="pinepost-loading__indicator">
        <Spinner label={label} />
        <span>{label}</span>
      </span>
    </div>
  )
);

Loading.displayName = "Loading";

export type FeedbackVariant = "info" | "success" | "warning" | "danger";

export interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  description?: React.ReactNode;
  title: React.ReactNode;
  variant?: FeedbackVariant;
}

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, description, title, variant = "info", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pinepost-message", `pinepost-message--${variant}`, className)}
      role={variant === "danger" ? "alert" : "status"}
      {...props}
    >
      <span className="pinepost-message__dot" aria-hidden="true" />
      <strong>{title}</strong>
      {description && <span>{description}</span>}
    </div>
  )
);

Message.displayName = "Message";

export interface NotificationProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  action?: React.ReactNode;
  description?: React.ReactNode;
  title: React.ReactNode;
  variant?: FeedbackVariant;
}

export const Notification = React.forwardRef<HTMLElement, NotificationProps>(
  ({ action, className, description, title, variant = "info", ...props }, ref) => (
    <aside
      ref={ref}
      className={cn("pinepost-notification", `pinepost-notification--${variant}`, className)}
      role={variant === "danger" ? "alert" : "status"}
      {...props}
    >
      <span className="pinepost-notification__pin" aria-hidden="true" />
      <strong>{title}</strong>
      {description && <p>{description}</p>}
      {action && <div className="pinepost-notification__action">{action}</div>}
    </aside>
  )
);

Notification.displayName = "Notification";

export interface MessageBoxProps extends AlertDialogPrimitive.AlertDialogProps {
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  description?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  title: React.ReactNode;
}

export function MessageBox({
  cancelText = "Cancel",
  confirmText = "Confirm",
  description,
  onCancel,
  onConfirm,
  title,
  ...props
}: MessageBoxProps) {
  return (
    <AlertDialogPrimitive.Root {...props}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="pinepost-message-box__overlay" />
        <AlertDialogPrimitive.Content className="pinepost-message-box">
          <AlertDialogPrimitive.Title className="pinepost-message-box__title">{title}</AlertDialogPrimitive.Title>
          {description && (
            <AlertDialogPrimitive.Description className="pinepost-message-box__description">
              {description}
            </AlertDialogPrimitive.Description>
          )}
          <div className="pinepost-message-box__footer">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="soft" onClick={onCancel}>
                {cancelText}
              </Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button variant="stamp" onClick={onConfirm}>
                {confirmText}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
