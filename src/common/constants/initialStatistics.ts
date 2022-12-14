import { GamesType } from '../types/enums';
import { getCurrentDate } from '../utils/getCurrentDate';
import { IDailyStatistics, IStatisticData } from '../types/interfaces';

const initialGameStatistics = {
  isPlayed: false,
  newWordsAmount: 0,
  rightWords: 0,
  wrongWords: 0,
  maxStreak: 0,
};

export const initialDailyStatistics: IDailyStatistics = {
  learnedWords: 0,
  textbook: {
    newWordsAmount: 0,
    percentCorrectAnswers: 0,
  },
  [GamesType.sprint]: { ...initialGameStatistics },
  [GamesType.audition]: { ...initialGameStatistics },
};

export const initialStatistics: IStatisticData = {
  learnedWords: 0,
  optional: {
    daily: {
      [getCurrentDate()]: { ...initialDailyStatistics },
    },
  },
};
