import { DifficultyLevel, LanguageLevels } from '../types/enums';

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
