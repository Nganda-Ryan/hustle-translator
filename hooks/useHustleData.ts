"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { HustleData } from "@/lib/types/hustle";
import {
  fetchLocalePatch,
  localizeHustleData,
} from "@/lib/i18n/mergeLocaleData";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: HustleData };

export function useHustleData(): State {
  const { locale, messages } = useLocale();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ status: "loading" });
      try {
        const res = await fetch("/datas/datas.json");
        if (!res.ok) {
          throw new Error(messages.dataLoadError);
        }
        const base = (await res.json()) as HustleData;
        const patch = await fetchLocalePatch(locale);
        const data = localizeHustleData(base, locale, patch);
        if (!cancelled) {
          setState({ status: "ready", data });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : messages.unexpectedError;
          setState({ status: "error", message });
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [locale, messages.dataLoadError, messages.unexpectedError]);

  return state;
}
