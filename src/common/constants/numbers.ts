import { LanguageLevels } from '../types/enums';
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

const getDifficulties = () => {
  return Object.values(DifficultyLevel).filter(
    (key) => !isNaN(Number(key))
  ) as DifficultyLevel[];
};

export const difficulties = getDifficulties();

const getLanguageLevels = () => {
  const obj: { [key: string]: LanguageLevels } = {};
  const levels = Object.values(LanguageLevels);
  difficulties.forEach((difficulty) => {
    obj[difficulty] = levels[difficulty];
  });
  return obj;
};

export const languageLevels = getLanguageLevels();
