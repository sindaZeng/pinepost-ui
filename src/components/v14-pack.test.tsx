import { describe, expect, it } from "vitest";
import {
  createPinepostThemeClassName,
  createPinepostThemeExport,
  parsePinepostThemeExport,
  pinepostThemePresets,
  stringifyPinepostThemeExport,
  validatePinepostThemeTokens
} from "../index";

describe("Pinepost UI v0.14 pack", () => {
  it("serializes theme exports with only changed tokens", () => {
    const exportValue = createPinepostThemeExport({
      baseTheme: "calm",
      name: "Desk Launch",
      tokens: {
        "--pinepost-leaf": "#267755",
        "--pinepost-paper": pinepostThemePresets.calm["--pinepost-paper"]
      }
    });

    expect(exportValue).toEqual({
      baseTheme: "calm",
      name: "Desk Launch",
      tokens: {
        "--pinepost-leaf": "#267755"
      },
      version: 1
    });

    expect(stringifyPinepostThemeExport(exportValue)).toContain('"--pinepost-leaf": "#267755"');
  });

  it("parses theme exports, validates input, and fills missing tokens from the base theme", () => {
    const result = parsePinepostThemeExport(
      JSON.stringify({
        baseTheme: "shop",
        name: "Counter",
        tokens: {
          "--pinepost-leaf": "#267755",
          "--pinepost-radius-md": "12px"
        },
        version: 1
      })
    );

    expect(result.issues).toEqual([]);
    expect(result.value?.baseTheme).toBe("shop");
    expect(result.tokens["--pinepost-paper"]).toBe(pinepostThemePresets.shop["--pinepost-paper"]);
    expect(result.tokens["--pinepost-leaf"]).toBe("#267755");
    expect(result.tokens["--pinepost-radius-md"]).toBe("12px");
  });

  it("reports invalid theme imports without throwing", () => {
    const result = parsePinepostThemeExport(
      JSON.stringify({
        baseTheme: "calm",
        tokens: {
          "--pinepost-leaf": "green",
          "--pinepost-radius-md": "64px",
          "--pinepost-unknown": "#ffffff"
        },
        version: 1
      })
    );

    expect(result.issues.map((issue) => issue.code)).toEqual(["unknown-token", "invalid-color", "invalid-radius"]);
    expect(result.tokens["--pinepost-leaf"]).toBe(pinepostThemePresets.calm["--pinepost-leaf"]);
  });

  it("validates loose token maps and creates stable class names", () => {
    expect(validatePinepostThemeTokens({ "--pinepost-paper": "#fff4df", "--pinepost-radius-md": "10px" })).toEqual([]);
    expect(validatePinepostThemeTokens({ "--pinepost-paper": "cream" })).toEqual([
      { code: "invalid-color", message: "Expected a six-digit hex color.", token: "--pinepost-paper" }
    ]);
    expect(createPinepostThemeClassName("Desk Launch 2026")).toBe("pinepost-theme-desk-launch-2026");
    expect(createPinepostThemeClassName("")).toBe("pinepost-theme-custom");
  });
});
