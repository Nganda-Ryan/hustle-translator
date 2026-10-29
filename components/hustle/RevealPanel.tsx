"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { HustleData, HustleResult } from "@/lib/types/hustle";
import { getMedailPath } from "@/lib/hustle/medailPath";
import { getDisplayPhrase } from "@/lib/hustle/getDisplayPhrase";
import { ConfettiBurst } from "@/components/hustle/ConfettiBurst";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";

type Props = {
  data: HustleData;
  result: HustleResult;
  play: boolean;
};

export function RevealPanel({ data, result, play }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { messages } = useLocale();
  const { rank } = result;
  const phrase = getDisplayPhrase(result, 0);

  useEffect(() => {
    if (play && titleRef.current) {
      titleRef.current.focus({ preventScroll: true });
    }
  }, [play]);

  const style = {
    "--rank-primary": rank.colors.primary,
    "--rank-secondary": rank.colors.secondary,
    "--rank-accent": rank.colors.accent,
  } as CSSProperties;

  const yearsLabel =
    result.years +
    " " +
    (result.years > 1 ? messages.yearMany : messages.yearOne);

  return (
    <section
      className={`parch reveal${play ? " play" : ""}`}
      id="reveal"
      aria-live="polite"
      style={style}
    >
      {play ? <ConfettiBurst active colors={rank.colors} /> : null}

      <div className="crest">
        <Image
          src={getMedailPath(rank.level)}
          alt={rank.logo.alt}
          width={200}
          height={200}
          priority
          className="reveal-medail"
        />
      </div>
      <p className="rname">{result.fullName}</p>
      <p className="lvl">
        {formatMessage(messages.levelLine, {
          level: rank.level,
          years: yearsLabel,
        })}
      </p>
      <h2 className="rtitle" ref={titleRef} tabIndex={-1}>
        {rank.shortTitle}
      </h2>
      <p className="phrase">{phrase}</p>

      <details className="proclaim-block" open>
        <summary>{data.resultTemplate.proclamationLabel}</summary>
        <p>{rank.proclamation}</p>
      </details>
    </section>
  );
}
