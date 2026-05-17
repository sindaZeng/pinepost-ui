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
  type TableColumnSettingsValue
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

type DocRecipe = {
  code: string;
  description?: string;
  preview?: React.ReactNode;
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
  recipes?: DocRecipe[];
  searchText?: string;
  title: string;
};

type NavGroup = {
  items: Array<{ id: string; label: string; searchText?: string }>;
  title: string;
};

type GuidePanelId = "install" | "recipes" | "theme" | "theme-studio";

const themeOrder: PinepostTheme[] = ["calm", "play", "shop"];
const localeOrder: PinepostLocale[] = ["zh-CN", "en"];
const editableThemeTokens: Array<{
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

const themePreviewRows = [
  { route: "North gate", count: 12, status: "Ready" },
  { route: "Cedar desk", count: 7, status: "Review" }
];

function themeTokensToStyle(tokens: PinepostThemeTokens) {
  return tokens as React.CSSProperties;
}

function describeThemeIssue(issue: PinepostThemeValidationIssue, zh: boolean) {
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

function describeBundleIssue(issue: PinepostRecipeBundleValidationIssue, zh: boolean) {
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

function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

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
    recipes: "业务配方",
    copy: "复制",
    copied: "已复制",
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
    recipes: "Recipes",
    copy: "Copy",
    copied: "Copied",
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

function CodeBlock({ codeText, label, labels }: { codeText: string; label: string; labels: (typeof copy)["zh-CN"] }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard?.writeText(codeText);
    } catch {
      // The visual copied state still confirms the requested code block.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="docs-code">
      <div className="docs-code__label">
        <span>{label}</span>
        <button type="button" onClick={handleCopy}>
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      <pre>
        <code>{codeText}</code>
      </pre>
    </div>
  );
}

function ApiTable({ item, labels }: { item: DocItem; labels: (typeof copy)["zh-CN"] }) {
  const sections = item.apiSections ?? [{ rows: item.api, title: labels.attributes }];

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
        <CodeBlock codeText={item.code} label={labels.usage} labels={labels} />
      </div>
      {item.recipes && item.recipes.length > 0 && (
        <div className="docs-recipes" aria-label={`${item.title} ${labels.recipes}`}>
          <h3>{labels.recipes}</h3>
          {item.recipes.map((recipe) => (
            <div className="docs-recipe" key={recipe.title}>
              <div className="docs-recipe__head">
                <strong>{recipe.title}</strong>
                {recipe.description && <p>{recipe.description}</p>}
              </div>
              {recipe.preview && <div className="docs-preview-surface">{recipe.preview}</div>}
              <CodeBlock codeText={recipe.code} label={recipe.title} labels={labels} />
            </div>
          ))}
        </div>
      )}
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

function colorInputValue(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : "#000000";
}

function radiusInputValue(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 8;
}

function ThemeStudioPanel({ labels, theme, zh }: { labels: (typeof copy)["zh-CN"]; theme: PinepostTheme; zh: boolean }) {
  const [preset, setPreset] = React.useState<PinepostTheme>(theme);
  const [overrides, setOverrides] = React.useState<Partial<PinepostThemeTokens>>({});
  const [themeName, setThemeName] = React.useState("Pinepost workspace");
  const [importText, setImportText] = React.useState("");
  const [importMessage, setImportMessage] = React.useState("");
  const [collectionThemes, setCollectionThemes] = React.useState<PinepostThemeCollectionItem[]>(() => [
    { baseTheme: theme, id: "workspace", name: "Pinepost workspace", tokens: {}, version: 1 }
  ]);
  const [activeThemeId, setActiveThemeId] = React.useState("workspace");
  const [collectionImportText, setCollectionImportText] = React.useState("");
  const [collectionMessage, setCollectionMessage] = React.useState("");
  const tokens = React.useMemo(() => mergePinepostThemeTokens(preset, overrides), [overrides, preset]);
  const tokenIssues = React.useMemo(() => validatePinepostThemeTokens(tokens), [tokens]);
  const themeExport = React.useMemo(() => createPinepostThemeExport({ baseTheme: preset, name: themeName, tokens }), [preset, themeName, tokens]);
  const jsonText = React.useMemo(() => stringifyPinepostThemeExport(themeExport), [themeExport]);
  const collectionExport = React.useMemo(
    () =>
      createPinepostThemeCollectionExport({
        activeId: activeThemeId,
        name: "Pinepost theme collection",
        themes: collectionThemes.map((item) => ({
          baseTheme: item.baseTheme,
          id: item.id,
          name: item.name,
          tokens: item.tokens
        }))
      }),
    [activeThemeId, collectionThemes]
  );
  const collectionJsonText = React.useMemo(() => stringifyPinepostThemeCollectionExport(collectionExport), [collectionExport]);
  const themeClassName = React.useMemo(() => createPinepostThemeClassName(themeName), [themeName]);
  const cssText = React.useMemo(() => createPinepostThemeCss({ selector: ".pinepost-workspace", tokens }), [tokens]);

  React.useEffect(() => {
    setPreset(theme);
    setOverrides({});
    setImportMessage("");
  }, [theme]);

  function setToken(name: PinepostThemeTokenName, value: string) {
    setOverrides((current) => ({ ...current, [name]: value }));
  }

  function selectPreset(value: string) {
    setPreset(value as PinepostTheme);
    setOverrides({});
  }

  function importTheme() {
    if (!importText.trim()) {
      setImportMessage(zh ? "请先粘贴主题 JSON。" : "Paste theme JSON first.");
      return;
    }

    const result = parsePinepostThemeExport(importText, preset);
    if (!result.value) {
      setImportMessage(result.issues.map((issue) => describeThemeIssue(issue, zh)).join(" "));
      return;
    }

    setPreset(result.value.baseTheme);
    setOverrides(result.value.tokens);
    setThemeName(result.value.name ?? "Imported Pinepost theme");
    setImportMessage(
      result.issues.length > 0
        ? result.issues.map((issue) => describeThemeIssue(issue, zh)).join(" ")
        : zh
          ? "主题已导入。"
          : "Theme imported."
    );
  }

  function collectionItemFromCurrent(id = activeThemeId, name = themeName): PinepostThemeCollectionItem {
    const value = createPinepostThemeCollectionExport({
      activeId: id,
      themes: [{ baseTheme: preset, id, name, tokens }]
    });
    return value.themes[0];
  }

  function loadCollectionTheme(item: PinepostThemeCollectionItem) {
    setActiveThemeId(item.id);
    setPreset(item.baseTheme);
    setOverrides(item.tokens);
    setThemeName(item.name);
    setCollectionMessage("");
  }

  function saveCurrentThemeToCollection() {
    const item = collectionItemFromCurrent();
    setCollectionThemes((current) => {
      const exists = current.some((themeItem) => themeItem.id === item.id);
      return exists ? current.map((themeItem) => themeItem.id === item.id ? item : themeItem) : [...current, item];
    });
    setActiveThemeId(item.id);
    setCollectionMessage(zh ? "已保存到主题集合。" : "Saved to theme collection.");
  }

  function nextCollectionId(seed: string) {
    const ids = new Set(collectionThemes.map((item) => item.id));
    let index = 1;
    let next = `${seed}-${index}`;
    while (ids.has(next)) {
      index += 1;
      next = `${seed}-${index}`;
    }
    return next;
  }

  function duplicateCollectionTheme() {
    const copyName = zh ? `${themeName} 副本` : `${themeName} Copy`;
    const copyId = nextCollectionId(`${activeThemeId || "theme"}-copy`);
    const item = collectionItemFromCurrent(copyId, copyName);
    setCollectionThemes((current) => [...current, item]);
    setActiveThemeId(item.id);
    setThemeName(item.name);
    setCollectionMessage(zh ? "主题副本已创建。" : "Theme copy created.");
  }

  function removeCollectionTheme() {
    if (collectionThemes.length <= 1) {
      setCollectionMessage(zh ? "至少保留一个主题。" : "Keep at least one theme.");
      return;
    }

    const nextThemes = collectionThemes.filter((item) => item.id !== activeThemeId);
    const nextTheme = nextThemes[0];
    setCollectionThemes(nextThemes);
    if (nextTheme) loadCollectionTheme(nextTheme);
    setCollectionMessage(zh ? "主题已移除。" : "Theme removed.");
  }

  function importCollection() {
    if (!collectionImportText.trim()) {
      setCollectionMessage(zh ? "请先粘贴主题集合 JSON。" : "Paste theme collection JSON first.");
      return;
    }

    const result = parsePinepostThemeCollectionExport(collectionImportText, preset);
    if (!result.value || result.value.themes.length === 0) {
      setCollectionMessage(result.issues.map((issue) => describeThemeIssue(issue, zh)).join(" "));
      return;
    }

    setCollectionThemes(result.value.themes);
    const nextTheme = result.value.themes.find((item) => item.id === result.value?.activeId) ?? result.value.themes[0];
    loadCollectionTheme(nextTheme);
    setCollectionMessage(
      result.issues.length > 0
        ? result.issues.map((issue) => describeThemeIssue(issue, zh)).join(" ")
        : zh
          ? "主题集合已导入。"
          : "Theme collection imported."
    );
  }

  return (
    <section className="docs-section docs-section--guide docs-theme-studio">
      <div className="docs-section__head">
        <span>{labels.groups.guide}</span>
        <h2>{zh ? "Theme Studio 主题工作台" : "Theme Studio"}</h2>
        <p>
          {zh
            ? "从预设出发微调核心 token，实时查看组件效果，并复制可直接放进项目的 CSS 变量。"
            : "Start from a preset, tune the core tokens, preview real components, and copy the CSS variables into your product."}
        </p>
      </div>

      <div className="docs-theme-studio__layout">
        <div className="docs-theme-studio__controls">
          <div className="docs-theme-studio__preset">
            <span>{zh ? "起始预设" : "Preset"}</span>
            <label className="docs-theme-studio__name">
              <span>{zh ? "主题名称" : "Theme name"}</span>
              <Input value={themeName} onChange={(event) => setThemeName(event.target.value)} />
            </label>
            <Segmented
              value={preset}
              onValueChange={selectPreset}
              options={themeOrder.map((item) => ({ value: item, label: labels.themes[item] }))}
            />
            <Button size="sm" variant="soft" onClick={() => setOverrides({})}>
              {zh ? "还原预设" : "Reset preset"}
            </Button>
            <div className="docs-theme-studio__actions">
              <Button size="sm" variant="parcel" onClick={() => downloadTextFile(`${themeClassName}.css`, cssText)}>
                {zh ? "下载 CSS" : "Download CSS"}
              </Button>
              <Button size="sm" variant="soft" onClick={() => downloadTextFile(`${themeClassName}.json`, jsonText)}>
                {zh ? "下载 JSON" : "Download JSON"}
              </Button>
            </div>
            <div className="docs-theme-studio__collection">
              <strong>{zh ? "主题集合" : "Theme collection"}</strong>
              <div className="docs-theme-studio__collection-list" aria-label={zh ? "主题集合列表" : "Theme collection list"}>
                {collectionThemes.map((item) => (
                  <Button
                    key={item.id}
                    size="sm"
                    variant={item.id === activeThemeId ? "soft" : "primary"}
                    onClick={() => loadCollectionTheme(item)}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
              <div className="docs-theme-studio__actions">
                <Button size="sm" onClick={saveCurrentThemeToCollection}>{zh ? "保存到集合" : "Save to collection"}</Button>
                <Button size="sm" variant="soft" onClick={duplicateCollectionTheme}>{zh ? "复制主题" : "Duplicate theme"}</Button>
                <Button size="sm" variant="stamp" onClick={removeCollectionTheme}>{zh ? "移除主题" : "Remove theme"}</Button>
              </div>
              <div className="docs-theme-studio__actions">
                <Button size="sm" variant="parcel" onClick={() => downloadTextFile("pinepost-theme-collection.json", collectionJsonText)}>
                  {zh ? "下载集合 JSON" : "Download collection JSON"}
                </Button>
                <Button size="sm" variant="soft" onClick={() => setCollectionImportText(collectionJsonText)}>
                  {zh ? "填入主题集合" : "Use collection JSON"}
                </Button>
              </div>
              <Textarea
                aria-label={zh ? "主题集合 JSON 输入" : "Theme collection JSON input"}
                value={collectionImportText}
                onChange={(event) => setCollectionImportText(event.target.value)}
                placeholder={zh ? "粘贴主题集合 JSON" : "Paste theme collection JSON"}
              />
              <Button size="sm" onClick={importCollection}>{zh ? "导入集合" : "Import collection"}</Button>
              {collectionMessage && <div className="docs-theme-studio__message" role="status">{collectionMessage}</div>}
            </div>
            {tokenIssues.length > 0 && (
              <div className="docs-theme-studio__message" role="status">
                {tokenIssues.map((issue) => describeThemeIssue(issue, zh)).join(" ")}
              </div>
            )}
          </div>

          <div className="docs-theme-studio__tokens" aria-label={zh ? "主题 token 编辑" : "Theme token editor"}>
            {editableThemeTokens.map((token) => (
              <label className="docs-theme-studio__token" key={token.name}>
                <span>
                  <strong>{zh ? token.label.zh : token.label.en}</strong>
                  <small>{zh ? token.helper.zh : token.helper.en}</small>
                </span>
                {token.type === "color" ? (
                  <span className="docs-theme-studio__color">
                    <input
                      aria-label={token.name}
                      type="color"
                      value={colorInputValue(tokens[token.name])}
                      onChange={(event) => setToken(token.name, event.target.value)}
                    />
                    <Input value={tokens[token.name]} onChange={(event) => setToken(token.name, event.target.value)} />
                  </span>
                ) : (
                  <span className="docs-theme-studio__radius">
                    <input
                      aria-label={token.name}
                      max={18}
                      min={4}
                      type="range"
                      value={radiusInputValue(tokens[token.name])}
                      onChange={(event) => setToken(token.name, `${event.target.value}px`)}
                    />
                    <Input value={tokens[token.name]} onChange={(event) => setToken(token.name, event.target.value)} />
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className={`docs-theme-studio__preview ${themeClassName}`} style={themeTokensToStyle(tokens)}>
          <div className="docs-theme-studio__hero">
            <Tag>{labels.themes[preset]}</Tag>
            <h3>{zh ? "松木柜台" : "Pine counter"}</h3>
            <p>{zh ? "按钮、表单、表格和上传在同一组 token 下保持一致。" : "Buttons, forms, tables, and upload states share one token set."}</p>
            <Space>
              <Button>{zh ? "发送清单" : "Send list"}</Button>
              <Button variant="parcel">{zh ? "打包" : "Pack"}</Button>
              <Button variant="stamp">{zh ? "盖章" : "Stamp"}</Button>
            </Space>
          </div>

          <div className="docs-theme-studio__cards">
            <Card>
              <CardHeader>
                <CardTitle>{zh ? "收件便签" : "Delivery note"}</CardTitle>
                <CardDescription>{zh ? "真实控件预览当前主题。" : "Real controls preview the current theme."}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="docs-field-grid">
                  <label>
                    {zh ? "收件处" : "Desk"}
                    <Input placeholder={zh ? "苔藓桌" : "Moss desk"} />
                  </label>
                  <Switch label={zh ? "静默配送" : "Quiet delivery"} defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="docs-theme-studio__table">
              <Table
                columns={[
                  { key: "route", title: zh ? "路线" : "Route" },
                  { key: "count", title: zh ? "数量" : "Count" },
                  { key: "status", title: zh ? "状态" : "Status" }
                ]}
                data={themePreviewRows}
                density="compact"
                rowKey="route"
              />
            </div>

            <Upload label={zh ? "上传包裹图" : "Upload parcel image"} showFileList={false} />
          </div>
        </div>
      </div>

      <CodeBlock codeText={cssText} label={zh ? "CSS 变量" : "CSS variables"} labels={labels} />
      <CodeBlock codeText={jsonText} label={zh ? "主题 JSON" : "Theme JSON"} labels={labels} />
      <CodeBlock codeText={collectionJsonText} label={zh ? "主题集合 JSON" : "Theme collection JSON"} labels={labels} />
      <div className="docs-note">
        <strong>{zh ? "Recipe Bundle 入口" : "Recipe Bundle entry"}</strong>
        <p>
          {zh
            ? "主题集合 JSON 可以放进 Recipe Bundle，和表格视图、排期预设一起迁移。"
            : "Theme collection JSON can be included in a Recipe Bundle alongside table views and scheduling presets."}
        </p>
      </div>

      <div className="docs-theme-studio__import">
        <div>
          <strong>{zh ? "导入主题" : "Import theme"}</strong>
          <p>{zh ? "粘贴导出的 JSON，可以恢复主题名称、基础预设和已修改 token。" : "Paste exported JSON to restore the theme name, base preset, and changed tokens."}</p>
        </div>
        <Textarea
          aria-label={zh ? "主题 JSON 输入" : "Theme JSON input"}
          value={importText}
          onChange={(event) => setImportText(event.target.value)}
          placeholder={zh ? "粘贴主题 JSON" : "Paste theme JSON"}
        />
        <div className="docs-theme-studio__actions">
          <Button size="sm" onClick={importTheme}>{zh ? "导入 JSON" : "Import JSON"}</Button>
          <Button size="sm" variant="soft" onClick={() => setImportText(jsonText)}>{zh ? "填入当前主题" : "Use current JSON"}</Button>
        </div>
        {importMessage && <div className="docs-theme-studio__message" role="status">{importMessage}</div>}
      </div>

      <div className="docs-api-wrap" aria-label={zh ? "Theme Studio token 表" : "Theme Studio token table"}>
        <strong className="docs-api-title">{zh ? "可编辑 token" : "Editable tokens"}</strong>
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
            <tr>
              <td>
                <code>createPinepostThemeCollectionExport</code>
              </td>
              <td>helper</td>
              <td>-</td>
              <td>{zh ? "生成可迁移的多主题集合 JSON 数据。" : "Creates portable multi-theme collection JSON data."}</td>
            </tr>
            <tr>
              <td>
                <code>parsePinepostThemeCollectionExport</code>
              </td>
              <td>helper</td>
              <td>-</td>
              <td>{zh ? "解析并校验主题集合 JSON。" : "Parses and validates theme collection JSON."}</td>
            </tr>
            {editableThemeTokens.map((token) => (
              <tr key={token.name}>
                <td>
                  <code>{token.name}</code>
                </td>
                <td>{token.type === "color" ? "color" : "CSS length"}</td>
                <td>{pinepostThemePresets[preset][token.name]}</td>
                <td>{zh ? token.helper.zh : token.helper.en}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

type RecipeCategory = "all" | "commerce" | "data" | "form" | "learning" | "upload";

type RecipeState = {
  code: string;
  label: string;
  preview: React.ReactNode;
  value: string;
};

type RecipeDefinition = {
  category: Exclude<RecipeCategory, "all">;
  components: string[];
  description: string;
  id: string;
  states: RecipeState[];
  title: string;
};

function RecipeCard({
  labels,
  recipe,
  zh
}: {
  labels: (typeof copy)["zh-CN"];
  recipe: RecipeDefinition;
  zh: boolean;
}) {
  const [stateValue, setStateValue] = React.useState(recipe.states[0]?.value ?? "");
  const activeState = recipe.states.find((state) => state.value === stateValue) ?? recipe.states[0];

  React.useEffect(() => {
    setStateValue(recipe.states[0]?.value ?? "");
  }, [recipe.title, recipe.states]);

  return (
    <article className="docs-recipe-card" data-recipe-category={recipe.category}>
      <div className="docs-recipe-card__head">
        <div>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
        <div className="docs-recipe-card__components" aria-label={zh ? "组件清单" : "Component list"}>
          <strong>{zh ? "组件清单" : "Component list"}</strong>
          <span>{recipe.components.join(" / ")}</span>
        </div>
      </div>
      <div className="docs-recipe-card__states">
        <span>{zh ? "状态" : "State"}</span>
        <Segmented
          value={activeState.value}
          onValueChange={setStateValue}
          options={recipe.states.map((state) => ({ value: state.value, label: state.label }))}
        />
      </div>
      <div className="docs-preview-surface">{activeState.preview}</div>
      <CodeBlock codeText={activeState.code} label={`${recipe.title} - ${activeState.label}`} labels={labels} />
    </article>
  );
}

function RecipeGalleryPanel({ labels, zh }: { labels: (typeof copy)["zh-CN"]; zh: boolean }) {
  const [category, setCategory] = React.useState<RecipeCategory>("all");
  const [bundleRecipeIds, setBundleRecipeIds] = React.useState(["operations-table", "campaign-launch"]);
  const [bundleImportText, setBundleImportText] = React.useState("");
  const recipeLocale = zh ? "zh-CN" : "en";
  const launchDateRangePresets = React.useMemo(() => createPinepostDateRangePresets({ locale: recipeLocale, referenceDate: new Date(2026, 4, 18) }), [recipeLocale]);
  const launchTimeRangePresets = React.useMemo(() => createPinepostTimeRangePresets({ locale: recipeLocale }), [recipeLocale]);
  const categoryOptions: Array<{ label: string; value: RecipeCategory }> = [
    { value: "all", label: zh ? "全部" : "All" },
    { value: "data", label: zh ? "数据" : "Data" },
    { value: "form", label: zh ? "表单" : "Form" },
    { value: "upload", label: zh ? "上传" : "Upload" },
    { value: "commerce", label: zh ? "商业" : "Commerce" },
    { value: "learning", label: zh ? "学习" : "Learning" }
  ];
  const recipes: RecipeDefinition[] = [
    {
      category: "data",
      id: "operations-table",
      title: zh ? "后台表格台" : "Operations table",
      description: zh ? "带密度、列设置和状态标签的日常运营表格。" : "A daily operations table with density, column settings, and status tags.",
      components: ["Table", "TableColumnSettings", "Tag", "Button"],
      states: [
        {
          value: "ready",
          label: zh ? "正常" : "Ready",
          preview: (
            <div className="docs-recipe-preview">
              <TableColumnSettings
                columns={[
                  { key: "route", title: zh ? "路线" : "Route" },
                  { key: "count", title: zh ? "数量" : "Count" },
                  { key: "status", title: zh ? "状态" : "Status" }
                ]}
                defaultValue={{ columnOrder: ["route", "count", "status"], density: "compact", hiddenColumns: [] }}
              />
              <Table
                columns={[
                  { key: "route", title: zh ? "路线" : "Route" },
                  { key: "count", title: zh ? "数量" : "Count" },
                  { key: "status", title: zh ? "状态" : "Status", render: (row) => <Tag>{String(row.status)}</Tag> }
                ]}
                data={[
                  { route: zh ? "北门" : "North gate", count: 12, status: zh ? "待发" : "Ready" },
                  { route: zh ? "松木桌" : "Pine desk", count: 6, status: zh ? "复核" : "Review" }
                ]}
                density="compact"
                rowKey="route"
              />
            </div>
          ),
          code: code(['<TableColumnSettings columns={columns} defaultValue={settings} />', '<Table columns={columns} data={rows} density="compact" rowKey="route" />'])
        },
        {
          value: "loading",
          label: zh ? "加载中" : "Loading",
          preview: (
            <Loading label={zh ? "正在刷新路线数据" : "Refreshing route data"}>
              <Skeleton count={3} />
            </Loading>
          ),
          code: code(['<Loading label="正在刷新路线数据">', "  <Skeleton count={3} />", "</Loading>"])
        },
        {
          value: "empty",
          label: zh ? "空态" : "Empty",
          preview: <Empty title={zh ? "没有待处理路线" : "No routes waiting"} description={zh ? "筛选条件下暂无任务。" : "No tasks match the current filters."} action={<Button size="sm">{zh ? "清除筛选" : "Clear filters"}</Button>} />,
          code: code(['<Empty title="没有待处理路线" action={<Button>清除筛选</Button>} />'])
        }
      ]
    },
    {
      category: "form",
      id: "approval-form",
      title: zh ? "审批表单页" : "Approval form",
      description: zh ? "适合工单、申请和配置保存的紧凑表单。" : "A compact form for tickets, requests, and configuration saves.",
      components: ["Form", "FormField", "Input", "Select", "Button"],
      states: [
        {
          value: "ready",
          label: zh ? "正常" : "Ready",
          preview: (
            <Form className="docs-recipe-form">
              <FormField label={zh ? "收件处" : "Desk"}><Input placeholder={zh ? "苔藓桌" : "Moss desk"} /></FormField>
              <FormField label={zh ? "优先级" : "Priority"}><Select defaultValue="normal" options={[{ value: "normal", label: zh ? "普通" : "Normal" }, { value: "high", label: zh ? "加急" : "High" }]} /></FormField>
              <Button>{zh ? "提交审批" : "Submit"}</Button>
            </Form>
          ),
          code: code(["<Form>", "  <FormField label=\"收件处\"><Input /></FormField>", "  <Button>提交审批</Button>", "</Form>"])
        },
        {
          value: "loading",
          label: zh ? "处理中" : "Saving",
          preview: <Loading label={zh ? "正在保存审批单" : "Saving request"}><Form className="docs-recipe-form"><FormField label={zh ? "收件处" : "Desk"}><Input disabled value={zh ? "苔藓桌" : "Moss desk"} /></FormField><Button disabled>{zh ? "保存中" : "Saving"}</Button></Form></Loading>,
          code: code(['<Loading label="正在保存审批单">', "  <Form>...</Form>", "</Loading>"])
        },
        {
          value: "disabled",
          label: zh ? "禁用" : "Disabled",
          preview: <Form className="docs-recipe-form"><Alert title={zh ? "审批窗口已关闭" : "Approval closed"} description={zh ? "当前批次暂不可提交。" : "This batch cannot be submitted right now."} variant="warning" /><FormField label={zh ? "收件处" : "Desk"}><Input disabled value={zh ? "苔藓桌" : "Moss desk"} /></FormField><Button disabled>{zh ? "暂不可提交" : "Temporarily unavailable"}</Button></Form>,
          code: code(['<Alert variant="warning" title="审批窗口已关闭" />', "<Button disabled>暂不可提交</Button>"])
        }
      ]
    },
    {
      category: "upload",
      id: "asset-upload-wall",
      title: zh ? "素材上传墙" : "Asset upload wall",
      description: zh ? "展示自定义文件项、失败状态和手动重试入口。" : "Shows custom file items, failure states, and retry entry points.",
      components: ["Upload", "Progress", "Button", "Badge"],
      states: [
        {
          value: "ready",
          label: zh ? "队列" : "Queue",
          preview: <Upload label={zh ? "上传素材" : "Upload assets"} defaultFileList={[{ name: "parcel-cover.png", percent: 68, status: "uploading", uid: "asset-1" }, { error: new Error("Upload failed"), name: "stamp-set.zip", percent: 30, status: "error", uid: "asset-2" }]} renderFile={(file, actions) => <div className="docs-upload-card"><span>{file.name}</span><Badge variant={file.status === "error" ? "stamp" : "sky"}>{file.status}</Badge><Button size="sm" variant="soft" onClick={file.status === "error" ? actions.retry : actions.remove}>{file.status === "error" ? (zh ? "重试" : "Retry") : (zh ? "移除" : "Remove")}</Button></div>} />,
          code: code(["<Upload", "  defaultFileList={files}", "  renderFile={(file, actions) => <CustomFile file={file} actions={actions} />}", "/>"])
        },
        {
          value: "loading",
          label: zh ? "上传中" : "Uploading",
          preview: <div className="docs-recipe-preview"><Progress value={68} label={zh ? "parcel-cover.png 上传中" : "parcel-cover.png uploading"} /><Progress value={34} label={zh ? "stamp-set.zip 上传中" : "stamp-set.zip uploading"} /></div>,
          code: code(['<Progress value={68} label="parcel-cover.png 上传中" />'])
        },
        {
          value: "error",
          label: zh ? "失败" : "Error",
          preview: <Alert title={zh ? "stamp-set.zip 上传失败" : "stamp-set.zip failed"} description={zh ? "检查网络后可从文件项重试。" : "Check the network and retry from the file item."} variant="danger" />,
          code: code(['<Alert variant="danger" title="stamp-set.zip 上传失败" />'])
        }
      ]
    },
    {
      category: "commerce",
      id: "campaign-card",
      title: zh ? "活动商品卡" : "Campaign card",
      description: zh ? "适合活动页、套餐卡和小型电商模块。" : "A card pattern for campaigns, bundles, and small commerce modules.",
      components: ["Card", "Badge", "Statistic", "Button"],
      states: [
        {
          value: "ready",
          label: zh ? "在售" : "Live",
          preview: <Card className="docs-campaign-card"><CardHeader><Badge variant="parcel">{zh ? "今日特选" : "Today"}</Badge><CardTitle>{zh ? "松果礼盒" : "Pinecone bundle"}</CardTitle><CardDescription>{zh ? "含三张便签与一枚邮戳。" : "Three notes and one stamp."}</CardDescription></CardHeader><CardContent><Statistic label={zh ? "库存" : "Stock"} value={18} suffix={zh ? "份" : " packs"} /></CardContent><CardFooter><Button variant="parcel">{zh ? "加入清单" : "Add to list"}</Button></CardFooter></Card>,
          code: code(['<Card><Badge variant="parcel">今日特选</Badge><Statistic label="库存" value={18} /></Card>'])
        },
        {
          value: "loading",
          label: zh ? "加载中" : "Loading",
          preview: <Card className="docs-campaign-card"><CardContent><Skeleton count={4} /></CardContent><CardFooter><Button disabled>{zh ? "读取库存" : "Checking stock"}</Button></CardFooter></Card>,
          code: code(["<Card><Skeleton count={4} /></Card>"])
        },
        {
          value: "soldout",
          label: zh ? "售罄" : "Sold out",
          preview: <Result status="warning" title={zh ? "本轮已经售罄" : "Sold out for this round"} description={zh ? "可以展示候补登记或下一轮提醒。" : "Offer a waitlist or next-round reminder."} />,
          code: code(['<Result status="warning" title="本轮已经售罄" />'])
        }
      ]
    },
    {
      category: "learning",
      id: "learning-task",
      title: zh ? "学习任务页" : "Learning task",
      description: zh ? "把步骤、进度和反馈组合成轻学习流程。" : "Combines steps, progress, and feedback for learning flows.",
      components: ["Steps", "Progress", "Rate", "Result"],
      states: [
        {
          value: "ready",
          label: zh ? "进行中" : "Active",
          preview: <div className="docs-recipe-preview"><Steps active={2} items={[{ title: zh ? "阅读" : "Read" }, { title: zh ? "练习" : "Practice" }, { title: zh ? "提交" : "Submit" }]} /><Progress value={72} /><Rate value={4} disabled /></div>,
          code: code(["<Steps active={2} items={items} />", "<Progress value={72} />", "<Rate value={4} disabled />"])
        },
        {
          value: "loading",
          label: zh ? "加载中" : "Loading",
          preview: <Loading label={zh ? "正在生成练习" : "Generating practice"}><Skeleton count={3} /></Loading>,
          code: code(['<Loading label="正在生成练习"><Skeleton count={3} /></Loading>'])
        },
        {
          value: "success",
          label: zh ? "完成" : "Success",
          preview: <Result status="success" title={zh ? "任务完成" : "Task complete"} description={zh ? "学习记录已经保存。" : "Learning record saved."} />,
          code: code(['<Result status="success" title="任务完成" />'])
        }
      ]
    },
    {
      category: "data",
      id: "operations-dashboard",
      title: zh ? "运营仪表盘" : "Operations dashboard",
      description: zh ? "把关键指标、进度和提示压进一个可扫视面板。" : "A scannable dashboard for metrics, progress, and notes.",
      components: ["Statistic", "Progress", "Alert", "Skeleton"],
      states: [
        { value: "ready", label: zh ? "正常" : "Ready", preview: <div className="docs-dashboard-grid"><Statistic label={zh ? "今日单量" : "Orders"} value={128} /><Statistic label={zh ? "准时率" : "On time"} value="96%" /><Progress value={84} label={zh ? "路线完成率" : "Route completion"} /><Alert title={zh ? "午后高峰" : "Afternoon peak"} description={zh ? "建议保留两名复核人员。" : "Keep two reviewers available."} /></div>, code: code(["<Statistic label=\"今日单量\" value={128} />", "<Progress value={84} label=\"路线完成率\" />"]) },
        { value: "loading", label: zh ? "加载中" : "Loading", preview: <Skeleton count={5} />, code: code(["<Skeleton count={5} />"]) },
        { value: "empty", label: zh ? "空态" : "Empty", preview: <Empty title={zh ? "暂无运营数据" : "No operations data"} description={zh ? "选择日期后会显示指标。" : "Pick a date to see metrics."} />, code: code(['<Empty title="暂无运营数据" />']) }
      ]
    },
    {
      category: "commerce",
      id: "campaign-launch",
      title: zh ? "活动发布页" : "Campaign launch",
      description: zh ? "发布前校验、倒计时和成功反馈放在同一流程里。" : "Pre-launch checks, timing, and success feedback in one flow.",
      components: ["Card", "Switch", "Timeline", "DateRangePickerPanel", "TimeRangePickerPanel"],
      states: [
        { value: "ready", label: zh ? "待发布" : "Ready", preview: <Card><CardHeader><CardTitle>{zh ? "春日活动" : "Spring campaign"}</CardTitle><CardDescription>{zh ? "确认库存、封面和投放时间。" : "Confirm stock, artwork, and launch time."}</CardDescription></CardHeader><CardContent><Switch label={zh ? "开启提醒" : "Enable reminder"} defaultChecked /><Timeline items={[{ title: zh ? "素材确认" : "Artwork checked" }, { title: zh ? "库存锁定" : "Stock locked" }]} /><Space direction="vertical"><DateRangePickerPanel defaultValue={[new Date(2026, 4, 18), new Date(2026, 4, 24)]} shortcuts={launchDateRangePresets} /><TimeRangePickerPanel defaultValue={["09:00", "18:00"]} shortcuts={launchTimeRangePresets} /></Space></CardContent></Card>, code: code(["const dateShortcuts = createPinepostDateRangePresets();", "const timeShortcuts = createPinepostTimeRangePresets();", "<Card><DateRangePickerPanel shortcuts={dateShortcuts} /><TimeRangePickerPanel shortcuts={timeShortcuts} /></Card>"]) },
        { value: "disabled", label: zh ? "缺配置" : "Blocked", preview: <Message title={zh ? "缺少封面图" : "Cover image missing"} description={zh ? "补齐素材后才能发布。" : "Add artwork before launch."} variant="warning" />, code: code(['<Message variant="warning" title="缺少封面图" />']) },
        { value: "success", label: zh ? "已发布" : "Live", preview: <Result status="success" title={zh ? "活动已发布" : "Campaign is live"} description={zh ? "入口已经同步到集市页。" : "Entry is now visible on the shop page."} />, code: code(['<Result status="success" title="活动已发布" />']) }
      ]
    },
    {
      category: "data",
      id: "support-queue",
      title: zh ? "客服队列页" : "Support queue",
      description: zh ? "把待处理、超时和处理完成的对话集中展示。" : "A queue for waiting, overdue, and resolved support conversations.",
      components: ["Badge", "Table", "Alert", "Button"],
      states: [
        { value: "ready", label: zh ? "正常" : "Ready", preview: <Table columns={[{ key: "name", title: zh ? "访客" : "Visitor" }, { key: "status", title: zh ? "状态" : "Status", render: (row) => <Badge variant={String(row.status).includes("超时") ? "stamp" : "sky"}>{String(row.status)}</Badge> }]} data={[{ name: zh ? "松木店" : "Pine shop", status: zh ? "等待中" : "Waiting" }, { name: zh ? "苔藓课" : "Moss class", status: zh ? "超时" : "Overdue" }]} rowKey="name" />, code: code(['<Table columns={queueColumns} data={queueRows} rowKey="name" />']) },
        { value: "loading", label: zh ? "加载中" : "Loading", preview: <Loading label={zh ? "正在拉取会话" : "Loading conversations"}><Skeleton count={4} /></Loading>, code: code(['<Loading label="正在拉取会话"><Skeleton count={4} /></Loading>']) },
        { value: "error", label: zh ? "异常" : "Error", preview: <Alert title={zh ? "队列同步失败" : "Queue sync failed"} description={zh ? "保留本地缓存，并提示重新同步。" : "Keep local cache and offer a sync retry."} variant="danger" />, code: code(['<Alert variant="danger" title="队列同步失败" />']) }
      ]
    }
  ];
  const filteredRecipes = category === "all" ? recipes : recipes.filter((recipe) => recipe.category === category);
  const selectedBundleRecipes = recipes.filter((recipe) => bundleRecipeIds.includes(recipe.id));
  const bundleExport = React.useMemo(
    () =>
      createPinepostRecipeBundle({
        id: "spring-ops-kit",
        name: zh ? "春日运营配方包" : "Spring operations bundle",
        description: zh ? "主题、表格视图、排期快捷项和业务模板引用。" : "Theme, table views, scheduling shortcuts, and recipe references.",
        recipeIds: bundleRecipeIds,
        schedule: {
          dateKeys: ["today"],
          dateRangeKeys: ["last-7-days", "this-week"],
          locale: recipeLocale,
          referenceDate: "2026-05-18",
          timeRangeKeys: ["morning", "full-day"]
        },
        tableViewPresets: createTableViewPresetExport({
          activeKey: "ops",
          presets: [
            {
              key: "ops",
              label: zh ? "运营视图" : "Operations",
              columnOrder: ["route", "status", "count"],
              hiddenColumns: [],
              sortState: { key: "route", order: "asc" }
            },
            {
              key: "review",
              label: zh ? "复核视图" : "Review",
              columnOrder: ["status", "route", "count"],
              hiddenColumns: ["count"],
              sortState: { key: "count", order: "desc" }
            }
          ]
        }),
        themeCollection: createPinepostThemeCollectionExport({
          activeId: "campaign",
          name: zh ? "春日主题集合" : "Spring theme collection",
          themes: [
            { baseTheme: "calm", id: "workspace", name: zh ? "工作台" : "Workspace", tokens: {} },
            { baseTheme: "shop", id: "campaign", name: zh ? "活动页" : "Campaign", tokens: { "--pinepost-paper": "#fff4df", "--pinepost-stamp": "#c95745" } }
          ]
        })
      }),
    [bundleRecipeIds, recipeLocale, zh]
  );
  const bundleJsonText = React.useMemo(() => stringifyPinepostRecipeBundle(bundleExport), [bundleExport]);
  const bundleImportResult = React.useMemo(
    () => bundleImportText.trim() ? parsePinepostRecipeBundle(bundleImportText) : undefined,
    [bundleImportText]
  );

  function toggleBundleRecipe(id: string) {
    setBundleRecipeIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <section className="docs-section docs-section--guide docs-recipe-gallery">
      <div className="docs-section__head">
        <span>{labels.groups.guide}</span>
        <h2>{zh ? "Recipe Gallery 业务模板" : "Recipe Gallery"}</h2>
        <p>{zh ? "把常见业务界面拆成可复制的 Pinepost 组合，方便直接拿去改。" : "Copyable Pinepost compositions for common product screens."}</p>
      </div>

      <div className="docs-recipe-gallery__filters">
        <span>{zh ? "分类" : "Category"}</span>
        <Segmented value={category} onValueChange={(value) => setCategory(value as RecipeCategory)} options={categoryOptions} />
      </div>

      <div className="docs-bundle-builder" aria-label={zh ? "配方包构建器" : "Recipe Bundle Builder"}>
        <div className="docs-bundle-builder__head">
          <div>
            <strong>{zh ? "Bundle Builder 配方包构建器" : "Bundle Builder"}</strong>
            <p>{zh ? "选择业务模板后，生成可导入导出的 Recipe Bundle JSON。" : "Select product recipes and generate portable Recipe Bundle JSON."}</p>
            <p><code>createPinepostRecipeBundle</code> / <code>parsePinepostRecipeBundle</code></p>
          </div>
          <Tag variant="parcel">{zh ? "配置配方" : "Config recipe"}</Tag>
        </div>
        <div className="docs-bundle-builder__recipes" aria-label={zh ? "选择模板" : "Select recipes"}>
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              aria-pressed={bundleRecipeIds.includes(recipe.id)}
              onClick={() => toggleBundleRecipe(recipe.id)}
              type="button"
            >
              {recipe.title}
            </button>
          ))}
        </div>
        <div className="docs-bundle-builder__summary">
          <div>
            <span>{zh ? "模板" : "Recipes"}</span>
            <strong>{selectedBundleRecipes.length}</strong>
          </div>
          <div>
            <span>{zh ? "主题" : "Themes"}</span>
            <strong>{bundleExport.themeCollection?.themes.length ?? 0}</strong>
          </div>
          <div>
            <span>{zh ? "表格预设" : "Table presets"}</span>
            <strong>{bundleExport.tableViewPresets?.presets.length ?? 0}</strong>
          </div>
          <div>
            <span>{zh ? "排期" : "Schedule"}</span>
            <strong>{bundleExport.schedule?.dateRangeKeys?.length ?? 0}/{bundleExport.schedule?.timeRangeKeys?.length ?? 0}</strong>
          </div>
        </div>
        <CodeBlock codeText={bundleJsonText} label={zh ? "Recipe Bundle JSON" : "Recipe Bundle JSON"} labels={labels} />
        <div className="docs-bundle-builder__import">
          <div>
            <strong>{zh ? "Bundle import 预览" : "Bundle import preview"}</strong>
            <p>{zh ? "粘贴配方包 JSON 后，预览模板、主题、表格视图和排期配置。" : "Paste bundle JSON to preview recipes, themes, table views, and schedule config."}</p>
          </div>
          <Textarea
            aria-label={zh ? "Recipe Bundle JSON 输入" : "Recipe Bundle JSON input"}
            placeholder={zh ? "粘贴 Recipe Bundle JSON" : "Paste Recipe Bundle JSON"}
            value={bundleImportText}
            onChange={(event) => setBundleImportText(event.target.value)}
          />
          <div className="docs-theme-studio__actions">
            <Button size="sm" onClick={() => setBundleImportText(bundleJsonText)}>
              {zh ? "填入配方包" : "Use bundle JSON"}
            </Button>
          </div>
          {bundleImportResult && (
            <div className="docs-bundle-builder__preview" role="status">
              {bundleImportResult.issues.length > 0 ? (
                <Alert
                  variant="warning"
                  title={zh ? "导入时已修正配置" : "Import adjusted"}
                  description={bundleImportResult.issues.map((issue) => describeBundleIssue(issue, zh)).join(" ")}
                />
              ) : (
                <Alert
                  variant="success"
                  title={zh ? "配方包可用" : "Bundle ready"}
                  description={zh ? "JSON 可以恢复模板、主题集合、表格视图和排期配置。" : "JSON restores recipes, theme collection, table views, and schedule config."}
                />
              )}
              <div className="docs-bundle-builder__summary">
                <div><span>{zh ? "模板" : "Recipes"}</span><strong>{bundleImportResult.value?.recipeIds.length ?? 0}</strong></div>
                <div><span>{zh ? "主题" : "Themes"}</span><strong>{bundleImportResult.themeCollection?.value?.themes.length ?? 0}</strong></div>
                <div><span>{zh ? "表格预设" : "Table presets"}</span><strong>{bundleImportResult.tableViewPresets?.value?.presets.length ?? 0}</strong></div>
                <div><span>{zh ? "排期 locale" : "Schedule locale"}</span><strong>{bundleImportResult.value?.schedule?.locale ?? "-"}</strong></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="docs-recipe-gallery__grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} labels={labels} zh={zh} />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [locale, setLocale] = React.useState<PinepostLocale>("zh-CN");
  const [theme, setTheme] = React.useState<PinepostTheme>("calm");
  const [selectedId, setSelectedId] = React.useState("button");
  const [navFilter, setNavFilter] = React.useState("");
  const [menuValue, setMenuValue] = React.useState("routes");
  const [page, setPage] = React.useState(2);
  const [segment, setSegment] = React.useState("calm");
  const [selectValue, setSelectValue] = React.useState("cedar");
  const [radioValue, setRadioValue] = React.useState("standard");
  const [rateValue, setRateValue] = React.useState(4);
  const [cascaderValue, setCascaderValue] = React.useState(["north", "cedar"]);
  const [cascaderMultiValue, setCascaderMultiValue] = React.useState<CascaderMultipleValue>([["north", "cedar"]]);
  const [transferValue, setTransferValue] = React.useState(["stamp"]);
  const [treeSelectValue, setTreeSelectValue] = React.useState<string | string[]>("moss");
  const [virtualSelectValue, setVirtualSelectValue] = React.useState("route-12");
  const [inputTags, setInputTags] = React.useState(["优先", "路线 A7"]);
  const [otpValue, setOtpValue] = React.useState("247");
  const [mentionValue, setMentionValue] = React.useState("请交给 @cedar ");
  const [timeSelectValue, setTimeSelectValue] = React.useState("09:30");
  const [timePanelValue, setTimePanelValue] = React.useState("09:30");
  const [dateRangeValue, setDateRangeValue] = React.useState<[Date | undefined, Date | undefined]>([new Date(2026, 4, 17), new Date(2026, 4, 19)]);
  const [dateTimePanelValue, setDateTimePanelValue] = React.useState(new Date(2026, 4, 17, 9, 30));
  const [timeRangeValue, setTimeRangeValue] = React.useState<[string | undefined, string | undefined]>(["09:00", "11:00"]);
  const [tourOpen, setTourOpen] = React.useState(false);
  const [virtualTreeSelected, setVirtualTreeSelected] = React.useState("north-3");
  const [messageBoxOpen, setMessageBoxOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [tableSettings, setTableSettings] = React.useState<TableColumnSettingsValue>({
    columnOrder: ["route", "count", "status"],
    density: "compact",
    hiddenColumns: []
  });
  const labels = copy[locale] as (typeof copy)["zh-CN"];
  const zh = locale === "zh-CN";
  const scheduleReferenceDate = React.useMemo(() => new Date(2026, 4, 18), []);
  const datePresets = React.useMemo(() => createPinepostDatePresets({ locale, referenceDate: scheduleReferenceDate }), [locale, scheduleReferenceDate]);
  const dateRangePresets = React.useMemo(() => createPinepostDateRangePresets({ locale, referenceDate: scheduleReferenceDate }), [locale, scheduleReferenceDate]);
  const timeRangePresets = React.useMemo(() => createPinepostTimeRangePresets({ locale }), [locale]);
  const tablePresetExportText = React.useMemo(
    () =>
      stringifyTableViewPresetExport(
        createTableViewPresetExport({
          activeKey: "ops",
          presets: [
            {
              key: "ops",
              label: zh ? "运营视图" : "Operations",
              columnOrder: ["route", "status", "count"],
              columnWidths: { route: 160, status: 120 },
              hiddenColumns: [],
              sortState: { key: "route", order: "asc" }
            },
            {
              key: "review",
              label: zh ? "复核视图" : "Review",
              columnOrder: ["status", "route", "count"],
              hiddenColumns: ["count"],
              sortState: { key: "count", order: "desc" }
            }
          ]
        })
      ),
    [zh]
  );

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
          onValueChange={(value) => setSelectValue(Array.isArray(value) ? value[0] ?? "" : value)}
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
      recipes: [
        {
          title: zh ? "远程筛选选择" : "Remote filtered select",
          description: zh ? "filterable 和 clearable 组合适合状态、负责人、网点等业务枚举。" : "filterable and clearable fit status, owner, and station fields.",
          preview: (
            <Select
              clearable
              filterable
              placeholder={zh ? "筛选路线" : "Filter route"}
              options={[
                { value: "north", label: zh ? "北线" : "North line", group: zh ? "日常" : "Daily" },
                { value: "market", label: zh ? "集市线" : "Market line", group: zh ? "活动" : "Campaign" }
              ]}
            />
          ),
          code: code([
            "<Select",
            "  clearable",
            "  filterable",
            "  options={remoteOptions}",
            "  remoteMethod={fetchRouteOptions}",
            "  onClear={() => setRoute(undefined)}",
            "/>"
          ])
        }
      ],
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
      description: zh ? "Form 与 FormField 提供标签、说明、校验错误、触发时机和异步提交状态。" : "Form and FormField provide labels, hints, errors, validation triggers, and async submit state.",
      preview: (
        <Form
          model={{ desk: "cedar" }}
          onFinish={async () => showToast()}
          rules={{ desk: [{ required: true, message: zh ? "请填写收件处。" : "Recipient is required." }] }}
          submittingMessage={zh ? "正在提交路线..." : "Submitting route..."}
          validateTrigger="blur"
        >
          <FormField label={zh ? "收件处" : "Recipient"} htmlFor="demo-recipient" required description={zh ? "用于路线分配。" : "Used for route assignment."}>
            <Input id="demo-recipient" placeholder={zh ? "苔藓桌" : "Moss desk"} />
          </FormField>
          <FormField label={zh ? "校验提示" : "Validation"} error={zh ? "请填写路线。" : "Route is required."}>
            <Input placeholder={zh ? "路线编号" : "Route code"} />
          </FormField>
          <Button size="sm" type="submit">{zh ? "提交路线" : "Submit route"}</Button>
        </Form>
      ),
      code: code([
        'import { Form, FormField, Input } from "pinepost-ui";',
        "",
        '<Form model={model} rules={rules} validateTrigger="blur" onFinish={saveRoute}>',
        '  <FormField name="desk" label="收件处" required validatingMessage="检查桌台中...">',
        '    <Input placeholder="苔藓桌" />',
        "  </FormField>",
        "</Form>"
      ]),
      recipes: [
        {
          title: zh ? "异步提交与错误聚焦" : "Async submit with error focus",
          description: zh ? "blur 校验用于输入时反馈，提交失败后可滚动到第一个错误字段。" : "Blur validation gives early feedback; failed submit can scroll to the first invalid field.",
          preview: (
            <Form
              model={{ route: "" }}
              rules={{ route: [{ required: true, message: zh ? "路线必填。" : "Route is required." }] }}
              validateTrigger="blur"
              submitErrorMessage={zh ? "请检查表单后再提交。" : "Check the form before submitting."}
            >
              <FormField name="route" label={zh ? "路线" : "Route"} required>
                <Input placeholder="A7" />
              </FormField>
              <Button size="sm" type="submit">{zh ? "保存配置" : "Save config"}</Button>
            </Form>
          ),
          code: code([
            "const formRef = React.useRef<FormRef>(null);",
            "",
            "<Form",
            "  ref={formRef}",
            "  model={model}",
            "  rules={rules}",
            '  validateTrigger="blur"',
            "  onFinish={saveConfig}",
            "  onFinishFailed={() => formRef.current?.scrollToField('route')}",
            "/>"
          ])
        }
      ],
      api: [
        { prop: "layout", type: '"vertical" | "horizontal" | "inline"', defaultValue: "vertical", description: zh ? "表单布局。" : "Form layout." },
        { prop: "model", type: "Record<string, unknown>", defaultValue: "{}", description: zh ? "字段数据模型。" : "Field data model." },
        { prop: "rules", type: "Record<string, FormRule[]>", defaultValue: "{}", description: zh ? "同步或异步校验规则。" : "Sync or async validation rules." },
        { prop: "validateTrigger", type: '"submit" | "blur" | "change" | string[]', defaultValue: "submit", description: zh ? "表单或字段校验触发时机。" : "Form or field validation trigger." },
        { prop: "description", type: "ReactNode", defaultValue: "-", description: zh ? "字段说明。" : "Field hint." },
        { prop: "error", type: "ReactNode", defaultValue: "-", description: zh ? "字段错误提示。" : "Field error." },
        { prop: "validatingMessage", type: "ReactNode", defaultValue: "-", description: zh ? "异步校验中提示。" : "Message shown while async validation is running." },
        { prop: "onFinish / onFinishFailed", type: "(model) => void | Promise<void>", defaultValue: "-", description: zh ? "校验通过或失败后的提交回调。" : "Submit callbacks after validation." },
        { prop: "submittingMessage / submitErrorMessage", type: "ReactNode", defaultValue: "-", description: zh ? "提交中和提交错误提示。" : "Submitting and submit error messages." },
        { prop: "validate / validateField / isFieldValidating", type: "FormRef methods", defaultValue: "-", description: zh ? "命令式校验和校验中状态读取。" : "Imperative validation and validating-state lookup." },
        { prop: "isSubmitting / getSubmitError", type: "FormRef methods", defaultValue: "-", description: zh ? "读取提交状态和提交错误。" : "Reads submit state and submit error." }
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
      description: zh ? "支持受控队列、拖拽、数量限制、生命周期事件和手动提交。" : "Supports controlled queues, drag upload, limits, lifecycle events, and manual submit.",
      preview: (
        <Upload
          drag
          limit={3}
          label={zh ? "拖放路线清单" : "Drop route manifests"}
          description={zh ? "支持拖拽、预览、移除和业务侧上传请求。" : "Supports drag, preview, remove, and product-owned requests."}
        />
      ),
      code: code([
        'import { Upload } from "pinepost-ui";',
        "",
        "const uploadRef = React.useRef<UploadRef>(null);",
        "",
        "<Upload",
        "  ref={uploadRef}",
        "  drag",
        "  limit={3}",
        '  label="拖放路线清单"',
        "  beforeUpload={(file) => file.size < 1024 * 1024}",
        "  customRequest={async ({ onProgress, onSuccess }) => {",
        "    onProgress?.(60);",
        "    onSuccess?.({ ok: true });",
        "  }}",
        "/>"
      ]),
      recipes: [
        {
          title: zh ? "图片墙与失败重试" : "Image wall with retry",
          description: zh ? "用 renderFile 接管列表项，失败文件可以直接回到 ready 队列。" : "Use renderFile to own list rows and move failed files back to the ready queue.",
          preview: (
            <Upload
              label={zh ? "活动素材" : "Campaign assets"}
              defaultFileList={[
                { uid: "hero", name: "hero-card.png", percent: 100, status: "success" },
                { uid: "stamp", name: "stamp-sheet.png", percent: 36, status: "error" }
              ]}
              renderFile={(file, actions) => (
                <div className="docs-upload-card">
                  <strong>{file.name}</strong>
                  <span>{file.status === "error" ? (zh ? "需要重试" : "Needs retry") : `${file.percent}%`}</span>
                  {file.status === "error" && (
                    <Button size="sm" variant="soft" onClick={actions.retry}>
                      {zh ? "重试" : "Retry"}
                    </Button>
                  )}
                </div>
              )}
            />
          ),
          code: code([
            'import { Upload } from "pinepost-ui";',
            "",
            "<Upload",
            "  defaultFileList={files}",
            "  onRetry={(file) => enqueueAgain(file)}",
            "  renderFile={(file, actions) => (",
            "    <AssetRow",
            "      file={file}",
            "      onPreview={actions.preview}",
            "      onRetry={actions.retry}",
            "      onRemove={actions.remove}",
            "    />",
            "  )}",
            "/>"
          ])
        }
      ],
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "drag", type: "boolean", defaultValue: "false", description: zh ? "启用拖拽投放。" : "Enables drag and drop." },
            { prop: "fileList / defaultFileList", type: "UploadFile[]", defaultValue: "[]", description: zh ? "受控或非受控文件队列。" : "Controlled or uncontrolled file queue." },
            { prop: "limit", type: "number", defaultValue: "-", description: zh ? "最大接收数量。" : "Maximum accepted file count." },
            { prop: "showFileList", type: "boolean", defaultValue: "true", description: zh ? "是否显示内置文件队列。" : "Whether the built-in file queue is shown." },
            { prop: "renderFile", type: "(file, actions, fileList) => ReactNode", defaultValue: "-", description: zh ? "自定义队列文件项。" : "Custom file queue item." },
            { prop: "beforeUpload", type: "(file, files) => boolean | Promise<boolean>", defaultValue: "-", description: zh ? "加入队列前校验。" : "Checks before queuing." },
            { prop: "customRequest", type: "(options) => void | Promise<void>", defaultValue: "-", description: zh ? "自定义上传请求。" : "Custom upload request." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onDrop", type: "(files: File[]) => void", defaultValue: "-", description: zh ? "拖拽投放后触发。" : "Fires after a drop." },
            { prop: "onChange", type: "(file, fileList) => void", defaultValue: "-", description: zh ? "文件加入队列。" : "File enters the queue." },
            { prop: "onRemove / onPreview", type: "(file, fileList?) => void", defaultValue: "-", description: zh ? "移除或预览文件。" : "Remove or preview a file." },
            { prop: "onRetry", type: "(file, fileList) => void", defaultValue: "-", description: zh ? "文件被重置为 ready 后触发。" : "Fires after a file is reset to ready." },
            { prop: "onExceed", type: "(files, fileList) => void", defaultValue: "-", description: zh ? "超过限制时触发。" : "Fires when the limit is exceeded." },
            { prop: "onProgress / onSuccess / onError", type: "upload lifecycle callbacks", defaultValue: "-", description: zh ? "上传生命周期回调。" : "Upload lifecycle callbacks." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "submit", type: "() => Promise<void>", defaultValue: "-", description: zh ? "手动开始上传 ready 文件。" : "Starts uploading ready files." },
            { prop: "abort", type: "() => void", defaultValue: "-", description: zh ? "中止当前请求。" : "Aborts the active request." },
            { prop: "clearFiles", type: "() => void", defaultValue: "-", description: zh ? "清空队列。" : "Clears the queue." },
            { prop: "getFiles", type: "() => UploadFile[]", defaultValue: "-", description: zh ? "读取当前队列。" : "Reads the current queue." },
            { prop: "setFiles / retryFile", type: "ref methods", defaultValue: "-", description: zh ? "替换队列或重试指定文件。" : "Replaces the queue or retries a file." }
          ]
        }
      ]
    },
    {
      id: "cascader",
      group: labels.groups.form,
      title: zh ? "Cascader 级联选择" : "Cascader",
      description: zh ? "多层路线选择器，支持筛选、清空、懒加载、自定义节点、键盘导航、展开事件和方法调用。" : "Layered route selection with filtering, clear action, lazy loading, custom nodes, keyboard navigation, expand events, and methods.",
      searchText: "multi cascader multiple 多选 多路线 selection route",
      preview: (
        <Cascader
          clearable
          filterable
          lazy
          loadData={async () => [
            { value: "archive-a", label: zh ? "归档 A" : "Archive A", isLeaf: true },
            { value: "archive-b", label: zh ? "归档 B" : "Archive B", isLeaf: true }
          ]}
          onValueChange={(value) => setCascaderValue(value as string[])}
          options={[...routeOptions, { value: "archive", label: zh ? "归档路线" : "Archive routes" }]}
          renderOption={(option) => <span>{option.label}</span>}
          value={cascaderValue}
        />
      ),
      code: code([
        'import { Cascader } from "pinepost-ui";',
        "",
        "<Cascader",
        "  clearable",
        "  filterable",
        "  lazy",
        "  loadData={loadRouteChildren}",
        "  options={routeOptions}",
        "  renderOption={(option) => <span>{option.label}</span>}",
        "  value={value}",
        "  onValueChange={setValue}",
        "/>"
      ]),
      recipes: [
        {
          title: zh ? "远程路线分层" : "Remote route levels",
          description: zh ? "懒加载只在展开分支时请求下一级，适合大规模网点树。" : "Lazy loading fetches the next level only when a branch opens.",
          preview: (
            <Cascader
              lazy
              options={[{ value: "region", label: zh ? "片区" : "Region" }]}
              loadData={async () => [{ value: "cedar", label: zh ? "雪松站" : "Cedar station", isLeaf: true }]}
              placeholder={zh ? "选择网点" : "Choose station"}
            />
          ),
          code: code([
            "<Cascader",
            "  lazy",
            "  filterable",
            "  options={regions}",
            "  loadData={(option, path) => fetchStations(option.value)}",
            "  onExpandChange={setActiveRoutePath}",
            "  onValueChange={setStationPath}",
            "/>"
          ])
        },
        {
          title: zh ? "多路线选择" : "Multi route selection",
          description: zh ? "多选模式返回完整路径数组，适合一个任务绑定多条配送路线。" : "Multiple mode returns full path arrays for tasks that target several delivery routes.",
          preview: (
            <Cascader
              multiple
              clearable
              filterable
              options={routeOptions}
              placeholder={zh ? "选择多条路线" : "Choose routes"}
              value={cascaderMultiValue}
              onValueChange={(value) => setCascaderMultiValue(value as CascaderMultipleValue)}
            />
          ),
          code: code([
            'import { Cascader, type CascaderMultipleValue } from "pinepost-ui";',
            "",
            "const [routes, setRoutes] = React.useState<CascaderMultipleValue>([]);",
            "",
            "<Cascader",
            "  multiple",
            "  clearable",
            "  filterable",
            "  options={routeOptions}",
            "  value={routes}",
            "  onValueChange={(value) => setRoutes(value as CascaderMultipleValue)}",
            "/>"
          ])
        }
      ],
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "options", type: "CascaderOption[]", defaultValue: "[]", description: zh ? "级联节点。" : "Cascading nodes." },
            { prop: "value", type: "string[] | string[][]", defaultValue: "-", description: zh ? "受控路径值；多选时为路径数组。" : "Controlled path value; multiple mode uses an array of paths." },
            { prop: "multiple", type: "boolean", defaultValue: "false", description: zh ? "启用多选叶子路径。" : "Enables multiple leaf path selection." },
            { prop: "filterable", type: "boolean", defaultValue: "false", description: zh ? "启用筛选输入。" : "Enables option filtering." },
            { prop: "showAllLevels", type: "boolean", defaultValue: "true", description: zh ? "显示完整路径或只显示末级。" : "Shows full path or only the leaf label." },
            { prop: "lazy", type: "boolean", defaultValue: "false", description: zh ? "展开无子节点的分支时懒加载。" : "Loads branch children when an empty branch opens." },
            { prop: "loadData", type: "(option, path) => Promise<CascaderOption[]>", defaultValue: "-", description: zh ? "懒加载子节点。" : "Loads lazy children." },
            { prop: "renderOption", type: "(option, state) => ReactNode", defaultValue: "-", description: zh ? "自定义菜单节点内容。" : "Custom menu option content." }
          ]
        },
        {
          title: labels.options,
          rows: [
            { prop: "CascaderOption", type: "{ value; label; children?; disabled?; isLeaf? }", defaultValue: "-", description: zh ? "节点数据结构。" : "Node data shape." },
            { prop: "CascaderValue", type: "string[]", defaultValue: "-", description: zh ? "单选路径值。" : "Single selected path." },
            { prop: "CascaderMultipleValue", type: "string[][]", defaultValue: "-", description: zh ? "多选完整路径列表。" : "Multiple selected paths." },
            { prop: "renderOption state", type: "{ active; leaf; level; loading; path }", defaultValue: "-", description: zh ? "渲染函数状态参数。" : "Render callback state." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value, selectedOptions) => void", defaultValue: "-", description: zh ? "选择变化时触发；多选时返回 string[][] 和 CascaderOption[][]。" : "Fires when selection changes; multiple mode returns string[][] and CascaderOption[][]." },
            { prop: "onExpandChange", type: "(value: string[]) => void", defaultValue: "-", description: zh ? "展开层级变化。" : "Expanded path changes." },
            { prop: "onVisibleChange", type: "(open: boolean) => void", defaultValue: "-", description: zh ? "面板显示状态变化。" : "Panel visibility changes." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "focus / blur / clear", type: "CascaderRef", defaultValue: "-", description: zh ? "聚焦、失焦和清空。" : "Focus, blur, and clear." }
          ]
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "ArrowUp / ArrowDown", type: "keyboard", defaultValue: "-", description: zh ? "在当前菜单内移动焦点。" : "Moves focus inside the current menu." },
            { prop: "ArrowRight / ArrowLeft", type: "keyboard", defaultValue: "-", description: zh ? "进入或返回相邻层级。" : "Moves into or back from adjacent levels." },
            { prop: "Enter", type: "keyboard", defaultValue: "-", description: zh ? "展开分支或选择叶子节点。" : "Expands a branch or selects a leaf." },
            { prop: "Escape", type: "keyboard", defaultValue: "-", description: zh ? "关闭面板并回到触发器。" : "Closes the panel and returns to the trigger." }
          ]
        }
      ]
    },
    {
      id: "tree-select",
      group: labels.groups.form,
      title: zh ? "TreeSelect 树形选择" : "TreeSelect",
      description: zh ? "树结构选择器，支持单选、多选、筛选、懒加载、自定义节点和节点点击事件。" : "Tree selector with single or multiple selection, filtering, lazy loading, custom nodes, and node events.",
      preview: (
        <TreeSelect
          clearable
          data={[{ value: "routes", label: zh ? "路线分组" : "Route group" }]}
          filterable
          lazy
          loadData={async () => [
            { value: "cedar", label: zh ? "雪松桌" : "Cedar desk", isLeaf: true },
            { value: "moss", label: zh ? "苔藓桌" : "Moss desk", isLeaf: true }
          ]}
          onValueChange={setTreeSelectValue}
          placeholder={zh ? "选择路线" : "Choose route"}
          renderNode={(node) => <span>{node.label}</span>}
          value={treeSelectValue}
        />
      ),
      code: code([
        'import { TreeSelect } from "pinepost-ui";',
        "",
        "<TreeSelect",
        "  clearable",
        "  filterable",
        "  lazy",
        "  data={routeOptions}",
        "  loadData={loadRouteChildren}",
        "  renderNode={(node) => <span>{node.label}</span>}",
        "  value={value}",
        "  onValueChange={setValue}",
        "/>"
      ]),
      recipes: [
        {
          title: zh ? "部门权限树" : "Permission tree picker",
          description: zh ? "多选、筛选和懒加载组合适合组织、仓位和权限范围。" : "Multiple selection, filtering, and lazy loading fit organization or scope pickers.",
          preview: (
            <TreeSelect
              multiple
              filterable
              data={[{ value: "north", label: zh ? "北线团队" : "North team", children: [{ value: "dispatch", label: zh ? "调度" : "Dispatch" }] }]}
              placeholder={zh ? "选择可见范围" : "Choose visibility scope"}
            />
          ),
          code: code([
            "<TreeSelect",
            "  multiple",
            "  filterable",
            "  data={departmentTree}",
            "  defaultExpanded={['north']}",
            "  onNodeClick={trackNode}",
            "  onValueChange={setScopes}",
            "/>"
          ])
        }
      ],
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "data", type: "TreeSelectOption[]", defaultValue: "[]", description: zh ? "树节点。" : "Tree nodes." },
            { prop: "multiple", type: "boolean", defaultValue: "false", description: zh ? "启用多选。" : "Enables multiple selection." },
            { prop: "defaultExpanded", type: "string[]", defaultValue: "[]", description: zh ? "默认展开节点。" : "Initially expanded nodes." },
            { prop: "lazy", type: "boolean", defaultValue: "false", description: zh ? "展开无子节点的分支时懒加载。" : "Loads branch children when an empty branch opens." },
            { prop: "loadData", type: "(node) => Promise<TreeSelectOption[]>", defaultValue: "-", description: zh ? "懒加载节点数据。" : "Loads lazy node children." },
            { prop: "renderNode", type: "(node) => ReactNode", defaultValue: "-", description: zh ? "自定义节点内容。" : "Custom node content." }
          ]
        },
        {
          title: labels.options,
          rows: [
            { prop: "TreeSelectOption.children", type: "TreeSelectOption[]", defaultValue: "-", description: zh ? "子节点。" : "Child nodes." },
            { prop: "TreeSelectOption.disabled", type: "boolean", defaultValue: "false", description: zh ? "禁用节点。" : "Disabled node." },
            { prop: "TreeSelectOption.isLeaf", type: "boolean", defaultValue: "false", description: zh ? "标记为叶子节点，懒加载时不会继续请求。" : "Marks a lazy node as a leaf." }
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
          onValueChange={(value) => setVirtualSelectValue(Array.isArray(value) ? value[0] ?? "" : value)}
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
      description: zh ? "数据表格支持列组、固定列、排序、筛选、选择、展开行、汇总行和内联编辑。" : "Data table with column groups, fixed columns, sorting, filtering, selection, row expansion, summaries, and inline editing.",
      searchText: "table preset view preset 视图预设 release notes release draft preset workflow",
      preview: (
        <Table
          rowKey="id"
          selectable
          editable
          density="compact"
          filterTags={[{ key: "status", label: zh ? "状态：就绪" : "Status: Ready" }]}
          onFilterClear={showToast}
          resizableColumns
          defaultViewPreset="full"
          viewStorageKey="pinepost-demo-table-view"
          viewPresetLabel={zh ? "视图" : "View"}
          viewPresets={[
            { key: "full", label: zh ? "完整" : "Full", columnWidths: { route: 140, count: 90 }, hiddenColumns: [] },
            { key: "compact", label: zh ? "紧凑" : "Compact", columnWidths: { route: 112, count: 76 }, hiddenColumns: ["status"], sortState: { key: "count", order: "desc" } }
          ]}
          defaultExpandedRowKeys={["a7"]}
          renderExpandedRow={(row) => <Text>{zh ? `${row.route} 今日优先投递。` : `${row.route} ships first today.`}</Text>}
          summary={(rows) => ({ route: zh ? "合计" : "Total", count: rows.reduce((total, row) => total + row.count, 0) })}
          columns={[
            { key: "desk", title: zh ? "桌台" : "Desk", fixed: "left", width: 120 },
            {
              key: "delivery",
              title: zh ? "投递" : "Delivery",
              children: [
                { key: "route", title: zh ? "路线" : "Route", editable: true, sortable: true, width: 110 },
                { key: "count", title: zh ? "数量" : "Count", align: "right", sortable: true, width: 90 }
              ]
            },
            { key: "status", title: zh ? "状态" : "Status", fixed: "right", width: 120 }
          ]}
          data={[
            { id: "a7", desk: zh ? "雪松" : "Cedar", route: "A7", status: zh ? "就绪" : "Ready", count: 8 },
            { id: "b2", desk: zh ? "苔藓" : "Moss", route: "B2", status: zh ? "复核" : "Review", count: 3 }
          ]}
        />
      ),
      code: code([
        'import { Table } from "pinepost-ui";',
        "",
        "<Table",
        '  rowKey="id"',
        "  selectable",
        "  editable",
        '  density="compact"',
        '  filterTags={[{ key: "status", label: "状态：就绪" }]}',
        '  viewStorageKey="route-table-view"',
        "  resizableColumns",
        '  defaultViewPreset="full"',
        "  viewPresets={[",
        '    { key: "full", label: "完整", columnWidths: { route: 140, count: 90 } },',
        '    { key: "compact", label: "紧凑", hiddenColumns: ["status"], sortState: { key: "count", order: "desc" } }',
        "  ]}",
        '  defaultExpandedRowKeys={["a7"]}',
        "  renderExpandedRow={(row) => <p>{row.route} detail</p>}",
        "  summary={(rows) => ({ count: rows.reduce((sum, row) => sum + row.count, 0) })}",
        "  columns={[",
        '    { key: "desk", title: "桌台", fixed: "left", width: 120 },',
        '    { key: "delivery", title: "投递", children: [',
        '      { key: "route", title: "路线", editable: true, sortable: true },',
        '      { key: "count", title: "数量", align: "right" }',
        "    ]},",
        '    { key: "status", title: "状态", fixed: "right", width: 120 }',
        "  ]}",
        '  data={[{ id: "a7", desk: "雪松", route: "A7", count: 8, status: "就绪" }]}',
        "/>"
      ]),
      recipes: [
        {
          title: zh ? "业务表格配置台" : "Product table settings",
          description: zh ? "列顺序、隐藏列和密度可以交给 TableColumnSettings 管理并持久化。" : "Column order, visibility, and density can be managed and persisted with TableColumnSettings.",
          preview: (
            <div className="docs-field-grid">
              <TableColumnSettings
                columns={[
                  { key: "route", title: zh ? "路线" : "Route" },
                  { key: "count", title: zh ? "数量" : "Count" },
                  { key: "status", title: zh ? "状态" : "Status" }
                ]}
                value={tableSettings}
                onValueChange={setTableSettings}
                storageKey="pinepost-demo-table-settings"
              />
              <Table
                rowKey="route"
                density={tableSettings.density}
                hiddenColumns={tableSettings.hiddenColumns}
                columnOrder={tableSettings.columnOrder}
                columns={[
                  { key: "route", title: zh ? "路线" : "Route" },
                  { key: "count", title: zh ? "数量" : "Count", align: "right" },
                  { key: "status", title: zh ? "状态" : "Status" }
                ]}
                data={[
                  { route: "A7", count: 8, status: zh ? "就绪" : "Ready" },
                  { route: "B2", count: 3, status: zh ? "复核" : "Review" }
                ]}
              />
            </div>
          ),
          code: code([
            'import { Table, TableColumnSettings } from "pinepost-ui";',
            "",
            "const [settings, setSettings] = React.useState({",
            "  hiddenColumns: [],",
            "  columnOrder: ['route', 'count', 'status'],",
            "  density: 'compact'",
            "});",
            "",
            "<TableColumnSettings",
            "  columns={columns}",
            "  value={settings}",
            "  onValueChange={setSettings}",
            "  storageKey=\"route-table-settings\"",
            "/>",
            "<Table",
            "  columns={columns}",
            "  data={rows}",
            "  columnOrder={settings.columnOrder}",
            "  hiddenColumns={settings.hiddenColumns}",
            "  density={settings.density}",
            "/>"
          ])
        },
        {
          title: zh ? "视图预设导出" : "View preset export",
          description: zh ? "将产品表格的列顺序、隐藏列、列宽和排序保存成可迁移 JSON。" : "Save product table order, visibility, widths, and sorting as portable JSON.",
          preview: (
            <div className="docs-field-grid">
              <Table
                rowKey="route"
                density="compact"
                defaultViewPreset="ops"
                viewPresetLabel={zh ? "预设" : "Preset"}
                viewPresets={[
                  { key: "ops", label: zh ? "运营视图" : "Operations", columnOrder: ["route", "status", "count"], columnWidths: { route: 160, status: 120 }, sortState: { key: "route", order: "asc" } },
                  { key: "review", label: zh ? "复核视图" : "Review", columnOrder: ["status", "route", "count"], hiddenColumns: ["count"], sortState: { key: "count", order: "desc" } }
                ]}
                columns={[
                  { key: "route", title: zh ? "路线" : "Route", sortable: true },
                  { key: "count", title: zh ? "数量" : "Count", align: "right", sortable: true },
                  { key: "status", title: zh ? "状态" : "Status" }
                ]}
                data={[
                  { route: "A7", count: 8, status: zh ? "就绪" : "Ready" },
                  { route: "B2", count: 3, status: zh ? "复核" : "Review" }
                ]}
              />
              <Textarea readOnly aria-label={zh ? "表格视图预设 JSON" : "Table view preset JSON"} value={tablePresetExportText} />
            </div>
          ),
          code: code([
            'import { createTableViewPresetExport, stringifyTableViewPresetExport, Table } from "pinepost-ui";',
            "",
            "const presetJson = stringifyTableViewPresetExport(",
            "  createTableViewPresetExport({",
            '    activeKey: "ops",',
            "    presets: viewPresets",
            "  })",
            ");",
            "",
            "<Table viewPresets={viewPresets} defaultViewPreset=\"ops\" />"
          ])
        },
        {
          title: zh ? "进入 Recipe Bundle" : "Add to Recipe Bundle",
          description: zh ? "表格视图预设可以和主题集合、排期快捷项组合成一份配方包。" : "Table view presets can join theme collections and scheduling shortcuts in one bundle.",
          preview: (
            <div className="docs-field-grid">
              <Alert
                title={zh ? "表格视图已加入配方包" : "Table view added to bundle"}
                description={zh ? "导出的 TableViewPresetExport 会作为 tableViewPresets 字段保存。" : "The exported TableViewPresetExport is saved as tableViewPresets."}
                variant="success"
              />
              <Textarea readOnly aria-label={zh ? "表格配方包字段" : "Table bundle field"} value={'"tableViewPresets": { "version": 1, "activeKey": "ops", "presets": [...] }'} />
            </div>
          ),
          code: code([
            'import { createPinepostRecipeBundle, createTableViewPresetExport } from "pinepost-ui";',
            "",
            "const tableViewPresets = createTableViewPresetExport({",
            '  activeKey: "ops",',
            "  presets: viewPresets",
            "});",
            "",
            "const bundle = createPinepostRecipeBundle({",
            '  id: "ops-kit",',
            '  name: "Ops kit",',
            '  recipeIds: ["operations-table"],',
            "  tableViewPresets",
            "});"
          ])
        }
      ],
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "columns", type: "TableColumn<T>[]", defaultValue: "[]", description: zh ? "列配置。" : "Column config." },
            { prop: "data", type: "T[]", defaultValue: "[]", description: zh ? "表格数据。" : "Table data." },
            { prop: "rowKey", type: "keyof T | function", defaultValue: "index", description: zh ? "行 key。" : "Row key." },
            { prop: "selectable", type: "boolean", defaultValue: "false", description: zh ? "显示行选择列。" : "Shows row selection." },
            { prop: "editable", type: "boolean", defaultValue: "false", description: zh ? "允许可编辑列双击编辑。" : "Allows double-click editing on editable columns." },
            { prop: "density", type: '"compact" | "comfortable" | "spacious"', defaultValue: "comfortable", description: zh ? "表格行距密度。" : "Table spacing density." },
            { prop: "filterTags", type: "TableFilterTag[]", defaultValue: "[]", description: zh ? "当前筛选条件标签。" : "Current filter chips." },
            { prop: "expandedRowKeys / defaultExpandedRowKeys", type: "React.Key[]", defaultValue: "[]", description: zh ? "受控或默认展开行。" : "Controlled or default expanded rows." },
            { prop: "summary", type: "Record | (rows) => Record", defaultValue: "-", description: zh ? "汇总行内容。" : "Summary row content." },
            { prop: "resizableColumns", type: "boolean", defaultValue: "false", description: zh ? "显示列宽调整控件。" : "Shows column resize controls." },
            { prop: "columnOrder / defaultColumnOrder", type: "string[]", defaultValue: "columns order", description: zh ? "受控或默认顶层列顺序。" : "Controlled or default top-level column order." },
            { prop: "columnWidths / defaultColumnWidths", type: "Record<string, number | string>", defaultValue: "{}", description: zh ? "受控或默认列宽映射。" : "Controlled or default column width map." },
            { prop: "hiddenColumns / defaultHiddenColumns", type: "string[]", defaultValue: "[]", description: zh ? "受控或默认隐藏列 key。" : "Controlled or default hidden column keys." },
            { prop: "viewPresets", type: "TableViewPreset<T>[]", defaultValue: "[]", description: zh ? "预设列宽、隐藏列和排序视图。" : "Preset widths, hidden columns, and sort views." },
            { prop: "viewPreset / defaultViewPreset", type: "string", defaultValue: "-", description: zh ? "受控或默认视图 key。" : "Controlled or default view key." },
            { prop: "viewPresetLabel", type: "ReactNode", defaultValue: "View", description: zh ? "视图切换组标签。" : "View switcher label." },
            { prop: "viewStorageKey", type: "string", defaultValue: "-", description: zh ? "将视图 key 保存到 localStorage。" : "Persists the view key in localStorage." }
          ]
        },
        {
          title: labels.options,
          rows: [
            { prop: "TableColumnSettings", type: "{ columns; value?; defaultValue?; storageKey? }", defaultValue: "-", description: zh ? "列显示、顺序和密度设置面板。" : "Column visibility, order, and density settings panel." },
            { prop: "TableViewPreset", type: "{ key; label; columnWidths?; columnOrder?; hiddenColumns?; sortState? }", defaultValue: "-", description: zh ? "表格视图配方。" : "Table view recipe." },
            { prop: "createTableViewPresetExport", type: "({ activeKey, presets }) => TableViewPresetExport", defaultValue: "-", description: zh ? "生成可迁移的表格视图预设 JSON 数据。" : "Creates portable table view preset JSON data." },
            { prop: "parseTableViewPresetExport", type: "(json) => TableViewPresetParseResult", defaultValue: "-", description: zh ? "解析并校验表格视图预设 JSON。" : "Parses and validates table view preset JSON." },
            { prop: "TableColumn.sortable", type: "boolean | compareFn", defaultValue: "false", description: zh ? "启用列排序。" : "Enables column sorting." },
            { prop: "TableColumn.filter", type: "(row) => boolean", defaultValue: "-", description: zh ? "列过滤函数。" : "Column filter predicate." },
            { prop: "TableColumn.render", type: "(row, index) => ReactNode", defaultValue: "-", description: zh ? "自定义单元格。" : "Custom cell rendering." },
            { prop: "TableColumn.editable", type: "boolean", defaultValue: "false", description: zh ? "列是否可编辑。" : "Whether the column can be edited." },
            { prop: "TableColumn.children", type: "TableColumn<T>[]", defaultValue: "-", description: zh ? "列组子列。" : "Child columns for a grouped header." },
            { prop: "TableColumn.fixed", type: '"left" | "right"', defaultValue: "-", description: zh ? "固定在表格左侧或右侧。" : "Fixes a column to the left or right edge." },
            { prop: "TableColumn.width", type: "number | string", defaultValue: "-", description: zh ? "列宽，固定列推荐设置。" : "Column width, recommended for fixed columns." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onSortChange", type: "(state?) => void", defaultValue: "-", description: zh ? "排序变化。" : "Sort changes." },
            { prop: "onSelectionChange", type: "(rows) => void", defaultValue: "-", description: zh ? "行选择变化。" : "Selection changes." },
            { prop: "onCurrentChange", type: "(row?) => void", defaultValue: "-", description: zh ? "当前行变化。" : "Current row changes." },
            { prop: "onCellEdit", type: "(row, key, value) => void", defaultValue: "-", description: zh ? "单元格提交编辑。" : "Cell edit is committed." },
            { prop: "onExpandChange", type: "(keys) => void", defaultValue: "-", description: zh ? "展开行变化。" : "Expanded rows change." },
            { prop: "onFilterClear", type: "(key?) => void", defaultValue: "-", description: zh ? "清除单个或全部筛选标签。" : "Clears one or all filter chips." },
            { prop: "onColumnResize", type: "(key, width, widths) => void", defaultValue: "-", description: zh ? "列宽变化。" : "Column width changes." },
            { prop: "onColumnOrderChange", type: "(keys) => void", defaultValue: "-", description: zh ? "顶层列顺序变化。" : "Top-level column order changes." },
            { prop: "onColumnVisibilityChange", type: "(keys) => void", defaultValue: "-", description: zh ? "隐藏列变化。" : "Hidden columns change." },
            { prop: "onViewPresetChange", type: "(key, preset) => void", defaultValue: "-", description: zh ? "视图预设变化。" : "View preset changes." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "toggleRowSelection / clearSelection", type: "ref methods", defaultValue: "-", description: zh ? "控制行选择。" : "Controls row selection." },
            { prop: "sort / clearSort", type: "ref methods", defaultValue: "-", description: zh ? "控制排序。" : "Controls sorting." },
            { prop: "toggleRowExpansion / clearExpansion", type: "ref methods", defaultValue: "-", description: zh ? "控制展开行。" : "Controls expanded rows." },
            { prop: "getSelectionRows / getExpandedRows", type: "ref methods", defaultValue: "-", description: zh ? "读取当前状态行。" : "Reads stateful rows." },
            { prop: "setColumnOrder / getColumnOrder / resetColumnOrder", type: "ref methods", defaultValue: "-", description: zh ? "命令式调整、读取或重置列顺序。" : "Sets, reads, or resets column order." },
            { prop: "setColumnWidth / setColumnHidden", type: "ref methods", defaultValue: "-", description: zh ? "命令式调整列宽和隐藏状态。" : "Imperatively updates column width and visibility." },
            { prop: "getVisibleColumns", type: "ref method", defaultValue: "-", description: zh ? "读取当前可见列。" : "Reads currently visible columns." },
            { prop: "setViewPreset / getViewPreset", type: "ref methods", defaultValue: "-", description: zh ? "命令式切换或读取视图预设。" : "Sets or reads the active view preset." }
          ]
        }
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
      description: zh ? "用于路线、目录和分组层级，支持选择、勾选、过滤和懒加载节点。" : "A tree for routes, folders, and grouped hierarchy with selection, checking, filtering, and lazy nodes.",
      preview: (
        <Tree
          lazy
          checkable
          loadData={async () => [{ value: "north-lane", label: zh ? "北线投递" : "North lane", isLeaf: true }]}
          items={[{ value: "routes", label: zh ? "路线" : "Routes" }]}
        />
      ),
      code: code([
        'import { Tree } from "pinepost-ui";',
        "",
        "<Tree",
        "  lazy",
        "  checkable",
        "  loadData={async (node) => [{ value: `${node.value}-north`, label: '北线', isLeaf: true }]}",
        "  items={[{ value: 'routes', label: '路线' }]}",
        "/>"
      ]),
      api: [],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "items", type: "TreeItem[]", defaultValue: "[]", description: zh ? "树节点。" : "Tree nodes." },
            { prop: "checkable", type: "boolean", defaultValue: "false", description: zh ? "显示复选框。" : "Shows checkboxes." },
            { prop: "expandedKeys / defaultExpanded", type: "string[]", defaultValue: "[]", description: zh ? "受控或默认展开节点。" : "Controlled or default expanded nodes." },
            { prop: "checkedKeys / defaultCheckedKeys", type: "string[]", defaultValue: "[]", description: zh ? "受控或默认勾选节点。" : "Controlled or default checked nodes." },
            { prop: "lazy", type: "boolean", defaultValue: "false", description: zh ? "启用懒加载分支。" : "Enables lazy branches." },
            { prop: "loadData", type: "(item) => Promise<TreeItem[]>", defaultValue: "-", description: zh ? "展开未加载分支时获取子节点。" : "Loads children for an unloaded branch." }
          ]
        },
        {
          title: labels.options,
          rows: [
            { prop: "TreeItem", type: "{ value; label; children?; disabled?; isLeaf? }", defaultValue: "-", description: zh ? "节点数据结构。" : "Node data shape." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onSelect", type: "(value) => void", defaultValue: "-", description: zh ? "叶子节点选择。" : "Leaf selection." },
            { prop: "onNodeClick", type: "(item) => void", defaultValue: "-", description: zh ? "节点点击。" : "Node click." },
            { prop: "onExpandChange", type: "(keys) => void", defaultValue: "-", description: zh ? "展开变化。" : "Expanded keys change." },
            { prop: "onCheckChange", type: "(keys) => void", defaultValue: "-", description: zh ? "勾选变化。" : "Checked keys change." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "filter", type: "(query) => void", defaultValue: "-", description: zh ? "按文本过滤节点。" : "Filters nodes by text." },
            { prop: "setExpandedKeys / getExpandedKeys", type: "ref methods", defaultValue: "-", description: zh ? "设置或读取展开节点。" : "Sets or reads expanded keys." },
            { prop: "setCheckedKeys / getCheckedKeys / clearChecked", type: "ref methods", defaultValue: "-", description: zh ? "设置、读取或清空勾选。" : "Sets, reads, or clears checked keys." }
          ]
        }
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

  const splitDocs: DocItem[] = [
    {
      id: "icon",
      group: labels.groups.basic,
      title: zh ? "Icon 图标" : "Icon",
      description: zh ? "原创线性图标，用于邮戳、包裹、路线和提示等 Pinepost 语义。" : "Original line icons for Pinepost actions and surfaces.",
      preview: (
        <Space size="lg">
          <Icon name="mail" label={zh ? "信件" : "Mail"} />
          <Icon name="parcel" label={zh ? "包裹" : "Parcel"} />
          <Icon name="stamp" label={zh ? "邮戳" : "Stamp"} />
          <Icon name="leaf" label={zh ? "叶片" : "Leaf"} />
        </Space>
      ),
      code: code(['import { Icon } from "pinepost-ui";', "", '<Icon name="stamp" label="邮戳" />']),
      api: [
        { prop: "name", type: '"mail" | "parcel" | "stamp" | "leaf" | "pin"', defaultValue: "-", description: zh ? "图标名称。" : "Icon name." },
        { prop: "size", type: "number | string", defaultValue: "24", description: zh ? "图标尺寸。" : "Icon size." },
        { prop: "label", type: "string", defaultValue: "-", description: zh ? "可访问名称。" : "Accessible label." }
      ]
    },
    {
      id: "checkbox",
      group: labels.groups.form,
      title: zh ? "Checkbox 多选框" : "Checkbox",
      description: zh ? "用于开关单个二元选项，可组合表单说明文字。" : "A binary check control that can be paired with field copy.",
      preview: <Checkbox defaultChecked aria-label={zh ? "附加路线标签" : "Attach route label"} />,
      code: code(['import { Checkbox } from "pinepost-ui";', "", '<Checkbox aria-label="附加路线标签" />']),
      api: [
        { prop: "checked", type: "boolean | indeterminate", defaultValue: "-", description: zh ? "受控选中状态。" : "Controlled checked state." },
        { prop: "onCheckedChange", type: "(checked) => void", defaultValue: "-", description: zh ? "选中变化回调。" : "Checked change callback." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: zh ? "禁用控件。" : "Disables the control." }
      ]
    },
    {
      id: "switch",
      group: labels.groups.form,
      title: zh ? "Switch 开关" : "Switch",
      description: zh ? "用于立即生效的开关设置。" : "A switch for immediate boolean settings.",
      preview: <Switch defaultChecked aria-label={zh ? "静默配送" : "Quiet delivery"} />,
      code: code(['import { Switch } from "pinepost-ui";', "", '<Switch aria-label="静默配送" defaultChecked />']),
      api: [
        { prop: "checked", type: "boolean", defaultValue: "-", description: zh ? "受控状态。" : "Controlled state." },
        { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultValue: "-", description: zh ? "状态变化回调。" : "Change callback." }
      ]
    },
    {
      id: "radio-group",
      group: labels.groups.form,
      title: zh ? "RadioGroup 单选组" : "RadioGroup",
      description: zh ? "用于在少量互斥选项中选择一项。" : "Choose one item from a small set of options.",
      preview: <RadioGroup defaultValue="standard" options={[{ value: "standard", label: zh ? "标准" : "Standard" }, { value: "express", label: zh ? "加急" : "Express" }]} />,
      code: code(['import { RadioGroup } from "pinepost-ui";', "", '<RadioGroup options={[{ value: "standard", label: "标准" }]} />']),
      api: [
        { prop: "options", type: "RadioOption[]", defaultValue: "[]", description: zh ? "单选项。" : "Radio options." },
        { prop: "value", type: "string", defaultValue: "-", description: zh ? "受控值。" : "Controlled value." }
      ]
    },
    {
      id: "slider",
      group: labels.groups.form,
      title: zh ? "Slider 滑块" : "Slider",
      description: zh ? "用于范围内的数字输入。" : "Numeric range input.",
      preview: <Slider defaultValue={[40]} max={100} step={5} aria-label={zh ? "路线强度" : "Route intensity"} />,
      code: code(['import { Slider } from "pinepost-ui";', "", '<Slider defaultValue={[40]} max={100} step={5} />']),
      api: [
        { prop: "value", type: "number[]", defaultValue: "-", description: zh ? "受控值。" : "Controlled value." },
        { prop: "onValueChange", type: "(value: number[]) => void", defaultValue: "-", description: zh ? "滑动回调。" : "Change callback." }
      ]
    },
    {
      id: "color-picker-panel",
      group: labels.groups.form,
      title: zh ? "ColorPickerPanel 颜色面板" : "ColorPickerPanel",
      description: zh ? "独立颜色面板，适合主题编辑和活动配置。" : "A standalone color panel for theme and campaign editing.",
      preview: <ColorPickerPanel value="#4f8f5f" presets={["#4f8f5f", "#c9624b", "#87b9c9"]} />,
      code: code(['import { ColorPickerPanel } from "pinepost-ui";', "", '<ColorPickerPanel presets={["#4f8f5f", "#c9624b"]} />']),
      api: [
        { prop: "value", type: "string", defaultValue: "-", description: zh ? "受控颜色。" : "Controlled color." },
        { prop: "presets", type: "string[]", defaultValue: "[]", description: zh ? "预设色板。" : "Preset swatches." },
        { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "颜色变化回调。" : "Change callback." }
      ]
    },
    {
      id: "date-picker-panel",
      group: labels.groups.form,
      title: zh ? "DatePickerPanel 日期面板" : "DatePickerPanel",
      description: zh ? "可嵌入的日期面板，支持快捷日期和禁用日期。" : "Embeddable date panel with shortcuts and disabled dates.",
      preview: <DatePickerPanel value={new Date(2026, 4, 17)} shortcuts={datePresets} />,
      code: code(['import { DatePickerPanel, createPinepostDatePresets } from "pinepost-ui";', "", "const shortcuts = createPinepostDatePresets({ locale: 'zh-CN' });", "<DatePickerPanel shortcuts={shortcuts} />"]),
      recipes: [
        {
          title: zh ? "活动日期快捷项" : "Campaign date shortcuts",
          description: zh ? "快捷项可以封装业务日期，disabledDate 保留不可投递日期。" : "Shortcuts can encode product dates while disabledDate blocks unavailable days.",
          preview: <DatePickerPanel value={new Date(2026, 4, 18)} disabledDate={(date) => date.getDay() === 0} shortcuts={[{ label: zh ? "下个工作日" : "Next workday", value: () => new Date(2026, 4, 18) }]} />,
          code: code([
            "<DatePickerPanel",
            "  value={shipDate}",
            "  disabledDate={(date) => date.getDay() === 0}",
            "  shortcuts={[{ label: '下个工作日', value: nextWorkday }]}",
            "  onValueChange={setShipDate}",
            "/>"
          ])
        }
      ],
      api: [
        { prop: "shortcuts", type: "DatePickerShortcut[]", defaultValue: "[]", description: zh ? "快捷日期。" : "Shortcut dates." },
        { prop: "disabledDate", type: "(date: Date) => boolean", defaultValue: "-", description: zh ? "禁用日期判断。" : "Disabled date predicate." },
        { prop: "onValueChange", type: "(date: Date) => void", defaultValue: "-", description: zh ? "日期变化回调。" : "Date change callback." },
        { prop: "createPinepostDatePresets", type: "(options?) => DatePickerShortcut[]", defaultValue: "-", description: zh ? "生成今天、明天等单日快捷项。" : "Creates single-date shortcuts such as today and tomorrow." }
      ]
    },
    {
      id: "date-range-picker-panel",
      group: labels.groups.form,
      title: zh ? "DateRangePickerPanel 日期范围面板" : "DateRangePickerPanel",
      description: zh ? "选择开始和结束日期，适合排班、活动和报表范围。" : "Selects start and end dates for schedules, campaigns, and report ranges.",
      searchText: "preset scheduling 排期 快捷预设 date range shortcuts",
      preview: (
        <Space direction="vertical">
          <DateRangePickerPanel
            month={new Date(2026, 4, 1)}
            value={dateRangeValue}
            onValueChange={setDateRangeValue}
            shortcuts={[{ label: zh ? "节庆周" : "Festival week", value: () => [new Date(2026, 4, 18), new Date(2026, 4, 24)] }]}
          />
          <Text>{formatPinepostDateRange(dateRangeValue, { locale })}</Text>
        </Space>
      ),
      code: code([
        'import { DateRangePickerPanel, formatPinepostDateRange } from "pinepost-ui";',
        "",
        "<DateRangePickerPanel",
        "  value={range}",
        "  onValueChange={setRange}",
        "  shortcuts={[{ label: '节庆周', value: () => [start, end] }]}",
        "/>",
        "",
        "formatPinepostDateRange(range, { locale: 'zh-CN' })"
      ]),
      recipes: [
        {
          title: zh ? "报表范围选择" : "Report range picker",
          description: zh ? "用格式化 helper 直接输出已选范围，适合报表筛选栏。" : "Use the formatting helper to render the selected range in report filters.",
          preview: (
            <Space direction="vertical">
              <DateRangePickerPanel value={[new Date(2026, 4, 10), new Date(2026, 4, 17)]} shortcuts={[{ label: zh ? "最近 7 天" : "Last 7 days", value: () => [new Date(2026, 4, 10), new Date(2026, 4, 17)] }]} />
              <Tag>{formatPinepostDateRange([new Date(2026, 4, 10), new Date(2026, 4, 17)], { locale })}</Tag>
            </Space>
          ),
          code: code([
            "<DateRangePickerPanel",
            "  value={range}",
            "  onValueChange={setRange}",
            "  shortcuts={[{ label: '最近 7 天', value: lastSevenDays }]}",
            "/>",
            "const label = formatPinepostDateRange(range, { locale: 'zh-CN' });"
          ])
        },
        {
          title: zh ? "运营排期快捷预设" : "Scheduling presets",
          description: zh ? "内置 helper 可以生成最近 7 天、本周等常用范围。" : "Built-in helpers create common ranges such as last 7 days and this week.",
          preview: (
            <Space direction="vertical">
              <DateRangePickerPanel value={dateRangeValue} onValueChange={setDateRangeValue} shortcuts={dateRangePresets} />
              <Tag>{formatPinepostDateRange(dateRangeValue, { locale })}</Tag>
            </Space>
          ),
          code: code([
            'import { DateRangePickerPanel, createPinepostDateRangePresets } from "pinepost-ui";',
            "",
            "const shortcuts = createPinepostDateRangePresets({ locale: 'zh-CN' });",
            "<DateRangePickerPanel shortcuts={shortcuts} value={range} onValueChange={setRange} />"
          ])
        }
      ],
      api: [
        { prop: "value / defaultValue", type: "[Date?, Date?]", defaultValue: "-", description: zh ? "受控或默认日期范围。" : "Controlled or default date range." },
        { prop: "shortcuts", type: "DateRangeShortcut[]", defaultValue: "[]", description: zh ? "快捷日期范围。" : "Shortcut ranges." },
        { prop: "disabledDate", type: "(date: Date) => boolean", defaultValue: "-", description: zh ? "禁用日期判断。" : "Disabled date predicate." },
        { prop: "onValueChange", type: "(range) => void", defaultValue: "-", description: zh ? "范围变化回调。" : "Range change callback." },
        { prop: "formatPinepostDate / formatPinepostDateRange", type: "helpers", defaultValue: "-", description: zh ? "格式化日期或日期范围。" : "Formats a date or date range." },
        { prop: "createPinepostDateRangePresets", type: "(options?) => DateRangeShortcut[]", defaultValue: "-", description: zh ? "生成最近 7 天、本周等快捷范围。" : "Creates shortcuts such as last 7 days and this week." }
      ]
    },
    {
      id: "time-picker-panel",
      group: labels.groups.form,
      title: zh ? "TimePickerPanel 时间面板" : "TimePickerPanel",
      description: zh ? "独立时间面板，按起止时间和步长生成可点击时间点。" : "Standalone time panel generated from start, end, and step values.",
      preview: (
        <TimePickerPanel
          aria-label={zh ? "时间面板" : "Time panel"}
          role="group"
          value={timePanelValue}
          onValueChange={setTimePanelValue}
          start="09:00"
          end="12:00"
          step="00:30"
        />
      ),
      code: code([
        'import { TimePickerPanel } from "pinepost-ui";',
        "",
        '<TimePickerPanel value={time} onValueChange={setTime} start="09:00" end="12:00" step="00:30" />'
      ]),
      api: [
        { prop: "start / end", type: "HH:mm", defaultValue: "09:00 / 18:00", description: zh ? "时间范围。" : "Time range." },
        { prop: "step", type: "HH:mm", defaultValue: "00:30", description: zh ? "时间步长。" : "Time step." },
        { prop: "disabledTime", type: "(time: string) => boolean", defaultValue: "-", description: zh ? "禁用时间判断。" : "Disabled time predicate." },
        { prop: "onValueChange", type: "(time: string) => void", defaultValue: "-", description: zh ? "时间变化回调。" : "Time change callback." }
      ]
    },
    {
      id: "time-range-picker-panel",
      group: labels.groups.form,
      title: zh ? "TimeRangePickerPanel 时间范围面板" : "TimeRangePickerPanel",
      description: zh ? "并排选择开始和结束时间，适合配送窗口和预约时段。" : "Paired start and end time panels for delivery windows and appointments.",
      searchText: "preset scheduling 排期 快捷预设 time range shortcuts",
      preview: (
        <Space direction="vertical">
          <TimeRangePickerPanel
            value={timeRangeValue}
            onValueChange={setTimeRangeValue}
            start="09:00"
            end="12:00"
            step="00:30"
            startLabel={zh ? "开始时间" : "Start time"}
            endLabel={zh ? "结束时间" : "End time"}
          />
          <Text>{formatPinepostTimeRange(timeRangeValue, { fallback: zh ? "未定" : "Open", locale })}</Text>
        </Space>
      ),
      code: code([
        'import { TimeRangePickerPanel, formatPinepostTimeRange } from "pinepost-ui";',
        "",
        "<TimeRangePickerPanel",
        "  value={range}",
        "  onValueChange={setRange}",
        "  start=\"09:00\"",
        "  end=\"12:00\"",
        "  step=\"00:30\"",
        "/>",
        "",
        "formatPinepostTimeRange(range, { fallback: '未定', locale: 'zh-CN' })"
      ]),
      recipes: [
        {
          title: zh ? "配送窗口" : "Delivery window",
          description: zh ? "起止面板并排配置，快捷项保存常用预约时段。" : "Paired panels with shortcuts keep common appointment windows close at hand.",
          preview: (
            <TimeRangePickerPanel
              value={["10:00", "11:30"]}
              start="09:00"
              end="13:00"
              step="00:30"
              shortcuts={[{ label: zh ? "午前" : "Before noon", value: () => ["10:00", "11:30"] }]}
            />
          ),
          code: code([
            "<TimeRangePickerPanel",
            "  value={window}",
            "  onValueChange={setWindow}",
            "  start=\"09:00\"",
            "  end=\"18:00\"",
            "  shortcuts={[{ label: '午前', value: () => ['10:00', '11:30'] }]}",
            "/>"
          ])
        },
        {
          title: zh ? "运营排期快捷预设" : "Scheduling presets",
          description: zh ? "时间范围 helper 提供上午、下午、全天等常用窗口。" : "Time range helpers provide morning, afternoon, and full-day windows.",
          preview: (
            <Space direction="vertical">
              <TimeRangePickerPanel value={timeRangeValue} onValueChange={setTimeRangeValue} shortcuts={timeRangePresets} />
              <Tag>{formatPinepostTimeRange(timeRangeValue, { locale })}</Tag>
            </Space>
          ),
          code: code([
            'import { TimeRangePickerPanel, createPinepostTimeRangePresets } from "pinepost-ui";',
            "",
            "const shortcuts = createPinepostTimeRangePresets({ locale: 'zh-CN' });",
            "<TimeRangePickerPanel shortcuts={shortcuts} value={timeRange} onValueChange={setTimeRange} />"
          ])
        }
      ],
      api: [
        { prop: "value / defaultValue", type: "[string?, string?]", defaultValue: "-", description: zh ? "受控或默认时间范围。" : "Controlled or default time range." },
        { prop: "start / end / step", type: "HH:mm", defaultValue: "09:00 / 18:00 / 00:30", description: zh ? "时间范围和步长。" : "Time range and step." },
        { prop: "startLabel / endLabel", type: "string", defaultValue: "Start time / End time", description: zh ? "两个面板的可访问名称。" : "Accessible names for each panel." },
        { prop: "shortcuts", type: "TimeRangeShortcut[]", defaultValue: "[]", description: zh ? "快捷时间范围。" : "Shortcut ranges." },
        { prop: "onValueChange", type: "(range) => void", defaultValue: "-", description: zh ? "范围变化回调。" : "Range change callback." },
        { prop: "formatPinepostTimeRange", type: "helper", defaultValue: "-", description: zh ? "格式化时间范围。" : "Formats a time range." },
        { prop: "createPinepostTimeRangePresets", type: "(options?) => TimeRangeShortcut[]", defaultValue: "-", description: zh ? "生成上午、下午、全天快捷范围。" : "Creates morning, afternoon, and full-day shortcuts." }
      ]
    },
    {
      id: "date-time-picker-panel",
      group: labels.groups.form,
      title: zh ? "DateTimePickerPanel 日期时间面板" : "DateTimePickerPanel",
      description: zh ? "组合日期和时间选择，快捷项可以直接写入完整日期时间。" : "Combines date and time selection; shortcuts can commit full date-time values.",
      preview: (
        <DateTimePickerPanel
          value={dateTimePanelValue}
          onValueChange={setDateTimePanelValue}
          start="09:00"
          end="12:00"
          shortcuts={[{ label: zh ? "明日中午" : "Tomorrow noon", value: () => new Date(2026, 4, 18, 12, 0) }]}
        />
      ),
      code: code([
        'import { DateTimePickerPanel } from "pinepost-ui";',
        "",
        "<DateTimePickerPanel",
        "  value={value}",
        "  onValueChange={setValue}",
        "  shortcuts={[{ label: '明日中午', value: () => new Date(2026, 4, 18, 12, 0) }]}",
        "/>"
      ]),
      api: [
        { prop: "value / defaultValue", type: "Date", defaultValue: "-", description: zh ? "受控或默认日期时间。" : "Controlled or default date-time." },
        { prop: "shortcuts", type: "DatePickerShortcut[]", defaultValue: "[]", description: zh ? "快捷日期时间。" : "Shortcut date-times." },
        { prop: "start / end / step", type: "HH:mm", defaultValue: "09:00 / 18:00 / 00:30", description: zh ? "时间面板范围和步长。" : "Time panel range and step." },
        { prop: "onValueChange", type: "(date: Date) => void", defaultValue: "-", description: zh ? "日期时间变化回调。" : "Date-time change callback." }
      ]
    },
    {
      id: "breadcrumb",
      group: labels.groups.navigation,
      title: zh ? "Breadcrumb 面包屑" : "Breadcrumb",
      description: zh ? "展示当前位置路径。" : "Shows the current path.",
      preview: (
        <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">{zh ? "邮局" : "Post"}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>{zh ? "路线" : "Routes"}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
      ),
      code: code(['import { Breadcrumb, BreadcrumbList, BreadcrumbItem } from "pinepost-ui";', "", "<Breadcrumb>...</Breadcrumb>"]),
      api: [
        { prop: "BreadcrumbLink", type: "anchor props", defaultValue: "-", description: zh ? "可点击路径。" : "Clickable path." },
        { prop: "BreadcrumbPage", type: "span props", defaultValue: "-", description: zh ? "当前页。" : "Current page." }
      ]
    },
    {
      id: "menu",
      group: labels.groups.navigation,
      title: zh ? "Menu 导航菜单" : "Menu",
      description: zh ? "用于侧栏或顶部导航选择。" : "Navigation selection for sidebars and top bars.",
      preview: <Menu value={menuValue} onValueChange={setMenuValue} items={[{ value: "routes", label: zh ? "路线" : "Routes" }, { value: "archive", label: zh ? "归档" : "Archive" }]} />,
      code: code(['import { Menu } from "pinepost-ui";', "", '<Menu items={[{ value: "routes", label: "路线" }]} />']),
      api: [
        { prop: "items", type: "MenuItem[]", defaultValue: "[]", description: zh ? "菜单项。" : "Menu items." },
        { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "选择回调。" : "Selection callback." }
      ]
    },
    {
      id: "steps",
      group: labels.groups.navigation,
      title: zh ? "Steps 步骤条" : "Steps",
      description: zh ? "展示流程进度。" : "Shows progress through a workflow.",
      preview: <Steps active={1} items={[{ title: zh ? "草稿" : "Draft" }, { title: zh ? "盖章" : "Stamp" }, { title: zh ? "投递" : "Deliver" }]} />,
      code: code(['import { Steps } from "pinepost-ui";', "", '<Steps active={1} items={[{ title: "草稿" }]} />']),
      api: [
        { prop: "items", type: "StepItem[]", defaultValue: "[]", description: zh ? "步骤项。" : "Step items." },
        { prop: "active", type: "number", defaultValue: "0", description: zh ? "当前步骤。" : "Current step." }
      ]
    },
    {
      id: "pagination",
      group: labels.groups.navigation,
      title: zh ? "Pagination 分页" : "Pagination",
      description: zh ? "切换分页数据。" : "Switches paginated data.",
      preview: <Pagination page={page} pageCount={4} onPageChange={setPage} />,
      code: code(['import { Pagination } from "pinepost-ui";', "", '<Pagination page={1} pageCount={4} onPageChange={setPage} />']),
      api: [
        { prop: "page", type: "number", defaultValue: "-", description: zh ? "当前页。" : "Current page." },
        { prop: "onPageChange", type: "(page: number) => void", defaultValue: "-", description: zh ? "翻页回调。" : "Page callback." }
      ]
    },
    {
      id: "segmented",
      group: labels.groups.navigation,
      title: zh ? "Segmented 分段控制器" : "Segmented",
      description: zh ? "在少量视图或模式间切换。" : "Switches between a small set of modes.",
      preview: <Segmented value={segment} onValueChange={setSegment} options={[{ value: "calm", label: zh ? "安静" : "Calm" }, { value: "shop", label: zh ? "集市" : "Shop" }]} />,
      code: code(['import { Segmented } from "pinepost-ui";', "", '<Segmented options={[{ value: "calm", label: "安静" }]} />']),
      api: [
        { prop: "options", type: "SegmentedOption[]", defaultValue: "[]", description: zh ? "分段项。" : "Segments." },
        { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "切换回调。" : "Change callback." }
      ]
    },
    {
      id: "dropdown",
      group: labels.groups.feedback,
      title: zh ? "Dropdown 下拉菜单" : "Dropdown",
      description: zh ? "承载轻量命令菜单。" : "Hosts lightweight command menus.",
      preview: <Dropdown><DropdownTrigger asChild><Button variant="soft">{zh ? "路线菜单" : "Route menu"}</Button></DropdownTrigger><DropdownContent><DropdownItem>{zh ? "打印标签" : "Print label"}</DropdownItem></DropdownContent></Dropdown>,
      code: code(['import { Dropdown, DropdownContent, DropdownItem } from "pinepost-ui";', "", "<Dropdown>...</Dropdown>"]),
      api: [
        { prop: "modal", type: "boolean", defaultValue: "false", description: zh ? "是否模态。" : "Modal behavior." },
        { prop: "DropdownItem", type: "button item props", defaultValue: "-", description: zh ? "菜单项。" : "Menu item." }
      ]
    },
    {
      id: "popover",
      group: labels.groups.feedback,
      title: zh ? "Popover 弹出框" : "Popover",
      description: zh ? "展示可交互的短内容。" : "Displays short interactive content.",
      preview: <Popover><PopoverTrigger asChild><Button>{zh ? "查看提示" : "Show note"}</Button></PopoverTrigger><PopoverContent>{zh ? "黄昏前处理。" : "Before dusk."}</PopoverContent></Popover>,
      code: code(['import { Popover, PopoverContent, PopoverTrigger } from "pinepost-ui";', "", "<Popover>...</Popover>"]),
      api: [
        { prop: "open", type: "boolean", defaultValue: "-", description: zh ? "打开状态。" : "Open state." },
        { prop: "sideOffset", type: "number", defaultValue: "10", description: zh ? "浮层间距。" : "Surface offset." }
      ]
    },
    {
      id: "tooltip",
      group: labels.groups.feedback,
      title: zh ? "Tooltip 文字提示" : "Tooltip",
      description: zh ? "为按钮和图标补充短说明。" : "Adds short hints to buttons and icons.",
      preview: <TooltipProvider><Tooltip><TooltipTrigger asChild><Button>{zh ? "悬停" : "Hover"}</Button></TooltipTrigger><TooltipContent>{zh ? "小型说明" : "Small hint"}</TooltipContent></Tooltip></TooltipProvider>,
      code: code(['import { Tooltip, TooltipContent, TooltipTrigger } from "pinepost-ui";', "", "<Tooltip>...</Tooltip>"]),
      api: [
        { prop: "delayDuration", type: "number", defaultValue: "700", description: zh ? "显示延迟。" : "Show delay." }
      ]
    },
    {
      id: "popconfirm",
      group: labels.groups.feedback,
      title: zh ? "Popconfirm 气泡确认" : "Popconfirm",
      description: zh ? "用于轻量危险操作确认。" : "Confirms lightweight risky actions.",
      preview: <Popconfirm><PopconfirmTrigger asChild><Button variant="stamp">{zh ? "归档" : "Archive"}</Button></PopconfirmTrigger><PopconfirmContent><PopconfirmTitle>{zh ? "确认归档？" : "Archive?"}</PopconfirmTitle><PopconfirmDescription>{zh ? "便签会放入柜中。" : "The note moves to storage."}</PopconfirmDescription><PopconfirmCancel>{zh ? "取消" : "Cancel"}</PopconfirmCancel><PopconfirmAction>{zh ? "确认" : "Confirm"}</PopconfirmAction></PopconfirmContent></Popconfirm>,
      code: code(['import { Popconfirm, PopconfirmContent } from "pinepost-ui";', "", "<Popconfirm>...</Popconfirm>"]),
      api: [
        { prop: "onConfirm", type: "() => void", defaultValue: "-", description: zh ? "确认回调。" : "Confirm callback." }
      ]
    },
    {
      id: "drawer",
      group: labels.groups.feedback,
      title: zh ? "Drawer 抽屉" : "Drawer",
      description: zh ? "侧边承载较长流程或详情。" : "Side panel for detail and longer flows.",
      preview: <Drawer><DrawerTrigger asChild><Button>{zh ? "打开抽屉" : "Open drawer"}</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>{zh ? "路线详情" : "Route details"}</DrawerTitle><DrawerDescription>{zh ? "从侧边查看。" : "Read from the side."}</DrawerDescription></DrawerHeader><DrawerFooter><DrawerClose asChild><Button variant="soft">{zh ? "关闭" : "Close"}</Button></DrawerClose></DrawerFooter></DrawerContent></Drawer>,
      code: code(['import { Drawer, DrawerContent, DrawerTrigger } from "pinepost-ui";', "", "<Drawer>...</Drawer>"]),
      api: [
        { prop: "side", type: '"left" | "right"', defaultValue: "right", description: zh ? "打开方向。" : "Opening side." }
      ]
    },
    {
      id: "alert",
      group: labels.groups.display,
      title: zh ? "Alert 警告" : "Alert",
      description: zh ? "展示页面内状态提醒。" : "Inline status notice.",
      preview: <Alert variant="warning" title={zh ? "北线延迟" : "North delay"} description={zh ? "需要重新分配窗口。" : "Move it to another desk."} />,
      code: code(['import { Alert } from "pinepost-ui";', "", '<Alert variant="warning" title="北线延迟" />']),
      api: [
        { prop: "variant", type: '"info" | "success" | "warning" | "danger"', defaultValue: "info", description: zh ? "提示类型。" : "Notice type." },
        { prop: "title", type: "ReactNode", defaultValue: "-", description: zh ? "标题。" : "Title." }
      ]
    },
    {
      id: "avatar",
      group: labels.groups.display,
      title: zh ? "Avatar 头像" : "Avatar",
      description: zh ? "展示人员、桌台或系统身份。" : "Displays a person, desk, or system identity.",
      preview: <Avatar fallback="PP" />,
      code: code(['import { Avatar } from "pinepost-ui";', "", '<Avatar fallback="PP" />']),
      api: [
        { prop: "src", type: "string", defaultValue: "-", description: zh ? "图片地址。" : "Image source." },
        { prop: "fallback", type: "ReactNode", defaultValue: "-", description: zh ? "回退内容。" : "Fallback content." }
      ]
    },
    {
      id: "progress",
      group: labels.groups.display,
      title: zh ? "Progress 进度条" : "Progress",
      description: zh ? "展示任务完成度。" : "Shows task progress.",
      preview: <Progress value={68} label={zh ? "路线进度" : "Route progress"} />,
      code: code(['import { Progress } from "pinepost-ui";', "", '<Progress value={68} label="路线进度" />']),
      api: [
        { prop: "value", type: "number", defaultValue: "0", description: zh ? "进度值。" : "Progress value." },
        { prop: "max", type: "number", defaultValue: "100", description: zh ? "最大值。" : "Maximum value." }
      ]
    },
    {
      id: "skeleton",
      group: labels.groups.display,
      title: zh ? "Skeleton 骨架屏" : "Skeleton",
      description: zh ? "用于数据加载期间的占位。" : "Placeholder while data loads.",
      preview: <Skeleton count={3} aria-label={zh ? "加载路线" : "Loading routes"} />,
      code: code(['import { Skeleton } from "pinepost-ui";', "", "<Skeleton count={3} />"]),
      api: [
        { prop: "count", type: "number", defaultValue: "1", description: zh ? "行数。" : "Line count." }
      ]
    },
    {
      id: "descriptions",
      group: labels.groups.display,
      title: zh ? "Descriptions 描述列表" : "Descriptions",
      description: zh ? "展示键值信息。" : "Displays key-value details.",
      preview: <Descriptions title={zh ? "包裹" : "Parcel"} items={[{ label: zh ? "桌号" : "Desk", children: zh ? "雪松" : "Cedar" }, { label: zh ? "重量" : "Weight", children: zh ? "轻" : "Light" }]} />,
      code: code(['import { Descriptions } from "pinepost-ui";', "", '<Descriptions items={[{ label: "桌号", children: "雪松" }]} />']),
      api: [
        { prop: "items", type: "DescriptionItem[]", defaultValue: "[]", description: zh ? "描述项。" : "Description rows." }
      ]
    },
    {
      id: "statistic",
      group: labels.groups.display,
      title: zh ? "Statistic 统计数值" : "Statistic",
      description: zh ? "突出展示关键数字。" : "Highlights a key number.",
      preview: <Statistic label={zh ? "今日信件" : "Letters today"} value={18} suffix={zh ? "封" : "/ day"} />,
      code: code(['import { Statistic } from "pinepost-ui";', "", '<Statistic label="今日信件" value={18} suffix="封" />']),
      api: [
        { prop: "value", type: "ReactNode", defaultValue: "-", description: zh ? "数值。" : "Value." },
        { prop: "suffix", type: "ReactNode", defaultValue: "-", description: zh ? "后缀。" : "Suffix." }
      ]
    },
    {
      id: "empty",
      group: labels.groups.display,
      title: zh ? "Empty 空状态" : "Empty",
      description: zh ? "展示没有数据时的轻量反馈。" : "Empty state feedback.",
      preview: <Empty title={zh ? "没有待发信件" : "No outgoing letters"} description={zh ? "托盘已经清空。" : "The tray is clear."} action={<Button size="sm">{zh ? "新建便签" : "New note"}</Button>} />,
      code: code(['import { Empty } from "pinepost-ui";', "", '<Empty title="没有待发信件" />']),
      api: [
        { prop: "title", type: "ReactNode", defaultValue: "-", description: zh ? "标题。" : "Title." },
        { prop: "action", type: "ReactNode", defaultValue: "-", description: zh ? "操作区。" : "Action area." }
      ]
    },
    {
      id: "result-view",
      group: labels.groups.display,
      title: zh ? "Result 结果" : "Result",
      description: zh ? "展示流程完成、异常或提示结果。" : "Shows completion, error, or hint result states.",
      preview: <Result status="success" title={zh ? "全部打包完成" : "All packed"} description={zh ? "每个包裹都已经贴好标签。" : "Every parcel now has a label."} />,
      code: code(['import { Result } from "pinepost-ui";', "", '<Result status="success" title="全部打包完成" />']),
      api: [
        { prop: "status", type: '"info" | "success" | "warning" | "danger"', defaultValue: "info", description: zh ? "结果状态。" : "Result status." },
        { prop: "extra", type: "ReactNode", defaultValue: "-", description: zh ? "额外操作。" : "Extra actions." }
      ]
    },
    {
      id: "timeline",
      group: labels.groups.display,
      title: zh ? "Timeline 时间线" : "Timeline",
      description: zh ? "按顺序展示事件。" : "Displays ordered events.",
      preview: <Timeline items={[{ title: zh ? "分拣" : "Sorted", description: zh ? "桌 A" : "Desk A" }, { title: zh ? "盖章" : "Stamped", description: zh ? "桌 B" : "Desk B" }]} />,
      code: code(['import { Timeline } from "pinepost-ui";', "", '<Timeline items={[{ title: "分拣" }]} />']),
      api: [
        { prop: "items", type: "TimelineItem[]", defaultValue: "[]", description: zh ? "时间线项。" : "Timeline items." }
      ]
    },
    {
      id: "watermark",
      group: labels.groups.display,
      title: zh ? "Watermark 水印" : "Watermark",
      description: zh ? "为预览区域添加低干扰水印。" : "Adds low-noise watermark text to a preview region.",
      preview: <Watermark content="Pinepost"><div className="docs-watermark-card">{zh ? "预览卡片" : "Preview card"}</div></Watermark>,
      code: code(['import { Watermark } from "pinepost-ui";', "", '<Watermark content="Pinepost">...</Watermark>']),
      api: [
        { prop: "content", type: "string", defaultValue: "-", description: zh ? "水印内容。" : "Watermark content." }
      ]
    },
    {
      id: "collapse",
      group: labels.groups.display,
      title: zh ? "Collapse 折叠面板" : "Collapse",
      description: zh ? "折叠次要信息，降低页面密度。" : "Collapses secondary information.",
      preview: <Collapse type="single" collapsible><CollapseItem value="route"><CollapseTrigger>{zh ? "路线详情" : "Route details"}</CollapseTrigger><CollapseContent>{zh ? "黄昏前还有三站。" : "Three stops remain before dusk."}</CollapseContent></CollapseItem></Collapse>,
      code: code(['import { Collapse, CollapseItem } from "pinepost-ui";', "", "<Collapse>...</Collapse>"]),
      api: [
        { prop: "type", type: '"single" | "multiple"', defaultValue: "-", description: zh ? "折叠模式。" : "Accordion mode." }
      ]
    },
    {
      id: "infinite-scroll",
      group: labels.groups.display,
      title: zh ? "InfiniteScroll 无限滚动" : "InfiniteScroll",
      description: zh ? "列表滚动到底部时加载更多。" : "Loads more content near the bottom of a scroll area.",
      preview: <InfiniteScroll hasMore onLoadMore={() => undefined}><div style={{ height: 180 }}>{zh ? "滚动列表内容" : "Scrollable list content"}</div></InfiniteScroll>,
      code: code(['import { InfiniteScroll } from "pinepost-ui";', "", '<InfiniteScroll hasMore onLoadMore={loadMore}>...</InfiniteScroll>']),
      api: [
        { prop: "hasMore", type: "boolean", defaultValue: "true", description: zh ? "是否还有更多。" : "Whether more content is available." },
        { prop: "onLoadMore", type: "() => void", defaultValue: "-", description: zh ? "加载更多回调。" : "Load callback." },
        { prop: "threshold", type: "number", defaultValue: "64", description: zh ? "触发距离。" : "Trigger distance." }
      ]
    },
    {
      id: "color",
      group: labels.groups.guide,
      title: zh ? "Color 颜色" : "Color",
      description: zh ? "Pinepost 主题色由纸张、墨色、叶色、邮戳、包裹和天空色组成。" : "Pinepost themes use paper, ink, leaf, stamp, parcel, and sky tokens.",
      preview: <div className="docs-token-grid">{["--pinepost-paper", "--pinepost-leaf", "--pinepost-stamp", "--pinepost-parcel", "--pinepost-sky"].map((token) => <span key={token} style={{ background: `var(${token})` }}>{token}</span>)}</div>,
      code: code([".pinepost-card {", "  background: var(--pinepost-paper-raised);", "  color: var(--pinepost-ink);", "}"]),
      api: [
        { prop: "--pinepost-paper", type: "CSS token", defaultValue: "theme", description: zh ? "页面纸张底色。" : "Paper background." },
        { prop: "--pinepost-leaf", type: "CSS token", defaultValue: "theme", description: zh ? "主要操作色。" : "Primary action color." }
      ]
    },
    {
      id: "border",
      group: labels.groups.guide,
      title: zh ? "Border 边框" : "Border",
      description: zh ? "边框 token 控制纸张、木牌和包裹的层次。" : "Border tokens define paper, sign, and parcel hierarchy.",
      preview: <div className="docs-border-stack"><span>{zh ? "细边框" : "Soft border"}</span><strong>{zh ? "强调边框" : "Strong border"}</strong></div>,
      code: code([".pinepost-surface {", "  border: 2px solid var(--pinepost-border);", "  border-radius: var(--pinepost-radius-md);", "}"]),
      api: [
        { prop: "--pinepost-border", type: "CSS token", defaultValue: "theme", description: zh ? "常规边框。" : "Regular border." },
        { prop: "--pinepost-border-strong", type: "CSS token", defaultValue: "theme", description: zh ? "强调边框。" : "Strong border." }
      ]
    },
    {
      id: "coverage",
      group: labels.groups.guide,
      title: zh ? "Coverage / Roadmap 覆盖计划" : "Coverage / Roadmap",
      description: zh ? "公开展示 Pinepost 自己的组件成熟度，不包含外部对比说明。" : "Public Pinepost-only component maturity map.",
      preview: <div className="docs-roadmap"><Tag>Stable</Tag><span>Button, Card, Input, Tabs, Theme collections, Recipe Gallery state recipes</span><Tag variant="parcel">Beta</Tag><span>Recipe Bundles, Table presets, Cascader multi-select, Date/time presets, Form, TreeSelect, visual baselines</span><Tag variant="sky">Planned</Tag><span>{zh ? "深层选择无障碍、发布检查自动化" : "Deep selection accessibility, release checklist automation"}</span></div>,
      code: code(["Stable: production-ready basics, theme collections, and stateful recipes", "Beta: recipe bundles, table presets, multi-route selection, scheduling presets, and visual checks", "Planned: future refinements"]),
      api: [
        { prop: "Stable", type: "status", defaultValue: "-", description: zh ? "可优先用于业务。" : "Ready for product use." },
        { prop: "Beta", type: "status", defaultValue: "-", description: zh ? "API 已可用，继续打磨边界。" : "Usable API with active refinement." },
        { prop: "Planned", type: "status", defaultValue: "-", description: zh ? "后续增强。" : "Future enhancement." }
      ]
    }
  ];

  docs.push(...splitDocs);

  const hiddenDocIds = new Set(["choice", "navigation", "overlay", "display", "result"]);
  const visibleDocs = (group: string) =>
    docs
      .filter((item) => item.group === group && !hiddenDocIds.has(item.id))
      .map((item) => ({ id: item.id, label: item.title, searchText: item.searchText }));

  const navGroups: NavGroup[] = [
    { title: labels.groups.basic, items: visibleDocs(labels.groups.basic) },
    { title: labels.groups.form, items: visibleDocs(labels.groups.form) },
    { title: labels.groups.navigation, items: visibleDocs(labels.groups.navigation) },
    { title: labels.groups.feedback, items: visibleDocs(labels.groups.feedback) },
    { title: labels.groups.display, items: visibleDocs(labels.groups.display) },
    {
      title: labels.groups.guide,
      items: [
        { id: "install", label: zh ? "安装使用" : "Install" },
        { id: "theme", label: zh ? "主题语言" : "Theme and locale" },
        {
          id: "theme-studio",
          label: zh ? "主题工作台" : "Theme Studio",
          searchText: "theme collection theme preset 主题集合 主题预设 preset workflow"
        },
        {
          id: "recipes",
          label: zh ? "业务模板" : "Recipe Gallery",
          searchText: "业务模板 Recipe Gallery recipe bundle Bundle Builder 配方包 loading 上传 dashboard commerce upload form data learning preset 排期 scheduling 商业 学习"
        },
        ...visibleDocs(labels.groups.guide)
      ]
    }
  ];
  const normalizedNavFilter = navFilter.trim().toLowerCase();
  const filteredNavGroups = navGroups
    .map((group) => ({
      ...group,
      items: normalizedNavFilter
        ? group.items.filter((item) => `${group.title} ${item.label} ${item.searchText ?? ""}`.toLowerCase().includes(normalizedNavFilter))
        : group.items
    }))
    .filter((group) => group.items.length > 0);
  const selectedDoc = docs.find((item) => item.id === selectedId);
  const guidePanels: Record<GuidePanelId, { description: string; title: string }> = {
    install: {
      title: labels.install,
      description: zh
        ? "安装包、引入样式，然后用 PinepostProvider 包住应用。"
        : "Install the package, import styles, and wrap your app with PinepostProvider."
    },
    theme: {
      title: zh ? "Theme 与 Locale" : "Theme and Locale",
      description: zh
        ? "Provider 同时管理主题、语言和根节点 token，适合文档站与业务应用共用。"
        : "The provider controls theme, locale, and root tokens for docs and product apps."
    },
    "theme-studio": {
      title: zh ? "Theme Studio 主题工作台" : "Theme Studio",
      description: zh
        ? "微调 Pinepost 主题 token，实时预览组件，并复制可落地的 CSS 变量。"
        : "Tune Pinepost theme tokens, preview real components, and copy production-ready CSS variables."
    },
    recipes: {
      title: zh ? "Recipe Gallery 业务模板" : "Recipe Gallery",
      description: zh
        ? "面向真实页面的组合模板，带预览、组件清单、配方包和可复制代码。"
        : "Product-ready compositions with previews, component lists, recipe bundles, and copyable code."
    }
  };
  const selectedGuidePanel = selectedId in guidePanels ? guidePanels[selectedId as GuidePanelId] : guidePanels.theme;
  const selectedPanelTitle =
    selectedDoc?.title ?? selectedGuidePanel.title;
  const selectedPanelDescription = selectedDoc?.description ?? selectedGuidePanel.description;

  function renderSelectedPanel() {
    if (selectedDoc) {
      return <DocSection item={selectedDoc} labels={labels} />;
    }

    if ((selectedId as GuidePanelId) === "install") {
      return <InstallPanel labels={labels} zh={zh} />;
    }

    if ((selectedId as GuidePanelId) === "theme-studio") {
      return <ThemeStudioPanel labels={labels} theme={theme} zh={zh} />;
    }

    if ((selectedId as GuidePanelId) === "recipes") {
      return <RecipeGalleryPanel labels={labels} zh={zh} />;
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
          <label className="docs-nav-search">
            <span>{zh ? "搜索组件" : "Search docs"}</span>
            <Input
              aria-label={zh ? "搜索组件" : "Search docs"}
              inputSize="sm"
              value={navFilter}
              onChange={(event) => setNavFilter(event.target.value)}
              placeholder={zh ? "输入组件或模板" : "Component or recipe"}
            />
          </label>
          <nav className="docs-nav" aria-label="Component navigation">
            {filteredNavGroups.map((group) => (
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
            {filteredNavGroups.length === 0 && <p className="docs-nav-empty">{zh ? "没有匹配项" : "No matches"}</p>}
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
