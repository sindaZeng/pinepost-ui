import * as React from "react";
import { Tag, type TagVariant } from "../pinepost";
import { code } from "../copy";
import {
  componentMaturityMatrix,
  maturityLevelCopy,
  type ComponentMaturityItem,
  type LocalizedText,
  type MaturityLevel
} from "../maturity";
import type { DemoCatalogContext, DocItem } from "../types";

function text(value: LocalizedText, zh: boolean) {
  return zh ? value.zh : value.en;
}

function levelVariant(level: MaturityLevel): TagVariant {
  if (level === "commercial") return "leaf";
  if (level === "active") return "parcel";
  if (level === "queued") return "sky";
  return "stamp";
}

function MaturityList({ items, zh }: { items: LocalizedText[]; zh: boolean }) {
  return (
    <ul className="docs-maturity__list">
      {items.map((item) => (
        <li key={text(item, zh)}>{text(item, zh)}</li>
      ))}
    </ul>
  );
}

function MaturitySummary({ items, zh }: { items: ComponentMaturityItem[]; zh: boolean }) {
  const focusItems = items.filter((item) => item.focus);
  const focusScore = Math.round(focusItems.reduce((total, item) => total + item.score, 0) / focusItems.length);
  const queuedCount = items.filter((item) => item.level === "queued").length;

  return (
    <div className="docs-maturity__summary" aria-label={zh ? "成熟度概览" : "Maturity summary"}>
      <div>
        <span>{zh ? "v0.26 配方包交接重点" : "v0.26 bundle handoff focus"}</span>
        <strong>{focusItems.length}</strong>
        <p>{zh ? "Recipe Bundle 与应用壳层" : "Recipe Bundle and app shell"}</p>
      </div>
      <div>
        <span>{zh ? "重点平均分" : "Focus average"}</span>
        <strong>{focusScore}</strong>
        <p>{zh ? "分数代表当前商用可信度，不代表组件数量。" : "Scores track commercial confidence, not component count."}</p>
      </div>
      <div>
        <span>{zh ? "非重点排队" : "Non-focus queue"}</span>
        <strong>{queuedCount}</strong>
        <p>{zh ? "展示类组件保持可用，但本轮不平均加深。" : "Display components stay usable without broadening this pass."}</p>
      </div>
    </div>
  );
}

function MaturityMatrix({ zh }: { zh: boolean }) {
  return (
    <div className="docs-maturity" aria-label={zh ? "组件成熟度矩阵" : "Component maturity matrix"}>
      <MaturitySummary items={componentMaturityMatrix} zh={zh} />
      <div className="docs-maturity__table-wrap">
        <table className="docs-maturity__table">
          <thead>
            <tr>
              <th>{zh ? "组件" : "Component"}</th>
              <th>{zh ? "等级" : "Level"}</th>
              <th>{zh ? "分数" : "Score"}</th>
              <th>{zh ? "重点" : "Focus"}</th>
              <th>{zh ? "当前信号" : "Current signals"}</th>
              <th>{zh ? "缺口" : "Gaps"}</th>
              <th>{zh ? "下一步" : "Next actions"}</th>
            </tr>
          </thead>
          <tbody>
            {componentMaturityMatrix.map((item) => (
              <tr key={item.id} data-focus={item.focus || undefined}>
                <td>
                  <strong>{item.component}</strong>
                  <span>{text(item.area, zh)}</span>
                </td>
                <td>
                  <Tag variant={levelVariant(item.level)}>{text(maturityLevelCopy[item.level], zh)}</Tag>
                </td>
                <td>
                  <div className="docs-maturity__score">
                    <span aria-hidden="true">
                      <i style={{ width: `${item.score}%` }} />
                    </span>
                    <strong>{item.score}</strong>
                  </div>
                </td>
                <td>
                  <Tag variant={item.focus ? "leaf" : "sky"}>{item.focus ? (zh ? "v0.26 重点" : "v0.26 focus") : (zh ? "保持" : "Hold")}</Tag>
                </td>
                <td>
                  <MaturityList items={item.signals} zh={zh} />
                </td>
                <td>
                  <MaturityList items={item.currentGaps} zh={zh} />
                </td>
                <td>
                  <MaturityList items={item.nextActions} zh={zh} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="docs-maturity__note">
        {zh
          ? "v0.26 把压力推进到 Recipe Bundle 的保存、导入、恢复和应用交接；Table、Form、Upload 压力场继续作为重型工作流回归基线。"
          : "v0.26 moves pressure into Recipe Bundle save, import, recovery, and apply handoff; the Table, Form, and Upload pressure lab remains the heavy workflow regression baseline."}
      </p>
    </div>
  );
}

export function createMaturityCatalogDocs(context: DemoCatalogContext): DocItem[] {
  const { labels, zh } = context;

  return [
    {
      id: "component-maturity",
      group: labels.groups.guide,
      title: zh ? "Component Maturity 组件成熟度" : "Component Maturity",
      description: zh
        ? "v0.26 的公开成熟度矩阵：继续压实 Recipe Bundle 已保存工作流交接，并保持其它组件的优先级透明。"
        : "The v0.26 public maturity matrix: keep pressure on Recipe Bundle saved workflow handoff while keeping other component priorities visible.",
      searchText:
        "maturity commercial workflow handoff bundle handoff component matrix Recipe Bundle Theme Provider Table Form Upload Select Cascader TreeSelect DateTime date time 成熟度 商用 工作流 交接 配方包 主题 表格 表单 上传 选择器 日期时间",
      preview: <MaturityMatrix zh={zh} />,
      code: code([
        'import { componentMaturityMatrix } from "./maturity";',
        "",
        "const focusRows = componentMaturityMatrix.filter((item) => item.focus);",
        "const commercialRows = componentMaturityMatrix.filter((item) => item.level === \"commercial\");"
      ]),
      apiSections: [
        {
          title: zh ? "矩阵字段" : "Matrix fields",
          rows: [
            {
              prop: "level",
              type: '"commercial" | "solid" | "active" | "queued"',
              defaultValue: "-",
              description: zh ? "当前成熟等级。" : "Current maturity level."
            },
            {
              prop: "score",
              type: "number",
              defaultValue: "-",
              description: zh ? "当前商用可信度评分。" : "Current commercial-confidence score."
            },
            {
              prop: "focus",
              type: "boolean",
              defaultValue: "false",
              description: zh ? "是否属于当前深挖重点。" : "Whether the component is part of the current hardening focus."
            },
            {
              prop: "currentGaps",
              type: "LocalizedText[]",
              defaultValue: "[]",
              description: zh ? "仍需补强的边界。" : "Known maturity gaps."
            },
            {
              prop: "nextActions",
              type: "LocalizedText[]",
              defaultValue: "[]",
              description: zh ? "下一轮应执行的动作。" : "Recommended next actions."
            }
          ]
        }
      ],
      api: []
    }
  ];
}
