import type * as React from "react";
import type {
  CascaderMultipleValue,
  CascaderRef,
  FormRef,
  PinepostLocale,
  PinepostTheme,
  SelectRef,
  TableColumnSettingsValue,
  TableRef,
  TreeRef,
  TreeSelectRef,
  UploadRef
} from "../index";
import type { DemoLabels } from "./copy";

export type ApiRow = {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type ApiSection = {
  rows: ApiRow[];
  title: string;
};

export type DocRecipe = {
  code: string;
  description?: string;
  preview?: React.ReactNode;
  title: string;
};

export type DocExample = {
  code: string;
  description?: string;
  id: string;
  preview: React.ReactNode;
  title: string;
};

export type DocItem = {
  api: ApiRow[];
  apiSections?: ApiSection[];
  code: string;
  description: string;
  examples?: DocExample[];
  group: string;
  id: string;
  playground?: React.ReactNode;
  preview: React.ReactNode;
  recipes?: DocRecipe[];
  searchText?: string;
  title: string;
  workbench?: React.ReactNode;
};

export type NavGroup = {
  items: Array<{ id: string; label: string; searchText?: string }>;
  title: string;
};

export type GuidePanelId = "install" | "recipes" | "theme" | "theme-studio";

export type DemoRouteRow = {
  count: number;
  desk: string;
  id: string;
  route: string;
  status: string;
};

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type DemoContext = {
  [key: string]: unknown;
  cascaderMultiValue: CascaderMultipleValue;
  cascaderValue: string[];
  cascaderWorkbenchEvents: string[];
  cascaderWorkbenchRef: React.RefObject<CascaderRef | null>;
  cascaderWorkbenchValue: CascaderMultipleValue;
  colorPanelValue: string;
  datePanelValue: Date;
  datePresets: any[];
  dateRangePresets: any[];
  dateRangeValue: [Date | undefined, Date | undefined];
  dateRangeWorkbenchEvents: string[];
  dateTimePanelValue: Date;
  filteredTableRows: DemoRouteRow[];
  formExampleMode: "success" | "server-error";
  formExampleModel: { owner: string; route: string };
  formExampleRef: React.RefObject<FormRef | null>;
  formExampleRouteRef: React.RefObject<HTMLInputElement | null>;
  formExampleStatus: string;
  formPreviewModel: { desk: string };
  formRouteInputRef: React.RefObject<HTMLInputElement | null>;
  formSubmitMode: "success" | "server-error";
  formWorkbenchEvents: string[];
  formWorkbenchModel: { owner: string; route: string };
  formWorkbenchRef: React.RefObject<FormRef | null>;
  formWorkbenchStatus: string;
  inputTags: string[];
  labels: DemoLabels;
  locale: PinepostLocale;
  mentionValue: string;
  menuValue: string;
  messageBoxOpen: boolean;
  otpValue: string;
  page: number;
  radioValue: string;
  rateValue: number;
  routeOptions: any[];
  routeTreeData: any[];
  scheduleReferenceDate: Date;
  segment: string;
  selectValue: string;
  selectWorkbenchEvents: string[];
  selectWorkbenchRef: React.RefObject<SelectRef | null>;
  selectWorkbenchValue: string | string[];
  setCascaderMultiValue: Setter<CascaderMultipleValue>;
  setCascaderValue: Setter<string[]>;
  setCascaderWorkbenchEvents: Setter<string[]>;
  setCascaderWorkbenchValue: Setter<CascaderMultipleValue>;
  setColorPanelValue: Setter<string>;
  setDatePanelValue: Setter<Date>;
  setDateRangeValue: Setter<[Date | undefined, Date | undefined]>;
  setDateRangeWorkbenchEvents: Setter<string[]>;
  setDateTimePanelValue: Setter<Date>;
  setFormExampleFocusRequest: Setter<number>;
  setFormExampleMode: Setter<"success" | "server-error">;
  setFormExampleModel: Setter<{ owner: string; route: string }>;
  setFormExampleStatus: Setter<string>;
  setFormFocusRequest: Setter<number>;
  setFormPreviewModel: Setter<{ desk: string }>;
  setFormSubmitMode: Setter<"success" | "server-error">;
  setFormWorkbenchEvents: Setter<string[]>;
  setFormWorkbenchModel: Setter<{ owner: string; route: string }>;
  setFormWorkbenchStatus: Setter<string>;
  setInputTags: Setter<string[]>;
  setMentionValue: Setter<string>;
  setMenuValue: Setter<string>;
  setMessageBoxOpen: Setter<boolean>;
  setOtpValue: Setter<string>;
  setPage: Setter<number>;
  setRadioValue: Setter<string>;
  setRateValue: Setter<number>;
  setSegment: Setter<string>;
  setSelectValue: Setter<string>;
  setSelectWorkbenchEvents: Setter<string[]>;
  setSelectWorkbenchValue: Setter<string | string[]>;
  setShipDateValue: Setter<Date>;
  setTableActiveView: Setter<string>;
  setTableFilterExampleReady: Setter<boolean>;
  setTableFilterExampleStatus: Setter<string>;
  setTableQuery: Setter<string>;
  setTableReadyFilter: Setter<boolean>;
  setTableSelectedCount: Setter<number>;
  setTableSettings: Setter<TableColumnSettingsValue>;
  setTableWorkbenchEvents: Setter<string[]>;
  setTableWorkbenchStatus: Setter<string>;
  setTimePanelValue: Setter<string>;
  setTimeRangeValue: Setter<[string | undefined, string | undefined]>;
  setTimeRangeWorkbenchEvents: Setter<string[]>;
  setTimeSelectValue: Setter<string>;
  setTourOpen: Setter<boolean>;
  setTransferValue: Setter<string[]>;
  setTreeSelectValue: Setter<string | string[]>;
  setTreeSelectWorkbenchEvents: Setter<string[]>;
  setTreeSelectWorkbenchValue: Setter<string | string[]>;
  setTreeWorkbenchCheckedKeys: Setter<string[]>;
  setTreeWorkbenchEvents: Setter<string[]>;
  setTreeWorkbenchExpandedKeys: Setter<string[]>;
  setUploadPreviewStatus: Setter<string>;
  setUploadWorkbenchEvents: Setter<string[]>;
  setVirtualSelectValue: Setter<string>;
  setVirtualTreeSelected: Setter<string>;
  shipDateValue: Date;
  showToast: () => void;
  tableActiveView: string;
  tableFilterExampleReady: boolean;
  tableFilterExampleRows: DemoRouteRow[];
  tableFilterExampleStatus: string;
  tableFilterExampleTags: Array<{ key: string; label: string }>;
  tableFilterTags: Array<{ key: string; label: string }>;
  tablePresetExportText: string;
  tableQuery: string;
  tableReadyFilter: boolean;
  tableRef: React.RefObject<TableRef<DemoRouteRow> | null>;
  tableRows: DemoRouteRow[];
  tableSelectedCount: number;
  tableSettings: TableColumnSettingsValue;
  tableWorkbenchEvents: string[];
  tableWorkbenchStatus: string;
  theme: PinepostTheme;
  timePanelValue: string;
  timeRangePresets: any[];
  timeRangeValue: [string | undefined, string | undefined];
  timeRangeWorkbenchEvents: string[];
  timeSelectValue: string;
  tourOpen: boolean;
  transferData: any[];
  transferValue: string[];
  treeSelectValue: string | string[];
  treeSelectWorkbenchEvents: string[];
  treeSelectWorkbenchRef: React.RefObject<TreeSelectRef | null>;
  treeSelectWorkbenchValue: string | string[];
  treeWorkbenchCheckedKeys: string[];
  treeWorkbenchEvents: string[];
  treeWorkbenchExpandedKeys: string[];
  treeWorkbenchRef: React.RefObject<TreeRef | null>;
  uploadExampleRef: React.RefObject<UploadRef | null>;
  uploadPreviewStatus: string;
  uploadRef: React.RefObject<UploadRef | null>;
  uploadWorkbenchEvents: string[];
  virtualOptions: any[];
  virtualRows: Array<{ count: number; route: string; status: string }>;
  virtualSelectValue: string;
  virtualTreeItems: any[];
  virtualTreeSelected: string;
  zh: boolean;
};

export type DemoCatalogContext = DemoContext & {
  renderCascaderExamples: () => DocExample[];
  renderCascaderWorkbench: () => React.ReactNode;
  renderDateRangeExamples: () => DocExample[];
  renderDateRangeWorkbench: () => React.ReactNode;
  renderFormExamples: () => DocExample[];
  renderFormWorkbench: () => React.ReactNode;
  renderSelectExamples: () => DocExample[];
  renderSelectWorkbench: () => React.ReactNode;
  renderTableExamples: () => DocExample[];
  renderTableWorkbench: () => React.ReactNode;
  renderTimeRangeExamples: () => DocExample[];
  renderTimeRangeWorkbench: () => React.ReactNode;
  renderTreeExamples: () => DocExample[];
  renderTreeSelectExamples: () => DocExample[];
  renderTreeSelectWorkbench: () => React.ReactNode;
  renderTreeWorkbench: () => React.ReactNode;
  renderUploadExamples: () => DocExample[];
  renderUploadWorkbench: () => React.ReactNode;
};
