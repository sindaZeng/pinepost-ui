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
});
