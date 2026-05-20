import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateRangePickerPanel, TimeRangePickerPanel } from "../index";

describe("Pinepost UI v0.24 scheduling pressure", () => {
  it("does not submit a date range that crosses a disabled date", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DateRangePickerPanel
        month={new Date(2026, 4, 1)}
        disabledDate={(date) => date.getFullYear() === 2026 && date.getMonth() === 4 && date.getDate() === 20}
        onValueChange={onValueChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "2026-05-18" }));
    await user.click(screen.getByRole("button", { name: "2026-05-22" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith([new Date(2026, 4, 18), undefined]);
  });

  it("does not submit a time range shortcut when either edge is disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <TimeRangePickerPanel
        disabledTime={(time) => time === "12:00"}
        onValueChange={onValueChange}
        shortcuts={[
          { key: "lunch", label: "Lunch window", value: ["12:00", "13:00"] },
          { key: "morning", label: "Morning window", value: ["09:00", "11:00"] }
        ]}
      />
    );

    await user.click(screen.getByRole("button", { name: "Lunch window" }));
    expect(onValueChange).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Morning window" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith(["09:00", "11:00"]);
  });
});
