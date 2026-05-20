import { expect, test, type Page } from "@playwright/test";

async function expectNoPageOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    bodyClientWidth: document.body.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    docClientWidth: document.documentElement.clientWidth,
    docScrollWidth: document.documentElement.scrollWidth
  }));

  expect(metrics.docScrollWidth).toBeLessThanOrEqual(metrics.docClientWidth + 1);
  expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.bodyClientWidth + 1);
}

async function attachMainScreenshot(page: Page, name: string, testInfo: Parameters<Parameters<typeof test>[1]>[1]) {
  const main = page.locator(".docs-main");
  await expect(main).toBeVisible();
  const screenshot = await main.screenshot({ animations: "disabled" });
  expect(screenshot.byteLength).toBeGreaterThan(12000);
  await testInfo.attach(name, { body: screenshot, contentType: "image/png" });
}

test.describe("Pinepost docs visual baselines", () => {
  test("captures stable Theme Studio and Recipe Gallery layouts", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByRole("button", { name: /主题工作台|Theme Studio/ }).click();
    await expect(page.locator("h1")).toHaveText(/Theme Studio/);
    await expect(page.locator(".docs-theme-studio__preview")).toBeVisible();
    await attachMainScreenshot(page, "theme-studio-main", testInfo);
    await expectNoPageOverflow(page);

    await page.getByRole("button", { name: /业务模板|Recipe Gallery/ }).click();
    await expect(page.locator(".docs-recipe-card")).toHaveCount(8);
    await expect(page.getByRole("button", { name: "加载中" }).first()).toBeVisible();
    await attachMainScreenshot(page, "recipe-gallery-main", testInfo);
    await expectNoPageOverflow(page);
  });

  test("captures Table and Upload component pages without overflow", async ({ page }, testInfo) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Table 表格" }).click();
    await expect(page.locator("h1")).toHaveText("Table 表格");
    await expect(page.getByRole("region", { name: /基础表格|Basic table/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /高级 Playground|Advanced Playground/ })).toBeVisible();
    await attachMainScreenshot(page, "table-main", testInfo);
    await expectNoPageOverflow(page);

    await page.getByRole("button", { name: "Upload 上传" }).click();
    await expect(page.locator("h1")).toHaveText("Upload 上传");
    await expect(page.getByRole("region", { name: /手动上传队列|Manual upload queue/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /高级 Playground|Advanced Playground/ })).toBeVisible();
    await attachMainScreenshot(page, "upload-main", testInfo);
    await expectNoPageOverflow(page);
  });

  test("captures disabled scheduling states without overflow", async ({ page }, testInfo) => {
    await page.goto("/");

    await page.getByRole("button", { name: "DateRangePickerPanel 日期范围面板" }).click();
    await expect(page.locator("h1")).toHaveText("DateRangePickerPanel 日期范围面板");
    const blockedDateExample = page.getByRole("region", { name: /运营封锁日|Blocked dispatch day/ });
    await expect(blockedDateExample).toBeVisible();
    await expect(blockedDateExample.getByRole("button", { name: "2026-05-20" })).toBeDisabled();
    await blockedDateExample.getByRole("button", { name: "2026-05-18" }).click();
    await blockedDateExample.getByRole("button", { name: "2026-05-22" }).click();
    await expect(blockedDateExample.getByText(/2026年5月18日 至 未选择|May 18, 2026 to Open/)).toBeVisible();
    await blockedDateExample.getByRole("button", { name: /开放窗口|Open window/ }).click();
    await expect(blockedDateExample.getByText(/2026年5月12日 至 2026年5月14日|May 12, 2026 to May 14, 2026/)).toBeVisible();
    await attachMainScreenshot(page, "date-range-disabled-scheduling-main", testInfo);
    await expectNoPageOverflow(page);

    await page.getByRole("button", { name: "TimeRangePickerPanel 时间范围面板" }).click();
    await expect(page.locator("h1")).toHaveText("TimeRangePickerPanel 时间范围面板");
    const closedTimeExample = page.getByRole("region", { name: /关闭时段|Closed time window/ });
    await expect(closedTimeExample).toBeVisible();
    await expect(closedTimeExample.getByRole("button", { name: "12:00" }).first()).toBeDisabled();
    await closedTimeExample.getByRole("button", { name: /午间窗口|Lunch window/ }).click();
    await expect(closedTimeExample.getByText(/^未定$|^Open$/)).toBeVisible();
    await closedTimeExample.getByRole("button", { name: /上午窗口|Morning window/ }).click();
    await expect(closedTimeExample.getByText(/09:00 至 11:00|09:00 to 11:00/)).toBeVisible();
    await attachMainScreenshot(page, "time-range-disabled-scheduling-main", testInfo);
    await expectNoPageOverflow(page);
  });
});
