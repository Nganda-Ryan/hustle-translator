export type RoleOption = {
  value: string;
  label: string;
  description: string;
};

export type RankColors = {
  primary: string;
  secondary: string;
  accent: string;
};

export type RankLogo = {
  id: string;
  file: string;
  alt: string;
  symbol: string;
  description: string;
};

export type Rank = {
  level: number;
  id: string;
  minYears: number;
  maxYears: number | null;
  tier: string;
  prestige: number;
  name: string;
  shortTitle: string;
  ceremonialTitle: string;
  englishTitle: string;
  logo: RankLogo;
  colors: RankColors;
  insignia: string[];
  motto: string;
  mottoTranslation: string;
  ceremony: string;
  proclamation: string;
  virtues: string[];
  achievements: string[];
  roleMessages: Record<string, string>;
  personalization: {
    titleTemplate: string;
    messagePrefix: string;
    messageSuffix: string;
  };
};

export type HustleData = {
  project: {
    id: string;
    name: string;
    version: string;
    universe: string;
    language: string;
    description: string;
    lore: {
      kingdom: string;
      guild: string;
      royalOrder: string;
      intro: string;
      closing: string;
    };
    evaluation: {
      primaryFactor: string;
      secondaryFactor: string;
      experienceUnit: string;
      rounding: string;
      minExperience: number;
      maxExperience: number;
      rankingNote: string;
    };
  };
  inputs: {
    role: {
      id: string;
      label: string;
      placeholder: string;
      type: string;
      required: boolean;
      options: RoleOption[];
    };
    yearsOfExperience: {
      id: string;
      label: string;
      placeholder: string;
      type: string;
      required: boolean;
      min: number;
      max: number;
      step: number;
      helpText: string;
    };
  };
  rankRules: {
    matching: string;
    minInclusive: boolean;
    maxInclusive: boolean;
    invalidInputMessage: string;
    unknownRoleFallback: string;
    rankNotFoundMessage: string;
  };
  ranks: Rank[];
  resultTemplate: {
    eyebrow: string;
    heading: string;
    rankLabel: string;
    roleLabel: string;
    experienceLabel: string;
    proclamationLabel: string;
    specializationLabel: string;
    virtuesLabel: string;
    achievementsLabel: string;
    mottoLabel: string;
    shareTextTemplate: string;
    footer: string;
  };
};

export type HustleResult = {
  rank: Rank;
  roleValue: string;
  roleLabel: string;
  years: number;
  fullName: string;
  roleMessage: string;
  personalMessage: string;
};
