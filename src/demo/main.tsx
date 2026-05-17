import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  Affix,
  Anchor,
  Avatar,
  Badge,
  Backtop,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Carousel,
  Cascader,
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
  Col,
  Container,
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
  Form,
  FormField,
  Header,
  Image,
  Input,
  InputNumber,
  InputOTP,
  InputTag,
  Link,
  Loading,
  Main,
  Menu,
  Message,
  MessageBox,
  Mention,
  Notification,
  Pagination,
  PageHeader,
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
  Rate,
  Result,
  Row,
  Scrollbar,
  Segmented,
  Select,
  Skeleton,
  Slider,
  Space,
  Spinner,
  Splitter,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  Textarea,
  TimePicker,
  TimeSelect,
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
  Transfer,
  Tree,
  TreeSelect,
  Tour,
  Upload,
  VirtualizedSelect,
  VirtualizedTable,
  VirtualizedTree,
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

type ApiSection = {
  rows: ApiRow[];
  title: string;
};

type DocItem = {
  api: ApiRow[];
  apiSections?: ApiSection[];
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
    attributes: "属性",
    events: "事件",
    methods: "方法",
    options: "选项",
    shortcuts: "快捷键",
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
    attributes: "Attributes",
    events: "Events",
    methods: "Methods",
    options: "Options",
    shortcuts: "Shortcuts",
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
  const sections = item.apiSections ?? [{ rows: item.api, title: labels.api }];

  return (
    <>
      {sections.map((section) => (
        <div className="docs-api-wrap" aria-label={`${item.title} ${section.title}`} key={section.title}>
          <strong className="docs-api-title">{section.title}</strong>
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
              {section.rows.map((row) => (
                <tr key={`${section.title}-${row.prop}`}>
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
      ))}
    </>
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
  const [rateValue, setRateValue] = React.useState(4);
  const [cascaderValue, setCascaderValue] = React.useState(["north", "cedar"]);
  const [transferValue, setTransferValue] = React.useState(["stamp"]);
  const [treeSelectValue, setTreeSelectValue] = React.useState<string | string[]>("moss");
  const [virtualSelectValue, setVirtualSelectValue] = React.useState("route-12");
  const [inputTags, setInputTags] = React.useState(["优先", "路线 A7"]);
  const [otpValue, setOtpValue] = React.useState("247");
  const [mentionValue, setMentionValue] = React.useState("请交给 @cedar ");
  const [timeSelectValue, setTimeSelectValue] = React.useState("09:30");
  const [tourOpen, setTourOpen] = React.useState(false);
  const [virtualTreeSelected, setVirtualTreeSelected] = React.useState("north-3");
  const [messageBoxOpen, setMessageBoxOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const labels = copy[locale] as (typeof copy)["zh-CN"];
  const zh = locale === "zh-CN";

  function showToast() {
    setToastOpen(false);
    window.setTimeout(() => setToastOpen(true), 70);
  }

  const routeOptions = [
    {
      value: "north",
      label: zh ? "北线" : "North line",
      children: [
        { value: "cedar", label: zh ? "雪松桌" : "Cedar desk" },
        { value: "moss", label: zh ? "苔藓桌" : "Moss desk" }
      ]
    },
    {
      value: "south",
      label: zh ? "南线" : "South line",
      children: [
        { value: "river", label: zh ? "河岸桌" : "River desk" },
        { value: "window", label: zh ? "窗口桌" : "Window desk" }
      ]
    }
  ];
  const transferData = [
    { key: "sort", label: zh ? "分拣清单" : "Sorting list", description: zh ? "准备进入待发托盘。" : "Ready for the outgoing tray." },
    { key: "stamp", label: zh ? "盖章清单" : "Stamp list", description: zh ? "需要复核邮戳。" : "Needs stamp review." },
    { key: "parcel", label: zh ? "包裹清单" : "Parcel list", description: zh ? "等待打包。" : "Waiting to be packed." },
    { key: "archive", label: zh ? "归档清单" : "Archive list", description: zh ? "已完成路线。" : "Completed route." }
  ];
  const virtualOptions = Array.from({ length: 60 }, (_, index) => ({
    value: `route-${index}`,
    label: zh ? `路线 ${index}` : `Route ${index}`
  }));
  const virtualRows = Array.from({ length: 120 }, (_, index) => ({
    count: (index % 9) + 1,
    route: zh ? `路线 ${index}` : `Route ${index}`,
    status: index % 3 === 0 ? (zh ? "复核" : "Review") : zh ? "就绪" : "Ready"
  }));
  const virtualTreeItems = [
    {
      value: "north",
      label: zh ? "北线批次" : "North batches",
      children: Array.from({ length: 18 }, (_, index) => ({
        value: `north-${index}`,
        label: zh ? `北线 ${index}` : `North ${index}`
      }))
    },
    {
      value: "south",
      label: zh ? "南线批次" : "South batches",
      children: Array.from({ length: 18 }, (_, index) => ({
        value: `south-${index}`,
        label: zh ? `南线 ${index}` : `South ${index}`
      }))
    }
  ];

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
      id: "layout",
      group: labels.groups.basic,
      title: zh ? "Layout 布局" : "Layout",
      description: zh ? "Container、Row、Col、Scrollbar 和 Splitter 用于搭建稳定页面结构。" : "Container, Row, Col, Scrollbar, and Splitter build stable page shells.",
      preview: (
        <Container>
          <Header>{zh ? "路线台" : "Route desk"}</Header>
          <Main>
            <Row>
              <Col span={6}>{zh ? "左侧分拣" : "Left sorting"}</Col>
              <Col span={6}>{zh ? "右侧预览" : "Right preview"}</Col>
            </Row>
            <Scrollbar maxHeight={96}>
              <Space direction="vertical">
                <Text>{zh ? "路线日志 01" : "Route log 01"}</Text>
                <Text>{zh ? "路线日志 02" : "Route log 02"}</Text>
                <Text>{zh ? "路线日志 03" : "Route log 03"}</Text>
              </Space>
            </Scrollbar>
            <Splitter>
              <span>{zh ? "收件" : "Inbox"}</span>
              <span>{zh ? "预览" : "Preview"}</span>
            </Splitter>
          </Main>
        </Container>
      ),
      code: code([
        'import { Col, Container, Header, Main, Row } from "pinepost-ui";',
        "",
        "<Container>",
        "  <Header>路线台</Header>",
        "  <Main>",
        "    <Row>",
        "      <Col span={6}>左侧分拣</Col>",
        "      <Col span={6}>右侧预览</Col>",
        "    </Row>",
        "  </Main>",
        "</Container>"
      ]),
      api: [
        { prop: "direction", type: '"horizontal" | "vertical"', defaultValue: "vertical", description: zh ? "Container 排布方向。" : "Container direction." },
        { prop: "span", type: "number", defaultValue: "12", description: zh ? "Col 占用的 12 栅格列数。" : "Col span in a 12-column grid." },
        { prop: "maxHeight", type: "number | string", defaultValue: "220", description: zh ? "Scrollbar 最大高度。" : "Maximum scrollbar height." }
      ]
    },
    {
      id: "form",
      group: labels.groups.form,
      title: zh ? "Form 表单" : "Form",
      description: zh ? "Form 与 FormField 提供标签、说明、校验错误和布局外壳。" : "Form and FormField provide labels, hints, errors, and layout shells.",
      preview: (
        <Form>
          <FormField label={zh ? "收件处" : "Recipient"} htmlFor="demo-recipient" required description={zh ? "用于路线分配。" : "Used for route assignment."}>
            <Input id="demo-recipient" placeholder={zh ? "苔藓桌" : "Moss desk"} />
          </FormField>
          <FormField label={zh ? "校验提示" : "Validation"} error={zh ? "请填写路线。" : "Route is required."}>
            <Input placeholder={zh ? "路线编号" : "Route code"} />
          </FormField>
        </Form>
      ),
      code: code([
        'import { Form, FormField, Input } from "pinepost-ui";',
        "",
        "<Form>",
        '  <FormField label="收件处" required description="用于路线分配。">',
        '    <Input placeholder="苔藓桌" />',
        "  </FormField>",
        "</Form>"
      ]),
      api: [
        { prop: "layout", type: '"vertical" | "horizontal" | "inline"', defaultValue: "vertical", description: zh ? "表单布局。" : "Form layout." },
        { prop: "description", type: "ReactNode", defaultValue: "-", description: zh ? "字段说明。" : "Field hint." },
        { prop: "error", type: "ReactNode", defaultValue: "-", description: zh ? "字段错误提示。" : "Field error." }
      ]
    },
    {
      id: "input-number",
      group: labels.groups.form,
      title: zh ? "InputNumber 数字输入" : "InputNumber",
      description: zh ? "带加减按钮的数字输入，适合数量、步进和库存字段。" : "Numeric input with stepper buttons for quantity and inventory fields.",
      preview: <InputNumber aria-label={zh ? "包裹数量" : "Parcel count"} defaultValue={3} min={0} max={12} />,
      code: code([
        'import { InputNumber } from "pinepost-ui";',
        "",
        '<InputNumber defaultValue={3} min={0} max={12} onValueChange={setCount} />'
      ]),
      api: [
        { prop: "value", type: "number", defaultValue: "-", description: zh ? "受控数值。" : "Controlled value." },
        { prop: "step", type: "number", defaultValue: "1", description: zh ? "每次增减步长。" : "Stepper size." },
        { prop: "onValueChange", type: "(value: number) => void", defaultValue: "-", description: zh ? "数值变化回调。" : "Value change callback." }
      ]
    },
    {
      id: "rate",
      group: labels.groups.form,
      title: zh ? "Rate 评分" : "Rate",
      description: zh ? "使用邮戳形态表达评分，不依赖外部图标资源。" : "A stamp-like rating control without external icon assets.",
      preview: <Rate label={zh ? "路线评分" : "Route rating"} value={rateValue} onValueChange={setRateValue} />,
      code: code([
        'import { Rate } from "pinepost-ui";',
        "",
        '<Rate value={4} onValueChange={setValue} />'
      ]),
      api: [
        { prop: "count", type: "number", defaultValue: "5", description: zh ? "评分项数量。" : "Number of rating items." },
        { prop: "value", type: "number", defaultValue: "0", description: zh ? "当前评分。" : "Current rating." },
        { prop: "onValueChange", type: "(value: number) => void", defaultValue: "-", description: zh ? "评分变化回调。" : "Rating callback." }
      ]
    },
    {
      id: "upload",
      group: labels.groups.form,
      title: zh ? "Upload 上传" : "Upload",
      description: zh ? "轻量文件选择区域，适合清单、图片和附件入口。" : "A lightweight file picker surface for manifests, images, and attachments.",
      preview: <Upload label={zh ? "上传路线清单" : "Upload route manifest"} description={zh ? "支持业务侧自行校验类型和大小。" : "Let product code validate type and size."} />,
      code: code([
        'import { Upload } from "pinepost-ui";',
        "",
        '<Upload label="上传路线清单" onFilesChange={(files) => console.log(files)} />'
      ]),
      api: [
        { prop: "label", type: "ReactNode", defaultValue: "Choose file", description: zh ? "上传区域标题。" : "Upload title." },
        { prop: "description", type: "ReactNode", defaultValue: "-", description: zh ? "上传说明。" : "Upload hint." },
        { prop: "onFilesChange", type: "(files: File[]) => void", defaultValue: "-", description: zh ? "文件变化回调。" : "File change callback." }
      ]
    },
    {
      id: "cascader",
      group: labels.groups.form,
      title: zh ? "Cascader 级联选择" : "Cascader",
      description: zh ? "多层路线选择器，支持筛选、清空、展开事件和方法调用。" : "Layered route selection with filtering, clear action, expand events, and methods.",
      preview: (
        <Cascader
          clearable
          filterable
          onValueChange={(value) => setCascaderValue(value)}
          options={routeOptions}
          value={cascaderValue}
        />
      ),
      code: code([
        'import { Cascader } from "pinepost-ui";',
        "",
        "<Cascader",
        "  clearable",
        "  filterable",
        "  options={routeOptions}",
        "  value={value}",
        "  onValueChange={setValue}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "options", type: "CascaderOption[]", defaultValue: "[]", description: zh ? "级联节点。" : "Cascading nodes." },
            { prop: "value", type: "string[]", defaultValue: "-", description: zh ? "受控路径值。" : "Controlled path value." },
            { prop: "filterable", type: "boolean", defaultValue: "false", description: zh ? "启用筛选输入。" : "Enables option filtering." },
            { prop: "showAllLevels", type: "boolean", defaultValue: "true", description: zh ? "显示完整路径或只显示末级。" : "Shows full path or only the leaf label." }
          ]
        },
        {
          title: labels.options,
          rows: [
            { prop: "CascaderOption", type: "{ value; label; children?; disabled? }", defaultValue: "-", description: zh ? "节点数据结构。" : "Node data shape." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value, selectedOptions) => void", defaultValue: "-", description: zh ? "选择完成时触发。" : "Fires when a path is selected." },
            { prop: "onExpandChange", type: "(value: string[]) => void", defaultValue: "-", description: zh ? "展开层级变化。" : "Expanded path changes." },
            { prop: "onVisibleChange", type: "(open: boolean) => void", defaultValue: "-", description: zh ? "面板显示状态变化。" : "Panel visibility changes." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "focus / blur / clear", type: "CascaderRef", defaultValue: "-", description: zh ? "聚焦、失焦和清空。" : "Focus, blur, and clear." }
          ]
        }
      ]
    },
    {
      id: "tree-select",
      group: labels.groups.form,
      title: zh ? "TreeSelect 树形选择" : "TreeSelect",
      description: zh ? "树结构选择器，支持单选、多选、筛选、清空和节点点击事件。" : "Tree selector with single or multiple selection, filtering, clear action, and node events.",
      preview: (
        <TreeSelect
          clearable
          data={routeOptions}
          defaultExpanded={["north"]}
          filterable
          onValueChange={setTreeSelectValue}
          value={treeSelectValue}
        />
      ),
      code: code([
        'import { TreeSelect } from "pinepost-ui";',
        "",
        "<TreeSelect",
        "  clearable",
        "  filterable",
        "  data={routeOptions}",
        "  value={value}",
        "  onValueChange={setValue}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "data", type: "TreeSelectOption[]", defaultValue: "[]", description: zh ? "树节点。" : "Tree nodes." },
            { prop: "multiple", type: "boolean", defaultValue: "false", description: zh ? "启用多选。" : "Enables multiple selection." },
            { prop: "defaultExpanded", type: "string[]", defaultValue: "[]", description: zh ? "默认展开节点。" : "Initially expanded nodes." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value) => void", defaultValue: "-", description: zh ? "值变化。" : "Value changes." },
            { prop: "onNodeClick", type: "(node) => void", defaultValue: "-", description: zh ? "节点点击。" : "Node click." },
            { prop: "onVisibleChange", type: "(open) => void", defaultValue: "-", description: zh ? "面板显示变化。" : "Panel visibility changes." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "focus / blur / clear", type: "TreeSelectRef", defaultValue: "-", description: zh ? "聚焦、失焦和清空。" : "Focus, blur, and clear." }
          ]
        }
      ]
    },
    {
      id: "virtualized-select",
      group: labels.groups.form,
      title: zh ? "VirtualizedSelect 虚拟选择器" : "VirtualizedSelect",
      description: zh ? "用于大量选项的选择器，只渲染当前视窗附近的条目。" : "Select for large option sets, rendering only the visible window.",
      preview: (
        <VirtualizedSelect
          clearable
          filterable
          onValueChange={setVirtualSelectValue}
          options={virtualOptions}
          value={virtualSelectValue}
        />
      ),
      code: code([
        'import { VirtualizedSelect } from "pinepost-ui";',
        "",
        "<VirtualizedSelect",
        "  height={220}",
        "  itemHeight={38}",
        "  options={largeOptions}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "options", type: "Array<{ value; label; disabled? }>", defaultValue: "[]", description: zh ? "大量选项。" : "Large option list." },
            { prop: "height", type: "number", defaultValue: "220", description: zh ? "滚动面板高度。" : "List viewport height." },
            { prop: "itemHeight", type: "number", defaultValue: "38", description: zh ? "单项高度。" : "Option row height." },
            { prop: "filterable", type: "boolean", defaultValue: "false", description: zh ? "启用筛选。" : "Enables filtering." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "选择变化。" : "Selection changes." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "focus / blur / clear", type: "CascaderRef", defaultValue: "-", description: zh ? "聚焦、失焦和清空。" : "Focus, blur, and clear." }
          ]
        }
      ]
    },
    {
      id: "transfer",
      group: labels.groups.form,
      title: zh ? "Transfer 穿梭框" : "Transfer",
      description: zh ? "左右列表穿梭，支持筛选、默认选中、移动事件和命令式移动方法。" : "Dual-list transfer with filtering, checked state, move events, and imperative methods.",
      preview: (
        <Transfer
          data={transferData}
          filterable
          onChange={setTransferValue}
          titles={[zh ? "待处理" : "Inbox", zh ? "已打包" : "Packed"]}
          value={transferValue}
        />
      ),
      code: code([
        'import { Transfer } from "pinepost-ui";',
        "",
        "<Transfer",
        "  filterable",
        "  data={items}",
        "  value={value}",
        "  onChange={setValue}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "data", type: "TransferDataItem[]", defaultValue: "[]", description: zh ? "全部可穿梭项。" : "All transferable items." },
            { prop: "value", type: "string[]", defaultValue: "[]", description: zh ? "右侧目标 key。" : "Target-side keys." },
            { prop: "titles", type: "[ReactNode, ReactNode]", defaultValue: "Source / Target", description: zh ? "左右列表标题。" : "Source and target titles." },
            { prop: "filterable", type: "boolean", defaultValue: "false", description: zh ? "启用列表筛选。" : "Enables list filtering." }
          ]
        },
        {
          title: labels.options,
          rows: [
            { prop: "TransferDataItem", type: "{ key; label; disabled?; description? }", defaultValue: "-", description: zh ? "穿梭项数据结构。" : "Transfer item shape." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onChange", type: "(value, direction, movedKeys) => void", defaultValue: "-", description: zh ? "移动后触发。" : "Fires after moving items." },
            { prop: "onLeftCheckChange / onRightCheckChange", type: "(keys: string[]) => void", defaultValue: "-", description: zh ? "左右勾选变化。" : "Checked keys change." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "clearChecked", type: "() => void", defaultValue: "-", description: zh ? "清空勾选。" : "Clears checked items." },
            { prop: "moveToTarget / moveToSource", type: "(keys?: string[]) => void", defaultValue: "-", description: zh ? "命令式移动。" : "Moves items imperatively." }
          ]
        }
      ]
    },
    {
      id: "input-tag",
      group: labels.groups.form,
      title: zh ? "InputTag 标签输入" : "InputTag",
      description: zh ? "输入并管理标签，支持回车创建、退格删除、清空和最大数量。" : "Create and manage tags with Enter, Backspace, clear action, and max count.",
      preview: <InputTag clearable max={5} onValueChange={setInputTags} value={inputTags} />,
      code: code([
        'import { InputTag } from "pinepost-ui";',
        "",
        '<InputTag value={tags} onValueChange={setTags} max={5} clearable />'
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "value", type: "string[]", defaultValue: "-", description: zh ? "受控标签。" : "Controlled tags." },
            { prop: "max", type: "number", defaultValue: "-", description: zh ? "最大标签数。" : "Maximum tag count." },
            { prop: "clearable", type: "boolean", defaultValue: "false", description: zh ? "显示清空按钮。" : "Shows clear button." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value: string[]) => void", defaultValue: "-", description: zh ? "标签变化。" : "Tag changes." }
          ]
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "Enter", type: "keyboard", defaultValue: "-", description: zh ? "创建当前标签。" : "Creates the current tag." },
            { prop: "Backspace", type: "keyboard", defaultValue: "-", description: zh ? "输入为空时删除末尾标签。" : "Removes the last tag when input is empty." }
          ]
        }
      ]
    },
    {
      id: "input-otp",
      group: labels.groups.form,
      title: zh ? "InputOTP 验证码输入" : "InputOTP",
      description: zh ? "固定长度验证码输入，支持完成事件和掩码显示。" : "Fixed-length verification input with completion event and masking.",
      preview: <InputOTP length={4} onValueChange={setOtpValue} value={otpValue} />,
      code: code([
        'import { InputOTP } from "pinepost-ui";',
        "",
        '<InputOTP length={4} value={code} onValueChange={setCode} onComplete={verify} />'
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "length", type: "number", defaultValue: "6", description: zh ? "输入长度。" : "Code length." },
            { prop: "value", type: "string", defaultValue: "-", description: zh ? "受控值。" : "Controlled value." },
            { prop: "mask", type: "boolean", defaultValue: "false", description: zh ? "隐藏输入内容。" : "Masks characters." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "输入变化。" : "Input changes." },
            { prop: "onComplete", type: "(value: string) => void", defaultValue: "-", description: zh ? "达到长度时触发。" : "Fires when all digits are filled." }
          ]
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "Backspace", type: "keyboard", defaultValue: "-", description: zh ? "空位时回到前一格。" : "Moves to the previous box when empty." }
          ]
        }
      ]
    },
    {
      id: "mention",
      group: labels.groups.form,
      title: zh ? "Mention 提及" : "Mention",
      description: zh ? "文本域内触发建议列表，支持前缀、搜索事件和选择事件。" : "Textarea mention suggestions with prefixes, search event, and select event.",
      preview: (
        <Mention
          aria-label={zh ? "路线提及" : "Route mention"}
          onChange={setMentionValue}
          options={[
            { value: "cedar", label: zh ? "雪松桌" : "Cedar desk" },
            { value: "moss", label: zh ? "苔藓桌" : "Moss desk" }
          ]}
          value={mentionValue}
        />
      ),
      code: code([
        'import { Mention } from "pinepost-ui";',
        "",
        "<Mention",
        "  prefix=\"@\"",
        "  options={[{ value: 'cedar', label: '雪松桌' }]}",
        "  onSelect={(option) => console.log(option)}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "options", type: "MentionOption[]", defaultValue: "[]", description: zh ? "建议项。" : "Suggestion options." },
            { prop: "prefix", type: "string | string[]", defaultValue: "@", description: zh ? "触发前缀。" : "Trigger prefixes." },
            { prop: "value", type: "string", defaultValue: "-", description: zh ? "受控文本。" : "Controlled text." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onSearch", type: "(pattern, prefix) => void", defaultValue: "-", description: zh ? "搜索词变化。" : "Search pattern changes." },
            { prop: "onSelect", type: "(option, prefix) => void", defaultValue: "-", description: zh ? "选择建议项。" : "Suggestion selected." }
          ]
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "@", type: "text trigger", defaultValue: "-", description: zh ? "打开提及建议。" : "Opens mention suggestions." }
          ]
        }
      ]
    },
    {
      id: "time-select",
      group: labels.groups.form,
      title: zh ? "TimeSelect 时间选择" : "TimeSelect",
      description: zh ? "按起止时间和步长生成可选时间点。" : "Generates selectable time points from start, end, and step.",
      preview: <TimeSelect aria-label={zh ? "配送时间" : "Delivery time"} onValueChange={setTimeSelectValue} value={timeSelectValue} />,
      code: code([
        'import { TimeSelect } from "pinepost-ui";',
        "",
        '<TimeSelect start="09:00" end="18:00" step="00:30" value={time} onValueChange={setTime} />'
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "start / end", type: "HH:mm", defaultValue: "09:00 / 18:00", description: zh ? "时间范围。" : "Time range." },
            { prop: "step", type: "HH:mm", defaultValue: "00:30", description: zh ? "时间步长。" : "Time step." },
            { prop: "value", type: "string", defaultValue: "-", description: zh ? "受控时间。" : "Controlled time." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "时间变化。" : "Time changes." }
          ]
        }
      ]
    },
    {
      id: "table",
      group: labels.groups.display,
      title: zh ? "Table 表格" : "Table",
      description: zh ? "基础数据表格，支持列定义、空态和自定义单元格渲染。" : "Basic data table with columns, empty state, and custom cell rendering.",
      preview: (
        <Table
          columns={[
            { key: "route", title: zh ? "路线" : "Route" },
            { key: "status", title: zh ? "状态" : "Status" },
            { key: "count", title: zh ? "数量" : "Count", align: "right" }
          ]}
          data={[{ route: "A7", status: zh ? "就绪" : "Ready", count: 8 }, { route: "B2", status: zh ? "复核" : "Review", count: 3 }]}
        />
      ),
      code: code([
        'import { Table } from "pinepost-ui";',
        "",
        "<Table",
        "  columns={[",
        '    { key: "route", title: "路线" },',
        '    { key: "status", title: "状态" }',
        "  ]}",
        '  data={[{ route: "A7", status: "就绪" }]}',
        "/>"
      ]),
      api: [
        { prop: "columns", type: "TableColumn<T>[]", defaultValue: "[]", description: zh ? "列配置。" : "Column config." },
        { prop: "data", type: "T[]", defaultValue: "[]", description: zh ? "表格数据。" : "Table data." },
        { prop: "rowKey", type: "keyof T | function", defaultValue: "index", description: zh ? "行 key。" : "Row key." }
      ]
    },
    {
      id: "calendar",
      group: labels.groups.display,
      title: zh ? "Calendar 日历" : "Calendar",
      description: zh ? "月视图日历，可自定义周起始和日期渲染。" : "Month calendar with configurable week start and day rendering.",
      preview: <Calendar month={new Date(2026, 4, 1)} selectedDate={new Date(2026, 4, 17)} />,
      code: code([
        'import { Calendar } from "pinepost-ui";',
        "",
        "<Calendar month={new Date(2026, 4, 1)} selectedDate={new Date(2026, 4, 17)} />"
      ]),
      api: [
        { prop: "month", type: "Date", defaultValue: "new Date()", description: zh ? "展示月份。" : "Displayed month." },
        { prop: "selectedDate", type: "Date", defaultValue: "-", description: zh ? "高亮日期。" : "Highlighted date." },
        { prop: "renderDay", type: "(date: Date) => ReactNode", defaultValue: "-", description: zh ? "自定义日期内容。" : "Custom day content." }
      ]
    },
    {
      id: "image",
      group: labels.groups.display,
      title: zh ? "Image 图片" : "Image",
      description: zh ? "带边框、比例和说明文字的图片容器。" : "Image frame with aspect ratio and caption support.",
      preview: (
        <Image
          alt={zh ? "纸张纹理预览" : "Paper texture preview"}
          caption={zh ? "可用于产品截图或素材预览。" : "Useful for screenshots and asset previews."}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23fff8ea'/%3E%3Cpath d='M0 250c120-60 210-10 320-60s210-30 320-90v260H0z' fill='%23d8e3b5'/%3E%3Ccircle cx='470' cy='115' r='58' fill='%2387b9c9'/%3E%3C/svg%3E"
        />
      ),
      code: code([
        'import { Image } from "pinepost-ui";',
        "",
        '<Image alt="预览" src="/preview.png" caption="素材预览" />'
      ]),
      api: [
        { prop: "fit", type: '"cover" | "contain"', defaultValue: "cover", description: zh ? "图片填充方式。" : "Object fit." },
        { prop: "caption", type: "ReactNode", defaultValue: "-", description: zh ? "图片说明。" : "Image caption." },
        { prop: "alt", type: "string", defaultValue: "-", description: zh ? "无障碍替代文本。" : "Accessible alternative text." }
      ]
    },
    {
      id: "carousel",
      group: labels.groups.display,
      title: zh ? "Carousel 走马灯" : "Carousel",
      description: zh ? "受控回调友好的轮播容器，适合公告、活动和引导卡片。" : "Carousel for notices, campaigns, and onboarding cards.",
      preview: (
        <Carousel
          items={[
            { id: "morning", content: <strong>{zh ? "晨间路线准备完成" : "Morning route is ready"}</strong> },
            { id: "evening", content: <strong>{zh ? "黄昏路线等待复核" : "Evening route needs review"}</strong> }
          ]}
        />
      ),
      code: code([
        'import { Carousel } from "pinepost-ui";',
        "",
        "<Carousel",
        "  items={[",
        '    { id: "a", content: <strong>晨间路线准备完成</strong> }',
        "  ]}",
        "/>"
      ]),
      api: [
        { prop: "items", type: "CarouselItem[]", defaultValue: "[]", description: zh ? "轮播项。" : "Slides." },
        { prop: "defaultIndex", type: "number", defaultValue: "0", description: zh ? "初始索引。" : "Initial index." },
        { prop: "onIndexChange", type: "(index: number) => void", defaultValue: "-", description: zh ? "切换回调。" : "Slide callback." }
      ]
    },
    {
      id: "tree",
      group: labels.groups.display,
      title: zh ? "Tree 树形控件" : "Tree",
      description: zh ? "用于路线、目录和分组层级的轻量树控件。" : "A lightweight tree for routes, folders, and grouped hierarchy.",
      preview: (
        <Tree
          defaultExpanded={["routes"]}
          items={[{ value: "routes", label: zh ? "路线" : "Routes", children: [{ value: "north", label: zh ? "北线" : "North lane" }, { value: "south", label: zh ? "南线" : "South lane" }] }]}
        />
      ),
      code: code([
        'import { Tree } from "pinepost-ui";',
        "",
        "<Tree",
        '  defaultExpanded={["routes"]}',
        "  items={[{ value: 'routes', label: '路线', children: [{ value: 'north', label: '北线' }] }]}",
        "/>"
      ]),
      api: [
        { prop: "items", type: "TreeItem[]", defaultValue: "[]", description: zh ? "树节点。" : "Tree nodes." },
        { prop: "defaultExpanded", type: "string[]", defaultValue: "[]", description: zh ? "默认展开节点。" : "Initially expanded nodes." },
        { prop: "onSelect", type: "(value: string) => void", defaultValue: "-", description: zh ? "叶子节点选择回调。" : "Leaf selection callback." }
      ]
    },
    {
      id: "virtualized-table",
      group: labels.groups.display,
      title: zh ? "VirtualizedTable 虚拟表格" : "VirtualizedTable",
      description: zh ? "面向大量行数据的表格，只渲染滚动窗口内的行。" : "A table for large row sets that renders only the visible window.",
      preview: (
        <VirtualizedTable
          columns={[
            { key: "route", title: zh ? "路线" : "Route" },
            { key: "status", title: zh ? "状态" : "Status" },
            { key: "count", title: zh ? "数量" : "Count", align: "right" }
          ]}
          data={virtualRows}
          height={220}
        />
      ),
      code: code([
        'import { VirtualizedTable } from "pinepost-ui";',
        "",
        "<VirtualizedTable",
        "  height={260}",
        "  rowHeight={44}",
        "  columns={columns}",
        "  data={rows}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "columns", type: "TableColumn<T>[]", defaultValue: "[]", description: zh ? "列配置。" : "Column config." },
            { prop: "data", type: "T[]", defaultValue: "[]", description: zh ? "大量行数据。" : "Large row data." },
            { prop: "height", type: "number", defaultValue: "260", description: zh ? "滚动区域高度。" : "Scroll viewport height." },
            { prop: "rowHeight", type: "number", defaultValue: "44", description: zh ? "行高。" : "Row height." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onRowClick", type: "(row, index) => void", defaultValue: "-", description: zh ? "点击行。" : "Row click." }
          ]
        }
      ]
    },
    {
      id: "virtualized-tree",
      group: labels.groups.display,
      title: zh ? "VirtualizedTree 虚拟树" : "VirtualizedTree",
      description: zh ? "面向大量节点的树控件，保持可展开和选择行为。" : "Tree for many nodes while preserving expand and select behavior.",
      preview: (
        <VirtualizedTree
          defaultExpanded={["north"]}
          height={220}
          items={virtualTreeItems}
          onSelect={setVirtualTreeSelected}
          selectedValue={virtualTreeSelected}
        />
      ),
      code: code([
        'import { VirtualizedTree } from "pinepost-ui";',
        "",
        "<VirtualizedTree",
        "  height={260}",
        "  itemHeight={38}",
        "  items={nodes}",
        "  onSelect={setValue}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "items", type: "VirtualTreeItem[]", defaultValue: "[]", description: zh ? "树节点。" : "Tree nodes." },
            { prop: "height", type: "number", defaultValue: "260", description: zh ? "滚动区域高度。" : "Scroll viewport height." },
            { prop: "itemHeight", type: "number", defaultValue: "38", description: zh ? "节点高度。" : "Node row height." },
            { prop: "selectedValue", type: "string", defaultValue: "-", description: zh ? "当前选中节点。" : "Selected node." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onSelect", type: "(value, item) => void", defaultValue: "-", description: zh ? "选择叶子节点。" : "Leaf selection." },
            { prop: "onExpandChange", type: "(expandedKeys) => void", defaultValue: "-", description: zh ? "展开集合变化。" : "Expanded keys change." }
          ]
        }
      ]
    },
    {
      id: "page-header",
      group: labels.groups.navigation,
      title: zh ? "PageHeader 页头" : "PageHeader",
      description: zh ? "页面级标题、返回按钮、说明和右侧操作区。" : "Page title with back action, description, and extra actions.",
      preview: <PageHeader title={zh ? "路线详情" : "Route detail"} description={zh ? "查看包裹、备注和状态。" : "View parcels, notes, and status."} onBack={showToast} extra={<Button size="sm">{zh ? "保存" : "Save"}</Button>} />,
      code: code([
        'import { Button, PageHeader } from "pinepost-ui";',
        "",
        '<PageHeader title="路线详情" onBack={goBack} extra={<Button>保存</Button>} />'
      ]),
      api: [
        { prop: "title", type: "ReactNode", defaultValue: "-", description: zh ? "页头标题。" : "Header title." },
        { prop: "description", type: "ReactNode", defaultValue: "-", description: zh ? "页头说明。" : "Header description." },
        { prop: "onBack", type: "() => void", defaultValue: "-", description: zh ? "返回回调。" : "Back callback." }
      ]
    },
    {
      id: "backtop",
      group: labels.groups.navigation,
      title: zh ? "Backtop 回到顶部" : "Backtop",
      description: zh ? "固定或普通按钮形态的回到顶部控件，可绑定滚动容器。" : "Back-to-top control for window or custom scroll containers.",
      preview: (
        <Space>
          <Backtop>{zh ? "顶部" : "Top"}</Backtop>
          <Affix offsetTop={0}>
            <Anchor items={[{ href: "#", label: zh ? "当前页" : "Current page" }]} />
          </Affix>
        </Space>
      ),
      code: code([
        'import { Affix, Anchor, Backtop } from "pinepost-ui";',
        "",
        '<Backtop visibilityHeight={240}>顶部</Backtop>',
        '<Affix offsetTop={12}><Anchor items={[{ href: "#api", label: "API" }]} /></Affix>'
      ]),
      api: [
        { prop: "visibilityHeight", type: "number", defaultValue: "0", description: zh ? "显示阈值。" : "Visibility threshold." },
        { prop: "target", type: "() => HTMLElement | Window", defaultValue: "window", description: zh ? "滚动目标。" : "Scroll target." },
        { prop: "offsetTop", type: "number", defaultValue: "0", description: zh ? "Affix 顶部距离。" : "Sticky top offset." }
      ]
    },
    {
      id: "loading",
      group: labels.groups.feedback,
      title: zh ? "Loading 加载" : "Loading",
      description: zh ? "加载状态容器，可作为块级占位或覆盖层。" : "Loading surface for block placeholders or overlays.",
      preview: <Loading label={zh ? "分拣中" : "Sorting"} overlay><div className="docs-watermark-card">{zh ? "路线内容" : "Route content"}</div></Loading>,
      code: code([
        'import { Loading } from "pinepost-ui";',
        "",
        '<Loading label="分拣中" overlay><Panel /></Loading>'
      ]),
      api: [
        { prop: "label", type: "string", defaultValue: "Loading", description: zh ? "加载文案和无障碍标签。" : "Loading text and accessible label." },
        { prop: "overlay", type: "boolean", defaultValue: "false", description: zh ? "是否显示覆盖层。" : "Show overlay." },
        { prop: "children", type: "ReactNode", defaultValue: "-", description: zh ? "被覆盖内容。" : "Covered content." }
      ]
    },
    {
      id: "message",
      group: labels.groups.feedback,
      title: zh ? "Message 消息提示" : "Message",
      description: zh ? "页面内轻提示，适合表单保存、状态反馈和短说明。" : "Inline feedback for saves, status changes, and short hints.",
      preview: <Message variant="success" title={zh ? "已保存路线" : "Route saved"} description={zh ? "草稿已经进入待发托盘。" : "The draft is in the outgoing tray."} />,
      code: code([
        'import { Message } from "pinepost-ui";',
        "",
        '<Message variant="success" title="已保存路线" description="草稿已经进入待发托盘。" />'
      ]),
      api: [
        { prop: "variant", type: '"info" | "success" | "warning" | "danger"', defaultValue: "info", description: zh ? "消息状态。" : "Message status." },
        { prop: "title", type: "ReactNode", defaultValue: "-", description: zh ? "消息标题。" : "Message title." },
        { prop: "description", type: "ReactNode", defaultValue: "-", description: zh ? "消息说明。" : "Message description." }
      ]
    },
    {
      id: "notification",
      group: labels.groups.feedback,
      title: zh ? "Notification 通知" : "Notification",
      description: zh ? "更强的通知卡片，适合带操作的异步结果。" : "A stronger notification card for async results with actions.",
      preview: <Notification title={zh ? "窗口桌提醒" : "Window desk notice"} description={zh ? "北线路线需要在黄昏前复核。" : "North route needs review before dusk."} action={<Button size="sm" variant="soft">{zh ? "查看" : "View"}</Button>} />,
      code: code([
        'import { Button, Notification } from "pinepost-ui";',
        "",
        '<Notification title="窗口桌提醒" action={<Button>查看</Button>} />'
      ]),
      api: [
        { prop: "variant", type: '"info" | "success" | "warning" | "danger"', defaultValue: "info", description: zh ? "通知状态。" : "Notification status." },
        { prop: "action", type: "ReactNode", defaultValue: "-", description: zh ? "通知操作区。" : "Notification action." },
        { prop: "description", type: "ReactNode", defaultValue: "-", description: zh ? "通知说明。" : "Notification description." }
      ]
    },
    {
      id: "message-box",
      group: labels.groups.feedback,
      title: zh ? "MessageBox 弹框" : "MessageBox",
      description: zh ? "基于确认对话框的命令式确认视觉，适合危险操作和流程确认。" : "A confirmation dialog surface for destructive or important flows.",
      preview: (
        <>
          <Button variant="stamp" onClick={() => setMessageBoxOpen(true)}>{zh ? "打开确认弹框" : "Open message box"}</Button>
          <MessageBox
            cancelText={zh ? "取消" : "Cancel"}
            confirmText={zh ? "确认" : "Confirm"}
            description={zh ? "便签会进入归档柜。" : "The note will move into storage."}
            onConfirm={showToast}
            onOpenChange={setMessageBoxOpen}
            open={messageBoxOpen}
            title={zh ? "归档这条路线？" : "Archive this route?"}
          />
        </>
      ),
      code: code([
        'import { Button, MessageBox } from "pinepost-ui";',
        "",
        "<MessageBox",
        "  open={open}",
        "  onOpenChange={setOpen}",
        '  title="归档这条路线？"',
        '  description="便签会进入归档柜。"',
        "/>"
      ]),
      api: [
        { prop: "open", type: "boolean", defaultValue: "-", description: zh ? "受控打开状态。" : "Controlled open state." },
        { prop: "title", type: "ReactNode", defaultValue: "-", description: zh ? "弹框标题。" : "Box title." },
        { prop: "onConfirm", type: "() => void", defaultValue: "-", description: zh ? "确认回调。" : "Confirm callback." }
      ]
    },
    {
      id: "tour",
      group: labels.groups.feedback,
      title: zh ? "Tour 漫游式引导" : "Tour",
      description: zh ? "分步骤引导用户理解页面，支持受控步骤、遮罩、关闭和完成事件。" : "Step-by-step guidance with controlled current step, mask, close event, and finish event.",
      preview: (
        <>
          <Button onClick={() => setTourOpen(true)}>{zh ? "开始引导" : "Start tour"}</Button>
          <Tour
            onFinish={showToast}
            onOpenChange={setTourOpen}
            open={tourOpen}
            steps={[
              { title: zh ? "选择路线" : "Choose route", description: zh ? "先在表单里选择需要处理的路线。" : "Start by selecting the route to process." },
              { title: zh ? "确认状态" : "Confirm status", description: zh ? "再确认它的分拣和盖章状态。" : "Then confirm sorting and stamp status." }
            ]}
          />
        </>
      ),
      code: code([
        'import { Button, Tour } from "pinepost-ui";',
        "",
        "<Tour",
        "  open={open}",
        "  onOpenChange={setOpen}",
        "  steps={[{ title: '选择路线', description: '先选择需要处理的路线。' }]}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "steps", type: "TourStep[]", defaultValue: "[]", description: zh ? "引导步骤。" : "Tour steps." },
            { prop: "open", type: "boolean", defaultValue: "-", description: zh ? "受控打开状态。" : "Controlled open state." },
            { prop: "current", type: "number", defaultValue: "-", description: zh ? "受控当前步骤。" : "Controlled current step." },
            { prop: "mask", type: "boolean", defaultValue: "true", description: zh ? "显示遮罩。" : "Shows mask." }
          ]
        },
        {
          title: labels.options,
          rows: [
            { prop: "TourStep", type: "{ title; description?; target?; placement? }", defaultValue: "-", description: zh ? "步骤结构。" : "Step data shape." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onCurrentChange", type: "(current: number) => void", defaultValue: "-", description: zh ? "步骤变化。" : "Step changes." },
            { prop: "onClose", type: "() => void", defaultValue: "-", description: zh ? "关闭引导。" : "Tour closes." },
            { prop: "onFinish", type: "() => void", defaultValue: "-", description: zh ? "完成引导。" : "Tour finishes." }
          ]
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "Previous / Next", type: "button", defaultValue: "-", description: zh ? "切换步骤。" : "Moves between steps." },
            { prop: "Finish", type: "button", defaultValue: "-", description: zh ? "完成并关闭。" : "Finishes and closes." }
          ]
        }
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
