export const INITIAL_VALUE = 0;
export const MAX_PAGE = 29;

export enum DifficultyLevel {
  LEVEL_0,
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  LEVEL_4,
  LEVEL_5,
}

export enum LanguageLevels {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export const difficulties: DifficultyLevel[] = [
  DifficultyLevel.LEVEL_0,
  DifficultyLevel.LEVEL_1,
  DifficultyLevel.LEVEL_2,
  DifficultyLevel.LEVEL_3,
  DifficultyLevel.LEVEL_4,
  DifficultyLevel.LEVEL_5,
];

export const languageLevels = {
  [DifficultyLevel.LEVEL_0]: LanguageLevels.A1,
  [DifficultyLevel.LEVEL_1]: LanguageLevels.A2,
  [DifficultyLevel.LEVEL_2]: LanguageLevels.B1,
  [DifficultyLevel.LEVEL_3]: LanguageLevels.B2,
  [DifficultyLevel.LEVEL_4]: LanguageLevels.C1,
  [DifficultyLevel.LEVEL_5]: LanguageLevels.C2,
};
