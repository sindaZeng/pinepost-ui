import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const encodedPublicBlocklist = [
  "Z3Vva2FpZ2Rn",
  "YW5pbWFsLWlzbGFuZA==",
  "5Yqo54mp5qOu5Y+L5Lya",
  "5qOu5Y+L",
  "QW5pbWFsIENyb3NzaW5n",
  "ZWxlbWVudC5lbGVtZQ==",
  "RWxlbWVudCBQbHVz"
];

const blockedTerms = encodedPublicBlocklist.map((item) => Buffer.from(item, "base64").toString("utf8"));
const ignoredDirs = new Set([
  ".git",
  ".idea",
  ".playwright-cli",
  "dist",
  "dist-demo",
  "node_modules",
  "output",
  "pages-job-logs"
]);
const scannedExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".yml",
  ".yaml"
]);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...await collectFiles(join(dir, entry.name)));
    } else if (scannedExtensions.has(extname(entry.name))) {
      files.push(join(dir, entry.name));
    }
  }

  return files;
}

const files = await collectFiles(process.cwd());
const hits = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const term of blockedTerms) {
    if (text.includes(term)) hits.push({ file, term });
  }
}

if (hits.length > 0) {
  console.error("Public text guard found blocked references:");
  for (const hit of hits) console.error(`- ${hit.file}: ${hit.term}`);
  process.exit(1);
}

console.log(`Public text guard passed (${files.length} files scanned).`);
