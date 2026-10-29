import type { HustleData, Rank } from "@/lib/types/hustle";

type RoleOptionPatch = {
  label?: string;
  description?: string;
};

type RankPatch = Partial<
  Pick<
    Rank,
    | "name"
    | "shortTitle"
    | "ceremonialTitle"
    | "mottoTranslation"
    | "proclamation"
    | "virtues"
    | "achievements"
    | "roleMessages"
  >
> & {
  logo?: Partial<Rank["logo"]>;
  personalization?: Partial<Rank["personalization"]>;
};

export type LocaleDataPatch = {
  project?: Partial<HustleData["project"]>;
  inputs?: {
    role?: Partial<HustleData["inputs"]["role"]> & {
      options?: Record<string, RoleOptionPatch>;
    };
    yearsOfExperience?: Partial<HustleData["inputs"]["yearsOfExperience"]>;
  };
  rankRules?: Partial<HustleData["rankRules"]>;
  resultTemplate?: Partial<HustleData["resultTemplate"]>;
  ranksById?: Record<string, RankPatch>;
};

function mergeRoleOptions(
  base: HustleData["inputs"]["role"]["options"],
  patch?: Record<string, RoleOptionPatch>
) {
  if (!patch) {
    return base;
  }
  return base.map((option) => {
    const localized = patch[option.value];
    if (!localized) {
      return option;
    }
    return {
      ...option,
      ...localized,
    };
  });
}

function mergeRank(base: Rank, patch?: RankPatch): Rank {
  if (!patch) {
    return {
      ...base,
      shortTitle: base.englishTitle,
      name: base.englishTitle,
    };
  }

  return {
    ...base,
    shortTitle: patch.shortTitle ?? base.englishTitle,
    name: patch.name ?? base.englishTitle,
    ceremonialTitle: patch.ceremonialTitle ?? base.englishTitle,
    mottoTranslation: patch.mottoTranslation ?? base.mottoTranslation,
    proclamation: patch.proclamation ?? base.proclamation,
    virtues: patch.virtues ?? base.virtues,
    achievements: patch.achievements ?? base.achievements,
    roleMessages: patch.roleMessages
      ? { ...base.roleMessages, ...patch.roleMessages }
      : base.roleMessages,
    logo: patch.logo ? { ...base.logo, ...patch.logo } : base.logo,
    personalization: patch.personalization
      ? { ...base.personalization, ...patch.personalization }
      : base.personalization,
  };
}

export function applyLocalePatch(
  data: HustleData,
  patch: LocaleDataPatch | null
): HustleData {
  if (!patch) {
    return data;
  }

  const ranksById = patch.ranksById ?? {};

  return {
    ...data,
    project: patch.project ? { ...data.project, ...patch.project } : data.project,
    inputs: {
      role: patch.inputs?.role
        ? {
            ...data.inputs.role,
            ...patch.inputs.role,
            options: mergeRoleOptions(
              data.inputs.role.options,
              patch.inputs.role.options
            ),
          }
        : data.inputs.role,
      yearsOfExperience: patch.inputs?.yearsOfExperience
        ? {
            ...data.inputs.yearsOfExperience,
            ...patch.inputs.yearsOfExperience,
          }
        : data.inputs.yearsOfExperience,
    },
    rankRules: patch.rankRules
      ? { ...data.rankRules, ...patch.rankRules }
      : data.rankRules,
    resultTemplate: patch.resultTemplate
      ? { ...data.resultTemplate, ...patch.resultTemplate }
      : data.resultTemplate,
    ranks: data.ranks.map((rank) => mergeRank(rank, ranksById[rank.id])),
  };
}

export function localizeHustleData(
  data: HustleData,
  locale: string,
  patch: LocaleDataPatch | null
): HustleData {
  if (locale === "fr") {
    return data;
  }
  if (patch) {
    return applyLocalePatch(data, patch);
  }
  return {
    ...data,
    ranks: data.ranks.map((rank) => mergeRank(rank, undefined)),
  };
}

export async function fetchLocalePatch(
  locale: string
): Promise<LocaleDataPatch | null> {
  if (locale === "fr") {
    return null;
  }
  const res = await fetch(`/datas/i18n/${locale}.json`);
  if (!res.ok) {
    return null;
  }
  return (await res.json()) as LocaleDataPatch;
}
