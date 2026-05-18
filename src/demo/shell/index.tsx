import * as React from "react";

import type { DemoLabels } from "../copy";
import type { DocExample, DocItem } from "../types";

export function PinepostMark() {
  return (
    <svg className="docs-mark" viewBox="0 0 92 92" aria-hidden="true">
      <rect x="11" y="25" width="70" height="49" rx="8" />
      <path d="M15 31 46 53 77 31" />
      <path d="M26 22h40l-8 17H34z" />
      <path d="M46 14v18" />
      <path d="M36 22 46 11 56 22" />
      <circle cx="65" cy="56" r="8" />
      <path d="M61 56h8M65 52v8" />
    </svg>
  );
}

function code(lines: string[]) {
  return lines.join("\n");
}

export function CodeBlock({ codeText, label, labels }: { codeText: string; label: string; labels: DemoLabels }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard?.writeText(codeText);
    } catch {
      // The visual copied state still confirms the requested code block.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="docs-code">
      <div className="docs-code__label">
        <span>{label}</span>
        <button type="button" onClick={handleCopy}>
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      <pre>
        <code>{codeText}</code>
      </pre>
    </div>
  );
}

export function pushDemoEvent(setter: React.Dispatch<React.SetStateAction<string[]>>, message: string) {
  setter((current) => [message, ...current].slice(0, 5));
}

export function DemoEventLog({ empty, events, title }: { empty: string; events: string[]; title: string }) {
  return (
    <div className="docs-workbench__log" aria-label={title}>
      <strong>{title}</strong>
      {events.length > 0 ? (
        <ol>
          {events.map((event, index) => (
            <li key={`${event}-${index}`}>{event}</li>
          ))}
        </ol>
      ) : (
        <p>{empty}</p>
      )}
    </div>
  );
}

export function DemoWorkbench({
  codeText,
  controls,
  description,
  events,
  labels,
  methods,
  preview,
  status,
  title
}: {
  codeText: string;
  controls?: React.ReactNode;
  description?: React.ReactNode;
  events: string[];
  labels: DemoLabels;
  methods?: React.ReactNode;
  preview: React.ReactNode;
  status?: React.ReactNode;
  title: string;
}) {
  const zh = labels.language === "语言";

  return (
    <section className="docs-workbench" aria-label={title}>
      <div className="docs-workbench__head">
        <div>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
        {status && <div className="docs-workbench__status" role="status">{status}</div>}
      </div>
      <div className="docs-workbench__grid">
        <div className="docs-workbench__preview">
          <div className="docs-example__label">{labels.preview}</div>
          <div className="docs-preview-surface">{preview}</div>
        </div>
        <div className="docs-workbench__side">
          {controls && (
            <div className="docs-workbench__panel">
              <strong>{zh ? "API 控件" : "API controls"}</strong>
              {controls}
            </div>
          )}
          {methods && (
            <div className="docs-workbench__panel">
              <strong>{labels.methods}</strong>
              {methods}
            </div>
          )}
          <DemoEventLog events={events} title={zh ? "事件日志" : "Event log"} empty={zh ? "等待交互。" : "Waiting for interaction."} />
        </div>
      </div>
      <CodeBlock codeText={codeText} label={labels.usage} labels={labels} />
    </section>
  );
}

export function DemoSectionNav({ examples, item, labels }: { examples: DocExample[]; item: DocItem; labels: DemoLabels }) {
  const zh = labels.language === "语言";
  const componentName = item.title.split(" ")[0] ?? item.title;

  if (examples.length < 2) return null;

  return (
    <nav className="docs-example-nav" aria-label={zh ? `${componentName} 示例导航` : `${componentName} examples`}>
      {examples.map((example) => (
        <a href={`#${item.id}-${example.id}`} key={example.id}>
          {example.title}
        </a>
      ))}
      {(item.playground ?? item.workbench) && (
        <a href={`#${item.id}-playground`}>{zh ? "高级 Playground" : "Advanced Playground"}</a>
      )}
    </nav>
  );
}

export function DemoExample({ example, item, labels }: { example: DocExample; item: DocItem; labels: DemoLabels }) {
  return (
    <section className="docs-example" id={`${item.id}-${example.id}`} aria-label={example.title}>
      <div className="docs-example__head">
        <div>
          <strong>{example.title}</strong>
          {example.description && <p>{example.description}</p>}
        </div>
      </div>
      <div className="docs-example__preview">
        <div className="docs-example__label">{labels.preview}</div>
        <div className="docs-preview-surface">{example.preview}</div>
      </div>
      <CodeBlock codeText={example.code} label={labels.usage} labels={labels} />
    </section>
  );
}

export function AdvancedPlayground({ children, id, labels }: { children: React.ReactNode; id: string; labels: DemoLabels }) {
  const zh = labels.language === "语言";

  if (!children) return null;

  return (
    <section className="docs-playground" id={`${id}-playground`} aria-label={zh ? "高级 Playground" : "Advanced Playground"}>
      <div className="docs-playground__head">
        <strong>{zh ? "高级 Playground" : "Advanced Playground"}</strong>
        <p>
          {zh
            ? "把多个能力组合在一起验证，适合确认事件、方法和受控状态。"
            : "A combined area for checking events, methods, and controlled state."}
        </p>
      </div>
      {children}
    </section>
  );
}

export function ApiTable({ item, labels }: { item: DocItem; labels: DemoLabels }) {
  const sections = item.apiSections ?? [{ rows: item.api, title: labels.attributes }];

  return (
    <>
      {sections.map((section) => (
        <div className="docs-api-wrap" aria-label={`${item.title} ${section.title}`} key={section.title}>
          <strong className="docs-api-title">{section.title}</strong>
          <table className="docs-api">
            <thead>
              <tr>
                <th>{labels.prop}</th>
                <th>{labels.type}</th>
                <th>{labels.defaultValue}</th>
                <th>{labels.description}</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={`${section.title}-${row.prop}`}>
                  <td>
                    <code>{row.prop}</code>
                  </td>
                  <td>{row.type}</td>
                  <td>{row.defaultValue}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}

export function DocSection({ item, labels }: { item: DocItem; labels: DemoLabels }) {
  const examples: DocExample[] = item.examples ?? [
    {
      id: "basic",
      title: labels.language === "语言" ? "基础用法" : "Basic usage",
      description: item.description,
      preview: item.preview,
      code: item.code
    },
    ...(item.recipes ?? []).map((recipe, index) => ({
      id: `recipe-${index + 1}`,
      title: recipe.title,
      description: recipe.description,
      preview: recipe.preview ?? item.preview,
      code: recipe.code
    }))
  ];

  return (
    <section className="docs-section">
      <div className="docs-section__head">
        <span>{item.group}</span>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
      <DemoSectionNav examples={examples} item={item} labels={labels} />
      <div className="docs-examples">
        {examples.map((example) => (
          <DemoExample example={example} item={item} labels={labels} key={example.id} />
        ))}
      </div>
      <AdvancedPlayground id={item.id} labels={labels}>
        {item.playground ?? item.workbench}
      </AdvancedPlayground>
      <ApiTable item={item} labels={labels} />
    </section>
  );
}
