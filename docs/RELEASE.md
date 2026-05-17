# Release Notes

This project is prepared for three publish surfaces:

- GitHub source repository: `main`
- GitHub Pages demo: built from `dist-demo`
- npm package: built from `dist`

## Local Release Gate

```sh
corepack pnpm check
```

Draft release copy from the current package version and changelog:

```sh
corepack pnpm release:draft
```

## GitHub Pages

The `Deploy Demo` workflow builds the Vite demo app and publishes it through GitHub Pages. The repository should use GitHub Actions as its Pages source.

Demo URL:

```text
https://sindazeng.github.io/pinepost-ui/
```

## npm

The `Publish Package` workflow publishes on GitHub Release publication or manual dispatch. It requires an `NPM_TOKEN` repository secret.

Before publishing:

- Confirm the package name is available or choose a scoped name.
- Confirm `package.json` version matches the release tag.
- Run `corepack pnpm pack --dry-run` and inspect the tarball contents.
