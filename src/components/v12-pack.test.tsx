import * as React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  Table,
  TableColumnSettings,
  Upload,
  type TableColumn,
  type TableRef,
  type UploadFile,
  type UploadRef
} from "../index";

type RouteRow = {
  count: number;
  route: string;
  status: string;
};

const routeColumns: Array<TableColumn<RouteRow>> = [
  { key: "route", title: "Route" },
  { key: "count", title: "Count" },
  { key: "status", title: "Status" }
];

const routeRows: RouteRow[] = [
  { route: "North", count: 2, status: "Ready" },
  { route: "South", count: 4, status: "Review" }
];

function headerTexts() {
  return screen.getAllByRole("columnheader").map((header) => header.textContent?.trim());
}

describe("Pinepost UI v0.12 pack", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("orders Table columns and exposes order ref methods", () => {
    const ref = React.createRef<TableRef<RouteRow>>();

    render(
      <Table
        ref={ref}
        columns={routeColumns}
        data={routeRows}
        defaultColumnOrder={["status", "route", "count"]}
      />
    );

    expect(headerTexts()).toEqual(["Status", "Route", "Count"]);
    expect(ref.current?.getColumnOrder()).toEqual(["status", "route", "count"]);

    act(() => ref.current?.setColumnOrder(["count", "route", "status"]));
    expect(headerTexts()).toEqual(["Count", "Route", "Status"]);
    expect(ref.current?.getColumnOrder()).toEqual(["count", "route", "status"]);

    act(() => ref.current?.resetColumnOrder());
    expect(headerTexts()).toEqual(["Route", "Count", "Status"]);
  });

  it("persists TableColumnSettings visibility, order, and density", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    window.localStorage.setItem(
      "pinepost-table-settings",
      JSON.stringify({ hiddenColumns: ["count"], columnOrder: ["status", "route", "count"], density: "compact" })
    );

    render(
      <TableColumnSettings
        columns={routeColumns}
        onValueChange={onValueChange}
        storageKey="pinepost-table-settings"
      />
    );

    expect(screen.getByRole("checkbox", { name: "Show Count" })).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Compact" })).toHaveAttribute("aria-pressed", "true");

    const rows = screen.getAllByTestId("pinepost-table-column-setting");
    expect(rows.map((row) => row.querySelector("strong")?.textContent)).toEqual(["Status", "Route", "Count"]);

    await user.click(screen.getByRole("checkbox", { name: "Show Count" }));
    expect(onValueChange).toHaveBeenLastCalledWith({
      hiddenColumns: [],
      columnOrder: ["status", "route", "count"],
      density: "compact"
    });

    await user.click(screen.getByRole("button", { name: "Move Status down" }));
    expect(onValueChange).toHaveBeenLastCalledWith({
      hiddenColumns: [],
      columnOrder: ["route", "status", "count"],
      density: "compact"
    });

    await user.click(screen.getByRole("button", { name: "Spacious" }));
    expect(JSON.parse(window.localStorage.getItem("pinepost-table-settings") ?? "{}")).toEqual({
      hiddenColumns: [],
      columnOrder: ["route", "status", "count"],
      density: "spacious"
    });
  });

  it("renders custom Upload files, retries failed files, and hides default file list", async () => {
    const user = userEvent.setup();
    const ref = React.createRef<UploadRef>();
    const onRetry = vi.fn();
    const failedFile: UploadFile = {
      error: new Error("Network"),
      name: "label.png",
      percent: 40,
      status: "error",
      uid: "failed-1"
    };

    const { rerender } = render(
      <Upload
        ref={ref}
        defaultFileList={[failedFile]}
        label="Upload artwork"
        onRetry={onRetry}
        renderFile={(file, actions) => (
          <button type="button" onClick={actions.retry}>
            Retry {file.name} {file.status}
          </button>
        )}
      />
    );

    await user.click(screen.getByRole("button", { name: "Retry label.png error" }));
    expect(onRetry).toHaveBeenCalledWith(expect.objectContaining({ name: "label.png", status: "ready" }), expect.any(Array));
    expect(ref.current?.getFiles()[0]).toMatchObject({ name: "label.png", percent: 0, status: "ready" });

    act(() => ref.current?.setFiles([{ ...failedFile, uid: "manual-1", name: "manual.txt", status: "ready" }]));
    expect(screen.getByRole("button", { name: "Retry manual.txt ready" })).toBeInTheDocument();

    rerender(
      <Upload
        ref={ref}
        defaultFileList={[failedFile]}
        label="Upload artwork"
        showFileList={false}
      />
    );
    expect(screen.queryByText("label.png")).not.toBeInTheDocument();
  });
});
