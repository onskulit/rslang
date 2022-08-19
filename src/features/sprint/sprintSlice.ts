import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '../../common/types/interfaces';
import shuffleFisherYates from '../../common/utils/shuffleFisherYates';

interface SprintState {
  words: [string, string, boolean][];
  isLoading: boolean;
  error: string;
  currentWord: number;
  scoreForCorrectAnswer: number;
  totalScore: number;
  streak: number;
}

const initialState: SprintState = {
  words: [],
  isLoading: false,
  error: '',
  currentWord: 0,
  scoreForCorrectAnswer: 20,
  totalScore: 0,
  streak: 0,
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    createPares(state, action: PayloadAction<Word[]>) {
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
        state.totalScore += state.scoreForCorrectAnswer;
        state.streak++;
      } else {
        state.streak = 0;
      }
      if (state.words.length - 1 === state.currentWord) {
        return;
      } else {
        state.currentWord++;
      }
    },
  },
});

export default sprintSlice.reducer;
