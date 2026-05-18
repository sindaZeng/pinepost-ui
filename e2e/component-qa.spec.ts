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
    await expect(page.getByText("route-manifest.txt")).toBeVisible();
    await expect(page.locator(".pinepost-upload__list").getByText("ready", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: /^(开始上传|Start upload)$/ }).click();
    await expect(page.locator(".pinepost-upload__list").getByText("success", { exact: true })).toBeVisible();
  });

  test("validates the Form docs preview against the visible recipient field", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Form 表单" }).click();

    const form = page.locator("main form").first();
    const recipient = form.getByLabel(/收件处|Recipient/);
    await recipient.fill("");
    await form.getByRole("button", { name: /提交路线|Submit route/ }).click();

    await expect(form.getByRole("alert").filter({ hasText: /请填写收件处|Recipient is required/ })).toBeVisible();

    await recipient.fill("Moss desk");
    await form.getByRole("button", { name: /提交路线|Submit route/ }).click();
    await expect(form.getByRole("alert").filter({ hasText: /请填写收件处|Recipient is required/ })).toHaveCount(0);
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
