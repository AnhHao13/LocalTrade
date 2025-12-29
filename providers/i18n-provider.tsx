"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, type ReactNode } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import {
  languages,
  fallbackLng,
  defaultNS,
  cookieName,
  type Locale,
} from "@/app/[locale]/i18n/settings";

const runsOnServerSide = typeof window === "undefined";

// Initialize i18next for client
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`@/app/[locale]/i18n/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: [...languages],
    fallbackLng,
    lng: undefined,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      lookupCookie: cookieName,
      caches: ["cookie"],
    },
    defaultNS,
    fallbackNS: defaultNS,
    ns: [defaultNS, "home", "layout"],
    preload: runsOnServerSide ? [...languages] : [],
  });

interface I18nProviderProps {
  children: ReactNode;
  locale: Locale;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  // On server side, change language synchronously
  if (runsOnServerSide && i18next.language !== locale) {
    i18next.changeLanguage(locale);
  }

  useEffect(() => {
    // Only change language on client if needed
    if (i18next.language !== locale) {
      i18next.changeLanguage(locale);
    }
  }, [locale]);

  // Always render children to avoid hydration mismatch
  // The I18nextProvider will handle the language change
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
