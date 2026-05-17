import * as React from "react";
import { cn } from "./lib/cn";
import type { PinepostLocale } from "./locale";
import type { PinepostTheme } from "./theme";

export interface PinepostProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  locale?: PinepostLocale;
  theme?: PinepostTheme;
}

const PinepostLocaleContext = React.createContext<PinepostLocale>("en");

export function usePinepostLocale() {
  return React.useContext(PinepostLocaleContext);
}

export const PinepostProvider = React.forwardRef<HTMLDivElement, PinepostProviderProps>(
  ({ locale = "en", theme = "calm", className, children, ...props }, ref) => {
    React.useEffect(() => {
      if (typeof document === "undefined") {
        return;
      }

      const root = document.documentElement;
      const previousTheme = root.getAttribute("data-pinepost-theme");
      const previousLocale = root.getAttribute("data-pinepost-locale");
      const previousLang = root.getAttribute("lang");

      root.setAttribute("data-pinepost-theme", theme);
      root.setAttribute("data-pinepost-locale", locale);
      root.setAttribute("lang", locale === "zh-CN" ? "zh-CN" : "en");

      return () => {
        if (previousTheme) {
          root.setAttribute("data-pinepost-theme", previousTheme);
        } else {
          root.removeAttribute("data-pinepost-theme");
        }

        if (previousLocale) {
          root.setAttribute("data-pinepost-locale", previousLocale);
        } else {
          root.removeAttribute("data-pinepost-locale");
        }

        if (previousLang) {
          root.setAttribute("lang", previousLang);
        } else {
          root.removeAttribute("lang");
        }
      };
    }, [locale, theme]);

    return (
      <PinepostLocaleContext.Provider value={locale}>
        <div
          ref={ref}
          data-pinepost-locale={locale}
          data-pinepost-theme={theme}
          lang={locale === "zh-CN" ? "zh-CN" : "en"}
          className={cn("pinepost-root", className)}
          {...props}
        >
          {children}
        </div>
      </PinepostLocaleContext.Provider>
    );
  }
);

PinepostProvider.displayName = "PinepostProvider";
