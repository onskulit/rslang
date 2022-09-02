import { GamesType } from './../types/enums';
import { getCurrentDate } from '../utils/getDate';
import { IStatisticData } from './../types/interfaces';

const initialGameStatistics = {
  newWordsAmount: 0,
  rightWords: 0,
  wrongWords: 0,
  maxStreak: 0,
};
export const initialStatistics: IStatisticData = {
  learnedWords: 0,
  optional: {
    daily: {
      [getCurrentDate()]: {
        textbook: {
          newWordsAmount: 0,
          percentCorrectAnswers: 0,
        },
        [GamesType.sprint]: initialGameStatistics,
        [GamesType.audition]: initialGameStatistics,
      },
    },
  },
};
