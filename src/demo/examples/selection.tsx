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
import { DemoWorkbench, pushDemoEvent } from "../shell";
import type { DemoContext, DocExample, DemoRouteRow } from "../types";

export function createSelectionExamples(context: DemoContext) {
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
    routeTreeData
  } = context;

  function BlockedDateRangeExample() {
    const [blockedRange, setBlockedRange] = React.useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
    const blockedDay = new Date(2026, 4, 20);

    return (
      <Space direction="vertical">
        <DateRangePickerPanel
          month={new Date(2026, 4, 1)}
          value={blockedRange}
          onValueChange={setBlockedRange}
          disabledDate={(date) => date.getFullYear() === blockedDay.getFullYear() && date.getMonth() === blockedDay.getMonth() && date.getDate() === blockedDay.getDate()}
          shortcuts={[
            { key: "open-window", label: zh ? "开放窗口" : "Open window", value: [new Date(2026, 4, 12), new Date(2026, 4, 14)] },
            { key: "blocked-window", label: zh ? "跨封锁日" : "Blocked window", value: [new Date(2026, 4, 18), new Date(2026, 4, 22)] }
          ]}
        />
        <Tag>{formatPinepostDateRange(blockedRange, { fallback: zh ? "未选择" : "Open", locale })}</Tag>
      </Space>
    );
  }

  function BlockedTimeRangeExample() {
    const [blockedTimeRange, setBlockedTimeRange] = React.useState<[string | undefined, string | undefined]>([undefined, undefined]);

    return (
      <Space direction="vertical">
        <TimeRangePickerPanel
          value={blockedTimeRange}
          onValueChange={setBlockedTimeRange}
          start="09:00"
          end="14:00"
          step="01:00"
          disabledTime={(time) => time === "12:00"}
          shortcuts={[
            { key: "lunch", label: zh ? "午间窗口" : "Lunch window", value: ["12:00", "13:00"] },
            { key: "morning", label: zh ? "上午窗口" : "Morning window", value: ["09:00", "11:00"] }
          ]}
        />
        <Tag>{formatPinepostTimeRange(blockedTimeRange, { fallback: zh ? "未定" : "Open", locale })}</Tag>
      </Space>
    );
  }

  function renderSelectExamples(): DocExample[] {
    return [
      {
        id: "search-multiple",
        title: zh ? "搜索与多选" : "Search and multiple",
        description: zh ? "多选、清空和搜索组合成一个常见负责人选择器。" : "Multiple selection, clear, and search make a practical owner picker.",
        preview: (
          <Select
            aria-label={zh ? "负责人选择" : "Owner picker"}
            multiple
            clearable
            filterable
            placeholder={zh ? "选择负责人" : "Choose owners"}
            value={selectWorkbenchValue}
            onValueChange={setSelectWorkbenchValue}
            options={[
              { value: "north", label: zh ? "北线负责人" : "North owner", group: zh ? "日常" : "Daily" },
              { value: "market", label: zh ? "集市负责人" : "Market owner", group: zh ? "活动" : "Campaign" },
              { value: "backup", label: zh ? "备用负责人" : "Backup owner", group: zh ? "日常" : "Daily" }
            ]}
          />
        ),
        code: code([
          "<Select",
          "  multiple",
          "  clearable",
          "  filterable",
          "  options={ownerOptions}",
          "  value={owners}",
          "  onValueChange={setOwners}",
          "/>"
        ])
      },
      {
        id: "groups",
        title: zh ? "分组选项" : "Grouped options",
        description: zh ? "用 group 字段把选项按业务上下文分层，未分组项也会正常保留。" : "Use group to organize options by product context; ungrouped options stay visible too.",
        preview: (
          <Select
            options={[
              { value: "daily", label: zh ? "日常路线" : "Daily routes", group: zh ? "运营" : "Ops" },
              { value: "event", label: zh ? "活动路线" : "Campaign routes", group: zh ? "活动" : "Campaign" },
              { value: "loose", label: zh ? "临时路线" : "Loose route" }
            ]}
            placeholder={zh ? "选择场景" : "Choose scenario"}
          />
        ),
        code: code(['<Select options={[{ value: "daily", label: "日常路线", group: "运营" }, { value: "loose", label: "临时路线" }]} />'])
      },
      {
        id: "remote",
        title: zh ? "远程搜索事件" : "Remote search event",
        description: zh ? "remoteMethod 接收查询词，业务层可以接远程接口。" : "remoteMethod receives the query so the product can call a remote source.",
        preview: <Select filterable remoteMethod={() => undefined} options={[{ value: "cedar", label: zh ? "雪松" : "Cedar" }]} placeholder={zh ? "输入关键字" : "Type keyword"} />,
        code: code(['<Select filterable remoteMethod={fetchOptions} options={options} />'])
      }
    ];
  }

  function renderCascaderExamples(): DocExample[] {
    return [
      {
        id: "multiple-routes",
        title: zh ? "多路线选择" : "Multiple route selection",
        description: zh ? "multiple 模式返回完整路径数组，适合一个任务绑定多条路线。" : "multiple mode returns full path arrays for tasks bound to several routes.",
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
      },
      {
        id: "single",
        title: zh ? "单路线选择" : "Single route selection",
        description: zh ? "单选模式保持 string[] 路径值，适合地址或组织层级。" : "Single mode keeps a string[] path for address or organization hierarchy.",
        preview: <Cascader clearable options={routeOptions} value={cascaderValue} onValueChange={(value) => setCascaderValue(value as string[])} />,
        code: code(['<Cascader options={routeOptions} value={route} onValueChange={setRoute} />'])
      },
      {
        id: "filter",
        title: zh ? "筛选路径" : "Filter paths",
        description: zh ? "filterable 让深层路径可以直接搜索。" : "filterable lets users search deep paths directly.",
        preview: <Cascader filterable options={routeOptions} placeholder={zh ? "搜索路线" : "Search routes"} />,
        code: code(['<Cascader filterable options={routeOptions} />'])
      }
    ];
  }

  function renderTreeSelectExamples(): DocExample[] {
    return [
      {
        id: "multiple",
        title: zh ? "树形多选" : "Tree multiple selection",
        description: zh ? "多选树适合权限范围、组织范围和分类筛选。" : "Tree multiple selection fits scopes, organization ranges, and category filters.",
        preview: (
          <TreeSelect
            multiple
            clearable
            filterable
            data={routeTreeData}
            defaultExpanded={["routes"]}
            value={treeSelectWorkbenchValue}
            onValueChange={setTreeSelectWorkbenchValue}
            placeholder={zh ? "选择范围" : "Choose scope"}
          />
        ),
        code: code([
          "<TreeSelect",
          "  multiple",
          "  clearable",
          "  filterable",
          "  data={treeData}",
          "  value={scope}",
          "  onValueChange={setScope}",
          "/>"
        ])
      },
      {
        id: "custom-node",
        title: zh ? "自定义节点" : "Custom node",
        description: zh ? "renderNode 可在节点中加入数量、状态或图标。" : "renderNode can add counts, status, or icons inside nodes.",
        preview: <TreeSelect data={routeTreeData} renderNode={(node) => <span>{node.label} · {zh ? "可见" : "Visible"}</span>} />,
        code: code(["<TreeSelect data={treeData} renderNode={(node) => <span>{node.label}</span>} />"])
      }
    ];
  }

  function renderTreeExamples(): DocExample[] {
    return [
      {
        id: "check-expand",
        title: zh ? "勾选与展开" : "Check and expand",
        description: zh ? "受控 checkedKeys 和 expandedKeys 让树形控件适合设置页。" : "Controlled checkedKeys and expandedKeys make Tree useful in settings pages.",
        preview: (
          <Tree
            checkable
            items={routeTreeData}
            expandedKeys={treeWorkbenchExpandedKeys}
            checkedKeys={treeWorkbenchCheckedKeys}
            onExpandChange={setTreeWorkbenchExpandedKeys}
            onCheckChange={setTreeWorkbenchCheckedKeys}
          />
        ),
        code: code([
          "<Tree",
          "  checkable",
          "  items={treeData}",
          "  expandedKeys={expandedKeys}",
          "  checkedKeys={checkedKeys}",
          "  onExpandChange={setExpandedKeys}",
          "  onCheckChange={setCheckedKeys}",
          "/>"
        ])
      },
      {
        id: "lazy",
        title: zh ? "节点事件" : "Node events",
        description: zh ? "点击、选择、展开事件适合驱动右侧详情面板。" : "Click, select, and expand events can drive a side detail panel.",
        preview: <Tree items={routeTreeData} defaultExpanded={["routes"]} onNodeClick={() => undefined} />,
        code: code(["<Tree items={treeData} defaultExpanded={['routes']} onNodeClick={openDetail} />"])
      }
    ];
  }

  function renderDateRangeExamples(): DocExample[] {
    return [
      {
        id: "scheduling-shortcuts",
        title: zh ? "排期快捷预设" : "Scheduling shortcuts",
        description: zh ? "用 helper 生成今天、最近 7 天、本周等业务排期快捷项。" : "Use helpers to generate today, last 7 days, this week, and other scheduling shortcuts.",
        preview: (
          <Space direction="vertical">
            <DateRangePickerPanel value={dateRangeValue} onValueChange={setDateRangeValue} shortcuts={dateRangePresets} />
            <Tag>{formatPinepostDateRange(dateRangeValue, { fallback: zh ? "未选择" : "Open", locale })}</Tag>
          </Space>
        ),
        code: code([
          "const shortcuts = createPinepostDateRangePresets({ locale: 'zh-CN' });",
          "<DateRangePickerPanel value={range} onValueChange={setRange} shortcuts={shortcuts} />"
        ])
      },
      {
        id: "disabled",
        title: zh ? "限制日期" : "Disabled dates",
        description: zh ? "disabledDate 可以屏蔽不可排期的日期。" : "disabledDate blocks dates that cannot be scheduled.",
        preview: <DateRangePickerPanel disabledDate={(date) => date < new Date(2026, 4, 1)} />,
        code: code(["<DateRangePickerPanel disabledDate={(date) => date < minDate} />"])
      },
      {
        id: "blocked-dispatch-day",
        title: zh ? "运营封锁日" : "Blocked dispatch day",
        description: zh ? "如果范围跨过封锁日，日期范围不会写入业务筛选。" : "If a range crosses a blocked day, it is not written into the product filter.",
        preview: <BlockedDateRangeExample />,
        code: code([
          "<DateRangePickerPanel",
          "  value={range}",
          "  onValueChange={setRange}",
          "  month={new Date(2026, 4, 1)}",
          "  disabledDate={(date) => sameDay(date, blockedDay)}",
          "  shortcuts={[",
          "    { label: '开放窗口', value: [new Date(2026, 4, 12), new Date(2026, 4, 14)] },",
          "    { label: '跨封锁日', value: [new Date(2026, 4, 18), new Date(2026, 4, 22)] }",
          "  ]}",
          "/>"
        ])
      }
    ];
  }

  function renderTimeRangeExamples(): DocExample[] {
    return [
      {
        id: "common-ranges",
        title: zh ? "常用时间段" : "Common time ranges",
        description: zh ? "上午、下午、全天等预设可以直接写入预约窗口。" : "Morning, afternoon, and all-day presets can write directly to appointment windows.",
        preview: (
          <Space direction="vertical">
            <TimeRangePickerPanel
              value={timeRangeValue}
              onValueChange={setTimeRangeValue}
              start="09:00"
              end="18:00"
              step="00:30"
              shortcuts={timeRangePresets}
            />
            <Tag>{formatPinepostTimeRange(timeRangeValue, { fallback: zh ? "未定" : "Open", locale })}</Tag>
          </Space>
        ),
        code: code([
          "const shortcuts = createPinepostTimeRangePresets({ locale: 'zh-CN' });",
          '<TimeRangePickerPanel start="09:00" end="18:00" step="00:30" shortcuts={shortcuts} />'
        ])
      },
      {
        id: "step",
        title: zh ? "步长控制" : "Step control",
        description: zh ? "start、end 和 step 控制可选时间粒度。" : "start, end, and step control selectable time granularity.",
        preview: <TimeRangePickerPanel start="08:00" end="12:00" step="01:00" />,
        code: code(['<TimeRangePickerPanel start="08:00" end="12:00" step="01:00" />'])
      },
      {
        id: "blocked-time-window",
        title: zh ? "关闭时段" : "Closed time window",
        description: zh ? "disabledTime 同时限制手动时间点和快捷时段。" : "disabledTime applies to both manual time buttons and shortcut windows.",
        preview: <BlockedTimeRangeExample />,
        code: code([
          "<TimeRangePickerPanel",
          "  value={timeRange}",
          "  onValueChange={setTimeRange}",
          "  disabledTime={(time) => time === '12:00'}",
          "  shortcuts={[",
          "    { label: '午间窗口', value: ['12:00', '13:00'] },",
          "    { label: '上午窗口', value: ['09:00', '11:00'] }",
          "  ]}",
          "/>"
        ])
      }
    ];
  }

  function renderSelectWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "Select API 演示台" : "Select API workbench"}
        labels={labels}
        events={selectWorkbenchEvents}
        status={Array.isArray(selectWorkbenchValue) && selectWorkbenchValue.length > 0 ? (zh ? `已选择 ${selectWorkbenchValue.length} 项。` : `${selectWorkbenchValue.length} selected.`) : (zh ? "等待选择。" : "Waiting for selection.")}
        description={zh ? "一个负责人选择器演示 multiple、clearable、filterable、分组、remoteMethod、onClear 和 ref methods。" : "One owner selector covers multiple, clearable, filterable, groups, remoteMethod, onClear, and ref methods."}
        preview={(
          <Select
            ref={selectWorkbenchRef}
            aria-label={zh ? "负责人选择" : "Owner picker"}
            multiple
            clearable
            filterable
            placeholder={zh ? "选择负责人" : "Choose owners"}
            value={selectWorkbenchValue}
            onValueChange={(value) => {
              setSelectWorkbenchValue(value);
              pushDemoEvent(setSelectWorkbenchEvents, zh ? `onValueChange: ${Array.isArray(value) ? value.join(", ") : value}` : `onValueChange: ${Array.isArray(value) ? value.join(", ") : value}`);
            }}
            onClear={() => pushDemoEvent(setSelectWorkbenchEvents, zh ? "onClear: 已清空" : "onClear: cleared")}
            remoteMethod={(query) => pushDemoEvent(setSelectWorkbenchEvents, zh ? `remoteMethod: ${query || "空查询"}` : `remoteMethod: ${query || "empty query"}`)}
            options={[
              { value: "north", label: zh ? "北线负责人" : "North owner", group: zh ? "日常" : "Daily" },
              { value: "market", label: zh ? "集市负责人" : "Market owner", group: zh ? "活动" : "Campaign" },
              { value: "backup", label: zh ? "备用负责人" : "Backup owner", group: zh ? "日常" : "Daily" }
            ]}
          />
        )}
        controls={<Text>{zh ? "打开下拉后输入关键字可触发远程搜索事件。" : "Open the list and type to trigger remote search events."}</Text>}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => selectWorkbenchRef.current?.focus()}>{zh ? "聚焦" : "Focus"}</Button>
            <Button size="sm" variant="soft" onClick={() => selectWorkbenchRef.current?.clear()}>{zh ? "清空" : "Clear"}</Button>
            <Button size="sm" variant="parcel" onClick={() => selectWorkbenchRef.current?.blur()}>{zh ? "失焦" : "Blur"}</Button>
          </div>
        )}
        codeText={code([
          'import { Select, type SelectRef } from "pinepost-ui";',
          "",
          "const selectRef = React.useRef<SelectRef>(null);",
          "",
          "<Select",
          "  ref={selectRef}",
          "  multiple",
          "  clearable",
          "  filterable",
          "  options={ownerOptions}",
          "  value={owners}",
          "  onValueChange={setOwners}",
          "  remoteMethod={fetchOwners}",
          "/>"
        ])}
      />
    );
  }

  function renderCascaderWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "Cascader API 演示台" : "Cascader API workbench"}
        labels={labels}
        events={cascaderWorkbenchEvents}
        status={zh ? `已选择 ${cascaderWorkbenchValue.length} 条路线。` : `${cascaderWorkbenchValue.length} routes selected.`}
        description={zh ? "一个多路线派发器演示 multiple、filterable、clearable、showAllLevels、onExpandChange 和 ref methods。" : "One route dispatcher covers multiple, filterable, clearable, showAllLevels, onExpandChange, and ref methods."}
        preview={(
          <Cascader
            ref={cascaderWorkbenchRef}
            multiple
            clearable
            filterable
            options={routeOptions}
            placeholder={zh ? "选择多条路线" : "Choose routes"}
            value={cascaderWorkbenchValue}
            onExpandChange={(value) => pushDemoEvent(setCascaderWorkbenchEvents, zh ? `onExpandChange: ${value.join("/")}` : `onExpandChange: ${value.join("/")}`)}
            onVisibleChange={(open) => pushDemoEvent(setCascaderWorkbenchEvents, zh ? `onVisibleChange: ${open ? "打开" : "关闭"}` : `onVisibleChange: ${open ? "open" : "closed"}`)}
            onValueChange={(value) => {
              setCascaderWorkbenchValue(value as CascaderMultipleValue);
              pushDemoEvent(setCascaderWorkbenchEvents, zh ? "onValueChange: 多路线已更新" : "onValueChange: routes updated");
            }}
          />
        )}
        controls={<Text>{zh ? "叶子节点可多选，筛选命中后也会保持完整路径值。" : "Leaf nodes are multi-selectable, including filtered matches."}</Text>}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => cascaderWorkbenchRef.current?.focus()}>{zh ? "聚焦" : "Focus"}</Button>
            <Button size="sm" variant="soft" onClick={() => cascaderWorkbenchRef.current?.clear()}>{zh ? "清空" : "Clear"}</Button>
            <Button size="sm" variant="parcel" onClick={() => cascaderWorkbenchRef.current?.blur()}>{zh ? "失焦" : "Blur"}</Button>
          </div>
        )}
        codeText={code([
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
        ])}
      />
    );
  }

  function renderTreeSelectWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "TreeSelect API 演示台" : "TreeSelect API workbench"}
        labels={labels}
        events={treeSelectWorkbenchEvents}
        status={Array.isArray(treeSelectWorkbenchValue) ? (zh ? `已选择 ${treeSelectWorkbenchValue.length} 个节点。` : `${treeSelectWorkbenchValue.length} nodes selected.`) : (zh ? "单选模式。" : "Single mode.")}
        description={zh ? "一个权限范围选择器演示 multiple、filterable、clearable、defaultExpanded、renderNode 和 ref methods。" : "One scope picker covers multiple, filterable, clearable, defaultExpanded, renderNode, and ref methods."}
        preview={(
          <TreeSelect
            ref={treeSelectWorkbenchRef}
            multiple
            clearable
            filterable
            data={routeTreeData}
            defaultExpanded={["routes"]}
            placeholder={zh ? "选择可见范围" : "Choose visibility scope"}
            renderNode={(node) => <span>{node.label}</span>}
            value={treeSelectWorkbenchValue}
            onNodeClick={(node) => pushDemoEvent(setTreeSelectWorkbenchEvents, zh ? `onNodeClick: ${node.value}` : `onNodeClick: ${node.value}`)}
            onVisibleChange={(open) => pushDemoEvent(setTreeSelectWorkbenchEvents, zh ? `onVisibleChange: ${open ? "打开" : "关闭"}` : `onVisibleChange: ${open ? "open" : "closed"}`)}
            onValueChange={(value) => {
              setTreeSelectWorkbenchValue(value);
              pushDemoEvent(setTreeSelectWorkbenchEvents, zh ? "onValueChange: 范围已更新" : "onValueChange: scope updated");
            }}
          />
        )}
        controls={<Text>{zh ? "筛选、点击节点和清空都会写入事件日志。" : "Filtering, node clicks, and clear actions write to the event log."}</Text>}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => treeSelectWorkbenchRef.current?.focus()}>{zh ? "聚焦" : "Focus"}</Button>
            <Button size="sm" variant="soft" onClick={() => treeSelectWorkbenchRef.current?.clear()}>{zh ? "清空" : "Clear"}</Button>
            <Button size="sm" variant="parcel" onClick={() => treeSelectWorkbenchRef.current?.blur()}>{zh ? "失焦" : "Blur"}</Button>
          </div>
        )}
        codeText={code([
          'import { TreeSelect, type TreeSelectRef } from "pinepost-ui";',
          "",
          "const treeSelectRef = React.useRef<TreeSelectRef>(null);",
          "",
          "<TreeSelect",
          "  ref={treeSelectRef}",
          "  multiple",
          "  clearable",
          "  filterable",
          "  data={scopeTree}",
          "  defaultExpanded={['routes']}",
          "  value={scope}",
          "  onValueChange={setScope}",
          "/>"
        ])}
      />
    );
  }

  function renderTreeWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "Tree API 演示台" : "Tree API workbench"}
        labels={labels}
        events={treeWorkbenchEvents}
        status={zh ? `已勾选 ${treeWorkbenchCheckedKeys.length} 个节点。` : `${treeWorkbenchCheckedKeys.length} checked.`}
        description={zh ? "一个路线树演示 checkable、expandedKeys、checkedKeys、lazy load、节点事件和 ref methods。" : "One route tree covers checkable, expandedKeys, checkedKeys, lazy load, node events, and ref methods."}
        preview={(
          <Tree
            ref={treeWorkbenchRef}
            checkable
            expandedKeys={treeWorkbenchExpandedKeys}
            checkedKeys={treeWorkbenchCheckedKeys}
            items={routeTreeData}
            onCheckChange={(keys) => {
              setTreeWorkbenchCheckedKeys(keys);
              pushDemoEvent(setTreeWorkbenchEvents, zh ? `onCheckChange: ${keys.length} 个节点` : `onCheckChange: ${keys.length} nodes`);
            }}
            onExpandChange={(keys) => {
              setTreeWorkbenchExpandedKeys(keys);
              pushDemoEvent(setTreeWorkbenchEvents, zh ? `onExpandChange: ${keys.length} 个展开` : `onExpandChange: ${keys.length} expanded`);
            }}
            onNodeClick={(node) => pushDemoEvent(setTreeWorkbenchEvents, zh ? `onNodeClick: ${node.value}` : `onNodeClick: ${node.value}`)}
            onSelect={(value) => pushDemoEvent(setTreeWorkbenchEvents, zh ? `onSelect: ${value}` : `onSelect: ${value}`)}
          />
        )}
        controls={<Text>{zh ? "受控展开和勾选状态展示在顶部状态条。" : "Controlled expanded and checked state appears in the status bar."}</Text>}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => {
              treeWorkbenchRef.current?.setExpandedKeys(["routes"]);
              setTreeWorkbenchExpandedKeys(["routes"]);
              pushDemoEvent(setTreeWorkbenchEvents, zh ? "methods.setExpandedKeys" : "methods.setExpandedKeys");
            }}>{zh ? "展开根节点" : "Expand root"}</Button>
            <Button size="sm" variant="soft" onClick={() => {
              treeWorkbenchRef.current?.setCheckedKeys(["cedar", "moss"]);
              setTreeWorkbenchCheckedKeys(["cedar", "moss"]);
              pushDemoEvent(setTreeWorkbenchEvents, zh ? "methods.setCheckedKeys" : "methods.setCheckedKeys");
            }}>{zh ? "勾选桌台" : "Check desks"}</Button>
            <Button size="sm" variant="parcel" onClick={() => {
              treeWorkbenchRef.current?.clearChecked();
              setTreeWorkbenchCheckedKeys([]);
              pushDemoEvent(setTreeWorkbenchEvents, zh ? "methods.clearChecked" : "methods.clearChecked");
            }}>{zh ? "清空勾选" : "Clear checked"}</Button>
          </div>
        )}
        codeText={code([
          'import { Tree, type TreeRef } from "pinepost-ui";',
          "",
          "const treeRef = React.useRef<TreeRef>(null);",
          "",
          "<Tree",
          "  ref={treeRef}",
          "  checkable",
          "  expandedKeys={expandedKeys}",
          "  checkedKeys={checkedKeys}",
          "  items={treeItems}",
          "  onCheckChange={setCheckedKeys}",
          "  onExpandChange={setExpandedKeys}",
          "/>"
        ])}
      />
    );
  }

  function renderDateRangeWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "DateRangePickerPanel API 演示台" : "DateRangePickerPanel API workbench"}
        labels={labels}
        events={dateRangeWorkbenchEvents}
        status={formatPinepostDateRange(dateRangeValue, { fallback: zh ? "未选择" : "Open", locale })}
        description={zh ? "一个运营排期筛选器演示 value、onValueChange、shortcuts、disabledDate 和格式化 helper。" : "One scheduling filter covers value, onValueChange, shortcuts, disabledDate, and formatting helpers."}
        preview={(
          <Space direction="vertical">
            <DateRangePickerPanel
              value={dateRangeValue}
              onValueChange={(value) => {
                setDateRangeValue(value);
                pushDemoEvent(setDateRangeWorkbenchEvents, zh ? "onValueChange: 日期范围已更新" : "onValueChange: date range updated");
              }}
              shortcuts={dateRangePresets}
              disabledDate={(date) => date < new Date(2026, 4, 1)}
            />
            <Tag>{formatPinepostDateRange(dateRangeValue, { fallback: zh ? "未选择" : "Open", locale })}</Tag>
          </Space>
        )}
        controls={<Text>{zh ? "快捷预设来自 createPinepostDateRangePresets，可直接写入业务筛选条件。" : "Shortcuts come from createPinepostDateRangePresets and update product filters directly."}</Text>}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => {
              const next: [Date, Date] = [new Date(2026, 4, 18), new Date(2026, 4, 24)];
              setDateRangeValue(next);
              pushDemoEvent(setDateRangeWorkbenchEvents, zh ? "shortcut: 本周" : "shortcut: this week");
            }}>{zh ? "设为本周" : "Set this week"}</Button>
            <Button size="sm" variant="parcel" onClick={() => {
              setDateRangeValue([undefined, undefined]);
              pushDemoEvent(setDateRangeWorkbenchEvents, zh ? "clear: 已清空范围" : "clear: range cleared");
            }}>{zh ? "清空范围" : "Clear range"}</Button>
          </div>
        )}
        codeText={code([
          'import { DateRangePickerPanel, createPinepostDateRangePresets, formatPinepostDateRange } from "pinepost-ui";',
          "",
          "const shortcuts = createPinepostDateRangePresets({ locale: 'zh-CN' });",
          "",
          "<DateRangePickerPanel",
          "  value={range}",
          "  onValueChange={setRange}",
          "  shortcuts={shortcuts}",
          "  disabledDate={(date) => date < minDate}",
          "/>",
          "formatPinepostDateRange(range, { locale: 'zh-CN' })"
        ])}
      />
    );
  }

  function renderTimeRangeWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "TimeRangePickerPanel API 演示台" : "TimeRangePickerPanel API workbench"}
        labels={labels}
        events={timeRangeWorkbenchEvents}
        status={formatPinepostTimeRange(timeRangeValue, { fallback: zh ? "未定" : "Open", locale })}
        description={zh ? "一个预约窗口演示 value、onValueChange、start/end/step、shortcuts 和格式化 helper。" : "One appointment window covers value, onValueChange, start/end/step, shortcuts, and formatting helpers."}
        preview={(
          <Space direction="vertical">
            <TimeRangePickerPanel
              value={timeRangeValue}
              onValueChange={(value) => {
                setTimeRangeValue(value);
                pushDemoEvent(setTimeRangeWorkbenchEvents, zh ? "onValueChange: 时间范围已更新" : "onValueChange: time range updated");
              }}
              start="09:00"
              end="18:00"
              step="00:30"
              startLabel={zh ? "开始时间" : "Start time"}
              endLabel={zh ? "结束时间" : "End time"}
              shortcuts={timeRangePresets}
            />
            <Tag>{formatPinepostTimeRange(timeRangeValue, { fallback: zh ? "未定" : "Open", locale })}</Tag>
          </Space>
        )}
        controls={<Text>{zh ? "快捷预设来自 createPinepostTimeRangePresets，适合运营排期和预约窗口。" : "Shortcuts come from createPinepostTimeRangePresets for scheduling and appointments."}</Text>}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => {
              setTimeRangeValue(["09:00", "12:00"]);
              pushDemoEvent(setTimeRangeWorkbenchEvents, zh ? "shortcut: 上午" : "shortcut: morning");
            }}>{zh ? "设为上午" : "Set morning"}</Button>
            <Button size="sm" variant="parcel" onClick={() => {
              setTimeRangeValue([undefined, undefined]);
              pushDemoEvent(setTimeRangeWorkbenchEvents, zh ? "clear: 已清空窗口" : "clear: window cleared");
            }}>{zh ? "清空窗口" : "Clear window"}</Button>
          </div>
        )}
        codeText={code([
          'import { TimeRangePickerPanel, createPinepostTimeRangePresets, formatPinepostTimeRange } from "pinepost-ui";',
          "",
          "const shortcuts = createPinepostTimeRangePresets({ locale: 'zh-CN' });",
          "",
          "<TimeRangePickerPanel",
          "  value={timeRange}",
          "  onValueChange={setTimeRange}",
          "  start=\"09:00\"",
          "  end=\"18:00\"",
          "  step=\"00:30\"",
          "  shortcuts={shortcuts}",
          "/>",
          "formatPinepostTimeRange(timeRange, { locale: 'zh-CN' })"
        ])}
      />
    );
  }



  return { renderSelectExamples, renderCascaderExamples, renderTreeSelectExamples, renderTreeExamples, renderDateRangeExamples, renderTimeRangeExamples, renderSelectWorkbench, renderCascaderWorkbench, renderTreeSelectWorkbench, renderTreeWorkbench, renderDateRangeWorkbench, renderTimeRangeWorkbench };
}
