# Pinepost UI v0.16 Preset Workflows Design

## Goal

Pinepost UI v0.16 makes existing docs workflows feel more reusable in real products by adding portable theme collections, serializable table preset helpers, and a local release notes draft script.

## Scope

- Add public TypeScript helpers for theme collection import/export.
- Add public TypeScript helpers for table view preset import/export.
- Expand Theme Studio with a small collection manager for save, duplicate, remove, import, and export flows.
- Expand Table docs with a saved view preset recipe that combines density, visibility, ordering, and sort state.
- Add a release notes draft script that reads the current package version and changelog section.
- Update metadata and e2e coverage.

## Public API

Theme collection helpers live in `src/theme.ts` and are exported from `src/index.ts`.

- `PinepostThemeCollectionItem`
- `PinepostThemeCollectionExport`
- `PinepostThemeCollectionParseResult`
- `createPinepostThemeCollectionExport(input)`
- `parsePinepostThemeCollectionExport(json, fallbackTheme?)`
- `stringifyPinepostThemeCollectionExport(value)`

Table preset helpers live beside `Table` in `src/components/data-extras.tsx`.

- `TableViewPresetExportItem`
- `TableViewPresetExport`
- `TableViewPresetParseResult`
- `createTableViewPresetExport(input)`
- `parseTableViewPresetExport(json)`
- `stringifyTableViewPresetExport(value)`

The table helpers serialize only stable data: key, string label, column order, hidden columns, column widths, and sort state. Render functions and React nodes stay outside the portable format.

## Docs UX

Theme Studio keeps the current token editor and adds a compact collection area. Users can save the current theme, switch saved themes, duplicate the active theme, remove non-final themes, download a collection JSON, and import a collection JSON.

Table docs gain a recipe showing a persisted operations view. The recipe explains how a product page can wire `TableColumnSettings`, table state, and preset export together without forcing Pinepost to own app persistence.

## Release Notes Script

`scripts/draft-release-notes.mjs` prints a Markdown release draft for the current `package.json` version. It extracts the matching changelog section and includes local validation commands. It does not create GitHub releases or publish npm packages.

## Testing

- Unit tests cover collection creation/parsing and table preset creation/parsing.
- E2E tests cover Theme Studio collection controls, Table saved preset copy flow, and docs search for preset workflow terms.
- Existing `check`, public text scan, build, demo verification, e2e, dry-run pack, and diff whitespace checks remain the release gate.

## Non-Goals

- No npm publication in v0.16.
- No new runtime React component.
- No breaking changes to existing component props or refs.
