/**
 * i18n Settings
 *
 * Re-exports from central i18n.config.ts
 * This file exists for backward compatibility with existing imports.
 */

export {
  LANGUAGES as languages,
  DEFAULT_LOCALE as fallbackLng,
  defaultNS,
  cookieName,
  getOptions,
  isValidLocale,
  type Locale,
  // UI helpers
  LANGUAGE_NAMES,
  LANGUAGE_NATIVE_NAMES,
  LANGUAGE_FLAGS,
} from "@/i18n.config";
