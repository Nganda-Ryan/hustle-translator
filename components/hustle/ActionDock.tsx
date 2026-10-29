"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

type SetupProps = {
  mode: "setup";
  setupStep: 1 | 2;
  previewTitle: string;
  previewHint: string;
  error: string | null;
  disabled: boolean;
  continueDisabled: boolean;
  onForge: () => void;
  onContinue: () => void;
  onBack: () => void;
};

type RevealProps = {
  mode: "reveal";
  previewTitle: string;
  previewHint: string;
  onShare: () => void;
  onModify: () => void;
};

type Props = SetupProps | RevealProps;

export function ActionDock(props: Props) {
  const { t } = useLocale();

  return (
    <div
      className="action-dock"
      data-setup-step={props.mode === "setup" ? props.setupStep : undefined}
    >
      <div className="dock-preview" aria-live="polite">
        <div className="t">{props.previewTitle}</div>
        <div className="n">{props.previewHint}</div>
      </div>

      {props.mode === "setup" ? (
        <>
          {props.error ? (
            <p className="form-error" role="alert">
              {props.error}
            </p>
          ) : null}
          <button
            className="cta dock-desktop-forge"
            type="button"
            disabled={props.disabled}
            onClick={props.onForge}
          >
            {t("forgeTitle")}
          </button>
          <button
            className="cta dock-mobile-continue"
            type="button"
            disabled={props.continueDisabled}
            onClick={props.onContinue}
          >
            {t("continue")}
          </button>
          <div className="dock-actions dock-mobile-identity">
            <button
              className="cta"
              type="button"
              disabled={props.disabled}
              onClick={props.onForge}
            >
              {t("forgeTitle")}
            </button>
            <button className="cta ghost" type="button" onClick={props.onBack}>
              {t("back")}
            </button>
          </div>
        </>
      ) : (
        <div className="dock-actions">
          <button className="cta" type="button" onClick={props.onShare}>
            <span className="share-label-full">{t("shareFull")}</span>
            <span className="share-label-short">{t("shareShort")}</span>
          </button>
          <button className="cta ghost" type="button" onClick={props.onModify}>
            {t("modify")}
          </button>
        </div>
      )}
    </div>
  );
}
