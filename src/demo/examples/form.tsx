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

export function createFormExamples(context: DemoContext) {
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

  function resetFormWorkbench() {
    setFormWorkbenchModel({ owner: "", route: "" });
    formWorkbenchRef.current?.clearValidate();
    setFormWorkbenchStatus(zh ? "表单已重置。" : "Form reset.");
    pushDemoEvent(setFormWorkbenchEvents, zh ? "methods.resetFields + 本地模型重置" : "methods.resetFields + local model reset");
  }

  function renderFormExamples(): DocExample[] {
    return [
      {
        id: "validation-submit",
        title: zh ? "校验与提交" : "Validation and submit",
        description: zh ? "提交前先校验字段，失败只显示错误并聚焦第一个错误项，成功和服务端失败互不串场。" : "Validate before submit; invalid fields focus first, while success and server errors stay isolated.",
        preview: (
          <div className="docs-product-panel">
            <Form
              ref={formExampleRef}
              model={formExampleModel}
              rules={{
                route: [{ required: true, message: zh ? "请填写路线。" : "Route is required." }],
                owner: [{ required: true, message: zh ? "请填写负责人。" : "Owner is required." }]
              }}
              submitErrorMessage={zh ? "服务端拒绝保存，请检查路线窗口。" : "Server rejected the save. Check the route window."}
              submittingMessage={zh ? "正在保存配置..." : "Saving configuration..."}
              validateTrigger={["blur", "submit"]}
              onFinish={async () => {
                setFormExampleStatus(zh ? "正在提交..." : "Submitting...");
                await new Promise((resolve) => window.setTimeout(resolve, 80));
                if (formExampleMode === "server-error") {
                  setFormExampleStatus(zh ? "服务端拒绝保存。" : "Server rejected the save.");
                  throw new Error("Server rejected");
                }
                setFormExampleStatus(zh ? "保存成功。" : "Saved successfully.");
              }}
              onFinishFailed={() => {
                setFormExampleStatus(zh ? "请先修正表单错误。" : "Fix validation errors first.");
                formExampleRouteRef.current?.focus({ preventScroll: true });
                formExampleRef.current?.scrollToField("route");
                setFormExampleFocusRequest((current) => current + 1);
              }}
            >
              <FormField name="route" label={zh ? "路线" : "Route"} htmlFor="demo-form-route" required>
                <Input
                  ref={formExampleRouteRef}
                  id="demo-form-route"
                  value={formExampleModel.route}
                  onChange={(event) => {
                    const { value } = event.currentTarget;
                    setFormExampleModel((current) => ({ ...current, route: value }));
                  }}
                  placeholder="A7"
                />
              </FormField>
              <FormField name="owner" label={zh ? "负责人" : "Owner"} htmlFor="demo-form-owner" required>
                <Input
                  id="demo-form-owner"
                  value={formExampleModel.owner}
                  onChange={(event) => {
                    const { value } = event.currentTarget;
                    setFormExampleModel((current) => ({ ...current, owner: value }));
                  }}
                  placeholder={zh ? "雪松" : "Cedar"}
                />
              </FormField>
              <div className="docs-example-actions">
                <Button
                  type="submit"
                  onClick={(event) => {
                    if (formExampleModel.route && formExampleModel.owner) return;
                    event.preventDefault();
                    void formExampleRef.current?.validate();
                    setFormExampleStatus(zh ? "请先修正表单错误。" : "Fix validation errors first.");
                    setFormExampleFocusRequest((current) => current + 1);
                  }}
                >
                  {zh ? "提交保存" : "Submit save"}
                </Button>
                <Button size="sm" variant={formExampleMode === "success" ? "primary" : "soft"} onClick={() => setFormExampleMode("success")}>
                  {zh ? "模拟成功" : "Simulate success"}
                </Button>
                <Button size="sm" variant={formExampleMode === "server-error" ? "stamp" : "soft"} onClick={() => setFormExampleMode("server-error")}>
                  {zh ? "模拟服务端失败" : "Simulate server error"}
                </Button>
              </div>
            </Form>
            {formExampleStatus && (
              <Alert
                variant={formExampleStatus.includes("成功") || formExampleStatus.includes("Saved") ? "success" : "info"}
                title={formExampleStatus}
              />
            )}
          </div>
        ),
        code: code([
          'import { Form, FormField, Input, Button, type FormRef } from "pinepost-ui";',
          "",
          "const formRef = React.useRef<FormRef>(null);",
          "const [model, setModel] = React.useState({ route: '', owner: '' });",
          "",
          "<Form",
          "  ref={formRef}",
          "  model={model}",
          "  rules={rules}",
          "  validateTrigger={['blur', 'submit']}",
          "  onFinish={saveRoute}",
          "  onFinishFailed={() => formRef.current?.scrollToField('route')}",
          ">",
          "  <FormField name=\"route\" label=\"路线\" required>",
          "    <Input value={model.route} onChange={(event) => setModel({ ...model, route: event.currentTarget.value })} />",
          "  </FormField>",
          "  <Button type=\"submit\">提交保存</Button>",
          "</Form>"
        ])
      },
      {
        id: "layout-states",
        title: zh ? "布局与禁用状态" : "Layout and disabled state",
        description: zh ? "横向、内联和禁用字段适合配置页中的只读审批信息。" : "Horizontal, inline, and disabled fields fit read-only approval details.",
        preview: (
          <Form layout="horizontal" model={{ route: "A7", owner: "Cedar" }}>
            <FormField name="route" label={zh ? "路线" : "Route"}>
              <Input value="A7" readOnly />
            </FormField>
            <FormField name="owner" label={zh ? "负责人" : "Owner"}>
              <Input value={zh ? "雪松" : "Cedar"} disabled />
            </FormField>
          </Form>
        ),
        code: code([
          '<Form layout="horizontal" model={model}>',
          '  <FormField name="route" label="路线"><Input readOnly value="A7" /></FormField>',
          '  <FormField name="owner" label="负责人"><Input disabled value="雪松" /></FormField>',
          '</Form>'
        ])
      },
      {
        id: "methods",
        title: zh ? "方法控制" : "Methods",
        description: zh ? "ref methods 可以校验单个字段、清空错误或重置表单。" : "Ref methods validate a field, clear messages, or reset the form.",
        preview: (
          <Space>
            <Button size="sm" variant="soft" onClick={() => void formExampleRef.current?.validateField("route")}>{zh ? "校验路线" : "Validate route"}</Button>
            <Button size="sm" variant="soft" onClick={() => formExampleRef.current?.clearValidate()}>{zh ? "清空校验" : "Clear validate"}</Button>
            <Button size="sm" variant="parcel" onClick={() => {
              setFormExampleModel({ owner: "", route: "" });
              formExampleRef.current?.resetFields();
            }}>{zh ? "重置表单" : "Reset form"}</Button>
          </Space>
        ),
        code: code([
          "formRef.current?.validateField('route');",
          "formRef.current?.clearValidate();",
          "formRef.current?.resetFields();"
        ])
      }
    ];
  }

  function renderFormWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "Form API 演示台" : "Form API workbench"}
        labels={labels}
        events={formWorkbenchEvents}
        status={formWorkbenchStatus || (zh ? "等待提交。" : "Waiting for submit.")}
        description={zh ? "同一个业务表单里演示 model、rules、validateTrigger、异步提交、错误聚焦和 ref methods。" : "One product form covers model, rules, validate triggers, async submit, error focus, and ref methods."}
        preview={(
          <Form
            ref={formWorkbenchRef}
            model={formWorkbenchModel}
            rules={{
              route: [{ required: true, message: zh ? "请填写路线。" : "Route is required." }],
              owner: [{ required: true, message: zh ? "请填写负责人。" : "Owner is required." }]
            }}
            submitErrorMessage={zh ? "服务端拒绝保存，请检查路线窗口。" : "Server rejected the save. Check the route window."}
            submittingMessage={zh ? "正在保存配置..." : "Saving configuration..."}
            validateTrigger={["blur", "submit"]}
            onFinish={async () => {
              pushDemoEvent(setFormWorkbenchEvents, zh ? "onFinish: 校验通过，开始提交" : "onFinish: valid, submitting");
              setFormWorkbenchStatus(zh ? "正在提交..." : "Submitting...");
              await new Promise((resolve) => window.setTimeout(resolve, 80));
              if (formSubmitMode === "server-error") {
                setFormWorkbenchStatus(zh ? "服务端拒绝保存。" : "Server rejected the save.");
                throw new Error("Server rejected");
              }
              setFormWorkbenchStatus(zh ? "保存成功。" : "Saved successfully.");
              pushDemoEvent(setFormWorkbenchEvents, zh ? "onFinish: 保存成功" : "onFinish: saved successfully");
            }}
            onFinishFailed={() => {
              setFormWorkbenchStatus(zh ? "请先修正表单错误。" : "Fix validation errors first.");
              pushDemoEvent(setFormWorkbenchEvents, zh ? "onFinishFailed: 已聚焦第一个错误字段" : "onFinishFailed: focused first invalid field");
              formRouteInputRef.current?.focus({ preventScroll: true });
              formWorkbenchRef.current?.scrollToField("route");
              setFormFocusRequest((current) => current + 1);
              window.requestAnimationFrame(() => formRouteInputRef.current?.focus({ preventScroll: true }));
              window.setTimeout(() => formRouteInputRef.current?.focus({ preventScroll: true }), 80);
            }}
          >
            <FormField name="route" label={zh ? "路线" : "Route"} htmlFor="workbench-route" required validatingMessage={zh ? "检查路线窗口..." : "Checking route window..."}>
              <Input
                ref={formRouteInputRef}
                id="workbench-route"
                value={formWorkbenchModel.route}
                onChange={(event) => {
                  const { value } = event.currentTarget;
                  setFormWorkbenchModel((current) => ({ ...current, route: value }));
                }}
                placeholder="A7"
              />
            </FormField>
            <FormField name="owner" label={zh ? "负责人" : "Owner"} htmlFor="workbench-owner" required>
              <Input
                id="workbench-owner"
                value={formWorkbenchModel.owner}
                onChange={(event) => {
                  const { value } = event.currentTarget;
                  setFormWorkbenchModel((current) => ({ ...current, owner: value }));
                }}
                placeholder={zh ? "雪松" : "Cedar"}
              />
            </FormField>
            <Button
              type="submit"
              onClick={(event) => {
                if (formWorkbenchModel.route && formWorkbenchModel.owner) return;
                event.preventDefault();
                void formWorkbenchRef.current?.validate();
                setFormWorkbenchStatus(zh ? "请先修正表单错误。" : "Fix validation errors first.");
                pushDemoEvent(setFormWorkbenchEvents, zh ? "submit: 已聚焦第一个错误字段" : "submit: focused first invalid field");
                setFormFocusRequest((current) => current + 1);
              }}
            >
              {zh ? "提交保存" : "Submit save"}
            </Button>
          </Form>
        )}
        controls={(
          <div className="docs-workbench__controls">
            <span>{zh ? "提交结果" : "Submit result"}</span>
            <Segmented
              value={formSubmitMode}
              onValueChange={(value) => {
                setFormSubmitMode(value as "success" | "server-error");
                setFormWorkbenchStatus(value === "server-error" ? (zh ? "下次提交会模拟服务端失败。" : "Next submit will simulate a server error.") : (zh ? "下次提交会成功。" : "Next submit will succeed."));
              }}
              options={[
                { value: "success", label: zh ? "模拟成功" : "Simulate success" },
                { value: "server-error", label: zh ? "模拟服务端失败" : "Simulate server error" }
              ]}
            />
          </div>
        )}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" variant="soft" onClick={() => void formWorkbenchRef.current?.validateField("route").then((valid) => {
              setFormWorkbenchStatus(valid ? (zh ? "路线字段有效。" : "Route field is valid.") : (zh ? "路线字段仍有错误。" : "Route field still has errors."));
              pushDemoEvent(setFormWorkbenchEvents, zh ? "methods.validateField('route')" : "methods.validateField('route')");
            })}>{zh ? "校验路线" : "Validate route"}</Button>
            <Button size="sm" variant="soft" onClick={() => {
              formWorkbenchRef.current?.clearValidate();
              setFormWorkbenchStatus(zh ? "错误提示已清空。" : "Validation messages cleared.");
              pushDemoEvent(setFormWorkbenchEvents, zh ? "methods.clearValidate" : "methods.clearValidate");
            }}>{zh ? "清空校验" : "Clear validate"}</Button>
            <Button size="sm" variant="parcel" onClick={resetFormWorkbench}>{zh ? "重置表单" : "Reset form"}</Button>
          </div>
        )}
        codeText={code([
          'import { Form, FormField, Input, Button, type FormRef } from "pinepost-ui";',
          "",
          "const formRef = React.useRef<FormRef>(null);",
          "const [model, setModel] = React.useState({ route: '', owner: '' });",
          "",
          "<Form",
          "  ref={formRef}",
          "  model={model}",
          "  rules={rules}",
          "  validateTrigger={['blur', 'submit']}",
          "  onFinish={saveRoute}",
          "  onFinishFailed={() => formRef.current?.scrollToField('route')}",
          ">",
          "  <FormField name=\"route\" label=\"路线\" required>",
          "    <Input value={model.route} onChange={(event) => setModel({ ...model, route: event.currentTarget.value })} />",
          "  </FormField>",
          "  <Button type=\"submit\">提交保存</Button>",
          "</Form>"
        ])}
      />
    );
  }



  return { renderFormExamples, renderFormWorkbench };
}
