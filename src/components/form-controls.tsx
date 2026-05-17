import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../lib/cn";
import type { PinepostSize } from "./types";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, "children"> {
  options: SelectOption[];
  placeholder?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  "aria-label"?: string;
}

export function Select({
  options,
  placeholder,
  className,
  contentClassName,
  "aria-label": ariaLabel,
  ...props
}: SelectProps) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger aria-label={ariaLabel} className={cn("pinepost-select", className)}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="pinepost-select__icon" aria-hidden="true">
          v
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn("pinepost-select__content", contentClassName)}
          position="popper"
          sideOffset={6}
        >
          <SelectPrimitive.Viewport className="pinepost-select__viewport">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                className="pinepost-select__item"
                value={option.value}
                disabled={option.disabled}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="pinepost-select__indicator" />
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  options: RadioOption[];
}

export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, options, ...props }, ref) => {
    const baseId = React.useId();

    return (
      <RadioGroupPrimitive.Root ref={ref} className={cn("pinepost-radio-group", className)} {...props}>
        {options.map((option) => {
          const id = `${baseId}-${option.value}`;

          return (
            <label key={option.value} className="pinepost-radio" htmlFor={id} data-disabled={option.disabled}>
              <RadioGroupPrimitive.Item
                id={id}
                className="pinepost-radio__item"
                value={option.value}
                disabled={option.disabled}
              >
                <RadioGroupPrimitive.Indicator className="pinepost-radio__indicator" />
              </RadioGroupPrimitive.Item>
              <span className="pinepost-choice__text">
                <span className="pinepost-choice__label">{option.label}</span>
                {option.description && <span className="pinepost-choice__description">{option.description}</span>}
              </span>
            </label>
          );
        })}
      </RadioGroupPrimitive.Root>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, "aria-label": ariaLabel, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn("pinepost-slider", className)} {...props}>
      <SliderPrimitive.Track className="pinepost-slider__track">
        <SliderPrimitive.Range className="pinepost-slider__range" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb aria-label={ariaLabel} className="pinepost-slider__thumb" />
    </SliderPrimitive.Root>
  )
);

Slider.displayName = "Slider";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: PinepostSize;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, label = "Loading", size = "md", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("pinepost-spinner", `pinepost-spinner--${size}`, className)}
      {...props}
    >
      <span className="pinepost-spinner__mark" aria-hidden="true" />
    </span>
  )
);

Spinner.displayName = "Spinner";
