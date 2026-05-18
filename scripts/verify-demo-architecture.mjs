import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const checks = [
  { path: join("src", "demo", "main.tsx"), maxLines: 1000 }
];

const examplesDir = join("src", "demo", "examples");

if (existsSync(examplesDir)) {
  const exampleFiles = await readdir(examplesDir);

  for (const file of exampleFiles) {
    if (file.endsWith(".tsx")) {
      checks.push({ path: join(examplesDir, file), maxLines: 1200 });
    }
  }
}

const failures = [];

for (const check of checks) {
  const text = await readFile(check.path, "utf8");
  const lineCount = text.length === 0 ? 0 : text.split(/\r\n|\n|\r/).length;

  if (lineCount > check.maxLines) {
    failures.push(`${check.path} has ${lineCount} lines, above the ${check.maxLines} line limit.`);
  }
}

if (failures.length > 0) {
  console.error("Demo architecture guard failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Demo architecture guard passed.");
