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

export function createTableExamples(context: DemoContext) {
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

  function clearTableFilters() {
    setTableReadyFilter(false);
    setTableWorkbenchStatus(zh ? "筛选已清空。" : "Filters cleared.");
    pushDemoEvent(setTableWorkbenchEvents, zh ? "onFilterClear: 清空筛选" : "onFilterClear: filters cleared");
  }

  function renderTableExamples(): DocExample[] {
    const simpleColumns = [
      { key: "desk", title: zh ? "桌台" : "Desk", width: 120 },
      { key: "route", title: zh ? "路线" : "Route", sortable: true, width: 120 },
      { key: "count", title: zh ? "数量" : "Count", align: "right" as const, sortable: true, width: 90 },
      { key: "status", title: zh ? "状态" : "Status", width: 120 }
    ];

    return [
      {
        id: "basic",
        title: zh ? "基础表格" : "Basic table",
        description: zh ? "用清爽的数据网格展示日常运营记录，默认不混入配置控件。" : "A clean data grid for daily operations without mixing control panels into the main example.",
        preview: (
          <Table
            rowKey="id"
            density="compact"
            columns={simpleColumns}
            data={tableRows}
          />
        ),
        code: code([
          'import { Table } from "pinepost-ui";',
          "",
          "<Table",
          "  rowKey=\"id\"",
          "  density=\"compact\"",
          "  columns={columns}",
          "  data={rows}",
          "/>"
        ])
      },
      {
        id: "filters",
        title: zh ? "筛选与清空" : "Filters and reset",
        description: zh ? "筛选标签、搜索条件和清空动作只影响当前表格，不触发无关全局反馈。" : "Filter chips, search, and reset actions only update this table example.",
        preview: (
          <div className="docs-product-panel">
            <div className="docs-example-actions">
              <Tag>{zh ? `结果 ${tableFilterExampleRows.length}` : `${tableFilterExampleRows.length} results`}</Tag>
              {tableFilterExampleTags.map((tag) => <Tag key={tag.key}>{tag.label}</Tag>)}
              <Button size="sm" variant="soft" onClick={() => {
                setTableFilterExampleReady(false);
                setTableFilterExampleStatus(zh ? "筛选已清空。" : "Filters cleared.");
              }}>{zh ? "清空筛选" : "Clear filters"}</Button>
              <Button size="sm" variant="soft" onClick={() => {
                setTableFilterExampleReady(true);
                setTableFilterExampleStatus(zh ? "已启用就绪筛选。" : "Ready filter enabled.");
              }}>{zh ? "只看就绪" : "Ready only"}</Button>
            </div>
            {tableFilterExampleStatus && <Alert variant="info" title={tableFilterExampleStatus} />}
            <Table
              rowKey="id"
              density="compact"
              filterTags={tableFilterExampleTags}
              onFilterClear={() => {
                setTableFilterExampleReady(false);
                setTableFilterExampleStatus(zh ? "筛选已清空。" : "Filters cleared.");
              }}
              columns={simpleColumns}
              data={tableFilterExampleRows}
            />
          </div>
        ),
        code: code([
          "<Table",
          "  rowKey=\"id\"",
          "  filterTags={filters}",
          "  onFilterClear={clearFilters}",
          "  columns={columns}",
          "  data={filteredRows}",
          "/>"
        ])
      },
      {
        id: "selection-sort",
        title: zh ? "排序与选择" : "Sorting and selection",
        description: zh ? "可排序列和行选择适合列表批量处理。" : "Sortable columns and row selection support batch workflows.",
        preview: (
          <Table
            rowKey="id"
            selectable
            density="compact"
            sortState={{ key: "count", order: "desc" }}
            columns={simpleColumns}
            data={tableRows}
          />
        ),
        code: code([
          "<Table",
          "  rowKey=\"id\"",
          "  selectable",
          "  sortState={{ key: 'count', order: 'desc' }}",
          "  columns={columns}",
          "  data={rows}",
          "/>"
        ])
      },
      {
        id: "expanded-summary",
        title: zh ? "展开行与汇总" : "Expanded rows and summary",
        description: zh ? "展开行承载附加说明，汇总行用于数字列合计。" : "Expanded rows carry details while summary rows total numeric columns.",
        preview: (
          <Table
            rowKey="id"
            density="compact"
            defaultExpandedRowKeys={["a7"]}
            renderExpandedRow={(row) => <Text>{zh ? `${row.route} 今日优先投递。` : `${row.route} ships first today.`}</Text>}
            summary={(rows) => ({ route: zh ? "合计" : "Total", count: rows.reduce((total, row) => total + row.count, 0) })}
            columns={simpleColumns}
            data={tableRows}
          />
        ),
        code: code([
          "<Table",
          "  rowKey=\"id\"",
          "  defaultExpandedRowKeys={['a7']}",
          "  renderExpandedRow={(row) => <p>{row.route} detail</p>}",
          "  summary={(rows) => ({ count: rows.reduce((sum, row) => sum + row.count, 0) })}",
          "  columns={columns}",
          "  data={rows}",
          "/>"
        ])
      },
      {
        id: "settings-views",
        title: zh ? "列设置与视图" : "Column settings and views",
        description: zh ? "列顺序、隐藏列、密度和视图预设分成独立配置段，更接近真实后台设置。" : "Column order, visibility, density, and view presets sit in their own settings example.",
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
              storageKey="pinepost-demo-table-settings-v20"
            />
            <Table
              rowKey="id"
              density={tableSettings.density}
              columnOrder={tableSettings.columnOrder}
              hiddenColumns={tableSettings.hiddenColumns}
              viewPresetLabel={zh ? "视图" : "View"}
              viewPresets={[
                { key: "full", label: zh ? "完整" : "Full", hiddenColumns: [] },
                { key: "review", label: zh ? "复核" : "Review", columnOrder: ["status", "route", "count"], hiddenColumns: ["count"] }
              ]}
              columns={[
                { key: "route", title: zh ? "路线" : "Route" },
                { key: "count", title: zh ? "数量" : "Count", align: "right" },
                { key: "status", title: zh ? "状态" : "Status" }
              ]}
              data={tableRows}
            />
          </div>
        ),
        code: code([
          'import { Table, TableColumnSettings } from "pinepost-ui";',
          "",
          "<TableColumnSettings columns={columns} value={settings} onValueChange={setSettings} />",
          "<Table",
          "  columns={columns}",
          "  data={rows}",
          "  columnOrder={settings.columnOrder}",
          "  hiddenColumns={settings.hiddenColumns}",
          "  density={settings.density}",
          "  viewPresets={viewPresets}",
          "/>"
        ])
      },
      {
        id: "states",
        title: zh ? "空、加载与错误" : "Empty, loading, and error",
        description: zh ? "边界状态和表格主体分开表达，避免用户误以为操作已经成功。" : "Boundary states are shown separately so product state stays unambiguous.",
        preview: (
          <div className="docs-state-grid">
            <Loading label={zh ? "正在加载表格" : "Loading table"} />
            <Empty title={zh ? "没有匹配记录" : "No matching rows"} description={zh ? "调整筛选条件后再试。" : "Adjust filters and try again."} />
            <Alert variant="warning" title={zh ? "数据同步失败" : "Sync failed"} description={zh ? "保留当前表格，不覆盖已选项。" : "Keep current rows and preserve selection."} />
          </div>
        ),
        code: code([
          '<Loading label="正在加载表格" />',
          '<Empty title="没有匹配记录" />',
          '<Alert variant="warning" title="数据同步失败" />'
        ])
      }
    ];
  }

  function renderTableWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "Table API 演示台" : "Table API workbench"}
        labels={labels}
        events={tableWorkbenchEvents}
        status={tableWorkbenchStatus || (zh ? `已选择 ${tableSelectedCount} 行` : `${tableSelectedCount} selected`)}
        description={zh ? "同一张业务表演示筛选、搜索、排序、选择、展开、编辑、视图预设、列设置和 ref methods。" : "One product table covers filters, search, sorting, selection, expansion, editing, view presets, column settings, and ref methods."}
        preview={(
          <div className="docs-field-grid">
            <div className="docs-workbench__summary">
              {tableFilterTags.map((tag) => <Tag key={tag.key}>{tag.label}</Tag>)}
              <Tag variant="sky">{zh ? `结果 ${filteredTableRows.length}` : `${filteredTableRows.length} results`}</Tag>
              <Tag variant="parcel">{tableActiveView === "review" ? (zh ? "复核视图" : "Review view") : (zh ? "完整视图" : "Full view")}</Tag>
            </div>
            <TableColumnSettings
              columns={[
                { key: "route", title: zh ? "路线" : "Route" },
                { key: "count", title: zh ? "数量" : "Count" },
                { key: "status", title: zh ? "状态" : "Status" }
              ]}
              value={tableSettings}
              onValueChange={(value) => {
                setTableSettings(value);
                pushDemoEvent(setTableWorkbenchEvents, zh ? "TableColumnSettings: 设置已更新" : "TableColumnSettings: settings changed");
              }}
              storageKey="pinepost-demo-table-settings-v19"
            />
            <Table
              ref={tableRef}
              rowKey="id"
              selectable
              editable
              density={tableSettings.density}
              filterTags={tableFilterTags}
              filters={{ status: tableReadyFilter ? (row) => row.status === (zh ? "就绪" : "Ready") : () => true }}
              hiddenColumns={tableSettings.hiddenColumns}
              columnOrder={tableSettings.columnOrder}
              onFilterClear={clearTableFilters}
              onSelectionChange={(rows) => {
                setTableSelectedCount(rows.length);
                pushDemoEvent(setTableWorkbenchEvents, zh ? `onSelectionChange: ${rows.length} 行` : `onSelectionChange: ${rows.length} rows`);
              }}
              onSortChange={(state) => pushDemoEvent(setTableWorkbenchEvents, state ? (zh ? `onSortChange: ${String(state.key)}` : `onSortChange: ${String(state.key)}`) : (zh ? "onSortChange: 已清空" : "onSortChange: cleared"))}
              onCellEdit={(row, key, value) => {
                setTableWorkbenchStatus(zh ? `${row.route} 的 ${String(key)} 已编辑。` : `${row.route} ${String(key)} edited.`);
                pushDemoEvent(setTableWorkbenchEvents, zh ? "onCellEdit: 已提交编辑" : "onCellEdit: edit committed");
              }}
              onExpandChange={(keys) => pushDemoEvent(setTableWorkbenchEvents, zh ? `onExpandChange: ${keys.length} 个展开` : `onExpandChange: ${keys.length} expanded`)}
              viewPreset={tableActiveView}
              onViewPresetChange={(key) => {
                setTableActiveView(key);
                setTableWorkbenchStatus(zh ? "视图已切换。" : "View changed.");
                pushDemoEvent(setTableWorkbenchEvents, zh ? `onViewPresetChange: ${key}` : `onViewPresetChange: ${key}`);
              }}
              viewPresetLabel={zh ? "视图" : "View"}
              viewPresets={[
                { key: "full", label: zh ? "完整" : "Full", columnWidths: { route: 140, count: 90 }, hiddenColumns: [] },
                { key: "review", label: zh ? "复核" : "Review", columnOrder: ["status", "route", "count"], hiddenColumns: ["count"], sortState: { key: "count", order: "desc" } }
              ]}
              defaultExpandedRowKeys={["a7"]}
              renderExpandedRow={(row) => <Text>{zh ? `${row.route} 今日优先投递。` : `${row.route} ships first today.`}</Text>}
              summary={(rows) => ({ route: zh ? "合计" : "Total", count: rows.reduce((total, row) => total + row.count, 0) })}
              columns={[
                { key: "desk", title: zh ? "桌台" : "Desk", fixed: "left", width: 120 },
                { key: "route", title: zh ? "路线" : "Route", editable: true, sortable: true, width: 120 },
                { key: "count", title: zh ? "数量" : "Count", align: "right", sortable: true, width: 90 },
                { key: "status", title: zh ? "状态" : "Status", fixed: "right", width: 120 }
              ]}
              data={filteredTableRows}
            />
          </div>
        )}
        controls={(
          <div className="docs-workbench__controls">
            <label>
              {zh ? "搜索路线" : "Search routes"}
              <Input value={tableQuery} onChange={(event) => setTableQuery(event.currentTarget.value)} placeholder="A7" inputSize="sm" />
            </label>
            <div className="docs-workbench__actions">
              <Button size="sm" variant={tableReadyFilter ? "primary" : "soft"} onClick={() => {
                setTableReadyFilter(true);
                setTableWorkbenchStatus(zh ? "已启用就绪筛选。" : "Ready filter enabled.");
                pushDemoEvent(setTableWorkbenchEvents, zh ? "filterTags: 状态就绪" : "filterTags: ready status");
              }}>{zh ? "只看就绪" : "Ready only"}</Button>
              <Button size="sm" variant="soft" onClick={clearTableFilters}>{zh ? "清空筛选" : "Clear filters"}</Button>
            </div>
          </div>
        )}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => {
              tableRef.current?.sort("count", "desc");
              setTableWorkbenchStatus(zh ? "已按数量降序。" : "Sorted by count descending.");
              pushDemoEvent(setTableWorkbenchEvents, zh ? "methods.sort('count')" : "methods.sort('count')");
            }}>{zh ? "按数量排序" : "Sort count"}</Button>
            <Button size="sm" variant="soft" onClick={() => {
              tableRef.current?.clearSelection();
              setTableSelectedCount(0);
              pushDemoEvent(setTableWorkbenchEvents, zh ? "methods.clearSelection" : "methods.clearSelection");
            }}>{zh ? "清空选择" : "Clear selection"}</Button>
            <Button size="sm" variant="parcel" onClick={() => {
              tableRef.current?.setViewPreset("review");
              setTableActiveView("review");
              setTableWorkbenchStatus(zh ? "视图已切换。" : "View changed.");
              pushDemoEvent(setTableWorkbenchEvents, zh ? "methods.setViewPreset('review')" : "methods.setViewPreset('review')");
            }}>{zh ? "切换复核视图" : "Switch review view"}</Button>
          </div>
        )}
        codeText={code([
          'import { Table, TableColumnSettings, type TableRef } from "pinepost-ui";',
          "",
          "const tableRef = React.useRef<TableRef<Row>>(null);",
          "const [settings, setSettings] = React.useState({ hiddenColumns: [], columnOrder: ['route', 'count', 'status'], density: 'compact' });",
          "",
          "<TableColumnSettings columns={columns} value={settings} onValueChange={setSettings} />",
          "<Table",
          "  ref={tableRef}",
          "  rowKey=\"id\"",
          "  selectable",
          "  editable",
          "  filterTags={filters}",
          "  onFilterClear={clearFilters}",
          "  onSelectionChange={setSelection}",
          "  onCellEdit={saveCell}",
          "  viewPresets={viewPresets}",
          "  columnOrder={settings.columnOrder}",
          "  hiddenColumns={settings.hiddenColumns}",
          "  density={settings.density}",
          "/>"
        ])}
      />
    );
  }



  return { renderTableExamples, renderTableWorkbench };
}
