import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  Cascader,
  Form,
  FormField,
  Input,
  Table,
  type FormRef
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

const tableRows: RouteRow[] = [
  { route: "A7", count: 2, status: "Ready" },
  { route: "B2", count: 9, status: "Review" }
];

describe("Pinepost UI v0.11 pack", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders Table density, filter tags, and persisted view presets", async () => {
    const user = userEvent.setup();
    const onFilterClear = vi.fn();

    window.localStorage.setItem("pinepost-routes-view", "compact");

    const { container } = render(
      <Table
        density="compact"
        filterTags={[{ key: "status", label: "Status: Ready" }]}
        onFilterClear={onFilterClear}
        viewStorageKey="pinepost-routes-view"
        viewPresets={[
          { key: "full", label: "Full", hiddenColumns: [] },
          { key: "compact", label: "Compact", hiddenColumns: ["status"] }
        ]}
        columns={[
          { key: "route", title: "Route" },
          { key: "count", title: "Count" },
          { key: "status", title: "Status" }
        ]}
        data={tableRows}
      />
    );

    expect(container.querySelector(".pinepost-table-wrap")).toHaveAttribute("data-density", "compact");
    expect(screen.queryByRole("columnheader", { name: "Status" })).not.toBeInTheDocument();
    expect(screen.getByText("Status: Ready")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear Status: Ready" }));
    expect(onFilterClear).toHaveBeenCalledWith("status");

    await user.click(screen.getByRole("button", { name: "Full" }));
    expect(window.localStorage.getItem("pinepost-routes-view")).toBe("full");
    expect(screen.getByRole("columnheader", { name: "Status" })).toBeInTheDocument();
  });

  it("runs Form blur validation and exposes async submit state", async () => {
    const user = userEvent.setup();
    const ref = React.createRef<FormRef>();
    const submit = deferred<void>();
    const onFinish = vi.fn(() => submit.promise);

    const { rerender } = render(
      <Form
        ref={ref}
        model={{ desk: "" }}
        onFinish={onFinish}
        rules={{ desk: [{ required: true, message: "Desk required" }] }}
        submittingMessage="Sending route"
        validateTrigger="blur"
      >
        <FormField name="desk" label="Desk">
          <Input aria-label="Desk input" />
        </FormField>
        <button type="submit">Submit route</button>
      </Form>
    );

    fireEvent.blur(screen.getByLabelText("Desk input"));
    expect(await screen.findByRole("alert")).toHaveTextContent("Desk required");

    rerender(
      <Form
        ref={ref}
        model={{ desk: "cedar" }}
        onFinish={onFinish}
        rules={{ desk: [{ required: true, message: "Desk required" }] }}
        submittingMessage="Sending route"
        validateTrigger="blur"
      >
        <FormField name="desk" label="Desk">
          <Input aria-label="Desk input" value="cedar" readOnly />
        </FormField>
        <button type="submit">Submit route</button>
      </Form>
    );

    await user.click(screen.getByRole("button", { name: "Submit route" }));
    expect(onFinish).toHaveBeenCalledWith({ desk: "cedar" });
    expect(ref.current?.isSubmitting()).toBe(true);
    expect(screen.getByRole("status")).toHaveTextContent("Sending route");

    await act(async () => {
      submit.resolve();
      await submit.promise;
    });

    expect(ref.current?.isSubmitting()).toBe(false);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("supports Cascader keyboard navigation inside open menus", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Cascader
        onValueChange={onValueChange}
        options={[
          { value: "north", label: "North", children: [{ value: "cedar", label: "Cedar desk" }] },
          { value: "south", label: "South", children: [{ value: "river", label: "River desk" }] }
        ]}
      />
    );

    await user.click(screen.getByRole("button", { name: "Select" }));
    screen.getByRole("button", { name: "North" }).focus();

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveTextContent("South");

    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "River desk" })).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toHaveTextContent("River desk");

    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith(
      ["south", "river"],
      [expect.objectContaining({ value: "south" }), expect.objectContaining({ value: "river" })]
    );

    await user.click(screen.getByRole("button", { name: "South / River desk" }));
    screen.getByRole("button", { name: "South" }).focus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("button", { name: "River desk" })).not.toBeInTheDocument();
  });
});
