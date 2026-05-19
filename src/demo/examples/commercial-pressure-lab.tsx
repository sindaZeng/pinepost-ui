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

const pageOneRows: ServerRoute[] = [
  { count: 12, id: "a7", route: "A7", status: "Ready" },
  { count: 8, id: "b4", route: "B4", status: "Ready" }
];

const pageTwoRows: ServerRoute[] = [
  { count: 5, id: "c2", route: "C2", status: "Queued" },
  { count: 14, id: "d9", route: "D9", status: "Ready" }
];

const serverColumns: Array<TableColumn<ServerRoute>> = [
  { key: "route", title: "Route" },
  { key: "count", title: "Count", align: "right" },
  { key: "status", title: "Status" }
];

function ServerTablePressure({ zh }: { zh: boolean }) {
  const [page, setPage] = React.useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const rows = page === 1 ? pageOneRows : pageTwoRows;

  function switchPage(nextPage: number) {
    setLoading(true);
    window.setTimeout(() => {
      setPage(nextPage);
      setLoading(false);
      setStatus(zh ? `第 ${nextPage} 页已加载。` : `Page ${nextPage} loaded.`);
    }, 80);
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
          onClick={() => setStatus(zh ? `已为 ${selectedRowKeys.length} 个键创建批量操作。` : `Bulk action queued for ${selectedRowKeys.length} keys.`)}
        >
          {zh ? "执行批量操作" : "Run bulk action"}
        </Button>
        <Button size="sm" variant="soft" onClick={() => setSelectedRowKeys([])}>
          {zh ? "清空选择" : "Clear selection"}
        </Button>
      </div>
      <p className="docs-pressure-lab__status">
        {zh ? `已选择 ${selectedRowKeys.length} 个键` : `${selectedRowKeys.length} selected keys`}
      </p>
      {status ? <Alert title={status} variant={status.includes("Bulk") || status.includes("批量") ? "success" : "info"} /> : null}
      <Table
        rowKey="id"
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={(_, keys) => setSelectedRowKeys(keys)}
        loading={loading}
        loadingText={zh ? "正在加载服务端数据..." : "Loading server rows..."}
        columns={serverColumns}
        data={rows}
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

  function addStop() {
    setStops((current) => [...current, { id: `stop-${current.length + 1}`, desk: "", window: "11:00" }]);
    setStatus(zh ? "已添加站点。" : "Stop added.");
  }

  function removeStop(index: number) {
    formRef.current?.setFieldsError({
      [`stops.${index}.desk`]: undefined,
      [`stops.${index}.window`]: undefined
    });
    setStops((current) => current.filter((_, stopIndex) => stopIndex !== index));
  }

  function simulateServerErrors() {
    const targetIndex = Math.min(1, stops.length - 1);
    formRef.current?.setFieldsError({
      [`stops.${targetIndex}.desk`]: zh ? "桌台已被分配。" : "Desk is already assigned."
    });
    setStatus(zh ? "服务端错误已回填到字段。" : "Server errors mapped to fields.");
  }

  function clearServerErrors() {
    const cleared: Record<string, undefined> = {};
    stops.forEach((_, index) => {
      cleared[`stops.${index}.desk`] = undefined;
      cleared[`stops.${index}.window`] = undefined;
    });
    formRef.current?.setFieldsError(cleared);
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
        onFinishFailed={() => setStatus(zh ? "请先修正动态字段。" : "Fix dynamic fields first.")}
      >
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

  async function submitQueue() {
    await uploadRef.current?.submit();
    setStatus(zh ? "队列已处理。" : "Queue processed.");
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
        onFileListChange={setFileList}
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
        <Button size="sm" variant="soft" onClick={() => uploadRef.current?.clearFiles()}>{zh ? "清空队列" : "Clear queue"}</Button>
      </div>
      <p className="docs-pressure-lab__status">{status}</p>
    </div>
  );
}

function createPressureExamples(zh: boolean): DocExample[] {
  return [
    {
      id: "server-table",
      title: zh ? "Server Table 服务端表格" : "Server Table",
      description: zh ? "用受控 selectedRowKeys 演示跨页选择、加载和批量操作。" : "Controlled selectedRowKeys show cross-page selection, loading, and bulk actions.",
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
      description: zh ? "动态字段由业务状态管理，服务端字段错误通过 setFieldsError 回填。" : "Product state owns dynamic fields while setFieldsError maps server failures back to fields.",
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
      description: zh ? "受控 fileList 通过 onFileListChange 接收完整队列，失败项可以单独重试。" : "Controlled fileList receives complete queues through onFileListChange; failed files can retry alone.",
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
        ? "v0.23 压力页：把 Table、Form 和 Upload 放进服务端数据、动态字段和受控队列的真实后台场景。"
        : "The v0.23 pressure page puts Table, Form, and Upload into server data, dynamic field, and controlled queue workflows.",
      searchText:
        "pressure commercial server table dynamic form controlled upload queue batch pagination 商用 压力 服务端 表格 动态 表单 受控 上传 队列",
      preview: (
        <Space className="docs-pressure-lab__intro" direction="vertical">
          <Badge variant="leaf">{zh ? "v0.23 重点" : "v0.23 focus"}</Badge>
          <p>{zh ? "少加组件，多压重型工作流。" : "Fewer new components; deeper pressure on heavy workflows."}</p>
        </Space>
      ),
      examples,
      code: code([
        "Table: server-style pagination + controlled selectedRowKeys",
        "Form: dynamic field names + FormRef.setFieldsError",
        "Upload: controlled fileList + onFileListChange"
      ]),
      api: [
        { prop: "Table selectedRowKeys", type: "React.Key[]", defaultValue: "[]", description: zh ? "跨服务端分页保存选择键。" : "Persists selected keys across server pages." },
        { prop: "FormRef.setFieldsError", type: "(errors) => void", defaultValue: "-", description: zh ? "把服务端字段错误回填到字段。" : "Maps server field errors back onto fields." },
        { prop: "Upload.onFileListChange", type: "(fileList) => void", defaultValue: "-", description: zh ? "受控队列接收完整文件列表。" : "Controlled queues receive the complete file list." }
      ]
    }
  ];
}
