import { readFile } from "node:fs/promises";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function changelogSection(changelog, version) {
  const heading = `## ${version}`;
  const start = changelog.indexOf(heading);
  if (start === -1) {
    throw new Error(`Missing changelog section for ${version}`);
  }

  const next = changelog.indexOf("\n## ", start + heading.length);
  return changelog.slice(start + heading.length, next === -1 ? undefined : next).trim();
}

const packageJson = await readJson("package.json");
const changelog = await readFile("CHANGELOG.md", "utf8");
const changes = changelogSection(changelog, packageJson.version);

const draft = [
  `# Pinepost UI v${packageJson.version}`,
  "",
  "## Changes",
  "",
  changes,
  "",
  "## Validation",
  "",
  "- `corepack pnpm check`",
  "- `git diff --check`",
  "- GitHub Pages demo verification",
  "",
  "## Publish Notes",
  "",
  "This draft prepares release copy only. Publishing is handled by the release workflow when a release is created."
].join("\n");

console.log(draft);
