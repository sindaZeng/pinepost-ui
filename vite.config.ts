import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => ({
  publicDir: command === "serve" ? "public" : false,
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      exclude: ["src/demo", "src/test", "**/*.test.ts", "**/*.test.tsx"],
      insertTypesEntry: true
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PinepostUI",
      formats: ["es", "cjs"],
      fileName: (format) => `pinepost-ui.${format === "es" ? "js" : "cjs"}`,
      cssFileName: "pinepost"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-accordion",
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-popover",
        "@radix-ui/react-switch",
        "@radix-ui/react-tabs",
        "@radix-ui/react-toast",
        "@radix-ui/react-tooltip"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
}));
