import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Affix,
  Anchor,
  Autocomplete,
  Backtop,
  Calendar,
  Carousel,
  Col,
  ColorPicker,
  Container,
  DatePicker,
  Form,
  FormField,
  Header,
  Image,
  InputNumber,
  Loading,
  Main,
  Message,
  MessageBox,
  Notification,
  PageHeader,
  Rate,
  Row,
  Scrollbar,
  Splitter,
  Table,
  TimePicker,
  Tree,
  Upload
} from "../index";

describe("Pinepost UI v0.4 pack", () => {
  it("renders extended layout helpers", () => {
    render(
      <Container>
        <Header>Header</Header>
        <Main>
          <Row>
            <Col span={6}>Left</Col>
            <Col span={6}>Right</Col>
          </Row>
          <Scrollbar maxHeight={90}>Scrollable parcel log</Scrollbar>
          <Splitter>
            <div>Inbox</div>
            <div>Preview</div>
          </Splitter>
        </Main>
      </Container>
    );

    expect(screen.getByText("Header")).toHaveClass("pinepost-layout-header");
    expect(screen.getByText("Left")).toHaveStyle({ "--pinepost-col-span": "6" });
    expect(screen.getByText("Scrollable parcel log")).toHaveClass("pinepost-scrollbar");
    expect(screen.getByText("Preview").parentElement).toHaveClass("pinepost-splitter");
  });

  it("renders form extras and emits value changes", async () => {
    const user = userEvent.setup();
    const onNumberChange = vi.fn();
    const onRateChange = vi.fn();
    const onFilesChange = vi.fn();

    render(
      <Form>
        <FormField label="Desk count" htmlFor="desk-count" required>
          <InputNumber id="desk-count" defaultValue={2} onValueChange={onNumberChange} />
        </FormField>
        <Rate label="Route rating" value={2} onValueChange={onRateChange} />
        <Upload label="Upload manifest" onFilesChange={onFilesChange} />
        <Autocomplete aria-label="Route desk" options={["Cedar", "Moss"]} />
        <ColorPicker label="Stamp color" defaultValue="#4f8f5f" />
        <DatePicker aria-label="Dispatch date" />
        <TimePicker aria-label="Dispatch time" />
      </Form>
    );

    await user.click(screen.getByRole("button", { name: "Increase value" }));
    expect(onNumberChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("radio", { name: "Route rating 4" }));
    expect(onRateChange).toHaveBeenCalledWith(4);

    const file = new File(["route"], "route.txt", { type: "text/plain" });
    await user.upload(screen.getByLabelText("Upload manifest"), file);
    expect(onFilesChange).toHaveBeenCalledWith([file]);
    expect(screen.getByLabelText("Route desk")).toHaveAttribute("list");
    expect(screen.getByLabelText("Dispatch date")).toHaveAttribute("type", "date");
  });

  it("renders data display extras and handles simple interactions", async () => {
    const user = userEvent.setup();
    const onCarouselChange = vi.fn();
    const onTreeSelect = vi.fn();

    render(
      <>
        <Table
          columns={[
            { key: "route", title: "Route" },
            { key: "status", title: "Status" }
          ]}
          data={[{ route: "Cedar", status: "Ready" }]}
        />
        <Calendar month={new Date(2026, 4, 1)} selectedDate={new Date(2026, 4, 17)} />
        <Image alt="Parcel shelf" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" caption="Parcel shelf" />
        <Carousel
          items={[
            { id: "a", content: <span>Morning route</span> },
            { id: "b", content: <span>Evening route</span> }
          ]}
          onIndexChange={onCarouselChange}
        />
        <Tree
          defaultExpanded={["routes"]}
          items={[
            {
              value: "routes",
              label: "Routes",
              children: [{ value: "north", label: "North lane" }]
            }
          ]}
          onSelect={onTreeSelect}
        />
      </>
    );

    expect(screen.getByText("Cedar")).toBeInTheDocument();
    expect(screen.getByRole("gridcell", { selected: true })).toHaveTextContent("17");
    expect(screen.getByRole("img", { name: "Parcel shelf" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByText("Evening route")).toBeInTheDocument();
    expect(onCarouselChange).toHaveBeenCalledWith(1);
    await user.click(screen.getByRole("button", { name: "North lane" }));
    expect(onTreeSelect).toHaveBeenCalledWith("north");
  });

  it("renders navigation extras", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", { configurable: true, value: scrollTo });

    render(
      <>
        <PageHeader title="Routes" description="Desk dispatch" onBack={onBack} />
        <Affix offsetTop={12}>
          <Anchor items={[{ href: "#routes", label: "Routes" }]} />
        </Affix>
        <Backtop>Top</Backtop>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).toHaveBeenCalledOnce();
    const anchorNav = screen.getByRole("navigation", { name: "Anchor" });
    expect(anchorNav).toBeInTheDocument();
    expect(within(anchorNav).getByText("Routes").closest(".pinepost-affix")).toHaveStyle({ "--pinepost-affix-top": "12px" });
    await user.click(screen.getByRole("button", { name: "Top" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("renders feedback extras and confirms message boxes", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <>
        <Loading label="Sorting" />
        <Message title="Route saved" description="The draft is ready." variant="success" />
        <Notification title="Desk notice" description="One route needs attention." />
        <MessageBox open title="Archive route?" description="This keeps the note in storage." onConfirm={onConfirm} />
      </>
    );

    expect(screen.getByText("Sorting")).toBeInTheDocument();
    expect(screen.getByText("Route saved").closest(".pinepost-message")).toHaveClass("pinepost-message--success");
    expect(screen.getByText("Desk notice").closest(".pinepost-notification")).toHaveClass("pinepost-notification--info");
    expect(screen.getByRole("alertdialog", { name: "Archive route?" })).toBeInTheDocument();
    await user.click(within(screen.getByRole("alertdialog")).getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
