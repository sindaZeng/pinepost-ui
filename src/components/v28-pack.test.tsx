import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TreeSelect } from "../index";

const routeTree = [
  {
    value: "routes",
    label: "Routes",
    children: [
      { value: "north", label: "North desk" },
      { value: "held", label: "Held desk", disabled: true },
      {
        value: "south",
        label: "South branch",
        children: [{ value: "river", label: "River desk" }]
      }
    ]
  },
  { value: "backup", label: "Backup desk", disabled: true },
  { value: "loose", label: "Loose desk" }
];

const multipleRouteTree = [
  {
    value: "routes",
    label: "Routes",
    children: [
      { value: "north", label: "North desk" },
      { value: "held", label: "Held desk", disabled: true },
      { value: "south", label: "South desk" }
    ]
  }
];

describe("Pinepost UI v0.28 selection hardening", () => {
  it("navigates TreeSelect nodes with keyboard and skips disabled nodes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<TreeSelect data={routeTree} onValueChange={onValueChange} placeholder="Choose scope" />);

    await user.click(screen.getByRole("button", { name: "Choose scope" }));
    screen.getByRole("button", { name: "Routes" }).focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "North desk" })).toBeInTheDocument();

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveTextContent("North desk");

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveTextContent("South branch");

    await user.keyboard("{End}");
    expect(document.activeElement).toHaveTextContent("Loose desk");

    await user.keyboard("{Home}");
    expect(document.activeElement).toHaveTextContent("Routes");

    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowRight}{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("river");
    expect(document.querySelector(".pinepost-tree-select__panel")).not.toBeInTheDocument();
  });

  it("toggles multiple TreeSelect leaves with Space and Enter while staying open", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <TreeSelect
        multiple
        data={multipleRouteTree}
        defaultExpanded={["routes"]}
        onValueChange={onValueChange}
        placeholder="Choose scopes"
      />
    );

    await user.click(screen.getByRole("button", { name: "Choose scopes" }));
    screen.getByRole("button", { name: "North desk" }).focus();

    await user.keyboard(" ");
    expect(onValueChange).toHaveBeenLastCalledWith(["north"]);
    expect(screen.getByRole("button", { name: "South desk" })).toBeInTheDocument();

    await user.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(["north", "south"]);

    await user.keyboard("{Home}{ArrowDown} ");
    expect(onValueChange).toHaveBeenLastCalledWith(["south"]);
    expect(document.querySelector(".pinepost-tree-select__panel")).toBeInTheDocument();
  });

  it("loads lazy TreeSelect children from the keyboard", async () => {
    const user = userEvent.setup();
    const loadData = vi.fn(async () => [{ value: "north", label: "North desk", isLeaf: true }]);

    render(
      <TreeSelect
        lazy
        data={[{ value: "routes", label: "Routes" }]}
        loadData={loadData}
        placeholder="Choose route"
      />
    );

    await user.click(screen.getByRole("button", { name: "Choose route" }));
    screen.getByRole("button", { name: "Routes" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(loadData).toHaveBeenCalledWith(expect.objectContaining({ value: "routes" }));
    expect(await screen.findByRole("button", { name: "North desk" })).toBeInTheDocument();
  });

  it("collapses branches and returns to parent nodes with ArrowLeft", async () => {
    const user = userEvent.setup();

    render(<TreeSelect data={routeTree} defaultExpanded={["routes", "south"]} placeholder="Choose scope" />);

    await user.click(screen.getByRole("button", { name: "Choose scope" }));
    screen.getByRole("button", { name: "River desk" }).focus();

    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toHaveTextContent("South branch");

    await user.keyboard("{ArrowLeft}");
    expect(screen.queryByRole("button", { name: "River desk" })).not.toBeInTheDocument();
    expect(document.activeElement).toHaveTextContent("South branch");
  });

  it("closes filterable TreeSelect from the filter input with Escape", async () => {
    const user = userEvent.setup();

    render(<TreeSelect filterable data={routeTree} placeholder="Choose scope" />);

    const trigger = screen.getByRole("button", { name: "Choose scope" });
    await user.click(trigger);
    const filterInput = screen.getByRole("textbox", { name: "Filter tree" });
    await user.type(filterInput, "North");
    expect(screen.queryByRole("button", { name: "Loose desk" })).not.toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(document.querySelector(".pinepost-tree-select__panel")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    expect(screen.getByRole("button", { name: "Loose desk" })).toBeInTheDocument();
  });
});
