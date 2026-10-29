export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "fr" || value === "en";
}

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) {
    return DEFAULT_LOCALE;
  }
  const primary = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("en")) {
    return "en";
  }
  return DEFAULT_LOCALE;
}
