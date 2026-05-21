import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Input,
  PinepostProvider,
  Segmented,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createPinepostDatePresets,
  createPinepostDateRangePresets,
  createPinepostTimeRangePresets,
  createTableViewPresetExport,
  stringifyTableViewPresetExport,
  type CascaderMultipleValue,
  type CascaderRef,
  type FormRef,
  type PinepostLocale,
  type PinepostTheme,
  type SelectRef,
  type TableColumnSettingsValue,
  type TableRef,
  type TreeRef,
  type TreeSelectRef,
  type UploadRef
} from "../index";
import "../styles.css";
import "./demo.css";
import { copy } from "./copy";
import { createDemoDocs } from "./docs";
import { localeOrder, themeOrder } from "./fixtures";
import { InstallPanel, RecipeGalleryPanel, ThemePanel, ThemeStudioPanel } from "./guides";
import { DocSection, PinepostMark } from "./shell";
import type { DemoRouteRow, GuidePanelId, NavGroup } from "./types";

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
  const [colorPanelValue, setColorPanelValue] = React.useState("#4f8f5f");
  const [datePanelValue, setDatePanelValue] = React.useState(new Date(2026, 4, 17));
  const [shipDateValue, setShipDateValue] = React.useState(new Date(2026, 4, 18));
  const [dateRangeValue, setDateRangeValue] = React.useState<[Date | undefined, Date | undefined]>([new Date(2026, 4, 17), new Date(2026, 4, 19)]);
  const [dateTimePanelValue, setDateTimePanelValue] = React.useState(new Date(2026, 4, 17, 9, 30));
  const [timeRangeValue, setTimeRangeValue] = React.useState<[string | undefined, string | undefined]>(["09:00", "11:00"]);
  const [tourOpen, setTourOpen] = React.useState(false);
  const [virtualTreeSelected, setVirtualTreeSelected] = React.useState("north-3");
  const [messageBoxOpen, setMessageBoxOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [formPreviewModel, setFormPreviewModel] = React.useState({ desk: "cedar" });
  const formExampleRef = React.useRef<FormRef>(null);
  const formExampleRouteRef = React.useRef<HTMLInputElement>(null);
  const [formExampleModel, setFormExampleModel] = React.useState({ owner: "", route: "" });
  const [formExampleMode, setFormExampleMode] = React.useState<"success" | "server-error">("success");
  const [formExampleStatus, setFormExampleStatus] = React.useState("");
  const [formExampleFocusRequest, setFormExampleFocusRequest] = React.useState(0);
  const formWorkbenchRef = React.useRef<FormRef>(null);
  const formRouteInputRef = React.useRef<HTMLInputElement>(null);
  const [formWorkbenchModel, setFormWorkbenchModel] = React.useState({ owner: "", route: "" });
  const [formSubmitMode, setFormSubmitMode] = React.useState<"success" | "server-error">("success");
  const [formWorkbenchStatus, setFormWorkbenchStatus] = React.useState("");
  const [formWorkbenchEvents, setFormWorkbenchEvents] = React.useState<string[]>([]);
  const [formFocusRequest, setFormFocusRequest] = React.useState(0);
  const selectWorkbenchRef = React.useRef<SelectRef>(null);
  const [selectWorkbenchValue, setSelectWorkbenchValue] = React.useState<string | string[]>(["north"]);
  const [selectWorkbenchEvents, setSelectWorkbenchEvents] = React.useState<string[]>([]);
  const cascaderWorkbenchRef = React.useRef<CascaderRef>(null);
  const [cascaderWorkbenchValue, setCascaderWorkbenchValue] = React.useState<CascaderMultipleValue>([]);
  const [cascaderWorkbenchEvents, setCascaderWorkbenchEvents] = React.useState<string[]>([]);
  const treeSelectWorkbenchRef = React.useRef<TreeSelectRef>(null);
  const [treeSelectWorkbenchValue, setTreeSelectWorkbenchValue] = React.useState<string | string[]>(["dispatch"]);
  const [treeSelectWorkbenchEvents, setTreeSelectWorkbenchEvents] = React.useState<string[]>([]);
  const treeWorkbenchRef = React.useRef<TreeRef>(null);
  const [treeWorkbenchCheckedKeys, setTreeWorkbenchCheckedKeys] = React.useState(["cedar"]);
  const [treeWorkbenchExpandedKeys, setTreeWorkbenchExpandedKeys] = React.useState(["routes"]);
  const [treeWorkbenchEvents, setTreeWorkbenchEvents] = React.useState<string[]>([]);
  const uploadExampleRef = React.useRef<UploadRef>(null);
  const uploadRef = React.useRef<UploadRef>(null);
  const [uploadPreviewStatus, setUploadPreviewStatus] = React.useState("");
  const [uploadWorkbenchEvents, setUploadWorkbenchEvents] = React.useState<string[]>([]);
  const tableRef = React.useRef<TableRef<DemoRouteRow>>(null);
  const [tableQuery, setTableQuery] = React.useState("");
  const [tableReadyFilter, setTableReadyFilter] = React.useState(true);
  const [tableFilterExampleReady, setTableFilterExampleReady] = React.useState(true);
  const [tableFilterExampleStatus, setTableFilterExampleStatus] = React.useState("");
  const [tableActiveView, setTableActiveView] = React.useState("full");
  const [tableSelectedCount, setTableSelectedCount] = React.useState(0);
  const [tableWorkbenchStatus, setTableWorkbenchStatus] = React.useState("");
  const [tableWorkbenchEvents, setTableWorkbenchEvents] = React.useState<string[]>([]);
  const [dateRangeWorkbenchEvents, setDateRangeWorkbenchEvents] = React.useState<string[]>([]);
  const [timeRangeWorkbenchEvents, setTimeRangeWorkbenchEvents] = React.useState<string[]>([]);
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

  React.useEffect(() => {
    if (formFocusRequest === 0) return;
    const id = window.setTimeout(() => formRouteInputRef.current?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(id);
  }, [formFocusRequest]);

  React.useEffect(() => {
    if (formExampleFocusRequest === 0) return;
    const id = window.setTimeout(() => formExampleRouteRef.current?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(id);
  }, [formExampleFocusRequest]);

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

  const tableRows: DemoRouteRow[] = [
    { id: "a7", desk: zh ? "雪松" : "Cedar", route: "A7", status: zh ? "就绪" : "Ready", count: 8 },
    { id: "b2", desk: zh ? "苔藓" : "Moss", route: "B2", status: zh ? "复核" : "Review", count: 3 },
    { id: "c4", desk: zh ? "河岸" : "River", route: "C4", status: zh ? "就绪" : "Ready", count: 5 }
  ];
  const filteredTableRows = tableRows.filter((row) => {
    const queryMatch = tableQuery ? `${row.desk} ${row.route} ${row.status}`.toLowerCase().includes(tableQuery.toLowerCase()) : true;
    const statusMatch = tableReadyFilter ? row.status === (zh ? "就绪" : "Ready") : true;
    return queryMatch && statusMatch;
  });
  const tableFilterTags = tableReadyFilter ? [{ key: "status", label: zh ? "状态：就绪" : "Status: Ready" }] : [];
  const tableFilterExampleRows = tableFilterExampleReady ? tableRows.filter((row) => row.status === (zh ? "就绪" : "Ready")) : tableRows;
  const tableFilterExampleTags = tableFilterExampleReady ? [{ key: "status", label: zh ? "状态：就绪" : "Status: Ready" }] : [];
  const routeTreeData = [
    {
      value: "routes",
      label: zh ? "路线分组" : "Route group",
      children: [
        { value: "cedar", label: zh ? "雪松桌" : "Cedar desk" },
        { value: "moss", label: zh ? "苔藓桌" : "Moss desk" },
        { value: "dispatch", label: zh ? "调度组" : "Dispatch team" }
      ]
    }
  ];

  const docs = createDemoDocs({
    labels,
    zh,
    locale,
    theme,
    menuValue,
    setMenuValue,
    page,
    setPage,
    segment,
    setSegment,
    selectValue,
    setSelectValue,
    radioValue,
    setRadioValue,
    rateValue,
    setRateValue,
    cascaderValue,
    setCascaderValue,
    cascaderMultiValue,
    setCascaderMultiValue,
    transferValue,
    setTransferValue,
    treeSelectValue,
    setTreeSelectValue,
    virtualSelectValue,
    setVirtualSelectValue,
    inputTags,
    setInputTags,
    otpValue,
    setOtpValue,
    mentionValue,
    setMentionValue,
    timeSelectValue,
    setTimeSelectValue,
    timePanelValue,
    setTimePanelValue,
    colorPanelValue,
    setColorPanelValue,
    datePanelValue,
    setDatePanelValue,
    shipDateValue,
    setShipDateValue,
    dateRangeValue,
    setDateRangeValue,
    dateTimePanelValue,
    setDateTimePanelValue,
    timeRangeValue,
    setTimeRangeValue,
    tourOpen,
    setTourOpen,
    virtualTreeSelected,
    setVirtualTreeSelected,
    messageBoxOpen,
    setMessageBoxOpen,
    formPreviewModel,
    setFormPreviewModel,
    formExampleRef,
    formExampleRouteRef,
    formExampleModel,
    setFormExampleModel,
    formExampleMode,
    setFormExampleMode,
    formExampleStatus,
    setFormExampleStatus,
    setFormExampleFocusRequest,
    formWorkbenchRef,
    formRouteInputRef,
    formWorkbenchModel,
    setFormWorkbenchModel,
    formSubmitMode,
    setFormSubmitMode,
    formWorkbenchStatus,
    setFormWorkbenchStatus,
    formWorkbenchEvents,
    setFormWorkbenchEvents,
    setFormFocusRequest,
    selectWorkbenchRef,
    selectWorkbenchValue,
    setSelectWorkbenchValue,
    selectWorkbenchEvents,
    setSelectWorkbenchEvents,
    cascaderWorkbenchRef,
    cascaderWorkbenchValue,
    setCascaderWorkbenchValue,
    cascaderWorkbenchEvents,
    setCascaderWorkbenchEvents,
    treeSelectWorkbenchRef,
    treeSelectWorkbenchValue,
    setTreeSelectWorkbenchValue,
    treeSelectWorkbenchEvents,
    setTreeSelectWorkbenchEvents,
    treeWorkbenchRef,
    treeWorkbenchCheckedKeys,
    setTreeWorkbenchCheckedKeys,
    treeWorkbenchExpandedKeys,
    setTreeWorkbenchExpandedKeys,
    treeWorkbenchEvents,
    setTreeWorkbenchEvents,
    uploadExampleRef,
    uploadRef,
    uploadPreviewStatus,
    setUploadPreviewStatus,
    uploadWorkbenchEvents,
    setUploadWorkbenchEvents,
    tableRef,
    tableQuery,
    setTableQuery,
    tableReadyFilter,
    setTableReadyFilter,
    tableFilterExampleReady,
    setTableFilterExampleReady,
    tableFilterExampleStatus,
    setTableFilterExampleStatus,
    tableActiveView,
    setTableActiveView,
    tableSelectedCount,
    setTableSelectedCount,
    tableWorkbenchStatus,
    setTableWorkbenchStatus,
    tableWorkbenchEvents,
    setTableWorkbenchEvents,
    dateRangeWorkbenchEvents,
    setDateRangeWorkbenchEvents,
    timeRangeWorkbenchEvents,
    setTimeRangeWorkbenchEvents,
    tableSettings,
    setTableSettings,
    scheduleReferenceDate,
    datePresets,
    dateRangePresets,
    timeRangePresets,
    tablePresetExportText,
    showToast,
    routeOptions,
    transferData,
    virtualOptions,
    virtualRows,
    virtualTreeItems,
    tableRows,
    filteredTableRows,
    tableFilterTags,
    tableFilterExampleRows,
    tableFilterExampleTags,
    routeTreeData
  });

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
          searchText: "业务模板 Recipe Gallery recipe bundle Bundle Builder team handoff bundle handoff import preview commerce launch learning flow 配方包 团队交接 交接 导入预览 loading 上传 dashboard commerce upload form data learning preset 排期 scheduling 商业 学习"
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
        ? "面向真实页面的组合模板，带预览、组件清单、v0.27 团队交接和可复制代码。"
        : "Product-ready compositions with previews, component lists, v0.27 team handoff, and copyable code."
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
