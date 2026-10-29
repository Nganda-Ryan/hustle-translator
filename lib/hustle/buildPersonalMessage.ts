import type { Rank } from "@/lib/types/hustle";

export function buildPersonalMessage(
  rank: Rank,
  roleMessage: string
): string {
  const { messagePrefix, messageSuffix } = rank.personalization;
  return [messagePrefix, roleMessage, messageSuffix].filter(Boolean).join(" ");
}
