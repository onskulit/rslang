import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SprintState {
  words: string[];
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
    addWord(state, action: PayloadAction<string>) {
      state.words.push(action.payload);
    },
  },
});

export default sprintSlice.reducer;
