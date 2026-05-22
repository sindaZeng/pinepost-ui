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

export function createGuideCatalogDocs(context: DemoCatalogContext): DocItem[] {
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
      preview: <ColorPickerPanel value={colorPanelValue} onValueChange={setColorPanelValue} presets={["#4f8f5f", "#c9624b", "#87b9c9"]} />,
      code: code([
        'import { ColorPickerPanel } from "pinepost-ui";',
        "",
        'const [color, setColor] = React.useState("#4f8f5f");',
        "",
        '<ColorPickerPanel value={color} onValueChange={setColor} presets={["#4f8f5f", "#c9624b"]} />'
      ]),
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
      preview: <DatePickerPanel value={datePanelValue} onValueChange={setDatePanelValue} shortcuts={datePresets} />,
      code: code([
        'import { DatePickerPanel, createPinepostDatePresets } from "pinepost-ui";',
        "",
        "const shortcuts = createPinepostDatePresets({ locale: 'zh-CN' });",
        "const [date, setDate] = React.useState(new Date());",
        "",
        "<DatePickerPanel value={date} onValueChange={setDate} shortcuts={shortcuts} />"
      ]),
      recipes: [
        {
          title: zh ? "活动日期快捷项" : "Campaign date shortcuts",
          description: zh ? "快捷项可以封装业务日期，disabledDate 保留不可投递日期。" : "Shortcuts can encode product dates while disabledDate blocks unavailable days.",
          preview: <DatePickerPanel value={shipDateValue} onValueChange={setShipDateValue} disabledDate={(date) => date.getDay() === 0} shortcuts={[{ label: zh ? "下个工作日" : "Next workday", value: () => new Date(2026, 4, 18) }]} />,
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
      examples: renderDateRangeExamples(),
      playground: renderDateRangeWorkbench(),
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
      examples: renderTimeRangeExamples(),
      playground: renderTimeRangeWorkbench(),
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
      description: zh ? "公开展示 Pinepost 自己的覆盖计划；详细成熟度见 Component Maturity 矩阵。" : "Public Pinepost-only coverage plan; use the Component Maturity matrix for depth status.",
      preview: <div className="docs-roadmap"><Tag>Focus</Tag><span>{zh ? "v0.29 聚焦大规模选择器键盘契约。" : "v0.29 focuses the large selection keyboard contract."}</span><Tag variant="parcel">Maintain</Tag><span>{zh ? "Recipe Gallery 和 Table、Form、Upload 压力场继续作为回归基线。" : "Recipe Gallery plus Table, Form, and Upload pressure workflows remain regression baselines."}</span><Tag variant="sky">Hold</Tag><span>{zh ? "展示类组件本轮保持非重点，避免平均扩张。" : "Display components stay non-focus in this pass to avoid broad shallow expansion."}</span></div>,
      code: code(["Focus: large selection keyboard contract", "Maintain: Recipe Gallery and heavy workflow baselines", "Hold: display components remain non-focus during v0.29"]),
      api: [
        { prop: "Focus", type: "status", defaultValue: "-", description: zh ? "v0.29 优先深挖的大规模选择器键盘行为。" : "Large selection keyboard behavior deepens first in v0.29." },
        { prop: "Maintain", type: "status", defaultValue: "-", description: zh ? "继续维护现有文档与 API。" : "Existing docs and APIs remain maintained." },
        { prop: "Hold", type: "status", defaultValue: "-", description: zh ? "本轮暂不平均投入。" : "No broad investment in this pass." }
      ]
    }

  ];
}
