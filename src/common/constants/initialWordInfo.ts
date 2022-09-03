import { IUserWord } from './../types/interfaces';

const initialOptional = {
  learningProgress: 0,
  percentCorrectAnswers: 0,
  isNew: true,
  isLearned: false,
};

export const initialWordInfo: IUserWord = {
  difficulty: false,
  optional: { ...initialOptional },
};
