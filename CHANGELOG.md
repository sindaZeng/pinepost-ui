# Changelog

## 0.28.0

- Hardened TreeSelect keyboard behavior across visible node movement, branch expansion, disabled-node skipping, leaf selection, multi-select toggling, lazy loading, and Escape dismissal.
- Added v0.28 unit and Playwright coverage for the TreeSelect keyboard contract while preserving existing Select and Cascader regressions.
- Updated maturity, roadmap, README, and selection docs around the deep picker hardening focus without adding public props or new dependencies.

## 0.27.0

- Added a focused Recipe Gallery example module so the guide shell stays easier to maintain.
- Added v0.27 Recipe Gallery team handoff previews for active theme, table preset, and schedule preset details.
- Kept damaged import recovery and apply-to-builder behavior covered while preserving the Recipe Bundle public API.
- Updated maturity, roadmap, README, docs search, and Playwright coverage around the team handoff focus.

## 0.26.0

- Added a v0.26 Recipe Gallery bundle handoff flow for commerce launch and learning workflow imports.
- Added import apply, damaged bundle recovery, and full handoff metadata previews for recipe bundles.
- Tightened recipe bundle parsing so imports with no recipe references report a validation issue while preserving previewable metadata.
- Updated maturity, roadmap, README, docs search, and Playwright coverage around the saved bundle handoff focus.

## 0.25.1

- Fixed Upload controlled queue progress so error and success transitions preserve the latest visible percent.
- Fixed Commercial Pressure Lab server Table handoff state so rapid simulated requests and selection clears cannot show stale retry or selected-key copy.
- Added regression coverage for Upload progress preservation and Commercial Pressure Lab rapid server interactions.

## 0.25.0

- Expanded the Commercial Pressure Lab into a v0.25 workflow handoff pass for Table, Form, and Upload.
- Added server Table loading, page-error, cross-page selected-key, and bulk-action handoff coverage.
- Added dynamic Form field-list coverage for add/remove behavior, first-error focus, and field-level server errors.
- Added controlled Upload queue coverage for visible progress, retry, clear, and complete file-list transitions.
- Updated the maturity matrix around the v0.25 commercial workflow handoff focus without adding new component breadth.

## 0.24.0

- Hardened DateRangePickerPanel so ranges crossing disabled dates are not committed.
- Hardened TimeRangePickerPanel so shortcut ranges follow the same disabled time rules as manual selection.
- Added disabled scheduling examples for blocked dispatch days and closed time windows.
- Updated the maturity matrix around the v0.24 date/time scheduling pressure pass without broadening component scope.

## 0.23.0

- Added the Commercial Pressure Lab docs page for server-style Table workflows, dynamic Form server errors, and controlled Upload queues.
- Added `FormRef.setFieldsError()` for mapping server validation failures back onto fields.
- Added Upload `onFileListChange` so controlled queues can receive every status transition as a complete file list.
- Strengthened Table, Form, and Upload maturity signals while keeping broad display component polish out of scope.

## 0.22.0

- Added a demo-owned Component Maturity matrix with levels, scores, focus flags, current gaps, and next actions for commercial-depth planning.
- Hardened Table row selection with controlled selected keys, default selected keys, select-all behavior, `getSelectionKeys()`, and key-aware `onSelectionChange` callbacks.
- Hardened Form, Upload, Select/Cascader/TreeSelect, and date/time panels across validation errors, multi-file upload state, grouped option rendering, native clear buttons, dismissal behavior, root prop forwarding, and accessible date labels.
- Kept display-oriented components in a non-focus status so v0.22 prioritizes heavy form and data credibility over broad shallow expansion.

## 0.21.0

- Recorded the verified v0.21 boundary for the segmented demo architecture split before starting the v0.22 maturity pass.
- Documented the catalog split across demo-owned example modules instead of adding more unrelated logic to the main demo entry.
- Kept the release line focused on closing the existing demo architecture work, package metadata, and verification notes rather than adding new component breadth.

## 0.20.0

- Added a rebuilt demo catalog with segmented examples, example navigation, copyable code, API tables, and advanced playground sections.
- Split Table documentation into focused examples for basics, filtering, sorting, selection, expansion, summaries, column settings, views, and boundary states.
- Converted high-frequency Form, Upload, Select, Cascader, TreeSelect, Tree, DateRangePickerPanel, and TimeRangePickerPanel demos into isolated product scenarios.
- Reduced visual noise in complex demo surfaces and expanded Playwright coverage for segmented examples, copy controls, and isolated feedback.

## 0.19.0

- Reworked high-frequency docs previews into isolated API workbenches with local status, methods, event logs, and copyable code.
- Hardened Form and Table demos so failed validation and filter clearing no longer trigger unrelated success feedback.
- Expanded commercial workflow demos for Upload, Select, Cascader, TreeSelect, Tree, DateRangePickerPanel, and TimeRangePickerPanel.
- Added Playwright coverage for realistic submit states, table filter isolation, and workbench availability.

## 0.18.0

- Added portable Recipe Bundle helpers for saving theme collections, table view presets, schedule config, and recipe references.
- Added stable shortcut keys to Pinepost date, date range, and time range preset helpers.
- Expanded Recipe Gallery with Bundle Builder, import preview, and searchable recipe bundle documentation.
- Updated Theme Studio, Table, Coverage, and docs smoke coverage for bundle workflows.

## 0.17.0

- Added multiple path selection for Cascader while preserving the existing single path workflow.
- Added Pinepost date, date range, and time range preset helpers for scheduling screens.
- Expanded Cascader, DateRangePickerPanel, TimeRangePickerPanel, and Recipe Gallery docs with selection and scheduling recipes.
- Added v0.17 unit and docs smoke coverage for multi-route selection and preset discovery.

## 0.16.0

- Added portable theme collections for saving, importing, and exporting multiple Pinepost token sets.
- Added serializable table view preset helpers for product table workflows.
- Added release notes draft automation for preparing GitHub and package release copy.
- Expanded docs search, Theme Studio, Table recipes, and validation coverage for preset workflows.

## 0.15.0

- Expanded Recipe Gallery to eight product templates with category filters.
- Added state switching for recipe previews across ready, loading, empty, error, disabled, sold-out, and success states.
- Added visual baseline Playwright coverage for Theme Studio, Recipe Gallery, Table, and Upload pages.
- Updated docs search, coverage status, and release metadata for the hardened recipe workflow.

## 0.14.0

- Added theme JSON import/export helpers, token validation, and stable theme class name generation.
- Expanded Theme Studio with downloadable CSS/JSON, import recovery, and validation messages.
- Added a Recipe Gallery guide with copyable product screen compositions.
- Added docs navigation search and smoke coverage for recipes and theme import.

## 0.13.0

- Added editable Pinepost theme token presets, merge helpers, and CSS variable generation.
- Added a Theme Studio guide page with live component previews and copyable CSS output.
- Added Playwright smoke coverage for the theme editing and visual capture workflow.
- Updated docs, roadmap, and package metadata for the v0.13 quality pass.

## 0.12.0

- Added Table column ordering, column order ref methods, and the TableColumnSettings panel.
- Added Upload custom file rendering, retry actions, hidden file list mode, and queue ref methods.
- Added copyable docs recipes for high-frequency form, data, and date/time workflows.
- Added Playwright docs smoke tests for desktop and mobile layout checks.

## 0.11.0

- Added Table density modes, filter tag actions, and local view preset persistence.
- Added Form validation triggers, async submit state, submit errors, and related ref methods.
- Added Cascader keyboard navigation for menu movement, expansion, selection, and escape.
- Expanded docs and tests for product-style Table, Form, and Cascader workflows.

## 0.10.0

- Added Cascader lazy loading and custom option rendering for async route trees.
- Added Table view presets with saved column widths, hidden columns, sorting, and ref methods.
- Added Pinepost date and time formatting helpers for date, date range, and time range display.
- Expanded docs, roadmap, and tests for the new v0.10 workflow depth.

## 0.9.0

- Added Table column resizing, controlled/default column width maps, column visibility state, and related ref methods.
- Added async Form validation state with `isFieldValidating` and field-level validating messages.
- Added lazy TreeSelect loading and custom node rendering support.
- Expanded docs and tests for dense table, async form, and tree selection workflows.

## 0.8.0

- Added Table column groups, fixed left/right columns, and width support for dense data views.
- Added DateRangePickerPanel and TimeRangePickerPanel with shortcut range support.
- Expanded docs previews and API tables for Table and range panel workflows.
- Added v0.8 behavior tests for grouped headers, fixed columns, and range selection.

## 0.7.0

- Added advanced Table row expansion, summary rows, inline editing, and expansion ref methods.
- Added DateTimePickerPanel and TimePickerPanel for embeddable date-time workflows.
- Added drag-and-drop Upload handling with drop events and queue coverage.
- Added lazy Tree loading support with node loading tests.
- Expanded the docs previews and API tables for the newly deepened components.

## 0.6.0

- Added utility and panel components: Icon, InfiniteScroll, ColorPickerPanel, and DatePickerPanel.
- Expanded core APIs for Form, Table, Upload, Select, VirtualizedSelect, Tree, and VirtualizedTree with richer events and ref methods.
- Added method-style feedback hooks for messages, notifications, and loading states.
- Split the docs catalog further into single-component pages and added Pinepost-only color, border, and coverage guide pages.
- Added a public text verification script to keep published materials focused on Pinepost UI.
- Added v0.6 behavior tests.

## 0.5.0

- Added complex form components: Cascader, Transfer, TreeSelect, VirtualizedSelect, InputTag, InputOTP, Mention, and TimeSelect.
- Added complex data and guidance components: VirtualizedTable, VirtualizedTree, and Tour.
- Expanded the docs API tables with grouped Attributes, Options, Events, Methods, and Shortcuts sections for complex components.
- Added interactive previews for the new complex components.
- Added v0.5 behavior tests.

## 0.4.0

- Added layout helpers: Container, Header, Aside, Main, Footer, Row, Col, Scrollbar, and Splitter.
- Added form coverage: Form, FormField, InputNumber, Rate, Upload, Autocomplete, ColorPicker, DatePicker, DateTimePicker, and TimePicker.
- Added data and navigation components: Table, Calendar, Image, Carousel, Tree, PageHeader, Affix, Anchor, and Backtop.
- Added feedback components: Loading, Message, Notification, and MessageBox.
- Expanded the docs catalog with dedicated previews, usage snippets, and API tables for the new components.
- Added v0.4 component tests.

## 0.3.0

- Added form controls: Select, RadioGroup, Slider, and Spinner.
- Rebuilt the demo as a component documentation site with grouped navigation, live previews, usage examples, and API tables.
- Added tests for the new form controls and jsdom setup shims for Radix pointer and layout APIs.
- Added new Radix primitives for select, radio group, and slider interactions.

## 0.2.0

- Added the Pinepost theme system with `calm`, `play`, and `shop` presets.
- Added bilingual provider support for `en` and `zh-CN`.
- Added the core component set: Button, Card, Input, Textarea, Checkbox, Switch, Badge, Tabs, Dialog, Tooltip, and Toast.
- Added the v0.2 expansion pack: typography, layout, display, navigation, and overlay components.
- Added a bilingual demo app, Apache-2.0 license, package build, tests, and GitHub publishing foundation.
