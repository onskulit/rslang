import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '../../common/types/interfaces';
import shuffleFisherYates from '../../common/utils/shuffleFisherYates';

interface SprintState {
  words: [string, string, boolean][];
  currentWord: number;
  pointsForCorrectAnswer: number;
  totalScore: number;
  streak: number;
  isFinished: boolean;
}

const initialState: SprintState = {
  words: [],
  currentWord: 0,
  pointsForCorrectAnswer: 20,
  totalScore: 0,
  streak: 0,
  isFinished: false,
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    resetGame(state) {
      state.words = [];
      state.currentWord = 0;
      state.pointsForCorrectAnswer = 20;
      state.totalScore = 0;
      state.streak = 0;
      state.isFinished = false;
    },
    createPares(state, action: PayloadAction<Word[]>) {
      state.words = [];
      const words: string[] = [];
      const wordsTranslation: string[] = [];
      action.payload.forEach((word) => {
        words.push(word.word);
        wordsTranslation.push(word.wordTranslate);
      });
      const shuffledTranslation = shuffleFisherYates(wordsTranslation);
      for (let i = 0; i < words.length; i++) {
        state.words.push([
          words[i],
          shuffledTranslation[i],
          shuffledTranslation[i] === wordsTranslation[i],
        ]);
      }
    },
    checkAnswer(state, action: PayloadAction<boolean>) {
      if (action.payload === state.words[state.currentWord][2]) {
        state.totalScore += state.pointsForCorrectAnswer;
        state.streak++;
      } else {
        state.streak = 0;
      }
      if (state.words.length - 1 === state.currentWord) {
        state.isFinished = true;
      } else {
        state.currentWord++;
      }
    },
  },
});

export default sprintSlice.reducer;
