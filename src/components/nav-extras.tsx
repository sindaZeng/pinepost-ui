import * as React from "react";
import { cn } from "../lib/cn";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  backLabel?: string;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  onBack?: () => void;
  title: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ backLabel = "Back", className, description, extra, headingLevel = 1, onBack, title, ...props }, ref) => {
    const Heading = `h${headingLevel}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    return (
      <header ref={ref} className={cn("pinepost-page-header", className)} {...props}>
        {onBack && (
          <button aria-label={backLabel} className="pinepost-page-header__back" onClick={onBack} type="button">
            <span aria-hidden="true">←</span>
          </button>
        )}
        <div className="pinepost-page-header__body">
          <Heading>{title}</Heading>
          {description && <p>{description}</p>}
        </div>
        {extra && <div className="pinepost-page-header__extra">{extra}</div>}
      </header>
    );
  }
);

PageHeader.displayName = "PageHeader";

export interface AffixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number;
}

export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(
  ({ className, offsetTop = 0, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pinepost-affix", className)}
      style={{ "--pinepost-affix-top": `${offsetTop}px`, ...style } as React.CSSProperties}
      {...props}
    />
  )
);

Affix.displayName = "Affix";

export interface BacktopProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  target?: () => HTMLElement | Window;
  visibilityHeight?: number;
}

export const Backtop = React.forwardRef<HTMLButtonElement, BacktopProps>(
  ({ children = "Top", className, onClick, target, visibilityHeight = 0, ...props }, ref) => {
    const [visible, setVisible] = React.useState(visibilityHeight === 0);

    React.useEffect(() => {
      if (visibilityHeight === 0) return;
      const scrollTarget = target?.() ?? window;
      const listener = () => {
        const top = "scrollY" in scrollTarget ? scrollTarget.scrollY : scrollTarget.scrollTop;
        setVisible(top >= visibilityHeight);
      };
      listener();
      scrollTarget.addEventListener("scroll", listener);
      return () => scrollTarget.removeEventListener("scroll", listener);
    }, [target, visibilityHeight]);

    return (
      <button
        ref={ref}
        className={cn("pinepost-backtop", className)}
        data-visible={visible}
        onClick={(event) => {
          const scrollTarget = target?.() ?? window;
          if ("scrollTo" in scrollTarget) scrollTarget.scrollTo({ top: 0, behavior: "smooth" });
          onClick?.(event);
        }}
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  }
);

Backtop.displayName = "Backtop";

export interface AnchorItem {
  href: string;
  label: React.ReactNode;
}

export interface AnchorProps extends React.HTMLAttributes<HTMLElement> {
  items: AnchorItem[];
}

export const Anchor = React.forwardRef<HTMLElement, AnchorProps>(({ className, items, ...props }, ref) => (
  <nav ref={ref} aria-label="Anchor" className={cn("pinepost-anchor", className)} {...props}>
    {items.map((item) => (
      <a key={item.href} href={item.href}>
        {item.label}
      </a>
    ))}
  </nav>
));

Anchor.displayName = "Anchor";
