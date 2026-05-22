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

    const example = page.getByRole("region", { name: /手动上传队列|Manual upload queue/ });
    const uploadList = example.locator(".pinepost-upload__list");
    await example.locator("input[type=file]").first().setInputFiles([
      {
        name: "route-manifest.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("route qa")
      },
      {
        name: "route-window.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("window qa")
      }
    ]);
    await expect(uploadList.locator("strong", { hasText: "route-manifest.txt" })).toBeVisible();
    await expect(uploadList.locator("strong", { hasText: "route-window.txt" })).toBeVisible();
    await expect(uploadList.getByText("ready", { exact: true })).toHaveCount(2);

    await example.getByRole("button", { name: /^(开始上传|Start upload)$/ }).click();
    await expect(uploadList.getByText("success", { exact: true })).toHaveCount(2);
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

    const selectionExample = page.getByRole("region", { name: /排序与选择|Sorting and selection/ });
    await selectionExample.getByRole("checkbox", { name: "Select all rows" }).check();
    const selectedRows = selectionExample.locator("tbody input[type=checkbox]");
    await expect(selectedRows).toHaveCount(3);
    for (let index = 0; index < 3; index += 1) {
      await expect(selectedRows.nth(index)).toBeChecked();
    }

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

  test("supports Commercial Pressure Lab interactions", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Commercial Pressure Lab|商用压力场/ }).click();

    const serverTable = page.getByRole("region", { name: /Server Table|服务端表格/ });
    await serverTable.getByRole("checkbox", { name: "Select all rows" }).check();
    await expect(serverTable.getByText(/2 selected keys|已选择 2 个键/)).toBeVisible();
    await serverTable.getByRole("button", { name: /Page 2|第 2 页/ }).click();
    await expect(serverTable.getByText(/Loading page 2 from server|正在加载第 2 页服务端数据/)).toBeVisible();
    await serverTable.getByRole("button", { name: /Run bulk action|执行批量操作/ }).click();
    await expect(serverTable.getByText(/Bulk action waits for server rows|批量操作等待服务端数据/)).toBeVisible();
    await expect(serverTable.getByText(/Page 2 loaded|第 2 页已加载/)).toBeVisible();
    await serverTable.getByRole("checkbox", { name: "Select all rows" }).check();
    await expect(serverTable.getByText(/4 selected keys|已选择 4 个键/)).toBeVisible();
    await serverTable.getByRole("button", { name: /Simulate page error|模拟分页错误/ }).click();
    await expect(serverTable.getByText(/Server page failed. 4 selected keys kept|服务端分页失败，保留 4 个选择键/)).toBeVisible();
    await serverTable.getByRole("button", { name: /Retry page 2|重试第 2 页/ }).click();
    await expect(serverTable.getByText(/Page 2 loaded|第 2 页已加载/)).toBeVisible();
    await expect(serverTable.getByText(/4 selected keys|已选择 4 个键/)).toBeVisible();
    await serverTable.getByRole("button", { name: /Run bulk action|执行批量操作/ }).click();
    await expect(serverTable.getByText(/Bulk action queued for 4 keys|已为 4 个键创建批量操作/)).toBeVisible();

    const dynamicForm = page.getByRole("region", { name: /Dynamic Form|动态表单/ });
    await dynamicForm.getByRole("button", { name: /Add stop|添加站点/ }).click();
    await expect(dynamicForm.getByText(/2 dynamic stops|2 个动态站点/)).toBeVisible();
    await dynamicForm.getByLabel(/Stop 2 desk|站点 2 桌台/).fill("Cedar desk");
    await dynamicForm.getByLabel(/Stop 2 window|站点 2 窗口/).fill("");
    await dynamicForm.getByRole("button", { name: /Submit dynamic form|提交动态表单/ }).click();
    await expect(dynamicForm.getByRole("alert").filter({ hasText: /Window is required|请填写窗口/ })).toBeVisible();
    await expect(dynamicForm.getByLabel(/Stop 2 window|站点 2 窗口/)).toBeFocused();
    await dynamicForm.getByRole("button", { name: /Remove stop 2|移除站点 2/ }).click();
    await expect(dynamicForm.getByText(/1 dynamic stop|1 个动态站点/)).toBeVisible();
    await expect(dynamicForm.getByRole("alert").filter({ hasText: /Window is required|请填写窗口/ })).toHaveCount(0);
    await dynamicForm.getByRole("button", { name: /Add stop|添加站点/ }).click();
    await dynamicForm.getByRole("button", { name: /Simulate server errors|模拟服务端错误/ }).click();
    await expect(dynamicForm.getByRole("alert").filter({ hasText: /already assigned|已被分配/ })).toBeVisible();
    await dynamicForm.getByRole("button", { name: /Clear server errors|清除服务端错误/ }).click();
    await expect(dynamicForm.getByRole("alert").filter({ hasText: /already assigned|已被分配/ })).toHaveCount(0);

    const uploadQueue = page.getByRole("region", { name: /Controlled Upload Queue|受控上传队列/ });
    await uploadQueue.locator("input[type=file]").setInputFiles([
      { name: "route-ready.csv", mimeType: "text/csv", buffer: Buffer.from("ready") },
      { name: "route-retry.csv", mimeType: "text/csv", buffer: Buffer.from("retry") }
    ]);
    await expect(uploadQueue.getByText(/Controlled queue: 2 files|受控队列：2 个文件/)).toBeVisible();
    await expect(uploadQueue.getByText(/Full list changes: 1|完整列表变更：1/)).toBeVisible();
    await uploadQueue.getByRole("button", { name: /Start queue|开始队列/ }).click();
    await expect(uploadQueue.getByText("success", { exact: true })).toHaveCount(1);
    await expect(uploadQueue.getByText("error", { exact: true })).toHaveCount(1);
    await expect(uploadQueue.getByText(/Last progress: route-retry.csv 64%|最近进度：route-retry.csv 64%/)).toBeVisible();
    await expect(uploadQueue.getByText(/route-ready.csv: success/)).toBeVisible();
    await expect(uploadQueue.getByText(/route-retry.csv: error/)).toBeVisible();
    await uploadQueue.getByRole("button", { name: /Retry route-retry.csv|重试 route-retry.csv/ }).click();
    await expect(uploadQueue.getByText("success", { exact: true })).toHaveCount(2);
    await expect(uploadQueue.getByText(/route-retry.csv: success/)).toBeVisible();
    await uploadQueue.getByRole("button", { name: /Clear queue|清空队列/ }).click();
    await expect(uploadQueue.getByText(/Controlled queue: 0 files|受控队列：0 个文件/)).toBeVisible();
    await expect(uploadQueue.getByText(/Queue cleared|队列已清空/)).toBeVisible();
  });

  test("keeps Commercial Pressure Lab server request state current during rapid interactions", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Commercial Pressure Lab|商用压力场/ }).click();

    const serverTable = page.getByRole("region", { name: /Server Table|服务端表格/ });
    await serverTable.getByRole("checkbox", { name: "Select all rows" }).check();
    await serverTable.getByRole("button", { name: /Simulate page error|模拟分页错误/ }).click();
    await serverTable.getByRole("button", { name: /Clear selection|清空选择/ }).click();
    await expect(serverTable.getByText(/0 selected keys|已选择 0 个键/)).toBeVisible();
    await expect(serverTable.getByText(/Server page failed. 0 selected keys kept|服务端分页失败，保留 0 个选择键/)).toBeVisible();

    await serverTable.getByRole("button", { name: /Retry page 1|重试第 1 页/ }).click();
    await expect(serverTable.getByText(/Page 1 loaded|第 1 页已加载/)).toBeVisible();
    await serverTable.getByRole("button", { name: /Page 2|第 2 页/ }).click();
    await serverTable.getByRole("button", { name: /Simulate page error|模拟分页错误/ }).click();
    await expect(serverTable.getByRole("button", { name: /Retry page 2|重试第 2 页/ })).toBeVisible();
    await expect(serverTable.getByRole("button", { name: /Retry page 1|重试第 1 页/ })).toHaveCount(0);
  });

  test("supports Recipe Gallery bundle handoff import, apply, and recovery", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /业务模板|Recipe Gallery/ }).click();

    const bundleBuilder = page.locator(".docs-bundle-builder");
    await expect(bundleBuilder.getByText(/v0.27 Team handoff|v0.27 团队交接/)).toBeVisible();

    await bundleBuilder.getByRole("button", { name: /Use commerce handoff|填入商业交接包/ }).click();
    const importPreview = bundleBuilder.locator(".docs-bundle-builder__preview");
    await expect(importPreview.getByText(/Bundle ready|配方包可用/)).toBeVisible();
    await expect(importPreview.getByText(/Campaign launch|活动发布页/)).toBeVisible();
    await expect(importPreview.getByText(/Campaign card|活动商品卡/)).toBeVisible();
    await expect(importPreview.getByText(/Commerce handoff theme|活动交接主题/)).toBeVisible();
    await expect(importPreview.getByText(/Commerce launch|活动视图/)).toBeVisible();
    await expect(importPreview.getByText(/Schedule presets|排期预设/)).toBeVisible();
    await expect(importPreview.getByText("1 / 2")).toBeVisible();
    await bundleBuilder.getByRole("button", { name: /Apply imported bundle|应用导入配方包/ }).click();
    await expect(bundleBuilder.getByText(/Bundle applied: 2 recipes|已应用配方包：2 个模板/)).toBeVisible();
    await expect(bundleBuilder.locator("button[aria-pressed='true']")).toHaveCount(2);

    await bundleBuilder.getByRole("button", { name: /Use damaged handoff|填入损坏交接包/ }).click();
    await expect(importPreview.getByText(/Import needs attention|导入需要处理/)).toBeVisible();
    await expect(importPreview.getByText(/Bundle needs a valid name, id, and recipe references|配方包需要有效名称、ID 和模板引用/)).toBeVisible();
    await expect(bundleBuilder.getByRole("button", { name: /Apply imported bundle|应用导入配方包/ })).toBeDisabled();

    await bundleBuilder.getByRole("button", { name: /Use learning handoff|填入学习交接包/ }).click();
    await expect(importPreview.getByText(/Bundle ready|配方包可用/)).toBeVisible();
    await expect(importPreview.getByText(/Learning task|学习任务页/)).toBeVisible();
    await expect(importPreview.getByText(/Schedule locale|排期 locale/)).toBeVisible();
    await expect(importPreview.getByText(/Learning handoff theme|学习交接主题/)).toBeVisible();
    await expect(importPreview.getByText(/Learning review|学习复盘/)).toBeVisible();
    await expect(importPreview.getByText("2 / 1")).toBeVisible();
    await bundleBuilder.getByRole("button", { name: /Apply imported bundle|应用导入配方包/ }).click();
    await expect(bundleBuilder.getByText(/Bundle applied: 2 recipes|已应用配方包：2 个模板/)).toBeVisible();
    await expect(bundleBuilder.locator("button[aria-pressed='true']")).toHaveCount(2);
  });

  test("keeps picker panel docs previews controlled by visible user choices", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "ColorPickerPanel 颜色面板" }).click();
    const colorPreview = page.locator(".docs-preview-surface").first();
    await colorPreview.getByRole("button", { name: "#c9624b" }).click();
    await expect(colorPreview.getByRole("button", { name: "#c9624b" })).toHaveAttribute("data-active", "true");

    await page.getByRole("button", { name: "DatePickerPanel 日期面板" }).click();
    const dateGrid = page.locator(".docs-preview-surface .pinepost-date-panel__grid").first();
    await dateGrid.getByRole("button", { name: "2026-05-18" }).click();
    await expect(dateGrid.getByRole("button", { name: "2026-05-18" })).toHaveAttribute("aria-pressed", "true");
  });

  test("keeps mixed Select groups visible and TreeSelect keyboard behavior aligned", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Select 选择器" }).click();
    const groupedSelect = page.getByRole("region", { name: /分组选项|Grouped options/ });
    await groupedSelect.getByRole("combobox", { name: /选择场景|Choose scenario/ }).click();
    await expect(groupedSelect.getByRole("option", { name: /临时路线|Loose route/ })).toBeVisible();

    await page.getByRole("button", { name: "TreeSelect 树形选择" }).click();
    const treeExample = page.getByRole("region", { name: /树形多选|Tree multiple selection/ });
    const treeTrigger = treeExample.locator(".pinepost-picker-trigger").first();
    await treeTrigger.click();
    await expect(treeExample.locator(".pinepost-tree-select__panel")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(treeExample.locator(".pinepost-tree-select__panel")).toHaveCount(0);

    await treeTrigger.click();
    await expect(treeExample.locator(".pinepost-tree-select__panel")).toBeVisible();
    await page.locator("main h1").click();
    await expect(treeExample.locator(".pinepost-tree-select__panel")).toHaveCount(0);

    await treeTrigger.click();
    await treeExample.getByRole("textbox", { name: /Filter tree/ }).fill("雪松");
    await page.keyboard.press("Escape");
    await expect(treeExample.locator(".pinepost-tree-select__panel")).toHaveCount(0);
    await expect(treeTrigger).toBeFocused();

    await treeTrigger.click();
    await treeTrigger.press("ArrowDown");
    const routeGroup = treeExample.locator(".pinepost-tree-select__node").filter({ hasText: /路线分组|Route group/ }).first();
    const cedarDesk = treeExample.locator(".pinepost-tree-select__node").filter({ hasText: /雪松桌|Cedar desk/ }).first();
    const dispatchTeam = treeExample.locator(".pinepost-tree-select__node").filter({ hasText: /调度组|Dispatch team/ }).first();
    await expect(routeGroup).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(cedarDesk).toBeFocused();

    await page.keyboard.press("End");
    await expect(dispatchTeam).toBeFocused();
    await expect(dispatchTeam).toHaveAttribute("data-selected", "true");

    await page.keyboard.press("Space");
    await expect(dispatchTeam).toHaveAttribute("data-selected", "false");

    await page.keyboard.press("Space");
    await expect(dispatchTeam).toHaveAttribute("data-selected", "true");

    await page.keyboard.press("Escape");
    await expect(treeExample.locator(".pinepost-tree-select__panel")).toHaveCount(0);
    await expect(treeTrigger).toBeFocused();
  });

  test("keeps selection scale filter and virtual keyboard behavior aligned", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Select 选择器" }).click();
    const remoteSelect = page.getByRole("region", { name: /远程搜索事件|Remote search event/ });
    const selectTrigger = remoteSelect.getByRole("combobox", { name: /输入关键字|Type keyword/ });
    await selectTrigger.click();
    await remoteSelect.getByRole("textbox", { name: "Filter select" }).fill("雪");
    await page.keyboard.press("Enter");
    await expect(remoteSelect.locator(".pinepost-select__content")).toHaveCount(0);
    await expect(remoteSelect.getByRole("combobox", { name: /雪松|Cedar/ })).toBeVisible();

    const selectedSelectTrigger = remoteSelect.getByRole("combobox", { name: /雪松|Cedar/ });
    await selectedSelectTrigger.click();
    await remoteSelect.getByRole("textbox", { name: "Filter select" }).fill("zzzz");
    await page.keyboard.press("Escape");
    await expect(remoteSelect.locator(".pinepost-select__content")).toHaveCount(0);
    await expect(selectedSelectTrigger).toBeFocused();
    await selectedSelectTrigger.click();
    await expect(remoteSelect.getByRole("option", { name: /雪松|Cedar/ })).toBeVisible();
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Cascader 级联选择" }).click();
    const cascaderFilter = page.getByRole("region", { name: /筛选路径|Filter paths/ });
    const cascaderTrigger = cascaderFilter.locator(".pinepost-picker-trigger").first();
    await cascaderTrigger.click();
    await cascaderFilter.getByRole("textbox", { name: "Filter options" }).fill("河岸");
    await page.keyboard.press("Enter");
    await expect(cascaderFilter.locator(".pinepost-cascader__panel")).toHaveCount(0);

    const selectedCascaderTrigger = cascaderFilter.locator(".pinepost-picker-trigger").first();
    await selectedCascaderTrigger.click();
    await cascaderFilter.getByRole("textbox", { name: "Filter options" }).fill("zzzz");
    await page.keyboard.press("Escape");
    await expect(cascaderFilter.locator(".pinepost-cascader__panel")).toHaveCount(0);
    await expect(selectedCascaderTrigger).toBeFocused();
    await selectedCascaderTrigger.click();
    await expect(cascaderFilter.getByRole("button", { name: /北线|North line/ }).first()).toBeVisible();
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "VirtualizedSelect 虚拟选择器" }).click();
    const virtualPreview = page.locator(".docs-preview-surface").first();
    const virtualTrigger = virtualPreview.locator(".pinepost-picker-trigger").first();
    await virtualTrigger.click();
    await expect(virtualPreview.getByRole("listbox")).toBeVisible();

    await virtualTrigger.press("End");
    const lastOption = virtualPreview.getByRole("option", { name: /路线 59|Route 59/ });
    await expect(lastOption).toBeVisible();
    await expect(lastOption).toHaveAttribute("data-active", "true");
    await page.keyboard.press("Enter");
    await expect(virtualPreview.locator(".pinepost-virtual-select__panel")).toHaveCount(0);
    await virtualPreview.getByRole("button", { name: "Clear" }).click();
    await expect(virtualPreview.getByRole("button", { name: "Clear" })).toHaveCount(0);

    await virtualTrigger.click();
    await virtualPreview.getByRole("textbox", { name: "Filter virtual select" }).fill("5");
    await expect(virtualPreview.getByRole("option", { name: /路线 5|Route 5/ }).first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(virtualPreview.locator(".pinepost-virtual-select__panel")).toHaveCount(0);
    await expect(virtualTrigger).toBeFocused();

    await virtualTrigger.click();
    await expect(virtualPreview.getByRole("option", { name: /路线 0|Route 0/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(virtualPreview.locator(".pinepost-virtual-select__panel")).toHaveCount(0);
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
