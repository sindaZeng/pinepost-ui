import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Cascader, Select, VirtualizedSelect } from "../index";

const routeOptions = [
  { value: "north", label: "North route" },
  { value: "held", label: "Held route", disabled: true },
  { value: "south", label: "South route" },
  { value: "market", label: "Market route" }
];

const virtualOptions = Array.from({ length: 60 }, (_, index) => ({
  value: `route-${index}`,
  label: `Route ${index}`,
  disabled: index === 1
}));

const cascaderOptions = [
  {
    value: "north",
    label: "North line",
    children: [
      { value: "cedar", label: "Cedar desk" },
      { value: "moss", label: "Moss desk" }
    ]
  },
  {
    value: "south",
    label: "South line",
    children: [
      { value: "river", label: "River desk" },
      { value: "window", label: "Window desk" }
    ]
  }
];

describe("Pinepost UI v0.29 selection scale contract", () => {
  it("opens VirtualizedSelect from the keyboard, skips disabled options, jumps to the end, and selects", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <VirtualizedSelect
        options={virtualOptions}
        onValueChange={onValueChange}
        placeholder="Choose route"
      />
    );

    const trigger = screen.getByRole("button", { name: "Choose route" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Route 0" })).toHaveAttribute("data-active", "true");

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: "Route 2" })).toHaveAttribute("data-active", "true");

    await user.keyboard("{End}");
    expect(await screen.findByRole("option", { name: "Route 59" })).toHaveAttribute("data-active", "true");

    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("route-59");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("toggles multiple VirtualizedSelect options with Space and Enter while staying open", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <VirtualizedSelect
        multiple
        options={virtualOptions.slice(0, 5)}
        onValueChange={onValueChange}
        placeholder="Choose routes"
      />
    );

    const trigger = screen.getByRole("button", { name: "Choose routes" });
    trigger.focus();
    await user.keyboard("{ArrowDown} ");
    expect(onValueChange).toHaveBeenLastCalledWith(["route-0"]);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(["route-0", "route-2"]);

    await user.keyboard("{Home} ");
    expect(onValueChange).toHaveBeenLastCalledWith(["route-2"]);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("closes filterable VirtualizedSelect from the filter input and clears stale queries", async () => {
    const user = userEvent.setup();

    render(<VirtualizedSelect filterable options={virtualOptions} placeholder="Choose route" />);

    const trigger = screen.getByRole("button", { name: "Choose route" });
    await user.click(trigger);
    const filter = screen.getByRole("textbox", { name: "Filter virtual select" });
    await user.type(filter, "Route 5");
    expect(screen.queryByRole("option", { name: "Route 0" })).not.toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    expect(screen.getByRole("option", { name: "Route 0" })).toBeInTheDocument();
  });

  it("selects from a filterable Select with keyboard input and restores focus with Escape", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        filterable
        options={routeOptions}
        onValueChange={onValueChange}
        placeholder="Choose owner"
      />
    );

    const trigger = screen.getByRole("combobox", { name: "Choose owner" });
    await user.click(trigger);
    const filter = screen.getByRole("textbox", { name: "Filter select" });
    await user.type(filter, "south");
    await user.keyboard("{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("south");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("selects and toggles Cascader filter matches from the keyboard and restores focus with Escape", async () => {
    const user = userEvent.setup();
    const onSingleChange = vi.fn();
    const onMultipleChange = vi.fn();

    render(
      <>
        <Cascader filterable options={cascaderOptions} onValueChange={onSingleChange} placeholder="Choose route" />
        <Cascader multiple filterable options={cascaderOptions} onValueChange={onMultipleChange} placeholder="Choose routes" />
      </>
    );

    const singleTrigger = screen.getByRole("button", { name: "Choose route" });
    await user.click(singleTrigger);
    await user.type(screen.getByRole("textbox", { name: "Filter options" }), "river");
    await user.keyboard("{Enter}");
    expect(onSingleChange).toHaveBeenCalledWith(
      ["south", "river"],
      [expect.objectContaining({ value: "south" }), expect.objectContaining({ value: "river" })]
    );
    expect(document.querySelector(".pinepost-cascader__matches")).not.toBeInTheDocument();

    const multipleTrigger = screen.getByRole("button", { name: "Choose routes" });
    await user.click(multipleTrigger);
    await user.type(screen.getByRole("textbox", { name: "Filter options" }), "desk");
    await user.keyboard("{ArrowDown} ");
    expect(onMultipleChange).toHaveBeenLastCalledWith([["north", "moss"]], [[expect.objectContaining({ value: "north" }), expect.objectContaining({ value: "moss" })]]);

    await user.keyboard("{Escape}");
    expect(document.querySelector(".pinepost-cascader__matches")).not.toBeInTheDocument();
    expect(multipleTrigger).toHaveFocus();
  });
});
