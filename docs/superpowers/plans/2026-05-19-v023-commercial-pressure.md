# Pinepost UI v0.23 Commercial Pressure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the v0.23 Commercial Pressure Lab and harden the smallest Table, Form, and Upload runtime APIs needed for real product workflows.

**Architecture:** Keep product workflow state in demo-owned modules, make only backward-compatible runtime API additions, and prove the behavior with focused Vitest and Playwright coverage. The new docs page imports existing Pinepost components and avoids adding broad display-component scope.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Playwright, Vite, pnpm, GitHub Actions, npm release workflow.

---

### Task 1: Table Cross-Page Selection Contract

**Files:**
- Modify: `src/components/data-extras.tsx`
- Create: `src/components/v23-pack.test.tsx`

- [ ] **Step 1: Write the failing Table test**

Add this first test to `src/components/v23-pack.test.tsx`:

```tsx
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Table, type TableColumn, type TableRef } from "../index";

type ServerRow = {
  id: string;
  route: string;
};

const columns: Array<TableColumn<ServerRow>> = [
  { key: "route", title: "Route" }
];

const pageOneRows: ServerRow[] = [
  { id: "north", route: "North" },
  { id: "south", route: "South" }
];

const pageTwoRows: ServerRow[] = [
  { id: "west", route: "West" },
  { id: "east", route: "East" }
];

describe("Pinepost UI v0.23 commercial pressure", () => {
  it("keeps controlled Table selection keys across server page changes", async () => {
    const user = userEvent.setup();
    const tableRef = React.createRef<TableRef<ServerRow>>();
    const onSelectionChange = vi.fn();

    function ServerTable() {
      const [page, setPage] = React.useState(1);
      const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(["north", "archived"]);
      const rows = page === 1 ? pageOneRows : pageTwoRows;

      return (
        <>
          <button type="button" onClick={() => setPage(2)}>Page 2</button>
          <Table
            ref={tableRef}
            rowKey="id"
            selectable
            selectedRowKeys={selectedRowKeys}
            onSelectionChange={(visibleRows, keys) => {
              setSelectedRowKeys(keys);
              onSelectionChange(visibleRows, keys);
            }}
            columns={columns}
            data={rows}
          />
        </>
      );
    }

    render(<ServerTable />);

    expect(tableRef.current?.getSelectionKeys()).toEqual(["north", "archived"]);
    await user.click(screen.getByRole("button", { name: "Page 2" }));

    expect(tableRef.current?.getSelectionKeys()).toEqual(["north", "archived"]);
    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));

    expect(onSelectionChange).toHaveBeenLastCalledWith(pageTwoRows, ["north", "archived", "west", "east"]);
    expect(tableRef.current?.getSelectionKeys()).toEqual(["north", "archived", "west", "east"]);
  });
});
```

- [ ] **Step 2: Run the Table test and confirm the current contract**

Run:

```powershell
corepack pnpm test src/components/v23-pack.test.tsx
```

Expected if the contract already holds: the Table test passes. Expected if the contract regressed: failure shows missing off-page keys after page change or select-all.

- [ ] **Step 3: Patch Table only if the test fails**

If the test fails because select-all discards off-page controlled keys, update the header select-all handler in `src/components/data-extras.tsx` so it starts from `activeSelectedKeys` and only adds or removes visible page keys:

```tsx
const visibleKeys = data.map((row, index) => getRowKey(row, index));
const nextKeys = allVisibleSelected
  ? activeSelectedKeys.filter((key) => !visibleKeys.includes(key))
  : Array.from(new Set([...activeSelectedKeys, ...visibleKeys]));
updateSelection(nextKeys);
```

- [ ] **Step 4: Re-run the focused test**

Run:

```powershell
corepack pnpm test src/components/v23-pack.test.tsx
```

Expected: the Table test passes.

### Task 2: Form Server Field Errors

**Files:**
- Modify: `src/components/form-extras.tsx`
- Modify: `src/components/v23-pack.test.tsx`

- [ ] **Step 1: Add the failing Form test**

Append this test inside the existing `describe` block in `src/components/v23-pack.test.tsx`:

```tsx
import { act } from "react";
import { Form, FormField, Input, type FormRef } from "../index";

it("lets FormRef set and clear server field errors accessibly", async () => {
  const formRef = React.createRef<FormRef>();

  render(
    <Form ref={formRef} model={{ "stops.0.desk": "Moss desk" }}>
      <FormField name="stops.0.desk" label="Stop desk" htmlFor="stop-desk">
        <Input id="stop-desk" value="Moss desk" onChange={() => undefined} />
      </FormField>
    </Form>
  );

  act(() => {
    formRef.current?.setFieldsError({ "stops.0.desk": "Desk is already assigned." });
  });

  expect(formRef.current?.getFieldsError()).toEqual({ "stops.0.desk": "Desk is already assigned." });
  expect(screen.getByLabelText("Stop desk")).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("alert")).toHaveTextContent("Desk is already assigned.");

  act(() => {
    formRef.current?.setFieldsError({ "stops.0.desk": undefined });
  });

  expect(formRef.current?.getFieldsError()).toEqual({});
  expect(screen.getByLabelText("Stop desk")).not.toHaveAttribute("aria-invalid");
});
```

- [ ] **Step 2: Run the Form test and confirm it fails**

Run:

```powershell
corepack pnpm test src/components/v23-pack.test.tsx
```

Expected: TypeScript or runtime failure because `setFieldsError` is not on `FormRef`.

- [ ] **Step 3: Add `setFieldsError` to `FormRef`**

In `src/components/form-extras.tsx`, extend `FormRef`:

```ts
setFieldsError: (errors: FormValidationErrors) => void;
```

Then add the implementation before the `React.useImperativeHandle` call:

```tsx
const setFieldsError = React.useCallback((nextErrors: FormValidationErrors) => {
  setErrors((currentErrors) => {
    const merged = { ...currentErrors };
    for (const [name, message] of Object.entries(nextErrors)) {
      if (message === undefined || message === null) {
        delete merged[name];
      } else {
        merged[name] = message;
      }
    }
    return merged;
  });
}, []);
```

Expose it from the imperative handle:

```tsx
setFieldsError,
```

Add `setFieldsError` to the dependency list for `React.useImperativeHandle`.

- [ ] **Step 4: Re-run the focused test**

Run:

```powershell
corepack pnpm test src/components/v23-pack.test.tsx
```

Expected: Table and Form tests pass.

### Task 3: Upload Controlled Queue Callback

**Files:**
- Modify: `src/components/form-extras.tsx`
- Modify: `src/components/v23-pack.test.tsx`

- [ ] **Step 1: Add the failing Upload test**

Append this test inside the `describe` block in `src/components/v23-pack.test.tsx`:

```tsx
import { Upload, type UploadFile, type UploadRef } from "../index";

it("emits complete Upload queues for controlled fileList changes", async () => {
  const user = userEvent.setup();
  const uploadRef = React.createRef<UploadRef>();
  const queueSnapshots: UploadFile[][] = [];
  const attempts = new Map<string, number>();

  function ControlledUpload() {
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    return (
      <Upload
        ref={uploadRef}
        multiple
        label="Upload pressure files"
        fileList={fileList}
        onFileListChange={(nextList) => {
          queueSnapshots.push(nextList);
          setFileList(nextList);
        }}
        customRequest={({ file, onError, onProgress, onSuccess }) => {
          const count = attempts.get(file.name) ?? 0;
          attempts.set(file.name, count + 1);
          onProgress?.(60);
          if (file.name === "retry.csv" && count === 0) {
            onError?.(new Error("Retry once"));
            return;
          }
          onSuccess?.({ ok: true });
        }}
      />
    );
  }

  render(<ControlledUpload />);

  await user.upload(screen.getByLabelText("Upload pressure files"), [
    new File(["a"], "ready.csv", { type: "text/csv" }),
    new File(["b"], "retry.csv", { type: "text/csv" })
  ]);

  expect(queueSnapshots.at(-1)?.map((file) => file.status)).toEqual(["ready", "ready"]);

  await act(async () => uploadRef.current?.submit());
  expect(queueSnapshots.at(-1)?.map((file) => [file.name, file.status])).toEqual([
    ["ready.csv", "success"],
    ["retry.csv", "error"]
  ]);

  await user.click(screen.getByRole("button", { name: "Retry retry.csv" }));
  expect(queueSnapshots.at(-1)?.map((file) => [file.name, file.status])).toEqual([
    ["ready.csv", "success"],
    ["retry.csv", "success"]
  ]);

  await user.click(screen.getByRole("button", { name: "Remove ready.csv" }));
  expect(queueSnapshots.at(-1)?.map((file) => file.name)).toEqual(["retry.csv"]);
});
```

- [ ] **Step 2: Run the Upload test and confirm it fails**

Run:

```powershell
corepack pnpm test src/components/v23-pack.test.tsx
```

Expected: TypeScript failure because `onFileListChange` is not on `UploadProps`.

- [ ] **Step 3: Add `onFileListChange` to Upload**

In `src/components/form-extras.tsx`, extend `UploadProps`:

```ts
onFileListChange?: (fileList: UploadFile[]) => void;
```

Destructure it in `UploadInner`:

```tsx
onFileListChange,
```

Update the queue setter so every queue transition emits the full list:

```tsx
function updateFileList(nextFiles: UploadFile[]) {
  fileListRef.current = nextFiles;
  if (fileList === undefined) setInternalFileList(nextFiles);
  onFileListChange?.(nextFiles);
}
```

Keep existing individual callbacks such as `onChange`, `onSuccess`, `onError`, `onProgress`, `onRetry`, and `onRemove` in place. They remain event-specific hooks; `onFileListChange` is the controlled-state hook.

- [ ] **Step 4: Make `UploadRef.setFiles` emit the queue callback**

Find the imperative handle for `UploadRef` and ensure `setFiles` calls `updateFileList`:

```tsx
setFiles: (nextFiles) => updateFileList(nextFiles),
```

Keep `getFiles` returning `fileListRef.current`.

- [ ] **Step 5: Re-run focused tests**

Run:

```powershell
corepack pnpm test src/components/v23-pack.test.tsx
```

Expected: Table, Form, and Upload tests pass.

### Task 4: Commercial Pressure Lab Docs Page

**Files:**
- Create: `src/demo/examples/commercial-pressure-lab.tsx`
- Modify: `src/demo/docs.tsx`
- Modify: `src/demo/demo.css`
- Modify: `src/demo/maturity.ts`
- Modify: `e2e/docs-smoke.spec.ts`

- [ ] **Step 1: Add failing docs search coverage**

Add this Playwright test to `e2e/docs-smoke.spec.ts`:

```ts
test("finds and renders the Commercial Pressure Lab", async ({ page }) => {
  await page.goto("/");

  for (const term of ["pressure", "commercial", "server table", "dynamic form", "controlled upload"]) {
    await page.getByLabel("搜索组件").fill(term);
    await expect(page.getByRole("button", { name: /Commercial Pressure Lab|商用压力场/ })).toBeVisible();
  }

  await page.getByRole("button", { name: /Commercial Pressure Lab|商用压力场/ }).click();
  await expect(page.locator("h1")).toHaveText(/Commercial Pressure Lab|商用压力场/);
  await expect(page.getByRole("region", { name: /Server Table|服务端表格/ })).toBeVisible();
  await expect(page.getByRole("region", { name: /Dynamic Form|动态表单/ })).toBeVisible();
  await expect(page.getByRole("region", { name: /Controlled Upload Queue|受控上传队列/ })).toBeVisible();
  await expectNoPageOverflow(page);
});
```

- [ ] **Step 2: Run the docs smoke test and confirm it fails**

Run:

```powershell
corepack pnpm test:e2e e2e/docs-smoke.spec.ts --project=desktop
```

Expected: failure because the pressure lab page does not exist.

- [ ] **Step 3: Create the pressure lab module**

Create `src/demo/examples/commercial-pressure-lab.tsx` with a factory named `createCommercialPressureLabDocs(context: DemoContext): DocPage[]`. Use existing demo patterns from `src/demo/examples/catalog-maturity.tsx` and return one `DocPage` with:

```ts
id: "commercial-pressure-lab",
title: zh ? "Commercial Pressure Lab 商用压力场" : "Commercial Pressure Lab",
keywords: "pressure commercial server table dynamic form controlled upload queue batch pagination 商用 压力 服务端 表格 动态 表单 受控 上传 队列",
```

The `examples` array should contain three examples named:

```text
Server Table 服务端表格
Dynamic Form 动态表单
Controlled Upload Queue 受控上传队列
```

Each example should use isolated `React.useState` inside a small nested component so Table, Form, and Upload statuses do not leak across examples.

- [ ] **Step 4: Wire the docs page into `src/demo/docs.tsx`**

Import and append the page after the maturity catalog:

```ts
import { createCommercialPressureLabDocs } from "./examples/commercial-pressure-lab";
```

In the page assembly:

```ts
const pressureLabDocs = createCommercialPressureLabDocs(context);
return [
  ...surfaceDocs,
  ...dataDocs,
  ...selectionDocs,
  ...catalogDocs,
  ...maturityDocs,
  ...pressureLabDocs
];
```

Keep the exact surrounding array order consistent with the current file.

- [ ] **Step 5: Add compact pressure lab styles**

In `src/demo/demo.css`, add styles scoped under:

```css
.docs-pressure-lab {}
.docs-pressure-lab__toolbar {}
.docs-pressure-lab__status {}
.docs-pressure-lab__grid {}
.docs-pressure-lab__queue {}
```

Use existing Pinepost spacing and avoid creating nested cards inside cards.

- [ ] **Step 6: Update the maturity matrix**

In `src/demo/maturity.ts`, adjust Table, Form, and Upload `nextActions` so each points to the pressure lab. Raise scores only modestly after the docs and tests are implemented:

```ts
Table: 88
Form: 87
Upload: 83
```

Keep non-focus display components queued.

- [ ] **Step 7: Re-run docs smoke coverage**

Run:

```powershell
corepack pnpm test:e2e e2e/docs-smoke.spec.ts --project=desktop
corepack pnpm test:e2e e2e/docs-smoke.spec.ts --project=mobile
```

Expected: the new pressure lab docs search and page render tests pass on desktop and mobile.

### Task 5: Pressure Lab Interaction Coverage

**Files:**
- Modify: `e2e/component-qa.spec.ts`

- [ ] **Step 1: Add failing interaction coverage**

Add this Playwright test to `e2e/component-qa.spec.ts`:

```ts
test("supports Commercial Pressure Lab interactions", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Commercial Pressure Lab|商用压力场/ }).click();

  const serverTable = page.getByRole("region", { name: /Server Table|服务端表格/ });
  await serverTable.getByRole("checkbox", { name: "Select all rows" }).check();
  await expect(serverTable.getByText(/2 selected keys|已选择 2 个键/)).toBeVisible();
  await serverTable.getByRole("button", { name: /Page 2|第 2 页/ }).click();
  await serverTable.getByRole("checkbox", { name: "Select all rows" }).check();
  await expect(serverTable.getByText(/4 selected keys|已选择 4 个键/)).toBeVisible();
  await serverTable.getByRole("button", { name: /Run bulk action|执行批量操作/ }).click();
  await expect(serverTable.getByText(/Bulk action queued for 4 keys|已为 4 个键创建批量操作/)).toBeVisible();

  const dynamicForm = page.getByRole("region", { name: /Dynamic Form|动态表单/ });
  await dynamicForm.getByRole("button", { name: /Add stop|添加站点/ }).click();
  await dynamicForm.getByRole("button", { name: /Simulate server errors|模拟服务端错误/ }).click();
  await expect(dynamicForm.getByRole("alert").filter({ hasText: /already assigned|已被分配/ })).toBeVisible();
  await dynamicForm.getByRole("button", { name: /Clear server errors|清除服务端错误/ }).click();
  await expect(dynamicForm.getByRole("alert").filter({ hasText: /already assigned|已被分配/ })).toHaveCount(0);

  const uploadQueue = page.getByRole("region", { name: /Controlled Upload Queue|受控上传队列/ });
  await uploadQueue.locator("input[type=file]").setInputFiles([
    { name: "route-ready.csv", mimeType: "text/csv", buffer: Buffer.from("ready") },
    { name: "route-retry.csv", mimeType: "text/csv", buffer: Buffer.from("retry") }
  ]);
  await uploadQueue.getByRole("button", { name: /Start queue|开始队列/ }).click();
  await expect(uploadQueue.getByText("success", { exact: true })).toHaveCount(1);
  await expect(uploadQueue.getByText("error", { exact: true })).toHaveCount(1);
  await uploadQueue.getByRole("button", { name: /Retry route-retry.csv/ }).click();
  await expect(uploadQueue.getByText("success", { exact: true })).toHaveCount(2);
});
```

- [ ] **Step 2: Run the new interaction test and confirm it fails before docs implementation**

Run:

```powershell
corepack pnpm test:e2e e2e/component-qa.spec.ts --project=desktop -g "Commercial Pressure Lab"
```

Expected before Task 4 completes: the page cannot be found. Expected after Task 4 but before interaction wiring: the missing controls or statuses fail.

- [ ] **Step 3: Implement the missing docs interactions**

Patch `src/demo/examples/commercial-pressure-lab.tsx` until the test can interact only through visible controls and text. Keep the examples independent:

```tsx
function ServerTablePressureExample() {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const rows = page === 1 ? pageOneRows : pageTwoRows;

  return (
    <section className="docs-pressure-lab" aria-label={zh ? "服务端表格" : "Server Table"}>
      <Table
        rowKey="id"
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={(_, keys) => setSelectedRowKeys(keys)}
        columns={columns}
        data={rows}
      />
      <p>{zh ? `已选择 ${selectedRowKeys.length} 个键` : `${selectedRowKeys.length} selected keys`}</p>
      <Button onClick={() => setPage(2)}>{zh ? "第 2 页" : "Page 2"}</Button>
      <Button onClick={() => setStatus(zh ? `已为 ${selectedRowKeys.length} 个键创建批量操作` : `Bulk action queued for ${selectedRowKeys.length} keys`)}>
        {zh ? "执行批量操作" : "Run bulk action"}
      </Button>
      {status ? <p role="status">{status}</p> : null}
    </section>
  );
}
```

Adapt the final implementation to the repo's `DocExample` shape instead of pasting this section verbatim if the surrounding factory uses preview/code pairs.

- [ ] **Step 4: Re-run the interaction test**

Run:

```powershell
corepack pnpm test:e2e e2e/component-qa.spec.ts --project=desktop -g "Commercial Pressure Lab"
```

Expected: the pressure lab interaction test passes.

### Task 6: Release Metadata

**Files:**
- Modify: `package.json`
- Modify: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `ROADMAP.md`

- [ ] **Step 1: Update package version**

In `package.json`, set:

```json
"version": "0.23.0"
```

- [ ] **Step 2: Add changelog entry**

Insert this section at the top of `CHANGELOG.md` below the title:

```md
## 0.23.0

- Added the Commercial Pressure Lab docs page for server-style Table workflows, dynamic Form server errors, and controlled Upload queues.
- Added `FormRef.setFieldsError()` for mapping server validation failures back onto fields.
- Added Upload `onFileListChange` so controlled queues can receive every status transition as a complete file list.
- Strengthened Table, Form, and Upload maturity signals while keeping broad display component polish out of scope.
```

- [ ] **Step 3: Update README and ROADMAP**

Add one short v0.23 paragraph to `README.md` near the previous version notes:

```md
The v0.23 pressure pass adds a Commercial Pressure Lab for server-style Table state, dynamic Form server errors, and controlled Upload queues so the heaviest workflows stay visible and test-backed.
```

Update `ROADMAP.md` Near Term so it points to the next likely pass:

```md
- Deepen date/time disabled scheduling recipes after the Table, Form, and Upload pressure pass.
- Keep display-oriented components queued until heavy workflow maturity is stronger.
```

- [ ] **Step 4: Run public text guard**

Run:

```powershell
corepack pnpm verify:public-text
```

Expected: public text scan passes.

### Task 7: Final Verification And Release

**Files:**
- Verify repository-wide generated output only through commands.

- [ ] **Step 1: Run focused checks**

Run:

```powershell
corepack pnpm test src/components/v23-pack.test.tsx
corepack pnpm test:e2e e2e/docs-smoke.spec.ts --project=desktop
corepack pnpm test:e2e e2e/component-qa.spec.ts --project=desktop -g "Commercial Pressure Lab"
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 2: Run full gate**

Run:

```powershell
corepack pnpm check
```

Expected: full project gate exits 0. The existing Vite chunk-size warning remains non-blocking unless Vite exits non-zero.

- [ ] **Step 3: Verify local docs in browser automation**

Start or reuse the Vite server:

```powershell
corepack pnpm dev
```

Use Playwright or the Browser plugin to open:

```text
http://localhost:5173
```

Verify desktop and mobile can search `pressure`, open `Commercial Pressure Lab`, and complete one Table/Form/Upload interaction without overflow.

- [ ] **Step 4: Commit and push**

Run:

```powershell
git status --short
git diff --stat
git add package.json CHANGELOG.md README.md ROADMAP.md src/components/data-extras.tsx src/components/form-extras.tsx src/components/v23-pack.test.tsx src/demo/docs.tsx src/demo/demo.css src/demo/maturity.ts src/demo/examples/commercial-pressure-lab.tsx e2e/docs-smoke.spec.ts e2e/component-qa.spec.ts
git commit -m "Add v0.23 commercial pressure lab"
git push origin main
```

Expected: push succeeds to `main`.

- [ ] **Step 5: Wait for remote verification**

Use GitHub Actions status for the pushed commit:

```powershell
gh run list --repo sindaZeng/pinepost-ui --commit $(git rev-parse HEAD) --limit 10
```

Expected: CI and Deploy Demo complete with success.

- [ ] **Step 6: Verify live demo**

Fetch the deployed demo asset and run a browser check against:

```text
https://sindazeng.github.io/pinepost-ui/
```

Expected: the live bundle contains `Commercial Pressure Lab`, and browser automation can open the pressure page at desktop and mobile widths.

- [ ] **Step 7: Tag, release, and publish**

Run:

```powershell
git tag -a v0.23.0 -m "Pinepost UI v0.23.0"
git push origin v0.23.0
gh release create v0.23.0 --repo sindaZeng/pinepost-ui --title "Pinepost UI v0.23.0" --notes-file CHANGELOG.md --verify-tag
```

Expected: Release is created and `Publish Package` workflow starts.

- [ ] **Step 8: Verify npm publication**

After the publish workflow succeeds, run:

```powershell
corepack pnpm npm view pinepost-ui@0.23.0 version dist-tags.latest dist.tarball --json
```

Expected JSON includes:

```json
{
  "version": "0.23.0",
  "dist-tags.latest": "0.23.0"
}
```

### Self-Review Notes

- The plan covers every spec requirement: Table cross-page selection, Form server field errors, Upload controlled queue, docs page, maturity updates, tests, metadata, and release.
- The plan keeps v0.23 narrow and excludes display breadth, FormList, built-in data fetching, and resumable upload.
- Every introduced public API name is consistent across spec, tests, runtime steps, and docs: `FormRef.setFieldsError` and `UploadProps.onFileListChange`.
