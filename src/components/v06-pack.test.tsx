import * as React from "react";
import { act } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  ColorPickerPanel,
  DatePickerPanel,
  Form,
  FormField,
  Icon,
  InfiniteScroll,
  Select,
  Table,
  Tree,
  Upload,
  useLoadingService,
  useMessageService,
  useNotificationService,
  VirtualizedSelect,
  VirtualizedTable,
  VirtualizedTree,
  type FormRef,
  type TableRef,
  type TreeRef,
  type UploadRef,
  type VirtualizedSelectRef,
  type VirtualizedTableRef,
  type VirtualizedTreeRef
} from "../index";

const routeOptions = [
  { value: "north", label: "North route", group: "Daily" },
  { value: "south", label: "South route", group: "Daily" },
  { value: "market", label: "Market route", group: "Weekend" }
];

const treeItems = [
  {
    value: "routes",
    label: "Routes",
    children: [
      { value: "north", label: "North lane" },
      { value: "south", label: "South lane" }
    ]
  }
];

describe("Pinepost UI v0.6 pack", () => {
  it("renders new utility components and emits panel/scroll events", async () => {
    const user = userEvent.setup();
    const onColorChange = vi.fn();
    const onDateChange = vi.fn();
    const onLoadMore = vi.fn();

    render(
      <>
        <Icon name="stamp" label="Stamp icon" />
        <ColorPickerPanel value="#4f8f5f" presets={["#4f8f5f", "#c9624b"]} onValueChange={onColorChange} />
        <DatePickerPanel
          value={new Date(2026, 4, 17)}
          shortcuts={[{ label: "Tomorrow", value: () => new Date(2026, 4, 18) }]}
          onValueChange={onDateChange}
        />
        <InfiniteScroll hasMore onLoadMore={onLoadMore}>
          <div style={{ height: 400 }}>Letter rows</div>
        </InfiniteScroll>
      </>
    );

    expect(screen.getByLabelText("Stamp icon")).toHaveClass("pinepost-icon");
    await user.click(screen.getByRole("button", { name: "#c9624b" }));
    expect(onColorChange).toHaveBeenCalledWith("#c9624b");
    await user.click(screen.getByRole("button", { name: "Tomorrow" }));
    expect(onDateChange).toHaveBeenCalledWith(new Date(2026, 4, 18));
    act(() => {
      screen.getByTestId("pinepost-infinite-scroll").dispatchEvent(new Event("scroll", { bubbles: true }));
    });
    expect(onLoadMore).toHaveBeenCalledOnce();
  });

  it("validates, resets, and clears Form fields through methods", async () => {
    const formRef = React.createRef<FormRef>();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    render(
      <Form
        ref={formRef}
        model={{ desk: "" }}
        rules={{ desk: [{ required: true, message: "Desk is required" }] }}
      >
        <FormField name="desk" label="Desk" htmlFor="desk">
          <input id="desk" defaultValue="" />
        </FormField>
      </Form>
    );

    let valid = true;
    await act(async () => {
      valid = (await formRef.current?.validate()) ?? true;
    });
    expect(valid).toBe(false);
    expect(screen.getByRole("alert")).toHaveTextContent("Desk is required");
    expect(formRef.current?.getFieldError("desk")).toBe("Desk is required");

    act(() => formRef.current?.clearValidate("desk"));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    act(() => formRef.current?.scrollToField("desk"));
    expect(scrollIntoView).toHaveBeenCalled();
    act(() => formRef.current?.resetFields());
    expect(formRef.current?.getFieldError("desk")).toBeUndefined();
  });

  it("sorts, filters, selects, and clears Table rows through methods", async () => {
    const user = userEvent.setup();
    const tableRef = React.createRef<TableRef<{ id: string; route: string; count: number }>>();
    const onSelectionChange = vi.fn();

    render(
      <Table
        ref={tableRef}
        rowKey="id"
        selectable
        onSelectionChange={onSelectionChange}
        columns={[
          { key: "route", title: "Route", sortable: true },
          { key: "count", title: "Count", sortable: true, align: "right" }
        ]}
        data={[
          { id: "a", route: "North", count: 2 },
          { id: "b", route: "South", count: 1 }
        ]}
        filters={{ route: (row) => row.route === "North" }}
      />
    );

    expect(screen.queryByText("South")).not.toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: "Select North" }));
    expect(onSelectionChange).toHaveBeenCalledWith([expect.objectContaining({ id: "a" })], ["a"]);
    expect(tableRef.current?.getSelectionKeys()).toEqual(["a"]);
    act(() => tableRef.current?.toggleRowSelection({ id: "b", route: "South", count: 1 }, true));
    expect(tableRef.current?.getSelectionRows()).toHaveLength(2);
    act(() => tableRef.current?.clearSelection());
    expect(tableRef.current?.getSelectionRows()).toHaveLength(0);
    act(() => tableRef.current?.clearSort());
    expect(tableRef.current?.getSortState()).toBeUndefined();
  });

  it("manages Upload file lists and exposes submit, abort, and clear methods", async () => {
    const user = userEvent.setup();
    const uploadRef = React.createRef<UploadRef>();
    const onChange = vi.fn();
    const onExceed = vi.fn();
    const onSuccess = vi.fn();
    const customRequest = vi.fn(({ onSuccess: resolve }) => resolve?.({ ok: true }));

    render(
      <Upload
        ref={uploadRef}
        label="Upload manifest"
        limit={1}
        multiple
        onChange={onChange}
        onExceed={onExceed}
        onSuccess={onSuccess}
        customRequest={customRequest}
      />
    );

    const first = new File(["a"], "first.txt", { type: "text/plain" });
    const second = new File(["b"], "second.txt", { type: "text/plain" });
    await user.upload(screen.getByLabelText("Upload manifest"), [first, second]);
    expect(onExceed).toHaveBeenCalledWith([second], expect.any(Array));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: "first.txt" }), expect.any(Array));

    await act(async () => uploadRef.current?.submit());
    expect(customRequest).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith({ ok: true }, expect.objectContaining({ name: "first.txt" }), expect.any(Array));
    act(() => uploadRef.current?.abort());
    act(() => uploadRef.current?.clearFiles());
    expect(uploadRef.current?.getFiles()).toEqual([]);
  });

  it("supports grouped multiple Select and virtual select methods", async () => {
    const user = userEvent.setup();
    const virtualRef = React.createRef<VirtualizedSelectRef>();
    const onSelectChange = vi.fn();
    const onVirtualChange = vi.fn();

    render(
      <>
        <Select
          multiple
          filterable
          clearable
          defaultValue={["north"]}
          onValueChange={onSelectChange}
          options={routeOptions}
          placeholder="Pick routes"
          aria-label="Route select"
        />
        <VirtualizedSelect
          ref={virtualRef}
          multiple
          filterable
          defaultValue={["north"]}
          options={routeOptions}
          onValueChange={onVirtualChange}
        />
      </>
    );

    await user.click(screen.getByRole("combobox", { name: "Route select" }));
    await user.click(screen.getByRole("option", { name: /south route/i }));
    expect(onSelectChange).toHaveBeenCalledWith(["north", "south"]);
    await user.click(screen.getByRole("button", { name: /pick routes/i }));
    expect(onSelectChange).toHaveBeenCalledWith([]);

    await user.click(screen.getByRole("button", { name: /north route/i }));
    await user.click(screen.getByRole("button", { name: /south route/i }));
    expect(onVirtualChange).toHaveBeenCalledWith(["north", "south"]);
    act(() => virtualRef.current?.clear());
    expect(onVirtualChange).toHaveBeenCalledWith([]);
  });

  it("checks, expands, filters, and clears Tree components through methods", async () => {
    const user = userEvent.setup();
    const treeRef = React.createRef<TreeRef>();
    const virtualTreeRef = React.createRef<VirtualizedTreeRef>();
    const onCheck = vi.fn();

    render(
      <>
        <Tree ref={treeRef} items={treeItems} checkable defaultExpanded={["routes"]} onCheckChange={onCheck} />
        <VirtualizedTree
          ref={virtualTreeRef}
          items={treeItems}
          checkable
          defaultExpanded={["routes"]}
          selectedValue="north"
          onCheckChange={onCheck}
        />
      </>
    );

    await user.click(screen.getAllByRole("checkbox", { name: /north lane/i })[0]);
    expect(onCheck).toHaveBeenCalledWith(["north"]);
    act(() => treeRef.current?.setCheckedKeys(["south"]));
    expect(treeRef.current?.getCheckedKeys()).toEqual(["south"]);
    act(() => treeRef.current?.filter("North"));
    expect(screen.getAllByRole("button", { name: /south lane/i })).toHaveLength(1);
    act(() => treeRef.current?.setExpandedKeys([]));
    expect(treeRef.current?.getExpandedKeys()).toEqual([]);

    act(() => virtualTreeRef.current?.setCheckedKeys(["north"]));
    expect(virtualTreeRef.current?.getCheckedKeys()).toEqual(["north"]);
    act(() => virtualTreeRef.current?.clearChecked());
    expect(virtualTreeRef.current?.getCheckedKeys()).toEqual([]);
  });

  it("offers feedback services for method-style messages, notifications, and loading", async () => {
    const user = userEvent.setup();

    function FeedbackHarness() {
      const messages = useMessageService();
      const notifications = useNotificationService();
      const loading = useLoadingService();

      return (
        <>
          {messages.holder}
          {notifications.holder}
          {loading.holder}
          <button onClick={() => messages.success({ title: "Saved", description: "Draft ready" })} type="button">
            message
          </button>
          <button onClick={() => notifications.open({ title: "Desk notice", description: "Route changed" })} type="button">
            notify
          </button>
          <button onClick={() => loading.open("Sorting")} type="button">
            loading
          </button>
          <button onClick={() => messages.closeAll()} type="button">
            clear messages
          </button>
        </>
      );
    }

    render(<FeedbackHarness />);
    await user.click(screen.getByRole("button", { name: "message" }));
    await user.click(screen.getByRole("button", { name: "notify" }));
    await user.click(screen.getByRole("button", { name: "loading" }));
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Desk notice")).toBeInTheDocument();
    expect(screen.getByText("Sorting")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "clear messages" }));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });
});
