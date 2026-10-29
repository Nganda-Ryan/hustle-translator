import type { HustleData, HustleResult } from "@/lib/types/hustle";
import { buildPersonalMessage } from "@/lib/hustle/buildPersonalMessage";
import { findRank } from "@/lib/hustle/findRank";
import { getRoleMessage } from "@/lib/hustle/getRoleMessage";
import { validateExperience } from "@/lib/hustle/validateExperience";
import {
  validateFullName,
  type FullNameValidation,
} from "@/lib/hustle/validateFullName";
import type { UiMessages } from "@/lib/i18n/messages/types";

export type BuildResult =
  | { ok: true; result: HustleResult }
  | { ok: false; message: string };

export function buildHustleResult(
  data: HustleData,
  roleValue: string,
  yearsRaw: string,
  fullNameRaw: string,
  nameMessages: Pick<UiMessages, "fullNameRequired" | "fullNameTooLong">
): BuildResult {
  if (!roleValue) {
    return {
      ok: false,
      message: data.inputs.role.placeholder,
    };
  }

  const name: FullNameValidation = validateFullName(fullNameRaw, nameMessages);
  if (!name.ok) {
    return { ok: false, message: name.message };
  }

  const experience = validateExperience(yearsRaw, data);
  if (!experience.ok) {
    return { ok: false, message: experience.message };
  }

  const rank = findRank(experience.years, data.ranks);
  if (!rank) {
    return { ok: false, message: data.rankRules.rankNotFoundMessage };
  }

  const fallbackRole = data.rankRules.unknownRoleFallback;
  const roleMessage = getRoleMessage(rank, roleValue, fallbackRole);
  const personalMessage = buildPersonalMessage(rank, roleMessage);

  const roleLabel =
    data.inputs.role.options.find((o) => o.value === roleValue)?.label ??
    roleValue;

  return {
    ok: true,
    result: {
      rank,
      roleValue,
      roleLabel,
      years: experience.years,
      fullName: name.fullName,
      roleMessage,
      personalMessage,
    },
  };
}
