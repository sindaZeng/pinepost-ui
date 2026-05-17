export type PinepostTheme = "calm" | "play" | "shop";

export const pinepostThemes: PinepostTheme[] = ["calm", "play", "shop"];

export const pinepostThemeTokenNames = [
  "--pinepost-paper",
  "--pinepost-paper-raised",
  "--pinepost-ink",
  "--pinepost-muted",
  "--pinepost-border",
  "--pinepost-border-strong",
  "--pinepost-leaf",
  "--pinepost-leaf-dark",
  "--pinepost-moss",
  "--pinepost-stamp",
  "--pinepost-stamp-dark",
  "--pinepost-parcel",
  "--pinepost-sky",
  "--pinepost-focus",
  "--pinepost-radius-xs",
  "--pinepost-radius-sm",
  "--pinepost-radius-md"
] as const;

export type PinepostThemeTokenName = (typeof pinepostThemeTokenNames)[number];
export type PinepostThemeTokens = Record<PinepostThemeTokenName, string>;
export type PinepostThemeValidationCode =
  | "invalid-color"
  | "invalid-json"
  | "invalid-radius"
  | "invalid-theme"
  | "unknown-token";

export interface PinepostThemeValidationIssue {
  code: PinepostThemeValidationCode;
  message: string;
  token?: string;
}

export interface PinepostThemeExport {
  baseTheme: PinepostTheme;
  name?: string;
  tokens: Partial<PinepostThemeTokens>;
  version: 1;
}

export interface PinepostThemeParseResult {
  issues: PinepostThemeValidationIssue[];
  tokens: PinepostThemeTokens;
  value?: PinepostThemeExport;
}

export interface PinepostThemeCollectionItem extends PinepostThemeExport {
  id: string;
  name: string;
}

export interface PinepostThemeCollectionExport {
  activeId?: string;
  name?: string;
  themes: PinepostThemeCollectionItem[];
  version: 1;
}

export interface PinepostThemeCollectionParseResult {
  issues: PinepostThemeValidationIssue[];
  tokensById: Record<string, PinepostThemeTokens>;
  value?: PinepostThemeCollectionExport;
}

export const pinepostThemePresets: Record<PinepostTheme, PinepostThemeTokens> = {
  calm: {
    "--pinepost-paper": "#fff8ea",
    "--pinepost-paper-raised": "#fffdf5",
    "--pinepost-ink": "#2f3b2f",
    "--pinepost-muted": "#69745f",
    "--pinepost-border": "#ccb98b",
    "--pinepost-border-strong": "#8c7147",
    "--pinepost-leaf": "#4f8f5f",
    "--pinepost-leaf-dark": "#356841",
    "--pinepost-moss": "#d8e3b5",
    "--pinepost-stamp": "#c9624b",
    "--pinepost-stamp-dark": "#983f33",
    "--pinepost-parcel": "#c58b4b",
    "--pinepost-sky": "#87b9c9",
    "--pinepost-focus": "#2f7fa0",
    "--pinepost-radius-xs": "4px",
    "--pinepost-radius-sm": "6px",
    "--pinepost-radius-md": "8px"
  },
  play: {
    "--pinepost-paper": "#fff3d7",
    "--pinepost-paper-raised": "#fffaf0",
    "--pinepost-ink": "#263728",
    "--pinepost-muted": "#687656",
    "--pinepost-border": "#d4ac66",
    "--pinepost-border-strong": "#8a6536",
    "--pinepost-leaf": "#3f9f70",
    "--pinepost-leaf-dark": "#256d47",
    "--pinepost-moss": "#cde986",
    "--pinepost-stamp": "#d9536b",
    "--pinepost-stamp-dark": "#a8324d",
    "--pinepost-parcel": "#e09b42",
    "--pinepost-sky": "#7bc9d7",
    "--pinepost-focus": "#286fd1",
    "--pinepost-radius-xs": "4px",
    "--pinepost-radius-sm": "6px",
    "--pinepost-radius-md": "8px"
  },
  shop: {
    "--pinepost-paper": "#fff0dc",
    "--pinepost-paper-raised": "#fff8ed",
    "--pinepost-ink": "#3a3229",
    "--pinepost-muted": "#7d6653",
    "--pinepost-border": "#d1a46c",
    "--pinepost-border-strong": "#8f6135",
    "--pinepost-leaf": "#4e8c68",
    "--pinepost-leaf-dark": "#356547",
    "--pinepost-moss": "#e7d78f",
    "--pinepost-stamp": "#c44e3d",
    "--pinepost-stamp-dark": "#923529",
    "--pinepost-parcel": "#d88937",
    "--pinepost-sky": "#8fb9bd",
    "--pinepost-focus": "#8f4b2c",
    "--pinepost-radius-xs": "4px",
    "--pinepost-radius-sm": "6px",
    "--pinepost-radius-md": "8px"
  }
};

export function mergePinepostThemeTokens(
  theme: PinepostTheme,
  overrides: Partial<PinepostThemeTokens> = {}
): PinepostThemeTokens {
  return { ...pinepostThemePresets[theme], ...overrides };
}

export function createPinepostThemeCss({
  selector = ".pinepost-custom-theme",
  tokens
}: {
  selector?: string;
  tokens: Partial<PinepostThemeTokens>;
}) {
  const lines = pinepostThemeTokenNames
    .filter((tokenName) => tokens[tokenName])
    .map((tokenName) => `  ${tokenName}: ${tokens[tokenName]};`);

  return [`${selector} {`, ...lines, "}"].join("\n");
}

const themeTokenSet = new Set<string>(pinepostThemeTokenNames);
const colorTokenNames = pinepostThemeTokenNames.filter((tokenName) => !tokenName.includes("radius"));
const radiusTokenNames = pinepostThemeTokenNames.filter((tokenName) => tokenName.includes("radius"));

function isPinepostTheme(value: unknown): value is PinepostTheme {
  return typeof value === "string" && (pinepostThemes as string[]).includes(value);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidHexColor(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value);
}

function isValidRadius(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (!match) return false;
  const radius = Number(match[1]);
  return radius >= 0 && radius <= 32;
}

export function validatePinepostThemeTokens(tokens: Partial<Record<string, string>>): PinepostThemeValidationIssue[] {
  const issues: PinepostThemeValidationIssue[] = [];

  Object.keys(tokens)
    .filter((tokenName) => !themeTokenSet.has(tokenName))
    .sort()
    .forEach((tokenName) => {
      issues.push({
        code: "unknown-token",
        message: "Token is not part of the Pinepost theme contract.",
        token: tokenName
      });
    });

  colorTokenNames.forEach((tokenName) => {
    const value = tokens[tokenName];
    if (typeof value === "string" && !isValidHexColor(value)) {
      issues.push({
        code: "invalid-color",
        message: "Expected a six-digit hex color.",
        token: tokenName
      });
    }
  });

  radiusTokenNames.forEach((tokenName) => {
    const value = tokens[tokenName];
    if (typeof value === "string" && !isValidRadius(value)) {
      issues.push({
        code: "invalid-radius",
        message: "Expected a px radius between 0px and 32px.",
        token: tokenName
      });
    }
  });

  return issues;
}

function normalizeKnownTokens(tokens: unknown): Partial<Record<string, string>> {
  if (!isPlainRecord(tokens)) return {};
  return Object.fromEntries(
    Object.entries(tokens).filter(([tokenName, value]) => themeTokenSet.has(tokenName) && typeof value === "string")
  ) as Partial<Record<string, string>>;
}

function cleanValidTokens(tokens: Partial<Record<string, string>>) {
  const invalidTokens = new Set(validatePinepostThemeTokens(tokens).map((issue) => issue.token).filter(Boolean));
  return Object.fromEntries(
    Object.entries(tokens).filter(([tokenName]) => themeTokenSet.has(tokenName) && !invalidTokens.has(tokenName))
  ) as Partial<PinepostThemeTokens>;
}

export function createPinepostThemeExport({
  baseTheme,
  name,
  tokens
}: {
  baseTheme: PinepostTheme;
  name?: string;
  tokens: Partial<PinepostThemeTokens>;
}): PinepostThemeExport {
  const baseTokens = pinepostThemePresets[baseTheme];
  const changedTokens = Object.fromEntries(
    pinepostThemeTokenNames
      .filter((tokenName) => tokens[tokenName] && tokens[tokenName] !== baseTokens[tokenName])
      .map((tokenName) => [tokenName, tokens[tokenName]])
  ) as Partial<PinepostThemeTokens>;

  return {
    baseTheme,
    ...(name?.trim() ? { name: name.trim() } : {}),
    tokens: changedTokens,
    version: 1
  };
}

export function stringifyPinepostThemeExport(value: PinepostThemeExport) {
  return JSON.stringify(value, null, 2);
}

export function parsePinepostThemeExport(input: string, fallbackTheme: PinepostTheme = "calm"): PinepostThemeParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(input);
  } catch {
    return {
      issues: [{ code: "invalid-json", message: "Theme import must be valid JSON." }],
      tokens: pinepostThemePresets[fallbackTheme]
    };
  }

  if (!isPlainRecord(raw)) {
    return {
      issues: [{ code: "invalid-json", message: "Theme import must be a JSON object." }],
      tokens: pinepostThemePresets[fallbackTheme]
    };
  }

  const issues: PinepostThemeValidationIssue[] = [];
  const baseTheme = isPinepostTheme(raw.baseTheme) ? raw.baseTheme : fallbackTheme;
  if (!isPinepostTheme(raw.baseTheme)) {
    issues.push({ code: "invalid-theme", message: "Base theme is unknown." });
  }

  const looseTokens = isPlainRecord(raw.tokens) ? (raw.tokens as Partial<Record<string, string>>) : {};
  issues.push(...validatePinepostThemeTokens(looseTokens));
  const validTokens = cleanValidTokens(normalizeKnownTokens(raw.tokens));
  const value: PinepostThemeExport = {
    baseTheme,
    ...(typeof raw.name === "string" && raw.name.trim() ? { name: raw.name.trim() } : {}),
    tokens: validTokens,
    version: 1
  };

  return {
    issues,
    tokens: mergePinepostThemeTokens(baseTheme, validTokens),
    value
  };
}

export function createPinepostThemeClassName(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `pinepost-theme-${slug || "custom"}`;
}

function normalizeThemeCollectionId(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

export function createPinepostThemeCollectionExport({
  activeId,
  name,
  themes
}: {
  activeId?: string;
  name?: string;
  themes: Array<{ baseTheme: PinepostTheme; id: string; name: string; tokens: Partial<PinepostThemeTokens> }>;
}): PinepostThemeCollectionExport {
  const items = themes.map((item, index) => {
    const id = normalizeThemeCollectionId(item.id, `theme-${index + 1}`);
    const themeName = item.name.trim() || id;
    return {
      ...createPinepostThemeExport({ baseTheme: item.baseTheme, name: themeName, tokens: item.tokens }),
      id,
      name: themeName
    };
  });
  const knownIds = new Set(items.map((item) => item.id));
  const normalizedActiveId = activeId ? normalizeThemeCollectionId(activeId, "") : undefined;
  const resolvedActiveId = normalizedActiveId && knownIds.has(normalizedActiveId) ? normalizedActiveId : items[0]?.id;

  return {
    ...(resolvedActiveId ? { activeId: resolvedActiveId } : {}),
    ...(name?.trim() ? { name: name.trim() } : {}),
    themes: items,
    version: 1
  };
}

export function stringifyPinepostThemeCollectionExport(value: PinepostThemeCollectionExport) {
  return JSON.stringify(value, null, 2);
}

export function parsePinepostThemeCollectionExport(input: string, fallbackTheme: PinepostTheme = "calm"): PinepostThemeCollectionParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(input);
  } catch {
    return {
      issues: [{ code: "invalid-json", message: "Theme collection import must be valid JSON." }],
      tokensById: {}
    };
  }

  if (!isPlainRecord(raw) || !Array.isArray(raw.themes)) {
    return {
      issues: [{ code: "invalid-json", message: "Theme collection import must include a themes array." }],
      tokensById: {}
    };
  }

  const issues: PinepostThemeValidationIssue[] = [];
  const themes: PinepostThemeCollectionItem[] = [];
  const tokensById: Record<string, PinepostThemeTokens> = {};

  raw.themes.forEach((item, index) => {
    if (!isPlainRecord(item)) {
      issues.push({ code: "invalid-json", message: "Theme collection item must be an object." });
      return;
    }

    const id = normalizeThemeCollectionId(item.id, `theme-${index + 1}`);
    const name = typeof item.name === "string" && item.name.trim() ? item.name.trim() : id;
    const baseTheme = isPinepostTheme(item.baseTheme) ? item.baseTheme : fallbackTheme;
    if (!isPinepostTheme(item.baseTheme)) {
      issues.push({ code: "invalid-theme", message: "Theme collection item has an unknown base theme.", token: id });
    }

    const looseTokens = isPlainRecord(item.tokens) ? (item.tokens as Partial<Record<string, string>>) : {};
    issues.push(...validatePinepostThemeTokens(looseTokens));
    const validTokens = cleanValidTokens(normalizeKnownTokens(item.tokens));
    themes.push({
      baseTheme,
      id,
      name,
      tokens: validTokens,
      version: 1
    });
    tokensById[id] = mergePinepostThemeTokens(baseTheme, validTokens);
  });

  const activeId = typeof raw.activeId === "string" ? normalizeThemeCollectionId(raw.activeId, "") : undefined;
  const knownIds = new Set(themes.map((item) => item.id));
  const resolvedActiveId = activeId && knownIds.has(activeId) ? activeId : themes[0]?.id;
  if (activeId && activeId !== resolvedActiveId) {
    issues.push({ code: "invalid-theme", message: "Theme collection active id was not found.", token: activeId });
  }

  return {
    issues,
    tokensById,
    value: {
      ...(resolvedActiveId ? { activeId: resolvedActiveId } : {}),
      ...(typeof raw.name === "string" && raw.name.trim() ? { name: raw.name.trim() } : {}),
      themes,
      version: 1
    }
  };
}
