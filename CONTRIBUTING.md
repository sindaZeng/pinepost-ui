# Contributing

Pinepost UI is intentionally original. Contributions should extend the forest-post design language without copying another project's code, visual assets, examples, or naming system.

## Local Development

```sh
corepack pnpm install
corepack pnpm dev
```

## Verification

Run the full local gate before publishing changes:

```sh
corepack pnpm check
```

## Component Guidelines

- Keep React APIs familiar and typed.
- Prefer Radix primitives for complex focus, keyboard, portal, and ARIA behavior.
- Keep visual styling in `src/styles.css` unless a component needs an inline CSS variable for dynamic layout.
- Add focused tests for new public behavior.
- Keep demo examples bilingual when user-facing copy is added.
