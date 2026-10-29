export const ROLE_EMOJIS: Record<string, string> = {
  frontend: "🎨",
  backend: "⚙️",
  fullstack: "⚔️",
  mobile: "📯",
  devops: "🌉",
  software_engineer: "🏗️",
  data_engineer: "⚗️",
  ai_engineer: "🔮",
  game_developer: "🎲",
  qa_engineer: "🛡️",
  security_engineer: "🔐",
  tech_lead: "👑",
  other: "✨",
};

export function roleEmoji(value: string): string {
  return ROLE_EMOJIS[value] ?? "⚔️";
}
