import { execFileSync } from "node:child_process";
import packageJson from "../../package.json";
import { describe, expect, it } from "vitest";
import {
  createPinepostThemeCollectionExport,
  createTableViewPresetExport,
  parsePinepostThemeCollectionExport,
  parseTableViewPresetExport,
  pinepostThemePresets,
  stringifyPinepostThemeCollectionExport,
  stringifyTableViewPresetExport,
  type TableViewPreset
} from "../index";

type RouteRow = {
  count: number;
  route: string;
  status: string;
};

describe("Pinepost UI v0.16 pack", () => {
  it("creates and parses portable theme collections", () => {
    const collection = createPinepostThemeCollectionExport({
      activeId: "campaign",
      name: "Launch themes",
      themes: [
        {
          baseTheme: "calm",
          id: "workspace",
          name: "Workspace",
          tokens: pinepostThemePresets.calm
        },
        {
          baseTheme: "shop",
          id: "campaign",
          name: "Campaign",
          tokens: {
            ...pinepostThemePresets.shop,
            "--pinepost-paper": "#fff4df",
            "--pinepost-radius-md": "12px"
          }
        }
      ]
    });

    expect(collection.activeId).toBe("campaign");
    expect(collection.themes).toHaveLength(2);
    expect(collection.themes[0]).toMatchObject({ id: "workspace", name: "Workspace", tokens: {} });
    expect(collection.themes[1].tokens).toEqual({
      "--pinepost-paper": "#fff4df",
      "--pinepost-radius-md": "12px"
    });

    const parsed = parsePinepostThemeCollectionExport(stringifyPinepostThemeCollectionExport(collection));

    expect(parsed.issues).toEqual([]);
    expect(parsed.value?.activeId).toBe("campaign");
    expect(parsed.tokensById.campaign["--pinepost-paper"]).toBe("#fff4df");
    expect(parsed.tokensById.workspace["--pinepost-paper"]).toBe(pinepostThemePresets.calm["--pinepost-paper"]);

    const invalid = parsePinepostThemeCollectionExport(
      JSON.stringify({
        activeId: "missing",
        themes: [
          {
            baseTheme: "calm",
            id: "bad",
            name: "Bad",
            tokens: {
              "--pinepost-leaf": "green",
              "--pinepost-unknown": "#ffffff"
            }
          }
        ],
        version: 1
      })
    );

    expect(invalid.issues.map((issue) => issue.code)).toEqual(["unknown-token", "invalid-color", "invalid-theme"]);
    expect(invalid.value?.activeId).toBe("bad");
  });

  it("creates and parses serializable table view preset exports", () => {
    const presets: Array<TableViewPreset<RouteRow>> = [
      {
        key: "ops",
        label: "Operations",
        columnOrder: ["status", "route", "count"],
        columnWidths: { route: 180, status: "120px" },
        hiddenColumns: ["count"],
        sortState: { key: "route", order: "asc" }
      },
      {
        key: "review",
        label: "Review",
        sortState: { key: "count", order: "desc" }
      }
    ];

    const exportValue = createTableViewPresetExport({ activeKey: "ops", presets });
    expect(exportValue).toEqual({
      activeKey: "ops",
      presets: [
        {
          key: "ops",
          label: "Operations",
          columnOrder: ["status", "route", "count"],
          columnWidths: { route: 180, status: "120px" },
          hiddenColumns: ["count"],
          sortState: { key: "route", order: "asc" }
        },
        {
          key: "review",
          label: "Review",
          sortState: { key: "count", order: "desc" }
        }
      ],
      version: 1
    });

    const parsed = parseTableViewPresetExport(stringifyTableViewPresetExport(exportValue));
    expect(parsed.issues).toEqual([]);
    expect(parsed.presets[0]).toMatchObject({
      key: "ops",
      label: "Operations",
      hiddenColumns: ["count"],
      sortState: { key: "route", order: "asc" }
    });

    const invalid = parseTableViewPresetExport(
      JSON.stringify({
        activeKey: "bad",
        presets: [
          { key: "", label: "", sortState: { key: "route", order: "sideways" } },
          { key: "valid", label: "Valid", columnWidths: { route: {} } }
        ],
        version: 1
      })
    );

    expect(invalid.issues.map((issue) => issue.code)).toEqual(["invalid-preset", "invalid-sort", "invalid-width", "invalid-active"]);
    expect(invalid.value?.activeKey).toBe("valid");
  });

  it("prints release notes for the current package version", () => {
    const output = execFileSync("node", ["scripts/draft-release-notes.mjs"], { encoding: "utf8" });

    expect(output).toContain(`# Pinepost UI v${packageJson.version}`);
    expect(output).toContain("## Changes");
    expect(output).toMatch(/^- .+/m);
    expect(output).toContain("corepack pnpm check");
  });
});
