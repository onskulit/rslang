import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../../common/constants/sliceNames';

const initialState = {
  isRunning: false,
};

const gameStatusReducer = createSlice({
  name: SLICE_NAMES.gameStatus,
  initialState,
  reducers: {
    updateGameStatus: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
  },
});

export const { updateGameStatus } = gameStatusReducer.actions;
export default gameStatusReducer.reducer;
