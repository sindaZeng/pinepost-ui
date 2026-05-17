import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../lib/cn";

export function Dropdown({ modal = false, ...props }: DropdownMenuPrimitive.DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root modal={modal} {...props} />;
}

export const DropdownTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("pinepost-dropdown__content", className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

DropdownContent.displayName = DropdownMenuPrimitive.Content.displayName;

export const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} className={cn("pinepost-dropdown__item", className)} {...props} />
));

DropdownItem.displayName = DropdownMenuPrimitive.Item.displayName;

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, sideOffset = 10, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("pinepost-popover__content", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export const Collapse = AccordionPrimitive.Root;
export const CollapseItem = AccordionPrimitive.Item;

export const CollapseTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Header className="pinepost-collapse__header">
    <AccordionPrimitive.Trigger ref={ref} className={cn("pinepost-collapse__trigger", className)} {...props} />
  </AccordionPrimitive.Header>
));

CollapseTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const CollapseContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={cn("pinepost-collapse__content", className)} {...props} />
));

CollapseContent.displayName = AccordionPrimitive.Content.displayName;

const PopconfirmContext = React.createContext<(() => void) | undefined>(undefined);

export interface PopconfirmProps extends AlertDialogPrimitive.AlertDialogProps {
  onConfirm?: () => void;
}

export function Popconfirm({ children, onConfirm, ...props }: PopconfirmProps) {
  return (
    <PopconfirmContext.Provider value={onConfirm}>
      <AlertDialogPrimitive.Root {...props}>{children}</AlertDialogPrimitive.Root>
    </PopconfirmContext.Provider>
  );
}

export const PopconfirmTrigger = AlertDialogPrimitive.Trigger;

export const PopconfirmContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className="pinepost-popconfirm__overlay" />
    <AlertDialogPrimitive.Content ref={ref} className={cn("pinepost-popconfirm__content", className)} {...props} />
  </AlertDialogPrimitive.Portal>
));

PopconfirmContent.displayName = AlertDialogPrimitive.Content.displayName;

export const PopconfirmTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("pinepost-popconfirm__title", className)} {...props} />
));

PopconfirmTitle.displayName = AlertDialogPrimitive.Title.displayName;

export const PopconfirmDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("pinepost-popconfirm__description", className)} {...props} />
));

PopconfirmDescription.displayName = AlertDialogPrimitive.Description.displayName;

export const PopconfirmCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel ref={ref} className={cn("pinepost-popconfirm__cancel", className)} {...props} />
));

PopconfirmCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export const PopconfirmAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, onClick, ...props }, ref) => {
  const onConfirm = React.useContext(PopconfirmContext);

  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn("pinepost-popconfirm__action", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          onConfirm?.();
        }
      }}
      {...props}
    />
  );
});

PopconfirmAction.displayName = AlertDialogPrimitive.Action.displayName;

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "left" | "right";
}

export const DrawerContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DrawerContentProps>(
  ({ className, side = "right", ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="pinepost-drawer__overlay" />
      <DialogPrimitive.Content
        ref={ref}
        data-side={side}
        className={cn("pinepost-drawer__content", className)}
        {...props}
      />
    </DialogPrimitive.Portal>
  )
);

DrawerContent.displayName = DialogPrimitive.Content.displayName;

export const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-drawer__header", className)} {...props} />
  )
);

DrawerHeader.displayName = "DrawerHeader";

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("pinepost-drawer__title", className)} {...props} />
));

DrawerTitle.displayName = DialogPrimitive.Title.displayName;

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("pinepost-drawer__description", className)} {...props} />
));

DrawerDescription.displayName = DialogPrimitive.Description.displayName;

export const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-drawer__footer", className)} {...props} />
  )
);

DrawerFooter.displayName = "DrawerFooter";
