import type { Rank } from "@/lib/types/hustle";

export function findRank(years: number, ranks: Rank[]): Rank | null {
  const match = ranks.find((rank) => {
    const max = rank.maxYears ?? Number.POSITIVE_INFINITY;
    return years >= rank.minYears && years <= max;
  });
  return match ?? null;
}
