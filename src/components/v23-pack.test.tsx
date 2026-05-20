import * as React from "react";
import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Form, FormField, Input, Table, Upload, type FormRef, type TableColumn, type TableRef, type UploadFile, type UploadRef } from "../index";

type ServerRow = {
  id: string;
  route: string;
};

const columns: Array<TableColumn<ServerRow>> = [
  { key: "route", title: "Route" }
];

const pageOneRows: ServerRow[] = [
  { id: "north", route: "North" },
  { id: "south", route: "South" }
];

const pageTwoRows: ServerRow[] = [
  { id: "west", route: "West" },
  { id: "east", route: "East" }
];

describe("Pinepost UI v0.23 commercial pressure", () => {
  it("keeps controlled Table selection keys across server page changes", async () => {
    const user = userEvent.setup();
    const tableRef = React.createRef<TableRef<ServerRow>>();
    const onSelectionChange = vi.fn();

    function ServerTable() {
      const [page, setPage] = React.useState(1);
      const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(["north", "archived"]);
      const rows = page === 1 ? pageOneRows : pageTwoRows;

      return (
        <>
          <button type="button" onClick={() => setPage(2)}>Page 2</button>
          <Table
            ref={tableRef}
            rowKey="id"
            selectable
            selectedRowKeys={selectedRowKeys}
            onSelectionChange={(visibleRows, keys) => {
              setSelectedRowKeys(keys);
              onSelectionChange(visibleRows, keys);
            }}
            columns={columns}
            data={rows}
          />
        </>
      );
    }

    render(<ServerTable />);

    expect(tableRef.current?.getSelectionKeys()).toEqual(["north", "archived"]);
    await user.click(screen.getByRole("button", { name: "Page 2" }));

    expect(tableRef.current?.getSelectionKeys()).toEqual(["north", "archived"]);
    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));

    expect(onSelectionChange).toHaveBeenLastCalledWith(pageTwoRows, ["north", "archived", "west", "east"]);
    expect(tableRef.current?.getSelectionKeys()).toEqual(["north", "archived", "west", "east"]);
  });

  it("lets FormRef set and clear server field errors accessibly", () => {
    const formRef = React.createRef<FormRef>();

    render(
      <Form ref={formRef} model={{ "stops.0.desk": "Moss desk" }}>
        <FormField name="stops.0.desk" label="Stop desk" htmlFor="stop-desk">
          <Input id="stop-desk" value="Moss desk" onChange={() => undefined} />
        </FormField>
      </Form>
    );

    act(() => {
      formRef.current?.setFieldsError({ "stops.0.desk": "Desk is already assigned." });
    });

    expect(formRef.current?.getFieldsError()).toEqual({ "stops.0.desk": "Desk is already assigned." });
    expect(screen.getByLabelText("Stop desk")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Desk is already assigned.");

    act(() => {
      formRef.current?.setFieldsError({ "stops.0.desk": undefined });
    });

    expect(formRef.current?.getFieldsError()).toEqual({});
    expect(screen.getByLabelText("Stop desk")).not.toHaveAttribute("aria-invalid");
  });

  it("emits complete Upload queues for controlled fileList changes", async () => {
    const user = userEvent.setup();
    const uploadRef = React.createRef<UploadRef>();
    const queueSnapshots: UploadFile[][] = [];
    const attempts = new Map<string, number>();
    const lastQueue = () => queueSnapshots[queueSnapshots.length - 1] ?? [];

    function ControlledUpload() {
      const [fileList, setFileList] = React.useState<UploadFile[]>([]);

      return (
        <Upload
          ref={uploadRef}
          multiple
          label="Upload pressure files"
          fileList={fileList}
          onFileListChange={(nextList) => {
            queueSnapshots.push(nextList);
            setFileList(nextList);
          }}
          customRequest={({ file, onError, onProgress, onSuccess }) => {
            const count = attempts.get(file.name) ?? 0;
            attempts.set(file.name, count + 1);
            onProgress?.(60);
            if (file.name === "retry.csv" && count === 0) {
              onError?.(new Error("Retry once"));
              return;
            }
            onSuccess?.({ ok: true });
          }}
        />
      );
    }

    render(<ControlledUpload />);

    await user.upload(screen.getByLabelText("Upload pressure files"), [
      new File(["a"], "ready.csv", { type: "text/csv" }),
      new File(["b"], "retry.csv", { type: "text/csv" })
    ]);

    expect(lastQueue().map((file) => file.status)).toEqual(["ready", "ready"]);

    await act(async () => uploadRef.current?.submit());
    expect(lastQueue().map((file) => [file.name, file.status, file.percent])).toEqual([
      ["ready.csv", "success", 100],
      ["retry.csv", "error", 60]
    ]);

    await user.click(screen.getByRole("button", { name: "Retry retry.csv" }));
    expect(lastQueue().map((file) => [file.name, file.status])).toEqual([
      ["ready.csv", "success"],
      ["retry.csv", "ready"]
    ]);

    await act(async () => uploadRef.current?.submit());
    expect(lastQueue().map((file) => [file.name, file.status])).toEqual([
      ["ready.csv", "success"],
      ["retry.csv", "success"]
    ]);

    await user.click(screen.getByRole("button", { name: "Remove ready.csv" }));
    expect(lastQueue().map((file) => file.name)).toEqual(["retry.csv"]);
  });
});
