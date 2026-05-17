import * as React from "react";
import { cn } from "../lib/cn";

export type IconName = "mail" | "parcel" | "stamp" | "leaf" | "pin";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  label?: string;
  name: IconName;
  size?: number | string;
}

const iconPaths: Record<IconName, React.ReactNode> = {
  leaf: <path d="M15 4C8 5 4 10 4 16c0 4 3 7 7 7 6 0 10-6 10-17-2 2-4 3-6 3Z" />,
  mail: <path d="M4 7h16v11H4Zm1-1 7 7 7-7" />,
  parcel: <path d="M5 8 12 4l7 4v8l-7 4-7-4Zm7-4v16M5 8l7 4 7-4" />,
  pin: <path d="M12 3a6 6 0 0 0-6 6c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 0 0-6-6Zm0 8.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />,
  stamp: <path d="M7 4h10v5l3 3v7H4v-7l3-3Zm1 9h8M8 16h6M9 7h6" />
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, label, name, size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn("pinepost-icon", className)}
      fill="none"
      height={size}
      role={label ? "img" : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {iconPaths[name]}
    </svg>
  )
);

Icon.displayName = "Icon";

export interface ColorPickerPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: string;
  label?: React.ReactNode;
  onValueChange?: (value: string) => void;
  presets?: string[];
  value?: string;
}

export const ColorPickerPanel = React.forwardRef<HTMLDivElement, ColorPickerPanelProps>(
  ({ className, defaultValue = "#4f8f5f", label = "Color", onValueChange, presets = [], value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    function commit(nextValue: string) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    }

    return (
      <div ref={ref} className={cn("pinepost-color-panel", className)} {...props}>
        <label>
          <span>{label}</span>
          <input type="color" value={currentValue} onChange={(event) => commit(event.currentTarget.value)} />
        </label>
        {presets.length > 0 && (
          <div className="pinepost-color-panel__presets">
            {presets.map((preset) => (
              <button
                key={preset}
                aria-label={preset}
                className="pinepost-color-panel__swatch"
                data-active={preset.toLowerCase() === currentValue.toLowerCase()}
                onClick={() => commit(preset)}
                style={{ "--pinepost-swatch": preset } as React.CSSProperties}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ColorPickerPanel.displayName = "ColorPickerPanel";

export interface DatePickerShortcut {
  key?: string;
  label: React.ReactNode;
  value: Date | (() => Date);
}

export interface DatePickerPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: Date;
  disabledDate?: (date: Date) => boolean;
  month?: Date;
  onValueChange?: (value: Date) => void;
  renderDay?: (date: Date) => React.ReactNode;
  shortcuts?: DatePickerShortcut[];
  value?: Date;
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

function getMonthCells(month: Date, weekStartsOn: 0 | 1) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const leading = (firstDay.getDay() - weekStartsOn + 7) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: leading }, () => undefined),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, monthIndex, index + 1))
  ];
  return [...cells, ...Array.from({ length: (7 - (cells.length % 7)) % 7 }, () => undefined)];
}

export const DatePickerPanel = React.forwardRef<HTMLDivElement, DatePickerPanelProps>(
  (
    {
      className,
      defaultValue,
      disabledDate,
      month,
      onValueChange,
      renderDay,
      shortcuts = [],
      value,
      weekStartsOn = 1,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
    const selectedDate = value ?? internalValue;
    const activeMonth = month ?? selectedDate ?? new Date();
    const cells = getMonthCells(activeMonth, weekStartsOn);
    const weekdays = weekStartsOn === 1 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function commit(nextDate: Date) {
      if (value === undefined) setInternalValue(nextDate);
      onValueChange?.(nextDate);
    }

    return (
      <div ref={ref} className={cn("pinepost-date-panel", className)} {...props}>
        <div className="pinepost-date-panel__header">
          <strong>{activeMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}</strong>
        </div>
        {shortcuts.length > 0 && (
          <div className="pinepost-date-panel__shortcuts">
            {shortcuts.map((shortcut) => (
              <button
                key={String(shortcut.label)}
                type="button"
                onClick={() => commit(typeof shortcut.value === "function" ? shortcut.value() : shortcut.value)}
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        )}
        <div className="pinepost-date-panel__grid" role="grid">
          {weekdays.map((day) => (
            <span key={day} className="pinepost-date-panel__weekday" role="columnheader">
              {day}
            </span>
          ))}
          {cells.map((date, index) =>
            date ? (
              <button
                key={date.toISOString()}
                aria-pressed={sameDate(date, selectedDate)}
                className="pinepost-date-panel__day"
                disabled={disabledDate?.(date)}
                onClick={() => commit(date)}
                type="button"
              >
                {renderDay ? renderDay(date) : date.getDate()}
              </button>
            ) : (
              <span key={`empty-${index}`} className="pinepost-date-panel__day" data-empty role="gridcell" />
            )
          )}
        </div>
      </div>
    );
  }
);

DatePickerPanel.displayName = "DatePickerPanel";

export type DateRangeValue = [Date | undefined, Date | undefined];

export interface DateRangeShortcut {
  key?: string;
  label: React.ReactNode;
  value: DateRangeValue | (() => DateRangeValue);
}

export interface DateRangePickerPanelProps
  extends Omit<DatePickerPanelProps, "defaultValue" | "onValueChange" | "shortcuts" | "value"> {
  defaultValue?: DateRangeValue;
  onValueChange?: (value: DateRangeValue) => void;
  shortcuts?: DateRangeShortcut[];
  value?: DateRangeValue;
}

function normalizeDateRange(start: Date, end: Date): DateRangeValue {
  return start.getTime() <= end.getTime() ? [start, end] : [end, start];
}

function dateInRange(date: Date, range: DateRangeValue) {
  const [start, end] = range;
  if (!start || !end) return false;
  return date.getTime() > start.getTime() && date.getTime() < end.getTime();
}

export const DateRangePickerPanel = React.forwardRef<HTMLDivElement, DateRangePickerPanelProps>(
  (
    {
      className,
      defaultValue = [undefined, undefined],
      disabledDate,
      month,
      onValueChange,
      renderDay,
      shortcuts = [],
      value,
      weekStartsOn = 1,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<DateRangeValue>(defaultValue);
    const currentValue = value ?? internalValue;
    const activeMonth = month ?? currentValue[0] ?? currentValue[1] ?? new Date();
    const cells = getMonthCells(activeMonth, weekStartsOn);
    const weekdays = weekStartsOn === 1 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function commit(nextValue: DateRangeValue) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    }

    function selectDate(date: Date) {
      const [start, end] = currentValue;
      if (!start || end) {
        commit([date, undefined]);
        return;
      }

      commit(normalizeDateRange(start, date));
    }

    return (
      <div ref={ref} className={cn("pinepost-date-panel pinepost-date-range-panel", className)} {...props}>
        <div className="pinepost-date-panel__header">
          <strong>{activeMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}</strong>
        </div>
        {shortcuts.length > 0 && (
          <div className="pinepost-date-panel__shortcuts">
            {shortcuts.map((shortcut) => (
              <button
                key={String(shortcut.label)}
                type="button"
                onClick={() => commit(typeof shortcut.value === "function" ? shortcut.value() : shortcut.value)}
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        )}
        <div className="pinepost-date-panel__grid" role="grid">
          {weekdays.map((day) => (
            <span key={day} className="pinepost-date-panel__weekday" role="columnheader">
              {day}
            </span>
          ))}
          {cells.map((date, index) =>
            date ? (
              <button
                key={date.toISOString()}
                aria-pressed={sameDate(date, currentValue[0]) || sameDate(date, currentValue[1])}
                className="pinepost-date-panel__day"
                data-in-range={dateInRange(date, currentValue) || undefined}
                disabled={disabledDate?.(date)}
                onClick={() => selectDate(date)}
                type="button"
              >
                {renderDay ? renderDay(date) : date.getDate()}
              </button>
            ) : (
              <span key={`empty-${index}`} className="pinepost-date-panel__day" data-empty role="gridcell" />
            )
          )}
        </div>
      </div>
    );
  }
);

DateRangePickerPanel.displayName = "DateRangePickerPanel";

export interface TimePickerPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: string;
  disabledTime?: (time: string) => boolean;
  end?: string;
  onValueChange?: (value: string) => void;
  start?: string;
  step?: string;
  value?: string;
}

function timeToMinutes(time: string) {
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function getTimeOptions(start: string, end: string, step: string) {
  const options: string[] = [];
  const stepMinutes = Math.max(1, timeToMinutes(step));

  for (let current = timeToMinutes(start); current <= timeToMinutes(end); current += stepMinutes) {
    options.push(minutesToTime(current));
  }

  return options;
}

export const TimePickerPanel = React.forwardRef<HTMLDivElement, TimePickerPanelProps>(
  (
    {
      className,
      defaultValue = "",
      disabledTime,
      end = "18:00",
      onValueChange,
      start = "09:00",
      step = "00:30",
      value,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    function commit(nextValue: string) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    }

    return (
      <div ref={ref} className={cn("pinepost-time-panel", className)} {...props}>
        {getTimeOptions(start, end, step).map((time) => (
          <button
            key={time}
            aria-pressed={currentValue === time}
            disabled={disabledTime?.(time)}
            onClick={() => commit(time)}
            type="button"
          >
            {time}
          </button>
        ))}
      </div>
    );
  }
);

TimePickerPanel.displayName = "TimePickerPanel";

export type TimeRangeValue = [string | undefined, string | undefined];

export interface TimeRangeShortcut {
  key?: string;
  label: React.ReactNode;
  value: TimeRangeValue | (() => TimeRangeValue);
}

export interface TimeRangePickerPanelProps extends Omit<TimePickerPanelProps, "defaultValue" | "onValueChange" | "value"> {
  defaultValue?: TimeRangeValue;
  endLabel?: string;
  onValueChange?: (value: TimeRangeValue) => void;
  shortcuts?: TimeRangeShortcut[];
  startLabel?: string;
  value?: TimeRangeValue;
}

export const TimeRangePickerPanel = React.forwardRef<HTMLDivElement, TimeRangePickerPanelProps>(
  (
    {
      className,
      defaultValue = [undefined, undefined],
      disabledTime,
      end = "18:00",
      endLabel = "End time",
      onValueChange,
      shortcuts = [],
      start = "09:00",
      startLabel = "Start time",
      step = "00:30",
      value,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<TimeRangeValue>(defaultValue);
    const currentValue = value ?? internalValue;

    function commit(nextValue: TimeRangeValue) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    }

    return (
      <div ref={ref} className={cn("pinepost-time-range-panel", className)} {...props}>
        {shortcuts.length > 0 && (
          <div className="pinepost-time-range-panel__shortcuts">
            {shortcuts.map((shortcut) => (
              <button
                key={String(shortcut.label)}
                onClick={() => commit(typeof shortcut.value === "function" ? shortcut.value() : shortcut.value)}
                type="button"
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        )}
        <div aria-label={startLabel} className="pinepost-time-range-panel__column" role="group">
          <strong>{startLabel}</strong>
          <TimePickerPanel
            disabledTime={disabledTime}
            end={end}
            start={start}
            step={step}
            value={currentValue[0] ?? ""}
            onValueChange={(time) => commit([time, currentValue[1]])}
          />
        </div>
        <div aria-label={endLabel} className="pinepost-time-range-panel__column" role="group">
          <strong>{endLabel}</strong>
          <TimePickerPanel
            disabledTime={disabledTime}
            end={end}
            start={start}
            step={step}
            value={currentValue[1] ?? ""}
            onValueChange={(time) => commit([currentValue[0], time])}
          />
        </div>
      </div>
    );
  }
);

TimeRangePickerPanel.displayName = "TimeRangePickerPanel";

export type PinepostPresetLocale = "en" | "zh-CN";
export type PinepostDatePresetKey = "today" | "tomorrow";
export type PinepostDateRangePresetKey = "last-7-days" | "this-week";
export type PinepostTimeRangePresetKey = "morning" | "afternoon" | "full-day";

export interface PinepostDatePresetOptions {
  locale?: PinepostPresetLocale;
  referenceDate?: Date;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = startOfDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfWeek(date: Date) {
  const current = startOfDay(date);
  const offset = (current.getDay() + 6) % 7;
  current.setDate(current.getDate() - offset);
  return current;
}

export function createPinepostDatePresets(options: PinepostDatePresetOptions = {}): DatePickerShortcut[] {
  const { locale = "en", referenceDate = new Date() } = options;
  const today = startOfDay(referenceDate);
  return [
    { key: "today", label: locale === "zh-CN" ? "今天" : "Today", value: today },
    { key: "tomorrow", label: locale === "zh-CN" ? "明天" : "Tomorrow", value: addDays(today, 1) }
  ];
}

export function createPinepostDateRangePresets(options: PinepostDatePresetOptions = {}): DateRangeShortcut[] {
  const { locale = "en", referenceDate = new Date() } = options;
  const today = startOfDay(referenceDate);
  const weekStart = startOfWeek(today);
  return [
    { key: "last-7-days", label: locale === "zh-CN" ? "最近 7 天" : "Last 7 days", value: [addDays(today, -6), today] },
    { key: "this-week", label: locale === "zh-CN" ? "本周" : "This week", value: [weekStart, addDays(weekStart, 6)] }
  ];
}

export function createPinepostTimeRangePresets(options: Pick<PinepostDatePresetOptions, "locale"> = {}): TimeRangeShortcut[] {
  const { locale = "en" } = options;
  return [
    { key: "morning", label: locale === "zh-CN" ? "上午" : "Morning", value: ["09:00", "12:00"] },
    { key: "afternoon", label: locale === "zh-CN" ? "下午" : "Afternoon", value: ["13:00", "18:00"] },
    { key: "full-day", label: locale === "zh-CN" ? "全天" : "Full day", value: ["09:00", "18:00"] }
  ];
}

export type PinepostDateFormatStyle = "date" | "datetime" | "time";

export interface PinepostDateFormatOptions {
  fallback?: string;
  locale?: "en" | "zh-CN";
  style?: PinepostDateFormatStyle;
}

const pinepostMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function pinepostTime(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function formatPinepostDate(date: Date | undefined, options: PinepostDateFormatOptions = {}) {
  const { fallback = "-", locale = "en", style = "date" } = options;
  if (!date) return fallback;
  if (style === "time") return pinepostTime(date);

  const dateText =
    locale === "zh-CN"
      ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      : `${pinepostMonthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  return style === "datetime" ? `${dateText} ${pinepostTime(date)}` : dateText;
}

export function formatPinepostDateRange(value: DateRangeValue, options: PinepostDateFormatOptions = {}) {
  const { fallback = "-", locale = "en" } = options;
  const [start, end] = value;
  const joiner = locale === "zh-CN" ? " 至 " : " to ";
  if (!start && !end) return fallback;
  return `${formatPinepostDate(start, { fallback, locale })}${joiner}${formatPinepostDate(end, { fallback, locale })}`;
}

export function formatPinepostTimeRange(value: TimeRangeValue, options: Omit<PinepostDateFormatOptions, "style"> = {}) {
  const { fallback = "-", locale = "en" } = options;
  const [start, end] = value;
  const joiner = locale === "zh-CN" ? " 至 " : " to ";
  if (!start && !end) return fallback;
  return `${start ?? fallback}${joiner}${end ?? fallback}`;
}

export interface DateTimePickerPanelProps
  extends Omit<DatePickerPanelProps, "defaultValue" | "onValueChange" | "shortcuts" | "value"> {
  defaultValue?: Date;
  end?: string;
  onValueChange?: (value: Date) => void;
  shortcuts?: DatePickerShortcut[];
  start?: string;
  step?: string;
  value?: Date;
}

function dateWithTime(date: Date, time: string) {
  const [hours = "0", minutes = "0"] = time.split(":");
  const next = new Date(date);
  next.setHours(Number(hours), Number(minutes), 0, 0);
  return next;
}

function formatTime(date?: Date) {
  if (!date) return "";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export const DateTimePickerPanel = React.forwardRef<HTMLDivElement, DateTimePickerPanelProps>(
  (
    {
      className,
      defaultValue,
      end = "18:00",
      onValueChange,
      shortcuts = [],
      start = "09:00",
      step = "00:30",
      value,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
    const currentValue = value ?? internalValue;
    const currentTime = formatTime(currentValue) || start;

    function commit(nextValue: Date) {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    }

    return (
      <div ref={ref} className={cn("pinepost-date-time-panel", className)}>
        {shortcuts.length > 0 && (
          <div className="pinepost-date-time-panel__shortcuts">
            {shortcuts.map((shortcut) => (
              <button
                key={String(shortcut.label)}
                type="button"
                onClick={() => commit(typeof shortcut.value === "function" ? shortcut.value() : shortcut.value)}
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        )}
        <DatePickerPanel
          {...props}
          value={currentValue}
          onValueChange={(date) => commit(dateWithTime(date, currentTime))}
        />
        <TimePickerPanel
          end={end}
          start={start}
          step={step}
          value={currentTime}
          onValueChange={(time) => commit(dateWithTime(currentValue ?? new Date(), time))}
        />
      </div>
    );
  }
);

DateTimePickerPanel.displayName = "DateTimePickerPanel";

export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  hasMore?: boolean;
  loading?: boolean;
  loadingLabel?: React.ReactNode;
  onLoadMore: () => void;
  threshold?: number;
}

export const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps>(
  ({ children, className, hasMore = true, loading, loadingLabel = "Loading more", onLoadMore, threshold = 64, onScroll, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pinepost-infinite-scroll", className)}
      data-testid="pinepost-infinite-scroll"
      onScroll={(event) => {
        onScroll?.(event);
        const node = event.currentTarget;
        if (hasMore && !loading && node.scrollTop + node.clientHeight >= node.scrollHeight - threshold) {
          onLoadMore();
        }
      }}
      {...props}
    >
      {children}
      {loading && <div className="pinepost-infinite-scroll__loading">{loadingLabel}</div>}
    </div>
  )
);

InfiniteScroll.displayName = "InfiniteScroll";
