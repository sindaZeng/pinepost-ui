import * as React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Form,
  FormField,
  Input,
  Table,
  TreeSelect,
  type FormRef,
  type TableRef
} from "../index";

type RouteRow = {
  count: number;
  route: string;
  status: string;
};

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((next) => {
    resolve = next;
  });
  return { promise, resolve };
}

describe("Pinepost UI v0.9 pack", () => {
  it("resizes and toggles Table columns through visible controls and ref methods", async () => {
    const user = userEvent.setup();
    const ref = React.createRef<TableRef<RouteRow>>();
    const onColumnResize = vi.fn();
    const onColumnVisibilityChange = vi.fn();

    render(
      <Table
        ref={ref}
        resizableColumns
        defaultColumnWidths={{ route: 140 }}
        defaultHiddenColumns={["status"]}
        onColumnResize={onColumnResize}
        onColumnVisibilityChange={onColumnVisibilityChange}
        columns={[
          { key: "route", title: "Route" },
          { key: "count", title: "Count" },
          { key: "status", title: "Status" }
        ]}
        data={[{ route: "A7", count: 4, status: "Ready" }]}
      />
    );

    expect(screen.getByRole("columnheader", { name: "Route" })).toHaveStyle({ width: "140px" });
    expect(screen.queryByRole("columnheader", { name: "Status" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Increase Route width" }));
    expect(onColumnResize).toHaveBeenLastCalledWith("route", 156, expect.objectContaining({ route: 156 }));
    expect(screen.getByRole("columnheader", { name: "Route" })).toHaveStyle({ width: "156px" });

    act(() => ref.current?.setColumnHidden("status", false));
    expect(onColumnVisibilityChange).toHaveBeenLastCalledWith([]);
    expect(screen.getByRole("columnheader", { name: "Status" })).toBeInTheDocument();

    act(() => ref.current?.setColumnWidth("route", 188));
    expect(screen.getByRole("columnheader", { name: "Route" })).toHaveStyle({ width: "188px" });
    expect(ref.current?.getVisibleColumns().map((column) => String(column.key))).toEqual(["route", "count", "status"]);
  });

  it("exposes async Form validation state while a field is validating", async () => {
    const ref = React.createRef<FormRef>();
    const pending = deferred<true | string>();

    render(
      <Form
        ref={ref}
        model={{ desk: "cedar" }}
        rules={{
          desk: [{ validator: () => pending.promise }]
        }}
      >
        <FormField name="desk" label="Desk" validatingMessage="Checking desk">
          <Input value="cedar" readOnly />
        </FormField>
      </Form>
    );

    let validation: Promise<boolean> | undefined;
    act(() => {
      validation = ref.current?.validateField("desk");
    });

    await waitFor(() => {
      expect(screen.getByText("Checking desk")).toBeInTheDocument();
      expect(ref.current?.isFieldValidating("desk")).toBe(true);
    });

    let validationResult = true;
    await act(async () => {
      pending.resolve("Desk is busy");
      validationResult = (await validation) ?? true;
    });
    expect(validationResult).toBe(false);
    expect(screen.getByText("Desk is busy")).toBeInTheDocument();
    expect(ref.current?.isFieldValidating("desk")).toBe(false);
  });

  it("loads TreeSelect children lazily when a branch opens", async () => {
    const user = userEvent.setup();
    const loadData = vi.fn(async () => [{ value: "north", label: "North desk", isLeaf: true }]);

    render(
      <TreeSelect
        lazy
        loadData={loadData}
        data={[{ value: "routes", label: "Routes" }]}
        placeholder="Choose route"
      />
    );

    await user.click(screen.getByRole("button", { name: "Choose route" }));
    await user.click(screen.getByRole("button", { name: "Routes" }));

    expect(loadData).toHaveBeenCalledWith(expect.objectContaining({ value: "routes" }));
    expect(await screen.findByRole("button", { name: "North desk" })).toBeInTheDocument();
  });
});
