import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapse,
  CollapseContent,
  CollapseItem,
  CollapseTrigger,
  Descriptions,
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
  RadioGroup,
  Result,
  Segmented,
  Select,
  Skeleton,
  Slider,
  Space,
  Spinner,
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

type ApiRow = {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
};

type DocItem = {
  api: ApiRow[];
  code: string;
  description: string;
  group: string;
  id: string;
  preview: React.ReactNode;
  title: string;
};

type NavGroup = {
  items: Array<{ id: string; label: string }>;
  title: string;
};

type GuidePanelId = "install" | "theme";

const themeOrder: PinepostTheme[] = ["calm", "play", "shop"];
const localeOrder: PinepostLocale[] = ["zh-CN", "en"];

const copy = {
  "zh-CN": {
    brand: "Pinepost UI",
    tagline: "森林邮局组件文档",
    introTitle: "Button 按钮",
    intro:
      "Pinepost UI 是一套可商用的 React 组件库。这里展示每个组件的预览、使用示例和 API，方便直接复制到业务项目中。",
    install: "安装",
    installCode: "pnpm add pinepost-ui",
    importStyle: "样式入口",
    theme: "主题",
    language: "语言",
    preview: "预览",
    usage: "使用示例",
    api: "API",
    prop: "属性",
    type: "类型",
    defaultValue: "默认值",
    description: "说明",
    groups: {
      guide: "指南",
      basic: "基础组件",
      form: "表单组件",
      navigation: "导航组件",
      feedback: "反馈组件",
      display: "数据展示"
    },
    themes: {
      calm: "安静",
      play: "活泼",
      shop: "集市"
    }
  },
  en: {
    brand: "Pinepost UI",
    tagline: "Forest-post component docs",
    introTitle: "Button",
    intro:
      "Pinepost UI is a commercial-friendly React component library. Each section shows a live preview, a usage example, and the API surface.",
    install: "Install",
    installCode: "pnpm add pinepost-ui",
    importStyle: "Style entry",
    theme: "Theme",
    language: "Language",
    preview: "Preview",
    usage: "Usage",
    api: "API",
    prop: "Prop",
    type: "Type",
    defaultValue: "Default",
    description: "Description",
    groups: {
      guide: "Guide",
      basic: "Basic",
      form: "Form",
      navigation: "Navigation",
      feedback: "Feedback",
      display: "Display"
    },
    themes: {
      calm: "Calm",
      play: "Play",
      shop: "Shop"
    }
  }
} satisfies Record<PinepostLocale, Record<string, unknown>>;

function PinepostMark() {
  return (
    <svg className="docs-mark" viewBox="0 0 92 92" aria-hidden="true">
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

function code(lines: string[]) {
  return lines.join("\n");
}

function ApiTable({ item, labels }: { item: DocItem; labels: (typeof copy)["zh-CN"] }) {
  return (
    <div className="docs-api-wrap" aria-label={`${item.title} ${labels.api}`}>
      <table className="docs-api">
        <thead>
          <tr>
            <th>{labels.prop}</th>
            <th>{labels.type}</th>
            <th>{labels.defaultValue}</th>
            <th>{labels.description}</th>
          </tr>
        </thead>
        <tbody>
          {item.api.map((row) => (
            <tr key={row.prop}>
              <td>
                <code>{row.prop}</code>
              </td>
              <td>{row.type}</td>
              <td>{row.defaultValue}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocSection({ item, labels }: { item: DocItem; labels: (typeof copy)["zh-CN"] }) {
  return (
    <section className="docs-section">
      <div className="docs-section__head">
        <span>{item.group}</span>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
      <div className="docs-example">
        <div className="docs-example__preview">
          <div className="docs-example__label">{labels.preview}</div>
          <div className="docs-preview-surface">{item.preview}</div>
        </div>
        <div className="docs-code">
          <div className="docs-code__label">{labels.usage}</div>
          <pre>
            <code>{item.code}</code>
          </pre>
        </div>
      </div>
      <ApiTable item={item} labels={labels} />
    </section>
  );
}

function InstallPanel({ labels, zh }: { labels: (typeof copy)["zh-CN"]; zh: boolean }) {
  return (
    <section className="docs-section docs-section--guide">
      <div className="docs-section__head">
        <span>{labels.groups.guide}</span>
        <h2>{labels.install}</h2>
        <p>{zh ? "安装包、引入样式，然后用 PinepostProvider 包住应用。" : "Install the package, import styles, and wrap your app with PinepostProvider."}</p>
      </div>
      <div className="docs-guide-grid">
        <div className="docs-note">
          <strong>{labels.install}</strong>
          <code>{labels.installCode}</code>
        </div>
        <div className="docs-note">
          <strong>{labels.importStyle}</strong>
          <code>import "pinepost-ui/styles.css";</code>
        </div>
      </div>
    </section>
  );
}

function ThemePanel({ labels, locale, theme, zh }: { labels: (typeof copy)["zh-CN"]; locale: PinepostLocale; theme: PinepostTheme; zh: boolean }) {
  return (
    <section className="docs-section docs-section--guide">
      <div className="docs-section__head">
        <span>{labels.groups.guide}</span>
        <h2>{zh ? "Theme 与 Locale" : "Theme and Locale"}</h2>
        <p>{zh ? "Provider 同时管理主题、语言和根节点 token，适合文档站与业务应用共用。" : "The provider controls theme, locale, and root tokens for docs and product apps."}</p>
      </div>
      <div className="docs-example">
        <div className="docs-example__preview">
          <div className="docs-example__label">{labels.preview}</div>
          <Space>
            <Tag>{labels.themes[theme]}</Tag>
            <Badge variant="sky">{locale}</Badge>
          </Space>
        </div>
        <div className="docs-code">
          <div className="docs-code__label">{labels.usage}</div>
          <pre>
            <code>
              {code([
                'import { PinepostProvider } from "pinepost-ui";',
                "",
                "<PinepostProvider theme=\"calm\" locale=\"zh-CN\">",
                "  <App />",
                "</PinepostProvider>"
              ])}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [locale, setLocale] = React.useState<PinepostLocale>("zh-CN");
  const [theme, setTheme] = React.useState<PinepostTheme>("calm");
  const [selectedId, setSelectedId] = React.useState("button");
  const [menuValue, setMenuValue] = React.useState("routes");
  const [page, setPage] = React.useState(2);
  const [segment, setSegment] = React.useState("calm");
  const [selectValue, setSelectValue] = React.useState("cedar");
  const [radioValue, setRadioValue] = React.useState("standard");
  const [toastOpen, setToastOpen] = React.useState(false);
  const labels = copy[locale] as (typeof copy)["zh-CN"];
  const zh = locale === "zh-CN";

  function showToast() {
    setToastOpen(false);
    window.setTimeout(() => setToastOpen(true), 70);
  }

  const docs: DocItem[] = [
    {
      id: "button",
      group: labels.groups.basic,
      title: zh ? "Button 按钮" : "Button",
      description: zh
        ? "支持 primary、soft、stamp、parcel 四种视觉语义和三种尺寸，适合动作、保存、盖章和订单场景。"
        : "Four variants and three sizes cover action, save, stamp, and parcel workflows.",
      preview: (
        <Space size="lg">
          <Button>发送更新</Button>
          <Button variant="soft">保存草稿</Button>
          <Button variant="stamp">盖章通过</Button>
          <Button variant="parcel">打包订单</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </Space>
      ),
      code: code([
        'import { Button, Space } from "pinepost-ui";',
        "",
        "export function Example() {",
        "  return (",
        "    <Space>",
        '      <Button>发送更新</Button>',
        '      <Button variant="soft">保存草稿</Button>',
        '      <Button variant="stamp">盖章通过</Button>',
        '      <Button variant="parcel">打包订单</Button>',
        "    </Space>",
        "  );",
        "}"
      ]),
      api: [
        { prop: "variant", type: '"primary" | "soft" | "stamp" | "parcel"', defaultValue: "primary", description: zh ? "按钮视觉语义。" : "Visual intent." },
        { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: zh ? "按钮尺寸。" : "Button size." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: zh ? "禁用按钮。" : "Disables the button." }
      ]
    },
    {
      id: "input",
      group: labels.groups.form,
      title: zh ? "Input 输入框" : "Input",
      description: zh ? "纸张质感的文本输入，保留清晰边界和焦点状态。" : "Paper-like text input with clear borders and focus states.",
      preview: (
        <div className="docs-field-grid">
          <label>
            {zh ? "收件处" : "Recipient"}
            <Input placeholder={zh ? "苔藓桌" : "Moss desk"} />
          </label>
          <label>
            {zh ? "备注" : "Note"}
            <Textarea placeholder={zh ? "写一条简短配送备注" : "Write a short delivery note"} />
          </label>
        </div>
      ),
      code: code([
        'import { Input, Textarea } from "pinepost-ui";',
        "",
        "export function Example() {",
        "  return (",
        "    <label>",
        "      收件处",
        '      <Input placeholder="苔藓桌" />',
        "    </label>",
        "  );",
        "}"
      ]),
      api: [
        { prop: "inputSize", type: '"sm" | "md" | "lg"', defaultValue: "md", description: zh ? "Input 的高度和字号。" : "Input height and font size." },
        { prop: "placeholder", type: "string", defaultValue: "-", description: zh ? "空值提示。" : "Empty value hint." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: zh ? "禁用输入。" : "Disables input." }
      ]
    },
    {
      id: "select",
      group: labels.groups.form,
      title: zh ? "Select 选择器" : "Select",
      description: zh ? "基于 Radix Select 的可访问下拉选择器，适合路线、状态和枚举字段。" : "Accessible dropdown selection for routes, statuses, and enum fields.",
      preview: (
        <Select
          aria-label={zh ? "路线桌" : "Route desk"}
          value={selectValue}
          onValueChange={setSelectValue}
          options={[
            { value: "cedar", label: zh ? "雪松桌" : "Cedar desk" },
            { value: "moss", label: zh ? "苔藓桌" : "Moss desk" },
            { value: "window", label: zh ? "窗口桌" : "Window desk" }
          ]}
        />
      ),
      code: code([
        'import { Select } from "pinepost-ui";',
        "",
        "<Select",
        '  placeholder="选择桌号"',
        "  options={[",
        '    { value: "cedar", label: "雪松桌" },',
        '    { value: "moss", label: "苔藓桌" }',
        "  ]}",
        "/>"
      ]),
      api: [
        { prop: "options", type: "SelectOption[]", defaultValue: "[]", description: zh ? "下拉选项。" : "Dropdown options." },
        { prop: "value", type: "string", defaultValue: "-", description: zh ? "受控值。" : "Controlled value." },
        { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "值变化回调。" : "Value change callback." }
      ]
    },
    {
      id: "choice",
      group: labels.groups.form,
      title: zh ? "Choice 选择控件" : "Choice controls",
      description: zh ? "Checkbox、Switch、RadioGroup、Slider 使用同一套清晰的邮局表单语言。" : "Checkbox, Switch, RadioGroup, and Slider share one form language.",
      preview: (
        <div className="docs-field-grid">
          <Checkbox label={zh ? "附加路线标签" : "Attach route tag"} description={zh ? "在待发托盘里显示。" : "Show it in the outgoing tray."} />
          <Switch label={zh ? "静默配送" : "Quiet delivery"} description={zh ? "发送时不弹出提醒。" : "Send without a desk alert."} />
          <RadioGroup
            aria-label={zh ? "配送速度" : "Delivery speed"}
            value={radioValue}
            onValueChange={setRadioValue}
            options={[
              { value: "standard", label: zh ? "标准" : "Standard" },
              { value: "priority", label: zh ? "优先" : "Priority" }
            ]}
          />
          <Slider aria-label={zh ? "路线进度" : "Route progress"} value={[64]} max={100} />
        </div>
      ),
      code: code([
        'import { Checkbox, RadioGroup, Slider, Switch } from "pinepost-ui";',
        "",
        '<Checkbox label="附加路线标签" />',
        '<Switch label="静默配送" />',
        "<RadioGroup",
        "  options={[",
        '    { value: "standard", label: "标准" },',
        '    { value: "priority", label: "优先" }',
        "  ]}",
        "/>",
        '<Slider aria-label="路线进度" value={[64]} max={100} />'
      ]),
      api: [
        { prop: "checked", type: "boolean", defaultValue: "-", description: zh ? "Checkbox/Switch 受控状态。" : "Controlled checkbox or switch state." },
        { prop: "options", type: "RadioOption[]", defaultValue: "[]", description: zh ? "RadioGroup 选项。" : "RadioGroup options." },
        { prop: "value", type: "number[] | string", defaultValue: "-", description: zh ? "Slider 或 RadioGroup 的受控值。" : "Controlled Slider or RadioGroup value." }
      ]
    },
    {
      id: "card",
      group: labels.groups.basic,
      title: zh ? "Card 卡片" : "Card",
      description: zh ? "信纸白板承载标题、说明、内容和页脚，适合组织小块信息。" : "A letter-paper surface for title, description, content, and footer.",
      preview: (
        <Card>
          <CardHeader>
            <CardTitle>{zh ? "包裹操作" : "Parcel actions"}</CardTitle>
            <CardDescription>{zh ? "不同状态清晰分层。" : "Clear layers for status and actions."}</CardDescription>
          </CardHeader>
          <CardContent>
            <Space>
              <Badge>{zh ? "就绪" : "Ready"}</Badge>
              <Badge variant="stamp">{zh ? "优先" : "Priority"}</Badge>
              <Tag variant="sky">{zh ? "路线 A7" : "Route A7"}</Tag>
            </Space>
          </CardContent>
          <CardFooter>
            <Button size="sm">{zh ? "继续" : "Continue"}</Button>
          </CardFooter>
        </Card>
      ),
      code: code([
        'import { Card, CardContent, CardHeader, CardTitle } from "pinepost-ui";',
        "",
        "<Card>",
        "  <CardHeader>",
        "    <CardTitle>包裹操作</CardTitle>",
        "  </CardHeader>",
        "  <CardContent>...</CardContent>",
        "</Card>"
      ]),
      api: [
        { prop: "CardHeader", type: "React.HTMLAttributes<HTMLDivElement>", defaultValue: "-", description: zh ? "卡片头部。" : "Card heading area." },
        { prop: "CardContent", type: "React.HTMLAttributes<HTMLDivElement>", defaultValue: "-", description: zh ? "卡片主体。" : "Card body." },
        { prop: "CardFooter", type: "React.HTMLAttributes<HTMLDivElement>", defaultValue: "-", description: zh ? "卡片页脚。" : "Card footer." }
      ]
    },
    {
      id: "tabs",
      group: labels.groups.navigation,
      title: zh ? "Tabs 标签页" : "Tabs",
      description: zh ? "用分段邮路承载同级内容切换，键盘交互由 Radix 提供。" : "Segmented route tabs for peer content, with Radix keyboard behavior.",
      preview: (
        <Tabs defaultValue="inbox">
          <TabsList aria-label={zh ? "邮件托盘" : "Mail trays"}>
            <TabsTrigger value="inbox">{zh ? "收件箱" : "Inbox"}</TabsTrigger>
            <TabsTrigger value="routes">{zh ? "路线" : "Routes"}</TabsTrigger>
            <TabsTrigger value="archive">{zh ? "归档" : "Archive"}</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">
            <Text tone="muted">{zh ? "三封信等待分拣。" : "Three letters are waiting."}</Text>
          </TabsContent>
          <TabsContent value="routes">
            <Text tone="muted">{zh ? "两条路线开放。" : "Two routes are open."}</Text>
          </TabsContent>
          <TabsContent value="archive">
            <Text tone="muted">{zh ? "旧便签在柜中。" : "Older notes stay in the cabinet."}</Text>
          </TabsContent>
        </Tabs>
      ),
      code: code([
        'import { Tabs, TabsContent, TabsList, TabsTrigger } from "pinepost-ui";',
        "",
        '<Tabs defaultValue="inbox">',
        '  <TabsList aria-label="邮件托盘">',
        '    <TabsTrigger value="inbox">收件箱</TabsTrigger>',
        '    <TabsTrigger value="routes">路线</TabsTrigger>',
        "  </TabsList>",
        '  <TabsContent value="inbox">三封信等待分拣。</TabsContent>',
        "</Tabs>"
      ]),
      api: [
        { prop: "defaultValue", type: "string", defaultValue: "-", description: zh ? "非受控初始标签。" : "Initial uncontrolled tab." },
        { prop: "value", type: "string", defaultValue: "-", description: zh ? "受控标签。" : "Controlled tab value." },
        { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "切换回调。" : "Change callback." }
      ]
    },
    {
      id: "navigation",
      group: labels.groups.navigation,
      title: zh ? "Navigation 导航" : "Navigation",
      description: zh ? "面包屑、菜单、步骤条、分页和分段控件覆盖常见信息架构。" : "Breadcrumb, menu, steps, pagination, and segmented controls cover common navigation patterns.",
      preview: (
        <div className="docs-field-grid">
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
          <Steps active={1} items={[{ title: zh ? "草稿" : "Draft" }, { title: zh ? "盖章" : "Stamp" }, { title: zh ? "投递" : "Deliver" }]} />
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
      ),
      code: code([
        'import { Menu, Pagination, Segmented, Steps } from "pinepost-ui";',
        "",
        "<Menu",
        '  value="routes"',
        "  items={[",
        '    { value: "inbox", label: "收件箱" },',
        '    { value: "routes", label: "路线" }',
        "  ]}",
        "/>"
      ]),
      api: [
        { prop: "items", type: "Array<{ value; label }>", defaultValue: "[]", description: zh ? "菜单或步骤项。" : "Menu or step items." },
        { prop: "page", type: "number", defaultValue: "-", description: zh ? "当前页。" : "Current page." },
        { prop: "onPageChange", type: "(page: number) => void", defaultValue: "-", description: zh ? "分页切换回调。" : "Pagination callback." }
      ]
    },
    {
      id: "dialog",
      group: labels.groups.feedback,
      title: zh ? "Dialog 弹窗" : "Dialog",
      description: zh ? "用于确认和短流程表单，焦点管理和 Portal 行为由 Radix 处理。" : "For confirmation and short forms, with Radix focus and portal behavior.",
      preview: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="stamp">{zh ? "打开调度便签" : "Open dispatch note"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{zh ? "调度便签" : "Dispatch note"}</DialogTitle>
              <DialogDescription>{zh ? "确认包裹路线，并留下简短备注。" : "Confirm the parcel route and leave a short note."}</DialogDescription>
            </DialogHeader>
            <Input defaultValue={zh ? "雪松小路，窗口桌" : "Cedar lane, window desk"} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="soft">{zh ? "取消" : "Cancel"}</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={showToast}>{zh ? "确认路线" : "Confirm route"}</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      code: code([
        'import { Button, Dialog, DialogContent, DialogTrigger } from "pinepost-ui";',
        "",
        "<Dialog>",
        "  <DialogTrigger asChild>",
        "    <Button>打开调度便签</Button>",
        "  </DialogTrigger>",
        "  <DialogContent>...</DialogContent>",
        "</Dialog>"
      ]),
      api: [
        { prop: "open", type: "boolean", defaultValue: "-", description: zh ? "受控打开状态。" : "Controlled open state." },
        { prop: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-", description: zh ? "开关回调。" : "Open state callback." },
        { prop: "asChild", type: "boolean", defaultValue: "false", description: zh ? "让触发器复用子元素。" : "Use child as trigger element." }
      ]
    },
    {
      id: "overlay",
      group: labels.groups.feedback,
      title: zh ? "Overlay 浮层" : "Overlay",
      description: zh ? "Dropdown、Popover、Tooltip、Popconfirm、Drawer 覆盖菜单、提示、确认和侧边面板。" : "Dropdown, Popover, Tooltip, Popconfirm, and Drawer cover menus, hints, confirmations, and panels.",
      preview: (
        <TooltipProvider delayDuration={120}>
          <Space size="lg">
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
              <PopoverContent>{zh ? "窗口桌会在黄昏前处理路线。" : "The window desk will process this before dusk."}</PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>{zh ? "悬停提示" : "Tooltip"}</Button>
              </TooltipTrigger>
              <TooltipContent>{zh ? "小型说明浮层。" : "Small hint surface."}</TooltipContent>
            </Tooltip>
            <Popconfirm>
              <PopconfirmTrigger asChild>
                <Button variant="stamp">{zh ? "归档" : "Archive"}</Button>
              </PopconfirmTrigger>
              <PopconfirmContent>
                <PopconfirmTitle>{zh ? "确认归档？" : "Archive this note?"}</PopconfirmTitle>
                <PopconfirmDescription>{zh ? "便签会留在雪松柜里。" : "The note will stay in the cabinet."}</PopconfirmDescription>
                <PopconfirmCancel>{zh ? "取消" : "Cancel"}</PopconfirmCancel>
                <PopconfirmAction onClick={showToast}>{zh ? "确认" : "Confirm"}</PopconfirmAction>
              </PopconfirmContent>
            </Popconfirm>
            <Drawer>
              <DrawerTrigger asChild>
                <Button>{zh ? "抽屉" : "Drawer"}</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{zh ? "路线抽屉" : "Route drawer"}</DrawerTitle>
                  <DrawerDescription>{zh ? "承载更详细的路线信息。" : "A side panel for richer route detail."}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="soft">{zh ? "关闭" : "Close"}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Space>
        </TooltipProvider>
      ),
      code: code([
        'import { Button, Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "pinepost-ui";',
        "",
        "<Dropdown>",
        "  <DropdownTrigger asChild>",
        "    <Button>路线菜单</Button>",
        "  </DropdownTrigger>",
        "  <DropdownContent>",
        "    <DropdownItem>重新排序</DropdownItem>",
        "  </DropdownContent>",
        "</Dropdown>"
      ]),
      api: [
        { prop: "sideOffset", type: "number", defaultValue: "8 | 10", description: zh ? "浮层与触发器间距。" : "Offset from trigger." },
        { prop: "side", type: '"left" | "right"', defaultValue: "right", description: zh ? "Drawer 打开方向。" : "Drawer side." },
        { prop: "onConfirm", type: "() => void", defaultValue: "-", description: zh ? "Popconfirm 确认回调。" : "Popconfirm callback." }
      ]
    },
    {
      id: "toast",
      group: labels.groups.feedback,
      title: zh ? "Toast 通知" : "Toast",
      description: zh ? "轻量通知保留邮戳色条，不打断当前任务。" : "Lightweight notifications use a stamp stripe without interrupting the task.",
      preview: (
        <Space>
          <Button onClick={showToast}>{zh ? "发送通知" : "Send toast"}</Button>
          <Spinner label={zh ? "分拣中" : "Sorting"} />
        </Space>
      ),
      code: code([
        'import { Toast, ToastProvider, ToastTitle, ToastViewport } from "pinepost-ui";',
        "",
        "<ToastProvider>",
        "  <Toast open>",
        "    <ToastTitle>路线已确认</ToastTitle>",
        "  </Toast>",
        "  <ToastViewport />",
        "</ToastProvider>"
      ]),
      api: [
        { prop: "open", type: "boolean", defaultValue: "-", description: zh ? "通知显示状态。" : "Toast visibility." },
        { prop: "duration", type: "number", defaultValue: "5000", description: zh ? "停留时间。" : "Display duration." },
        { prop: "swipeDirection", type: '"right" | "left" | "up" | "down"', defaultValue: "right", description: zh ? "滑动方向。" : "Swipe direction." }
      ]
    },
    {
      id: "display",
      group: labels.groups.display,
      title: zh ? "Display 数据展示" : "Display",
      description: zh ? "Alert、Avatar、Progress、Skeleton、Descriptions、Statistic 适合构建后台和工具页。" : "Alert, Avatar, Progress, Skeleton, Descriptions, and Statistic fit product tools.",
      preview: (
        <div className="docs-field-grid">
          <Alert variant="warning" title={zh ? "北线延迟" : "North route delayed"} description={zh ? "雨水让小路变慢了。" : "Rain has slowed the path."} />
          <Space size="lg">
            <Avatar fallback="PP" />
            <span>
              <Text tone="muted">{zh ? "窗口桌" : "Window desk"}</Text>
              <br />
              <Link href="#">{zh ? "查看路线" : "View route"}</Link>
            </span>
            <Tag variant="stamp">{zh ? "优先" : "Priority"}</Tag>
          </Space>
          <Progress value={68} label={zh ? "路线进度" : "Route progress"} />
          <Skeleton count={2} aria-label={zh ? "加载路线" : "Loading routes"} />
          <Descriptions title={zh ? "包裹" : "Parcel"} items={[{ label: zh ? "桌号" : "Desk", children: zh ? "雪松" : "Cedar" }, { label: zh ? "重量" : "Weight", children: zh ? "轻" : "Light" }]} />
          <Statistic label={zh ? "今日信件" : "Letters today"} value={18} suffix={zh ? "封" : "/ day"} />
        </div>
      ),
      code: code([
        'import { Alert, Progress, Statistic } from "pinepost-ui";',
        "",
        '<Alert title="北线延迟" variant="warning" />',
        '<Progress value={68} label="路线进度" />',
        '<Statistic label="今日信件" value={18} suffix="封" />'
      ]),
      api: [
        { prop: "variant", type: '"info" | "success" | "warning" | "danger"', defaultValue: "info", description: zh ? "Alert 状态。" : "Alert status." },
        { prop: "value", type: "number | ReactNode", defaultValue: "-", description: zh ? "Progress 或 Statistic 的值。" : "Progress or Statistic value." },
        { prop: "items", type: "DescriptionItem[]", defaultValue: "[]", description: zh ? "Descriptions 条目。" : "Description rows." }
      ]
    },
    {
      id: "result",
      group: labels.groups.display,
      title: zh ? "Result 与 Empty" : "Result and Empty",
      description: zh ? "适合空状态、完成状态、时间线和带水印的预览区域。" : "Useful for empty states, completion states, timelines, and watermarked previews.",
      preview: (
        <div className="docs-field-grid">
          <Result status="success" title={zh ? "全部打包完成" : "All packed"} description={zh ? "每个包裹都已经贴好标签。" : "Every parcel now has a label."} />
          <Empty title={zh ? "没有待发信件" : "No outgoing letters"} description={zh ? "托盘已经清空。" : "The tray is clear."} action={<Button size="sm">{zh ? "新建便签" : "New note"}</Button>} />
          <Timeline items={[{ title: zh ? "分拣" : "Sorted", description: zh ? "桌 A" : "Desk A" }, { title: zh ? "盖章" : "Stamped", description: zh ? "桌 B" : "Desk B" }]} />
          <Watermark content="Pinepost">
            <div className="docs-watermark-card">{zh ? "预览卡片" : "Preview card"}</div>
          </Watermark>
          <Collapse type="single" collapsible>
            <CollapseItem value="route">
              <CollapseTrigger>{zh ? "路线详情" : "Route details"}</CollapseTrigger>
              <CollapseContent>{zh ? "黄昏前还有三站。" : "Three stops remain before dusk."}</CollapseContent>
            </CollapseItem>
          </Collapse>
        </div>
      ),
      code: code([
        'import { Empty, Result, Timeline, Watermark } from "pinepost-ui";',
        "",
        '<Result status="success" title="全部打包完成" />',
        '<Empty title="没有待发信件" />',
        '<Timeline items={[{ title: "分拣" }, { title: "盖章" }]} />'
      ]),
      api: [
        { prop: "status", type: '"info" | "success" | "warning" | "danger"', defaultValue: "info", description: zh ? "Result 状态。" : "Result status." },
        { prop: "action", type: "ReactNode", defaultValue: "-", description: zh ? "Empty 操作区。" : "Empty action area." },
        { prop: "content", type: "string", defaultValue: "-", description: zh ? "Watermark 文案。" : "Watermark text." }
      ]
    }
  ];

  const navGroups: NavGroup[] = [
    { title: labels.groups.basic, items: docs.filter((item) => item.group === labels.groups.basic).map((item) => ({ id: item.id, label: item.title })) },
    { title: labels.groups.form, items: docs.filter((item) => item.group === labels.groups.form).map((item) => ({ id: item.id, label: item.title })) },
    { title: labels.groups.navigation, items: docs.filter((item) => item.group === labels.groups.navigation).map((item) => ({ id: item.id, label: item.title })) },
    { title: labels.groups.feedback, items: docs.filter((item) => item.group === labels.groups.feedback).map((item) => ({ id: item.id, label: item.title })) },
    { title: labels.groups.display, items: docs.filter((item) => item.group === labels.groups.display).map((item) => ({ id: item.id, label: item.title })) },
    {
      title: labels.groups.guide,
      items: [
        { id: "install", label: zh ? "安装使用" : "Install" },
        { id: "theme", label: zh ? "主题语言" : "Theme and locale" }
      ]
    }
  ];
  const selectedDoc = docs.find((item) => item.id === selectedId);
  const selectedPanelTitle =
    selectedDoc?.title ?? (selectedId === "install" ? labels.install : zh ? "Theme 与 Locale" : "Theme and Locale");
  const selectedPanelDescription =
    selectedDoc?.description ??
    (selectedId === "install"
      ? zh
        ? "安装包、引入样式，然后用 PinepostProvider 包住应用。"
        : "Install the package, import styles, and wrap your app with PinepostProvider."
      : zh
        ? "Provider 同时管理主题、语言和根节点 token，适合文档站与业务应用共用。"
        : "The provider controls theme, locale, and root tokens for docs and product apps.");

  function renderSelectedPanel() {
    if (selectedDoc) {
      return <DocSection item={selectedDoc} labels={labels} />;
    }

    if ((selectedId as GuidePanelId) === "install") {
      return <InstallPanel labels={labels} zh={zh} />;
    }

    return <ThemePanel labels={labels} locale={locale} theme={theme} zh={zh} />;
  }

  return (
    <PinepostProvider theme={theme} locale={locale} className="docs-app">
      <ToastProvider swipeDirection="right">
        <aside className="docs-sidebar">
          <button className="docs-brand" type="button" onClick={() => setSelectedId("button")} aria-label="Pinepost UI">
            <PinepostMark />
            <span>
              <strong>{labels.brand}</strong>
              <small>{labels.tagline}</small>
            </span>
          </button>
          <nav className="docs-nav" aria-label="Component navigation">
            {navGroups.map((group) => (
              <div className="docs-nav__group" key={group.title}>
                <span>{group.title}</span>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    data-active={selectedId === item.id}
                    aria-current={selectedId === item.id ? "page" : undefined}
                    onClick={() => setSelectedId(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="docs-main">
          <div className="docs-topbar">
            <div>
              <h1>{selectedPanelTitle}</h1>
              <p>{selectedPanelDescription}</p>
            </div>
            <div className="docs-toolbar" aria-label="Documentation controls">
              <span>{labels.language}</span>
              <Segmented
                value={locale}
                onValueChange={(value) => setLocale(value as PinepostLocale)}
                options={localeOrder.map((item) => ({ value: item, label: item === "zh-CN" ? "中文" : "EN" }))}
              />
              <span>{labels.theme}</span>
              <Segmented
                value={theme}
                onValueChange={(value) => setTheme(value as PinepostTheme)}
                options={themeOrder.map((item) => ({ value: item, label: labels.themes[item] }))}
              />
            </div>
          </div>

          {renderSelectedPanel()}
        </main>

        <Toast open={toastOpen} onOpenChange={setToastOpen}>
          <ToastTitle>{zh ? "路线已确认" : "Route confirmed"}</ToastTitle>
          <ToastDescription>{zh ? "便签已经打包，准备送到下一张桌子。" : "The note is packed for the next desk."}</ToastDescription>
          <ToastClose aria-label={zh ? "关闭通知" : "Close toast"}>x</ToastClose>
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
