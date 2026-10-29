"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { buildHustleResult } from "@/lib/hustle/buildHustleResult";
import { findRank } from "@/lib/hustle/findRank";
import { formatShareText } from "@/lib/hustle/formatShareText";
import { getDisplayPhrase } from "@/lib/hustle/getDisplayPhrase";
import { nextRankHint } from "@/lib/hustle/nextRankHint";
import {
  buildProfileShareUrl,
  clearProfileShareUrl,
  readProfileShareParamsFromLocation,
} from "@/lib/hustle/shareUrl";
import { FULL_NAME_MAX_LENGTH } from "@/lib/hustle/validateFullName";
import type { HustleData, HustleResult } from "@/lib/types/hustle";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { ActionDock } from "@/components/hustle/ActionDock";
import { RevealPanel } from "@/components/hustle/RevealPanel";
import { RoleChipStrip } from "@/components/hustle/RoleChipStrip";
import { Toast } from "@/components/hustle/Toast";
import { YearsSlider } from "@/components/hustle/YearsSlider";

type Props = {
  data: HustleData;
};

type SharedProfile = { role: string; years: number; fullName: string };

type Session = SharedProfile & {
  setupStep: 1 | 2;
  error: string | null;
  forged: boolean;
  playReveal: boolean;
};

const SERVER_SHARED_PROFILE: SharedProfile | null = null;

let profileCache: {
  search: string;
  rolesKey: string;
  value: SharedProfile | null;
} | null = null;

function readSharedProfile(
  validRoles: ReadonlySet<string>,
  rolesKey: string
): SharedProfile | null {
  const search = window.location.search;
  if (
    profileCache &&
    profileCache.search === search &&
    profileCache.rolesKey === rolesKey
  ) {
    return profileCache.value;
  }
  const value = readProfileShareParamsFromLocation(validRoles);
  profileCache = { search, rolesKey, value };
  return value;
}

export function HustleTranslator({ data }: Props) {
  const { locale, messages, t } = useLocale();

  const defaultRole =
    data.inputs.role.options.find((o) => o.value === "fullstack")?.value ??
    data.inputs.role.options[0]?.value ??
    "";

  const validRoles = useMemo(
    () => new Set(data.inputs.role.options.map((o) => o.value)),
    [data.inputs.role.options]
  );

  const [session, setSession] = useState<Session | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rolesKey = useMemo(
    () => [...validRoles].sort().join("\0"),
    [validRoles]
  );

  const subscribeProfile = useCallback((onStoreChange: () => void) => {
    window.addEventListener("popstate", onStoreChange);
    return () => window.removeEventListener("popstate", onStoreChange);
  }, []);

  const getSharedProfile = useCallback(
    () => readSharedProfile(validRoles, rolesKey),
    [rolesKey, validRoles]
  );

  const urlProfile = useSyncExternalStore(
    subscribeProfile,
    getSharedProfile,
    () => SERVER_SHARED_PROFILE
  );

  const urlResult = useMemo(() => {
    if (!urlProfile) {
      return null;
    }
    const built = buildHustleResult(
      data,
      urlProfile.role,
      String(urlProfile.years),
      urlProfile.fullName,
      messages
    );
    return built.ok ? built.result : null;
  }, [data, urlProfile, messages]);

  const sessionResult = useMemo(() => {
    if (!session?.forged) {
      return null;
    }
    const built = buildHustleResult(
      data,
      session.role,
      String(session.years),
      session.fullName,
      messages
    );
    return built.ok ? built.result : null;
  }, [session, data, messages]);

  const role = session?.role ?? urlProfile?.role ?? defaultRole;
  const years = session?.years ?? urlProfile?.years ?? 3;
  const fullName = session?.fullName ?? urlProfile?.fullName ?? "";
  const setupStep = session?.setupStep ?? 1;
  const error = session?.error ?? null;
  const forged = session ? session.forged : urlResult !== null;
  const result = session?.forged ? sessionResult : urlResult;
  const playReveal = session ? session.playReveal : urlResult !== null;

  const edit = useCallback(
    (patch: Partial<Session>) => {
      setSession((current) => {
        const base: Session = current ?? {
          role: urlProfile?.role ?? defaultRole,
          years: urlProfile?.years ?? 3,
          fullName: urlProfile?.fullName ?? "",
          setupStep: 1,
          error: null,
          forged: false,
          playReveal: false,
        };
        return { ...base, ...patch };
      });
    },
    [defaultRole, urlProfile]
  );

  const previewRank = useMemo(
    () => findRank(years, data.ranks),
    [years, data.ranks]
  );

  const previewTitle =
    forged && result
      ? result.rank.shortTitle
      : previewRank
        ? previewRank.shortTitle
        : t("chooseSpecialty");

  const previewHint =
    forged && result
      ? nextRankHint(result.years, data.ranks, messages)
      : "";

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const revealResult = useCallback(
    (built: HustleResult, syncUrl: boolean) => {
      edit({
        role: built.roleValue,
        years: built.years,
        fullName: built.fullName,
        error: null,
        forged: true,
        playReveal: false,
      });
      requestAnimationFrame(() => {
        setSession((current) =>
          current ? { ...current, playReveal: true } : current
        );
      });
      if (syncUrl) {
        profileCache = null;
        window.history.replaceState(
          null,
          "",
          buildProfileShareUrl(
            built.roleValue,
            built.years,
            built.fullName,
            locale
          )
        );
      }
    },
    [edit, locale]
  );

  const handleForge = () => {
    const built = buildHustleResult(
      data,
      role,
      String(years),
      fullName,
      messages
    );
    if (!built.ok) {
      edit({ error: built.message });
      return;
    }
    revealResult(built.result, true);
  };

  const handleModify = () => {
    setSession({
      role,
      years,
      fullName,
      setupStep: 1,
      error: null,
      forged: false,
      playReveal: false,
    });
    profileCache = null;
    clearProfileShareUrl();
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }
    const url = buildProfileShareUrl(
      result.roleValue,
      result.years,
      result.fullName,
      locale
    );
    const phrase = getDisplayPhrase(result, 0);
    const text = formatShareText(data, result, phrase);

    try {
      if (navigator.share) {
        await navigator.share({
          title: result.rank.shortTitle,
          text,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast(t("toastLinkCopied"));
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        showToast(t("toastLinkCopied"));
      } catch {
        showToast(t("toastCopyFailed"));
      }
    }
  };

  const isleClass = "isle";
  const canForge = Boolean(role && fullName.trim());

  return (
    <>
      <main className="stage">
        <header className="stage-header">
          <div className="sign">
            <h1>{t("appTitle")}</h1>
            <LanguageSwitcher />
          </div>
          <p className="lead">{t("lead")}</p>
        </header>

        <div className={isleClass}>
          <div className="isle-body">
            {!forged ? (
              <section
                className="parch setup-panel"
                id="setup"
                aria-labelledby="h-setup"
                data-step={setupStep}
              >
                <h2 id="h-setup">{t("setupTitle")}</h2>
                <p className="hint">{t("setupHint")}</p>

                <div className="setup-step-1">
                  <div className="setup-roles-scroll">
                    <p className="q" id="q-role">
                      <b>{t("roleQuestion")}</b>
                    </p>
                    <RoleChipStrip
                      options={data.inputs.role.options}
                      value={role}
                      onChange={(next) => edit({ role: next })}
                      labelId="q-role"
                    />
                  </div>
                </div>

                <div className="setup-step-2">
                  <div className="setup-name-block">
                    <p className="q" id="q-name">
                      <b>{t("nameQuestion")}</b>
                    </p>
                    <input
                      id="full-name"
                      className="name-input"
                      type="text"
                      autoComplete="name"
                      maxLength={FULL_NAME_MAX_LENGTH}
                      value={fullName}
                      aria-labelledby="q-name"
                      placeholder={t("namePlaceholder")}
                      onChange={(e) => edit({ fullName: e.target.value })}
                    />
                  </div>

                  <div className="setup-years-block">
                    <p className="q" id="q-years">
                      <b>{t("yearsQuestion")}</b>
                    </p>
                    <YearsSlider
                      value={years}
                      min={data.inputs.yearsOfExperience.min}
                      max={data.inputs.yearsOfExperience.max}
                      labelId="q-years"
                      yearOne={messages.yearOne}
                      yearMany={messages.yearMany}
                      onChange={(next) => edit({ years: next })}
                    />
                  </div>
                </div>
              </section>
            ) : result ? (
              <RevealPanel data={data} result={result} play={playReveal} />
            ) : null}
          </div>

          {forged ? (
            <ActionDock
              mode="reveal"
              previewTitle={previewTitle}
              previewHint={previewHint}
              onShare={handleShare}
              onModify={handleModify}
            />
          ) : (
            <ActionDock
              mode="setup"
              setupStep={setupStep}
              previewTitle={previewTitle}
              previewHint={previewHint}
              error={error}
              disabled={!canForge}
              continueDisabled={!role}
              onForge={handleForge}
              onContinue={() => edit({ error: null, setupStep: 2 })}
              onBack={() => edit({ error: null, setupStep: 1 })}
            />
          )}

        </div>

        <details className="foot-legal">
          <summary>{t("footLegalSummary")}</summary>
          {data.resultTemplate.footer}
        </details>
      </main>
      <Toast message={toast} />
    </>
  );
}
