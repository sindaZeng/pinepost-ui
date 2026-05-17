import * as React from "react";
import { act } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DateTimePickerPanel,
  Table,
  TimePickerPanel,
  Tree,
  Upload,
  type TableRef
} from "../index";

type RouteRow = {
  count: number;
  id: string;
  route: string;
};

describe("Pinepost UI v0.7 pack", () => {
  it("expands, edits, summarizes, and clears advanced Table rows", async () => {
    const user = userEvent.setup();
    const ref = React.createRef<TableRef<RouteRow>>();
    const onCellEdit = vi.fn();
    const onExpandChange = vi.fn();

    render(
      <Table
        ref={ref}
        rowKey="id"
        editable
        defaultExpandedRowKeys={["a"]}
        onCellEdit={onCellEdit}
        onExpandChange={onExpandChange}
        renderExpandedRow={(row) => <div>{row.route} detail note</div>}
        summary={(rows) => ({ route: "Total", count: rows.reduce((total, row) => total + row.count, 0) })}
        columns={[
          { key: "route", title: "Route", editable: true },
          { key: "count", title: "Count", align: "right" }
        ]}
        data={[
          { id: "a", route: "North", count: 2 },
          { id: "b", route: "South", count: 3 }
        ]}
      />
    );

    expect(screen.getByText("North detail note")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    await user.dblClick(screen.getByText("North"));
    const editor = screen.getByLabelText("Edit Route for North");
    await user.clear(editor);
    await user.type(editor, "North Prime{Enter}");
    expect(onCellEdit).toHaveBeenCalledWith(expect.objectContaining({ id: "a" }), "route", "North Prime");

    act(() => ref.current?.toggleRowExpansion({ id: "b", route: "South", count: 3 }, true));
    expect(ref.current?.getExpandedRows()).toHaveLength(2);
    expect(onExpandChange).toHaveBeenLastCalledWith(["a", "b"]);
    act(() => ref.current?.clearExpansion());
    expect(ref.current?.getExpandedRows()).toEqual([]);
  });

  it("selects date-time and time values from panel components", async () => {
    const user = userEvent.setup();
    const onDateTimeChange = vi.fn();
    const onTimeChange = vi.fn();

    render(
      <>
        <DateTimePickerPanel
          value={new Date(2026, 4, 17, 9, 30)}
          shortcuts={[{ label: "Tomorrow noon", value: () => new Date(2026, 4, 18, 12, 0) }]}
          onValueChange={onDateTimeChange}
        />
        <TimePickerPanel
          aria-label="Standalone time panel"
          role="group"
          value="09:30"
          onValueChange={onTimeChange}
          step="00:30"
          start="09:00"
          end="10:00"
        />
      </>
    );

    await user.click(screen.getByRole("button", { name: "Tomorrow noon" }));
    expect(onDateTimeChange).toHaveBeenCalledWith(new Date(2026, 4, 18, 12, 0));
    const timePanel = screen.getByRole("group", { name: "Standalone time panel" });
    await user.click(within(timePanel).getByRole("button", { name: "10:00" }));
    expect(onTimeChange).toHaveBeenCalledWith("10:00");
  });

  it("accepts dropped Upload files and keeps a queue", async () => {
    const onChange = vi.fn();
    const onDrop = vi.fn();
    const beforeUpload = vi.fn(() => true);
    const first = new File(["a"], "route-a.txt", { type: "text/plain" });
    const second = new File(["b"], "route-b.txt", { type: "text/plain" });

    render(<Upload drag label="Drop manifests" beforeUpload={beforeUpload} onChange={onChange} onDrop={onDrop} />);

    const dropzone = screen.getByText("Drop manifests").closest(".pinepost-upload__dropzone") as HTMLElement;
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [first, second]
      }
    });

    await waitFor(() => {
      expect(beforeUpload).toHaveBeenCalledWith(first, [first, second]);
      expect(onDrop).toHaveBeenCalledWith([first, second]);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: "route-a.txt" }), expect.any(Array));
      expect(screen.getByText("route-a.txt")).toBeInTheDocument();
      expect(screen.getByText("route-b.txt")).toBeInTheDocument();
    });
  });

  it("loads Tree children lazily when branches expand", async () => {
    const user = userEvent.setup();
    const loadData = vi.fn(async () => [{ value: "north", label: "North lane", isLeaf: true }]);

    render(
      <Tree
        lazy
        loadData={loadData}
        items={[{ value: "routes", label: "Routes" }]}
        defaultExpanded={[]}
      />
    );

    await user.click(screen.getByRole("button", { name: "Routes" }));
    expect(loadData).toHaveBeenCalledWith(expect.objectContaining({ value: "routes" }));
    expect(await screen.findByRole("button", { name: "North lane" })).toBeInTheDocument();
  });
});
