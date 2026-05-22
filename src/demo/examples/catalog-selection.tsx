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

export function createSelectionCatalogDocs(context: DemoCatalogContext): DocItem[] {
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
      id: "cascader",
      group: labels.groups.form,
      title: zh ? "Cascader 级联选择" : "Cascader",
      description: zh ? "多层路线选择器，支持筛选、清空、懒加载、自定义节点、键盘导航、展开事件和方法调用。" : "Layered route selection with filtering, clear action, lazy loading, custom nodes, keyboard navigation, expand events, and methods.",
      searchText: "multi cascader multiple 多选 多路线 selection route",
      examples: renderCascaderExamples(),
      playground: renderCascaderWorkbench(),
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
            { prop: "Home / End", type: "keyboard", defaultValue: "-", description: zh ? "在筛选命中中跳到首项或末项。" : "Jumps to the first or last filtered match." },
            { prop: "Filter Enter / Space", type: "keyboard", defaultValue: "-", description: zh ? "提交或切换当前筛选命中。" : "Commits or toggles the active filtered match." },
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
      description: zh ? "树结构选择器，支持单选、多选、筛选、懒加载、自定义节点、节点事件和完整键盘契约。" : "Tree selector with single or multiple selection, filtering, lazy loading, custom nodes, node events, and a complete keyboard contract.",
      examples: renderTreeSelectExamples(),
      playground: renderTreeSelectWorkbench(),
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
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "ArrowUp / ArrowDown", type: "keyboard", defaultValue: "-", description: zh ? "在可见且未禁用的节点之间移动焦点。" : "Moves focus through visible enabled nodes." },
            { prop: "Home / End", type: "keyboard", defaultValue: "-", description: zh ? "移动到第一个或最后一个可见节点。" : "Moves to the first or last visible node." },
            { prop: "ArrowRight", type: "keyboard", defaultValue: "-", description: zh ? "展开分支，并可触发懒加载。" : "Expands a branch and can trigger lazy loading." },
            { prop: "ArrowLeft", type: "keyboard", defaultValue: "-", description: zh ? "收起展开的分支，或回到父节点。" : "Collapses an open branch or returns to the parent node." },
            { prop: "Enter / Space", type: "keyboard", defaultValue: "-", description: zh ? "展开分支或选择、切换叶子节点。" : "Expands a branch or selects and toggles leaf nodes." },
            { prop: "Escape", type: "keyboard", defaultValue: "-", description: zh ? "关闭面板并回到触发器。" : "Closes the panel and returns to the trigger." }
          ]
        }
      ]
    },
    {
      id: "virtualized-select",
      group: labels.groups.form,
      title: zh ? "VirtualizedSelect 虚拟选择器" : "VirtualizedSelect",
      description: zh ? "用于大量或远程选项的选择器，只渲染当前视窗附近的条目，并保持键盘移动、筛选、加载和空态交接。" : "Select for large or remote option sets, rendering only the visible window while preserving keyboard movement, filtering, loading, and empty-state handoff.",
      searchText: "virtualized select large options keyboard filter listbox remote loading empty handoff v0.30 大量 选项 虚拟 键盘 筛选 远程 加载 空态 交接",
      preview: (
        <VirtualizedSelect
          clearable
          filterable
          emptyText={zh ? "没有匹配路线" : "No route matches"}
          onValueChange={(value) => setVirtualSelectValue(Array.isArray(value) ? value[0] ?? "" : value)}
          options={virtualOptions}
          value={virtualSelectValue}
        />
      ),
      code: code([
        'import { VirtualizedSelect } from "pinepost-ui";',
        "",
        "<VirtualizedSelect",
        "  filterable",
        "  height={220}",
        "  itemHeight={38}",
        "  emptyText=\"No route matches\"",
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
            { prop: "filterable", type: "boolean", defaultValue: "false", description: zh ? "启用筛选。" : "Enables filtering." },
            { prop: "loading / loadingText", type: "boolean / ReactNode", defaultValue: "false / Loading...", description: zh ? "远程选项请求中的可见状态。" : "Visible state while remote options are loading." },
            { prop: "emptyText", type: "ReactNode", defaultValue: "No options", description: zh ? "筛选或远程请求无结果时显示。" : "Shown when filtering or remote loading returns no options." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange / onChange", type: "(value: string) => void", defaultValue: "-", description: zh ? "选择变化。" : "Selection changes." },
            { prop: "remoteMethod", type: "(query: string) => void", defaultValue: "-", description: zh ? "筛选词变化时交给业务层拉取远程选项。" : "Hands filter query changes to the product layer for remote options." }
          ]
        },
        {
          title: labels.methods,
          rows: [
            { prop: "focus / blur / clear", type: "VirtualizedSelectRef", defaultValue: "-", description: zh ? "聚焦、失焦和清空。" : "Focus, blur, and clear." }
          ]
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "ArrowUp / ArrowDown", type: "keyboard", defaultValue: "-", description: zh ? "在未禁用选项之间移动当前项。" : "Moves the active item through enabled options." },
            { prop: "Home / End", type: "keyboard", defaultValue: "-", description: zh ? "跳到第一个或最后一个可选项，并同步滚动窗口。" : "Jumps to the first or last enabled option and syncs the scroll window." },
            { prop: "Enter / Space", type: "keyboard", defaultValue: "-", description: zh ? "选择单项或切换多选项。" : "Selects a single option or toggles a multiple option." },
            { prop: "Escape", type: "keyboard", defaultValue: "-", description: zh ? "关闭面板、清空筛选并回到触发器。" : "Closes the panel, clears the filter, and returns to the trigger." }
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

  ];
}
