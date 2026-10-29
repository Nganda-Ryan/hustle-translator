"use client";

import { useEffect } from "react";
import { LocaleProvider, useLocale } from "@/components/i18n/LocaleProvider";
import { HustleTranslator } from "@/components/hustle/HustleTranslator";
import { useHustleData } from "@/hooks/useHustleData";

function DocumentLocaleSync() {
  const { locale, messages } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = messages.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", messages.meta.description);
    }
  }, [locale, messages.meta.description, messages.meta.title]);

  return null;
}

function HomeContent() {
  const { messages } = useLocale();
  const state = useHustleData();

  if (state.status === "loading") {
    return (
      <div className="stage flex min-h-[50vh] items-center justify-center">
        <p className="lead">{messages.loading}</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="stage flex min-h-[50vh] items-center justify-center">
        <p className="lead">{state.message}</p>
      </div>
    );
  }

  return <HustleTranslator data={state.data} />;
}

export default function Home() {
  return (
    <LocaleProvider>
      <DocumentLocaleSync />
      <HomeContent />
    </LocaleProvider>
  );
}
