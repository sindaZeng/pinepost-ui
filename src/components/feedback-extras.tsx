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

type ServiceItem<T> = T & { id: string };

function createServiceId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export type MessageServiceInput = Omit<MessageProps, "variant"> & {
  id?: string;
  variant?: FeedbackVariant;
};

export interface MessageService {
  close: (id: string) => void;
  closeAll: () => void;
  danger: (message: Omit<MessageServiceInput, "variant">) => string;
  holder: React.ReactNode;
  info: (message: Omit<MessageServiceInput, "variant">) => string;
  open: (message: MessageServiceInput) => string;
  success: (message: Omit<MessageServiceInput, "variant">) => string;
  warning: (message: Omit<MessageServiceInput, "variant">) => string;
}

export function useMessageService(): MessageService {
  const [items, setItems] = React.useState<Array<ServiceItem<MessageServiceInput>>>([]);

  const close = React.useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const open = React.useCallback((message: MessageServiceInput) => {
    const id = message.id ?? createServiceId("message");
    setItems((current) => [...current, { ...message, id }]);
    return id;
  }, []);

  const closeAll = React.useCallback(() => setItems([]), []);

  const holder = (
    <div className="pinepost-message-stack" aria-live="polite">
      {items.map(({ id, ...message }) => (
        <Message key={id} {...message} />
      ))}
    </div>
  );

  return {
    close,
    closeAll,
    danger: (message) => open({ ...message, variant: "danger" }),
    holder,
    info: (message) => open({ ...message, variant: "info" }),
    open,
    success: (message) => open({ ...message, variant: "success" }),
    warning: (message) => open({ ...message, variant: "warning" })
  };
}

export type NotificationServiceInput = Omit<NotificationProps, "variant"> & {
  id?: string;
  variant?: FeedbackVariant;
};

export interface NotificationService {
  close: (id: string) => void;
  closeAll: () => void;
  danger: (notification: Omit<NotificationServiceInput, "variant">) => string;
  holder: React.ReactNode;
  info: (notification: Omit<NotificationServiceInput, "variant">) => string;
  open: (notification: NotificationServiceInput) => string;
  success: (notification: Omit<NotificationServiceInput, "variant">) => string;
  warning: (notification: Omit<NotificationServiceInput, "variant">) => string;
}

export function useNotificationService(): NotificationService {
  const [items, setItems] = React.useState<Array<ServiceItem<NotificationServiceInput>>>([]);

  const close = React.useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const open = React.useCallback((notification: NotificationServiceInput) => {
    const id = notification.id ?? createServiceId("notification");
    setItems((current) => [...current, { ...notification, id }]);
    return id;
  }, []);

  const closeAll = React.useCallback(() => setItems([]), []);

  const holder = (
    <div className="pinepost-notification-stack" aria-live="polite">
      {items.map(({ id, ...notification }) => (
        <Notification key={id} {...notification} />
      ))}
    </div>
  );

  return {
    close,
    closeAll,
    danger: (notification) => open({ ...notification, variant: "danger" }),
    holder,
    info: (notification) => open({ ...notification, variant: "info" }),
    open,
    success: (notification) => open({ ...notification, variant: "success" }),
    warning: (notification) => open({ ...notification, variant: "warning" })
  };
}

export interface LoadingService {
  close: () => void;
  holder: React.ReactNode;
  open: (label?: string) => void;
  setLabel: (label: string) => void;
}

export function useLoadingService(initialOpen = false, initialLabel = "Loading"): LoadingService {
  const [open, setOpen] = React.useState(initialOpen);
  const [label, setLabel] = React.useState(initialLabel);

  return {
    close: () => setOpen(false),
    holder: open ? (
      <div className="pinepost-loading-stack">
        <Loading overlay label={label} />
      </div>
    ) : null,
    open: (nextLabel) => {
      if (nextLabel) setLabel(nextLabel);
      setOpen(true);
    },
    setLabel
  };
}
