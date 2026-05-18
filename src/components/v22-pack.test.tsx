import * as React from "react";
import { act } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Cascader,
  DatePickerPanel,
  DateTimePickerPanel,
  Form,
  FormField,
  Input,
  Select,
  Table,
  TreeSelect,
  Upload,
  type FormRef,
  type TableColumn,
  type TableRef,
  type UploadRef
} from "../index";

type RouteRow = {
  count: number;
  id: string;
  route: string;
};

const routeRows: RouteRow[] = [
  { count: 2, id: "a", route: "North" },
  { count: 4, id: "b", route: "South" }
];

const routeColumns: Array<TableColumn<RouteRow>> = [
  { key: "route", title: "Route" },
  { key: "count", title: "Count" }
];

const routeTree = [
  {
    value: "routes",
    label: "Routes",
    children: [
      { value: "north", label: "North desk" },
      { value: "south", label: "South desk" }
    ]
  }
];

describe("Pinepost UI v0.22 maturity hardening", () => {
  it("keeps Table row selection controlled and exposes selection keys", async () => {
    const user = userEvent.setup();
    const tableRef = React.createRef<TableRef<RouteRow>>();
    const onSelectionChange = vi.fn();

    function ControlledTable() {
      const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(["a"]);

      return (
        <Table
          ref={tableRef}
          rowKey="id"
          selectable
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={(rows, keys) => {
            setSelectedRowKeys(keys);
            onSelectionChange(rows, keys);
          }}
          columns={routeColumns}
          data={routeRows}
        />
      );
    }

    render(<ControlledTable />);

    expect(screen.getByRole("checkbox", { name: "Select North" })).toBeChecked();
    expect(tableRef.current?.getSelectionKeys()).toEqual(["a"]);

    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(routeRows, ["a", "b"]);
    expect(tableRef.current?.getSelectionKeys()).toEqual(["a", "b"]);

    await user.click(screen.getByRole("checkbox", { name: "Select North" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([routeRows[1]], ["b"]);
    expect(tableRef.current?.getSelectionRows()).toEqual([routeRows[1]]);
  });

  it("passes Form validation errors to failures and wires field accessibility", async () => {
    const user = userEvent.setup();
    const formRef = React.createRef<FormRef>();
    const onFinish = vi.fn();
    const onFinishFailed = vi.fn();

    render(
      <Form
        ref={formRef}
        model={{ route: "" }}
        rules={{ route: [{ required: true, message: "Route is required." }] }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormField name="route" label="Route" htmlFor="route-input" description="Use the route code.">
          <Input id="route-input" value="" onChange={() => undefined} />
        </FormField>
        <button type="submit">Save</button>
      </Form>
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onFinish).not.toHaveBeenCalled();
    expect(onFinishFailed).toHaveBeenCalledWith({ route: "" }, { route: "Route is required." });
    expect(formRef.current?.getFieldsError()).toEqual({ route: "Route is required." });
    expect(screen.getByLabelText("Route")).toHaveAttribute("aria-invalid", "true");
    const describedBy = screen.getByLabelText("Route").getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(describedBy?.split(" ").map((id) => document.getElementById(id)?.textContent)).toContain("Route is required.");
  });

  it("keeps every uploaded file successful after multi-file submit and resets the input", async () => {
    const user = userEvent.setup();
    const uploadRef = React.createRef<UploadRef>();
    const customRequest = vi.fn(({ onSuccess }) => onSuccess?.({ ok: true }));

    render(<Upload ref={uploadRef} multiple label="Upload manifests" customRequest={customRequest} />);

    const input = screen.getByLabelText("Upload manifests") as HTMLInputElement;
    await user.upload(input, [
      new File(["a"], "first.txt", { type: "text/plain" }),
      new File(["b"], "second.txt", { type: "text/plain" })
    ]);

    expect(input.value).toBe("");

    await act(async () => uploadRef.current?.submit());

    expect(customRequest).toHaveBeenCalledTimes(2);
    expect(uploadRef.current?.getFiles().map((file) => [file.name, file.status])).toEqual([
      ["first.txt", "success"],
      ["second.txt", "success"]
    ]);
    expect(within(screen.getByRole("list")).getAllByText("success")).toHaveLength(2);
  });

  it("renders mixed Select option groups and uses native clear buttons for deep pickers", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Select
          clearable
          defaultValue="north"
          options={[
            { value: "north", label: "North owner", group: "Daily" },
            { value: "loose", label: "Loose owner" }
          ]}
        />
        <Cascader clearable defaultValue={["routes", "north"]} options={routeTree} />
      </>
    );

    await user.click(screen.getByRole("combobox", { name: "North owner" }));
    expect(screen.getByRole("option", { name: "North owner" })).toBeVisible();
    expect(screen.getByRole("option", { name: "Loose owner" })).toBeVisible();

    const cascaderClear = screen.getAllByRole("button", { name: "Clear" }).find((button) => button.classList.contains("pinepost-picker-trigger__clear"));
    expect(cascaderClear?.tagName).toBe("BUTTON");
  });

  it("dismisses TreeSelect with keyboard and outside pointer actions", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <TreeSelect data={routeTree} defaultExpanded={["routes"]} filterable placeholder="Choose scope" />
        <button type="button">Outside</button>
      </div>
    );

    await user.click(screen.getByRole("button", { name: "Choose scope" }));
    expect(screen.getByText("North desk")).toBeVisible();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("North desk")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Choose scope" }));
    expect(screen.getByText("North desk")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByText("North desk")).not.toBeInTheDocument();
  });

  it("labels picker days and forwards DateTime root and disabled-time props", async () => {
    const user = userEvent.setup();
    const onDateTimeChange = vi.fn();

    render(
      <>
        <DatePickerPanel month={new Date(2026, 4, 1)} />
        <DateTimePickerPanel
          aria-label="Dispatch window"
          data-testid="dispatch-window"
          role="group"
          value={new Date(2026, 4, 18, 9, 0)}
          start="09:00"
          end="10:00"
          step="00:30"
          disabledTime={(time) => time === "09:30"}
          onValueChange={onDateTimeChange}
        />
      </>
    );

    expect(screen.getAllByRole("button", { name: "2026-05-18" })[0]).toBeVisible();
    expect(screen.getByRole("group", { name: "Dispatch window" })).toHaveAttribute("data-testid", "dispatch-window");
    expect(screen.getByRole("button", { name: "09:30" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "09:30" }));
    expect(onDateTimeChange).not.toHaveBeenCalled();
  });
});
