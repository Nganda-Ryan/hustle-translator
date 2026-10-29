"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/locales";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="lang-switch" role="group" aria-label={t("languageLabel")}>
      {(["fr", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-btn${locale === code ? " active" : ""}`}
          aria-pressed={locale === code}
          onClick={() => setLocale(code as Locale)}
        >
          {code === "fr" ? t("languageFr") : t("languageEn")}
        </button>
      ))}
    </div>
  );
}
