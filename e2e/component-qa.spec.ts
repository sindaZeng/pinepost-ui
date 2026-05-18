import { expect, test } from "@playwright/test";

test.describe("Pinepost component QA hardening", () => {
  test("renders every sidebar component page without console errors or overflow", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.goto("/");
    const navButtons = page.locator(".docs-nav button");
    const labels = (await navButtons.allTextContents()).map((label) => label.trim()).filter(Boolean);

    for (const label of labels) {
      await page.locator(".docs-nav button").filter({ hasText: label }).first().click();

      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main h1")).toBeVisible();

      const overflow = await page.evaluate(() => {
        const documentElement = document.documentElement;
        return documentElement.scrollWidth - documentElement.clientWidth;
      });
      expect(overflow, `${label} should not create horizontal page overflow`).toBeLessThanOrEqual(1);
    }

    expect(consoleErrors).toEqual([]);
  });

  test("keeps mobile selected content visible after nav selection", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile layout guard");

    await page.goto("/");
    await page.getByRole("button", { name: "Table 表格" }).click();

    const headingBox = await page.locator("main h1").first().boundingBox();
    expect(headingBox?.y ?? Number.POSITIVE_INFINITY).toBeLessThan(360);
  });

  test("lets the Upload docs preview queue and manually submit a file", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Upload 上传" }).click();

    await page.locator("main input[type=file]").first().setInputFiles({
      name: "route-manifest.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("route qa")
    });
    await expect(page.locator(".pinepost-upload__list strong", { hasText: "route-manifest.txt" })).toBeVisible();
    await expect(page.locator(".pinepost-upload__list").getByText("ready", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: /^(开始上传|Start upload)$/ }).click();
    await expect(page.locator(".pinepost-upload__list").getByText("success", { exact: true })).toBeVisible();
  });

  test("validates the Form segmented submit example against visible fields", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Form 表单" }).click();

    const example = page.getByRole("region", { name: /校验与提交|Validation and submit/ });
    const form = example.locator("form").first();
    const route = form.getByLabel(/路线|Route/);
    await route.fill("");
    await form.getByRole("button", { name: /提交保存|Submit save/ }).click();

    await expect(form.getByRole("alert").filter({ hasText: /请填写路线|Route is required/ })).toBeVisible();

    await route.fill("A7");
    await form.getByLabel(/负责人|Owner/).fill("Cedar");
    await form.getByRole("button", { name: /提交保存|Submit save/ }).click();
    await expect(form.getByRole("alert").filter({ hasText: /请填写路线|Route is required/ })).toHaveCount(0);
  });

  test("keeps Form submit states realistic and isolated", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Form 表单" }).click();

    const example = page.getByRole("region", { name: /校验与提交|Validation and submit/ });
    const route = example.getByLabel(/路线|Route/);
    const operator = example.getByLabel(/负责人|Owner/);

    await route.fill("");
    await operator.fill("");
    await example.getByRole("button", { name: /提交保存|Submit save/ }).click();

    await expect(example.getByRole("alert").filter({ hasText: /请填写路线|Route is required/ })).toBeVisible();
    await expect(example.getByText(/保存成功|Saved successfully/)).toHaveCount(0);
    await expect(page.getByText(/路线已确认|Route confirmed/)).toHaveCount(0);
    await expect(route).toBeFocused();

    await route.fill("A7");
    await operator.fill("Cedar");
    await example.getByRole("button", { name: /模拟服务端失败|Simulate server error/ }).click();
    await example.getByRole("button", { name: /提交保存|Submit save/ }).click();

    await expect(example.getByRole("alert").filter({ hasText: /服务端拒绝|Server rejected/ })).toBeVisible();
    await expect(example.getByText(/保存成功|Saved successfully/)).toHaveCount(0);

    await example.getByRole("button", { name: /模拟成功|Simulate success/ }).click();
    await example.getByRole("button", { name: /提交保存|Submit save/ }).click();
    await expect(example.getByText(/保存成功|Saved successfully/).first()).toBeVisible();
  });

  test("keeps Table filter clearing inside its own segmented example", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Table 表格" }).click();

    const filterExample = page.getByRole("region", { name: /筛选与清空|Filters and reset/ });
    const playground = page.getByRole("region", { name: /高级 Playground|Advanced Playground/ });
    await expect(filterExample.getByText(/状态：就绪|Status: Ready/).first()).toBeVisible();

    await filterExample.getByRole("button", { name: /清空筛选|Clear filters/ }).click();

    await expect(filterExample.getByText(/筛选已清空|Filters cleared/)).toBeVisible();
    await expect(filterExample.getByText(/状态：就绪|Status: Ready/)).toHaveCount(0);
    await expect(page.getByText(/路线已确认|Route confirmed/)).toHaveCount(0);

    await playground.getByRole("button", { name: /切换复核视图|Switch review view/ }).click();
    await expect(playground.getByText(/视图已切换|View changed/)).toBeVisible();
  });

  test("shows segmented example entry points for commercial workflow components", async ({ page }) => {
    await page.goto("/");

    for (const item of [
      { nav: "Upload 上传", region: /手动上传队列|Manual upload queue/ },
      { nav: "Select 选择器", region: /搜索与多选|Search and multiple/ },
      { nav: "Cascader 级联选择", region: /多路线选择|Multiple route selection/ },
      { nav: "TreeSelect 树形选择", region: /树形多选|Tree multiple selection/ },
      { nav: "Tree 树形控件", region: /勾选与展开|Check and expand/ },
      { nav: "DateRangePickerPanel 日期范围面板", region: /排期快捷预设|Scheduling shortcuts/ },
      { nav: "TimeRangePickerPanel 时间范围面板", region: /常用时间段|Common time ranges/ }
    ]) {
      await page.getByRole("button", { name: item.nav }).click();
      const example = page.getByRole("region", { name: item.region });
      await expect(example).toBeVisible();
      await expect(page.getByRole("navigation", { name: /示例导航|examples/ })).toBeVisible();
      await expect(page.getByRole("region", { name: /高级 Playground|Advanced Playground/ })).toBeVisible();
    }
  });

  test("keeps picker panel docs previews controlled by visible user choices", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "ColorPickerPanel 颜色面板" }).click();
    const colorPreview = page.locator(".docs-preview-surface").first();
    await colorPreview.getByRole("button", { name: "#c9624b" }).click();
    await expect(colorPreview.getByRole("button", { name: "#c9624b" })).toHaveAttribute("data-active", "true");

    await page.getByRole("button", { name: "DatePickerPanel 日期面板" }).click();
    const dateGrid = page.locator(".docs-preview-surface .pinepost-date-panel__grid").first();
    await dateGrid.getByRole("button", { name: "18", exact: true }).click();
    await expect(dateGrid.getByRole("button", { name: "18", exact: true })).toHaveAttribute("aria-pressed", "true");
  });

  test("opens and dismisses overlay and feedback docs previews", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Dialog 弹窗" }).click();
    await page.getByRole("button", { name: "打开调度便签" }).click();
    await expect(page.getByRole("dialog", { name: "调度便签" })).toBeVisible();
    await page.getByRole("button", { name: "取消" }).click();
    await expect(page.getByRole("dialog", { name: "调度便签" })).toHaveCount(0);

    await page.getByRole("button", { name: "Dropdown 下拉菜单" }).click();
    await page.getByRole("button", { name: "路线菜单" }).click();
    await expect(page.getByText("打印标签")).toBeVisible();
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Popover 弹出框" }).click();
    await page.getByRole("button", { name: "查看提示" }).click();
    await expect(page.getByText("黄昏前处理。")).toBeVisible();
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Tooltip 文字提示" }).click();
    await page.getByRole("button", { name: "悬停" }).hover();
    await expect(page.getByText("小型说明")).toBeVisible();

    await page.getByRole("button", { name: "Popconfirm 气泡确认" }).click();
    await page.getByRole("button", { name: "归档" }).click();
    await expect(page.getByRole("alertdialog", { name: "确认归档？" })).toBeVisible();
    await page.getByRole("button", { name: "取消" }).click();
    await expect(page.getByRole("alertdialog", { name: "确认归档？" })).toHaveCount(0);

    await page.getByRole("button", { name: "Drawer 抽屉" }).click();
    await page.getByRole("button", { name: "打开抽屉" }).click();
    await expect(page.getByRole("dialog", { name: "路线详情" })).toBeVisible();
    await page.getByRole("button", { name: "关闭" }).click();
    await expect(page.getByRole("dialog", { name: "路线详情" })).toHaveCount(0);

    await page.getByRole("button", { name: "Toast 通知" }).click();
    await page.getByRole("button", { name: "发送通知" }).click();
    await expect(page.getByText("路线已确认")).toBeVisible();

    await page.getByRole("button", { name: "Collapse 折叠面板" }).click();
    await page.getByRole("button", { name: "路线详情" }).click();
    await expect(page.getByText("黄昏前还有三站。")).toBeVisible();

    await page.getByRole("button", { name: "Carousel 走马灯" }).click();
    const carouselPreview = page.locator(".docs-preview-surface").first();
    await expect(carouselPreview.getByText("晨间路线准备完成")).toBeVisible();
    await carouselPreview.getByRole("button", { name: "Next slide" }).click();
    await expect(carouselPreview.getByText("黄昏路线等待复核")).toBeVisible();
  });
});
