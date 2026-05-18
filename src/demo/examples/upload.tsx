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

export function createUploadExamples(context: DemoContext) {
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

  function renderUploadWorkbench() {
    return (
      <DemoWorkbench
        title={zh ? "Upload API 演示台" : "Upload API workbench"}
        labels={labels}
        events={uploadWorkbenchEvents}
        status={uploadPreviewStatus || (zh ? "等待选择文件。" : "Waiting for files.")}
        description={zh ? "一个素材上传台演示拖拽、limit、customRequest、renderFile、生命周期事件和 ref methods。" : "One asset uploader covers drag, limits, custom requests, renderFile, lifecycle events, and ref methods."}
        preview={(
          <div className="docs-upload-preview">
            <Upload
              ref={uploadRef}
              drag
              multiple
              limit={3}
              label={zh ? "拖放路线清单" : "Drop route manifests"}
              description={zh ? "选择文件后点击开始上传，失败文件可以重试。" : "Choose files, then start upload; failed files can retry."}
              defaultFileList={[{ uid: "failed-asset", name: "stamp-sheet.png", percent: 36, status: "error", error: new Error("Demo failure") }]}
              customRequest={async ({ file, onProgress, onSuccess }) => {
                onProgress?.(64);
                pushDemoEvent(setUploadWorkbenchEvents, zh ? `onProgress: ${file.name}` : `onProgress: ${file.name}`);
                await new Promise((resolve) => window.setTimeout(resolve, 90));
                onSuccess?.({ ok: true });
              }}
              onChange={(file) => {
                setUploadPreviewStatus(zh ? "文件已进入待上传队列。" : "File queued for upload.");
                pushDemoEvent(setUploadWorkbenchEvents, zh ? `onChange: ${file.name}` : `onChange: ${file.name}`);
              }}
              onPreview={(file) => {
                setUploadPreviewStatus(zh ? `预览 ${file.name}` : `Previewing ${file.name}`);
                pushDemoEvent(setUploadWorkbenchEvents, zh ? "onPreview" : "onPreview");
              }}
              onRemove={(file) => {
                setUploadPreviewStatus(zh ? `${file.name} 已移除。` : `${file.name} removed.`);
                pushDemoEvent(setUploadWorkbenchEvents, zh ? "onRemove" : "onRemove");
              }}
              onRetry={(file) => {
                setUploadPreviewStatus(zh ? `${file.name} 已回到待上传。` : `${file.name} returned to ready.`);
                pushDemoEvent(setUploadWorkbenchEvents, zh ? "onRetry" : "onRetry");
              }}
              onSuccess={(_, file) => {
                setUploadPreviewStatus(zh ? "上传完成，队列状态已更新。" : "Upload complete; queue status updated.");
                pushDemoEvent(setUploadWorkbenchEvents, zh ? `onSuccess: ${file.name}` : `onSuccess: ${file.name}`);
              }}
              renderFile={(file, actions) => (
                <div className="docs-upload-card">
                  <strong>{file.name}</strong>
                  <Badge variant={file.status === "error" ? "stamp" : file.status === "success" ? "sky" : "leaf"}>{file.status}</Badge>
                  <Button size="sm" variant="soft" onClick={file.status === "error" ? actions.retry : actions.remove}>
                    {file.status === "error" ? (zh ? "重试" : "Retry") : (zh ? "移除" : "Remove")}
                  </Button>
                </div>
              )}
            />
          </div>
        )}
        controls={(
          <div className="docs-workbench__controls">
            <span>{zh ? "队列模式" : "Queue mode"}</span>
            <Tag>{zh ? "内置列表 + 自定义文件项" : "Built-in list + custom rows"}</Tag>
          </div>
        )}
        methods={(
          <div className="docs-workbench__actions">
            <Button size="sm" onClick={() => void uploadRef.current?.submit()}>{zh ? "提交 Playground 队列" : "Submit playground queue"}</Button>
            <Button size="sm" variant="soft" onClick={() => {
              const file = uploadRef.current?.getFiles().find((item) => item.status === "error");
              if (file) uploadRef.current?.retryFile(file.uid);
              pushDemoEvent(setUploadWorkbenchEvents, zh ? "methods.retryFile" : "methods.retryFile");
            }}>{zh ? "重试失败项" : "Retry failed"}</Button>
            <Button size="sm" variant="parcel" onClick={() => {
              uploadRef.current?.clearFiles();
              setUploadPreviewStatus(zh ? "队列已清空。" : "Queue cleared.");
              pushDemoEvent(setUploadWorkbenchEvents, zh ? "methods.clearFiles" : "methods.clearFiles");
            }}>{zh ? "清空队列" : "Clear queue"}</Button>
          </div>
        )}
        codeText={code([
          'import { Upload, Button, type UploadRef } from "pinepost-ui";',
          "",
          "const uploadRef = React.useRef<UploadRef>(null);",
          "",
          "<Upload",
          "  ref={uploadRef}",
          "  drag",
          "  multiple",
          "  limit={3}",
          "  customRequest={uploadAsset}",
          "  renderFile={(file, actions) => <AssetRow file={file} actions={actions} />}",
          "  onRetry={trackRetry}",
          "  onSuccess={trackSuccess}",
          "/>",
          "<Button onClick={() => uploadRef.current?.submit()}>开始上传</Button>"
        ])}
      />
    );
  }

  function renderUploadExamples(): DocExample[] {
    return [
      {
        id: "manual-queue",
        title: zh ? "手动上传队列" : "Manual upload queue",
        description: zh ? "文件先进入队列，用户确认后再调用 submit，适合审批材料和素材上传。" : "Files enter a queue first and upload only after submit, fitting approval files and assets.",
        preview: (
          <Space direction="vertical">
            <Upload
              ref={uploadExampleRef}
              drag
              multiple
              limit={3}
              label={zh ? "拖放路线清单" : "Drop route manifests"}
              description={zh ? "选择文件后点击开始上传。" : "Choose files, then start upload."}
              customRequest={async ({ onProgress, onSuccess }) => {
                onProgress?.(66);
                await new Promise((resolve) => window.setTimeout(resolve, 80));
                onSuccess?.({ ok: true });
              }}
              renderFile={(file, actions) => (
                <div className="docs-upload-card">
                  <strong>{file.name}</strong>
                  <Badge variant={file.status === "success" ? "sky" : file.status === "error" ? "stamp" : "leaf"}>{file.status}</Badge>
                  <Button size="sm" variant="soft" onClick={actions.remove}>
                    {zh ? "移除" : "Remove"}
                  </Button>
                </div>
              )}
            />
            <Button size="sm" onClick={() => void uploadExampleRef.current?.submit()}>{zh ? "开始上传" : "Start upload"}</Button>
          </Space>
        ),
        code: code([
          'import { Upload, type UploadRef } from "pinepost-ui";',
          "",
          "const uploadRef = React.useRef<UploadRef>(null);",
          "",
          "<Upload ref={uploadRef} drag multiple limit={3} customRequest={uploadAsset} />",
          "<Button onClick={() => uploadRef.current?.submit()}>开始上传</Button>"
        ])
      },
      {
        id: "custom-file",
        title: zh ? "自定义文件项" : "Custom file item",
        description: zh ? "renderFile 可把文件状态接入自己的素材墙或业务列表。" : "renderFile lets file state appear in a product asset wall or custom list.",
        preview: (
          <Upload
            defaultFileList={[{ uid: "asset-1", name: "stamp-sheet.png", percent: 36, status: "error", error: new Error("Demo failure") }]}
            renderFile={(file, actions) => (
              <div className="docs-upload-card">
                <strong>{file.name}</strong>
                <Badge variant={file.status === "error" ? "stamp" : "sky"}>{file.status}</Badge>
                <Button size="sm" variant="soft" onClick={file.status === "error" ? actions.retry : actions.remove}>
                  {file.status === "error" ? (zh ? "重试" : "Retry") : (zh ? "移除" : "Remove")}
                </Button>
              </div>
            )}
          />
        ),
        code: code([
          "<Upload",
          "  defaultFileList={files}",
          "  renderFile={(file, actions) => <AssetRow file={file} actions={actions} />}",
          "  onRetry={trackRetry}",
          "/>"
        ])
      },
      {
        id: "hidden-list",
        title: zh ? "隐藏内置列表" : "Hidden built-in list",
        description: zh ? "showFileList=false 时可以只保留触发器，把列表交给业务区渲染。" : "showFileList=false keeps only the trigger while product UI renders the list elsewhere.",
        preview: <Upload showFileList={false} label={zh ? "选择活动图片" : "Choose campaign image"} />,
        code: code(['<Upload showFileList={false} label="选择活动图片" />'])
      }
    ];
  }



  return { renderUploadWorkbench, renderUploadExamples };
}
