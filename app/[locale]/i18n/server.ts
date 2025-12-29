/**
 * Server-side i18n
 *
 * Use createTranslation() in Server Components
 */

import { createInstance, type TFunction } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, type Locale, fallbackLng } from "./settings";

const initI18next = async (lng: Locale, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

/**
 * Create translation function for Server Components
 *
 * @param locale - Current locale
 * @param ns - Namespace(s) to load
 * @param options - Additional options
 * @returns Object with t function and i18n instance
 *
 * @example
 * const { t } = await createTranslation(locale, "home");
 * return <h1>{t("hero.title")}</h1>;
 */
export async function createTranslation(
  locale: Locale,
  ns: string | string[] = "common",
  options: { keyPrefix?: string } = {}
): Promise<{
  t: TFunction;
  i18n: ReturnType<typeof createInstance>;
}> {
  const i18nextInstance = await initI18next(locale, ns);

  return {
    t: i18nextInstance.getFixedT(
      locale,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}

/**
 * Get all translations for a namespace (useful for passing to client components)
 */
export async function getTranslations(locale: Locale, ns: string = "common") {
  try {
    const translations = await import(`./locales/${locale}/${ns}.json`);
    return translations.default;
  } catch {
    const translations = await import(`./locales/${fallbackLng}/${ns}.json`);
    return translations.default;
  }
}
