import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DateRangePickerPanel,
  Table,
  TimeRangePickerPanel
} from "../index";

type MailRow = {
  count: number;
  desk: string;
  route: string;
  status: string;
};

describe("Pinepost UI v0.8 pack", () => {
  it("renders grouped Table headers and fixed leaf columns", () => {
    render(
      <Table
        columns={[
          { key: "desk", title: "Desk", fixed: "left", width: 120 },
          {
            key: "delivery",
            title: "Delivery",
            children: [
              { key: "route", title: "Route" },
              { key: "count", title: "Count", align: "right", width: 90 }
            ]
          },
          { key: "status", title: "Status", fixed: "right" }
        ]}
        data={[{ desk: "Cedar", route: "A7", count: 8, status: "Ready" }]}
      />
    );

    expect(screen.getByRole("columnheader", { name: "Delivery" })).toHaveAttribute("colspan", "2");
    expect(screen.getByRole("columnheader", { name: "Desk" })).toHaveAttribute("data-fixed", "left");
    expect(screen.getByRole("columnheader", { name: "Status" })).toHaveAttribute("data-fixed", "right");
    expect(screen.getByText("Cedar")).toHaveAttribute("data-fixed", "left");
    expect(screen.getByText("Ready")).toHaveAttribute("data-fixed", "right");
  });

  it("selects date ranges with clicks and shortcut ranges", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DateRangePickerPanel
        month={new Date(2026, 4, 1)}
        shortcuts={[{ label: "Festival week", value: () => [new Date(2026, 4, 18), new Date(2026, 4, 24)] }]}
        onValueChange={onValueChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "2026-05-17" }));
    expect(onValueChange).toHaveBeenLastCalledWith([new Date(2026, 4, 17), undefined]);

    await user.click(screen.getByRole("button", { name: "2026-05-19" }));
    expect(onValueChange).toHaveBeenLastCalledWith([new Date(2026, 4, 17), new Date(2026, 4, 19)]);

    await user.click(screen.getByRole("button", { name: "Festival week" }));
    expect(onValueChange).toHaveBeenLastCalledWith([new Date(2026, 4, 18), new Date(2026, 4, 24)]);
  });

  it("selects a time range from paired time panels", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <TimeRangePickerPanel
        value={["09:00", "10:00"]}
        onValueChange={onValueChange}
        start="09:00"
        end="11:00"
        step="00:30"
      />
    );

    const startPanel = screen.getByRole("group", { name: "Start time" });
    const endPanel = screen.getByRole("group", { name: "End time" });

    await user.click(within(startPanel).getByRole("button", { name: "09:30" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["09:30", "10:00"]);

    await user.click(within(endPanel).getByRole("button", { name: "11:00" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["09:00", "11:00"]);
  });
});
