"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { Locale } from "@/lib/i18n/locales";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import {
  formatMessage,
  getUiMessages,
  type UiMessages,
} from "@/lib/i18n/messages";
import {
  persistLocale,
  readLocaleFromSearch,
  readStoredLocale,
  resolveClientLocale,
  setLocaleInUrl,
} from "@/lib/i18n/localeStorage";

type LocaleContextValue = {
  locale: Locale;
  messages: UiMessages;
  t: (key: keyof UiMessages, vars?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function getLocaleSnapshot(): Locale {
  return resolveClientLocale();
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    () => DEFAULT_LOCALE
  );

  const messages = useMemo(() => getUiMessages(locale), [locale]);

  const t = useCallback(
    (key: keyof UiMessages, vars?: Record<string, string | number>) => {
      const value = messages[key];
      if (typeof value !== "string") {
        return "";
      }
      return vars ? formatMessage(value, vars) : value;
    },
    [messages]
  );

  const setLocale = useCallback((next: Locale) => {
    persistLocale(next);
    setLocaleInUrl(next);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const value = useMemo(
    () => ({ locale, messages, t, setLocale }),
    [locale, messages, t, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useInitialLocaleFromUrl(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }
  return (
    readLocaleFromSearch(window.location.search) ??
    readStoredLocale() ??
    DEFAULT_LOCALE
  );
}
