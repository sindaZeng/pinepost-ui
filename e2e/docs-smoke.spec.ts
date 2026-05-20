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
  test("renders one selected component page with segmented examples and copy controls", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Table 表格" }).click();

    await expect(page.locator("h1")).toHaveText("Table 表格");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("navigation", { name: /Table 示例导航|Table examples/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /基础表格|Basic table/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /筛选与清空|Filters and reset/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /展开行与汇总|Expanded rows and summary/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /列设置与视图|Column settings and views/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /高级 Playground|Advanced Playground/ })).toBeVisible();
    await expect(page.getByText("TableColumnSettings", { exact: true })).toBeVisible();
    await expect(page.getByText("columnOrder / defaultColumnOrder")).toBeVisible();

    const firstCopy = page.getByRole("button", { name: "复制" }).first();
    await firstCopy.click();
    await expect(firstCopy).toHaveText("已复制");

    await expectNoPageOverflow(page);
  });

  test("keeps priority component pages segmented without page overflow", async ({ page }) => {
    await page.goto("/");

    for (const { name, example } of [
      { name: "Form 表单", example: /校验与提交|Validation and submit/ },
      { name: "Upload 上传", example: /手动上传队列|Manual upload queue/ },
      { name: "Select 选择器", example: /搜索与多选|Search and multiple/ },
      { name: "Cascader 级联选择", example: /多路线选择|Multiple route selection/ },
      { name: "TreeSelect 树形选择", example: /树形多选|Tree multiple selection/ },
      { name: "DateRangePickerPanel 日期范围面板", example: /排期快捷预设|Scheduling shortcuts/ },
      { name: "TimeRangePickerPanel 时间范围面板", example: /常用时间段|Common time ranges/ }
    ]) {
      await page.getByRole("button", { name }).click();
      await expect(page.locator("h1")).toHaveText(name);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("region", { name: example })).toBeVisible();
      await expect(page.getByRole("navigation", { name: new RegExp(`${name.split(" ")[0]} 示例导航|examples`) })).toBeVisible();
      await expectNoPageOverflow(page);
    }
  });

  test("shows the maturity matrix through commercial docs search", async ({ page }) => {
    await page.goto("/");

    for (const term of ["maturity", "commercial", "Table", "Upload", "handoff", "workflow"]) {
      await page.getByLabel("搜索组件").fill(term);
      await expect(page.getByRole("button", { name: /Component Maturity|组件成熟度/ })).toBeVisible();
    }

    await page.getByRole("button", { name: /Component Maturity|组件成熟度/ }).click();
    await expect(page.locator("h1")).toHaveText(/Component Maturity|组件成熟度/);
    const matrix = page.locator(".docs-maturity");
    await expect(matrix).toBeVisible();
    await expect(matrix.getByText("Table", { exact: true })).toBeVisible();
    await expect(matrix.getByText("Form", { exact: true })).toBeVisible();
    await expect(matrix.getByText("Upload", { exact: true })).toBeVisible();
    await expect(matrix.getByText("Select / Cascader / TreeSelect")).toBeVisible();
    await expect(matrix.getByText("Date and time panels", { exact: true })).toBeVisible();
    await expect(matrix.getByText(/v0.25 重点|v0.25 focus|v0.25 工作流交接重点|v0.25 workflow handoff focus/).first()).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("finds and renders the Commercial Pressure Lab", async ({ page }) => {
    await page.goto("/");

    for (const term of ["pressure", "commercial", "server table", "dynamic form", "controlled upload", "workflow handoff", "field list", "full list change"]) {
      await page.getByLabel("搜索组件").fill(term);
      await expect(page.getByRole("button", { name: /Commercial Pressure Lab|商用压力场/ })).toBeVisible();
    }

    await page.getByRole("button", { name: /Commercial Pressure Lab|商用压力场/ }).click();
    await expect(page.locator("h1")).toHaveText(/Commercial Pressure Lab|商用压力场/);
    await expect(page.getByRole("region", { name: /Server Table|服务端表格/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /Dynamic Form|动态表单/ })).toBeVisible();
    await expect(page.getByRole("region", { name: /Controlled Upload Queue|受控上传队列/ })).toBeVisible();
    await expect(page.getByText(/v0.25 focus|v0.25 重点/).first()).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("supports selection and scheduling workflow docs", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Cascader 级联选择" }).click();
    await expect(page.getByRole("region", { name: /多路线选择|Multiple route selection/ })).toBeVisible();
    await expect(page.getByText("CascaderMultipleValue").first()).toBeVisible();
    await page.getByRole("button", { name: /1 selected/ }).click();
    await expect(page.getByRole("button", { name: /苔藓桌|Moss desk/ }).first()).toBeVisible();
    await expectNoPageOverflow(page);

    await page.getByRole("button", { name: "DateRangePickerPanel 日期范围面板" }).click();
    await expect(page.getByRole("region", { name: /排期快捷预设|Scheduling shortcuts/ })).toBeVisible();
    await expect(page.getByText("createPinepostDateRangePresets").first()).toBeVisible();
    const blockedDateExample = page.getByRole("region", { name: /运营封锁日|Blocked dispatch day/ });
    await expect(blockedDateExample).toBeVisible();
    await expect(blockedDateExample.getByRole("button", { name: "2026-05-20" })).toBeDisabled();
    await blockedDateExample.getByRole("button", { name: "2026-05-18" }).click();
    await blockedDateExample.getByRole("button", { name: "2026-05-22" }).click();
    await expect(blockedDateExample.getByText(/2026年5月18日 至 未选择|May 18, 2026 to Open/)).toBeVisible();
    await blockedDateExample.getByRole("button", { name: /开放窗口|Open window/ }).click();
    await expect(blockedDateExample.getByText(/2026年5月12日 至 2026年5月14日|May 12, 2026 to May 14, 2026/)).toBeVisible();
    await expectNoPageOverflow(page);

    await page.getByRole("button", { name: "TimeRangePickerPanel 时间范围面板" }).click();
    await expect(page.getByRole("region", { name: /常用时间段|Common time ranges/ })).toBeVisible();
    await expect(page.getByText("createPinepostTimeRangePresets").first()).toBeVisible();
    const closedTimeExample = page.getByRole("region", { name: /关闭时段|Closed time window/ });
    await expect(closedTimeExample).toBeVisible();
    await expect(closedTimeExample.getByRole("button", { name: "12:00" }).first()).toBeDisabled();
    await closedTimeExample.getByRole("button", { name: /午间窗口|Lunch window/ }).click();
    await expect(closedTimeExample.getByText(/^未定$|^Open$/)).toBeVisible();
    await closedTimeExample.getByRole("button", { name: /上午窗口|Morning window/ }).click();
    await expect(closedTimeExample.getByText(/09:00 至 11:00|09:00 to 11:00/)).toBeVisible();
    await expectNoPageOverflow(page);
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
    await expect(page.getByText("Recipe Bundle 入口")).toBeVisible();

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
    await expect(page.getByText("Bundle Builder 配方包构建器")).toBeVisible();
    await expect(page.getByText("createPinepostRecipeBundle")).toBeVisible();
    const bundleBuilder = page.locator(".docs-bundle-builder");
    const bundleCopyButton = bundleBuilder.getByRole("button", { name: "复制" }).first();
    await bundleCopyButton.click();
    await expect(bundleCopyButton).toHaveText("已复制");
    await bundleBuilder.getByRole("button", { name: "填入配方包" }).click();
    await expect(bundleBuilder.getByText("配方包可用")).toBeVisible();
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
    await page.getByRole("button", { name: "商业", exact: true }).click();
    const launchRecipe = page.locator(".docs-recipe-card").filter({ hasText: "活动发布页" });
    await expect(launchRecipe.locator(".docs-recipe-card__components").getByText("DateRangePickerPanel")).toBeVisible();
    await expect(launchRecipe.locator(".docs-recipe-card__components").getByText("TimeRangePickerPanel")).toBeVisible();

    const copyButton = launchRecipe.getByRole("button", { name: "复制" }).first();
    await expect(copyButton).toBeEnabled();
    await copyButton.click();
    await expectNoPageOverflow(page);
  });

  test("finds Recipe Gallery through product workflow keywords", async ({ page }) => {
    await page.goto("/");

    for (const term of ["loading", "上传", "dashboard", "commerce", "bundle", "配方包", "recipe bundle"]) {
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

    for (const term of ["multi cascader", "多选"]) {
      await page.getByLabel("搜索组件").fill(term);
      await expect(page.getByRole("button", { name: "Cascader 级联选择" })).toBeVisible();
    }

    for (const term of ["preset", "排期"]) {
      await page.getByLabel("搜索组件").fill(term);
      await expect(page.getByRole("button", { name: "DateRangePickerPanel 日期范围面板" })).toBeVisible();
      await expect(page.getByRole("button", { name: "TimeRangePickerPanel 时间范围面板" })).toBeVisible();
    }
  });
});
