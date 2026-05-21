import * as React from "react";
import {
  Alert,
  Badge,
  Button,
  Form,
  FormField,
  Input,
  Space,
  Table,
  Upload,
  type FormRef,
  type TableColumn,
  type UploadFile,
  type UploadRef
} from "../pinepost";
import { code } from "../copy";
import type { DemoContext, DocExample, DocItem } from "../types";

type ServerRoute = {
  count: number;
  id: string;
  route: string;
  status: string;
};

type StopRow = {
  desk: string;
  id: string;
  window: string;
};

type ServerLoadState = "idle" | "loading" | "error";

const pageOneRows: ServerRoute[] = [
  { count: 12, id: "a7", route: "A7", status: "Ready" },
  { count: 8, id: "b4", route: "B4", status: "Ready" }
];

const pageTwoRows: ServerRoute[] = [
  { count: 5, id: "c2", route: "C2", status: "Queued" },
  { count: 14, id: "d9", route: "D9", status: "Ready" }
];

const SERVER_LOAD_DELAY_MS = 360;

const serverColumns: Array<TableColumn<ServerRoute>> = [
  { key: "route", title: "Route" },
  { key: "count", title: "Count", align: "right" },
  { key: "status", title: "Status" }
];

function ServerTablePressure({ zh }: { zh: boolean }) {
  const [page, setPage] = React.useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [loadState, setLoadState] = React.useState<ServerLoadState>("idle");
  const [status, setStatus] = React.useState("");
  const [statusVariant, setStatusVariant] = React.useState<"info" | "success" | "warning">("info");
  const requestIdRef = React.useRef(0);
  const selectedRowKeysRef = React.useRef<React.Key[]>([]);
  const serverLoadTimeoutRef = React.useRef<number | null>(null);
  const rows = page === 1 ? pageOneRows : pageTwoRows;
  const loading = loadState === "loading";

  React.useEffect(() => () => {
    if (serverLoadTimeoutRef.current !== null) window.clearTimeout(serverLoadTimeoutRef.current);
  }, []);

  function updateSelectedRowKeys(nextKeys: React.Key[]) {
    selectedRowKeysRef.current = nextKeys;
    setSelectedRowKeys(nextKeys);
  }

  function switchPage(nextPage: number, mode: "success" | "error" = "success") {
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;
    if (serverLoadTimeoutRef.current !== null) window.clearTimeout(serverLoadTimeoutRef.current);

    setLoadState("loading");
    setStatusVariant("info");
    setStatus(zh ? `正在加载第 ${nextPage} 页服务端数据。` : `Loading page ${nextPage} from server.`);
    serverLoadTimeoutRef.current = window.setTimeout(() => {
      if (requestIdRef.current !== requestId) return;
      serverLoadTimeoutRef.current = null;

      if (mode === "error") {
        const selectedCount = selectedRowKeysRef.current.length;
        setLoadState("error");
        setStatusVariant("warning");
        setStatus(zh ? `服务端分页失败，保留 ${selectedCount} 个选择键。` : `Server page failed. ${selectedCount} selected keys kept.`);
        return;
      }

      setPage(nextPage);
      setLoadState("idle");
      setStatusVariant("success");
      setStatus(zh ? `第 ${nextPage} 页已加载。` : `Page ${nextPage} loaded.`);
    }, SERVER_LOAD_DELAY_MS);
  }

  function runBulkAction() {
    if (loading) {
      setStatusVariant("warning");
      setStatus(zh ? "批量操作等待服务端数据。" : "Bulk action waits for server rows.");
      return;
    }

    setStatusVariant("success");
    setStatus(zh ? `已为 ${selectedRowKeys.length} 个键创建批量操作。` : `Bulk action queued for ${selectedRowKeys.length} keys.`);
  }

  return (
    <div className="docs-pressure-lab">
      <div className="docs-pressure-lab__toolbar">
        <Button size="sm" variant={page === 1 ? "primary" : "soft"} onClick={() => switchPage(1)}>
          {zh ? "第 1 页" : "Page 1"}
        </Button>
        <Button size="sm" variant={page === 2 ? "primary" : "soft"} onClick={() => switchPage(2)}>
          {zh ? "第 2 页" : "Page 2"}
        </Button>
        <Button
          size="sm"
          variant="parcel"
          onClick={runBulkAction}
        >
          {zh ? "执行批量操作" : "Run bulk action"}
        </Button>
        <Button size="sm" variant="stamp" onClick={() => switchPage(page, "error")}>
          {zh ? "模拟分页错误" : "Simulate page error"}
        </Button>
        {loadState === "error" ? (
          <Button size="sm" variant="soft" onClick={() => switchPage(page)}>
            {zh ? `重试第 ${page} 页` : `Retry page ${page}`}
          </Button>
        ) : null}
        <Button size="sm" variant="soft" onClick={() => updateSelectedRowKeys([])}>
          {zh ? "清空选择" : "Clear selection"}
        </Button>
      </div>
      <p className="docs-pressure-lab__status">
        {zh ? `已选择 ${selectedRowKeys.length} 个键` : `${selectedRowKeys.length} selected keys`}
      </p>
      {status ? <Alert title={status} variant={statusVariant} /> : null}
      <Table
        rowKey="id"
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={(_, keys) => updateSelectedRowKeys(keys)}
        loading={loading}
        loadingText={zh ? "正在加载服务端数据..." : "Loading server rows..."}
        columns={serverColumns}
        data={loadState === "error" ? [] : rows}
        emptyText={zh ? "服务端分页需要重试。" : "Server page needs retry."}
      />
    </div>
  );
}

function DynamicFormPressure({ zh }: { zh: boolean }) {
  const formRef = React.useRef<FormRef>(null);
  const [stops, setStops] = React.useState<StopRow[]>([
    { id: "stop-1", desk: "Moss desk", window: "09:00" }
  ]);
  const [status, setStatus] = React.useState("");

  const model = React.useMemo(() => {
    const nextModel: Record<string, string> = {};
    stops.forEach((stop, index) => {
      nextModel[`stops.${index}.desk`] = stop.desk;
      nextModel[`stops.${index}.window`] = stop.window;
    });
    return nextModel;
  }, [stops]);

  const rules = React.useMemo(() => {
    const nextRules: Record<string, Array<{ required: boolean; message: string }>> = {};
    stops.forEach((_, index) => {
      nextRules[`stops.${index}.desk`] = [{ required: true, message: zh ? "请填写桌台。" : "Desk is required." }];
      nextRules[`stops.${index}.window`] = [{ required: true, message: zh ? "请填写窗口。" : "Window is required." }];
    });
    return nextRules;
  }, [stops, zh]);

  function updateStop(index: number, key: keyof Omit<StopRow, "id">, value: string) {
    setStops((current) => current.map((stop, stopIndex) => (stopIndex === index ? { ...stop, [key]: value } : stop)));
    formRef.current?.setFieldsError({ [`stops.${index}.${key}`]: undefined });
  }

  function clearStopErrors(rows: StopRow[]) {
    const cleared: Record<string, undefined> = {};
    rows.forEach((_, index) => {
      cleared[`stops.${index}.desk`] = undefined;
      cleared[`stops.${index}.window`] = undefined;
    });
    formRef.current?.setFieldsError(cleared);
  }

  function focusFirstError(errors: Record<string, React.ReactNode>) {
    const firstName = Object.keys(errors)[0];
    const match = /^stops\.(\d+)\.(desk|window)$/.exec(firstName);
    if (!match) return;
    const [, index, key] = match;
    window.setTimeout(() => document.getElementById(`pressure-stop-${index}-${key}`)?.focus(), 0);
  }

  function addStop() {
    setStops((current) => [...current, { id: `stop-${current.length + 1}`, desk: "", window: "11:00" }]);
    setStatus(zh ? "已添加站点。" : "Stop added.");
  }

  function removeStop(index: number) {
    clearStopErrors(stops);
    setStops((current) => current.filter((_, stopIndex) => stopIndex !== index));
    setStatus(zh ? "已移除站点。" : "Stop removed.");
  }

  function simulateServerErrors() {
    const targetIndex = Math.min(1, stops.length - 1);
    formRef.current?.setFieldsError({
      [`stops.${targetIndex}.desk`]: zh ? "桌台已被分配。" : "Desk is already assigned."
    });
    setStatus(zh ? "服务端错误已回填到字段。" : "Server errors mapped to fields.");
  }

  function clearServerErrors() {
    clearStopErrors(stops);
    setStatus(zh ? "服务端错误已清除。" : "Server errors cleared.");
  }

  return (
    <div className="docs-pressure-lab">
      <Form
        ref={formRef}
        model={model}
        rules={rules}
        validateTrigger={["blur", "submit"]}
        onFinish={() => setStatus(zh ? "动态站点已保存。" : "Dynamic stops saved.")}
        onFinishFailed={(_, errors) => {
          focusFirstError(errors);
          setStatus(zh ? "请先修正动态字段，已聚焦第一个错误。" : "Fix dynamic fields first; focused the first error.");
        }}
      >
        <p className="docs-pressure-lab__status">
          {zh ? `${stops.length} 个动态站点` : `${stops.length} dynamic ${stops.length === 1 ? "stop" : "stops"}`}
        </p>
        <div className="docs-pressure-lab__grid">
          {stops.map((stop, index) => (
            <div className="docs-pressure-lab__row" key={stop.id}>
              <FormField name={`stops.${index}.desk`} label={zh ? `站点 ${index + 1} 桌台` : `Stop ${index + 1} desk`} htmlFor={`pressure-stop-${index}-desk`} required>
                <Input id={`pressure-stop-${index}-desk`} value={stop.desk} onChange={(event) => updateStop(index, "desk", event.currentTarget.value)} />
              </FormField>
              <FormField name={`stops.${index}.window`} label={zh ? `站点 ${index + 1} 窗口` : `Stop ${index + 1} window`} htmlFor={`pressure-stop-${index}-window`} required>
                <Input id={`pressure-stop-${index}-window`} value={stop.window} onChange={(event) => updateStop(index, "window", event.currentTarget.value)} />
              </FormField>
              {stops.length > 1 ? (
                <Button aria-label={zh ? `移除站点 ${index + 1}` : `Remove stop ${index + 1}`} size="sm" variant="soft" onClick={() => removeStop(index)}>
                  {zh ? "移除" : "Remove"}
                </Button>
              ) : null}
            </div>
          ))}
        </div>
        <div className="docs-pressure-lab__toolbar">
          <Button size="sm" type="button" onClick={addStop}>{zh ? "添加站点" : "Add stop"}</Button>
          <Button size="sm" type="button" variant="stamp" onClick={simulateServerErrors}>{zh ? "模拟服务端错误" : "Simulate server errors"}</Button>
          <Button size="sm" type="button" variant="soft" onClick={clearServerErrors}>{zh ? "清除服务端错误" : "Clear server errors"}</Button>
          <Button size="sm" type="submit" variant="parcel">{zh ? "提交动态表单" : "Submit dynamic form"}</Button>
        </div>
      </Form>
      {status ? <p className="docs-pressure-lab__status">{status}</p> : null}
    </div>
  );
}

function ControlledUploadPressure({ zh }: { zh: boolean }) {
  const uploadRef = React.useRef<UploadRef>(null);
  const attemptsRef = React.useRef(new Map<string, number>());
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [status, setStatus] = React.useState(zh ? "等待文件。" : "Waiting for files.");
  const [listChangeCount, setListChangeCount] = React.useState(0);
  const [lastProgress, setLastProgress] = React.useState("");
  const [lastSnapshot, setLastSnapshot] = React.useState(zh ? "空队列" : "Empty queue");

  async function submitQueue() {
    await uploadRef.current?.submit();
    setStatus(zh ? "队列已处理。" : "Queue processed.");
  }

  function handleFileListChange(nextFileList: UploadFile[]) {
    setFileList(nextFileList);
    setListChangeCount((count) => count + 1);
    setLastSnapshot(nextFileList.length > 0 ? nextFileList.map((file) => `${file.name}: ${file.status}`).join(", ") : (zh ? "空队列" : "Empty queue"));
  }

  function clearQueue() {
    attemptsRef.current.clear();
    uploadRef.current?.clearFiles();
    setLastProgress("");
    setStatus(zh ? "队列已清空。" : "Queue cleared.");
  }

  return (
    <div className="docs-pressure-lab">
      <Upload
        ref={uploadRef}
        multiple
        drag
        label={zh ? "选择压力文件" : "Upload pressure files"}
        description={zh ? "route-retry.csv 第一次会失败，可单独重试。" : "route-retry.csv fails once and can retry alone."}
        fileList={fileList}
        onFileListChange={handleFileListChange}
        onProgress={(percent, file) => setLastProgress(zh ? `最近进度：${file.name} ${percent}%` : `Last progress: ${file.name} ${percent}%`)}
        customRequest={({ file, onError, onProgress, onSuccess }) => {
          const attempts = attemptsRef.current.get(file.name) ?? 0;
          attemptsRef.current.set(file.name, attempts + 1);
          onProgress?.(64);
          if (file.name.includes("retry") && attempts === 0) {
            onError?.(new Error("Retry once"));
            return;
          }
          onSuccess?.({ ok: true });
        }}
        renderFile={(file, actions) => (
          <div className="docs-pressure-lab__queue">
            <strong>{file.name}</strong>
            <Badge variant={file.status === "error" ? "stamp" : file.status === "success" ? "sky" : "leaf"}>{file.status}</Badge>
            <span>{file.percent}%</span>
            {file.status === "error" ? (
              <Button
                size="sm"
                variant="soft"
                onClick={() => {
                  actions.retry();
                  void uploadRef.current?.submit();
                }}
              >
                {zh ? `重试 ${file.name}` : `Retry ${file.name}`}
              </Button>
            ) : (
              <Button size="sm" variant="soft" onClick={actions.remove}>
                {zh ? `移除 ${file.name}` : `Remove ${file.name}`}
              </Button>
            )}
          </div>
        )}
      />
      <div className="docs-pressure-lab__toolbar">
        <Button size="sm" onClick={() => void submitQueue()}>{zh ? "开始队列" : "Start queue"}</Button>
        <Button size="sm" variant="soft" onClick={clearQueue}>{zh ? "清空队列" : "Clear queue"}</Button>
      </div>
      <p className="docs-pressure-lab__status">
        {zh ? `受控队列：${fileList.length} 个文件` : `Controlled queue: ${fileList.length} ${fileList.length === 1 ? "file" : "files"}`}
      </p>
      <p className="docs-pressure-lab__status">{zh ? `完整列表变更：${listChangeCount}` : `Full list changes: ${listChangeCount}`}</p>
      {lastProgress ? <p className="docs-pressure-lab__status">{lastProgress}</p> : null}
      <p className="docs-pressure-lab__status">{lastSnapshot}</p>
      <p className="docs-pressure-lab__status">{status}</p>
    </div>
  );
}

function createPressureExamples(zh: boolean): DocExample[] {
  return [
    {
      id: "server-table",
      title: zh ? "Server Table 服务端表格" : "Server Table",
      description: zh ? "用受控 selectedRowKeys 演示跨页选择、加载、分页错误和批量操作交接。" : "Controlled selectedRowKeys show cross-page selection, loading, page errors, and bulk-action handoff.",
      preview: <ServerTablePressure zh={zh} />,
      code: code([
        "const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);",
        "<Table",
        "  rowKey=\"id\"",
        "  selectable",
        "  selectedRowKeys={selectedRowKeys}",
        "  onSelectionChange={(_, keys) => setSelectedRowKeys(keys)}",
        "  loading={loading}",
        "  data={serverPageRows}",
        "/>"
      ])
    },
    {
      id: "dynamic-form",
      title: zh ? "Dynamic Form 动态表单" : "Dynamic Form",
      description: zh ? "动态字段由业务状态管理，提交失败聚焦第一个错误，服务端字段错误通过 setFieldsError 回填。" : "Product state owns dynamic fields, failed submits focus the first error, and setFieldsError maps server failures back to fields.",
      preview: <DynamicFormPressure zh={zh} />,
      code: code([
        "const formRef = React.useRef<FormRef>(null);",
        "formRef.current?.setFieldsError({",
        "  \"stops.1.desk\": \"Desk is already assigned.\"",
        "});"
      ])
    },
    {
      id: "controlled-upload-queue",
      title: zh ? "Controlled Upload Queue 受控上传队列" : "Controlled Upload Queue",
      description: zh ? "受控 fileList 通过 onFileListChange 接收完整队列，进度、重试和清空状态都保持可见。" : "Controlled fileList receives complete queues through onFileListChange, with visible progress, retry, and clear states.",
      preview: <ControlledUploadPressure zh={zh} />,
      code: code([
        "const [fileList, setFileList] = React.useState<UploadFile[]>([]);",
        "<Upload",
        "  fileList={fileList}",
        "  onFileListChange={setFileList}",
        "  customRequest={uploadAsset}",
        "/>"
      ])
    }
  ];
}

export function createCommercialPressureLabDocs(context: DemoContext): DocItem[] {
  const { labels, zh } = context;
  const examples = createPressureExamples(zh);

  return [
    {
      id: "commercial-pressure-lab",
      group: labels.groups.guide,
      title: zh ? "Commercial Pressure Lab 商用压力场" : "Commercial Pressure Lab",
      description: zh
        ? "v0.25 重点工作流交接页：把 Table、Form 和 Upload 放进服务端数据、动态字段和受控队列的真实后台场景。"
        : "The v0.25 focus workflow handoff page puts Table, Form, and Upload into server data, dynamic field, and controlled queue workflows.",
      searchText:
        "pressure commercial workflow handoff server table loading error dynamic form field list controlled upload full list change queue batch pagination 商用 压力 工作流 交接 服务端 表格 加载 错误 动态 表单 字段列表 受控 上传 完整列表 队列",
      preview: (
        <Space className="docs-pressure-lab__intro" direction="vertical">
          <Badge variant="leaf">{zh ? "v0.25 重点" : "v0.25 focus"}</Badge>
          <p>{zh ? "少加组件，多压重型工作流交接。" : "Fewer new components; deeper pressure on heavy workflow handoffs."}</p>
        </Space>
      ),
      examples,
      code: code([
        "Table: server-style pagination + controlled selectedRowKeys",
        "Form: dynamic field names + FormRef.setFieldsError",
        "Upload: controlled fileList + onFileListChange"
      ]),
      api: [
        { prop: "Table selectedRowKeys", type: "React.Key[]", defaultValue: "[]", description: zh ? "跨服务端分页、加载和错误状态保存选择键。" : "Persists selected keys across server pages, loading, and error states." },
        { prop: "FormRef.setFieldsError", type: "(errors) => void", defaultValue: "-", description: zh ? "把服务端字段错误回填到动态字段。" : "Maps server field errors back onto dynamic fields." },
        { prop: "Upload.onFileListChange", type: "(fileList) => void", defaultValue: "-", description: zh ? "受控队列接收完整文件列表和状态流转。" : "Controlled queues receive the complete file list and status transitions." }
      ]
    }
  ];
}
