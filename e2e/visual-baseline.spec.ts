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
    await expect(page.locator(".docs-recipe__head strong", { hasText: "业务表格配置台" })).toBeVisible();
    await attachMainScreenshot(page, "table-main", testInfo);
    await expectNoPageOverflow(page);

    await page.getByRole("button", { name: "Upload 上传" }).click();
    await expect(page.locator("h1")).toHaveText("Upload 上传");
    await expect(page.locator(".docs-recipe__head strong", { hasText: "图片墙与失败重试" })).toBeVisible();
    await attachMainScreenshot(page, "upload-main", testInfo);
    await expectNoPageOverflow(page);
  });
});
