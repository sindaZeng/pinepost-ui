import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:5173",
    channel: process.env.CI ? undefined : "chrome",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "corepack pnpm dev",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: "http://localhost:5173"
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { height: 900, width: 1440 } }
    },
    {
      name: "mobile",
      use: { isMobile: true, viewport: { height: 844, width: 390 } }
    }
  ]
});
