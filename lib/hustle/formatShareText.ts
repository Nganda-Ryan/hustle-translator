import type { HustleData, HustleResult } from "@/lib/types/hustle";

export function formatShareText(
  data: HustleData,
  result: HustleResult,
  phraseLine: string
): string {
  const template = data.resultTemplate.shareTextTemplate;
  const base = template
    .replace("{ceremonialTitle}", result.rank.ceremonialTitle)
    .replace("{yearsOfExperience}", String(result.years))
    .replace("{mottoTranslation}", result.rank.mottoTranslation);

  return `⚔️ ${result.fullName} — ${result.rank.shortTitle} (niveau ${result.rank.level}/10)\n« ${phraseLine} »\n\n${base}`;
}
