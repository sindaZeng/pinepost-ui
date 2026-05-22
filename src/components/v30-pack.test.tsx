import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Select,
  VirtualizedSelect,
  VirtualizedTable,
  type TableColumn,
  type VirtualizedTableRef,
  type VirtualizedTableVisibleRange
} from "../index";

type RouteRow = {
  count: number;
  id: string;
  route: string;
};

const routeColumns: Array<TableColumn<RouteRow>> = [
  { key: "route", title: "Route" },
  { key: "count", title: "Count" }
];

const routeRows = Array.from({ length: 24 }, (_, index) => ({
  id: `route-${index}`,
  route: `Route ${index}`,
  count: index
}));

describe("Pinepost UI v0.30 remote and virtual workflow handoff", () => {
  it("renders Select remote loading and empty states", async () => {
    const user = userEvent.setup();
    const remoteMethod = vi.fn();

    const { rerender } = render(
      <Select
        filterable
        loading
        loadingText="Fetching owners"
        emptyText="No owners found"
        remoteMethod={remoteMethod}
        options={[]}
        placeholder="Find owner"
      />
    );

    const trigger = screen.getByRole("combobox", { name: "Find owner" });
    await user.click(trigger);
    expect(screen.getByRole("status")).toHaveTextContent("Fetching owners");

    await user.type(screen.getByRole("textbox", { name: "Filter select" }), "cedar");
    expect(remoteMethod).toHaveBeenLastCalledWith("cedar");

    rerender(
      <Select
        filterable
        emptyText="No owners found"
        remoteMethod={remoteMethod}
        options={[]}
        placeholder="Find owner"
      />
    );

    expect(screen.getByText("No owners found")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("does not commit stale Select options while remote loading is visible", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        loading
        loadingText="Fetching owners"
        onValueChange={onValueChange}
        options={[{ value: "cedar", label: "Cedar owner" }]}
        placeholder="Find owner"
      />
    );

    const trigger = screen.getByRole("combobox", { name: "Find owner" });
    await user.click(trigger);

    expect(screen.getByRole("status")).toHaveTextContent("Fetching owners");
    expect(trigger).not.toHaveAttribute("aria-activedescendant");

    await user.keyboard("{Enter}");
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("Fetching owners");
  });

  it("renders VirtualizedSelect remote loading and empty states", async () => {
    const user = userEvent.setup();
    const remoteMethod = vi.fn();

    const { rerender } = render(
      <VirtualizedSelect
        filterable
        loading
        loadingText="Loading route matches"
        emptyText="No route matches"
        remoteMethod={remoteMethod}
        options={[]}
        placeholder="Find route"
      />
    );

    const trigger = screen.getByRole("button", { name: "Find route" });
    await user.click(trigger);
    expect(screen.getByRole("status")).toHaveTextContent("Loading route matches");

    await user.type(screen.getByRole("textbox", { name: "Filter virtual select" }), "north");
    expect(remoteMethod).toHaveBeenLastCalledWith("north");

    rerender(
      <VirtualizedSelect
        filterable
        emptyText="No route matches"
        remoteMethod={remoteMethod}
        options={[]}
        placeholder="Find route"
      />
    );

    expect(screen.getByText("No route matches")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("does not commit stale VirtualizedSelect options while remote loading is visible", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <VirtualizedSelect
        loading
        loadingText="Loading route matches"
        onChange={onChange}
        options={[{ value: "north", label: "North route" }]}
        placeholder="Find route"
      />
    );

    const trigger = screen.getByRole("button", { name: "Find route" });
    await user.click(trigger);

    expect(screen.getByRole("status")).toHaveTextContent("Loading route matches");
    expect(trigger).not.toHaveAttribute("aria-activedescendant");

    await user.keyboard("{Enter}");
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("Loading route matches");
  });

  it("does not repeat VirtualizedTable visible range callbacks for unchanged ranges", () => {
    const ranges: VirtualizedTableVisibleRange[] = [];

    function RangeHarness() {
      const [renderCount, setRenderCount] = React.useState(0);

      return (
        <>
          <button onClick={() => setRenderCount((count) => count + 1)} type="button">
            Rerender {renderCount}
          </button>
          <VirtualizedTable
            rowKey="id"
            height={88}
            rowHeight={44}
            onVisibleRangeChange={(range) => ranges.push(range)}
            columns={routeColumns}
            data={routeRows}
          />
        </>
      );
    }

    render(<RangeHarness />);

    expect(ranges).toEqual([{ startIndex: 0, endIndex: 9 }]);
    fireEvent.click(screen.getByRole("button", { name: /Rerender/ }));
    expect(ranges).toEqual([{ startIndex: 0, endIndex: 9 }]);
  });

  it("keeps VirtualizedTable controlled selection and visible ranges across scrolling", () => {
    const tableRef = React.createRef<VirtualizedTableRef<RouteRow>>();
    const onSelectionChange = vi.fn();
    const onVisibleRangeChange = vi.fn();

    const { container } = render(
      <VirtualizedTable
        ref={tableRef}
        rowKey="id"
        selectable
        height={88}
        rowHeight={44}
        selectedRowKeys={["route-0", "archived"]}
        onSelectionChange={onSelectionChange}
        onVisibleRangeChange={onVisibleRangeChange}
        columns={routeColumns}
        data={routeRows}
      />
    );

    expect(tableRef.current?.getSelectionKeys()).toEqual(["route-0", "archived"]);
    expect(screen.getByRole("checkbox", { name: "Select Route 0" })).toBeChecked();
    expect(onVisibleRangeChange).toHaveBeenLastCalledWith({ startIndex: 0, endIndex: 9 });

    const body = container.querySelector(".pinepost-virtual-table__body") as HTMLDivElement;
    fireEvent.scroll(body, { target: { scrollTop: 440 } });

    expect(onVisibleRangeChange).toHaveBeenLastCalledWith({ startIndex: 7, endIndex: 16 });
    fireEvent.click(screen.getByRole("checkbox", { name: "Select Route 10" }));

    expect(onSelectionChange).toHaveBeenLastCalledWith(
      [routeRows[0], routeRows[10]],
      ["route-0", "archived", "route-10"]
    );
    expect(tableRef.current?.getSelectionKeys()).toEqual(["route-0", "archived"]);
  });

  it("renders VirtualizedTable loading and empty states", () => {
    const { rerender } = render(
      <VirtualizedTable
        loading
        loadingText="Loading server routes"
        emptyText="No virtual routes"
        columns={routeColumns}
        data={[]}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Loading server routes");

    rerender(
      <VirtualizedTable
        emptyText="No virtual routes"
        columns={routeColumns}
        data={[]}
      />
    );

    expect(screen.getByText("No virtual routes")).toBeVisible();
  });
});
