import { describe, expect, it } from "vitest";
import {
  createPinepostThemeCss,
  mergePinepostThemeTokens,
  pinepostThemePresets,
  pinepostThemeTokenNames
} from "../index";

describe("Pinepost UI v0.13 pack", () => {
  it("exports editable theme presets and token names", () => {
    expect(pinepostThemeTokenNames).toContain("--pinepost-paper");
    expect(pinepostThemeTokenNames).toContain("--pinepost-radius-md");
    expect(pinepostThemePresets.calm["--pinepost-leaf"]).toBe("#4f8f5f");
    expect(pinepostThemePresets.play["--pinepost-stamp"]).toBe("#d9536b");
    expect(pinepostThemePresets.shop["--pinepost-paper"]).toBe("#fff0dc");
  });

  it("merges preset tokens with custom overrides", () => {
    const tokens = mergePinepostThemeTokens("calm", {
      "--pinepost-leaf": "#12784f",
      "--pinepost-radius-md": "12px"
    });

    expect(tokens["--pinepost-paper"]).toBe("#fff8ea");
    expect(tokens["--pinepost-leaf"]).toBe("#12784f");
    expect(tokens["--pinepost-radius-md"]).toBe("12px");
  });

  it("creates a stable CSS variable block", () => {
    const css = createPinepostThemeCss({
      selector: ".my-pinepost-theme",
      tokens: mergePinepostThemeTokens("shop", {
        "--pinepost-paper": "#fff4df",
        "--pinepost-radius-md": "10px"
      })
    });

    expect(css).toContain(".my-pinepost-theme {");
    expect(css).toContain("  --pinepost-paper: #fff4df;");
    expect(css).toContain("  --pinepost-leaf: #4e8c68;");
    expect(css).toContain("  --pinepost-radius-md: 10px;");
    expect(css.trim().endsWith("}")).toBe(true);
  });
});
