/**
 * i18n Configuration
 *
 * ╔════════════════════════════════════════════════════════════════════════════╗
 * ║                    THÊM NGÔN NGỮ MỚI? CHỈ SỬA FILE NÀY!                    ║
 * ╠════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                            ║
 * ║  Bước 1: Thêm locale code vào mảng LANGUAGES bên dưới                      ║
 * ║          Ví dụ: ["en", "vi", "ja", "ko"]                                   ║
 * ║                                                                            ║
 * ║  Bước 2: Tạo folder trong app/[locale]/i18n/locales/{locale}/              ║
 * ║          Copy các file JSON từ /en/ và dịch                                ║
 * ║                                                                            ║
 * ║  Bước 3: (Optional) Thêm metadata vào data/localeMetadata.ts               ║
 * ║                                                                            ║
 * ║  DONE! Không cần sửa middleware, không cần sửa code khác.                  ║
 * ║                                                                            ║
 * ╚════════════════════════════════════════════════════════════════════════════╝
 *
 * Single source of truth for all i18n settings.
 * This file is importable by both middleware.ts and app code.
 */

// =============================================================================
// LANGUAGES - Thêm ngôn ngữ mới ở đây
// =============================================================================

/**
 * Supported languages
 * Thêm locale code mới vào đây (ví dụ: "ja", "ko", "zh", "fr", "de")
 */
export const LANGUAGES = ["en", "vi", "fr"] as const;

/**
 * Default/fallback language
 * Ngôn ngữ mặc định khi không detect được
 */
export const DEFAULT_LOCALE = "en" as const;

// =============================================================================
// Derived Types & Constants (KHÔNG CẦN SỬA)
// =============================================================================

/** Locale type union */
export type Locale = (typeof LANGUAGES)[number];

/** Fallback language (alias for DEFAULT_LOCALE) */
export const fallbackLng = DEFAULT_LOCALE;

/** All supported languages */
export const languages = LANGUAGES;

/** Default namespace for translations */
export const defaultNS = "common";

/** Cookie name for storing locale preference */
export const cookieName = "NEXT_LOCALE";

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return LANGUAGES.includes(locale as Locale);
}

/**
 * Get i18next options
 */
export function getOptions(
  lng: Locale = DEFAULT_LOCALE,
  ns: string | string[] = defaultNS
) {
  return {
    supportedLngs: LANGUAGES,
    fallbackLng: DEFAULT_LOCALE,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

// =============================================================================
// Language Display Names (for UI)
// =============================================================================

/**
 * Human-readable names for each language
 * Used in language switcher UI
 */
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  fr: "Français",
};

/**
 * Native names (in their own language)
 */
export const LANGUAGE_NATIVE_NAMES: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  fr: "Français",
};

/**
 * Flag emoji for each language (optional, for UI)
 */
export const LANGUAGE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  vi: "🇻🇳",
  fr: "🇫🇷",
};
