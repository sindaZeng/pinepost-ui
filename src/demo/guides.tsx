import * as React from "react";
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

import { code, type DemoLabels } from "./copy";
import { describeBundleIssue, describeThemeIssue, downloadTextFile, editableThemeTokens, themeOrder, themePreviewRows, themeTokensToStyle } from "./fixtures";
import { CodeBlock } from "./shell";

export function InstallPanel({ labels, zh }: { labels: DemoLabels; zh: boolean }) {
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

export function ThemePanel({ labels, locale, theme, zh }: { labels: DemoLabels; locale: PinepostLocale; theme: PinepostTheme; zh: boolean }) {
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

export function ThemeStudioPanel({ labels, theme, zh }: { labels: DemoLabels; theme: PinepostTheme; zh: boolean }) {
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

export { RecipeGalleryPanel } from "./examples/recipe-gallery";
