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

export function createFoundationCatalogDocs(context: DemoCatalogContext): DocItem[] {
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
      description: zh
        ? "可访问的下拉选择器，支持键盘选择、点外关闭、筛选、远程加载和空态交接。"
        : "Accessible dropdown selection with keyboard control, outside-dismiss, filtering, remote loading, and empty-state handoff.",
      searchText: "select remote loading empty owner handoff v0.30 keyboard filter 选择器 远程 加载 空态 负责人 交接 键盘 筛选",
      examples: renderSelectExamples(),
      playground: renderSelectWorkbench(),
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
      ],
      apiSections: [
        {
          title: labels.attributes,
          rows: [
            { prop: "options", type: "SelectOption[]", defaultValue: "[]", description: zh ? "下拉选项。" : "Dropdown options." },
            { prop: "value", type: "string | string[]", defaultValue: "-", description: zh ? "受控值；multiple 时为数组。" : "Controlled value; multiple mode uses an array." },
            { prop: "filterable", type: "boolean", defaultValue: "false", description: zh ? "启用筛选输入。" : "Enables filter input." },
            { prop: "loading / loadingText", type: "boolean / ReactNode", defaultValue: "false / Loading...", description: zh ? "远程选项请求中的可见状态。" : "Visible state while remote options are loading." },
            { prop: "emptyText", type: "ReactNode", defaultValue: "No options", description: zh ? "筛选或远程请求无结果时显示。" : "Shown when filtering or remote loading returns no options." }
          ]
        },
        {
          title: labels.events,
          rows: [
            { prop: "onValueChange", type: "(value: string | string[]) => void", defaultValue: "-", description: zh ? "值变化回调。" : "Value change callback." },
            { prop: "remoteMethod", type: "(query: string) => void", defaultValue: "-", description: zh ? "筛选词变化时触发。" : "Fires when the filter query changes." }
          ]
        },
        {
          title: labels.shortcuts,
          rows: [
            { prop: "ArrowUp / ArrowDown", type: "keyboard", defaultValue: "-", description: zh ? "在未禁用选项之间移动当前项。" : "Moves the active item through enabled options." },
            { prop: "Home / End", type: "keyboard", defaultValue: "-", description: zh ? "跳到第一个或最后一个可选项。" : "Jumps to the first or last enabled option." },
            { prop: "Enter / Space", type: "keyboard", defaultValue: "-", description: zh ? "选择或切换当前项。" : "Selects or toggles the active option." },
            { prop: "Escape", type: "keyboard", defaultValue: "-", description: zh ? "关闭面板并回到触发器。" : "Closes the panel and returns to the trigger." }
          ]
        }
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
      examples: renderFormExamples(),
      playground: renderFormWorkbench(),
      preview: (
        <Form
          model={formPreviewModel}
          onFinish={async () => showToast()}
          rules={{ desk: [{ required: true, message: zh ? "请填写收件处。" : "Recipient is required." }] }}
          submittingMessage={zh ? "正在提交路线..." : "Submitting route..."}
          validateTrigger="blur"
        >
          <FormField name="desk" label={zh ? "收件处" : "Recipient"} htmlFor="demo-recipient" required description={zh ? "用于路线分配。" : "Used for route assignment."}>
            <Input
              id="demo-recipient"
              onChange={(event) => setFormPreviewModel({ desk: event.currentTarget.value })}
              placeholder={zh ? "苔藓桌" : "Moss desk"}
              value={formPreviewModel.desk}
            />
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
        "const [model, setModel] = React.useState({ desk: \"\" });",
        "",
        '<Form model={model} rules={rules} validateTrigger="blur" onFinish={saveRoute}>',
        '  <FormField name="desk" label="收件处" required validatingMessage="检查桌台中...">',
        '    <Input value={model.desk} onChange={(event) => setModel({ desk: event.currentTarget.value })} placeholder="苔藓桌" />',
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
        { prop: "setFieldsError / getFieldsError", type: "FormRef methods", defaultValue: "-", description: zh ? "回填或读取字段级服务端错误。" : "Sets or reads field-level server errors." },
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
      examples: renderUploadExamples(),
      playground: renderUploadWorkbench(),
      preview: (
        <div className="docs-upload-preview">
          <Upload
            ref={uploadRef}
            drag
            limit={3}
            label={zh ? "拖放路线清单" : "Drop route manifests"}
            description={zh ? "选择文件后点击开始上传，预览会走完整生命周期。" : "Choose a file, then start upload to run the full lifecycle."}
            customRequest={async ({ onProgress, onSuccess }) => {
              onProgress?.(64);
              await new Promise((resolve) => window.setTimeout(resolve, 90));
              onSuccess?.({ ok: true });
            }}
            onChange={() => setUploadPreviewStatus(zh ? "文件已进入待上传队列。" : "File queued for upload.")}
            onSuccess={() => setUploadPreviewStatus(zh ? "上传完成，队列状态已更新。" : "Upload complete; queue status updated.")}
          />
          <div className="docs-upload-preview__actions">
            <Button size="sm" onClick={() => void uploadRef.current?.submit()}>
              {zh ? "开始上传" : "Start upload"}
            </Button>
            <Button size="sm" variant="soft" onClick={() => {
              uploadRef.current?.clearFiles();
              setUploadPreviewStatus(zh ? "队列已清空。" : "Queue cleared.");
            }}>
              {zh ? "清空队列" : "Clear queue"}
            </Button>
            {uploadPreviewStatus && <span>{uploadPreviewStatus}</span>}
          </div>
        </div>
      ),
      code: code([
        'import { Button, Upload } from "pinepost-ui";',
        "",
        "const uploadRef = React.useRef<UploadRef>(null);",
        "",
        "<>",
        "  <Upload",
        "    ref={uploadRef}",
        "    drag",
        "    limit={3}",
        "    label=\"拖放路线清单\"",
        "    beforeUpload={(file) => file.size < 1024 * 1024}",
        "    customRequest={async ({ onProgress, onSuccess }) => {",
        "      onProgress?.(60);",
        "      onSuccess?.({ ok: true });",
        "    }}",
        "  />",
        "  <Button onClick={() => uploadRef.current?.submit()}>开始上传</Button>",
        "</>"
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
            { prop: "onFileListChange", type: "(fileList) => void", defaultValue: "-", description: zh ? "受控队列收到完整文件列表。" : "Controlled queues receive the complete file list." },
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

  ];
}
