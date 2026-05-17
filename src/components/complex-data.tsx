import * as React from "react";
import { cn } from "../lib/cn";
import type { TableColumn } from "./data-extras";
import type { TreeItem } from "./data-extras";

export interface VirtualizedTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<TableColumn<T>>;
  data: T[];
  height?: number;
  onRowClick?: (row: T, index: number) => void;
  rowHeight?: number;
  rowKey?: keyof T | ((row: T, index: number) => React.Key);
}

export function VirtualizedTable<T extends object>({
  className,
  columns,
  data,
  height = 260,
  onRowClick,
  rowHeight = 44,
  rowKey,
  ...props
}: VirtualizedTableProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 3);
  const endIndex = Math.min(data.length, startIndex + Math.ceil(height / rowHeight) + 7);
  const visibleRows = data.slice(startIndex, endIndex);

  function getRowKey(row: T, index: number) {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (rowKey) return row[rowKey] as React.Key;
    return index;
  }

  return (
    <div className={cn("pinepost-virtual-table", className)} {...props}>
      <table className="pinepost-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} style={{ textAlign: column.align }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div
        className="pinepost-virtual-table__body"
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        style={{ height, "--pinepost-row-height": `${rowHeight}px` } as React.CSSProperties}
      >
        <div style={{ height: data.length * rowHeight, position: "relative" }}>
          <table className="pinepost-table" style={{ left: 0, position: "absolute", right: 0, top: startIndex * rowHeight }}>
            <tbody>
              {visibleRows.map((row, windowIndex) => {
                const index = startIndex + windowIndex;

                return (
                  <tr key={getRowKey(row, index)} onClick={() => onRowClick?.(row, index)}>
                    {columns.map((column) => (
                      <td key={String(column.key)} style={{ textAlign: column.align }}>
                        {column.render
                          ? column.render(row, index)
                          : ((row as Record<string, React.ReactNode>)[String(column.key)] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export interface VirtualTreeItem extends TreeItem {}

interface FlatTreeItem extends VirtualTreeItem {
  level: number;
}

export interface VirtualizedTreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  defaultExpanded?: string[];
  height?: number;
  itemHeight?: number;
  items: VirtualTreeItem[];
  onExpandChange?: (expandedKeys: string[]) => void;
  onSelect?: (value: string, item: VirtualTreeItem) => void;
  selectedValue?: string;
}

function flattenVisibleTree(items: VirtualTreeItem[], expanded: Set<string>, level = 0): FlatTreeItem[] {
  return items.flatMap((item) => {
    const current = { ...item, level };
    if (item.children?.length && expanded.has(item.value)) {
      return [current, ...flattenVisibleTree(item.children, expanded, level + 1)];
    }
    return [current];
  });
}

export const VirtualizedTree = React.forwardRef<HTMLDivElement, VirtualizedTreeProps>(
  (
    {
      className,
      defaultExpanded = [],
      height = 260,
      itemHeight = 38,
      items,
      onExpandChange,
      onSelect,
      selectedValue,
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));
    const [scrollTop, setScrollTop] = React.useState(0);
    const flattened = flattenVisibleTree(items, expanded);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
    const endIndex = Math.min(flattened.length, startIndex + Math.ceil(height / itemHeight) + 7);
    const visibleItems = flattened.slice(startIndex, endIndex);

    function toggle(item: VirtualTreeItem) {
      setExpanded((current) => {
        const next = new Set(current);
        if (next.has(item.value)) next.delete(item.value);
        else next.add(item.value);
        onExpandChange?.(Array.from(next));
        return next;
      });
    }

    return (
      <div ref={ref} className={cn("pinepost-virtual-tree", className)} {...props}>
        <div
          className="pinepost-virtual-tree__body"
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          style={{ height, "--pinepost-tree-row-height": `${itemHeight}px` } as React.CSSProperties}
        >
          <div style={{ height: flattened.length * itemHeight, position: "relative" }}>
            <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
              {visibleItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const open = expanded.has(item.value);

                return (
                  <button
                    key={item.value}
                    className="pinepost-virtual-tree__row"
                    data-selected={selectedValue === item.value}
                    disabled={item.disabled}
                    onClick={() => (hasChildren ? toggle(item) : onSelect?.(item.value, item))}
                    style={{ "--pinepost-tree-level": item.level } as React.CSSProperties}
                    type="button"
                  >
                    <span aria-hidden="true">{hasChildren ? (open ? "-" : "+") : ""}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VirtualizedTree.displayName = "VirtualizedTree";

export interface TourStep {
  description?: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left" | "center";
  target?: string;
  title: React.ReactNode;
}

export interface TourProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  current?: number;
  defaultCurrent?: number;
  defaultOpen?: boolean;
  mask?: boolean;
  onClose?: () => void;
  onCurrentChange?: (current: number) => void;
  onFinish?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  steps: TourStep[];
}

export const Tour = React.forwardRef<HTMLDivElement, TourProps>(
  (
    {
      className,
      current,
      defaultCurrent = 0,
      defaultOpen = false,
      mask = true,
      onClose,
      onCurrentChange,
      onFinish,
      onOpenChange,
      open,
      steps,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [internalCurrent, setInternalCurrent] = React.useState(defaultCurrent);
    const visible = open ?? internalOpen;
    const activeIndex = current ?? internalCurrent;
    const activeStep = steps[activeIndex];

    function setOpen(nextOpen: boolean) {
      if (open === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
      if (!nextOpen) onClose?.();
    }

    function setCurrent(nextCurrent: number) {
      if (current === undefined) setInternalCurrent(nextCurrent);
      onCurrentChange?.(nextCurrent);
    }

    if (!visible || !activeStep) return null;

    return (
      <div ref={ref} className={cn("pinepost-tour", className)} data-mask={mask} {...props}>
        {mask && <div className="pinepost-tour__mask" />}
        <div className="pinepost-tour__card" data-placement={activeStep.placement ?? "center"}>
          <span className="pinepost-tour__count">
            {activeIndex + 1} / {steps.length}
          </span>
          <strong>{activeStep.title}</strong>
          {activeStep.description && <p>{activeStep.description}</p>}
          <div className="pinepost-tour__actions">
            <button disabled={activeIndex === 0} onClick={() => setCurrent(activeIndex - 1)} type="button">
              Previous
            </button>
            {activeIndex < steps.length - 1 ? (
              <button onClick={() => setCurrent(activeIndex + 1)} type="button">
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  onFinish?.();
                  setOpen(false);
                }}
                type="button"
              >
                Finish
              </button>
            )}
            <button aria-label="Close tour" onClick={() => setOpen(false)} type="button">
              x
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Tour.displayName = "Tour";
