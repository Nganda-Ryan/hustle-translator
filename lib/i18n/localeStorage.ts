import { isLocale, type Locale } from "@/lib/i18n/locales";

const STORAGE_KEY = "medail-locale";

export function readLocaleFromSearch(search: string): Locale | null {
  const params = new URLSearchParams(search);
  const lang = params.get("lang");
  return isLocale(lang) ? lang : null;
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function persistLocale(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

export function setLocaleInUrl(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  if (locale === "fr") {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", locale);
  }
  window.history.replaceState(null, "", url.toString());
}

export function resolveClientLocale(): Locale {
  if (typeof window === "undefined") {
    return "fr";
  }
  return (
    readLocaleFromSearch(window.location.search) ??
    readStoredLocale() ??
    (navigator.language.toLowerCase().startsWith("en") ? "en" : "fr")
  );
}
