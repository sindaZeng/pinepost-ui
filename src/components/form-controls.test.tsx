import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, Select, Slider, Spinner } from "../index";

describe("Pinepost UI form controls", () => {
  it("opens select options and emits value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        aria-label="Route desk"
        placeholder="Choose desk"
        onValueChange={onValueChange}
        options={[
          { value: "cedar", label: "Cedar desk" },
          { value: "moss", label: "Moss desk" }
        ]}
      />
    );

    await user.click(screen.getByRole("combobox", { name: "Route desk" }));
    await user.click(screen.getByRole("option", { name: "Moss desk" }));

    expect(onValueChange).toHaveBeenCalledWith("moss");
  });

  it("supports controlled radio group state", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = React.useState("standard");

      return (
        <RadioGroup
          aria-label="Delivery speed"
          value={value}
          onValueChange={setValue}
          options={[
            { value: "standard", label: "Standard" },
            { value: "priority", label: "Priority" }
          ]}
        />
      );
    }

    render(<Harness />);

    const priority = screen.getByRole("radio", { name: "Priority" });
    expect(priority).not.toBeChecked();

    await user.click(priority);

    expect(priority).toBeChecked();
  });

  it("renders slider value and spinner status accessibly", () => {
    render(
      <>
        <Slider aria-label="Route progress" value={[60]} max={100} />
        <Spinner label="Sorting letters" />
      </>
    );

    expect(screen.getByRole("slider", { name: "Route progress" })).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByRole("status", { name: "Sorting letters" })).toBeInTheDocument();
  });
});
