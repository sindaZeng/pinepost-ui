import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  PinepostProvider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  usePinepostLocale
} from "../index";

describe("Pinepost UI", () => {
  it("applies the selected theme and locale to the provider and document root", () => {
    function LocaleProbe() {
      return <span>{usePinepostLocale()}</span>;
    }

    const { container, unmount } = render(
      <PinepostProvider theme="play" locale="zh-CN">
        <Button>Send</Button>
        <LocaleProbe />
      </PinepostProvider>
    );

    expect(container.firstElementChild).toHaveAttribute("data-pinepost-theme", "play");
    expect(container.firstElementChild).toHaveAttribute("data-pinepost-locale", "zh-CN");
    expect(container.firstElementChild).toHaveAttribute("lang", "zh-CN");
    expect(document.documentElement).toHaveAttribute("data-pinepost-theme", "play");
    expect(document.documentElement).toHaveAttribute("data-pinepost-locale", "zh-CN");
    expect(document.documentElement).toHaveAttribute("lang", "zh-CN");
    expect(screen.getByText("zh-CN")).toBeInTheDocument();

    unmount();
    expect(document.documentElement).not.toHaveAttribute("data-pinepost-theme");
    expect(document.documentElement).not.toHaveAttribute("data-pinepost-locale");
    expect(document.documentElement).not.toHaveAttribute("lang");
  });

  it("renders button variants with stable classes and a safe default type", () => {
    render(<Button variant="stamp">Stamp approved</Button>);

    const button = screen.getByRole("button", { name: /stamp approved/i });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("pinepost-button--stamp");
    expect(button).toHaveClass("pinepost-button--md");
  });

  it("renders text fields with accessible names", () => {
    render(
      <label>
        Recipient
        <Input placeholder="Moss desk" />
      </label>
    );

    expect(screen.getByLabelText(/recipient/i)).toBeInTheDocument();
  });

  it("supports controlled checkbox and switch state", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [checked, setChecked] = React.useState(false);
      const [quiet, setQuiet] = React.useState(false);

      return (
        <>
          <Checkbox
            label="Attach route tag"
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Switch label="Quiet delivery" checked={quiet} onCheckedChange={setQuiet} />
        </>
      );
    }

    render(<Harness />);

    const checkbox = screen.getByRole("checkbox", { name: /attach route tag/i });
    const toggle = screen.getByRole("switch", { name: /quiet delivery/i });

    expect(checkbox).not.toBeChecked();
    expect(toggle).not.toBeChecked();

    await user.click(checkbox);
    await user.click(toggle);

    expect(checkbox).toBeChecked();
    expect(toggle).toBeChecked();
  });

  it("switches tab content through Radix tabs", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="inbox">
        <TabsList aria-label="Mail trays">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">Inbox notes</TabsContent>
        <TabsContent value="routes">Route notes</TabsContent>
      </Tabs>
    );

    expect(screen.getByText("Inbox notes")).toBeVisible();
    await user.click(screen.getByRole("tab", { name: /routes/i }));
    expect(screen.getByText("Route notes")).toBeVisible();
  });

  it("opens and closes the dialog", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open note</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispatch note</DialogTitle>
            <DialogDescription>Confirm the route.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="soft">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: /open note/i }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders toast content and viewport", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Route confirmed</ToastTitle>
          <ToastDescription>The note is packed.</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    expect(screen.getByText("Route confirmed")).toBeInTheDocument();
    expect(screen.getByText("The note is packed.")).toBeInTheDocument();
  });
});
