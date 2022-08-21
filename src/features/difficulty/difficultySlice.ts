import { createSlice } from '@reduxjs/toolkit';
import { DifficultyLevel } from '../../common/types/enums';

const initialState = {
  value: DifficultyLevel.LEVEL_0,
};

const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    difficultyChanged: (state, action) => {
      state.value = Number(action.payload);
    },
  },
});

export const { difficultyChanged } = difficultySlice.actions;
export default difficultySlice.reducer;
