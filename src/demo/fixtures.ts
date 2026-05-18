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
  ColorPickerPanel,
  DateRangePickerPanel,
  DateTimePickerPanel,
  DatePickerPanel,
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
  createPinepostDatePresets,
  createPinepostDateRangePresets,
  createPinepostRecipeBundle,
  createPinepostTimeRangePresets,
  formatPinepostDateRange,
  formatPinepostTimeRange,
  Header,
  Icon,
  Image,
  InfiniteScroll,
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
  createPinepostThemeClassName,
  createPinepostThemeCollectionExport,
  createPinepostThemeCss,
  createPinepostThemeExport,
  createTableViewPresetExport,
  mergePinepostThemeTokens,
  parsePinepostThemeCollectionExport,
  parsePinepostThemeExport,
  parsePinepostRecipeBundle,
  pinepostThemePresets,
  stringifyPinepostRecipeBundle,
  stringifyPinepostThemeCollectionExport,
  stringifyPinepostThemeExport,
  stringifyTableViewPresetExport,
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
  TableColumnSettings,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  Textarea,
  TimePicker,
  TimePickerPanel,
  TimeRangePickerPanel,
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
  validatePinepostThemeTokens,
  type PinepostLocale,
  type PinepostTheme,
  type PinepostThemeCollectionItem,
  type PinepostThemeTokenName,
  type PinepostThemeTokens,
  type PinepostThemeValidationIssue,
  type PinepostRecipeBundleValidationIssue,
  type CascaderMultipleValue,
  type CascaderRef,
  type FormRef,
  type SelectRef,
  type TableColumnSettingsValue,
  type TableRef,
  type TreeRef,
  type TreeSelectRef,
  type UploadRef
} from "./pinepost";

export const themeOrder: PinepostTheme[] = ["calm", "play", "shop"];
export const localeOrder: PinepostLocale[] = ["zh-CN", "en"];
export const editableThemeTokens: Array<{
  helper: { en: string; zh: string };
  label: { en: string; zh: string };
  name: PinepostThemeTokenName;
  type: "color" | "radius";
}> = [
  { name: "--pinepost-paper", type: "color", label: { zh: "纸张底色", en: "Paper" }, helper: { zh: "页面背景与大面积纸张。", en: "Page backgrounds and paper surfaces." } },
  { name: "--pinepost-paper-raised", type: "color", label: { zh: "浮起纸面", en: "Raised paper" }, helper: { zh: "卡片、面板和预览层。", en: "Cards, panels, and raised previews." } },
  { name: "--pinepost-ink", type: "color", label: { zh: "墨色", en: "Ink" }, helper: { zh: "标题与正文主色。", en: "Main text and headings." } },
  { name: "--pinepost-leaf", type: "color", label: { zh: "叶色", en: "Leaf" }, helper: { zh: "主按钮与确认动作。", en: "Primary actions and confirmations." } },
  { name: "--pinepost-stamp", type: "color", label: { zh: "邮戳", en: "Stamp" }, helper: { zh: "强调、危险和重点标记。", en: "Emphasis, danger, and marked states." } },
  { name: "--pinepost-parcel", type: "color", label: { zh: "包裹", en: "Parcel" }, helper: { zh: "促销、包装和暖色操作。", en: "Warm actions, packing, and commerce states." } },
  { name: "--pinepost-sky", type: "color", label: { zh: "天空", en: "Sky" }, helper: { zh: "信息提示与轻量标签。", en: "Info accents and lightweight tags." } },
  { name: "--pinepost-radius-md", type: "radius", label: { zh: "圆角", en: "Radius" }, helper: { zh: "按钮、卡片和浮层的基础圆角。", en: "Base radius for buttons, cards, and overlays." } }
];

export const themePreviewRows = [
  { route: "North gate", count: 12, status: "Ready" },
  { route: "Cedar desk", count: 7, status: "Review" }
];

export function themeTokensToStyle(tokens: PinepostThemeTokens) {
  return tokens as React.CSSProperties;
}

export function describeThemeIssue(issue: PinepostThemeValidationIssue, zh: boolean) {
  const tokenPrefix = issue.token ? `${issue.token}: ` : "";
  const messages: Record<PinepostThemeValidationIssue["code"], { en: string; zh: string }> = {
    "invalid-color": { zh: "需要 6 位十六进制颜色。", en: "Expected a six-digit hex color." },
    "invalid-json": { zh: "需要有效的 JSON。", en: "Expected valid JSON." },
    "invalid-radius": { zh: "圆角需要是 0px 到 32px 之间的 px 值。", en: "Expected a px radius between 0px and 32px." },
    "invalid-theme": { zh: "基础主题不存在，已使用默认主题。", en: "Base theme was unknown, so the default theme was used." },
    "unknown-token": { zh: "不是 Pinepost 主题 token。", en: "This is not a Pinepost theme token." }
  };

  return `${tokenPrefix}${zh ? messages[issue.code].zh : messages[issue.code].en}`;
}

export function describeBundleIssue(issue: PinepostRecipeBundleValidationIssue, zh: boolean) {
  const messages: Record<PinepostRecipeBundleValidationIssue["code"], { en: string; zh: string }> = {
    "invalid-bundle": { zh: "配方包需要有效名称、ID 和模板引用。", en: "Bundle needs a valid name, id, and recipe references." },
    "invalid-color": { zh: "主题颜色配置有无效值。", en: "Theme color configuration has an invalid value." },
    "invalid-json": { zh: "需要有效的 JSON。", en: "Expected valid JSON." },
    "invalid-schedule": { zh: "排期配置包含无法识别的预设。", en: "Schedule config contains an unknown preset." },
    "invalid-table-preset": { zh: "表格视图预设配置无法导入。", en: "Table view preset config could not be imported." },
    "invalid-theme": { zh: "主题集合配置无法导入。", en: "Theme collection config could not be imported." }
  };

  return zh ? messages[issue.code].zh : messages[issue.code].en;
}

export function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
