import type { HustleResult } from "@/lib/types/hustle";

export function getDisplayPhrase(
  result: HustleResult,
  variantIndex: number
): string {
  const options = [
    result.personalMessage,
    result.roleMessage,
    `« ${result.rank.mottoTranslation} »`,
  ];
  return options[variantIndex % options.length];
}
