import * as React from "react";
import { cn } from "../lib/cn";
import type { TableColumn, TableRef, TableSortOrder, TableSortState } from "./data-extras";
import type { TreeItem } from "./data-extras";

export interface VirtualizedTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<TableColumn<T>>;
  data: T[];
  defaultSelectedRowKeys?: React.Key[];
  emptyText?: React.ReactNode;
  height?: number;
  loading?: boolean;
  loadingText?: React.ReactNode;
  onRowClick?: (row: T, index: number) => void;
  onSelectionChange?: (rows: T[], keys: React.Key[]) => void;
  onSortChange?: (state?: TableSortState<T>) => void;
  onVisibleRangeChange?: (range: VirtualizedTableVisibleRange) => void;
  rowHeight?: number;
  rowKey?: keyof T | ((row: T, index: number) => React.Key);
  selectable?: boolean;
  selectedRowKeys?: React.Key[];
  sortState?: TableSortState<T>;
}

export interface VirtualizedTableVisibleRange {
  endIndex: number;
  startIndex: number;
}

function getCellValue<T extends object>(row: T, key: keyof T | string) {
  return (row as Record<string, React.ReactNode>)[String(key)] as React.ReactNode;
}

function defaultCompare<T extends object>(left: T, right: T, key: keyof T | string) {
  const leftValue = getCellValue(left, key);
  const rightValue = getCellValue(right, key);
  if (typeof leftValue === "number" && typeof rightValue === "number") return leftValue - rightValue;
  return String(leftValue ?? "").localeCompare(String(rightValue ?? ""));
}

function VirtualizedTableInner<T extends object>({
  className,
  columns,
  data,
  defaultSelectedRowKeys = [],
  emptyText = "No rows",
  height = 260,
  loading,
  loadingText = "Loading...",
  onRowClick,
  onSelectionChange,
  onSortChange,
  onVisibleRangeChange,
  rowHeight = 44,
  rowKey,
  selectable,
  selectedRowKeys,
  sortState,
  ...props
}: VirtualizedTableProps<T>, ref: React.ForwardedRef<VirtualizedTableRef<T>>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<React.Key[]>(defaultSelectedRowKeys);
  const [internalSortState, setInternalSortState] = React.useState<TableSortState<T> | undefined>();
  const activeSort = sortState ?? internalSortState;
  const currentSelectedKeys = selectedRowKeys ?? internalSelectedKeys;
  const lastVisibleRangeRef = React.useRef<VirtualizedTableVisibleRange | undefined>(undefined);
  const onVisibleRangeChangeRef = React.useRef(onVisibleRangeChange);
  const sortedData = React.useMemo(() => {
    if (!activeSort) return data;
    const column = columns.find((item) => String(item.key) === String(activeSort.key));
    if (!column) return data;
    const compare =
      typeof column.sortable === "function"
        ? column.sortable
        : (left: T, right: T) => defaultCompare(left, right, activeSort.key);
    return [...data].sort((left, right) => compare(left, right) * (activeSort.order === "asc" ? 1 : -1));
  }, [activeSort, columns, data]);
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 3);
  const endIndex = Math.min(sortedData.length, startIndex + Math.ceil(height / rowHeight) + 7);
  const visibleRows = sortedData.slice(startIndex, endIndex);

  function getRowKey(row: T, index: number) {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (rowKey) return row[rowKey] as React.Key;
    return index;
  }

  function commitSelection(nextKeys: React.Key[]) {
    if (selectedRowKeys === undefined) setInternalSelectedKeys(nextKeys);
    const keySet = new Set(nextKeys);
    onSelectionChange?.(data.filter((row, index) => keySet.has(getRowKey(row, index))), nextKeys);
  }

  function setSort(nextSort?: TableSortState<T>) {
    if (sortState === undefined) setInternalSortState(nextSort);
    onSortChange?.(nextSort);
  }

  function toggleSort(column: TableColumn<T>) {
    if (!column.sortable) return;
    const nextOrder: TableSortOrder = activeSort?.key === column.key && activeSort.order === "asc" ? "desc" : "asc";
    setSort({ key: column.key, order: nextOrder });
  }

  React.useEffect(() => {
    onVisibleRangeChangeRef.current = onVisibleRangeChange;
  }, [onVisibleRangeChange]);

  React.useEffect(() => {
    const previousRange = lastVisibleRangeRef.current;
    if (previousRange?.startIndex === startIndex && previousRange.endIndex === endIndex) return;

    const nextRange = { startIndex, endIndex };
    lastVisibleRangeRef.current = nextRange;
    onVisibleRangeChangeRef.current?.(nextRange);
  }, [endIndex, startIndex]);

  React.useImperativeHandle(ref, () => ({
    clearExpansion: () => undefined,
    clearSelection: () => commitSelection([]),
    clearSort: () => setSort(undefined),
    getExpandedRows: () => [],
    getColumnOrder: () => columns.map((column) => String(column.key)),
    getSelectionKeys: () => currentSelectedKeys,
    getSelectionRows: () => {
      const keySet = new Set(currentSelectedKeys);
      return data.filter((row, index) => keySet.has(getRowKey(row, index)));
    },
    getSortState: () => activeSort,
    getViewPreset: () => undefined,
    getVisibleColumns: () => columns,
    resetColumnOrder: () => undefined,
    setCurrentRow: () => undefined,
    setColumnHidden: () => undefined,
    setColumnOrder: () => undefined,
    setColumnWidth: () => undefined,
    setViewPreset: () => undefined,
    sort: (key, order = "asc") => setSort({ key, order }),
    toggleRowExpansion: () => undefined,
    toggleRowSelection: (row, selected) => {
      const rowIndex = data.indexOf(row);
      const key = getRowKey(row, rowIndex >= 0 ? rowIndex : data.length);
      const nextSelected = selected ?? !currentSelectedKeys.includes(key);
      commitSelection(nextSelected ? Array.from(new Set([...currentSelectedKeys, key])) : currentSelectedKeys.filter((item) => item !== key));
    }
  }), [activeSort, columns, currentSelectedKeys, data]);

  return (
    <div className={cn("pinepost-virtual-table", className)} {...props}>
      <table className="pinepost-table">
        <thead>
          <tr>
            {selectable && <th aria-label="Selection" />}
            {columns.map((column) => (
              <th key={String(column.key)} style={{ textAlign: column.align }}>
                {column.sortable ? (
                  <button className="pinepost-table__sort" onClick={() => toggleSort(column)} type="button">
                    {column.title}
                  </button>
                ) : (
                  column.title
                )}
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
        <div style={{ height: sortedData.length * rowHeight, position: "relative" }}>
          <table className="pinepost-table" style={{ left: 0, position: "absolute", right: 0, top: startIndex * rowHeight }}>
            <tbody>
              {visibleRows.map((row, windowIndex) => {
                const index = startIndex + windowIndex;
                const key = getRowKey(row, data.indexOf(row));
                const selected = currentSelectedKeys.includes(key);

                return (
                  <tr key={key} data-selected={selected} onClick={() => onRowClick?.(row, index)}>
                    {selectable && (
                      <td>
                        <input
                          aria-label={`Select ${String(getCellValue(row, columns[0]?.key ?? ""))}`}
                          checked={selected}
                          onChange={(event) => {
                            const nextKeys = event.currentTarget.checked
                              ? Array.from(new Set([...currentSelectedKeys, key]))
                              : currentSelectedKeys.filter((item) => item !== key);
                            commitSelection(nextKeys);
                          }}
                          onClick={(event) => event.stopPropagation()}
                          type="checkbox"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={String(column.key)} style={{ textAlign: column.align }}>
                        {column.render
                          ? column.render(row, index)
                          : getCellValue(row, column.key)}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {loading && (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)}>
                    <div className="pinepost-virtual-table__state" role="status">
                      {loadingText}
                    </div>
                  </td>
                </tr>
              )}
              {!loading && sortedData.length === 0 && (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)}>
                    <div className="pinepost-virtual-table__state">{emptyText}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export interface VirtualizedTableRef<T> extends TableRef<T> {}

export const VirtualizedTable = React.forwardRef(VirtualizedTableInner) as <T extends object>(
  props: VirtualizedTableProps<T> & React.RefAttributes<VirtualizedTableRef<T>>
) => React.ReactElement;

export interface VirtualTreeItem extends TreeItem {}

interface FlatTreeItem extends VirtualTreeItem {
  level: number;
}

export interface VirtualizedTreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  checkable?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  defaultExpanded?: string[];
  expandedKeys?: string[];
  height?: number;
  itemHeight?: number;
  items: VirtualTreeItem[];
  onCheckChange?: (checkedKeys: string[]) => void;
  onExpandChange?: (expandedKeys: string[]) => void;
  onNodeClick?: (item: VirtualTreeItem) => void;
  onSelect?: (value: string, item: VirtualTreeItem) => void;
  selectedValue?: string;
}

export interface VirtualizedTreeRef {
  clearChecked: () => void;
  filter: (query: string) => void;
  getCheckedKeys: () => string[];
  getExpandedKeys: () => string[];
  setCheckedKeys: (keys: string[]) => void;
  setExpandedKeys: (keys: string[]) => void;
}

function treeLabelText(item: VirtualTreeItem) {
  return typeof item.label === "string" ? item.label : item.value;
}

function virtualTreeMatches(item: VirtualTreeItem, query: string): boolean {
  if (!query) return true;
  return treeLabelText(item).toLowerCase().includes(query.toLowerCase()) || Boolean(item.children?.some((child) => virtualTreeMatches(child, query)));
}

function flattenVisibleTree(items: VirtualTreeItem[], expanded: Set<string>, query: string, level = 0): FlatTreeItem[] {
  return items.flatMap((item) => {
    if (!virtualTreeMatches(item, query)) return [];
    const current = { ...item, level };
    if (item.children?.length && expanded.has(item.value)) {
      return [current, ...flattenVisibleTree(item.children, expanded, query, level + 1)];
    }
    return [current];
  });
}

export const VirtualizedTree = React.forwardRef<VirtualizedTreeRef, VirtualizedTreeProps>(
  (
    {
      checkable,
      checkedKeys,
      className,
      defaultCheckedKeys = [],
      defaultExpanded = [],
      expandedKeys,
      height = 260,
      itemHeight = 38,
      items,
      onCheckChange,
      onExpandChange,
      onNodeClick,
      onSelect,
      selectedValue,
      ...props
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [internalExpanded, setInternalExpanded] = React.useState(() => new Set(defaultExpanded));
    const [internalChecked, setInternalChecked] = React.useState(() => new Set(defaultCheckedKeys));
    const [query, setQuery] = React.useState("");
    const [scrollTop, setScrollTop] = React.useState(0);
    const expanded = React.useMemo(() => new Set(expandedKeys ?? Array.from(internalExpanded)), [expandedKeys, internalExpanded]);
    const checked = React.useMemo(() => new Set(checkedKeys ?? Array.from(internalChecked)), [checkedKeys, internalChecked]);
    const flattened = flattenVisibleTree(items, expanded, query);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
    const endIndex = Math.min(flattened.length, startIndex + Math.ceil(height / itemHeight) + 7);
    const visibleItems = flattened.slice(startIndex, endIndex);

    function commitExpanded(next: Set<string>) {
      if (expandedKeys === undefined) setInternalExpanded(next);
      onExpandChange?.(Array.from(next));
    }

    function commitChecked(next: Set<string>) {
      if (checkedKeys === undefined) setInternalChecked(next);
      onCheckChange?.(Array.from(next));
    }

    function toggle(item: VirtualTreeItem) {
      const next = new Set(expanded);
      if (next.has(item.value)) next.delete(item.value);
      else next.add(item.value);
      commitExpanded(next);
    }

    function toggleChecked(item: VirtualTreeItem, selected: boolean) {
      const next = new Set(checked);
      if (selected) next.add(item.value);
      else next.delete(item.value);
      commitChecked(next);
    }

    React.useImperativeHandle(ref, () => ({
      clearChecked: () => commitChecked(new Set()),
      filter: setQuery,
      getCheckedKeys: () => Array.from(checked),
      getExpandedKeys: () => Array.from(expanded),
      setCheckedKeys: (keys) => commitChecked(new Set(keys)),
      setExpandedKeys: (keys) => commitExpanded(new Set(keys))
    }), [checked, expanded]);

    return (
      <div ref={rootRef} className={cn("pinepost-virtual-tree", className)} {...props}>
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
                    onClick={() => {
                      onNodeClick?.(item);
                      if (hasChildren) toggle(item);
                      else onSelect?.(item.value, item);
                    }}
                    style={{ "--pinepost-tree-level": item.level } as React.CSSProperties}
                    type="button"
                  >
                    <span aria-hidden="true">{hasChildren ? (open ? "-" : "+") : ""}</span>
                    {checkable && (
                      <input
                        aria-label={treeLabelText(item)}
                        checked={checked.has(item.value)}
                        disabled={item.disabled}
                        onChange={(event) => toggleChecked(item, event.currentTarget.checked)}
                        onClick={(event) => event.stopPropagation()}
                        readOnly={false}
                        type="checkbox"
                      />
                    )}
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
