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
    score: 88,
    focus: true,
    signals: [
      { en: "Segmented examples cover filtering, sorting, selection, expansion, summaries, settings, and views.", zh: "分段示例覆盖筛选、排序、选择、展开、汇总、列设置和视图。" },
      { en: "Controlled row selection now exposes selected keys and select-all behavior.", zh: "受控行选择现在暴露选择键，并支持全选行为。" }
    ],
    currentGaps: [
      { en: "Server data recipes still need a deeper pagination and loading story.", zh: "服务端数据配方仍需要更深的分页与加载说明。" },
      { en: "Very large grids need more keyboard and viewport checks.", zh: "超大表格还需要更多键盘与视口检查。" }
    ],
    nextActions: [
      { en: "Use the Commercial Pressure Lab to keep server-style selection and bulk actions honest.", zh: "用 Commercial Pressure Lab 持续约束服务端选择和批量操作。" },
      { en: "Keep controlled table state stable before adding more display components.", zh: "继续先稳定受控表格状态，再扩展更多展示组件。" }
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
    score: 87,
    focus: true,
    signals: [
      { en: "Submit states, async validation, field focus, and failure flows are covered in product examples.", zh: "业务示例已覆盖提交状态、异步校验、字段聚焦和失败流程。" },
      { en: "Field errors are now available from the ref and forwarded to failed submits.", zh: "字段错误现在可从 ref 读取，并传给提交失败回调。" }
    ],
    currentGaps: [
      { en: "Dynamic field arrays need a dedicated recipe before they are presented as mature.", zh: "动态字段数组需要专门配方后才适合标为成熟。" },
      { en: "Nested object naming is intentionally kept conservative for now.", zh: "嵌套对象命名本轮保持保守。" }
    ],
    nextActions: [
      { en: "Use the Commercial Pressure Lab dynamic form recipe to keep server errors field-level.", zh: "用 Commercial Pressure Lab 的动态表单配方保持服务端错误字段级可见。" },
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
    level: "active",
    score: 83,
    focus: true,
    signals: [
      { en: "Custom request, retry, queue methods, drag input, and hidden list mode are documented.", zh: "已记录自定义请求、重试、队列方法、拖拽输入和隐藏列表模式。" },
      { en: "Multi-file submit now keeps every successful file successful.", zh: "多文件提交现在会保留每个成功文件的成功状态。" }
    ],
    currentGaps: [
      { en: "Chunked upload and resumable upload are not in scope yet.", zh: "分片上传和断点续传尚不在本轮范围内。" },
      { en: "Progress recipes need a deeper controlled queue example.", zh: "进度配方需要更深入的受控队列示例。" }
    ],
    nextActions: [
      { en: "Use the Commercial Pressure Lab controlled queue before adding larger upload features.", zh: "先用 Commercial Pressure Lab 的受控队列压实基础，再扩展更大的上传能力。" },
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
    score: 80,
    focus: true,
    signals: [
      { en: "Single, multiple, grouped, lazy, and tree-shaped selection flows have dedicated examples.", zh: "单选、多选、分组、懒加载和树形选择已有独立示例。" },
      { en: "Clear controls now use native button semantics across deep pickers.", zh: "深层选择器的清除控件现在使用原生按钮语义。" }
    ],
    currentGaps: [
      { en: "TreeSelect keyboard dismissal needed alignment with the other pickers.", zh: "TreeSelect 键盘关闭行为需要与其他选择器对齐。" },
      { en: "Large mixed option sets need more documented guidance.", zh: "大型混合选项集仍需要更多说明。" }
    ],
    nextActions: [
      { en: "Keep keyboard, dismissal, and grouped rendering behavior consistent.", zh: "持续统一键盘、关闭和分组渲染行为。" },
      { en: "Prefer fewer but deeper selection examples.", zh: "选择器示例保持少而深。" }
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
    focus: true,
    signals: [
      { en: "Date, date range, time, time range, and date-time panels are documented with scheduling presets.", zh: "日期、日期范围、时间、时间范围和日期时间面板已配排期预设说明。" },
      { en: "Disabled date ranges and disabled time shortcuts now have product recipes and tests.", zh: "禁用日期范围和禁用时间快捷项已有业务示例和测试。" }
    ],
    currentGaps: [
      { en: "Timezone-specific workflows are intentionally outside this pass.", zh: "时区专属工作流暂不放入本轮。" },
      { en: "Cross-month scheduling and recurrence workflows remain queued.", zh: "跨月排期和重复规则工作流仍在队列中。" }
    ],
    nextActions: [
      { en: "Watch visual baselines for disabled scheduling states before adding calendar breadth.", zh: "扩大日历范围前，先观察禁用排期状态的视觉基线。" },
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
    level: "solid",
    score: 82,
    focus: false,
    signals: [
      { en: "Theme collections, recipe bundle helpers, and locale provider behavior are documented.", zh: "主题集合、配方包助手和语言 Provider 行为已写入文档。" }
    ],
    currentGaps: [
      { en: "Maintained while v0.24 pressure focuses on disabled scheduling workflows.", zh: "v0.24 压力场聚焦禁用排期工作流期间保持维护。" }
    ],
    nextActions: [
      { en: "Maintain current coverage while heavy form and data surfaces mature.", zh: "在重型表单与数据组件成熟期间保持现有覆盖。" }
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
      { en: "Maintain API stability and avoid scope creep during v0.24.", zh: "v0.24 期间保持 API 稳定，避免范围膨胀。" }
    ]
  }
];
