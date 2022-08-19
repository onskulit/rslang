import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '../../common/types/interfaces';

interface SprintState {
  words: [string, string][];
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
      action.payload.forEach((word) => {
        state.words.push([word.word, word.wordTranslate]);
      });
    },
  },
});

export default sprintSlice.reducer;
