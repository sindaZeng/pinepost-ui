import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Alert,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Collapse,
  CollapseContent,
  CollapseItem,
  CollapseTrigger,
  Descriptions,
  Divider,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Empty,
  Link,
  Menu,
  Pagination,
  Popconfirm,
  PopconfirmAction,
  PopconfirmCancel,
  PopconfirmContent,
  PopconfirmDescription,
  PopconfirmTitle,
  PopconfirmTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Result,
  Segmented,
  Skeleton,
  Space,
  Statistic,
  Steps,
  Tag,
  Text,
  Timeline,
  Watermark
} from "../index";

describe("Pinepost UI v0.2 pack", () => {
  it("renders basic typography and layout helpers", () => {
    render(
      <Space size="lg">
        <Text tone="muted">Sorted note</Text>
        <Link href="/routes">Routes</Link>
        <Divider orientation="vertical" />
        <Tag variant="stamp">Priority</Tag>
      </Space>
    );

    expect(screen.getByText("Sorted note")).toHaveClass("pinepost-text--muted");
    expect(screen.getByRole("link", { name: "Routes" })).toHaveAttribute("href", "/routes");
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
    expect(screen.getByText("Priority")).toHaveClass("pinepost-tag--stamp");
  });

  it("renders display components with accessible state", () => {
    render(
      <>
        <Alert title="Route delayed" description="Rain has slowed the north path." variant="warning" />
        <Avatar fallback="PP" />
        <Empty title="No letters" description="The outgoing tray is clear." />
        <Progress value={42} label="Route progress" />
        <Skeleton count={2} aria-label="Loading routes" />
        <Descriptions
          title="Parcel"
          items={[
            { label: "Desk", children: "Cedar" },
            { label: "Weight", children: "Light" }
          ]}
        />
        <Statistic label="Letters" value={18} suffix="/ day" />
        <Result title="All packed" description="Every parcel has a tag." status="success" />
        <Timeline
          items={[
            { title: "Sorted", description: "Desk A" },
            { title: "Stamped", description: "Desk B" }
          ]}
        />
        <Watermark content="Pinepost">
          <span>Preview card</span>
        </Watermark>
      </>
    );

    expect(screen.getByRole("status", { name: /route delayed/i })).toBeInTheDocument();
    expect(screen.getByText("PP")).toHaveClass("pinepost-avatar__fallback");
    expect(screen.getByText("No letters")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Route progress" })).toHaveAttribute("aria-valuenow", "42");
    expect(screen.getByLabelText("Loading routes")).toBeInTheDocument();
    expect(screen.getByText("Desk")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("All packed")).toBeInTheDocument();
    expect(screen.getByText("Stamped")).toBeInTheDocument();
    expect(screen.getByText("Preview card")).toBeInTheDocument();
  });

  it("renders navigation components and emits selection changes", async () => {
    const user = userEvent.setup();
    const onMenuChange = vi.fn();
    const onPageChange = vi.fn();
    const onSegmentChange = vi.fn();

    render(
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Desk</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Routes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Menu
          value="inbox"
          onValueChange={onMenuChange}
          items={[
            { value: "inbox", label: "Inbox" },
            { value: "routes", label: "Routes" }
          ]}
        />
        <Steps active={1} items={[{ title: "Draft" }, { title: "Stamp" }, { title: "Deliver" }]} />
        <Pagination page={2} pageCount={4} onPageChange={onPageChange} />
        <Segmented
          value="calm"
          onValueChange={onSegmentChange}
          options={[
            { value: "calm", label: "Calm" },
            { value: "shop", label: "Shop" }
          ]}
        />
      </>
    );

    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Routes" }));
    expect(onMenuChange).toHaveBeenCalledWith("routes");
    expect(screen.getByText("Stamp")).toHaveAttribute("data-state", "active");
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
    await user.click(screen.getByRole("button", { name: "Shop" }));
    expect(onSegmentChange).toHaveBeenCalledWith("shop");
  });

  it("opens Radix-backed overlay and disclosure components", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <>
        <Dropdown>
          <DropdownTrigger asChild>
            <button type="button">Open menu</button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Sort route</DropdownItem>
          </DropdownContent>
        </Dropdown>

        <Popover>
          <PopoverTrigger asChild>
            <button type="button">Open popover</button>
          </PopoverTrigger>
          <PopoverContent>Window desk details</PopoverContent>
        </Popover>

        <Collapse type="single" collapsible>
          <CollapseItem value="route">
            <CollapseTrigger>Route details</CollapseTrigger>
            <CollapseContent>Three stops before dusk.</CollapseContent>
          </CollapseItem>
        </Collapse>

        <Popconfirm onConfirm={onConfirm}>
          <PopconfirmTrigger asChild>
            <button type="button">Archive note</button>
          </PopconfirmTrigger>
          <PopconfirmContent>
            <PopconfirmTitle>Archive this note?</PopconfirmTitle>
            <PopconfirmDescription>This keeps the note in the cabinet.</PopconfirmDescription>
            <PopconfirmCancel>Cancel</PopconfirmCancel>
            <PopconfirmAction>Confirm</PopconfirmAction>
          </PopconfirmContent>
        </Popconfirm>

        <Drawer>
          <DrawerTrigger asChild>
            <button type="button">Open drawer</button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Route drawer</DrawerTitle>
              <DrawerDescription>Side panel for route details.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <button type="button">Close drawer</button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByText("Sort route")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open popover" }));
    expect(screen.getByText("Window desk details")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Route details" }));
    expect(screen.getByText("Three stops before dusk.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Archive note" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();

    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(screen.getByRole("dialog", { name: "Route drawer" })).toBeInTheDocument();
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Close drawer" }));
    expect(screen.queryByRole("dialog", { name: "Route drawer" })).not.toBeInTheDocument();
  });
});
