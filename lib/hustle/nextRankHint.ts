import { findRank } from "@/lib/hustle/findRank";
import type { Rank } from "@/lib/types/hustle";
import { formatMessage, type UiMessages } from "@/lib/i18n/messages";

function formatYears(years: number, ui: UiMessages): string {
  const unit = years > 1 ? ui.yearMany : ui.yearOne;
  return `${years} ${unit}`;
}

export function nextRankHint(
  years: number,
  ranks: Rank[],
  ui: UiMessages
): string {
  const current = findRank(years, ranks);
  if (!current) {
    return ui.presentYears;
  }

  if (current.level >= 10) {
    return ui.nextRankMax;
  }

  const next = ranks.find((r) => r.level === current.level + 1);
  if (!next) {
    return ui.nextRankMax;
  }

  const need = next.minYears - years;
  if (need <= 0) {
    return formatMessage(ui.nextRankSoon, { title: next.shortTitle });
  }

  const unit = need > 1 ? ui.yearMany : ui.yearOne;
  return formatMessage(ui.nextRankNeedYears, {
    title: next.shortTitle,
    count: need,
    unit,
  });
}

export function roadCaption(
  years: number,
  ranks: Rank[],
  forged: boolean,
  ui: UiMessages
): string {
  const current = findRank(years, ranks);
  const level = current?.level ?? 1;

  if (level >= 10) {
    return ui.roadMax;
  }

  const remaining = 10 - level;
  const base = forged
    ? formatMessage(ui.roadForged, { level })
    : formatMessage(ui.roadPreview, { level });

  const tail =
    remaining > 1
      ? formatMessage(ui.roadRemainingMany, { count: remaining })
      : formatMessage(ui.roadRemainingOne, { count: remaining });

  return `${base} ${tail}`;
}
