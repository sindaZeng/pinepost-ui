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
  test("renders one selected component page with v0.12 recipes and copy controls", async ({ page }) => {
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
});
