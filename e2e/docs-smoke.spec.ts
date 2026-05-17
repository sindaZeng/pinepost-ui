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
    await expect(page.getByText("视图预设导出").first()).toBeVisible();
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
    await expect(page.getByText("--pinepost-leaf: #267755;", { exact: false })).toBeVisible();

    const copyButton = page.getByRole("button", { name: "复制", exact: true }).first();
    await copyButton.click();
    await expect(page.getByRole("button", { name: "已复制" }).first()).toBeVisible();
    await expect(page.getByText('"version": 1').first()).toBeVisible();
    await page.getByRole("button", { name: "填入当前主题" }).click();
    await page.getByRole("button", { name: "导入 JSON" }).click();
    await expect(page.getByText("主题已导入。")).toBeVisible();
    await page.getByRole("button", { name: "保存到集合" }).click();
    await expect(page.getByText("已保存到主题集合。")).toBeVisible();
    await page.getByRole("button", { name: "复制主题" }).click();
    await expect(page.getByRole("button", { name: /Pinepost workspace 副本/ })).toBeVisible();
    await page.getByRole("button", { name: "填入主题集合" }).click();
    await page.getByRole("button", { name: "导入集合" }).click();
    await expect(page.getByText("主题集合已导入。")).toBeVisible();

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

  test("supports recipe gallery navigation and docs search", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("搜索组件").fill("业务");
    await expect(page.getByRole("button", { name: /业务模板|Recipe Gallery/ })).toBeVisible();
    await page.getByRole("button", { name: /业务模板|Recipe Gallery/ }).click();

    await expect(page.locator("h1")).toHaveText(/业务模板|Recipe Gallery/);
    await expect(page.getByRole("heading", { name: "后台表格台" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "素材上传墙" })).toBeVisible();
    await expect(page.locator(".docs-recipe-card__components strong", { hasText: "组件清单" })).toHaveCount(8);

    await page.getByRole("button", { name: "上传", exact: true }).click();
    await expect(page.locator(".docs-recipe-card")).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "素材上传墙" })).toBeVisible();

    await page.getByRole("button", { name: "全部" }).click();
    const tableRecipe = page.locator(".docs-recipe-card").filter({ hasText: "后台表格台" });
    await tableRecipe.getByRole("button", { name: "加载中" }).click();
    await expect(tableRecipe.locator(".docs-preview-surface").getByText("正在刷新路线数据")).toBeVisible();
    await page.locator(".docs-recipe-card").filter({ hasText: "审批表单页" }).getByRole("button", { name: "禁用" }).click();
    await expect(page.getByRole("button", { name: "暂不可提交" })).toBeDisabled();
    const campaignRecipe = page.locator(".docs-recipe-card").filter({ hasText: "活动商品卡" });
    await campaignRecipe.getByRole("button", { name: "售罄" }).click();
    await expect(campaignRecipe.locator(".docs-preview-surface").getByText("本轮已经售罄")).toBeVisible();

    const copyButton = page.getByRole("button", { name: "复制" }).first();
    await copyButton.click();
    await expect(copyButton).toHaveText("已复制");
    await expectNoPageOverflow(page);
  });

  test("finds Recipe Gallery through product workflow keywords", async ({ page }) => {
    await page.goto("/");

    for (const term of ["loading", "上传", "dashboard", "commerce"]) {
      await page.getByLabel("搜索组件").fill(term);
      await expect(page.getByRole("button", { name: /业务模板|Recipe Gallery/ })).toBeVisible();
    }
  });

  test("finds preset workflow pages through docs search", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("搜索组件").fill("theme collection");
    await expect(page.getByRole("button", { name: /主题工作台|Theme Studio/ })).toBeVisible();

    for (const term of ["table preset", "视图预设", "release notes"]) {
      await page.getByLabel("搜索组件").fill(term);
      await expect(page.getByRole("button", { name: "Table 表格" })).toBeVisible();
    }
  });
});
