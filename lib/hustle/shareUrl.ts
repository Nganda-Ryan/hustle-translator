import { validateFullName } from "@/lib/hustle/validateFullName";
import { getUiMessages } from "@/lib/i18n/messages";
import { isLocale, type Locale } from "@/lib/i18n/locales";

function readLangFromSearch(search: string): Locale {
  const lang = new URLSearchParams(search).get("lang");
  return isLocale(lang) ? lang : "fr";
}

export function buildProfileShareUrl(
  role: string,
  years: number,
  fullName: string,
  locale: Locale = "fr"
): string {
  if (typeof window === "undefined") {
    const lang = locale === "fr" ? "" : `&lang=${locale}`;
    return `/?role=${encodeURIComponent(role)}&years=${years}&name=${encodeURIComponent(fullName)}${lang}`;
  }
  const url = new URL(window.location.href);
  url.searchParams.set("role", role);
  url.searchParams.set("years", String(years));
  url.searchParams.set("name", fullName);
  if (locale === "fr") {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", locale);
  }
  url.hash = "";
  return url.toString();
}

export function clearProfileShareUrl(): void {
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("role");
  url.searchParams.delete("years");
  url.searchParams.delete("name");
  window.history.replaceState(null, "", url.toString());
}

export function parseProfileShareParams(
  role: string | null,
  yearsRaw: string | null,
  nameRaw: string | null,
  validRoles: ReadonlySet<string>,
  locale: Locale = "fr"
): { role: string; years: number; fullName: string } | null {
  if (!role || yearsRaw === null || !validRoles.has(role)) {
    return null;
  }

  const years = Number(yearsRaw);
  if (!Number.isInteger(years) || years < 0 || years > 80) {
    return null;
  }

  const ui = getUiMessages(locale);
  const name = validateFullName(nameRaw ?? "", ui);
  if (!name.ok) {
    return null;
  }

  return { role, years, fullName: name.fullName };
}

export function readProfileShareParamsFromLocation(
  validRoles: ReadonlySet<string>
): { role: string; years: number; fullName: string } | null {
  if (typeof window === "undefined") {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  const locale = readLangFromSearch(window.location.search);
  return parseProfileShareParams(
    params.get("role"),
    params.get("years"),
    params.get("name"),
    validRoles,
    locale
  );
}
