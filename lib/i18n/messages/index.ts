import type { Locale } from "@/lib/i18n/locales";
import type { UiMessages } from "@/lib/i18n/messages/types";
import { enMessages } from "@/lib/i18n/messages/en";
import { frMessages } from "@/lib/i18n/messages/fr";

const catalogs: Record<Locale, UiMessages> = {
  fr: frMessages,
  en: enMessages,
};

export function getUiMessages(locale: Locale): UiMessages {
  return catalogs[locale];
}

export function formatMessage(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? `{${key}}`)
  );
}

export type { UiMessages } from "@/lib/i18n/messages/types";
