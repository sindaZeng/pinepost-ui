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
