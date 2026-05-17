import * as React from "react";
import { cn } from "../lib/cn";

export interface TableColumn<T> {
  align?: "left" | "center" | "right";
  filter?: (row: T) => boolean;
  key: keyof T | string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean | ((left: T, right: T) => number);
  title: React.ReactNode;
}

export type TableSortOrder = "asc" | "desc";

export interface TableSortState<T> {
  key: keyof T | string;
  order: TableSortOrder;
}

export interface TableRef<T> {
  clearSelection: () => void;
  clearSort: () => void;
  getSelectionRows: () => T[];
  getSortState: () => TableSortState<T> | undefined;
  setCurrentRow: (row?: T) => void;
  sort: (key: keyof T | string, order?: TableSortOrder) => void;
  toggleRowSelection: (row: T, selected?: boolean) => void;
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<TableColumn<T>>;
  data: T[];
  emptyText?: React.ReactNode;
  filters?: Partial<Record<string, (row: T) => boolean>>;
  loading?: boolean;
  loadingText?: React.ReactNode;
  onCellClick?: (row: T, column: TableColumn<T>, rowIndex: number) => void;
  onCurrentChange?: (row?: T) => void;
  onRowClick?: (row: T, index: number) => void;
  onSelectionChange?: (rows: T[]) => void;
  onSortChange?: (state?: TableSortState<T>) => void;
  rowKey?: keyof T | ((row: T, index: number) => React.Key);
  selectable?: boolean;
  sortState?: TableSortState<T>;
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

function TableInner<T extends object>({
  className,
  columns,
  data,
  emptyText = "No data",
  filters,
  loading,
  loadingText = "Loading",
  onCellClick,
  onCurrentChange,
  onRowClick,
  onSelectionChange,
  onSortChange,
  rowKey,
  selectable,
  sortState,
  ...props
}: TableProps<T>, ref: React.ForwardedRef<TableRef<T>>) {
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  const [currentRowKey, setCurrentRowKey] = React.useState<React.Key | undefined>();
  const [internalSortState, setInternalSortState] = React.useState<TableSortState<T> | undefined>();
  const activeSort = sortState ?? internalSortState;

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
    const column = columns.find((item) => String(item.key) === String(activeSort.key));
    if (!column) return filteredData;
    const compare =
      typeof column.sortable === "function"
        ? column.sortable
        : (left: T, right: T) => defaultCompare(left, right, activeSort.key);
    const direction = activeSort.order === "asc" ? 1 : -1;
    return [...filteredData].sort((left, right) => compare(left, right) * direction);
  }, [activeSort, columns, filteredData]);

  function commitSelection(nextKeys: React.Key[]) {
    setSelectedKeys(nextKeys);
    onSelectionChange?.(data.filter((row, index) => nextKeys.includes(getRowKey(row, index))));
  }

  function setSort(nextSort?: TableSortState<T>) {
    if (sortState === undefined) setInternalSortState(nextSort);
    onSortChange?.(nextSort);
  }

  function toggleSort(column: TableColumn<T>) {
    if (!column.sortable) return;
    const key = column.key;
    const nextOrder = activeSort?.key === key && activeSort.order === "asc" ? "desc" : "asc";
    setSort({ key, order: nextOrder });
  }

  React.useImperativeHandle(ref, () => ({
    clearSelection: () => commitSelection([]),
    clearSort: () => setSort(undefined),
    getSelectionRows: () => data.filter((row, index) => selectedKeys.includes(getRowKey(row, index))),
    getSortState: () => activeSort,
    setCurrentRow: (row) => {
      const rowIndex = row ? data.indexOf(row) : -1;
      const nextKey = row ? getRowKey(row, rowIndex) : undefined;
      setCurrentRowKey(nextKey);
      onCurrentChange?.(row);
    },
    sort: (key, order = "asc") => setSort({ key, order }),
    toggleRowSelection: (row, selected) => {
      const rowIndex = data.indexOf(row);
      const key = getRowKey(row, rowIndex >= 0 ? rowIndex : data.length);
      const nextSelected = selected ?? !selectedKeys.includes(key);
      commitSelection(nextSelected ? Array.from(new Set([...selectedKeys, key])) : selectedKeys.filter((item) => item !== key));
    }
  }), [activeSort, data, onCurrentChange, selectedKeys]);

  return (
    <div className={cn("pinepost-table-wrap", className)} {...props}>
      <table className="pinepost-table">
        <thead>
          <tr>
            {selectable && <th aria-label="Selection" />}
            {columns.map((column) => (
              <th key={String(column.key)} style={{ textAlign: column.align }}>
                {column.sortable ? (
                  <button className="pinepost-table__sort" onClick={() => toggleSort(column)} type="button">
                    {column.title}
                    <span aria-hidden="true">
                      {activeSort?.key === column.key ? (activeSort.order === "asc" ? " ↑" : " ↓") : ""}
                    </span>
                  </button>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>{loadingText}</td>
            </tr>
          ) : visibleData.length > 0 ? (
            visibleData.map((row, index) => {
              const key = getRowKey(row, data.indexOf(row));
              const selected = selectedKeys.includes(key);

              return (
              <tr
                key={key}
                data-current={currentRowKey === key}
                data-selected={selected}
                onClick={() => {
                  setCurrentRowKey(key);
                  onCurrentChange?.(row);
                  onRowClick?.(row, index);
                }}
              >
                {selectable && (
                  <td>
                    <input
                      aria-label={`Select ${String(getCellValue(row, columns[0]?.key ?? ""))}`}
                      checked={selected}
                      onChange={(event) => {
                        const nextKeys = event.currentTarget.checked
                          ? Array.from(new Set([...selectedKeys, key]))
                          : selectedKeys.filter((item) => item !== key);
                        commitSelection(nextKeys);
                      }}
                      onClick={(event) => event.stopPropagation()}
                      type="checkbox"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={String(column.key)} onClick={() => onCellClick?.(row, column, index)} style={{ textAlign: column.align }}>
                    {column.render
                      ? column.render(row, index)
                      : getCellValue(row, column.key)}
                  </td>
                ))}
              </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export const Table = React.forwardRef(TableInner) as <T extends object>(
  props: TableProps<T> & React.RefAttributes<TableRef<T>>
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
  onCheck: (item: TreeItem, checked: boolean) => void;
  onNodeClick?: (item: TreeItem) => void;
  onSelect?: (value: string) => void;
  toggle: (value: string) => void;
  query: string;
}) {
  const hasChildren = Boolean(item.children?.length);
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
          if (hasChildren) toggle(item.value);
          else onSelect?.(item.value);
        }}
        type="button"
      >
        <span aria-hidden="true">{hasChildren ? (open ? "-" : "+") : ""}</span>
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
      onCheckChange,
      onExpandChange,
      onNodeClick,
      onSelect,
      ...props
    },
    ref
  ) => {
    const listRef = React.useRef<HTMLUListElement>(null);
    const [internalExpanded, setInternalExpanded] = React.useState(() => new Set(defaultExpanded));
    const [internalChecked, setInternalChecked] = React.useState(() => new Set(defaultCheckedKeys));
    const [query, setQuery] = React.useState("");
    const expanded = React.useMemo(() => new Set(expandedKeys ?? Array.from(internalExpanded)), [expandedKeys, internalExpanded]);
    const checked = React.useMemo(() => new Set(checkedKeys ?? Array.from(internalChecked)), [checkedKeys, internalChecked]);

    function commitExpanded(next: Set<string>) {
      if (expandedKeys === undefined) setInternalExpanded(next);
      onExpandChange?.(Array.from(next));
    }

    function commitChecked(next: Set<string>) {
      if (checkedKeys === undefined) setInternalChecked(next);
      onCheckChange?.(Array.from(next));
    }

    function toggle(value: string) {
      const next = new Set(expanded);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      commitExpanded(next);
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
        {items.filter((item) => treeMatches(item, query)).map((item) => (
          <TreeBranch
            key={item.value}
            checkable={checkable}
            checked={checked}
            expanded={expanded}
            item={item}
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
