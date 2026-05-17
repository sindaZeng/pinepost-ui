import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../lib/cn";
import type { PinepostSize } from "./types";

export interface SelectOption {
  disabled?: boolean;
  group?: React.ReactNode;
  label: React.ReactNode;
  value: string;
}

export interface SelectRef {
  blur: () => void;
  clear: () => void;
  focus: () => void;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onBlur" | "onChange" | "onFocus"> {
  "aria-label"?: string;
  className?: string;
  contentClassName?: string;
  clearable?: boolean;
  defaultValue?: string | string[];
  disabled?: boolean;
  filterable?: boolean;
  multiple?: boolean;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onClear?: () => void;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onValueChange?: (value: string | string[]) => void;
  options: SelectOption[];
  placeholder?: React.ReactNode;
  remoteMethod?: (query: string) => void;
  value?: string | string[];
}

function optionLabelText(option: SelectOption | undefined) {
  if (!option) return "";
  return typeof option.label === "string" ? option.label : option.value;
}

export const Select = React.forwardRef<SelectRef, SelectProps>(
  (
    {
      "aria-label": ariaLabel,
      className,
      clearable,
      contentClassName,
      defaultValue,
      disabled,
      filterable,
      multiple,
      onBlur,
      onClear,
      onFocus,
      onValueChange,
      options,
      placeholder = "Select",
      remoteMethod,
      value,
      ...props
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const fallbackValue = multiple ? [] : "";
    const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue ?? fallbackValue);
    const currentValue = value ?? internalValue;
    const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
    const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
    const displayValue = selectedOptions.map(optionLabelText).join(", ");
    const visibleOptions = query
      ? options.filter((option) => optionLabelText(option).toLowerCase().includes(query.toLowerCase()))
      : options;
    const groups = Array.from(new Set(visibleOptions.map((option) => option.group).filter(Boolean)));

    function commit(nextValue: string | string[]) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    }

    function clear() {
      commit(multiple ? [] : "");
      setOpen(false);
      onClear?.();
    }

    React.useImperativeHandle(ref, () => ({
      blur: () => triggerRef.current?.blur(),
      clear,
      focus: () => triggerRef.current?.focus()
    }));

    function selectOption(option: SelectOption) {
      if (option.disabled) return;
      if (multiple) {
        const nextValue = selectedValues.includes(option.value)
          ? selectedValues.filter((item) => item !== option.value)
          : [...selectedValues, option.value];
        commit(nextValue);
      } else {
        commit(option.value);
        setOpen(false);
      }
    }

    function renderOption(option: SelectOption) {
      const selected = selectedValues.includes(option.value);
      return (
        <button
          key={option.value}
          aria-selected={selected}
          className="pinepost-select__item"
          disabled={option.disabled}
          onClick={() => selectOption(option)}
          role="option"
          type="button"
        >
          {multiple && <input checked={selected} readOnly tabIndex={-1} type="checkbox" />}
          <span>{option.label}</span>
          {selected && <span className="pinepost-select__indicator" aria-hidden="true" />}
        </button>
      );
    }

    return (
      <div className={cn("pinepost-select-wrap", className)} {...props}>
        <button
          ref={triggerRef}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={ariaLabel ?? (displayValue || String(placeholder))}
          className="pinepost-select"
          disabled={disabled}
          onBlur={onBlur}
          onClick={() => setOpen(!open)}
          onFocus={onFocus}
          role="combobox"
          type="button"
        >
          <span data-placeholder={!displayValue}>{displayValue || placeholder}</span>
          <span className="pinepost-select__icon" aria-hidden="true">v</span>
        </button>
        {clearable && selectedValues.length > 0 && (
          <span
            aria-label={`Clear ${String(placeholder)}`}
            className="pinepost-select__clear"
            onClick={clear}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") clear();
            }}
            role="button"
            tabIndex={0}
          >
            x
          </span>
        )}
        {open && (
          <div className={cn("pinepost-select__content", contentClassName)} role="listbox" aria-multiselectable={multiple}>
            {filterable && (
              <input
                aria-label="Filter select"
                className="pinepost-select__filter"
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                  remoteMethod?.(event.currentTarget.value);
                }}
                placeholder="Filter"
                value={query}
              />
            )}
            <div className="pinepost-select__viewport">
              {groups.length > 0
                ? groups.map((group) => (
                    <div className="pinepost-select__group" key={String(group)}>
                      <strong>{group}</strong>
                      {visibleOptions.filter((option) => option.group === group).map(renderOption)}
                    </div>
                  ))
                : visibleOptions.map(renderOption)}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

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
