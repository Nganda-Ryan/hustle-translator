import type { HustleData } from "@/lib/types/hustle";

export type ExperienceValidation =
  | { ok: true; years: number }
  | { ok: false; message: string };

export function validateExperience(
  raw: string,
  data: HustleData
): ExperienceValidation {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return { ok: false, message: data.rankRules.invalidInputMessage };
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    return { ok: false, message: data.rankRules.invalidInputMessage };
  }

  const { minExperience, maxExperience } = data.project.evaluation;
  if (parsed < minExperience || parsed > maxExperience) {
    return { ok: false, message: data.rankRules.invalidInputMessage };
  }

  return { ok: true, years: parsed };
}
