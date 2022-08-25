import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DifficultyLevel } from '../../common/types/enums';
import { SLICE_NAMES } from '../../common/constants/sliceNames';

const initialState = {
  value: DifficultyLevel.LEVEL_0,
};

const difficultySlice = createSlice({
  name: SLICE_NAMES.difficulty,
  initialState,
  reducers: {
    difficultyChanged: (state, action: PayloadAction<number>) => {
      state.value = Number(action.payload);
    },
  },
});

export const { difficultyChanged } = difficultySlice.actions;
export default difficultySlice.reducer;
