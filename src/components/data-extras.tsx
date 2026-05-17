import * as React from "react";
import { cn } from "../lib/cn";

export interface TableColumn<T> {
  align?: "left" | "center" | "right";
  key: keyof T | string;
  render?: (row: T, index: number) => React.ReactNode;
  title: React.ReactNode;
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<TableColumn<T>>;
  data: T[];
  emptyText?: React.ReactNode;
  rowKey?: keyof T | ((row: T, index: number) => React.Key);
}

export function Table<T extends object>({
  className,
  columns,
  data,
  emptyText = "No data",
  rowKey,
  ...props
}: TableProps<T>) {
  function getRowKey(row: T, index: number) {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (rowKey) return row[rowKey] as React.Key;
    return index;
  }

  return (
    <div className={cn("pinepost-table-wrap", className)} {...props}>
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
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={getRowKey(row, index)}>
                {columns.map((column) => (
                  <td key={String(column.key)} style={{ textAlign: column.align }}>
                    {column.render
                      ? column.render(row, index)
                      : ((row as Record<string, React.ReactNode>)[String(column.key)] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

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

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  defaultExpanded?: string[];
  items: TreeItem[];
  onSelect?: (value: string) => void;
}

function TreeBranch({
  expanded,
  item,
  onSelect,
  toggle
}: {
  expanded: Set<string>;
  item: TreeItem;
  onSelect?: (value: string) => void;
  toggle: (value: string) => void;
}) {
  const hasChildren = Boolean(item.children?.length);
  const open = expanded.has(item.value);

  return (
    <li className="pinepost-tree__item">
      <button
        aria-expanded={hasChildren ? open : undefined}
        disabled={item.disabled}
        onClick={() => (hasChildren ? toggle(item.value) : onSelect?.(item.value))}
        type="button"
      >
        <span aria-hidden="true">{hasChildren ? (open ? "-" : "+") : ""}</span>
        {item.label}
      </button>
      {hasChildren && open && (
        <ul className="pinepost-tree__children">
          {item.children?.map((child) => (
            <TreeBranch key={child.value} expanded={expanded} item={child} onSelect={onSelect} toggle={toggle} />
          ))}
        </ul>
      )}
    </li>
  );
}

export const Tree = React.forwardRef<HTMLUListElement, TreeProps>(
  ({ className, defaultExpanded = [], items, onSelect, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));

    function toggle(value: string) {
      setExpanded((current) => {
        const next = new Set(current);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        return next;
      });
    }

    return (
      <ul ref={ref} className={cn("pinepost-tree", className)} {...props}>
        {items.map((item) => (
          <TreeBranch key={item.value} expanded={expanded} item={item} onSelect={onSelect} toggle={toggle} />
        ))}
      </ul>
    );
  }
);

Tree.displayName = "Tree";
