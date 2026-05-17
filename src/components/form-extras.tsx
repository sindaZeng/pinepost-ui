import * as React from "react";
import { cn } from "../lib/cn";
import type { PinepostSize } from "./types";

export type FormRule = {
  message?: React.ReactNode;
  required?: boolean;
  validator?: (value: unknown, model: Record<string, unknown>) => boolean | string | React.ReactNode | Promise<boolean | string | React.ReactNode>;
};

export type FormValidateTrigger = "blur" | "change" | "submit";

export interface FormRef {
  clearValidate: (names?: string | string[]) => void;
  getFieldError: (name: string) => React.ReactNode | undefined;
  getSubmitError: () => React.ReactNode | undefined;
  isFieldValidating: (name: string) => boolean;
  isSubmitting: () => boolean;
  resetFields: (names?: string | string[]) => void;
  scrollToField: (name: string) => void;
  validate: () => Promise<boolean>;
  validateField: (name: string) => Promise<boolean>;
}

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  layout?: "vertical" | "horizontal" | "inline";
  model?: Record<string, unknown>;
  onFinish?: (model: Record<string, unknown>) => void | Promise<void>;
  onFinishFailed?: (model: Record<string, unknown>) => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  rules?: Record<string, FormRule[]>;
  submitErrorMessage?: React.ReactNode;
  submittingMessage?: React.ReactNode;
  validateTrigger?: FormValidateTrigger | FormValidateTrigger[];
}

type FormContextValue = {
  clearValidate: (names?: string | string[]) => void;
  errors: Record<string, React.ReactNode>;
  registerField: (name: string, element: HTMLElement | null) => () => void;
  validateField: (name: string) => Promise<boolean>;
  validateTrigger: FormValidateTrigger | FormValidateTrigger[];
  validating: Record<string, boolean>;
};

const FormContext = React.createContext<FormContextValue | null>(null);

function normalizeNames(names: string | string[] | undefined, fallback: string[]) {
  if (!names) return fallback;
  return Array.isArray(names) ? names : [names];
}

function isEmptyValue(value: unknown) {
  return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
}

function hasValidateTrigger(trigger: FormValidateTrigger | FormValidateTrigger[] | undefined, expected: FormValidateTrigger) {
  const normalized = trigger ?? "submit";
  return Array.isArray(normalized) ? normalized.includes(expected) : normalized === expected;
}

function composeEventHandlers<E>(first: ((event: E) => void) | undefined, second: (event: E) => void) {
  return (event: E) => {
    first?.(event);
    second(event);
  };
}

export const Form = React.forwardRef<FormRef, FormProps>(
  (
    {
      children,
      className,
      layout = "vertical",
      model = {},
      onFinish,
      onFinishFailed,
      onSubmit,
      rules = {},
      submitErrorMessage,
      submittingMessage,
      validateTrigger = "submit",
      ...props
    },
    ref
  ) => {
    const nativeRef = React.useRef<HTMLFormElement>(null);
    const fieldsRef = React.useRef(new Map<string, HTMLElement>());
    const [errors, setErrors] = React.useState<Record<string, React.ReactNode>>({});
    const [submitError, setSubmitError] = React.useState<React.ReactNode>();
    const [submitting, setSubmitting] = React.useState(false);
    const [validating, setValidating] = React.useState<Record<string, boolean>>({});
    const initialModelRef = React.useRef({ ...model });

    function setFieldValidating(name: string, nextValidating: boolean) {
      setValidating((current) => {
        const next = { ...current };
        if (nextValidating) next[name] = true;
        else delete next[name];
        return next;
      });
    }

    const clearValidate = React.useCallback((names?: string | string[]) => {
      setErrors((current) => {
        const next = { ...current };
        normalizeNames(names, Object.keys(next)).forEach((name) => {
          delete next[name];
        });
        return next;
      });
    }, []);

    async function runFieldValidation(name: string) {
      const fieldRules = rules[name] ?? [];
      const value = model[name];

      for (const rule of fieldRules) {
        if (rule.required && isEmptyValue(value)) {
          return rule.message ?? "This field is required";
        }
        if (rule.validator) {
          const result = await rule.validator(value, model);
          if (result !== true) return typeof result === "boolean" ? rule.message ?? "This field is invalid" : result;
        }
      }

      return undefined;
    }

    const validateField = React.useCallback(
      async (name: string) => {
        setFieldValidating(name, true);
        try {
          const error = await runFieldValidation(name);
          setErrors((current) => {
            const next = { ...current };
            if (error) next[name] = error;
            else delete next[name];
            return next;
          });
          return !error;
        } finally {
          setFieldValidating(name, false);
        }
      },
      [model, rules]
    );

    const validate = React.useCallback(async () => {
      const names = Object.keys(rules);
      const nextErrors: Record<string, React.ReactNode> = {};

      for (const name of names) {
        setFieldValidating(name, true);
        try {
          const error = await runFieldValidation(name);
          if (error) nextErrors[name] = error;
        } finally {
          setFieldValidating(name, false);
        }
      }

      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }, [model, rules]);

    React.useImperativeHandle(ref, () => ({
      clearValidate,
      getFieldError: (name) => errors[name],
      getSubmitError: () => submitError,
      isFieldValidating: (name) => Boolean(validating[name]),
      isSubmitting: () => submitting,
      resetFields: (names) => {
        clearValidate(names);
        const selectedNames = normalizeNames(names, Object.keys(initialModelRef.current));
        selectedNames.forEach((name) => {
          if (Object.prototype.hasOwnProperty.call(model, name)) {
            model[name] = initialModelRef.current[name];
          }
        });
      },
      scrollToField: (name) => fieldsRef.current.get(name)?.scrollIntoView({ block: "center", behavior: "smooth" }),
      validate,
      validateField
    }), [clearValidate, errors, model, submitError, submitting, validate, validateField, validating]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      onSubmit?.(event);
      if (event.defaultPrevented || !onFinish) return;
      event.preventDefault();
      setSubmitError(undefined);
      const valid = await validate();
      if (!valid) {
        onFinishFailed?.(model);
        return;
      }

      setSubmitting(true);
      try {
        await onFinish(model);
      } catch (error) {
        setSubmitError(submitErrorMessage ?? (error instanceof Error ? error.message : "Submit failed"));
      } finally {
        setSubmitting(false);
      }
    }

    const context = React.useMemo<FormContextValue>(
      () => ({
        clearValidate,
        errors,
        registerField: (name, element) => {
          if (element) fieldsRef.current.set(name, element);
          return () => fieldsRef.current.delete(name);
        },
        validateField,
        validateTrigger,
        validating
      }),
      [clearValidate, errors, validateField, validateTrigger, validating]
    );

    return (
      <FormContext.Provider value={context}>
        <form
          ref={nativeRef}
          className={cn("pinepost-form", `pinepost-form--${layout}`, className)}
          data-submit-error={Boolean(submitError) || undefined}
          data-submitting={submitting || undefined}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}
          {submitting && submittingMessage && (
            <p className="pinepost-form__status" role="status">
              {submittingMessage}
            </p>
          )}
          {submitError && (
            <p className="pinepost-form__submit-error" role="alert">
              {submitError}
            </p>
          )}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  htmlFor?: string;
  label: React.ReactNode;
  name?: string;
  required?: boolean;
  validatingMessage?: React.ReactNode;
  validateTrigger?: FormValidateTrigger | FormValidateTrigger[];
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className, description, error, htmlFor, label, name, required, validatingMessage, validateTrigger, ...props }, ref) => {
    const context = React.useContext(FormContext);
    const localRef = React.useRef<HTMLDivElement>(null);
    const fieldError = (name ? context?.errors[name] : undefined) ?? error;
    const fieldValidating = Boolean(name ? context?.validating[name] : false);
    const activeTrigger = validateTrigger ?? context?.validateTrigger;

    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!name || !context) return undefined;
      return context.registerField(name, localRef.current);
    }, [context, name]);

    const control = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          onBlur: composeEventHandlers((children.props as { onBlur?: (event: React.FocusEvent) => void }).onBlur, () => {
            if (name && context && hasValidateTrigger(activeTrigger, "blur")) void context.validateField(name);
          }),
          onChange: composeEventHandlers((children.props as { onChange?: (event: React.ChangeEvent) => void }).onChange, () => {
            if (name && context && hasValidateTrigger(activeTrigger, "change")) void context.validateField(name);
          })
        })
      : children;

    return (
      <div
        ref={localRef}
        className={cn("pinepost-form-field", className)}
        data-invalid={Boolean(fieldError)}
        data-validating={fieldValidating || undefined}
        {...props}
      >
        <label className="pinepost-form-field__label" htmlFor={htmlFor}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
        <div className="pinepost-form-field__control">{control}</div>
        {description && !fieldError && !fieldValidating && <p className="pinepost-form-field__description">{description}</p>}
        {fieldValidating && validatingMessage && (
          <p className="pinepost-form-field__description" role="status">
            {validatingMessage}
          </p>
        )}
        {fieldError && (
          <p className="pinepost-form-field__error" role="alert">
            {fieldError}
          </p>
        )}
      </div>
    );
  }
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

export type UploadStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  error?: unknown;
  name: string;
  percent: number;
  raw?: File;
  response?: unknown;
  size?: number;
  status: UploadStatus;
  type?: string;
  uid: string;
}

export interface UploadRequestOptions {
  file: UploadFile;
  onError?: (error: unknown) => void;
  onProgress?: (percent: number) => void;
  onSuccess?: (response: unknown) => void;
  signal: AbortSignal;
}

export interface UploadRef {
  abort: () => void;
  clearFiles: () => void;
  getFiles: () => UploadFile[];
  retryFile: (uid: string) => UploadFile | undefined;
  setFiles: (fileList: UploadFile[]) => void;
  submit: () => Promise<void>;
}

export interface UploadFileActions {
  preview: () => void;
  remove: () => void;
  retry: () => UploadFile | undefined;
}

export interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "type" | "onAbort" | "onChange" | "onDrop" | "onError" | "onProgress" | "value" | "defaultValue"> {
  beforeUpload?: (file: File, files: File[]) => boolean | Promise<boolean>;
  customRequest?: (options: UploadRequestOptions) => void | Promise<void>;
  defaultFileList?: UploadFile[];
  description?: React.ReactNode;
  drag?: boolean;
  fileList?: UploadFile[];
  label?: React.ReactNode;
  limit?: number;
  onChange?: (file: UploadFile, fileList: UploadFile[]) => void;
  onDrop?: (files: File[]) => void;
  onError?: (error: unknown, file: UploadFile, fileList: UploadFile[]) => void;
  onExceed?: (files: File[], fileList: UploadFile[]) => void;
  onFilesChange?: (files: File[]) => void;
  onPreview?: (file: UploadFile) => void;
  onProgress?: (percent: number, file: UploadFile, fileList: UploadFile[]) => void;
  onRemove?: (file: UploadFile, fileList: UploadFile[]) => void;
  onRetry?: (file: UploadFile, fileList: UploadFile[]) => void;
  onSuccess?: (response: unknown, file: UploadFile, fileList: UploadFile[]) => void;
  renderFile?: (file: UploadFile, actions: UploadFileActions, fileList: UploadFile[]) => React.ReactNode;
  showFileList?: boolean;
}

function fileToUploadFile(file: File): UploadFile {
  return {
    name: file.name,
    percent: 0,
    raw: file,
    size: file.size,
    status: "ready",
    type: file.type,
    uid: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`
  };
}

export const Upload = React.forwardRef<UploadRef, UploadProps>(
  (
    {
      beforeUpload,
      className,
      customRequest,
      defaultFileList = [],
      description,
      drag,
      fileList,
      id,
      label = "Choose file",
      limit,
      multiple,
      onChange,
      onDrop,
      onError,
      onExceed,
      onFilesChange,
      onPreview,
      onProgress,
      onRemove,
      onRetry,
      onSuccess,
      renderFile,
      showFileList = true,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const abortRef = React.useRef<AbortController | null>(null);
    const [internalFileList, setInternalFileList] = React.useState(defaultFileList);
    const currentFileList = fileList ?? internalFileList;

    function setFiles(nextFiles: UploadFile[]) {
      if (fileList === undefined) setInternalFileList(nextFiles);
    }

    async function addFiles(files: File[]) {
      const accepted: UploadFile[] = [];

      for (const file of files) {
        const allowed = beforeUpload ? await beforeUpload(file, files) : true;
        if (allowed) accepted.push(fileToUploadFile(file));
      }

      const availableSlots = typeof limit === "number" ? Math.max(0, limit - currentFileList.length) : accepted.length;
      const nextAccepted = accepted.slice(0, availableSlots);
      const exceeded = accepted.slice(availableSlots).map((item) => item.raw).filter(Boolean) as File[];
      const nextList = [...currentFileList, ...nextAccepted];

      if (exceeded.length > 0) onExceed?.(exceeded, currentFileList);
      setFiles(nextList);
      onFilesChange?.(nextAccepted.map((item) => item.raw).filter(Boolean) as File[]);
      nextAccepted.forEach((file) => onChange?.(file, nextList));
    }

    function replaceFile(nextFile: UploadFile) {
      const nextList = currentFileList.map((file) => (file.uid === nextFile.uid ? nextFile : file));
      setFiles(nextList);
      return nextList;
    }

    async function submit() {
      abortRef.current = new AbortController();
      const readyFiles = currentFileList.filter((file) => file.status === "ready" && file.raw);

      for (const file of readyFiles) {
        const uploading = { ...file, status: "uploading" as const };
        replaceFile(uploading);
        const request = customRequest;

        if (request) {
          await request({
            file: uploading,
            signal: abortRef.current.signal,
            onError: (error) => {
              const errored = { ...uploading, error, status: "error" as const };
              const nextList = replaceFile(errored);
              onError?.(error, errored, nextList);
            },
            onProgress: (percent) => {
              const progressed = { ...uploading, percent, status: "uploading" as const };
              const nextList = replaceFile(progressed);
              onProgress?.(percent, progressed, nextList);
            },
            onSuccess: (response) => {
              const succeeded = { ...uploading, percent: 100, response, status: "success" as const };
              const nextList = replaceFile(succeeded);
              onSuccess?.(response, succeeded, nextList);
            }
          });
        } else {
          const succeeded = { ...uploading, percent: 100, status: "success" as const };
          const nextList = replaceFile(succeeded);
          onSuccess?.(undefined, succeeded, nextList);
        }
      }
    }

    function retryFile(uid: string) {
      const file = currentFileList.find((item) => item.uid === uid);
      if (!file) return undefined;
      const retried: UploadFile = { ...file, error: undefined, percent: 0, response: undefined, status: "ready" };
      const nextList = replaceFile(retried);
      onRetry?.(retried, nextList);
      return retried;
    }

    React.useImperativeHandle(ref, () => ({
      abort: () => abortRef.current?.abort(),
      clearFiles: () => setFiles([]),
      getFiles: () => currentFileList,
      retryFile,
      setFiles,
      submit
    }), [currentFileList, retryFile, submit]);

    function removeFile(file: UploadFile) {
      const nextList = currentFileList.filter((item) => item.uid !== file.uid);
      setFiles(nextList);
      onRemove?.(file, nextList);
    }

    function fileActions(file: UploadFile): UploadFileActions {
      return {
        preview: () => onPreview?.(file),
        remove: () => removeFile(file),
        retry: () => retryFile(file.uid)
      };
    }

    return (
      <div className={cn("pinepost-upload", className)} data-drag={drag}>
        <label
          className="pinepost-upload__dropzone"
          htmlFor={inputId}
          onDragOver={(event) => {
            if (drag) event.preventDefault();
          }}
          onDrop={(event) => {
            if (!drag) return;
            event.preventDefault();
            const files = Array.from(event.dataTransfer.files ?? []);
            onDrop?.(files);
            void addFiles(files);
          }}
        >
          <span className="pinepost-upload__icon" aria-hidden="true" />
          <strong>{label}</strong>
          {description && <span>{description}</span>}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          onChange={(event) => {
            void addFiles(Array.from(event.currentTarget.files ?? []));
          }}
          multiple={multiple}
          type="file"
          {...props}
        />
        {showFileList && currentFileList.length > 0 && (
          <ul className="pinepost-upload__list">
            {currentFileList.map((file) => (
              <li key={file.uid} data-status={file.status}>
                {renderFile ? (
                  renderFile(file, fileActions(file), currentFileList)
                ) : (
                  <>
                    <button type="button" onClick={() => onPreview?.(file)}>
                      {file.name}
                    </button>
                    <span>
                      {file.status}
                      {file.status === "uploading" ? ` ${file.percent}%` : ""}
                    </span>
                    {file.status === "error" && (
                      <button type="button" onClick={() => retryFile(file.uid)}>
                        Retry
                      </button>
                    )}
                    <button aria-label={`Remove ${file.name}`} type="button" onClick={() => removeFile(file)}>
                      x
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
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
