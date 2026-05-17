import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Input,
  Link,
  Menu,
  Pagination,
  PinepostProvider,
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
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  Textarea,
  Timeline,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Watermark,
  type PinepostLocale,
  type PinepostTheme
} from "../index";
import "../styles.css";
import "./demo.css";

const themeOrder: PinepostTheme[] = ["calm", "play", "shop"];
const localeOrder: PinepostLocale[] = ["en", "zh-CN"];

const demoCopy = {
  en: {
    markLabel: "Pinepost mark",
    license: "Apache-2.0",
    title: "Pinepost UI",
    hero:
      "Forest-post components for warm React products, with a token-driven theme layer and accessible interaction primitives.",
    themeSwitcher: "Theme switcher",
    languageSwitcher: "Language switcher",
    themes: {
      calm: { label: "Calm", note: "Focused tools" },
      play: { label: "Play", note: "Learning apps" },
      shop: { label: "Shop", note: "Storefronts" }
    },
    locales: {
      en: { label: "English", note: "EN copy" },
      "zh-CN": { label: "中文", note: "中文文案" }
    },
    coreTitle: "Core pieces",
    coreDescription: "Buttons, cards, labels, and form controls share the same postal token system.",
    parcelTitle: "Parcel actions",
    parcelDescription: "Variants stay compact, readable, and touch friendly.",
    actions: {
      deliver: "Deliver update",
      save: "Save draft",
      stamp: "Stamp approved",
      pack: "Pack order"
    },
    badges: {
      ready: "Ready",
      priority: "Priority",
      route: "Route A7"
    },
    formTitle: "Letter form",
    formDescription: "Inputs keep the paper surface without becoming novelty controls.",
    form: {
      recipient: "Recipient",
      recipientPlaceholder: "Moss desk",
      note: "Note",
      notePlaceholder: "Write a short delivery note",
      checkbox: "Attach route tag",
      checkboxDescription: "Show the tag in the outgoing tray.",
      switch: "Quiet delivery",
      switchDescription: "Send without a desk alert."
    },
    interactionsTitle: "Radix-backed interactions",
    interactionsDescription: "Focus, keyboard behavior, and portals come from proven headless primitives.",
    tabsTitle: "Tabs",
    tabsDescription: "Use segmented postal routes for compact navigation.",
    tabsLabel: "Mail trays",
    tabs: {
      inbox: "Inbox",
      routes: "Routes",
      archive: "Archive",
      inboxCopy: "Three letters are waiting for sorting.",
      routesCopy: "Two woodland routes are open before dusk.",
      archiveCopy: "Older notes stay tucked in the cedar cabinet."
    },
    modalTitle: "Dialog and toast",
    modalDescription: "Modal and notification pieces carry the same surface rules.",
    dialog: {
      open: "Open dispatch note",
      title: "Dispatch note",
      description: "Confirm the parcel route and keep the note concise for the next desk.",
      routeLabel: "Route name",
      routeValue: "Cedar lane, window desk",
      cancel: "Cancel",
      confirm: "Confirm route"
    },
    tooltip: {
      button: "Send sample toast",
      content: "Shows the Pinepost toast surface."
    },
    toast: {
      title: "Route confirmed",
      description: "The note is packed and ready for the next desk.",
      close: "Close toast"
    }
  },
  "zh-CN": {
    markLabel: "Pinepost 标识",
    license: "Apache-2.0",
    title: "Pinepost UI",
    hero: "森林邮局风格的 React 组件库，提供 token 主题层和可访问的交互基础。",
    themeSwitcher: "主题切换",
    languageSwitcher: "语言切换",
    themes: {
      calm: { label: "安静", note: "专注工具" },
      play: { label: "活泼", note: "学习应用" },
      shop: { label: "集市", note: "店铺场景" }
    },
    locales: {
      en: { label: "English", note: "EN copy" },
      "zh-CN": { label: "中文", note: "中文文案" }
    },
    coreTitle: "基础组件",
    coreDescription: "按钮、卡片、标签和表单控件共享同一套森林邮局 token。",
    parcelTitle: "包裹操作",
    parcelDescription: "不同按钮样式保持紧凑、清晰，也适合触屏操作。",
    actions: {
      deliver: "发送更新",
      save: "保存草稿",
      stamp: "盖章通过",
      pack: "打包订单"
    },
    badges: {
      ready: "就绪",
      priority: "优先",
      route: "路线 A7"
    },
    formTitle: "信件表单",
    formDescription: "输入控件保留纸张质感，但不会变成难用的装饰控件。",
    form: {
      recipient: "收件处",
      recipientPlaceholder: "苔藓桌",
      note: "备注",
      notePlaceholder: "写一条简短的配送备注",
      checkbox: "附加路线标签",
      checkboxDescription: "在待发托盘里显示这个标签。",
      switch: "静默配送",
      switchDescription: "发送时不弹出桌面提醒。"
    },
    interactionsTitle: "Radix 驱动的交互",
    interactionsDescription: "焦点、键盘操作和 Portal 行为都来自成熟的无样式基础组件。",
    tabsTitle: "标签页",
    tabsDescription: "用分段邮路来承载紧凑导航。",
    tabsLabel: "邮件托盘",
    tabs: {
      inbox: "收件箱",
      routes: "路线",
      archive: "归档",
      inboxCopy: "有三封信正在等待分拣。",
      routesCopy: "黄昏前还有两条林间路线开放。",
      archiveCopy: "旧便签被收在雪松柜里。"
    },
    modalTitle: "弹窗与通知",
    modalDescription: "弹窗和通知组件沿用同一套纸面与边框规则。",
    dialog: {
      open: "打开调度便签",
      title: "调度便签",
      description: "确认包裹路线，并为下一张桌子留下简洁备注。",
      routeLabel: "路线名称",
      routeValue: "雪松小路，窗口桌",
      cancel: "取消",
      confirm: "确认路线"
    },
    tooltip: {
      button: "发送通知示例",
      content: "展示 Pinepost 的通知样式。"
    },
    toast: {
      title: "路线已确认",
      description: "便签已经打包，准备送到下一张桌子。",
      close: "关闭通知"
    }
  }
} satisfies Record<PinepostLocale, DemoCopy>;

type DemoCopy = {
  markLabel: string;
  license: string;
  title: string;
  hero: string;
  themeSwitcher: string;
  languageSwitcher: string;
  themes: Record<PinepostTheme, { label: string; note: string }>;
  locales: Record<PinepostLocale, { label: string; note: string }>;
  coreTitle: string;
  coreDescription: string;
  parcelTitle: string;
  parcelDescription: string;
  actions: Record<"deliver" | "save" | "stamp" | "pack", string>;
  badges: Record<"ready" | "priority" | "route", string>;
  formTitle: string;
  formDescription: string;
  form: {
    recipient: string;
    recipientPlaceholder: string;
    note: string;
    notePlaceholder: string;
    checkbox: string;
    checkboxDescription: string;
    switch: string;
    switchDescription: string;
  };
  interactionsTitle: string;
  interactionsDescription: string;
  tabsTitle: string;
  tabsDescription: string;
  tabsLabel: string;
  tabs: {
    inbox: string;
    routes: string;
    archive: string;
    inboxCopy: string;
    routesCopy: string;
    archiveCopy: string;
  };
  modalTitle: string;
  modalDescription: string;
  dialog: {
    open: string;
    title: string;
    description: string;
    routeLabel: string;
    routeValue: string;
    cancel: string;
    confirm: string;
  };
  tooltip: {
    button: string;
    content: string;
  };
  toast: {
    title: string;
    description: string;
    close: string;
  };
};

function PinepostMark({ label }: { label: string }) {
  return (
    <svg className="demo-mark" viewBox="0 0 92 92" role="img" aria-label={label}>
      <rect x="11" y="25" width="70" height="49" rx="8" />
      <path d="M15 31 46 53 77 31" />
      <path d="M26 22h40l-8 17H34z" />
      <path d="M46 14v18" />
      <path d="M36 22 46 11 56 22" />
      <circle cx="65" cy="56" r="8" />
      <path d="M61 56h8M65 52v8" />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = React.useState<PinepostTheme>("calm");
  const [locale, setLocale] = React.useState<PinepostLocale>("zh-CN");
  const [menuValue, setMenuValue] = React.useState("inbox");
  const [page, setPage] = React.useState(2);
  const [segment, setSegment] = React.useState("calm");
  const [toastOpen, setToastOpen] = React.useState(false);
  const copy = demoCopy[locale];
  const zh = locale === "zh-CN";

  function showToast() {
    setToastOpen(false);
    window.setTimeout(() => setToastOpen(true), 80);
  }

  return (
    <PinepostProvider theme={theme} locale={locale} className="demo-app">
      <ToastProvider swipeDirection="right">
        <header className="demo-hero">
          <div className="demo-hero__copy">
            <PinepostMark label={copy.markLabel} />
            <Badge variant="parcel">{copy.license}</Badge>
            <h1>{copy.title}</h1>
            <p>{copy.hero}</p>
          </div>
          <div className="demo-controls">
            <div className="demo-control-panel" aria-label={copy.languageSwitcher}>
              {localeOrder.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="demo-choice-card"
                  data-active={locale === item}
                  onClick={() => setLocale(item)}
                >
                  <span>{copy.locales[item].label}</span>
                  <small>{copy.locales[item].note}</small>
                </button>
              ))}
            </div>
            <div className="demo-control-panel" aria-label={copy.themeSwitcher}>
              {themeOrder.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="demo-choice-card"
                  data-active={theme === item}
                  onClick={() => setTheme(item)}
                >
                  <span>{copy.themes[item].label}</span>
                  <small>{copy.themes[item].note}</small>
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="demo-main">
          <section className="demo-section">
            <div className="demo-section__heading">
              <h2>{copy.coreTitle}</h2>
              <p>{copy.coreDescription}</p>
            </div>
            <div className="demo-grid demo-grid--core">
              <Card>
                <CardHeader>
                  <CardTitle>{copy.parcelTitle}</CardTitle>
                  <CardDescription>{copy.parcelDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="demo-stack">
                    <Button>{copy.actions.deliver}</Button>
                    <Button variant="soft">{copy.actions.save}</Button>
                    <Button variant="stamp">{copy.actions.stamp}</Button>
                    <Button variant="parcel">{copy.actions.pack}</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Badge>{copy.badges.ready}</Badge>
                  <Badge variant="stamp">{copy.badges.priority}</Badge>
                  <Badge variant="sky">{copy.badges.route}</Badge>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{copy.formTitle}</CardTitle>
                  <CardDescription>{copy.formDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="demo-form">
                    <label>
                      {copy.form.recipient}
                      <Input placeholder={copy.form.recipientPlaceholder} />
                    </label>
                    <label>
                      {copy.form.note}
                      <Textarea placeholder={copy.form.notePlaceholder} />
                    </label>
                    <Checkbox label={copy.form.checkbox} description={copy.form.checkboxDescription} />
                    <Switch label={copy.form.switch} description={copy.form.switchDescription} />
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="demo-section">
            <div className="demo-section__heading">
              <h2>{copy.interactionsTitle}</h2>
              <p>{copy.interactionsDescription}</p>
            </div>
            <div className="demo-grid demo-grid--interactions">
              <Card>
                <CardHeader>
                  <CardTitle>{copy.tabsTitle}</CardTitle>
                  <CardDescription>{copy.tabsDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="inbox">
                    <TabsList aria-label={copy.tabsLabel}>
                      <TabsTrigger value="inbox">{copy.tabs.inbox}</TabsTrigger>
                      <TabsTrigger value="routes">{copy.tabs.routes}</TabsTrigger>
                      <TabsTrigger value="archive">{copy.tabs.archive}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="inbox">
                      <p className="demo-copy">{copy.tabs.inboxCopy}</p>
                    </TabsContent>
                    <TabsContent value="routes">
                      <p className="demo-copy">{copy.tabs.routesCopy}</p>
                    </TabsContent>
                    <TabsContent value="archive">
                      <p className="demo-copy">{copy.tabs.archiveCopy}</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{copy.modalTitle}</CardTitle>
                  <CardDescription>{copy.modalDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="demo-stack">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="stamp">{copy.dialog.open}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{copy.dialog.title}</DialogTitle>
                          <DialogDescription>{copy.dialog.description}</DialogDescription>
                        </DialogHeader>
                        <Input defaultValue={copy.dialog.routeValue} aria-label={copy.dialog.routeLabel} />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="soft">{copy.dialog.cancel}</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={showToast}>{copy.dialog.confirm}</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <TooltipProvider delayDuration={120}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="parcel" onClick={showToast}>
                            {copy.tooltip.button}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{copy.tooltip.content}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="demo-section">
            <div className="demo-section__heading">
              <h2>{zh ? "v0.2 组件扩展" : "v0.2 expansion pack"}</h2>
              <p>
                {zh
                  ? "新增导航、展示、反馈和轻量交互组件，让 Pinepost 更接近完整产品组件库。"
                  : "New navigation, display, feedback, and lightweight interaction pieces make Pinepost feel closer to a full product library."}
              </p>
            </div>

            <div className="demo-grid demo-grid--core">
              <Card>
                <CardHeader>
                  <CardTitle>{zh ? "导航组件" : "Navigation"}</CardTitle>
                  <CardDescription>
                    {zh ? "菜单、面包屑、步骤、分页和分段控制。" : "Menu, breadcrumb, steps, pagination, and segmented controls."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="demo-form">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">{zh ? "邮局" : "Desk"}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{zh ? "路线" : "Routes"}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>

                    <Menu
                      value={menuValue}
                      onValueChange={setMenuValue}
                      items={[
                        { value: "inbox", label: zh ? "收件箱" : "Inbox" },
                        { value: "routes", label: zh ? "路线" : "Routes" },
                        { value: "archive", label: zh ? "归档" : "Archive" }
                      ]}
                    />

                    <Steps
                      active={1}
                      items={[
                        { title: zh ? "草稿" : "Draft" },
                        { title: zh ? "盖章" : "Stamp" },
                        { title: zh ? "投递" : "Deliver" }
                      ]}
                    />

                    <Pagination page={page} pageCount={4} onPageChange={setPage} />
                    <Segmented
                      value={segment}
                      onValueChange={setSegment}
                      options={[
                        { value: "calm", label: zh ? "安静" : "Calm" },
                        { value: "shop", label: zh ? "集市" : "Shop" }
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{zh ? "展示组件" : "Display"}</CardTitle>
                  <CardDescription>
                    {zh ? "信息状态、头像、空状态、进度、骨架和统计。" : "Status, avatar, empty state, progress, skeleton, and statistics."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="demo-form">
                    <Alert
                      variant="warning"
                      title={zh ? "北线延迟" : "North route delayed"}
                      description={zh ? "雨水让林间小路变慢了。" : "Rain has slowed the woodland path."}
                    />
                    <Space size="lg">
                      <Avatar fallback="PP" />
                      <span>
                        <Text tone="muted">{zh ? "窗口桌" : "Window desk"}</Text>
                        <br />
                        <Link href="#">{zh ? "查看路线" : "View route"}</Link>
                      </span>
                      <Divider orientation="vertical" />
                      <Tag variant="stamp">{zh ? "优先" : "Priority"}</Tag>
                    </Space>
                    <Progress value={68} label={zh ? "路线进度" : "Route progress"} />
                    <Skeleton count={2} aria-label={zh ? "加载路线" : "Loading routes"} />
                    <Descriptions
                      title={zh ? "包裹" : "Parcel"}
                      items={[
                        { label: zh ? "桌号" : "Desk", children: zh ? "雪松" : "Cedar" },
                        { label: zh ? "重量" : "Weight", children: zh ? "轻" : "Light" }
                      ]}
                    />
                    <Statistic label={zh ? "今日信件" : "Letters today"} value={18} suffix={zh ? "封" : "/ day"} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="demo-grid demo-grid--interactions">
              <Card>
                <CardHeader>
                  <CardTitle>{zh ? "反馈与浮层" : "Feedback and overlays"}</CardTitle>
                  <CardDescription>
                    {zh ? "下拉、气泡、二次确认和抽屉复用 Radix 交互基础。" : "Dropdown, popover, confirmation, and drawer reuse Radix interaction foundations."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="demo-stack">
                    <Dropdown>
                      <DropdownTrigger asChild>
                        <Button variant="soft">{zh ? "路线菜单" : "Route menu"}</Button>
                      </DropdownTrigger>
                      <DropdownContent>
                        <DropdownItem>{zh ? "重新排序" : "Sort route"}</DropdownItem>
                        <DropdownItem>{zh ? "打印标签" : "Print label"}</DropdownItem>
                      </DropdownContent>
                    </Dropdown>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="parcel">{zh ? "查看提示" : "Show note"}</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        {zh ? "窗口桌会在黄昏前处理这条路线。" : "The window desk will process this route before dusk."}
                      </PopoverContent>
                    </Popover>

                    <Popconfirm>
                      <PopconfirmTrigger asChild>
                        <Button variant="stamp">{zh ? "归档便签" : "Archive note"}</Button>
                      </PopconfirmTrigger>
                      <PopconfirmContent>
                        <PopconfirmTitle>{zh ? "确认归档？" : "Archive this note?"}</PopconfirmTitle>
                        <PopconfirmDescription>
                          {zh ? "便签会留在雪松柜里。" : "The note will stay in the cedar cabinet."}
                        </PopconfirmDescription>
                        <PopconfirmCancel>{zh ? "取消" : "Cancel"}</PopconfirmCancel>
                        <PopconfirmAction onClick={showToast}>{zh ? "确认" : "Confirm"}</PopconfirmAction>
                      </PopconfirmContent>
                    </Popconfirm>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button>{zh ? "打开抽屉" : "Open drawer"}</Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>{zh ? "路线抽屉" : "Route drawer"}</DrawerTitle>
                          <DrawerDescription>
                            {zh ? "用侧边面板承载更详细的路线信息。" : "Use a side panel for richer route detail."}
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="soft">{zh ? "关闭" : "Close"}</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{zh ? "状态与折叠" : "Status and disclosure"}</CardTitle>
                  <CardDescription>
                    {zh ? "结果页、时间线、水印和折叠面板适合文档型界面。" : "Result, timeline, watermark, and collapse fit documentation-style surfaces."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="demo-form">
                    <Result
                      status="success"
                      title={zh ? "全部打包完成" : "All packed"}
                      description={zh ? "每个包裹都已经贴好标签。" : "Every parcel now has a label."}
                    />
                    <Timeline
                      items={[
                        { title: zh ? "分拣" : "Sorted", description: zh ? "桌 A" : "Desk A" },
                        { title: zh ? "盖章" : "Stamped", description: zh ? "桌 B" : "Desk B" }
                      ]}
                    />
                    <Watermark content="Pinepost">
                      <div className="demo-watermark-preview">{zh ? "预览卡片" : "Preview card"}</div>
                    </Watermark>
                    <Collapse type="single" collapsible>
                      <CollapseItem value="route">
                        <CollapseTrigger>{zh ? "路线详情" : "Route details"}</CollapseTrigger>
                        <CollapseContent>{zh ? "黄昏前还有三站。" : "Three stops remain before dusk."}</CollapseContent>
                      </CollapseItem>
                    </Collapse>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Toast open={toastOpen} onOpenChange={setToastOpen}>
          <ToastTitle>{copy.toast.title}</ToastTitle>
          <ToastDescription>{copy.toast.description}</ToastDescription>
          <ToastClose aria-label={copy.toast.close}>x</ToastClose>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </PinepostProvider>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
