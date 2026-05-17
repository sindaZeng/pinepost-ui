import * as React from "react";
import { act } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Cascader,
  InputOTP,
  InputTag,
  Mention,
  TimeSelect,
  Tour,
  Transfer,
  TreeSelect,
  VirtualizedSelect,
  VirtualizedTable,
  VirtualizedTree,
  type CascaderRef
} from "../index";

const routeTree = [
  {
    value: "north",
    label: "North",
    children: [
      { value: "cedar", label: "Cedar desk" },
      { value: "moss", label: "Moss desk" }
    ]
  },
  {
    value: "south",
    label: "South",
    children: [{ value: "river", label: "River desk" }]
  }
];

describe("Pinepost UI v0.5 pack", () => {
  it("selects a cascader leaf and exposes clear method", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = React.createRef<CascaderRef>();

    render(<Cascader ref={ref} options={routeTree} onChange={onChange} clearable />);

    await user.click(screen.getByRole("button", { name: /select/i }));
    await user.click(screen.getByRole("button", { name: /north/i }));
    await user.click(screen.getByRole("button", { name: /cedar desk/i }));
    expect(onChange).toHaveBeenCalledWith(["north", "cedar"], expect.any(Array));
    expect(screen.getByRole("button", { name: /north \/ cedar desk/i })).toBeInTheDocument();

    act(() => {
      ref.current?.clear();
    });
    expect(await screen.findByRole("button", { name: /select/i })).toBeInTheDocument();
  });

  it("moves checked items in Transfer", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Transfer
        data={[
          { key: "a", label: "Route A" },
          { key: "b", label: "Route B" }
        ]}
        onChange={onChange}
        titles={["Inbox", "Packed"]}
      />
    );

    await user.click(screen.getByLabelText("Route A"));
    await user.click(screen.getByRole("button", { name: "›" }));
    expect(onChange).toHaveBeenCalledWith(["a"], "right", ["a"]);
    expect(within(screen.getByText("Packed").closest(".pinepost-transfer__list") as HTMLElement).getByText("Route A")).toBeInTheDocument();
  });

  it("selects TreeSelect values and VirtualizedSelect options", async () => {
    const user = userEvent.setup();
    const onTreeChange = vi.fn();
    const onVirtualChange = vi.fn();

    render(
      <>
        <TreeSelect data={routeTree} defaultExpanded={["north"]} onValueChange={onTreeChange} />
        <VirtualizedSelect
          options={Array.from({ length: 40 }, (_, index) => ({ value: `r${index}`, label: `Route ${index}` }))}
          onValueChange={onVirtualChange}
        />
      </>
    );

    await user.click(screen.getAllByRole("button", { name: /select/i })[0]);
    await user.click(screen.getByRole("button", { name: /cedar desk/i }));
    expect(onTreeChange).toHaveBeenCalledWith("cedar");

    await user.click(screen.getByRole("button", { name: "Select" }));
    await user.click(screen.getByRole("button", { name: "Route 0" }));
    expect(onVirtualChange).toHaveBeenCalledWith("r0");
  });

  it("handles InputTag, InputOTP, Mention, and TimeSelect", async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    const onOtpComplete = vi.fn();
    const onMentionSelect = vi.fn();
    const onTimeChange = vi.fn();

    render(
      <>
        <InputTag onValueChange={onTagsChange} />
        <InputOTP length={3} onComplete={onOtpComplete} />
        <Mention aria-label="Route mention" options={[{ value: "cedar", label: "Cedar desk" }]} onSelect={onMentionSelect} />
        <TimeSelect start="09:00" end="10:00" step="00:30" onValueChange={onTimeChange} aria-label="Dispatch time" />
      </>
    );

    await user.type(screen.getByPlaceholderText("Add tag"), "priority{Enter}");
    expect(onTagsChange).toHaveBeenCalledWith(["priority"]);

    await user.type(screen.getByLabelText("Code digit 1"), "123");
    expect(onOtpComplete).toHaveBeenCalledWith("123");

    await user.type(screen.getByLabelText("Route mention"), "@ce");
    await user.click(screen.getByRole("button", { name: /cedar desk/i }));
    expect(onMentionSelect).toHaveBeenCalledWith(expect.objectContaining({ value: "cedar" }), "@");

    await user.selectOptions(screen.getByLabelText("Dispatch time"), "09:30");
    expect(onTimeChange).toHaveBeenCalledWith("09:30");
  });

  it("renders virtualized data components and Tour flow", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    const onTreeSelect = vi.fn();
    const onFinish = vi.fn();

    render(
      <>
        <VirtualizedTable
          columns={[{ key: "route", title: "Route" }]}
          data={Array.from({ length: 80 }, (_, index) => ({ route: `Route ${index}` }))}
          onRowClick={onRowClick}
        />
        <VirtualizedTree
          defaultExpanded={["routes"]}
          items={[{ value: "routes", label: "Routes", children: [{ value: "north", label: "North lane" }] }]}
          onSelect={onTreeSelect}
        />
        <Tour defaultOpen onFinish={onFinish} steps={[{ title: "First step" }, { title: "Final step" }]} />
      </>
    );

    await user.click(screen.getByText("Route 0"));
    expect(onRowClick).toHaveBeenCalledWith({ route: "Route 0" }, 0);

    await user.click(screen.getByRole("button", { name: /north lane/i }));
    expect(onTreeSelect).toHaveBeenCalledWith("north", expect.objectContaining({ value: "north" }));

    expect(screen.getByText("First step")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Final step")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Finish" }));
    expect(onFinish).toHaveBeenCalledOnce();
  });
});
