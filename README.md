# Pinepost UI

[![CI](https://github.com/sindaZeng/pinepost-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/sindaZeng/pinepost-ui/actions/workflows/ci.yml)
[![Demo](https://github.com/sindaZeng/pinepost-ui/actions/workflows/pages.yml/badge.svg)](https://github.com/sindaZeng/pinepost-ui/actions/workflows/pages.yml)

Pinepost UI is a forest-post themed React component library for warm,
commercial-friendly product interfaces. It ships practical components, a
token-driven theme layer, bilingual docs, and three ready-to-use mood presets.

Demo: https://sindazeng.github.io/pinepost-ui/

## Goals

- Offer a playful but usable UI language for tools, learning apps, and shop
  moments.
- Keep component APIs familiar to React developers.
- Build on accessible interaction primitives while keeping Pinepost visual
  design original.
- Publish under Apache-2.0.

## Themes

- `calm`: quiet paper, moss, and ink tones for focused tools.
- `play`: brighter leaf, berry, and sky accents for learning and light games.
- `shop`: warmer parcel, stamp, and label colors for storefront moments.

## Locales

PinepostProvider supports `en` and `zh-CN`. The provider sets `lang`,
`data-pinepost-locale`, and a React context value that application code can
read with `usePinepostLocale`.

## Install

```sh
npm install pinepost-ui
```

## Usage

```tsx
import { Button, PinepostProvider } from "pinepost-ui";
import "pinepost-ui/styles.css";

export function App() {
  return (
    <PinepostProvider theme="calm" locale="zh-CN">
      <Button variant="stamp">Send note</Button>
    </PinepostProvider>
  );
}
```

## Components

The core set includes Button, Card, Input, Textarea, Checkbox, Switch,
Select, RadioGroup, Slider, Spinner, Badge, Tabs, Dialog, Tooltip, and Toast.

The v0.2 expansion adds Link, Text, Space, Divider, Alert, Tag, Avatar,
Empty, Progress, Skeleton, Descriptions, Statistic, Result, Timeline,
Watermark, Breadcrumb, Menu, Steps, Pagination, Segmented, Dropdown, Popover,
Collapse, Popconfirm, and Drawer.

The v0.4 expansion adds layout, form, data, navigation, and feedback coverage:
Container, Header, Aside, Main, Footer, Row, Col, Scrollbar, Splitter, Form,
FormField, InputNumber, Rate, Upload, Autocomplete, ColorPicker, DatePicker,
DateTimePicker, TimePicker, Table, Calendar, Image, Carousel, Tree, PageHeader,
Affix, Anchor, Backtop, Loading, Message, Notification, and MessageBox.

The v0.5 expansion adds larger interaction surfaces: Cascader, Transfer,
TreeSelect, VirtualizedSelect, InputTag, InputOTP, Mention, TimeSelect,
VirtualizedTable, VirtualizedTree, and Tour.

The v0.6 expansion adds utility and panel coverage with Icon, InfiniteScroll,
ColorPickerPanel, and DatePickerPanel, plus deeper Form, Table, Upload, Select,
Tree, virtualized data, and feedback service APIs.

The v0.7 expansion deepens high-frequency interaction surfaces with Table row
expansion, summaries, inline editing, drag Upload, lazy Tree loading,
TimePickerPanel, and DateTimePickerPanel.

The v0.8 expansion adds dense-data refinements with Table column groups, fixed
columns, DateRangePickerPanel, and TimeRangePickerPanel.

The v0.9 expansion adds Table column resize and visibility controls, async Form
validation state, and lazy TreeSelect loading for larger product workflows.

The v0.10 expansion adds Cascader lazy loading, Table view presets, and
Pinepost date/time formatting helpers.

The v0.11 expansion adds Table density and persisted view workflows, Form
validation triggers and submit state, and Cascader keyboard navigation.

The v0.12 expansion adds TableColumnSettings, Table column ordering, richer
Upload file actions, copyable product recipes, and browser smoke checks for the
documentation catalog.

The v0.13 expansion adds editable theme token utilities, a Theme Studio guide
for previewing and copying CSS variables, and stronger docs smoke coverage for
the theme editing workflow.

The v0.14 expansion adds theme JSON import/export helpers, class name generation,
downloadable Theme Studio output, a Recipe Gallery for real product screens, and
faster docs navigation with search.

The v0.15 expansion hardens Recipe Gallery with eight templates, category
filters, stateful previews, and visual baseline checks for key documentation
pages.

The v0.16 expansion adds portable theme collections, serializable table view
preset helpers, Theme Studio collection workflows, and release notes draft
automation.

The v0.17 expansion adds Cascader multiple path selection and scheduling preset
helpers for date, date range, and time range workflows.

The v0.18 expansion adds portable Recipe Bundle helpers that combine theme
collections, table view presets, scheduling keys, and recipe references.

The v0.19 expansion hardens the docs catalog with isolated API workbenches for
commercial workflows, including realistic Form submit states, Table filtering,
Upload lifecycle actions, selection flows, trees, and scheduling panels.

The v0.20 expansion rebuilds the demo catalog around segmented examples,
example navigation, copyable code, API tables, and advanced playgrounds. Table,
Form, Upload, Select, Cascader, TreeSelect, Tree, and date/time panels now show
separate product scenarios instead of one crowded combined demo.

The demo site is also the component catalog: each documented component includes
a live preview, segmented usage examples, an advanced playground where useful,
copyable recipes, and an API table.

## Originality

Pinepost UI uses its own names, component styling, examples, text, and visual
language. Any optional visual assets should be created for this project or
come from sources with clear commercial-use terms.

## Development

```sh
corepack pnpm install
corepack pnpm dev
corepack pnpm test
corepack pnpm test:e2e
corepack pnpm build
corepack pnpm build:demo
```
