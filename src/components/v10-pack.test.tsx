import * as React from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Cascader,
  Table,
  formatPinepostDate,
  formatPinepostDateRange,
  formatPinepostTimeRange,
  type TableRef
} from "../index";

type RouteRow = {
  count: number;
  route: string;
  status: string;
};

describe("Pinepost UI v0.10 pack", () => {
  it("loads Cascader children lazily and supports custom option rendering", async () => {
    const user = userEvent.setup();
    const loadData = vi.fn(async () => [{ value: "cedar", label: "Cedar desk", isLeaf: true }]);
    const onValueChange = vi.fn();

    render(
      <Cascader
        lazy
        loadData={loadData}
        onValueChange={onValueChange}
        options={[{ value: "routes", label: "Routes" }]}
        renderOption={(option) => <span>{option.label} node</span>}
      />
    );

    await user.click(screen.getByRole("button", { name: "Select" }));
    await user.click(screen.getByRole("button", { name: "Routes node" }));

    expect(loadData).toHaveBeenCalledWith(expect.objectContaining({ value: "routes" }), [
      expect.objectContaining({ value: "routes" })
    ]);
    expect(await screen.findByRole("button", { name: "Cedar desk node" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cedar desk node" }));
    expect(onValueChange).toHaveBeenCalledWith(
      ["routes", "cedar"],
      [expect.objectContaining({ value: "routes" }), expect.objectContaining({ value: "cedar" })]
    );
  });

  it("applies Table view presets and exposes preset ref methods", async () => {
    const user = userEvent.setup();
    const ref = React.createRef<TableRef<RouteRow>>();
    const onViewPresetChange = vi.fn();

    render(
      <Table
        ref={ref}
        rowKey="route"
        defaultViewPreset="compact"
        onViewPresetChange={onViewPresetChange}
        viewPresets={[
          { key: "compact", label: "Compact", hiddenColumns: ["status"], columnWidths: { route: 96 }, sortState: { key: "count", order: "desc" } },
          { key: "full", label: "Full", hiddenColumns: [], columnWidths: { route: 160 } }
        ]}
        columns={[
          { key: "route", title: "Route" },
          { key: "count", title: "Count", sortable: true },
          { key: "status", title: "Status" }
        ]}
        data={[
          { route: "A7", count: 2, status: "Ready" },
          { route: "B2", count: 9, status: "Review" }
        ]}
      />
    );

    expect(screen.queryByRole("columnheader", { name: "Status" })).not.toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Route" })).toHaveStyle({ width: "96px" });
    expect(within(screen.getAllByRole("row")[1]).getByText("B2")).toBeInTheDocument();
    expect(ref.current?.getViewPreset()).toBe("compact");

    await user.click(screen.getByRole("button", { name: "Full" }));
    expect(screen.getByRole("columnheader", { name: "Status" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Route" })).toHaveStyle({ width: "160px" });
    expect(onViewPresetChange).toHaveBeenCalledWith("full", expect.objectContaining({ key: "full" }));

    act(() => ref.current?.setViewPreset("compact"));
    expect(screen.queryByRole("columnheader", { name: "Status" })).not.toBeInTheDocument();
    expect(ref.current?.getViewPreset()).toBe("compact");
  });

  it("formats Pinepost dates and ranges without external date helpers", () => {
    const start = new Date(2026, 4, 17, 9, 30);
    const end = new Date(2026, 4, 19, 18, 0);

    expect(formatPinepostDate(start, { locale: "en" })).toBe("May 17, 2026");
    expect(formatPinepostDate(start, { locale: "zh-CN" })).toBe("2026年5月17日");
    expect(formatPinepostDate(start, { locale: "zh-CN", style: "datetime" })).toBe("2026年5月17日 09:30");
    expect(formatPinepostDateRange([start, end], { locale: "zh-CN" })).toBe("2026年5月17日 至 2026年5月19日");
    expect(formatPinepostTimeRange(["09:00", undefined], { fallback: "未定", locale: "zh-CN" })).toBe("09:00 至 未定");
  });
});
