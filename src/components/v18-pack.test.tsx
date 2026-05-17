import { describe, expect, it } from "vitest";
import {
  createPinepostDateRangePresets,
  createPinepostRecipeBundle,
  createPinepostThemeCollectionExport,
  createPinepostTimeRangePresets,
  createTableViewPresetExport,
  parsePinepostRecipeBundle,
  stringifyPinepostRecipeBundle,
  type TableViewPreset
} from "../index";

type RouteRow = {
  route: string;
  status: string;
};

const themeCollection = createPinepostThemeCollectionExport({
  activeId: "campaign",
  name: "Launch themes",
  themes: [
    {
      baseTheme: "calm",
      id: "workspace",
      name: "Workspace",
      tokens: {}
    },
    {
      baseTheme: "shop",
      id: "campaign",
      name: "Campaign",
      tokens: {
        "--pinepost-paper": "#fff4df"
      }
    }
  ]
});

const tableViewPresets = createTableViewPresetExport<RouteRow>({
  activeKey: "ops",
  presets: [
    {
      key: "ops",
      label: "Operations",
      columnOrder: ["status", "route"],
      hiddenColumns: ["status"],
      sortState: { key: "route", order: "asc" }
    }
  ] satisfies Array<TableViewPreset<RouteRow>>
});

describe("Pinepost UI v0.18 pack", () => {
  it("creates, normalizes, stringifies, and parses recipe bundles", () => {
    const bundle = createPinepostRecipeBundle({
      id: " Spring Launch ",
      name: " Spring launch ",
      description: "  Share launch setup  ",
      recipeIds: [" campaign-launch ", "admin-table", "campaign-launch", ""],
      schedule: {
        dateKeys: ["today"],
        dateRangeKeys: ["last-7-days", "this-week", "bad-range"],
        locale: "zh-CN",
        referenceDate: new Date(2026, 4, 18),
        timeRangeKeys: ["morning", "full-day"]
      },
      tableViewPresets,
      themeCollection
    });

    expect(bundle).toMatchObject({
      description: "Share launch setup",
      id: "spring-launch",
      name: "Spring launch",
      recipeIds: ["campaign-launch", "admin-table"],
      schedule: {
        dateKeys: ["today"],
        dateRangeKeys: ["last-7-days", "this-week"],
        locale: "zh-CN",
        referenceDate: "2026-05-18",
        timeRangeKeys: ["morning", "full-day"]
      },
      version: 1
    });
    expect(bundle.themeCollection?.themes).toHaveLength(2);
    expect(bundle.tableViewPresets?.activeKey).toBe("ops");

    const parsed = parsePinepostRecipeBundle(stringifyPinepostRecipeBundle(bundle));

    expect(parsed.issues).toEqual([]);
    expect(parsed.value).toEqual(bundle);
    expect(parsed.themeCollection?.value?.activeId).toBe("campaign");
    expect(parsed.tableViewPresets?.value?.activeKey).toBe("ops");
  });

  it("reports invalid recipe bundle structures and nested preset issues", () => {
    expect(parsePinepostRecipeBundle("{nope").issues.map((issue) => issue.code)).toEqual(["invalid-json"]);

    const parsed = parsePinepostRecipeBundle(
      JSON.stringify({
        id: "",
        name: "",
        recipeIds: ["valid", "", "valid"],
        schedule: {
          locale: "fr",
          referenceDate: "bad-date",
          dateKeys: ["unknown"],
          dateRangeKeys: ["this-week", "unknown"],
          timeRangeKeys: ["morning", "unknown"]
        },
        tableViewPresets: {
          activeKey: "missing",
          presets: [{ key: "", label: "", sortState: { key: "route", order: "sideways" } }],
          version: 1
        },
        themeCollection: {
          activeId: "missing",
          themes: [{ baseTheme: "bad", id: "bad", name: "Bad", tokens: { "--pinepost-leaf": "green" } }],
          version: 1
        },
        version: 1
      })
    );

    expect(parsed.issues.map((issue) => issue.code)).toEqual([
      "invalid-bundle",
      "invalid-schedule",
      "invalid-schedule",
      "invalid-schedule",
      "invalid-schedule",
      "invalid-theme",
      "invalid-color",
      "invalid-table-preset"
    ]);
    expect(parsed.value?.id).toBe("recipe-bundle");
    expect(parsed.value?.recipeIds).toEqual(["valid"]);
    expect(parsed.value?.schedule).toEqual({
      dateRangeKeys: ["this-week"],
      locale: "en",
      timeRangeKeys: ["morning"]
    });
  });

  it("produces schedule config that can drive date and time preset helpers", () => {
    const parsed = parsePinepostRecipeBundle(
      stringifyPinepostRecipeBundle(
        createPinepostRecipeBundle({
          id: "ops",
          name: "Ops",
          recipeIds: ["campaign-launch"],
          schedule: {
            dateRangeKeys: ["last-7-days"],
            locale: "en",
            referenceDate: "2026-05-18",
            timeRangeKeys: ["afternoon"]
          }
        })
      )
    );

    const referenceDate = parsed.value?.schedule?.referenceDate ? new Date(`${parsed.value.schedule.referenceDate}T00:00:00`) : undefined;
    const dateRangeKeys = parsed.value?.schedule?.dateRangeKeys ?? [];
    const timeRangeKeys = parsed.value?.schedule?.timeRangeKeys ?? [];
    const dateRanges = createPinepostDateRangePresets({ locale: parsed.value?.schedule?.locale, referenceDate })
      .filter((preset) => preset.key ? dateRangeKeys.includes(preset.key) : false);
    const timeRanges = createPinepostTimeRangePresets({ locale: parsed.value?.schedule?.locale })
      .filter((preset) => preset.key ? timeRangeKeys.includes(preset.key) : false);

    expect(dateRanges.map((preset) => preset.label)).toEqual(["Last 7 days"]);
    expect(timeRanges).toEqual([{ key: "afternoon", label: "Afternoon", value: ["13:00", "18:00"] }]);
  });
});
