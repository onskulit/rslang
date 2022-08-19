import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '../../common/types/interfaces';
import shuffleFisherYates from '../../common/utils/shuffleFisherYates';

interface SprintState {
  words: [string, string, boolean][];
  isLoading: boolean;
  error: string;
}

const initialState: SprintState = {
  words: [],
  isLoading: false,
  error: '',
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
  },
});

export default sprintSlice.reducer;
