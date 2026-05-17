import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../lib/cn";

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
      <div className="pinepost-choice">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          className={cn("pinepost-checkbox", className)}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="pinepost-checkbox__indicator">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M3.2 8.3 6.5 11.4 12.9 4.8" />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {(label || description) && (
          <span className="pinepost-choice__text">
            {label && (
              <label className="pinepost-choice__label" htmlFor={checkboxId}>
                {label}
              </label>
            )}
            {description && <span className="pinepost-choice__description">{description}</span>}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
