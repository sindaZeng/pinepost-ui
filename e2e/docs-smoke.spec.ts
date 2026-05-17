import { expect, test } from "@playwright/test";

async function expectNoPageOverflow(page: import("@playwright/test").Page) {
  const metrics = await page.evaluate(() => ({
    bodyClientWidth: document.body.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    docClientWidth: document.documentElement.clientWidth,
    docScrollWidth: document.documentElement.scrollWidth
  }));

  expect(metrics.docScrollWidth).toBeLessThanOrEqual(metrics.docClientWidth + 1);
  expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.bodyClientWidth + 1);
}

test.describe("Pinepost docs smoke", () => {
  test("renders one selected component page with recipes and copy controls", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Table 表格" }).click();

    await expect(page.locator("h1")).toHaveText("Table 表格");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByText("业务表格配置台").first()).toBeVisible();
    await expect(page.getByText("TableColumnSettings", { exact: true })).toBeVisible();
    await expect(page.getByText("columnOrder / defaultColumnOrder")).toBeVisible();

    const firstCopy = page.getByRole("button", { name: "复制" }).first();
    await firstCopy.click();
    await expect(firstCopy).toHaveText("已复制");

    await expectNoPageOverflow(page);
  });

  test("keeps priority recipe pages navigable without page overflow", async ({ page }) => {
    await page.goto("/");

    for (const name of [
      "Form 表单",
      "Upload 上传",
      "Select 选择器",
      "Cascader 级联选择",
      "TreeSelect 树形选择",
      "DateRangePickerPanel 日期范围面板",
      "TimeRangePickerPanel 时间范围面板"
    ]) {
      await page.getByRole("button", { name }).click();
      await expect(page.locator("h1")).toHaveText(name);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByText("业务配方")).toBeVisible();
      await expectNoPageOverflow(page);
    }
  });

  test("keeps Theme Studio editable, copyable, and visually capturable", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByRole("button", { name: /主题工作台|Theme Studio/ }).click();

    await expect(page.locator("h1")).toHaveText(/Theme Studio/);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.getByLabel("--pinepost-leaf").fill("#267755");
    await expect(page.locator(".docs-code code")).toContainText("--pinepost-leaf: #267755;");

    const copyButton = page.getByRole("button", { name: "复制" }).first();
    await copyButton.click();
    await expect(copyButton).toHaveText("已复制");

    const preview = page.locator(".docs-theme-studio__preview");
    await expect(preview).toBeVisible();
    const box = await preview.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(280);
    expect(box?.height ?? 0).toBeGreaterThan(320);

    const screenshot = await preview.screenshot({ animations: "disabled" });
    expect(screenshot.byteLength).toBeGreaterThan(8000);
    await testInfo.attach("theme-studio-preview", { body: screenshot, contentType: "image/png" });

    await expectNoPageOverflow(page);
  });
});
