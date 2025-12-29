"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "./i18n-provider";
import { ThemeProvider } from "./theme-provider";
import { LocaleProvider } from "./locale-context";
import type { Locale } from "@/app/[locale]/i18n/settings";

interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LocaleProvider locale={locale}>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export { useLocale } from "./locale-context";
