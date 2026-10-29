import type { UiMessages } from "@/lib/i18n/messages/types";

export const FULL_NAME_MAX_LENGTH = 80;

export type FullNameValidation =
  | { ok: true; fullName: string }
  | { ok: false; message: string };

export function validateFullName(
  raw: string,
  ui: Pick<UiMessages, "fullNameRequired" | "fullNameTooLong">
): FullNameValidation {
  const fullName = raw.trim().replace(/\s+/g, " ");
  if (!fullName) {
    return {
      ok: false,
      message: ui.fullNameRequired,
    };
  }
  if (fullName.length > FULL_NAME_MAX_LENGTH) {
    return {
      ok: false,
      message: ui.fullNameTooLong.replace(
        "{max}",
        String(FULL_NAME_MAX_LENGTH)
      ),
    };
  }
  return { ok: true, fullName };
}
