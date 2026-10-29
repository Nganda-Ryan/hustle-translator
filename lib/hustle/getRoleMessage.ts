import type { Rank } from "@/lib/types/hustle";

export function getRoleMessage(
  rank: Rank,
  role: string,
  fallbackRole: string
): string {
  const messages = rank.roleMessages;
  if (messages[role]) {
    return messages[role];
  }
  return messages[fallbackRole] ?? messages.other ?? "";
}
