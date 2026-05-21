import * as React from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DateRangePickerPanel,
  Empty,
  Form,
  FormField,
  Input,
  Loading,
  Message,
  Progress,
  Rate,
  Result,
  Segmented,
  Select,
  Skeleton,
  Space,
  Statistic,
  Steps,
  Switch,
  Table,
  TableColumnSettings,
  Tag,
  Textarea,
  TimeRangePickerPanel,
  Timeline,
  Upload,
  createPinepostDateRangePresets,
  createPinepostRecipeBundle,
  createPinepostTimeRangePresets,
  createPinepostThemeCollectionExport,
  createTableViewPresetExport,
  parsePinepostRecipeBundle,
  stringifyPinepostRecipeBundle
} from "../pinepost";

import { code, type DemoLabels } from "../copy";
import { describeBundleIssue } from "../fixtures";
import { CodeBlock } from "../shell";

type RecipeCategory = "all" | "commerce" | "data" | "form" | "learning" | "upload";

type RecipeState = {
  code: string;
  label: string;
  preview: React.ReactNode;
  value: string;
};

type RecipeDefinition = {
  category: Exclude<RecipeCategory, "all">;
  components: string[];
  description: string;
  id: string;
  states: RecipeState[];
  title: string;
};

function RecipeCard({
  labels,
  recipe,
  zh
}: {
  labels: DemoLabels;
  recipe: RecipeDefinition;
  zh: boolean;
}) {
  const [stateValue, setStateValue] = React.useState(recipe.states[0]?.value ?? "");
  const activeState = recipe.states.find((state) => state.value === stateValue) ?? recipe.states[0];

  React.useEffect(() => {
    setStateValue(recipe.states[0]?.value ?? "");
  }, [recipe.title, recipe.states]);

  return (
    <article className="docs-recipe-card" data-recipe-category={recipe.category}>
      <div className="docs-recipe-card__head">
        <div>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
        <div className="docs-recipe-card__components" aria-label={zh ? "组件清单" : "Component list"}>
          <strong>{zh ? "组件清单" : "Component list"}</strong>
          <span>{recipe.components.join(" / ")}</span>
        </div>
      </div>
      <div className="docs-recipe-card__states">
        <span>{zh ? "状态" : "State"}</span>
        <Segmented
          value={activeState.value}
          onValueChange={setStateValue}
          options={recipe.states.map((state) => ({ value: state.value, label: state.label }))}
        />
      </div>
      <div className="docs-preview-surface">{activeState.preview}</div>
      <CodeBlock codeText={activeState.code} label={`${recipe.title} - ${activeState.label}`} labels={labels} />
    </article>
  );
}

export function RecipeGalleryPanel({ labels, zh }: { labels: DemoLabels; zh: boolean }) {
  const [category, setCategory] = React.useState<RecipeCategory>("all");
  const [bundleRecipeIds, setBundleRecipeIds] = React.useState(["operations-table", "campaign-launch"]);
  const [bundleImportText, setBundleImportText] = React.useState("");
  const [bundleApplyMessage, setBundleApplyMessage] = React.useState("");
  const recipeLocale = zh ? "zh-CN" : "en";
  const launchDateRangePresets = React.useMemo(() => createPinepostDateRangePresets({ locale: recipeLocale, referenceDate: new Date(2026, 4, 18) }), [recipeLocale]);
  const launchTimeRangePresets = React.useMemo(() => createPinepostTimeRangePresets({ locale: recipeLocale }), [recipeLocale]);
  const categoryOptions: Array<{ label: string; value: RecipeCategory }> = [
    { value: "all", label: zh ? "全部" : "All" },
    { value: "data", label: zh ? "数据" : "Data" },
    { value: "form", label: zh ? "表单" : "Form" },
    { value: "upload", label: zh ? "上传" : "Upload" },
    { value: "commerce", label: zh ? "商业" : "Commerce" },
    { value: "learning", label: zh ? "学习" : "Learning" }
  ];
  const recipes: RecipeDefinition[] = [
    {
      category: "data",
      id: "operations-table",
      title: zh ? "后台表格台" : "Operations table",
      description: zh ? "带密度、列设置和状态标签的日常运营表格。" : "A daily operations table with density, column settings, and status tags.",
      components: ["Table", "TableColumnSettings", "Tag", "Button"],
      states: [
        {
          value: "ready",
          label: zh ? "正常" : "Ready",
          preview: (
            <div className="docs-recipe-preview">
              <TableColumnSettings
                columns={[
                  { key: "route", title: zh ? "路线" : "Route" },
                  { key: "count", title: zh ? "数量" : "Count" },
                  { key: "status", title: zh ? "状态" : "Status" }
                ]}
                defaultValue={{ columnOrder: ["route", "count", "status"], density: "compact", hiddenColumns: [] }}
              />
              <Table
                columns={[
                  { key: "route", title: zh ? "路线" : "Route" },
                  { key: "count", title: zh ? "数量" : "Count" },
                  { key: "status", title: zh ? "状态" : "Status", render: (row) => <Tag>{String(row.status)}</Tag> }
                ]}
                data={[
                  { route: zh ? "北门" : "North gate", count: 12, status: zh ? "待发" : "Ready" },
                  { route: zh ? "松木桌" : "Pine desk", count: 6, status: zh ? "复核" : "Review" }
                ]}
                density="compact"
                rowKey="route"
              />
            </div>
          ),
          code: code(['<TableColumnSettings columns={columns} defaultValue={settings} />', '<Table columns={columns} data={rows} density="compact" rowKey="route" />'])
        },
        {
          value: "loading",
          label: zh ? "加载中" : "Loading",
          preview: (
            <Loading label={zh ? "正在刷新路线数据" : "Refreshing route data"}>
              <Skeleton count={3} />
            </Loading>
          ),
          code: code(['<Loading label="正在刷新路线数据">', "  <Skeleton count={3} />", "</Loading>"])
        },
        {
          value: "empty",
          label: zh ? "空态" : "Empty",
          preview: <Empty title={zh ? "没有待处理路线" : "No routes waiting"} description={zh ? "筛选条件下暂无任务。" : "No tasks match the current filters."} action={<Button size="sm">{zh ? "清除筛选" : "Clear filters"}</Button>} />,
          code: code(['<Empty title="没有待处理路线" action={<Button>清除筛选</Button>} />'])
        }
      ]
    },
    {
      category: "form",
      id: "approval-form",
      title: zh ? "审批表单页" : "Approval form",
      description: zh ? "适合工单、申请和配置保存的紧凑表单。" : "A compact form for tickets, requests, and configuration saves.",
      components: ["Form", "FormField", "Input", "Select", "Button"],
      states: [
        {
          value: "ready",
          label: zh ? "正常" : "Ready",
          preview: (
            <Form className="docs-recipe-form">
              <FormField label={zh ? "收件处" : "Desk"}><Input placeholder={zh ? "苔藓桌" : "Moss desk"} /></FormField>
              <FormField label={zh ? "优先级" : "Priority"}><Select defaultValue="normal" options={[{ value: "normal", label: zh ? "普通" : "Normal" }, { value: "high", label: zh ? "加急" : "High" }]} /></FormField>
              <Button>{zh ? "提交审批" : "Submit"}</Button>
            </Form>
          ),
          code: code(["<Form>", "  <FormField label=\"收件处\"><Input /></FormField>", "  <Button>提交审批</Button>", "</Form>"])
        },
        {
          value: "loading",
          label: zh ? "处理中" : "Saving",
          preview: <Loading label={zh ? "正在保存审批单" : "Saving request"}><Form className="docs-recipe-form"><FormField label={zh ? "收件处" : "Desk"}><Input disabled value={zh ? "苔藓桌" : "Moss desk"} /></FormField><Button disabled>{zh ? "保存中" : "Saving"}</Button></Form></Loading>,
          code: code(['<Loading label="正在保存审批单">', "  <Form>...</Form>", "</Loading>"])
        },
        {
          value: "disabled",
          label: zh ? "禁用" : "Disabled",
          preview: <Form className="docs-recipe-form"><Alert title={zh ? "审批窗口已关闭" : "Approval closed"} description={zh ? "当前批次暂不可提交。" : "This batch cannot be submitted right now."} variant="warning" /><FormField label={zh ? "收件处" : "Desk"}><Input disabled value={zh ? "苔藓桌" : "Moss desk"} /></FormField><Button disabled>{zh ? "暂不可提交" : "Temporarily unavailable"}</Button></Form>,
          code: code(['<Alert variant="warning" title="审批窗口已关闭" />', "<Button disabled>暂不可提交</Button>"])
        }
      ]
    },
    {
      category: "upload",
      id: "asset-upload-wall",
      title: zh ? "素材上传墙" : "Asset upload wall",
      description: zh ? "展示自定义文件项、失败状态和手动重试入口。" : "Shows custom file items, failure states, and retry entry points.",
      components: ["Upload", "Progress", "Button", "Badge"],
      states: [
        {
          value: "ready",
          label: zh ? "队列" : "Queue",
          preview: <Upload label={zh ? "上传素材" : "Upload assets"} defaultFileList={[{ name: "parcel-cover.png", percent: 68, status: "uploading", uid: "asset-1" }, { error: new Error("Upload failed"), name: "stamp-set.zip", percent: 30, status: "error", uid: "asset-2" }]} renderFile={(file, actions) => <div className="docs-upload-card"><span>{file.name}</span><Badge variant={file.status === "error" ? "stamp" : "sky"}>{file.status}</Badge><Button size="sm" variant="soft" onClick={file.status === "error" ? actions.retry : actions.remove}>{file.status === "error" ? (zh ? "重试" : "Retry") : (zh ? "移除" : "Remove")}</Button></div>} />,
          code: code(["<Upload", "  defaultFileList={files}", "  renderFile={(file, actions) => <CustomFile file={file} actions={actions} />}", "/>"])
        },
        {
          value: "loading",
          label: zh ? "上传中" : "Uploading",
          preview: <div className="docs-recipe-preview"><Progress value={68} label={zh ? "parcel-cover.png 上传中" : "parcel-cover.png uploading"} /><Progress value={34} label={zh ? "stamp-set.zip 上传中" : "stamp-set.zip uploading"} /></div>,
          code: code(['<Progress value={68} label="parcel-cover.png 上传中" />'])
        },
        {
          value: "error",
          label: zh ? "失败" : "Error",
          preview: <Alert title={zh ? "stamp-set.zip 上传失败" : "stamp-set.zip failed"} description={zh ? "检查网络后可从文件项重试。" : "Check the network and retry from the file item."} variant="danger" />,
          code: code(['<Alert variant="danger" title="stamp-set.zip 上传失败" />'])
        }
      ]
    },
    {
      category: "commerce",
      id: "campaign-card",
      title: zh ? "活动商品卡" : "Campaign card",
      description: zh ? "适合活动页、套餐卡和小型电商模块。" : "A card pattern for campaigns, bundles, and small commerce modules.",
      components: ["Card", "Badge", "Statistic", "Button"],
      states: [
        {
          value: "ready",
          label: zh ? "在售" : "Live",
          preview: <Card className="docs-campaign-card"><CardHeader><Badge variant="parcel">{zh ? "今日特选" : "Today"}</Badge><CardTitle>{zh ? "松果礼盒" : "Pinecone bundle"}</CardTitle><CardDescription>{zh ? "含三张便签与一枚邮戳。" : "Three notes and one stamp."}</CardDescription></CardHeader><CardContent><Statistic label={zh ? "库存" : "Stock"} value={18} suffix={zh ? "份" : " packs"} /></CardContent><CardFooter><Button variant="parcel">{zh ? "加入清单" : "Add to list"}</Button></CardFooter></Card>,
          code: code(['<Card><Badge variant="parcel">今日特选</Badge><Statistic label="库存" value={18} /></Card>'])
        },
        {
          value: "loading",
          label: zh ? "加载中" : "Loading",
          preview: <Card className="docs-campaign-card"><CardContent><Skeleton count={4} /></CardContent><CardFooter><Button disabled>{zh ? "读取库存" : "Checking stock"}</Button></CardFooter></Card>,
          code: code(["<Card><Skeleton count={4} /></Card>"])
        },
        {
          value: "soldout",
          label: zh ? "售罄" : "Sold out",
          preview: <Result status="warning" title={zh ? "本轮已经售罄" : "Sold out for this round"} description={zh ? "可以展示候补登记或下一轮提醒。" : "Offer a waitlist or next-round reminder."} />,
          code: code(['<Result status="warning" title="本轮已经售罄" />'])
        }
      ]
    },
    {
      category: "learning",
      id: "learning-task",
      title: zh ? "学习任务页" : "Learning task",
      description: zh ? "把步骤、进度和反馈组合成轻学习流程。" : "Combines steps, progress, and feedback for learning flows.",
      components: ["Steps", "Progress", "Rate", "Result"],
      states: [
        {
          value: "ready",
          label: zh ? "进行中" : "Active",
          preview: <div className="docs-recipe-preview"><Steps active={2} items={[{ title: zh ? "阅读" : "Read" }, { title: zh ? "练习" : "Practice" }, { title: zh ? "提交" : "Submit" }]} /><Progress value={72} /><Rate value={4} disabled /></div>,
          code: code(["<Steps active={2} items={items} />", "<Progress value={72} />", "<Rate value={4} disabled />"])
        },
        {
          value: "loading",
          label: zh ? "加载中" : "Loading",
          preview: <Loading label={zh ? "正在生成练习" : "Generating practice"}><Skeleton count={3} /></Loading>,
          code: code(['<Loading label="正在生成练习"><Skeleton count={3} /></Loading>'])
        },
        {
          value: "success",
          label: zh ? "完成" : "Success",
          preview: <Result status="success" title={zh ? "任务完成" : "Task complete"} description={zh ? "学习记录已经保存。" : "Learning record saved."} />,
          code: code(['<Result status="success" title="任务完成" />'])
        }
      ]
    },
    {
      category: "data",
      id: "operations-dashboard",
      title: zh ? "运营仪表盘" : "Operations dashboard",
      description: zh ? "把关键指标、进度和提示压进一个可扫视面板。" : "A scannable dashboard for metrics, progress, and notes.",
      components: ["Statistic", "Progress", "Alert", "Skeleton"],
      states: [
        { value: "ready", label: zh ? "正常" : "Ready", preview: <div className="docs-dashboard-grid"><Statistic label={zh ? "今日单量" : "Orders"} value={128} /><Statistic label={zh ? "准时率" : "On time"} value="96%" /><Progress value={84} label={zh ? "路线完成率" : "Route completion"} /><Alert title={zh ? "午后高峰" : "Afternoon peak"} description={zh ? "建议保留两名复核人员。" : "Keep two reviewers available."} /></div>, code: code(["<Statistic label=\"今日单量\" value={128} />", "<Progress value={84} label=\"路线完成率\" />"]) },
        { value: "loading", label: zh ? "加载中" : "Loading", preview: <Skeleton count={5} />, code: code(["<Skeleton count={5} />"]) },
        { value: "empty", label: zh ? "空态" : "Empty", preview: <Empty title={zh ? "暂无运营数据" : "No operations data"} description={zh ? "选择日期后会显示指标。" : "Pick a date to see metrics."} />, code: code(['<Empty title="暂无运营数据" />']) }
      ]
    },
    {
      category: "commerce",
      id: "campaign-launch",
      title: zh ? "活动发布页" : "Campaign launch",
      description: zh ? "发布前校验、倒计时和成功反馈放在同一流程里。" : "Pre-launch checks, timing, and success feedback in one flow.",
      components: ["Card", "Switch", "Timeline", "DateRangePickerPanel", "TimeRangePickerPanel"],
      states: [
        { value: "ready", label: zh ? "待发布" : "Ready", preview: <Card><CardHeader><CardTitle>{zh ? "春日活动" : "Spring campaign"}</CardTitle><CardDescription>{zh ? "确认库存、封面和投放时间。" : "Confirm stock, artwork, and launch time."}</CardDescription></CardHeader><CardContent><Switch label={zh ? "开启提醒" : "Enable reminder"} defaultChecked /><Timeline items={[{ title: zh ? "素材确认" : "Artwork checked" }, { title: zh ? "库存锁定" : "Stock locked" }]} /><Space direction="vertical"><DateRangePickerPanel defaultValue={[new Date(2026, 4, 18), new Date(2026, 4, 24)]} shortcuts={launchDateRangePresets} /><TimeRangePickerPanel defaultValue={["09:00", "18:00"]} shortcuts={launchTimeRangePresets} /></Space></CardContent></Card>, code: code(["const dateShortcuts = createPinepostDateRangePresets();", "const timeShortcuts = createPinepostTimeRangePresets();", "<Card><DateRangePickerPanel shortcuts={dateShortcuts} /><TimeRangePickerPanel shortcuts={timeShortcuts} /></Card>"]) },
        { value: "disabled", label: zh ? "缺配置" : "Blocked", preview: <Message title={zh ? "缺少封面图" : "Cover image missing"} description={zh ? "补齐素材后才能发布。" : "Add artwork before launch."} variant="warning" />, code: code(['<Message variant="warning" title="缺少封面图" />']) },
        { value: "success", label: zh ? "已发布" : "Live", preview: <Result status="success" title={zh ? "活动已发布" : "Campaign is live"} description={zh ? "入口已经同步到集市页。" : "Entry is now visible on the shop page."} />, code: code(['<Result status="success" title="活动已发布" />']) }
      ]
    },
    {
      category: "data",
      id: "support-queue",
      title: zh ? "客服队列页" : "Support queue",
      description: zh ? "把待处理、超时和处理完成的对话集中展示。" : "A queue for waiting, overdue, and resolved support conversations.",
      components: ["Badge", "Table", "Alert", "Button"],
      states: [
        { value: "ready", label: zh ? "正常" : "Ready", preview: <Table columns={[{ key: "name", title: zh ? "访客" : "Visitor" }, { key: "status", title: zh ? "状态" : "Status", render: (row) => <Badge variant={String(row.status).includes("超时") ? "stamp" : "sky"}>{String(row.status)}</Badge> }]} data={[{ name: zh ? "松木店" : "Pine shop", status: zh ? "等待中" : "Waiting" }, { name: zh ? "苔藓课" : "Moss class", status: zh ? "超时" : "Overdue" }]} rowKey="name" />, code: code(['<Table columns={queueColumns} data={queueRows} rowKey="name" />']) },
        { value: "loading", label: zh ? "加载中" : "Loading", preview: <Loading label={zh ? "正在拉取会话" : "Loading conversations"}><Skeleton count={4} /></Loading>, code: code(['<Loading label="正在拉取会话"><Skeleton count={4} /></Loading>']) },
        { value: "error", label: zh ? "异常" : "Error", preview: <Alert title={zh ? "队列同步失败" : "Queue sync failed"} description={zh ? "保留本地缓存，并提示重新同步。" : "Keep local cache and offer a sync retry."} variant="danger" />, code: code(['<Alert variant="danger" title="队列同步失败" />']) }
      ]
    }
  ];
  const filteredRecipes = category === "all" ? recipes : recipes.filter((recipe) => recipe.category === category);
  const selectedBundleRecipes = recipes.filter((recipe) => bundleRecipeIds.includes(recipe.id));
  const recipeTitleById = new Map(recipes.map((recipe) => [recipe.id, recipe.title]));
  const bundleExport = React.useMemo(
    () =>
      createPinepostRecipeBundle({
        id: "spring-ops-kit",
        name: zh ? "春日运营配方包" : "Spring operations bundle",
        description: zh ? "主题、表格视图、排期快捷项和业务模板引用。" : "Theme, table views, scheduling shortcuts, and recipe references.",
        recipeIds: bundleRecipeIds,
        schedule: {
          dateKeys: ["today"],
          dateRangeKeys: ["last-7-days", "this-week"],
          locale: recipeLocale,
          referenceDate: "2026-05-18",
          timeRangeKeys: ["morning", "full-day"]
        },
        tableViewPresets: createTableViewPresetExport({
          activeKey: "ops",
          presets: [
            {
              key: "ops",
              label: zh ? "运营视图" : "Operations",
              columnOrder: ["route", "status", "count"],
              hiddenColumns: [],
              sortState: { key: "route", order: "asc" }
            },
            {
              key: "review",
              label: zh ? "复核视图" : "Review",
              columnOrder: ["status", "route", "count"],
              hiddenColumns: ["count"],
              sortState: { key: "count", order: "desc" }
            }
          ]
        }),
        themeCollection: createPinepostThemeCollectionExport({
          activeId: "campaign",
          name: zh ? "春日主题集合" : "Spring theme collection",
          themes: [
            { baseTheme: "calm", id: "workspace", name: zh ? "工作台" : "Workspace", tokens: {} },
            { baseTheme: "shop", id: "campaign", name: zh ? "活动页" : "Campaign", tokens: { "--pinepost-paper": "#fff4df", "--pinepost-stamp": "#c95745" } }
          ]
        })
      }),
    [bundleRecipeIds, recipeLocale, zh]
  );
  const commerceHandoffJson = React.useMemo(
    () =>
      stringifyPinepostRecipeBundle(
        createPinepostRecipeBundle({
          id: "commerce-launch-handoff",
          name: zh ? "活动发布交接包" : "Commerce launch handoff",
          description: zh ? "活动发布、商品卡、主题和运营表格视图交接。" : "Campaign launch, commerce card, theme, and operations table handoff.",
          recipeIds: ["campaign-launch", "campaign-card"],
          schedule: {
            dateRangeKeys: ["this-week"],
            locale: recipeLocale,
            referenceDate: "2026-05-20",
            timeRangeKeys: ["morning", "afternoon"]
          },
          tableViewPresets: createTableViewPresetExport({
            activeKey: "commerce",
            presets: [
              {
                key: "commerce",
                label: zh ? "活动视图" : "Commerce launch",
                columnOrder: ["route", "status", "count"],
                hiddenColumns: [],
                sortState: { key: "status", order: "asc" }
              }
            ]
          }),
          themeCollection: createPinepostThemeCollectionExport({
            activeId: "commerce",
            name: zh ? "活动交接主题" : "Commerce handoff theme",
            themes: [
              { baseTheme: "shop", id: "commerce", name: zh ? "活动页" : "Campaign page", tokens: { "--pinepost-paper": "#fff7e8", "--pinepost-parcel": "#d9873b" } }
            ]
          })
        })
      ),
    [recipeLocale, zh]
  );
  const learningHandoffJson = React.useMemo(
    () =>
      stringifyPinepostRecipeBundle(
        createPinepostRecipeBundle({
          id: "learning-flow-handoff",
          name: zh ? "学习流程交接包" : "Learning flow handoff",
          description: zh ? "学习任务、客服队列、主题和轻量排期交接。" : "Learning task, support queue, theme, and light schedule handoff.",
          recipeIds: ["learning-task", "support-queue"],
          schedule: {
            dateKeys: ["today", "tomorrow"],
            locale: recipeLocale,
            referenceDate: "2026-05-20",
            timeRangeKeys: ["full-day"]
          },
          tableViewPresets: createTableViewPresetExport({
            activeKey: "learning",
            presets: [
              {
                key: "learning",
                label: zh ? "学习复盘" : "Learning review",
                columnOrder: ["name", "status"],
                hiddenColumns: [],
                sortState: { key: "status", order: "desc" }
              }
            ]
          }),
          themeCollection: createPinepostThemeCollectionExport({
            activeId: "learning",
            name: zh ? "学习交接主题" : "Learning handoff theme",
            themes: [
              { baseTheme: "calm", id: "learning", name: zh ? "学习台" : "Learning desk", tokens: { "--pinepost-paper": "#f7fbf0", "--pinepost-sky": "#5f9ab8" } }
            ]
          })
        })
      ),
    [recipeLocale, zh]
  );
  const damagedHandoffJson = React.useMemo(
    () =>
      JSON.stringify(
        {
          id: "",
          name: "",
          recipeIds: [],
          schedule: {
            dateKeys: ["quarter"],
            locale: "fr"
          },
          version: 1
        },
        null,
        2
      ),
    []
  );
  const bundleJsonText = React.useMemo(() => stringifyPinepostRecipeBundle(bundleExport), [bundleExport]);
  const bundleImportResult = React.useMemo(
    () => bundleImportText.trim() ? parsePinepostRecipeBundle(bundleImportText) : undefined,
    [bundleImportText]
  );
  const importedRecipeIds = bundleImportResult?.value?.recipeIds ?? [];
  const missingImportRecipeIds = importedRecipeIds.filter((id) => !recipeTitleById.has(id));
  const importedRecipeTitles = importedRecipeIds.map((id) => recipeTitleById.get(id) ?? id);
  const importedThemeCollection = bundleImportResult?.themeCollection?.value;
  const importedActiveTheme = importedThemeCollection?.themes.find((theme) => theme.id === importedThemeCollection.activeId);
  const importedTableViewPresets = bundleImportResult?.tableViewPresets?.value;
  const importedActiveTablePreset = importedTableViewPresets?.presets.find((preset) => preset.key === importedTableViewPresets.activeKey);
  const importedSchedule = bundleImportResult?.value?.schedule;
  const importedDatePresetCount = (importedSchedule?.dateKeys?.length ?? 0) + (importedSchedule?.dateRangeKeys?.length ?? 0);
  const importedTimePresetCount = importedSchedule?.timeRangeKeys?.length ?? 0;
  const importIssueMessages = [
    ...(bundleImportResult?.issues.map((issue) => describeBundleIssue(issue, zh)) ?? []),
    ...missingImportRecipeIds.map((id) => zh ? `缺少模板：${id}` : `Missing recipe: ${id}`)
  ];
  const importNeedsAttention = importIssueMessages.length > 0;
  const canApplyBundleImport = Boolean(bundleImportResult?.value && importedRecipeIds.length && !importNeedsAttention);

  function toggleBundleRecipe(id: string) {
    setBundleRecipeIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
    setBundleApplyMessage("");
  }

  function fillBundleImport(text: string) {
    setBundleImportText(text);
    setBundleApplyMessage("");
  }

  function applyImportedBundle() {
    if (!canApplyBundleImport || !bundleImportResult?.value) return;
    setBundleRecipeIds(bundleImportResult.value.recipeIds);
    setCategory("all");
    setBundleApplyMessage(
      zh
        ? `已应用配方包：${bundleImportResult.value.recipeIds.length} 个模板`
        : `Bundle applied: ${bundleImportResult.value.recipeIds.length} recipes`
    );
  }

  return (
    <section className="docs-section docs-section--guide docs-recipe-gallery">
      <div className="docs-section__head">
        <span>{labels.groups.guide}</span>
        <h2>{zh ? "Recipe Gallery 业务模板" : "Recipe Gallery"}</h2>
        <p>{zh ? "把常见业务界面拆成可复制的 Pinepost 组合，方便直接拿去改。" : "Copyable Pinepost compositions for common product screens."}</p>
      </div>

      <div className="docs-recipe-gallery__filters">
        <span>{zh ? "分类" : "Category"}</span>
        <Segmented value={category} onValueChange={(value) => setCategory(value as RecipeCategory)} options={categoryOptions} />
      </div>

      <div className="docs-bundle-builder" aria-label={zh ? "配方包构建器" : "Recipe Bundle Builder"}>
        <div className="docs-bundle-builder__head">
          <div>
            <strong>{zh ? "Bundle Builder 配方包构建器" : "Bundle Builder"}</strong>
            <p>{zh ? "选择业务模板后，生成可导入导出的 Recipe Bundle JSON。" : "Select product recipes and generate portable Recipe Bundle JSON."}</p>
            <p><code>createPinepostRecipeBundle</code> / <code>parsePinepostRecipeBundle</code></p>
          </div>
          <Space>
            <Tag variant="leaf">{zh ? "v0.27 团队交接" : "v0.27 Team handoff"}</Tag>
            <Tag variant="parcel">{zh ? "配置配方" : "Config recipe"}</Tag>
          </Space>
        </div>
        <div className="docs-bundle-builder__recipes" aria-label={zh ? "选择模板" : "Select recipes"}>
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              aria-pressed={bundleRecipeIds.includes(recipe.id)}
              onClick={() => toggleBundleRecipe(recipe.id)}
              type="button"
            >
              {recipe.title}
            </button>
          ))}
        </div>
        <div className="docs-bundle-builder__summary">
          <div>
            <span>{zh ? "模板" : "Recipes"}</span>
            <strong>{selectedBundleRecipes.length}</strong>
          </div>
          <div>
            <span>{zh ? "主题" : "Themes"}</span>
            <strong>{bundleExport.themeCollection?.themes.length ?? 0}</strong>
          </div>
          <div>
            <span>{zh ? "表格预设" : "Table presets"}</span>
            <strong>{bundleExport.tableViewPresets?.presets.length ?? 0}</strong>
          </div>
          <div>
            <span>{zh ? "排期" : "Schedule"}</span>
            <strong>{bundleExport.schedule?.dateRangeKeys?.length ?? 0}/{bundleExport.schedule?.timeRangeKeys?.length ?? 0}</strong>
          </div>
          <div>
            <span>{zh ? "当前模板" : "Current recipes"}</span>
            <strong>{selectedBundleRecipes.map((recipe) => recipe.title).join(" / ") || "-"}</strong>
          </div>
        </div>
        <CodeBlock codeText={bundleJsonText} label={zh ? "Recipe Bundle JSON" : "Recipe Bundle JSON"} labels={labels} />
        <div className="docs-bundle-builder__import">
          <div>
            <strong>{zh ? "Bundle import 预览" : "Bundle import preview"}</strong>
            <p>{zh ? "粘贴配方包 JSON 后，预览模板、主题、表格视图和排期配置。" : "Paste bundle JSON to preview recipes, themes, table views, and schedule config."}</p>
          </div>
          <Textarea
            aria-label={zh ? "Recipe Bundle JSON 输入" : "Recipe Bundle JSON input"}
            placeholder={zh ? "粘贴 Recipe Bundle JSON" : "Paste Recipe Bundle JSON"}
            value={bundleImportText}
            onChange={(event) => fillBundleImport(event.target.value)}
          />
          <div className="docs-theme-studio__actions">
            <Button size="sm" onClick={() => fillBundleImport(bundleJsonText)}>
              {zh ? "填入配方包" : "Use bundle JSON"}
            </Button>
            <Button size="sm" variant="soft" onClick={() => fillBundleImport(commerceHandoffJson)}>
              {zh ? "填入商业交接包" : "Use commerce handoff"}
            </Button>
            <Button size="sm" variant="soft" onClick={() => fillBundleImport(learningHandoffJson)}>
              {zh ? "填入学习交接包" : "Use learning handoff"}
            </Button>
            <Button size="sm" variant="soft" onClick={() => fillBundleImport(damagedHandoffJson)}>
              {zh ? "填入损坏交接包" : "Use damaged handoff"}
            </Button>
            <Button disabled={!canApplyBundleImport} size="sm" variant="parcel" onClick={applyImportedBundle}>
              {zh ? "应用导入配方包" : "Apply imported bundle"}
            </Button>
          </div>
          {bundleApplyMessage ? <div className="docs-theme-studio__message" role="status">{bundleApplyMessage}</div> : null}
          {bundleImportResult && (
            <div className="docs-bundle-builder__preview" role="status">
              {importNeedsAttention ? (
                <Alert
                  variant="warning"
                  title={zh ? "导入需要处理" : "Import needs attention"}
                  description={importIssueMessages.join(" ")}
                />
              ) : (
                <Alert
                  variant="success"
                  title={zh ? "配方包可用" : "Bundle ready"}
                  description={zh ? "JSON 可以恢复模板、主题集合、表格视图和排期配置。" : "JSON restores recipes, theme collection, table views, and schedule config."}
                />
              )}
              <div className="docs-bundle-builder__summary">
                <div><span>{zh ? "模板" : "Recipes"}</span><strong>{bundleImportResult.value?.recipeIds.length ?? 0}</strong></div>
                <div><span>{zh ? "模板名称" : "Recipe names"}</span><strong>{importedRecipeTitles.join(" / ") || "-"}</strong></div>
                <div><span>{zh ? "主题" : "Themes"}</span><strong>{bundleImportResult.themeCollection?.value?.themes.length ?? 0}</strong></div>
                <div><span>{zh ? "主题集合" : "Theme collection"}</span><strong>{importedThemeCollection?.name ?? "-"}</strong></div>
                <div><span>{zh ? "当前主题" : "Active theme"}</span><strong>{importedActiveTheme?.name ?? "-"}</strong></div>
                <div><span>{zh ? "表格预设" : "Table presets"}</span><strong>{bundleImportResult.tableViewPresets?.value?.presets.length ?? 0}</strong></div>
                <div><span>{zh ? "当前表格预设" : "Active table preset"}</span><strong>{importedActiveTablePreset?.label ?? "-"}</strong></div>
                <div><span>{zh ? "排期 locale" : "Schedule locale"}</span><strong>{bundleImportResult.value?.schedule?.locale ?? "-"}</strong></div>
                <div><span>{zh ? "排期预设" : "Schedule presets"}</span><strong>{importedDatePresetCount} / {importedTimePresetCount}</strong></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="docs-recipe-gallery__grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} labels={labels} zh={zh} />
        ))}
      </div>
    </section>
  );
}
