import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PageHeader, Select } from "../index";

const deskOptions = [
  { value: "cedar", label: "Cedar desk" },
  { value: "moss", label: "Moss desk" },
  { value: "parcel", label: "Parcel desk" }
];

describe("Pinepost UI QA hardening", () => {
  it("lets PageHeader use the correct heading level inside composed pages", () => {
    render(<PageHeader headingLevel={2} title="Route detail" description="Parcel notes" />);

    expect(screen.getByRole("heading", { level: 2, name: "Route detail" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1, name: "Route detail" })).not.toBeInTheDocument();
  });

  it("supports keyboard selection and outside-dismiss for Select", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <div>
        <Select
          aria-label="Desk select"
          options={deskOptions}
          placeholder="Choose desk"
          onValueChange={onValueChange}
        />
        <button type="button">Outside action</button>
      </div>
    );

    const trigger = screen.getByRole("combobox", { name: "Desk select" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("cedar");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Outside action" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
