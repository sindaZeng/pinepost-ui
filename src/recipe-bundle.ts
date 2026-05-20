import {
  parsePinepostThemeCollectionExport,
  type PinepostThemeCollectionExport,
  type PinepostThemeCollectionParseResult
} from "./theme";
import {
  parseTableViewPresetExport,
  type TableViewPresetExport,
  type TableViewPresetParseResult
} from "./components/data-extras";
import type {
  PinepostDatePresetKey,
  PinepostDateRangePresetKey,
  PinepostPresetLocale,
  PinepostTimeRangePresetKey
} from "./components/utility";

export type PinepostRecipeBundleValidationCode =
  | "invalid-bundle"
  | "invalid-color"
  | "invalid-json"
  | "invalid-schedule"
  | "invalid-table-preset"
  | "invalid-theme";

export interface PinepostRecipeBundleValidationIssue {
  code: PinepostRecipeBundleValidationCode;
  field?: string;
  message: string;
  source?: "bundle" | "schedule" | "tableViewPresets" | "themeCollection";
}

export interface PinepostRecipeBundleScheduleConfig {
  dateKeys?: PinepostDatePresetKey[];
  dateRangeKeys?: PinepostDateRangePresetKey[];
  locale?: PinepostPresetLocale;
  referenceDate?: string;
  timeRangeKeys?: PinepostTimeRangePresetKey[];
}

export interface PinepostRecipeBundleExport {
  description?: string;
  id: string;
  name: string;
  recipeIds: string[];
  schedule?: PinepostRecipeBundleScheduleConfig;
  tableViewPresets?: TableViewPresetExport;
  themeCollection?: PinepostThemeCollectionExport;
  version: 1;
}

export interface PinepostRecipeBundleParseResult {
  issues: PinepostRecipeBundleValidationIssue[];
  schedule?: PinepostRecipeBundleScheduleConfig;
  tableViewPresets?: TableViewPresetParseResult;
  themeCollection?: PinepostThemeCollectionParseResult;
  value?: PinepostRecipeBundleExport;
}

const knownDateKeys = new Set<PinepostDatePresetKey>(["today", "tomorrow"]);
const knownDateRangeKeys = new Set<PinepostDateRangePresetKey>(["last-7-days", "this-week"]);
const knownTimeRangeKeys = new Set<PinepostTimeRangePresetKey>(["morning", "afternoon", "full-day"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeBundleId(value: unknown, fallback = "recipe-bundle") {
  if (typeof value !== "string") return fallback;
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function uniqueTextList(value: unknown) {
  const next: string[] = [];
  if (!Array.isArray(value)) return next;
  value.forEach((item) => {
    const normalized = normalizeText(item);
    if (normalized && !next.includes(normalized)) next.push(normalized);
  });
  return next;
}

function localDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeReferenceDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return localDateString(value);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const parsed = new Date(`${value}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) return value;
  }
  return undefined;
}

function scheduleKeys<T extends string>(value: unknown, knownKeys: Set<T>) {
  const keys = uniqueTextList(value);
  const invalidKeys = keys.filter((key) => !knownKeys.has(key as T));
  return {
    invalid: invalidKeys,
    value: keys.filter((key): key is T => knownKeys.has(key as T))
  };
}

function unknownScheduleKeyMessage(keys: string[]) {
  return keys.length === 1
    ? `Unknown recipe bundle schedule key: ${keys[0]}.`
    : `Unknown recipe bundle schedule keys: ${keys.join(", ")}.`;
}

function normalizeSchedule(
  input: unknown,
  issues?: PinepostRecipeBundleValidationIssue[]
): PinepostRecipeBundleScheduleConfig | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues?.push({
      code: "invalid-schedule",
      field: "schedule",
      message: "Recipe bundle schedule must be an object.",
      source: "schedule"
    });
    return undefined;
  }

  const locale: PinepostPresetLocale = input.locale === "zh-CN" || input.locale === "en" ? input.locale : "en";
  if (input.locale !== undefined && input.locale !== "zh-CN" && input.locale !== "en") {
    issues?.push({
      code: "invalid-schedule",
      field: "schedule.locale",
      message: "Schedule locale must be en or zh-CN.",
      source: "schedule"
    });
  }

  const referenceDate = normalizeReferenceDate(input.referenceDate);
  if (input.referenceDate !== undefined && !referenceDate) {
    issues?.push({
      code: "invalid-schedule",
      field: "schedule.referenceDate",
      message: "Schedule reference date must use YYYY-MM-DD.",
      source: "schedule"
    });
  }

  const dateKeys = scheduleKeys(input.dateKeys, knownDateKeys);
  const dateRangeKeys = scheduleKeys(input.dateRangeKeys, knownDateRangeKeys);
  const timeRangeKeys = scheduleKeys(input.timeRangeKeys, knownTimeRangeKeys);
  if (dateKeys.invalid.length) {
    issues?.push({
      code: "invalid-schedule",
      field: "schedule.dateKeys",
      message: unknownScheduleKeyMessage(dateKeys.invalid),
      source: "schedule"
    });
  }
  const invalidRangeKeys = [...dateRangeKeys.invalid, ...timeRangeKeys.invalid];
  if (invalidRangeKeys.length) {
    issues?.push({
      code: "invalid-schedule",
      field: "schedule.rangeKeys",
      message: unknownScheduleKeyMessage(invalidRangeKeys),
      source: "schedule"
    });
  }

  const schedule: PinepostRecipeBundleScheduleConfig = {
    locale,
    ...(referenceDate ? { referenceDate } : {}),
    ...(dateKeys.value.length ? { dateKeys: dateKeys.value } : {}),
    ...(dateRangeKeys.value.length ? { dateRangeKeys: dateRangeKeys.value } : {}),
    ...(timeRangeKeys.value.length ? { timeRangeKeys: timeRangeKeys.value } : {})
  };

  return Object.keys(schedule).length > 1 || schedule.locale !== "en" ? schedule : undefined;
}

function nestedIssues(
  source: "tableViewPresets" | "themeCollection",
  codes: string[]
): PinepostRecipeBundleValidationIssue[] {
  const issueCodes = new Set<PinepostRecipeBundleValidationCode>();
  codes.forEach((code) => {
    if (source === "tableViewPresets") {
      issueCodes.add("invalid-table-preset");
      return;
    }

    issueCodes.add(code === "invalid-color" ? "invalid-color" : "invalid-theme");
  });

  return Array.from(issueCodes).map((code) => ({
    code,
    message: source === "themeCollection" ? `Theme collection issue: ${code}.` : `Table preset issue: ${code}.`,
    source
  }));
}

export function createPinepostRecipeBundle({
  description,
  id,
  name,
  recipeIds,
  schedule,
  tableViewPresets,
  themeCollection
}: {
  description?: string;
  id: string;
  name: string;
  recipeIds: string[];
  schedule?: Omit<PinepostRecipeBundleScheduleConfig, "referenceDate"> & { referenceDate?: string | Date };
  tableViewPresets?: TableViewPresetExport;
  themeCollection?: PinepostThemeCollectionExport;
}): PinepostRecipeBundleExport {
  const scheduleIssues: PinepostRecipeBundleValidationIssue[] = [];
  const normalizedSchedule = normalizeSchedule(schedule, scheduleIssues);
  if (scheduleIssues.length) throw new TypeError(scheduleIssues[0].message);
  const normalizedDescription = normalizeText(description);

  return {
    ...(normalizedDescription ? { description: normalizedDescription } : {}),
    id: normalizeBundleId(id),
    name: normalizeText(name) || "Recipe bundle",
    recipeIds: uniqueTextList(recipeIds),
    ...(normalizedSchedule ? { schedule: normalizedSchedule } : {}),
    ...(tableViewPresets ? { tableViewPresets } : {}),
    ...(themeCollection ? { themeCollection } : {}),
    version: 1
  };
}

export function stringifyPinepostRecipeBundle(value: PinepostRecipeBundleExport) {
  return JSON.stringify(value, null, 2);
}

export function parsePinepostRecipeBundle(input: string): PinepostRecipeBundleParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(input);
  } catch {
    return {
      issues: [{ code: "invalid-json", message: "Recipe bundle import must be valid JSON.", source: "bundle" }]
    };
  }

  if (!isRecord(raw)) {
    return {
      issues: [{ code: "invalid-json", message: "Recipe bundle import must be a JSON object.", source: "bundle" }]
    };
  }

  const issues: PinepostRecipeBundleValidationIssue[] = [];
  const rawName = normalizeText(raw.name);
  const rawId = normalizeText(raw.id);
  const recipeIds = uniqueTextList(raw.recipeIds);
  if (!rawId || !rawName) {
    issues.push({
      code: "invalid-bundle",
      field: "id",
      message: "Recipe bundle needs an id and name.",
      source: "bundle"
    });
  }
  if (!recipeIds.length) {
    issues.push({
      code: "invalid-bundle",
      field: "recipeIds",
      message: "Recipe bundle needs at least one recipe reference.",
      source: "bundle"
    });
  }
  if (raw.version !== 1) {
    issues.push({
      code: "invalid-bundle",
      field: "version",
      message: "Recipe bundle version must be 1.",
      source: "bundle"
    });
    return { issues };
  }

  const schedule = normalizeSchedule(raw.schedule, issues);
  const themeCollection = raw.themeCollection === undefined
    ? undefined
    : parsePinepostThemeCollectionExport(JSON.stringify(raw.themeCollection));
  if (themeCollection?.issues.length) {
    issues.push(...nestedIssues("themeCollection", themeCollection.issues.map((issue) => issue.code)));
  }

  const tableViewPresets = raw.tableViewPresets === undefined
    ? undefined
    : parseTableViewPresetExport(JSON.stringify(raw.tableViewPresets));
  if (tableViewPresets?.issues.length) {
    issues.push(...nestedIssues("tableViewPresets", tableViewPresets.issues.map((issue) => issue.code)));
  }
  const value = createPinepostRecipeBundle({
    description: normalizeText(raw.description),
    id: rawId,
    name: rawName,
    recipeIds,
    schedule,
    tableViewPresets: tableViewPresets?.value,
    themeCollection: themeCollection?.value
  });

  return {
    issues,
    ...(schedule ? { schedule } : {}),
    ...(tableViewPresets ? { tableViewPresets } : {}),
    ...(themeCollection ? { themeCollection } : {}),
    value
  };
}
