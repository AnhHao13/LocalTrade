"use client";

/**
 * Client-side i18n
 *
 * Use useTranslation() in Client Components
 */

import i18next, { type FlatNamespace, type KeyPrefix } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, useState } from "react";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  type UseTranslationOptions,
  type UseTranslationResponse,
  type FallbackNs,
} from "react-i18next";
import { getOptions, languages, type Locale, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // detect from browser/cookie
    detection: {
      order: ["path", "cookie", "htmlTag", "navigator"],
      lookupFromPathIndex: 0,
      lookupCookie: cookieName,
      caches: ["cookie"],
    },
    preload: runsOnServerSide ? [...languages] : [],
  });

/**
 * Custom useTranslation hook with locale sync
 *
 * @param ns - Namespace(s) to use
 * @param options - Translation options
 * @returns useTranslation response
 *
 * @example
 * const { t } = useTranslation("home");
 * return <h1>{t("hero.title")}</h1>;
 */
export function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  // Client-side: Ensure language is synced
  if (runsOnServerSide) {
    return ret;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (activeLng !== i18n.resolvedLanguage) {
      setActiveLng(i18n.resolvedLanguage);
    }
  }, [activeLng, i18n.resolvedLanguage]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setActiveLng(lng);
    };
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  return ret;
}

/**
 * Change the current language
 */
export function changeLanguage(locale: Locale) {
  return i18next.changeLanguage(locale);
}

export { i18next };
