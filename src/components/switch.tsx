import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/cn";

export interface SwitchProps extends SwitchPrimitive.SwitchProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;

    return (
      <div className="pinepost-choice pinepost-choice--switch">
        <SwitchPrimitive.Root
          ref={ref}
          id={switchId}
          className={cn("pinepost-switch", className)}
          {...props}
        >
          <SwitchPrimitive.Thumb className="pinepost-switch__thumb" />
        </SwitchPrimitive.Root>
        {(label || description) && (
          <span className="pinepost-choice__text">
            {label && (
              <label className="pinepost-choice__label" htmlFor={switchId}>
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

Switch.displayName = "Switch";
