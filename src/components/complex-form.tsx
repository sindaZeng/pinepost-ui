import * as React from "react";
import { cn } from "../lib/cn";

export interface CascaderOption {
  children?: CascaderOption[];
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
}

export interface CascaderRef {
  blur: () => void;
  clear: () => void;
  focus: () => void;
}

export interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  clearable?: boolean;
  defaultValue?: string[];
  disabled?: boolean;
  filterable?: boolean;
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  onExpandChange?: (value: string[]) => void;
  onValueChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  onVisibleChange?: (open: boolean) => void;
  options: CascaderOption[];
  placeholder?: React.ReactNode;
  showAllLevels?: boolean;
  value?: string[];
}

function findPath(options: CascaderOption[], values: string[]) {
  const selected: CascaderOption[] = [];
  let current = options;

  for (const value of values) {
    const next = current.find((item) => item.value === value);
    if (!next) break;
    selected.push(next);
    current = next.children ?? [];
  }

  return selected;
}

function getLevels(options: CascaderOption[], path: string[]) {
  const levels = [options];
  let current = options;

  for (const value of path) {
    const selected = current.find((item) => item.value === value);
    if (!selected?.children?.length) break;
    levels.push(selected.children);
    current = selected.children;
  }

  return levels;
}

function flattenOptions(options: CascaderOption[], parents: CascaderOption[] = []): CascaderOption[][] {
  return options.flatMap((option) => {
    const path = [...parents, option];
    return option.children?.length ? flattenOptions(option.children, path) : [path];
  });
}

function optionText(option: CascaderOption) {
  return typeof option.label === "string" ? option.label : option.value;
}

export const Cascader = React.forwardRef<CascaderRef, CascaderProps>(
  (
    {
      className,
      clearable,
      defaultValue = [],
      disabled,
      filterable,
      onChange,
      onExpandChange,
      onValueChange,
      onVisibleChange,
      options,
      placeholder = "Select",
      showAllLevels = true,
      value,
      ...props
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;
    const selectedOptions = findPath(options, currentValue);
    const activePath = selectedOptions.map((item) => item.value);
    const levels = getLevels(options, activePath);
    const flattened = React.useMemo(() => flattenOptions(options), [options]);
    const matches = query
      ? flattened.filter((path) => path.map(optionText).join(" / ").toLowerCase().includes(query.toLowerCase()))
      : [];
    const displayValue = selectedOptions.length
      ? showAllLevels
        ? selectedOptions.map(optionText).join(" / ")
        : optionText(selectedOptions[selectedOptions.length - 1])
      : "";

    function setOpenState(nextOpen: boolean) {
      setOpen(nextOpen);
      onVisibleChange?.(nextOpen);
    }

    function commit(nextValue: string[], path: CascaderOption[]) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue, path);
      onChange?.(nextValue, path);
    }

    React.useImperativeHandle(ref, () => ({
      blur: () => triggerRef.current?.blur(),
      clear: () => commit([], []),
      focus: () => triggerRef.current?.focus()
    }));

    return (
      <div className={cn("pinepost-cascader", className)} data-open={open} {...props}>
        <button
          ref={triggerRef}
          aria-expanded={open}
          className="pinepost-picker-trigger"
          disabled={disabled}
          onClick={() => setOpenState(!open)}
          type="button"
        >
          <span data-placeholder={!displayValue}>{displayValue || placeholder}</span>
          {clearable && displayValue ? (
            <span
              aria-label="Clear"
              className="pinepost-picker-trigger__clear"
              onClick={(event) => {
                event.stopPropagation();
                commit([], []);
              }}
              role="button"
              tabIndex={0}
            >
              x
            </span>
          ) : (
            <span aria-hidden="true">v</span>
          )}
        </button>
        {open && (
          <div className="pinepost-cascader__panel">
            {filterable && (
              <input
                aria-label="Filter options"
                className="pinepost-cascader__filter"
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Filter"
                value={query}
              />
            )}
            {query ? (
              <div className="pinepost-cascader__matches">
                {matches.map((path) => (
                  <button
                    key={path.map((item) => item.value).join("/")}
                    disabled={path[path.length - 1].disabled}
                    onClick={() => {
                      const nextValue = path.map((item) => item.value);
                      commit(nextValue, path);
                      setOpenState(false);
                    }}
                    type="button"
                  >
                    {path.map(optionText).join(" / ")}
                  </button>
                ))}
              </div>
            ) : (
              <div className="pinepost-cascader__menus">
                {levels.map((level, levelIndex) => (
                  <div key={levelIndex} className="pinepost-cascader__menu">
                    {level.map((option) => {
                      const nextPath = [...activePath.slice(0, levelIndex), option.value];
                      const selected = activePath[levelIndex] === option.value;
                      const pathOptions = findPath(options, nextPath);
                      const isLeaf = !option.children?.length;

                      return (
                        <button
                          key={option.value}
                          disabled={option.disabled}
                          data-active={selected}
                          onClick={() => {
                            onExpandChange?.(nextPath);
                            if (isLeaf) {
                              commit(nextPath, pathOptions);
                              setOpenState(false);
                            } else if (value === undefined) {
                              setInternalValue(nextPath);
                            }
                          }}
                          type="button"
                        >
                          <span>{option.label}</span>
                          {option.children?.length && <span aria-hidden="true">›</span>}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Cascader.displayName = "Cascader";

export interface TransferDataItem {
  description?: React.ReactNode;
  disabled?: boolean;
  key: string;
  label: React.ReactNode;
}

export interface TransferRef {
  clearChecked: () => void;
  moveToSource: (keys?: string[]) => void;
  moveToTarget: (keys?: string[]) => void;
}

export interface TransferProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  data: TransferDataItem[];
  defaultValue?: string[];
  filterable?: boolean;
  leftDefaultChecked?: string[];
  onChange?: (value: string[], direction: "left" | "right", movedKeys: string[]) => void;
  onLeftCheckChange?: (keys: string[]) => void;
  onRightCheckChange?: (keys: string[]) => void;
  renderItem?: (item: TransferDataItem) => React.ReactNode;
  rightDefaultChecked?: string[];
  titles?: [React.ReactNode, React.ReactNode];
  value?: string[];
}

export const Transfer = React.forwardRef<TransferRef, TransferProps>(
  (
    {
      className,
      data,
      defaultValue = [],
      filterable,
      leftDefaultChecked = [],
      onChange,
      onLeftCheckChange,
      onRightCheckChange,
      renderItem,
      rightDefaultChecked = [],
      titles = ["Source", "Target"],
      value,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [leftChecked, setLeftChecked] = React.useState(leftDefaultChecked);
    const [rightChecked, setRightChecked] = React.useState(rightDefaultChecked);
    const [leftQuery, setLeftQuery] = React.useState("");
    const [rightQuery, setRightQuery] = React.useState("");
    const targetKeys = value ?? internalValue;
    const targetSet = new Set(targetKeys);
    const sourceItems = data.filter((item) => !targetSet.has(item.key));
    const targetItems = data.filter((item) => targetSet.has(item.key));

    function includesLabel(item: TransferDataItem, query: string) {
      return String(typeof item.label === "string" ? item.label : item.key).toLowerCase().includes(query.toLowerCase());
    }

    function commit(nextValue: string[], direction: "left" | "right", movedKeys: string[]) {
      if (value === undefined) setInternalValue(nextValue);
      onChange?.(nextValue, direction, movedKeys);
    }

    function move(direction: "left" | "right", keys?: string[]) {
      const selectedKeys = keys ?? (direction === "right" ? leftChecked : rightChecked);
      const nextValue =
        direction === "right"
          ? Array.from(new Set([...targetKeys, ...selectedKeys]))
          : targetKeys.filter((key) => !selectedKeys.includes(key));
      commit(nextValue, direction, selectedKeys);
      if (direction === "right") {
        setLeftChecked([]);
        onLeftCheckChange?.([]);
      } else {
        setRightChecked([]);
        onRightCheckChange?.([]);
      }
    }

    React.useImperativeHandle(ref, () => ({
      clearChecked: () => {
        setLeftChecked([]);
        setRightChecked([]);
        onLeftCheckChange?.([]);
        onRightCheckChange?.([]);
      },
      moveToSource: (keys) => move("left", keys),
      moveToTarget: (keys) => move("right", keys)
    }));

    function renderList(items: TransferDataItem[], checked: string[], setChecked: (keys: string[]) => void, query: string, setQuery: (query: string) => void, title: React.ReactNode, onCheckChange?: (keys: string[]) => void) {
      const visibleItems = query ? items.filter((item) => includesLabel(item, query)) : items;

      return (
        <div className="pinepost-transfer__list">
          <strong>{title}</strong>
          {filterable && (
            <input
              aria-label={`Filter ${String(title)}`}
              className="pinepost-transfer__filter"
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Filter"
              value={query}
            />
          )}
          <div className="pinepost-transfer__body">
            {visibleItems.map((item) => {
              const selected = checked.includes(item.key);

              return (
                <label key={item.key} className="pinepost-transfer__item" data-disabled={item.disabled}>
                  <input
                    checked={selected}
                    disabled={item.disabled}
                    onChange={() => {
                      const next = selected ? checked.filter((key) => key !== item.key) : [...checked, item.key];
                      setChecked(next);
                      onCheckChange?.(next);
                    }}
                    type="checkbox"
                  />
                  <span>
                    {renderItem ? renderItem(item) : item.label}
                    {item.description && <small>{item.description}</small>}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className={cn("pinepost-transfer", className)} {...props}>
        {renderList(sourceItems, leftChecked, setLeftChecked, leftQuery, setLeftQuery, titles[0], onLeftCheckChange)}
        <div className="pinepost-transfer__actions">
          <button disabled={leftChecked.length === 0} onClick={() => move("right")} type="button">
            ›
          </button>
          <button disabled={rightChecked.length === 0} onClick={() => move("left")} type="button">
            ‹
          </button>
        </div>
        {renderList(targetItems, rightChecked, setRightChecked, rightQuery, setRightQuery, titles[1], onRightCheckChange)}
      </div>
    );
  }
);

Transfer.displayName = "Transfer";

export interface TreeSelectOption extends CascaderOption {}

export interface TreeSelectRef {
  blur: () => void;
  clear: () => void;
  focus: () => void;
}

export interface TreeSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  clearable?: boolean;
  data: TreeSelectOption[];
  defaultExpanded?: string[];
  defaultValue?: string | string[];
  filterable?: boolean;
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  onNodeClick?: (node: TreeSelectOption) => void;
  onValueChange?: (value: string | string[]) => void;
  onVisibleChange?: (open: boolean) => void;
  placeholder?: React.ReactNode;
  value?: string | string[];
}

function flattenTreeSelect(nodes: TreeSelectOption[], level = 0): Array<TreeSelectOption & { level: number }> {
  return nodes.flatMap((node) => [{ ...node, level }, ...(node.children ? flattenTreeSelect(node.children, level + 1) : [])]);
}

export const TreeSelect = React.forwardRef<TreeSelectRef, TreeSelectProps>(
  (
    {
      className,
      clearable,
      data,
      defaultExpanded = [],
      defaultValue,
      filterable,
      multiple,
      onChange,
      onNodeClick,
      onValueChange,
      onVisibleChange,
      placeholder = "Select",
      value,
      ...props
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));
    const [query, setQuery] = React.useState("");
    const fallbackValue = multiple ? [] : "";
    const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue ?? fallbackValue);
    const currentValue = value ?? internalValue;
    const allNodes = React.useMemo(() => flattenTreeSelect(data), [data]);
    const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
    const selectedLabels = allNodes
      .filter((node) => selectedValues.includes(node.value))
      .map(optionText)
      .join(", ");

    function setOpenState(nextOpen: boolean) {
      setOpen(nextOpen);
      onVisibleChange?.(nextOpen);
    }

    function commit(nextValue: string | string[]) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
      onChange?.(nextValue);
    }

    function toggleExpanded(node: TreeSelectOption) {
      setExpanded((current) => {
        const next = new Set(current);
        if (next.has(node.value)) next.delete(node.value);
        else next.add(node.value);
        return next;
      });
    }

    function renderNode(node: TreeSelectOption, level = 0): React.ReactNode {
      const hasChildren = Boolean(node.children?.length);
      const isOpen = expanded.has(node.value);
      const selected = selectedValues.includes(node.value);
      const hidden = query && !optionText(node).toLowerCase().includes(query.toLowerCase());

      if (hidden && !hasChildren) return null;

      return (
        <React.Fragment key={node.value}>
          <button
            className="pinepost-tree-select__node"
            data-selected={selected}
            disabled={node.disabled}
            onClick={() => {
              onNodeClick?.(node);
              if (hasChildren) {
                toggleExpanded(node);
              } else if (multiple) {
                const next = selected ? selectedValues.filter((item) => item !== node.value) : [...selectedValues, node.value];
                commit(next);
              } else {
                commit(node.value);
                setOpenState(false);
              }
            }}
            style={{ "--pinepost-tree-level": level } as React.CSSProperties}
            type="button"
          >
            <span aria-hidden="true">{hasChildren ? (isOpen ? "-" : "+") : ""}</span>
            {multiple && !hasChildren && <input readOnly checked={selected} tabIndex={-1} type="checkbox" />}
            {node.label}
          </button>
          {hasChildren && (isOpen || query) && node.children?.map((child) => renderNode(child, level + 1))}
        </React.Fragment>
      );
    }

    React.useImperativeHandle(ref, () => ({
      blur: () => triggerRef.current?.blur(),
      clear: () => commit(multiple ? [] : ""),
      focus: () => triggerRef.current?.focus()
    }));

    return (
      <div className={cn("pinepost-tree-select", className)} data-open={open} {...props}>
        <button
          ref={triggerRef}
          aria-expanded={open}
          className="pinepost-picker-trigger"
          onClick={() => setOpenState(!open)}
          type="button"
        >
          <span data-placeholder={!selectedLabels}>{selectedLabels || placeholder}</span>
          {clearable && selectedLabels ? (
            <span
              aria-label="Clear"
              className="pinepost-picker-trigger__clear"
              onClick={(event) => {
                event.stopPropagation();
                commit(multiple ? [] : "");
              }}
              role="button"
              tabIndex={0}
            >
              x
            </span>
          ) : (
            <span aria-hidden="true">v</span>
          )}
        </button>
        {open && (
          <div className="pinepost-tree-select__panel">
            {filterable && (
              <input
                aria-label="Filter tree"
                className="pinepost-cascader__filter"
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Filter"
                value={query}
              />
            )}
            <div className="pinepost-tree-select__body">{data.map((node) => renderNode(node))}</div>
          </div>
        )}
      </div>
    );
  }
);

TreeSelect.displayName = "TreeSelect";

export interface VirtualizedSelectOption {
  disabled?: boolean;
  group?: React.ReactNode;
  label: React.ReactNode;
  value: string;
}

export interface VirtualizedSelectRef {
  blur: () => void;
  clear: () => void;
  focus: () => void;
}

export interface VirtualizedSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  clearable?: boolean;
  defaultValue?: string | string[];
  filterable?: boolean;
  height?: number;
  itemHeight?: number;
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  onClear?: () => void;
  onValueChange?: (value: string | string[]) => void;
  options: VirtualizedSelectOption[];
  placeholder?: React.ReactNode;
  remoteMethod?: (query: string) => void;
  value?: string | string[];
}

export const VirtualizedSelect = React.forwardRef<VirtualizedSelectRef, VirtualizedSelectProps>(
  (
    {
      className,
      clearable,
      defaultValue,
      filterable,
      height = 220,
      itemHeight = 38,
      multiple,
      onChange,
      onClear,
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
    const [scrollTop, setScrollTop] = React.useState(0);
    const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue ?? (multiple ? [] : ""));
    const currentValue = value ?? internalValue;
    const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
    const visibleOptions = query
      ? options.filter((option) => String(option.label).toLowerCase().includes(query.toLowerCase()))
      : options;
    const selected = options.filter((option) => selectedValues.includes(option.value));
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
    const endIndex = Math.min(visibleOptions.length, startIndex + Math.ceil(height / itemHeight) + 5);
    const windowed = visibleOptions.slice(startIndex, endIndex);
    const displayValue = selected.map((option) => (typeof option.label === "string" ? option.label : option.value)).join(", ");

    function commit(nextValue: string | string[]) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
      onChange?.(nextValue);
    }

    function clear() {
      commit(multiple ? [] : "");
      onClear?.();
    }

    React.useImperativeHandle(ref, () => ({
      blur: () => triggerRef.current?.blur(),
      clear,
      focus: () => triggerRef.current?.focus()
    }));

    return (
      <div className={cn("pinepost-virtual-select", className)} {...props}>
        <button ref={triggerRef} className="pinepost-picker-trigger" onClick={() => setOpen(!open)} type="button">
          <span data-placeholder={!displayValue}>{displayValue || placeholder}</span>
          {clearable && selectedValues.length > 0 ? (
            <span
              aria-label="Clear"
              className="pinepost-picker-trigger__clear"
              onClick={(event) => {
                event.stopPropagation();
                clear();
              }}
              role="button"
              tabIndex={0}
            >
              x
            </span>
          ) : (
            <span aria-hidden="true">v</span>
          )}
        </button>
        {open && (
          <div className="pinepost-virtual-select__panel">
            {filterable && (
              <input
                aria-label="Filter virtual select"
                className="pinepost-cascader__filter"
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                  remoteMethod?.(event.currentTarget.value);
                }}
                placeholder="Filter"
                value={query}
              />
            )}
            <div
              className="pinepost-virtual-select__list"
              onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
              style={{ height, "--pinepost-item-height": `${itemHeight}px` } as React.CSSProperties}
            >
              <div style={{ height: visibleOptions.length * itemHeight, position: "relative" }}>
                <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
                  {windowed.map((option) => (
                    <button
                      key={option.value}
                      disabled={option.disabled}
                      data-selected={selectedValues.includes(option.value)}
                      onClick={() => {
                        if (multiple) {
                          const next = selectedValues.includes(option.value)
                            ? selectedValues.filter((item) => item !== option.value)
                            : [...selectedValues, option.value];
                          commit(next);
                        } else {
                          commit(option.value);
                          setOpen(false);
                        }
                      }}
                      type="button"
                    >
                      {multiple && <input checked={selectedValues.includes(option.value)} readOnly tabIndex={-1} type="checkbox" />}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VirtualizedSelect.displayName = "VirtualizedSelect";

export interface InputTagProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  clearable?: boolean;
  defaultValue?: string[];
  max?: number;
  onChange?: (value: string[]) => void;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  value?: string[];
}

export const InputTag = React.forwardRef<HTMLInputElement, InputTagProps>(
  ({ className, clearable, defaultValue = [], max, onChange, onValueChange, placeholder = "Add tag", value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [draft, setDraft] = React.useState("");
    const tags = value ?? internalValue;

    function commit(nextTags: string[]) {
      if (value === undefined) setInternalValue(nextTags);
      onValueChange?.(nextTags);
      onChange?.(nextTags);
    }

    function addTag() {
      const nextTag = draft.trim();
      if (!nextTag || tags.includes(nextTag) || (typeof max === "number" && tags.length >= max)) return;
      commit([...tags, nextTag]);
      setDraft("");
    }

    return (
      <div className={cn("pinepost-input-tag", className)} {...props}>
        {tags.map((tag) => (
          <span key={tag} className="pinepost-input-tag__tag">
            {tag}
            <button aria-label={`Remove ${tag}`} onClick={() => commit(tags.filter((item) => item !== tag))} type="button">
              x
            </button>
          </span>
        ))}
        <input
          ref={ref}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            } else if (event.key === "Backspace" && !draft && tags.length) {
              commit(tags.slice(0, -1));
            }
          }}
          placeholder={placeholder}
          value={draft}
        />
        {clearable && tags.length > 0 && (
          <button aria-label="Clear tags" className="pinepost-input-tag__clear" onClick={() => commit([])} type="button">
            x
          </button>
        )}
      </div>
    );
  }
);

InputTag.displayName = "InputTag";

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: string;
  length?: number;
  mask?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onValueChange?: (value: string) => void;
  value?: string;
}

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, defaultValue = "", length = 6, mask, onChange, onComplete, onValueChange, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    function commit(nextValue: string) {
      const normalized = nextValue.slice(0, length);
      if (value === undefined) setInternalValue(normalized);
      onValueChange?.(normalized);
      onChange?.(normalized);
      if (normalized.length === length) onComplete?.(normalized);
    }

    return (
      <div ref={ref} className={cn("pinepost-input-otp", className)} {...props}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(node) => {
              inputRefs.current[index] = node;
            }}
            aria-label={`Code digit ${index + 1}`}
            inputMode="numeric"
            maxLength={1}
            onChange={(event) => {
              const chars = currentValue.padEnd(length).split("");
              chars[index] = event.currentTarget.value.slice(-1);
              const next = chars.join("").trimEnd();
              commit(next);
              if (event.currentTarget.value && index < length - 1) inputRefs.current[index + 1]?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !currentValue[index] && index > 0) inputRefs.current[index - 1]?.focus();
            }}
            type={mask ? "password" : "text"}
            value={currentValue[index] ?? ""}
          />
        ))}
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";

export interface MentionOption {
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
}

export interface MentionProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "defaultValue" | "onChange" | "onSelect" | "prefix" | "value"> {
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (pattern: string, prefix: string) => void;
  onSelect?: (option: MentionOption, prefix: string) => void;
  options: MentionOption[];
  prefix?: string | string[];
  value?: string;
}

export const Mention = React.forwardRef<HTMLTextAreaElement, MentionProps>(
  ({ className, defaultValue = "", onChange, onSearch, onSelect, options, prefix = "@", value, ...props }, ref) => {
    const prefixes = Array.isArray(prefix) ? prefix : [prefix];
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [search, setSearch] = React.useState<{ pattern: string; prefix: string } | null>(null);
    const currentValue = value ?? internalValue;
    const matches = search
      ? options.filter((option) => option.value.toLowerCase().includes(search.pattern.toLowerCase()))
      : [];

    function update(nextValue: string) {
      if (value === undefined) setInternalValue(nextValue);
      onChange?.(nextValue);
      const parts = nextValue.split(/\s/);
      const current = parts[parts.length - 1] ?? "";
      const activePrefix = prefixes.find((item) => current.startsWith(item));
      if (activePrefix) {
        const pattern = current.slice(activePrefix.length);
        setSearch({ pattern, prefix: activePrefix });
        onSearch?.(pattern, activePrefix);
      } else {
        setSearch(null);
      }
    }

    function selectOption(option: MentionOption) {
      if (!search) return;
      const parts = currentValue.split(/\s/);
      parts[parts.length - 1] = `${search.prefix}${option.value}`;
      const nextValue = `${parts.join(" ")} `;
      update(nextValue);
      setSearch(null);
      onSelect?.(option, search.prefix);
    }

    return (
      <div className={cn("pinepost-mention", className)}>
        <textarea ref={ref} className="pinepost-textarea" onChange={(event) => update(event.currentTarget.value)} value={currentValue} {...props} />
        {search && matches.length > 0 && (
          <div className="pinepost-mention__panel">
            {matches.map((option) => (
              <button
                key={option.value}
                disabled={option.disabled}
                onClick={() => selectOption(option)}
                type="button"
              >
                {option.label}
                <small>{search.prefix}{option.value}</small>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Mention.displayName = "Mention";

export interface TimeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value" | "defaultValue"> {
  defaultValue?: string;
  end?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  start?: string;
  step?: string;
  value?: string;
}

function toMinutes(time: string) {
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}

function toTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export const TimeSelect = React.forwardRef<HTMLSelectElement, TimeSelectProps>(
  ({ className, defaultValue = "", end = "18:00", onChange, onValueChange, start = "09:00", step = "00:30", value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;
    const stepMinutes = Math.max(1, toMinutes(step));
    const options = [];

    for (let current = toMinutes(start); current <= toMinutes(end); current += stepMinutes) {
      options.push(toTime(current));
    }

    return (
      <select
        ref={ref}
        className={cn("pinepost-time-select", "pinepost-input", className)}
        onChange={(event) => {
          if (value === undefined) setInternalValue(event.currentTarget.value);
          onValueChange?.(event.currentTarget.value);
          onChange?.(event.currentTarget.value);
        }}
        value={currentValue}
        {...props}
      >
        <option value="">Select time</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);

TimeSelect.displayName = "TimeSelect";
