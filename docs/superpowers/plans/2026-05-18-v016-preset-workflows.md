# Pinepost UI v0.16 Preset Workflows Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build portable preset workflows for themes, table views, and release notes without changing existing component contracts.

**Architecture:** Add serializable helper APIs in existing modules, keep docs state local to the demo app, and use e2e tests to prove the workflows are usable from the documentation site. No new runtime component is introduced.

**Tech Stack:** React, TypeScript, Vitest, Playwright, Vite, Node ESM scripts.

---

### Task 1: Theme Collection Helpers

**Files:**
- Modify: `src/theme.ts`
- Modify: `src/index.ts`
- Test: `src/components/v16-pack.test.tsx`

- [ ] Write a failing Vitest case that creates a theme collection, serializes it, parses it, and verifies invalid entries are reported without throwing.
- [ ] Run `corepack pnpm test src/components/v16-pack.test.tsx` and confirm the helper imports are missing.
- [ ] Implement `PinepostThemeCollection*` types plus create, stringify, and parse helpers.
- [ ] Export the helpers from `src/index.ts`.
- [ ] Re-run the v0.16 test file and confirm the theme collection case passes.

### Task 2: Table Preset Export Helpers

**Files:**
- Modify: `src/components/data-extras.tsx`
- Test: `src/components/v16-pack.test.tsx`

- [ ] Add a failing Vitest case that exports table presets with order, hidden columns, widths, and sort state.
- [ ] Confirm the test fails because the table preset helpers are missing.
- [ ] Implement `TableViewPresetExport*` types plus create, stringify, and parse helpers.
- [ ] Re-run the v0.16 test file and confirm both unit cases pass.

### Task 3: Docs Workflows

**Files:**
- Modify: `src/demo/main.tsx`
- Modify: `src/demo/demo.css`
- Modify: `e2e/docs-smoke.spec.ts`

- [ ] Add e2e expectations for Theme Studio collection controls and Table preset workflow search.
- [ ] Confirm e2e fails before docs changes.
- [ ] Add Theme Studio collection save, switch, duplicate, remove, import, and export controls.
- [ ] Add a Table saved preset recipe and search keywords.
- [ ] Re-run e2e until the new docs workflow passes.

### Task 4: Release Notes Draft

**Files:**
- Create: `scripts/draft-release-notes.mjs`
- Modify: `package.json`
- Modify: `docs/RELEASE.md`
- Test: `src/components/v16-pack.test.tsx`

- [ ] Add a failing test that invokes the script and expects the current version heading plus changelog bullets.
- [ ] Implement the script as a local Markdown printer.
- [ ] Add `release:draft` to package scripts and document it.
- [ ] Re-run the v0.16 test file.

### Task 5: Metadata and Release Gate

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `ROADMAP.md`
- Modify: `src/demo/main.tsx`

- [ ] Bump version to `0.16.0`.
- [ ] Update public docs metadata and Coverage / Roadmap text.
- [ ] Run `corepack pnpm check`.
- [ ] Run `git diff --check`.
- [ ] Use Browser or Playwright to inspect the local docs.
- [ ] Commit, push `main`, wait for CI and Pages, and verify the online bundle contains v0.16 content.
