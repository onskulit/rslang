import { GamesType } from './../types/enums';
import { getCurrentDate } from './../../utils/getDate';
import { IStatisticData } from './../types/interfaces';

const defaultGameStatistics = {
  newWordsAmount: 0,
  rightWords: 0,
  wrongWords: 0,
  maxStreak: 0,
};
export const defaultStatistics: IStatisticData = {
  learnedWords: 0,
  optional: {
    daily: {
      [getCurrentDate()]: {
        textbook: {
          newWordsAmount: 0,
          percentCorrectAnswers: 0,
        },
        [GamesType.sprint]: defaultGameStatistics,
        [GamesType.audition]: defaultGameStatistics,
      },
    },
  },
};
