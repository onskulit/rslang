import { createSlice } from '@reduxjs/toolkit';
interface SprintState {
  words: string[];
}

const initialState = {
  words: [],
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {},
});

export default sprintSlice.reducer;
