export type MaturityLevel = "commercial" | "solid" | "active" | "queued";

export type LocalizedText = {
  en: string;
  zh: string;
};

export type ComponentMaturityItem = {
  area: LocalizedText;
  component: string;
  currentGaps: LocalizedText[];
  focus: boolean;
  id: string;
  level: MaturityLevel;
  nextActions: LocalizedText[];
  score: number;
  signals: LocalizedText[];
};

export const maturityLevelCopy: Record<MaturityLevel, LocalizedText> = {
  commercial: {
    en: "Commercial-ready",
    zh: "商用优先"
  },
  solid: {
    en: "Solid foundation",
    zh: "基础扎实"
  },
  active: {
    en: "Active hardening",
    zh: "持续打磨"
  },
  queued: {
    en: "Non-focus queue",
    zh: "非重点排队"
  }
};

export const componentMaturityMatrix: ComponentMaturityItem[] = [
  {
    id: "table",
    component: "Table",
    area: {
      en: "Dense data and operations",
      zh: "高密数据与操作"
    },
    level: "commercial",
    score: 90,
    focus: false,
    signals: [
      { en: "Segmented examples cover filtering, sorting, selection, expansion, summaries, settings, and views.", zh: "分段示例覆盖筛选、排序、选择、展开、汇总、列设置和视图。" },
      { en: "The pressure lab now keeps selected keys visible across pagination, loading, errors, and bulk actions.", zh: "压力场现在让选择键跨分页、加载、错误和批量操作保持可见。" }
    ],
    currentGaps: [
      { en: "Very large server grids still need more keyboard and viewport checks.", zh: "超大服务端表格还需要更多键盘与视口检查。" },
      { en: "Virtualized server data remains outside this handoff pass.", zh: "虚拟化服务端数据仍不放入本轮交接范围。" }
    ],
    nextActions: [
      { en: "Keep the Commercial Pressure Lab as the regression check for server-style selection and bulk actions.", zh: "把 Commercial Pressure Lab 继续作为服务端选择和批量操作回归检查。" },
      { en: "Keep controlled table state stable while v0.28 focuses on selection keyboard behavior.", zh: "v0.28 聚焦选择器键盘行为期间，保持受控表格状态稳定。" }
    ]
  },
  {
    id: "form",
    component: "Form",
    area: {
      en: "Validation and submit flow",
      zh: "校验与提交流程"
    },
    level: "commercial",
    score: 89,
    focus: false,
    signals: [
      { en: "Submit states, async validation, field focus, and failure flows are covered in product examples.", zh: "业务示例已覆盖提交状态、异步校验、字段聚焦和失败流程。" },
      { en: "Dynamic stop fields now show add, remove, first-error focus, and server field-error handoff.", zh: "动态站点字段现在展示新增、移除、第一个错误聚焦和服务端字段错误交接。" }
    ],
    currentGaps: [
      { en: "Nested object naming remains conservative until more product recipes need it.", zh: "嵌套对象命名会保持保守，直到更多业务配方需要它。" },
      { en: "Field-list helpers remain demo-owned instead of becoming runtime API.", zh: "字段列表助手仍由 demo 持有，不提升为运行时 API。" }
    ],
    nextActions: [
      { en: "Keep dynamic field handoff examples as regression coverage for visible errors and focus recovery.", zh: "让动态字段交接示例继续作为可见错误和焦点恢复的回归覆盖。" },
      { en: "Keep accessibility checks close to validation behavior.", zh: "让无障碍检查紧贴校验行为。" }
    ]
  },
  {
    id: "upload",
    component: "Upload",
    area: {
      en: "Queue lifecycle and file actions",
      zh: "队列生命周期与文件操作"
    },
    level: "commercial",
    score: 86,
    focus: false,
    signals: [
      { en: "Custom request, retry, queue methods, drag input, and hidden list mode are documented.", zh: "已记录自定义请求、重试、队列方法、拖拽输入和隐藏列表模式。" },
      { en: "Controlled queue examples now expose progress, retry, clear, and complete file-list transitions.", zh: "受控队列示例现在暴露进度、重试、清空和完整文件列表流转。" }
    ],
    currentGaps: [
      { en: "Chunked upload and resumable upload are not in scope yet.", zh: "分片上传和断点续传尚不在本轮范围内。" },
      { en: "Progress recipes need a deeper controlled queue example.", zh: "进度配方需要更深入的受控队列示例。" }
    ],
    nextActions: [
      { en: "Keep controlled queue transitions test-backed while saved bundle workflows deepen.", zh: "已保存配方包工作流加深期间，继续用测试约束受控队列流转。" },
      { en: "Keep status transitions test-backed.", zh: "继续用测试约束状态流转。" }
    ]
  },
  {
    id: "selection",
    component: "Select / Cascader / TreeSelect",
    area: {
      en: "Deep selection and hierarchy",
      zh: "深层选择与层级选择"
    },
    level: "active",
    score: 84,
    focus: true,
    signals: [
      { en: "Single, multiple, grouped, lazy, and tree-shaped selection flows have dedicated examples.", zh: "单选、多选、分组、懒加载和树形选择已有独立示例。" },
      { en: "TreeSelect now has a test-backed keyboard contract for movement, branch expansion, leaf toggling, lazy loading, and Escape dismissal.", zh: "TreeSelect 现在用测试约束移动、分支展开、叶子切换、懒加载和 Escape 关闭。" }
    ],
    currentGaps: [
      { en: "Large mixed option sets still need more documented guidance.", zh: "大型混合选项集仍需要更多说明。" },
      { en: "Virtualized selection guidance stays separate from this deep picker pass.", zh: "虚拟化选择指导仍与本轮深层选择器打磨分开。" }
    ],
    nextActions: [
      { en: "Use the v0.28 TreeSelect keyboard contract as the deep selection regression check.", zh: "把 v0.28 TreeSelect 键盘契约作为深层选择回归检查。" },
      { en: "Prefer fewer but deeper selection examples before broad display polish.", zh: "在展示类广泛打磨前，选择器示例保持少而深。" }
    ]
  },
  {
    id: "date-time",
    component: "Date and time panels",
    area: {
      en: "Scheduling and dispatch windows",
      zh: "排期与配送窗口"
    },
    level: "active",
    score: 84,
    focus: false,
    signals: [
      { en: "Date, date range, time, time range, and date-time panels are documented with scheduling presets.", zh: "日期、日期范围、时间、时间范围和日期时间面板已配排期预设说明。" },
      { en: "Disabled date ranges and disabled time shortcuts now have product recipes and tests.", zh: "禁用日期范围和禁用时间快捷项已有业务示例和测试。" }
    ],
    currentGaps: [
      { en: "Timezone-specific workflows are intentionally outside this pass.", zh: "时区专属工作流暂不放入本轮。" },
      { en: "Cross-month scheduling and recurrence workflows remain queued.", zh: "跨月排期和重复规则工作流仍在队列中。" }
    ],
    nextActions: [
      { en: "Keep disabled scheduling baselines stable while v0.28 focuses on selection keyboard behavior.", zh: "v0.28 聚焦选择器键盘行为期间，保持禁用排期基线稳定。" },
      { en: "Keep panel accessibility labels explicit.", zh: "保持面板无障碍标签明确。" }
    ]
  },
  {
    id: "theme-provider",
    component: "Theme, Provider, Recipe Bundle",
    area: {
      en: "Application shell support",
      zh: "应用壳层支持"
    },
    level: "active",
    score: 86,
    focus: false,
    signals: [
      { en: "Theme collections, recipe bundle helpers, and locale provider behavior are documented.", zh: "主题集合、配方包助手和语言 Provider 行为已写入文档。" },
      { en: "Recipe Gallery now applies commerce and learning bundle imports with previewed recipes, active themes, table presets, schedule counts, and locale.", zh: "Recipe Gallery 现在可以应用商业与学习配方包导入，并预览模板、当前主题、表格预设、排期数量和语言。" }
    ],
    currentGaps: [
      { en: "Cross-team ownership notes remain demo-owned rather than runtime API.", zh: "跨团队归属说明仍由 demo 持有，不提升为运行时 API。" },
      { en: "Bundle compatibility stays on version 1 until more saved workflow formats exist.", zh: "配方包兼容性在更多保存工作流格式出现前保持 version 1。" }
    ],
    nextActions: [
      { en: "Keep bundle import, damaged JSON recovery, richer previews, and apply-to-builder behavior under Playwright coverage.", zh: "继续用 Playwright 覆盖配方包导入、损坏 JSON 恢复、更完整预览和应用到构建器行为。" },
      { en: "Keep Recipe Gallery as the saved workflow handoff baseline while v0.28 focuses on selection.", zh: "v0.28 聚焦选择器期间，把 Recipe Gallery 继续作为已保存工作流交接基线。" }
    ]
  },
  {
    id: "display",
    component: "Display components",
    area: {
      en: "Descriptions, Statistic, Timeline, Avatar, Empty, Result",
      zh: "Descriptions、Statistic、Timeline、Avatar、Empty、Result"
    },
    level: "queued",
    score: 62,
    focus: false,
    signals: [
      { en: "Basic examples exist and remain useful for docs coverage.", zh: "已有基础示例，可继续支撑文档覆盖。" }
    ],
    currentGaps: [
      { en: "They are not where commercial trust is won in this release.", zh: "它们不是本轮建立商用信任的关键位置。" }
    ],
    nextActions: [
      { en: "Hold broad display polish until core data and form depth is stronger.", zh: "先暂停展示类平均打磨，等核心数据与表单深度更强。" }
    ]
  },
  {
    id: "navigation-feedback",
    component: "Navigation and feedback",
    area: {
      en: "Menus, overlays, alerts, loading, messages",
      zh: "菜单、浮层、警告、加载和消息"
    },
    level: "solid",
    score: 70,
    focus: false,
    signals: [
      { en: "Coverage is broad enough for current documentation examples.", zh: "当前文档示例已有足够覆盖。" }
    ],
    currentGaps: [
      { en: "Advanced composition patterns are deferred.", zh: "高级组合模式延后。" }
    ],
    nextActions: [
      { en: "Maintain API stability and avoid scope creep during v0.28.", zh: "v0.28 期间保持 API 稳定，避免范围膨胀。" }
    ]
  }
];
