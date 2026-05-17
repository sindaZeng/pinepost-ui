# Pinepost UI

[![CI](https://github.com/sindaZeng/pinepost-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/sindaZeng/pinepost-ui/actions/workflows/ci.yml)
[![Demo](https://github.com/sindaZeng/pinepost-ui/actions/workflows/pages.yml/badge.svg)](https://github.com/sindaZeng/pinepost-ui/actions/workflows/pages.yml)

Pinepost UI is a forest-post themed React component library for warm,
commercial-friendly product interfaces. It ships a small set of practical
components, a token-driven theme layer, and three ready-to-use mood presets.

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
Badge, Tabs, Dialog, Tooltip, and Toast.

The v0.2 expansion adds Link, Text, Space, Divider, Alert, Tag, Avatar,
Empty, Progress, Skeleton, Descriptions, Statistic, Result, Timeline,
Watermark, Breadcrumb, Menu, Steps, Pagination, Segmented, Dropdown, Popover,
Collapse, Popconfirm, and Drawer.

## Originality

Pinepost UI uses its own names, component styling, examples, text, and visual
language. Any optional visual assets should be created for this project or
come from sources with clear commercial-use terms.

## Development

```sh
corepack pnpm install
corepack pnpm dev
corepack pnpm test
corepack pnpm build
corepack pnpm build:demo
```
