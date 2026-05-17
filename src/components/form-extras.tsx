import * as React from "react";
import { cn } from "../lib/cn";
import type { PinepostSize } from "./types";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: "vertical" | "horizontal" | "inline";
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, layout = "vertical", ...props }, ref) => (
    <form ref={ref} className={cn("pinepost-form", `pinepost-form--${layout}`, className)} {...props} />
  )
);

Form.displayName = "Form";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  htmlFor?: string;
  label: React.ReactNode;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className, description, error, htmlFor, label, required, ...props }, ref) => (
    <div ref={ref} className={cn("pinepost-form-field", className)} data-invalid={Boolean(error)} {...props}>
      <label className="pinepost-form-field__label" htmlFor={htmlFor}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      <div className="pinepost-form-field__control">{children}</div>
      {description && !error && <p className="pinepost-form-field__description">{description}</p>}
      {error && (
        <p className="pinepost-form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
);

FormField.displayName = "FormField";

function clampNumber(value: number, min?: number, max?: number) {
  if (typeof min === "number" && value < min) return min;
  if (typeof max === "number" && value > max) return max;
  return value;
}

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size" | "type" | "value" | "defaultValue"> {
  defaultValue?: number;
  inputSize?: PinepostSize;
  onValueChange?: (value: number) => void;
  value?: number;
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      defaultValue = 0,
      disabled,
      inputSize = "md",
      max,
      min,
      onValueChange,
      step = 1,
      value,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    function update(nextValue: number) {
      const normalized = clampNumber(nextValue, Number(min), Number(max));
      if (value === undefined) {
        setInternalValue(normalized);
      }
      onValueChange?.(normalized);
    }

    return (
      <span className={cn("pinepost-input-number", `pinepost-input-number--${inputSize}`, className)}>
        <button
          aria-label="Decrease value"
          disabled={disabled}
          onClick={() => update(Number(currentValue) - Number(step))}
          type="button"
        >
          -
        </button>
        <input
          ref={ref}
          disabled={disabled}
          max={max}
          min={min}
          onChange={(event) => update(Number(event.currentTarget.value || 0))}
          step={step}
          type="number"
          value={currentValue}
          {...props}
        />
        <button
          aria-label="Increase value"
          disabled={disabled}
          onClick={() => update(Number(currentValue) + Number(step))}
          type="button"
        >
          +
        </button>
      </span>
    );
  }
);

InputNumber.displayName = "InputNumber";

export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  count?: number;
  disabled?: boolean;
  label?: string;
  onValueChange?: (value: number) => void;
  value?: number;
}

export const Rate = React.forwardRef<HTMLDivElement, RateProps>(
  ({ className, count = 5, disabled, label = "Rating", onValueChange, value = 0, ...props }, ref) => (
    <div ref={ref} aria-label={label} className={cn("pinepost-rate", className)} role="radiogroup" {...props}>
      {Array.from({ length: count }, (_, index) => {
        const itemValue = index + 1;
        const active = itemValue <= value;

        return (
          <button
            key={itemValue}
            aria-checked={itemValue === value}
            aria-label={`${label} ${itemValue}`}
            className="pinepost-rate__item"
            data-active={active}
            disabled={disabled}
            onClick={() => onValueChange?.(itemValue)}
            role="radio"
            type="button"
          >
            <span aria-hidden="true" />
          </button>
        );
      })}
    </div>
  )
);

Rate.displayName = "Rate";

export interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "type"> {
  description?: React.ReactNode;
  label?: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
}

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ className, description, id, label = "Choose file", onChange, onFilesChange, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className={cn("pinepost-upload", className)}>
        <label className="pinepost-upload__dropzone" htmlFor={inputId}>
          <span className="pinepost-upload__icon" aria-hidden="true" />
          <strong>{label}</strong>
          {description && <span>{description}</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          onChange={(event) => {
            onChange?.(event);
            onFilesChange?.(Array.from(event.currentTarget.files ?? []));
          }}
          type="file"
          {...props}
        />
      </div>
    );
  }
);

Upload.displayName = "Upload";

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "list"> {
  options: Array<AutocompleteOption | string>;
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ className, id, options, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const listId = `${inputId}-list`;

    return (
      <>
        <input ref={ref} className={cn("pinepost-input", className)} id={inputId} list={listId} {...props} />
        <datalist id={listId}>
          {options.map((option) => {
            const normalized = typeof option === "string" ? { label: option, value: option } : option;
            return <option key={normalized.value} label={normalized.label} value={normalized.value} />;
          })}
        </datalist>
      </>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

export interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ className, label = "Color", ...props }, ref) => (
    <label className={cn("pinepost-color-picker", className)}>
      <span>{label}</span>
      <input ref={ref} type="color" {...props} />
    </label>
  )
);

ColorPicker.displayName = "ColorPicker";

export interface NativePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  pickerSize?: PinepostSize;
}

function createNativePicker(displayName: string, type: "date" | "datetime-local" | "time") {
  const Component = React.forwardRef<HTMLInputElement, NativePickerProps>(
    ({ className, pickerSize = "md", ...props }, ref) => (
      <input
        ref={ref}
        className={cn("pinepost-input", `pinepost-input--${pickerSize}`, "pinepost-native-picker", className)}
        type={type}
        {...props}
      />
    )
  );
  Component.displayName = displayName;
  return Component;
}

export const DatePicker = createNativePicker("DatePicker", "date");
export const DateTimePicker = createNativePicker("DateTimePicker", "datetime-local");
export const TimePicker = createNativePicker("TimePicker", "time");

