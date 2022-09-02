import { GamesType } from './enums';
import { DifficultyLevel } from '../types/enums';

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface IWordWithAnswer extends IWord {
  correct?: boolean;
}

export interface IWordsQuery {
  group: DifficultyLevel;
  page: number;
}

export interface DifficultyState {
  difficulty: {
    value: number;
  };
}

export interface IGameStatistic {
  newWordsAmount: number;
  rightWords: number;
  wrongWords: number;
  maxStreak: number;
}

export interface IDailyStatistics {
  textbook: {
    newWordsAmount: number;
    percentCorrectAnswers: number;
  };
  [GamesType.sprint]: IGameStatistic;
  [GamesType.audition]: IGameStatistic;
}
export interface IStatisticData {
  learnedWords: number;
  optional: {
    daily: {
      [date: string]: IDailyStatistics;
    };
  };
}

export interface IUserStatisticsResponse extends IStatisticData {
  userId: string;
}
