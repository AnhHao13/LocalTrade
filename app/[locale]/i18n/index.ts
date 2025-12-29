/**
 * i18n Module Index
 *
 * Re-export all i18n utilities
 */

// Settings
export {
  fallbackLng,
  languages,
  defaultNS,
  cookieName,
  getOptions,
  type Locale,
} from "./settings";

// Server-side
export { createTranslation, getTranslations } from "./server";

// Client-side (re-exported for convenience, but should import from ./client directly in client components)
export { useTranslation, changeLanguage } from "./client";
