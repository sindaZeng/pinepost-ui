# Pinepost UI v0.23 Commercial Pressure Design

## Goal

Pinepost UI v0.23 turns the v0.22 maturity matrix into a pressure-tested commercial workflow pass. The release deepens Table, Form, and Upload in realistic backend-product scenarios before adding any new component breadth.

## Context

v0.22 closed the component maturity baseline and published the first public matrix. That matrix marks Table and Form as commercial-ready, Upload as active hardening, and selection/date-time components as active but secondary for the next step. The clearest remaining trust gap is not visual coverage; it is whether the heavy workflow components can carry real product state across loading, server failure, dynamic inputs, and controlled queues.

## Chosen Approach

v0.23 should be a narrow release named **Commercial Pressure Lab**.

The implementation should add one new docs page that stresses three components together, plus the smallest runtime API additions needed for those examples to be honest:

- Table keeps controlled selection stable across server-like page changes and demonstrates bulk actions against selected keys.
- Form gains a first-class way to set server-returned field errors after submit.
- Upload gains a first-class controlled queue callback so product code can own the file list without rebuilding internal status transitions.

This is better than expanding display components because it strengthens the surfaces buyers inspect first in admin products: data grids, validation flows, and asset upload queues.

## Alternatives Considered

### Broad component polish

This would improve lower-priority display pages, but it would dilute the v0.22 maturity direction. It does not answer whether Pinepost UI can survive dense commercial workflows.

### Date/time scheduling release

Scheduling deserves a later release, especially disabled-date and disabled-time recipes. It should wait until Table, Form, and Upload have a stronger pressure page because those components anchor more product screens.

### Runtime-only API hardening

Runtime-only work would help package users, but the project risk is also documentation credibility. v0.23 needs visible docs pressure tests so the APIs are demonstrated in product language, not only unit tests.

## Scope

### Table

The Table v0.23 work stays inside existing controlled state primitives. It should not introduce built-in server data fetching or built-in pagination state. The docs page should compose `Table`, `Pagination`, loading state, error state, and `selectedRowKeys` to show how product code owns server data.

Required Table behavior:

- Controlled `selectedRowKeys` must preserve keys that are not present in the current `data` page.
- Header select-all should add or remove only the visible page keys.
- `getSelectionKeys()` should return the full controlled key list, including keys from other pages.
- `onSelectionChange(rows, keys)` should continue to return visible rows plus the full selected key list.

### Form

The Form v0.23 work should add a public imperative method:

```ts
setFieldsError(errors: FormValidationErrors): void
```

This lets product code map server-side validation failures back to fields after a submit attempt. The method should merge the provided field errors into current form errors, remove a field error when the provided value is `undefined` or `null`, and keep `aria-invalid` / `aria-describedby` behavior consistent through `FormField`.

The docs page should demonstrate dynamic field groups with stable string names such as `stops.0.desk` and `stops.1.window`. Pinepost UI does not need a new FormList component in this release; dynamic arrays can remain an app-owned pattern that uses existing `Form`, `FormField`, and `Input` primitives.

### Upload

The Upload v0.23 work should add a public controlled queue callback:

```ts
onFileListChange?: (fileList: UploadFile[]) => void
```

Every internal queue transition should call this callback with the next queue:

- file selection accepted by `beforeUpload`
- remove
- retry
- progress
- success
- error
- `UploadRef.setFiles`

The callback should make controlled `fileList` practical without forcing consumers to infer the next list from individual event callbacks.

Chunked upload and resumable upload are not part of v0.23. They are larger transport features and should not enter until the base controlled queue is credible.

## Docs UX

Add a demo-owned page:

```text
Commercial Pressure Lab 商用压力场
```

The page should be a documentation workbench, not a landing page. It should contain three independent but visually compact sections:

- Server Table: page switching, loading, retry, selected key count, select visible page, clear all selected keys, and a bulk action status.
- Dynamic Form: add/remove stop rows, submit with client validation, simulate server field errors, clear server errors after correction.
- Controlled Upload Queue: controlled `fileList`, multi-file selection, progress simulation, one failure, retry, remove, and final successful queue.

The page should have search terms for:

```text
pressure commercial server table dynamic form controlled upload queue batch pagination
```

The page should be linked from the maturity matrix and should update Table, Form, and Upload next-action copy to point at the pressure lab.

## Data Flow

Table pressure state stays demo-owned:

- `serverRowsByPage` fixture data lives in a demo-only file or inside the pressure page module.
- `page`, `loading`, `error`, and `selectedRowKeys` are React state in the docs page.
- `onSelectionChange` sets `selectedRowKeys` from the callback key list.
- Bulk action uses selected keys, not visible rows.

Form pressure state stays demo-owned:

- Dynamic rows are tracked by stable row ids.
- Field names are generated from the current row index for display and validation.
- On simulated server failure, the example calls `formRef.current?.setFieldsError({ "stops.1.desk": "Desk is already assigned." })`.
- Removing a row clears errors for removed field names before the row leaves the screen.

Upload pressure state stays demo-owned:

- `fileList` is controlled by the docs page.
- `onFileListChange` is the single source for queue updates.
- `customRequest` simulates progress and fails one file by name on the first attempt.
- Retry delegates to existing Upload retry actions and lets internal transitions emit the next controlled queue.

## Error Handling

Table examples should show both loading and error states without using global toast state. Retry should reset the table section only.

Form server errors should land on fields, not only as a submit-level message. Submit-level errors remain useful for non-field failures, but field-specific failures must be visible through `FormField`.

Upload errors should be per-file. Retrying one failed file should not reset successful files.

## Accessibility

Table bulk controls need visible button labels and should not rely on icon-only controls. The selected count should be plain text near the table.

Form server errors must preserve the existing `role="alert"` and `aria-describedby` wiring. Dynamic row remove buttons need field-specific labels such as `Remove stop 2`.

Upload controlled queue controls should remain native buttons. File status text should stay visible in the list so the e2e tests can assert state transitions without inspecting implementation details.

## Testing

Unit tests go in:

```text
src/components/v23-pack.test.tsx
```

They should cover:

- Table controlled selected keys across page data changes.
- `FormRef.setFieldsError()` setting, replacing, and clearing server field errors with accessible field state.
- Upload `onFileListChange` under controlled queue selection, progress, success, error, retry, remove, and `ref.setFiles`.

Playwright tests should extend:

```text
e2e/docs-smoke.spec.ts
e2e/component-qa.spec.ts
```

They should cover docs search, desktop/mobile no-overflow, and interactions in all three pressure lab sections.

## Version And Release

The implementation must bump `package.json` to `0.23.0`, add `CHANGELOG.md` notes, update `README.md`, and refresh `ROADMAP.md` so the next direction remains clear after release.

Full ownership release for v0.23 includes:

- `corepack pnpm check`
- `git diff --check`
- push to `main`
- CI and Pages success
- live demo verification
- tag `v0.23.0`
- GitHub Release
- npm publish workflow success
- npm registry verification for `pinepost-ui@0.23.0`

## Non-Goals

- No new broad display component work.
- No FormList component.
- No built-in Table data fetching client.
- No built-in Upload chunking or resumable transport.
- No route-level demo code splitting unless the current build starts failing.
- No breaking prop changes.

## Acceptance Criteria

- The public docs include `Commercial Pressure Lab 商用压力场`.
- The pressure page demonstrates Table, Form, and Upload with isolated state and no unrelated global feedback.
- Runtime APIs remain backward compatible.
- v0.23 unit and e2e coverage pass locally and in CI.
- The maturity matrix points Table, Form, and Upload at the pressure lab and raises only scores justified by the new coverage.
