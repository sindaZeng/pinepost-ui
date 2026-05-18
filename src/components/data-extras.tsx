import * as React from "react";
import { cn } from "../lib/cn";

export interface TableColumn<T> {
  align?: "left" | "center" | "right";
  children?: Array<TableColumn<T>>;
  editable?: boolean;
  filter?: (row: T) => boolean;
  fixed?: "left" | "right";
  key: keyof T | string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean | ((left: T, right: T) => number);
  title: React.ReactNode;
  width?: number | string;
}

export type TableSortOrder = "asc" | "desc";

export interface TableSortState<T> {
  key: keyof T | string;
  order: TableSortOrder;
}

export type TableColumnWidth = number | string;
export type TableColumnWidthMap = Partial<Record<string, TableColumnWidth>>;

export interface TableViewPreset<T> {
  columnWidths?: TableColumnWidthMap;
  columnOrder?: Array<keyof T | string>;
  hiddenColumns?: Array<keyof T | string>;
  key: string;
  label: React.ReactNode;
  sortState?: TableSortState<T>;
}

export type TableViewPresetValidationCode =
  | "invalid-active"
  | "invalid-json"
  | "invalid-preset"
  | "invalid-sort"
  | "invalid-width";

export interface TableViewPresetValidationIssue {
  code: TableViewPresetValidationCode;
  field?: string;
  message: string;
  presetKey?: string;
}

export interface TableViewPresetExportItem {
  columnOrder?: string[];
  columnWidths?: TableColumnWidthMap;
  hiddenColumns?: string[];
  key: string;
  label: string;
  sortState?: TableSortState<Record<string, unknown>>;
}

export interface TableViewPresetExport {
  activeKey?: string;
  presets: TableViewPresetExportItem[];
  version: 1;
}

export interface TableViewPresetParseResult {
  issues: TableViewPresetValidationIssue[];
  presets: Array<TableViewPreset<Record<string, unknown>>>;
  value?: TableViewPresetExport;
}

export interface TableFilterTag {
  key: string;
  label: React.ReactNode;
}

export type TableDensity = "compact" | "comfortable" | "spacious";

export interface TableRef<T> {
  clearExpansion: () => void;
  clearSelection: () => void;
  clearSort: () => void;
  getExpandedRows: () => T[];
  getColumnOrder: () => string[];
  getSelectionKeys: () => React.Key[];
  getSelectionRows: () => T[];
  getSortState: () => TableSortState<T> | undefined;
  getViewPreset: () => string | undefined;
  getVisibleColumns: () => Array<TableColumn<T>>;
  resetColumnOrder: () => void;
  setCurrentRow: (row?: T) => void;
  setColumnHidden: (key: keyof T | string, hidden?: boolean) => void;
  setColumnOrder: (order: Array<keyof T | string>) => void;
  setColumnWidth: (key: keyof T | string, width: TableColumnWidth) => void;
  setViewPreset: (key: string) => void;
  sort: (key: keyof T | string, order?: TableSortOrder) => void;
  toggleRowExpansion: (row: T, expanded?: boolean) => void;
  toggleRowSelection: (row: T, selected?: boolean) => void;
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columnOrder?: Array<keyof T | string>;
  columnWidths?: TableColumnWidthMap;
  columns: Array<TableColumn<T>>;
  data: T[];
  defaultColumnOrder?: Array<keyof T | string>;
  defaultColumnWidths?: TableColumnWidthMap;
  defaultExpandedRowKeys?: React.Key[];
  defaultHiddenColumns?: Array<keyof T | string>;
  defaultSelectedRowKeys?: React.Key[];
  defaultViewPreset?: string;
  density?: TableDensity;
  editable?: boolean;
  emptyText?: React.ReactNode;
  filterTags?: TableFilterTag[];
  expandedRowKeys?: React.Key[];
  filters?: Partial<Record<string, (row: T) => boolean>>;
  hiddenColumns?: Array<keyof T | string>;
  loading?: boolean;
  loadingText?: React.ReactNode;
  onCellClick?: (row: T, column: TableColumn<T>, rowIndex: number) => void;
  onCellEdit?: (row: T, key: keyof T | string, value: string) => void;
  onColumnOrderChange?: (columnOrder: string[]) => void;
  onColumnResize?: (key: keyof T | string, width: TableColumnWidth, widths: TableColumnWidthMap) => void;
  onColumnVisibilityChange?: (hiddenColumns: string[]) => void;
  onCurrentChange?: (row?: T) => void;
  onExpandChange?: (expandedKeys: React.Key[]) => void;
  onFilterClear?: (key?: string) => void;
  onRowClick?: (row: T, index: number) => void;
  onSelectionChange?: (rows: T[], keys: React.Key[]) => void;
  onSortChange?: (state?: TableSortState<T>) => void;
  onViewPresetChange?: (key: string, preset: TableViewPreset<T>) => void;
  renderExpandedRow?: (row: T, index: number) => React.ReactNode;
  rowKey?: keyof T | ((row: T, index: number) => React.Key);
  resizableColumns?: boolean;
  selectable?: boolean;
  selectedRowKeys?: React.Key[];
  sortState?: TableSortState<T>;
  summary?: Partial<Record<string, React.ReactNode>> | ((rows: T[]) => Partial<Record<string, React.ReactNode>>);
  viewPreset?: string;
  viewPresetLabel?: React.ReactNode;
  viewPresets?: Array<TableViewPreset<T>>;
  viewStorageKey?: string;
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

function flattenColumns<T>(columns: Array<TableColumn<T>>): Array<TableColumn<T>> {
  return columns.flatMap((column) => column.children?.length ? flattenColumns(column.children) : [column]);
}

function leafCount<T>(column: TableColumn<T>) {
  return flattenColumns([column]).length;
}

function filterVisibleColumns<T>(columns: Array<TableColumn<T>>, hidden: Set<string>): Array<TableColumn<T>> {
  return columns.flatMap((column) => {
    if (column.children?.length) {
      const children = filterVisibleColumns(column.children, hidden);
      return children.length ? [{ ...column, children }] : [];
    }

    return hidden.has(String(column.key)) ? [] : [column];
  });
}

function findTablePreset<T>(presets: Array<TableViewPreset<T>>, key?: string) {
  return key ? presets.find((preset) => preset.key === key) : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringList(value: unknown) {
  return Array.isArray(value) ? value.map(String) : undefined;
}

function serializableColumnWidths(value: unknown, issues?: TableViewPresetValidationIssue[], presetKey?: string) {
  if (!isRecord(value)) return undefined;
  const entries = Object.entries(value).filter(([, width]) => {
    const valid = typeof width === "number" || typeof width === "string";
    if (!valid) {
      issues?.push({
        code: "invalid-width",
        field: "columnWidths",
        message: "Table preset column widths must be numbers or strings.",
        presetKey
      });
    }
    return valid;
  });
  return entries.length > 0 ? Object.fromEntries(entries) as TableColumnWidthMap : undefined;
}

function serializableSortState(
  value: unknown,
  issues?: TableViewPresetValidationIssue[],
  presetKey?: string
): TableSortState<Record<string, unknown>> | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value) || typeof value.key !== "string" || (value.order !== "asc" && value.order !== "desc")) {
    issues?.push({
      code: "invalid-sort",
      field: "sortState",
      message: "Table preset sort state must include a key and asc or desc order.",
      presetKey
    });
    return undefined;
  }
  const order: TableSortOrder = value.order;
  return { key: value.key, order };
}

function presetLabelText(label: React.ReactNode, fallback: string) {
  if (typeof label === "string" || typeof label === "number") return String(label);
  return fallback;
}

export function createTableViewPresetExport<T>({
  activeKey,
  presets
}: {
  activeKey?: string;
  presets: Array<TableViewPreset<T>>;
}): TableViewPresetExport {
  const items = presets
    .filter((preset) => preset.key.trim())
    .map((preset) => {
      const columnOrder = preset.columnOrder?.map(String);
      const hiddenColumns = preset.hiddenColumns?.map(String);
      const columnWidths = serializableColumnWidths(preset.columnWidths);
      const sortState = serializableSortState(preset.sortState);

      return {
        ...(columnOrder?.length ? { columnOrder } : {}),
        ...(columnWidths ? { columnWidths } : {}),
        ...(hiddenColumns?.length ? { hiddenColumns } : {}),
        key: preset.key,
        label: presetLabelText(preset.label, preset.key),
        ...(sortState ? { sortState } : {})
      };
    });
  const knownKeys = new Set(items.map((preset) => preset.key));
  const resolvedActiveKey = activeKey && knownKeys.has(activeKey) ? activeKey : items[0]?.key;

  return {
    ...(resolvedActiveKey ? { activeKey: resolvedActiveKey } : {}),
    presets: items,
    version: 1
  };
}

export function stringifyTableViewPresetExport(value: TableViewPresetExport) {
  return JSON.stringify(value, null, 2);
}

export function parseTableViewPresetExport(input: string): TableViewPresetParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(input);
  } catch {
    return {
      issues: [{ code: "invalid-json", message: "Table preset import must be valid JSON." }],
      presets: []
    };
  }

  if (!isRecord(raw) || !Array.isArray(raw.presets)) {
    return {
      issues: [{ code: "invalid-json", message: "Table preset import must include a presets array." }],
      presets: []
    };
  }

  const issues: TableViewPresetValidationIssue[] = [];
  const items: TableViewPresetExportItem[] = [];

  raw.presets.forEach((preset) => {
    if (!isRecord(preset)) {
      issues.push({ code: "invalid-preset", message: "Table preset item must be an object." });
      return;
    }

    const key = typeof preset.key === "string" ? preset.key.trim() : "";
    const label = typeof preset.label === "string" || typeof preset.label === "number" ? String(preset.label).trim() : "";
    if (!key || !label) {
      issues.push({ code: "invalid-preset", message: "Table preset needs a key and label.", presetKey: key || undefined });
    }

    const sortState = serializableSortState(preset.sortState, issues, key || undefined);
    const columnWidths = serializableColumnWidths(preset.columnWidths, issues, key || undefined);
    if (!key || !label) return;

    items.push({
      ...(stringList(preset.columnOrder)?.length ? { columnOrder: stringList(preset.columnOrder) } : {}),
      ...(columnWidths ? { columnWidths } : {}),
      ...(stringList(preset.hiddenColumns)?.length ? { hiddenColumns: stringList(preset.hiddenColumns) } : {}),
      key,
      label,
      ...(sortState ? { sortState } : {})
    });
  });

  const activeKey = typeof raw.activeKey === "string" ? raw.activeKey.trim() : undefined;
  const knownKeys = new Set(items.map((preset) => preset.key));
  const resolvedActiveKey = activeKey && knownKeys.has(activeKey) ? activeKey : items[0]?.key;
  if (activeKey && activeKey !== resolvedActiveKey) {
    issues.push({ code: "invalid-active", message: "Table preset active key was not found.", presetKey: activeKey });
  }

  const value: TableViewPresetExport = {
    ...(resolvedActiveKey ? { activeKey: resolvedActiveKey } : {}),
    presets: items,
    version: 1
  };

  return {
    issues,
    presets: items.map((preset) => ({ ...preset })),
    value
  };
}

function normalizeHiddenColumns(columns: Array<unknown> = []) {
  return columns.map(String);
}

function topColumnKeys<T>(columns: Array<TableColumn<T>>) {
  return columns.map((column) => String(column.key));
}

function normalizeColumnOrder<T>(columns: Array<TableColumn<T>>, order?: Array<unknown>) {
  const baseOrder = topColumnKeys(columns);
  const knownKeys = new Set(baseOrder);
  const next: string[] = [];

  for (const key of order ?? []) {
    const normalized = String(key);
    if (knownKeys.has(normalized) && !next.includes(normalized)) next.push(normalized);
  }

  return [...next, ...baseOrder.filter((key) => !next.includes(key))];
}

function orderColumnTree<T>(columns: Array<TableColumn<T>>, order: string[]) {
  const rank = new Map(order.map((key, index) => [key, index]));
  return [...columns].sort((left, right) => {
    const leftRank = rank.get(String(left.key)) ?? Number.MAX_SAFE_INTEGER;
    const rightRank = rank.get(String(right.key)) ?? Number.MAX_SAFE_INTEGER;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return columns.indexOf(left) - columns.indexOf(right);
  });
}

function readStoredViewPreset(key: string | undefined) {
  if (!key || typeof window === "undefined") return undefined;
  try {
    return window.localStorage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
}

function writeStoredViewPreset(key: string | undefined, value: string) {
  if (!key || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore unavailable storage; the live table state still updates.
  }
}

function readStoredTableSettings(key: string | undefined) {
  if (!key || typeof window === "undefined") return undefined;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as Partial<TableColumnSettingsValue> : undefined;
  } catch {
    return undefined;
  }
}

function writeStoredTableSettings(key: string | undefined, value: TableColumnSettingsValue) {
  if (!key || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore unavailable storage; callers still receive the live value.
  }
}

function getColumnWidth<T>(column: TableColumn<T>, widths: TableColumnWidthMap) {
  return widths[String(column.key)] ?? column.width;
}

function columnWidthValue(width: TableColumnWidth | undefined) {
  if (typeof width === "number") return `${width}px`;
  return width;
}

function numericWidth(width: TableColumnWidth | undefined) {
  if (typeof width === "number") return width;
  if (typeof width === "string" && width.endsWith("px")) return Number(width.replace("px", "")) || 0;
  return 0;
}

function fixedOffset<T>(columns: Array<TableColumn<T>>, columnIndex: number, fixed: "left" | "right", widths: TableColumnWidthMap) {
  if (fixed === "left") {
    return columns.slice(0, columnIndex).filter((column) => column.fixed === "left").reduce((total, column) => total + numericWidth(getColumnWidth(column, widths)), 0);
  }

  return columns.slice(columnIndex + 1).filter((column) => column.fixed === "right").reduce((total, column) => total + numericWidth(getColumnWidth(column, widths)), 0);
}

function columnStyle<T>(column: TableColumn<T>, columnIndex: number, leafColumns: Array<TableColumn<T>>, widths: TableColumnWidthMap): React.CSSProperties {
  const style: React.CSSProperties = {
    textAlign: column.align,
    width: columnWidthValue(getColumnWidth(column, widths))
  };

  if (column.fixed) {
    style.position = "sticky";
    style[column.fixed] = fixedOffset(leafColumns, columnIndex, column.fixed, widths);
    style.zIndex = 2;
  }

  return style;
}

function TableInner<T extends object>({
  className,
  columnOrder,
  columnWidths,
  columns,
  data,
  defaultColumnOrder,
  defaultColumnWidths = {},
  defaultExpandedRowKeys = [],
  defaultHiddenColumns = [],
  defaultSelectedRowKeys = [],
  defaultViewPreset,
  density = "comfortable",
  editable,
  emptyText = "No data",
  expandedRowKeys,
  filterTags = [],
  filters,
  hiddenColumns,
  loading,
  loadingText = "Loading",
  onCellClick,
  onCellEdit,
  onColumnOrderChange,
  onColumnResize,
  onColumnVisibilityChange,
  onCurrentChange,
  onExpandChange,
  onFilterClear,
  onRowClick,
  onSelectionChange,
  onSortChange,
  onViewPresetChange,
  renderExpandedRow,
  rowKey,
  resizableColumns,
  selectable,
  selectedRowKeys,
  sortState,
  summary,
  viewPreset,
  viewPresetLabel = "View",
  viewPresets = [],
  viewStorageKey,
  ...props
}: TableProps<T>, ref: React.ForwardedRef<TableRef<T>>) {
  const initialPresetKey = viewPreset ?? readStoredViewPreset(viewStorageKey) ?? defaultViewPreset;
  const initialPreset = findTablePreset(viewPresets, initialPresetKey);
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<React.Key[]>(defaultSelectedRowKeys);
  const [currentRowKey, setCurrentRowKey] = React.useState<React.Key | undefined>();
  const [editingCell, setEditingCell] = React.useState<{ key: keyof T | string; rowKey: React.Key } | null>(null);
  const [editDraft, setEditDraft] = React.useState("");
  const [internalColumnOrder, setInternalColumnOrder] = React.useState<string[]>(() => normalizeColumnOrder(columns, initialPreset?.columnOrder ?? defaultColumnOrder));
  const [internalColumnWidths, setInternalColumnWidths] = React.useState<TableColumnWidthMap>(() => ({ ...defaultColumnWidths, ...(initialPreset?.columnWidths ?? {}) }));
  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<React.Key[]>(defaultExpandedRowKeys);
  const [internalHiddenColumns, setInternalHiddenColumns] = React.useState<string[]>(() => normalizeHiddenColumns(initialPreset?.hiddenColumns ?? defaultHiddenColumns));
  const [internalSortState, setInternalSortState] = React.useState<TableSortState<T> | undefined>(() => initialPreset?.sortState);
  const [internalViewPreset, setInternalViewPreset] = React.useState<string | undefined>(initialPresetKey);
  const controlledViewPresetRef = React.useRef(viewPreset);
  const activeSort = sortState ?? internalSortState;
  const activeExpandedKeys = expandedRowKeys ?? internalExpandedKeys;
  const activeColumnWidths = columnWidths ?? internalColumnWidths;
  const activeColumnOrder = normalizeColumnOrder(columns, columnOrder ?? internalColumnOrder);
  const activeHiddenColumns = hiddenColumns?.map(String) ?? internalHiddenColumns;
  const activeSelectedKeys = selectedRowKeys ?? internalSelectedKeys;
  const activeViewPresetKey = viewPreset ?? internalViewPreset;
  const hiddenColumnSet = React.useMemo(() => new Set(activeHiddenColumns), [activeHiddenColumns]);
  const orderedColumnTree = React.useMemo(() => orderColumnTree(columns, activeColumnOrder), [columns, activeColumnOrder]);
  const visibleColumnTree = React.useMemo(() => filterVisibleColumns(orderedColumnTree, hiddenColumnSet), [orderedColumnTree, hiddenColumnSet]);
  const leafColumns = React.useMemo(() => flattenColumns(visibleColumnTree), [visibleColumnTree]);
  const hasColumnGroups = visibleColumnTree.some((column) => Boolean(column.children?.length));

  function getRowKey(row: T, index: number) {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (rowKey) return row[rowKey] as React.Key;
    return index;
  }

  const filteredData = React.useMemo(() => {
    const activeFilters = Object.entries(filters ?? {});
    return data.filter((row) => activeFilters.every(([, predicate]) => !predicate || predicate(row)));
  }, [data, filters]);

  const visibleData = React.useMemo(() => {
    if (!activeSort) return filteredData;
    const column = leafColumns.find((item) => String(item.key) === String(activeSort.key));
    if (!column) return filteredData;
    const compare =
      typeof column.sortable === "function"
        ? column.sortable
        : (left: T, right: T) => defaultCompare(left, right, activeSort.key);
    const direction = activeSort.order === "asc" ? 1 : -1;
    return [...filteredData].sort((left, right) => compare(left, right) * direction);
  }, [activeSort, filteredData, leafColumns]);

  function rowsForKeys(keys: React.Key[]) {
    return data.filter((row, index) => keys.includes(getRowKey(row, index)));
  }

  function visibleRowKeys() {
    return visibleData.map((row) => {
      const rowIndex = data.indexOf(row);
      return getRowKey(row, rowIndex >= 0 ? rowIndex : data.length);
    });
  }

  function commitSelection(nextKeys: React.Key[]) {
    if (selectedRowKeys === undefined) setInternalSelectedKeys(nextKeys);
    onSelectionChange?.(rowsForKeys(nextKeys), nextKeys);
  }

  function toggleAllVisibleRows(selected?: boolean) {
    const keys = visibleRowKeys();
    const allSelected = keys.length > 0 && keys.every((key) => activeSelectedKeys.includes(key));
    const nextSelected = selected ?? !allSelected;
    const keySet = new Set(activeSelectedKeys);
    keys.forEach((key) => {
      if (nextSelected) keySet.add(key);
      else keySet.delete(key);
    });
    commitSelection(Array.from(keySet));
  }

  function setSort(nextSort?: TableSortState<T>) {
    if (sortState === undefined) setInternalSortState(nextSort);
    onSortChange?.(nextSort);
  }

  function commitExpansion(nextKeys: React.Key[]) {
    if (expandedRowKeys === undefined) setInternalExpandedKeys(nextKeys);
    onExpandChange?.(nextKeys);
  }

  function toggleExpansion(row: T, expanded?: boolean) {
    const rowIndex = data.indexOf(row);
    const key = getRowKey(row, rowIndex >= 0 ? rowIndex : data.length);
    const nextExpanded = expanded ?? !activeExpandedKeys.includes(key);
    commitExpansion(nextExpanded ? Array.from(new Set([...activeExpandedKeys, key])) : activeExpandedKeys.filter((item) => item !== key));
  }

  function commitCellEdit(row: T, column: TableColumn<T>, value: string) {
    onCellEdit?.(row, column.key, value);
    setEditingCell(null);
  }

  function commitColumnWidths(nextWidths: TableColumnWidthMap, key: keyof T | string, width: TableColumnWidth) {
    if (columnWidths === undefined) setInternalColumnWidths(nextWidths);
    onColumnResize?.(key, width, nextWidths);
  }

  function setColumnWidth(key: keyof T | string, width: TableColumnWidth) {
    commitColumnWidths({ ...activeColumnWidths, [String(key)]: width }, key, width);
  }

  function commitColumnOrder(nextOrder: Array<keyof T | string>) {
    const normalized = normalizeColumnOrder(columns, nextOrder);
    if (columnOrder === undefined) setInternalColumnOrder(normalized);
    onColumnOrderChange?.(normalized);
  }

  function resetColumnOrder() {
    commitColumnOrder(topColumnKeys(columns));
  }

  function resizeColumn(column: TableColumn<T>, delta: number) {
    const currentWidth = numericWidth(getColumnWidth(column, activeColumnWidths)) || 120;
    setColumnWidth(column.key, Math.max(48, currentWidth + delta));
  }

  function setColumnHidden(key: keyof T | string, hidden = true) {
    const normalizedKey = String(key);
    const next = hidden
      ? Array.from(new Set([...activeHiddenColumns, normalizedKey]))
      : activeHiddenColumns.filter((item) => item !== normalizedKey);
    if (hiddenColumns === undefined) setInternalHiddenColumns(next);
    onColumnVisibilityChange?.(next);
  }

  function applyViewPreset(key: string) {
    const preset = findTablePreset(viewPresets, key);
    if (!preset) return undefined;
    if (columnOrder === undefined && preset.columnOrder) setInternalColumnOrder(normalizeColumnOrder(columns, preset.columnOrder));
    if (columnWidths === undefined) setInternalColumnWidths({ ...defaultColumnWidths, ...(preset.columnWidths ?? {}) });
    if (hiddenColumns === undefined) setInternalHiddenColumns(normalizeHiddenColumns(preset.hiddenColumns ?? defaultHiddenColumns));
    if (sortState === undefined) setInternalSortState(preset.sortState);
    return preset;
  }

  function commitViewPreset(key: string) {
    const preset = applyViewPreset(key);
    if (!preset) return;
    if (viewPreset === undefined) setInternalViewPreset(key);
    writeStoredViewPreset(viewStorageKey, key);
    onViewPresetChange?.(key, preset);
  }

  function toggleSort(column: TableColumn<T>) {
    if (!column.sortable) return;
    const key = column.key;
    const nextOrder = activeSort?.key === key && activeSort.order === "asc" ? "desc" : "asc";
    setSort({ key, order: nextOrder });
  }

  React.useImperativeHandle(ref, () => ({
    clearExpansion: () => commitExpansion([]),
    clearSelection: () => commitSelection([]),
    clearSort: () => setSort(undefined),
    getExpandedRows: () => data.filter((row, index) => activeExpandedKeys.includes(getRowKey(row, index))),
    getColumnOrder: () => activeColumnOrder,
    getSelectionKeys: () => activeSelectedKeys,
    getSelectionRows: () => rowsForKeys(activeSelectedKeys),
    getSortState: () => activeSort,
    getViewPreset: () => activeViewPresetKey,
    getVisibleColumns: () => leafColumns,
    resetColumnOrder,
    setCurrentRow: (row) => {
      const rowIndex = row ? data.indexOf(row) : -1;
      const nextKey = row ? getRowKey(row, rowIndex) : undefined;
      setCurrentRowKey(nextKey);
      onCurrentChange?.(row);
    },
    setColumnHidden,
    setColumnOrder: commitColumnOrder,
    setColumnWidth,
    setViewPreset: commitViewPreset,
    sort: (key, order = "asc") => setSort({ key, order }),
    toggleRowExpansion: toggleExpansion,
    toggleRowSelection: (row, selected) => {
      const rowIndex = data.indexOf(row);
      const key = getRowKey(row, rowIndex >= 0 ? rowIndex : data.length);
      const nextSelected = selected ?? !activeSelectedKeys.includes(key);
      commitSelection(nextSelected ? Array.from(new Set([...activeSelectedKeys, key])) : activeSelectedKeys.filter((item) => item !== key));
    }
  }), [activeColumnOrder, activeColumnWidths, activeExpandedKeys, activeHiddenColumns, activeSelectedKeys, activeSort, activeViewPresetKey, columnOrder, columns, data, leafColumns, onColumnOrderChange, onCurrentChange, selectedRowKeys, viewPresets]);

  React.useEffect(() => {
    if (viewPreset === undefined || controlledViewPresetRef.current === viewPreset) return;
    controlledViewPresetRef.current = viewPreset;
    applyViewPreset(viewPreset);
  }, [viewPreset, viewPresets]);

  const extraColumnCount = (selectable ? 1 : 0) + (renderExpandedRow ? 1 : 0);
  const summaryValues = typeof summary === "function" ? summary(visibleData) : summary;
  const currentVisibleRowKeys = visibleRowKeys();
  const allVisibleRowsSelected = currentVisibleRowKeys.length > 0 && currentVisibleRowKeys.every((key) => activeSelectedKeys.includes(key));

  function renderHeaderCell(column: TableColumn<T>, columnIndex: number, spanProps?: { colSpan?: number; rowSpan?: number }) {
    const fixed = column.fixed;

    return (
      <th
        aria-label={typeof column.title === "string" ? column.title : undefined}
        key={String(column.key)}
        colSpan={spanProps?.colSpan}
        data-fixed={fixed}
        data-group={Boolean(column.children?.length) || undefined}
        rowSpan={spanProps?.rowSpan}
        style={column.children?.length ? { textAlign: column.align } : columnStyle(column, columnIndex, leafColumns, activeColumnWidths)}
      >
        <span className="pinepost-table__header-content">
          {column.sortable && !column.children?.length ? (
            <button className="pinepost-table__sort" onClick={() => toggleSort(column)} type="button">
              {column.title}
              <span aria-hidden="true">
                {activeSort?.key === column.key ? (activeSort.order === "asc" ? " ↑" : " ↓") : ""}
              </span>
            </button>
          ) : (
            column.title
          )}
          {resizableColumns && !column.children?.length && (
            <span className="pinepost-table__resize-controls">
              <button aria-label={`Decrease ${String(column.title)} width`} onClick={() => resizeColumn(column, -16)} type="button">
                -
              </button>
              <button aria-label={`Increase ${String(column.title)} width`} onClick={() => resizeColumn(column, 16)} type="button">
                +
              </button>
            </span>
          )}
        </span>
      </th>
    );
  }

  function renderSelectionHeader(rowSpan?: number) {
    return (
      <th aria-label="Selection" rowSpan={rowSpan}>
        <input
          aria-label="Select all rows"
          checked={allVisibleRowsSelected}
          disabled={currentVisibleRowKeys.length === 0}
          onChange={(event) => toggleAllVisibleRows(event.currentTarget.checked)}
          type="checkbox"
        />
      </th>
    );
  }

  return (
    <div className={cn("pinepost-table-wrap", className)} data-density={density} {...props}>
      {filterTags.length > 0 && (
        <div aria-label="Table filters" className="pinepost-table__filterbar" role="group">
          <span>Filters</span>
          {filterTags.map((tag) => (
            <span key={tag.key} className="pinepost-table__filter-tag">
              {tag.label}
              <button aria-label={`Clear ${String(tag.label)}`} onClick={() => onFilterClear?.(tag.key)} type="button">
                x
              </button>
            </span>
          ))}
          <button className="pinepost-table__filter-clear" onClick={() => onFilterClear?.()} type="button">
            Clear all
          </button>
        </div>
      )}
      {viewPresets.length > 0 && (
        <div aria-label="Table view presets" className="pinepost-table__viewbar" role="group">
          <span>{viewPresetLabel}</span>
          {viewPresets.map((preset) => (
            <button
              key={preset.key}
              aria-pressed={activeViewPresetKey === preset.key}
              onClick={() => commitViewPreset(preset.key)}
              type="button"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
      <table className="pinepost-table">
        <thead>
          {hasColumnGroups ? (
            <>
              <tr>
                {renderExpandedRow && <th aria-label="Expand rows" rowSpan={2} />}
                {selectable && renderSelectionHeader(2)}
                {visibleColumnTree.map((column) =>
                  column.children?.length
                    ? renderHeaderCell(column, -1, { colSpan: leafCount(column) })
                    : renderHeaderCell(column, leafColumns.indexOf(column), { rowSpan: 2 })
                )}
              </tr>
              <tr>
                {visibleColumnTree.flatMap((column) =>
                  column.children?.length ? flattenColumns(column.children).map((child) => renderHeaderCell(child, leafColumns.indexOf(child))) : []
                )}
              </tr>
            </>
          ) : (
            <tr>
              {renderExpandedRow && <th aria-label="Expand rows" />}
              {selectable && renderSelectionHeader()}
              {leafColumns.map((column, columnIndex) => renderHeaderCell(column, columnIndex))}
            </tr>
          )}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={leafColumns.length + extraColumnCount}>{loadingText}</td>
            </tr>
          ) : visibleData.length > 0 ? (
            visibleData.map((row, index) => {
              const key = getRowKey(row, data.indexOf(row));
              const selected = activeSelectedKeys.includes(key);
              const expanded = activeExpandedKeys.includes(key);
              const labelBase = String(getCellValue(row, leafColumns[0]?.key ?? "") ?? key);

              return (
                <React.Fragment key={key}>
                  <tr
                    data-current={currentRowKey === key}
                    data-selected={selected}
                    onClick={() => {
                      setCurrentRowKey(key);
                      onCurrentChange?.(row);
                      onRowClick?.(row, index);
                    }}
                  >
                    {renderExpandedRow && (
                      <td>
                        <button
                          aria-expanded={expanded}
                          aria-label={`${expanded ? "Collapse" : "Expand"} ${labelBase}`}
                          className="pinepost-table__expand"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleExpansion(row);
                          }}
                          type="button"
                        >
                          {expanded ? "-" : "+"}
                        </button>
                      </td>
                    )}
                    {selectable && (
                      <td>
                        <input
                          aria-label={`Select ${labelBase}`}
                          checked={selected}
                          onChange={(event) => {
                            const nextKeys = event.currentTarget.checked
                              ? Array.from(new Set([...activeSelectedKeys, key]))
                              : activeSelectedKeys.filter((item) => item !== key);
                            commitSelection(nextKeys);
                          }}
                          onClick={(event) => event.stopPropagation()}
                          type="checkbox"
                        />
                      </td>
                    )}
                    {leafColumns.map((column, columnIndex) => {
                      const editing = editingCell?.rowKey === key && editingCell.key === column.key;
                      const cellValue = column.render ? column.render(row, index) : getCellValue(row, column.key);

                      return (
                        <td
                          key={String(column.key)}
                          data-fixed={column.fixed}
                          onClick={() => onCellClick?.(row, column, index)}
                          onDoubleClick={() => {
                            if (!editable || !column.editable) return;
                            setEditingCell({ rowKey: key, key: column.key });
                            setEditDraft(String(getCellValue(row, column.key) ?? ""));
                          }}
                          style={columnStyle(column, columnIndex, leafColumns, activeColumnWidths)}
                        >
                          {editing ? (
                            <input
                              aria-label={`Edit ${String(column.title)} for ${labelBase}`}
                              className="pinepost-table__editor"
                              onBlur={(event) => commitCellEdit(row, column, event.currentTarget.value)}
                              onChange={(event) => setEditDraft(event.currentTarget.value)}
                              onClick={(event) => event.stopPropagation()}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") commitCellEdit(row, column, editDraft);
                                if (event.key === "Escape") setEditingCell(null);
                              }}
                              value={editDraft}
                            />
                          ) : (
                            cellValue
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  {renderExpandedRow && expanded && (
                    <tr className="pinepost-table__expanded-row">
                      <td colSpan={leafColumns.length + extraColumnCount}>{renderExpandedRow(row, index)}</td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td colSpan={leafColumns.length + extraColumnCount}>{emptyText}</td>
            </tr>
          )}
        </tbody>
        {summaryValues && (
          <tfoot>
            <tr className="pinepost-table__summary-row">
              {renderExpandedRow && <td />}
              {selectable && <td />}
              {leafColumns.map((column, columnIndex) => (
                <td key={String(column.key)} data-fixed={column.fixed} style={columnStyle(column, columnIndex, leafColumns, activeColumnWidths)}>
                  {summaryValues[String(column.key)]}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export const Table = React.forwardRef(TableInner) as <T extends object>(
  props: TableProps<T> & React.RefAttributes<TableRef<T>>
) => React.ReactElement;

export interface TableColumnSettingsValue {
  columnOrder: string[];
  density: TableDensity;
  hiddenColumns: string[];
}

export interface TableColumnSettingsLabels {
  comfortable?: React.ReactNode;
  compact?: React.ReactNode;
  density?: React.ReactNode;
  moveDown?: (title: React.ReactNode) => string;
  moveUp?: (title: React.ReactNode) => string;
  showColumn?: (title: React.ReactNode) => string;
  spacious?: React.ReactNode;
  title?: React.ReactNode;
  visibility?: React.ReactNode;
}

export interface TableColumnSettingsProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  columns: Array<TableColumn<T>>;
  defaultValue?: Partial<TableColumnSettingsValue>;
  labels?: TableColumnSettingsLabels;
  onValueChange?: (value: TableColumnSettingsValue) => void;
  storageKey?: string;
  value?: TableColumnSettingsValue;
}

function columnTitleText(title: React.ReactNode) {
  if (typeof title === "string" || typeof title === "number") return String(title);
  return "Column";
}

function normalizeTableSettings<T>(columns: Array<TableColumn<T>>, value?: Partial<TableColumnSettingsValue>): TableColumnSettingsValue {
  return {
    columnOrder: normalizeColumnOrder(columns, value?.columnOrder),
    density: value?.density ?? "comfortable",
    hiddenColumns: normalizeHiddenColumns(value?.hiddenColumns)
  };
}

function TableColumnSettingsInner<T>({
  className,
  columns,
  defaultValue,
  labels,
  onValueChange,
  storageKey,
  value,
  ...props
}: TableColumnSettingsProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  const storedValue = React.useMemo(() => readStoredTableSettings(storageKey), [storageKey]);
  const [internalValue, setInternalValue] = React.useState<TableColumnSettingsValue>(() => normalizeTableSettings(columns, storedValue ?? defaultValue));
  const activeValue = value ?? internalValue;
  const orderedColumns = React.useMemo(() => orderColumnTree(columns, activeValue.columnOrder), [columns, activeValue.columnOrder]);
  const hiddenSet = React.useMemo(() => new Set(activeValue.hiddenColumns), [activeValue.hiddenColumns]);
  const labelText = {
    comfortable: labels?.comfortable ?? "Comfortable",
    compact: labels?.compact ?? "Compact",
    density: labels?.density ?? "Density",
    spacious: labels?.spacious ?? "Spacious",
    title: labels?.title ?? "Column settings",
    visibility: labels?.visibility ?? "Visibility"
  };

  function commit(next: Partial<TableColumnSettingsValue>) {
    const normalized = normalizeTableSettings(columns, { ...activeValue, ...next });
    if (value === undefined) setInternalValue(normalized);
    writeStoredTableSettings(storageKey, normalized);
    onValueChange?.(normalized);
  }

  function moveColumn(key: string, offset: number) {
    const current = activeValue.columnOrder;
    const index = current.indexOf(key);
    const targetIndex = index + offset;
    if (index < 0 || targetIndex < 0 || targetIndex >= current.length) return;
    const next = [...current];
    const [item] = next.splice(index, 1);
    next.splice(targetIndex, 0, item);
    commit({ columnOrder: next });
  }

  function toggleColumn(key: string, visible: boolean) {
    const nextHidden = visible
      ? activeValue.hiddenColumns.filter((item) => item !== key)
      : Array.from(new Set([...activeValue.hiddenColumns, key]));
    commit({ hiddenColumns: nextHidden });
  }

  return (
    <div ref={ref} className={cn("pinepost-table-settings", className)} {...props}>
      <div className="pinepost-table-settings__header">
        <strong>{labelText.title}</strong>
      </div>
      <div className="pinepost-table-settings__density" role="group" aria-label={String(labelText.density)}>
        <span>{labelText.density}</span>
        {([
          ["compact", labelText.compact],
          ["comfortable", labelText.comfortable],
          ["spacious", labelText.spacious]
        ] as const).map(([densityKey, densityLabel]) => (
          <button
            key={densityKey}
            aria-pressed={activeValue.density === densityKey}
            onClick={() => commit({ density: densityKey })}
            type="button"
          >
            {densityLabel}
          </button>
        ))}
      </div>
      <div className="pinepost-table-settings__columns" role="group" aria-label={String(labelText.visibility)}>
        <span>{labelText.visibility}</span>
        {orderedColumns.map((column, index) => {
          const key = String(column.key);
          const title = columnTitleText(column.title);
          const showLabel = labels?.showColumn?.(column.title) ?? `Show ${title}`;
          const moveUpLabel = labels?.moveUp?.(column.title) ?? `Move ${title} up`;
          const moveDownLabel = labels?.moveDown?.(column.title) ?? `Move ${title} down`;

          return (
            <div key={key} className="pinepost-table-settings__row" data-testid="pinepost-table-column-setting">
              <label>
                <input
                  checked={!hiddenSet.has(key)}
                  onChange={(event) => toggleColumn(key, event.currentTarget.checked)}
                  type="checkbox"
                />
                <span>{showLabel}</span>
              </label>
              <strong>{column.title}</strong>
              <button aria-label={moveUpLabel} disabled={index === 0} onClick={() => moveColumn(key, -1)} type="button">
                ↑
              </button>
              <button aria-label={moveDownLabel} disabled={index === orderedColumns.length - 1} onClick={() => moveColumn(key, 1)} type="button">
                ↓
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const TableColumnSettings = React.forwardRef(TableColumnSettingsInner) as <T>(
  props: TableColumnSettingsProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement;

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  month?: Date;
  renderDay?: (date: Date) => React.ReactNode;
  selectedDate?: Date;
  weekStartsOn?: 0 | 1;
}

function sameDate(left?: Date, right?: Date) {
  return Boolean(
    left &&
      right &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate()
  );
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, month = new Date(), renderDay, selectedDate, weekStartsOn = 1, ...props }, ref) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const leading = (firstDay.getDay() - weekStartsOn + 7) % 7;
    const cells = [
      ...Array.from({ length: leading }, () => undefined),
      ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, monthIndex, index + 1))
    ];
    const paddedCells = [...cells, ...Array.from({ length: (7 - (cells.length % 7)) % 7 }, () => undefined)];
    const weekdays = weekStartsOn === 1 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div ref={ref} className={cn("pinepost-calendar", className)} {...props}>
        <div className="pinepost-calendar__header">
          {month.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </div>
        <div className="pinepost-calendar__grid" role="grid">
          {weekdays.map((day) => (
            <span key={day} className="pinepost-calendar__weekday" role="columnheader">
              {day}
            </span>
          ))}
          {paddedCells.map((date, index) => (
            <span
              key={date?.toISOString() ?? `empty-${index}`}
              aria-selected={sameDate(date, selectedDate)}
              className="pinepost-calendar__day"
              data-empty={!date}
              role="gridcell"
            >
              {date ? (renderDay ? renderDay(date) : date.getDate()) : null}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: React.ReactNode;
  fit?: "cover" | "contain";
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ caption, className, fit = "cover", ...props }, ref) => (
    <figure className={cn("pinepost-image", className)}>
      <img ref={ref} data-fit={fit} {...props} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
);

Image.displayName = "Image";

export interface CarouselItem {
  content: React.ReactNode;
  id: string;
  label?: string;
}

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultIndex?: number;
  items: CarouselItem[];
  onIndexChange?: (index: number) => void;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, defaultIndex = 0, items, onIndexChange, ...props }, ref) => {
    const [index, setIndex] = React.useState(defaultIndex);
    const current = items[index];

    function setSafeIndex(nextIndex: number) {
      if (items.length === 0) return;
      const normalized = (nextIndex + items.length) % items.length;
      setIndex(normalized);
      onIndexChange?.(normalized);
    }

    return (
      <div ref={ref} className={cn("pinepost-carousel", className)} {...props}>
        <div className="pinepost-carousel__stage" aria-live="polite">
          {current?.content ?? null}
        </div>
        <div className="pinepost-carousel__controls">
          <button disabled={items.length < 2} type="button" onClick={() => setSafeIndex(index - 1)} aria-label="Previous slide">
            Previous
          </button>
          <span>
            {items.length > 0 ? index + 1 : 0} / {items.length}
          </span>
          <button disabled={items.length < 2} type="button" onClick={() => setSafeIndex(index + 1)} aria-label="Next slide">
            Next
          </button>
        </div>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export interface TreeItem {
  children?: TreeItem[];
  disabled?: boolean;
  isLeaf?: boolean;
  label: React.ReactNode;
  value: string;
}

export interface TreeRef {
  clearChecked: () => void;
  filter: (query: string) => void;
  getCheckedKeys: () => string[];
  getExpandedKeys: () => string[];
  setCheckedKeys: (keys: string[]) => void;
  setExpandedKeys: (keys: string[]) => void;
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  checkable?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  defaultExpanded?: string[];
  expandedKeys?: string[];
  items: TreeItem[];
  lazy?: boolean;
  loadData?: (item: TreeItem) => Promise<TreeItem[]>;
  onCheckChange?: (checkedKeys: string[]) => void;
  onExpandChange?: (expandedKeys: string[]) => void;
  onNodeClick?: (item: TreeItem) => void;
  onSelect?: (value: string) => void;
}

function treeLabelText(item: TreeItem) {
  return typeof item.label === "string" ? item.label : item.value;
}

function treeMatches(item: TreeItem, query: string): boolean {
  if (!query) return true;
  return treeLabelText(item).toLowerCase().includes(query.toLowerCase()) || Boolean(item.children?.some((child) => treeMatches(child, query)));
}

function TreeBranch({
  checkable,
  checked,
  expanded,
  item,
  lazy,
  loadingKeys,
  loadData,
  onCheck,
  onNodeClick,
  onSelect,
  toggle,
  query
}: {
  checkable?: boolean;
  checked: Set<string>;
  expanded: Set<string>;
  item: TreeItem;
  lazy?: boolean;
  loadingKeys: Set<string>;
  loadData?: (item: TreeItem) => Promise<TreeItem[]>;
  onCheck: (item: TreeItem, checked: boolean) => void;
  onNodeClick?: (item: TreeItem) => void;
  onSelect?: (value: string) => void;
  toggle: (item: TreeItem) => void;
  query: string;
}) {
  const hasChildren = Boolean(item.children?.length) || Boolean(lazy && !item.isLeaf);
  const open = expanded.has(item.value);
  const visibleChildren = item.children?.filter((child) => treeMatches(child, query)) ?? [];

  if (!treeMatches(item, query)) return null;

  return (
    <li className="pinepost-tree__item">
      <span className="pinepost-tree__row">
        {checkable && (
          <input
            aria-label={treeLabelText(item)}
            checked={checked.has(item.value)}
            disabled={item.disabled}
            onChange={(event) => onCheck(item, event.currentTarget.checked)}
            type="checkbox"
          />
        )}
      <button
        aria-expanded={hasChildren ? open : undefined}
        disabled={item.disabled}
        onClick={() => {
          onNodeClick?.(item);
          if (hasChildren) toggle(item);
          else onSelect?.(item.value);
        }}
        type="button"
      >
        <span aria-hidden="true">{loadingKeys.has(item.value) ? "…" : hasChildren ? (open ? "-" : "+") : ""}</span>
        {item.label}
      </button>
      </span>
      {hasChildren && open && (
        <ul className="pinepost-tree__children">
          {visibleChildren.map((child) => (
            <TreeBranch
              key={child.value}
              checkable={checkable}
              checked={checked}
              expanded={expanded}
              item={child}
              lazy={lazy}
              loadingKeys={loadingKeys}
              loadData={loadData}
              onCheck={onCheck}
              onNodeClick={onNodeClick}
              onSelect={onSelect}
              query={query}
              toggle={toggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export const Tree = React.forwardRef<TreeRef, TreeProps>(
  (
    {
      checkable,
      checkedKeys,
      className,
      defaultCheckedKeys = [],
      defaultExpanded = [],
      expandedKeys,
      items,
      lazy,
      loadData,
      onCheckChange,
      onExpandChange,
      onNodeClick,
      onSelect,
      ...props
    },
    ref
  ) => {
    const listRef = React.useRef<HTMLUListElement>(null);
    const [treeItems, setTreeItems] = React.useState(items);
    const [internalExpanded, setInternalExpanded] = React.useState(() => new Set(defaultExpanded));
    const [internalChecked, setInternalChecked] = React.useState(() => new Set(defaultCheckedKeys));
    const [loadingKeys, setLoadingKeys] = React.useState(() => new Set<string>());
    const [query, setQuery] = React.useState("");
    const expanded = React.useMemo(() => new Set(expandedKeys ?? Array.from(internalExpanded)), [expandedKeys, internalExpanded]);
    const checked = React.useMemo(() => new Set(checkedKeys ?? Array.from(internalChecked)), [checkedKeys, internalChecked]);

    React.useEffect(() => setTreeItems(items), [items]);

    function commitExpanded(next: Set<string>) {
      if (expandedKeys === undefined) setInternalExpanded(next);
      onExpandChange?.(Array.from(next));
    }

    function commitChecked(next: Set<string>) {
      if (checkedKeys === undefined) setInternalChecked(next);
      onCheckChange?.(Array.from(next));
    }

    function applyChildren(nodes: TreeItem[], value: string, children: TreeItem[]): TreeItem[] {
      return nodes.map((node) => {
        if (node.value === value) return { ...node, children };
        if (node.children) return { ...node, children: applyChildren(node.children, value, children) };
        return node;
      });
    }

    function toggle(item: TreeItem) {
      const next = new Set(expanded);
      const value = item.value;
      if (next.has(value)) next.delete(value);
      else next.add(value);
      commitExpanded(next);

      if (lazy && loadData && !item.children?.length && !item.isLeaf && !loadingKeys.has(value)) {
        setLoadingKeys((current) => new Set([...current, value]));
        void loadData(item).then((children) => {
          setTreeItems((current) => applyChildren(current, value, children));
        }).finally(() => {
          setLoadingKeys((current) => {
            const after = new Set(current);
            after.delete(value);
            return after;
          });
        });
      }
    }

    function onCheck(item: TreeItem, selected: boolean) {
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
      <ul ref={listRef} className={cn("pinepost-tree", className)} {...props}>
        {treeItems.filter((item) => treeMatches(item, query)).map((item) => (
          <TreeBranch
            key={item.value}
            checkable={checkable}
            checked={checked}
            expanded={expanded}
            item={item}
            lazy={lazy}
            loadingKeys={loadingKeys}
            loadData={loadData}
            onCheck={onCheck}
            onNodeClick={onNodeClick}
            onSelect={onSelect}
            query={query}
            toggle={toggle}
          />
        ))}
      </ul>
    );
  }
);

Tree.displayName = "Tree";
