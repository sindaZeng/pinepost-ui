import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const demoDir = "dist-demo";
const assetsDir = join(demoDir, "assets");
const indexPath = join(demoDir, "index.html");

if (!existsSync(indexPath) || !existsSync(assetsDir)) {
  throw new Error("Run `pnpm build:demo` before verifying the demo build.");
}

const indexHtml = readFileSync(indexPath, "utf8");
const cssFiles = readdirSync(assetsDir).filter((file) => file.endsWith(".css"));
const css = cssFiles.map((file) => readFileSync(join(assetsDir, file), "utf8")).join("\n");

const requiredChecks = [
  {
    name: "GitHub Pages base path",
    pass: indexHtml.includes("/pinepost-ui/assets/")
  },
  {
    name: "docs shell styles",
    pass: css.includes(".docs-app")
  },
  {
    name: "component button styles",
    pass: css.includes(".pinepost-button--primary")
  },
  {
    name: "component card styles",
    pass: css.includes(".pinepost-card")
  }
];

const failures = requiredChecks.filter((check) => !check.pass);

if (failures.length > 0) {
  throw new Error(`Demo build is missing: ${failures.map((check) => check.name).join(", ")}`);
}

console.log("Demo build contains the Pages base path and Pinepost component styles.");
