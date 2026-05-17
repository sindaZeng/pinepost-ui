import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Cascader,
  createPinepostDatePresets,
  createPinepostDateRangePresets,
  createPinepostTimeRangePresets,
  type CascaderMultipleValue,
  type CascaderValue
} from "../index";

const routeOptions = [
  {
    value: "north",
    label: "North",
    children: [
      { value: "cedar", label: "Cedar desk" },
      { value: "moss", label: "Moss desk" }
    ]
  },
  {
    value: "south",
    label: "South",
    children: [
      { value: "river", label: "River desk" },
      { value: "window", label: "Window desk" }
    ]
  }
];

describe("Pinepost UI v0.17 pack", () => {
  it("keeps Cascader single selection behavior unchanged", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Cascader options={routeOptions} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Select" }));
    await user.click(screen.getByRole("button", { name: "North" }));
    await user.click(screen.getByRole("button", { name: "Cedar desk" }));

    expect(onValueChange).toHaveBeenLastCalledWith(
      ["north", "cedar"],
      [expect.objectContaining({ value: "north" }), expect.objectContaining({ value: "cedar" })]
    );
    expect(screen.getByRole("button", { name: "North / Cedar desk" })).toBeInTheDocument();
  });

  it("selects, unselects, and clears multiple Cascader leaf paths", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Cascader multiple clearable options={routeOptions} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Select" }));
    await user.click(screen.getByRole("button", { name: "North" }));
    await user.click(screen.getByRole("button", { name: "Cedar desk" }));

    expect(onValueChange).toHaveBeenLastCalledWith(
      [["north", "cedar"]],
      [[expect.objectContaining({ value: "north" }), expect.objectContaining({ value: "cedar" })]]
    );
    expect(screen.getByRole("button", { name: /1 selected/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Moss desk" }));
    expect(onValueChange).toHaveBeenLastCalledWith(
      [
        ["north", "cedar"],
        ["north", "moss"]
      ],
      expect.any(Array)
    );

    await user.click(screen.getByRole("button", { name: "Cedar desk" }));
    expect(onValueChange).toHaveBeenLastCalledWith([["north", "moss"]], expect.any(Array));

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(onValueChange).toHaveBeenLastCalledWith([], []);
  });

  it("toggles multiple Cascader matches from the filter panel", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Cascader multiple filterable options={routeOptions} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Select" }));
    await user.type(screen.getByLabelText("Filter options"), "river");
    await user.click(screen.getByRole("button", { name: "South / River desk" }));

    expect(onValueChange).toHaveBeenLastCalledWith(
      [["south", "river"]],
      [[expect.objectContaining({ value: "south" }), expect.objectContaining({ value: "river" })]]
    );
    expect(screen.getByRole("button", { name: /1 selected/ })).toBeInTheDocument();
  });

  it("creates stable date, date range, and time range presets", () => {
    const referenceDate = new Date(2026, 4, 18, 10, 30);
    const datePresets = createPinepostDatePresets({ locale: "zh-CN", referenceDate });
    const dateRangePresets = createPinepostDateRangePresets({ locale: "en", referenceDate });
    const timeRangePresets = createPinepostTimeRangePresets({ locale: "zh-CN" });

    expect(datePresets.map((item) => item.label)).toEqual(["今天", "明天"]);
    expect(typeof datePresets[0].value === "function" ? datePresets[0].value() : datePresets[0].value).toEqual(new Date(2026, 4, 18));
    expect(dateRangePresets.map((item) => item.label)).toEqual(["Last 7 days", "This week"]);
    expect(typeof dateRangePresets[0].value === "function" ? dateRangePresets[0].value() : dateRangePresets[0].value).toEqual([
      new Date(2026, 4, 12),
      new Date(2026, 4, 18)
    ]);
    expect(timeRangePresets).toEqual([
      { label: "上午", value: ["09:00", "12:00"] },
      { label: "下午", value: ["13:00", "18:00"] },
      { label: "全天", value: ["09:00", "18:00"] }
    ]);
  });
});
