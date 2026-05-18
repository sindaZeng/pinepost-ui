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
} from "../pinepost";

import { code } from "../copy";
import type { DemoCatalogContext, DocItem } from "../types";

export function createDataCatalogDocs(context: DemoCatalogContext): DocItem[] {
  const {
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
    routeTreeData,
    renderCascaderExamples,
    renderCascaderWorkbench,
    renderDateRangeExamples,
    renderDateRangeWorkbench,
    renderFormExamples,
    renderFormWorkbench,
    renderSelectExamples,
    renderSelectWorkbench,
    renderTableExamples,
    renderTableWorkbench,
    renderTimeRangeExamples,
    renderTimeRangeWorkbench,
    renderTreeExamples,
    renderTreeSelectExamples,
    renderTreeSelectWorkbench,
    renderTreeWorkbench,
    renderUploadExamples,
    renderUploadWorkbench
  } = context;

  return [
    {
      id: "table",
      group: labels.groups.display,
      title: zh ? "Table 表格" : "Table",
      description: zh ? "数据表格支持列组、固定列、排序、筛选、选择、展开行、汇总行和内联编辑。" : "Data table with column groups, fixed columns, sorting, filtering, selection, row expansion, summaries, and inline editing.",
      searchText: "table preset view preset 视图预设 release notes release draft preset workflow",
      examples: renderTableExamples(),
      playground: renderTableWorkbench(),
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
      examples: renderTreeExamples(),
      playground: renderTreeWorkbench(),
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

  ];
}
