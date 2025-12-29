"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useParams } from "next/navigation";
import { fallbackLng, type Locale } from "@/app/[locale]/i18n/settings";

interface LocaleContextValue {
  locale: Locale;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
  locale: Locale;
}

export function LocaleProvider({ children, locale }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook to access current locale
 */
export function useLocale(): Locale {
  const context = useContext(LocaleContext);
  const params = useParams();

  if (context) {
    return context.locale;
  }

  return (params?.locale as Locale) || fallbackLng;
}
