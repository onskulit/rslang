import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  authData: {},
  validate: false,
  validationData: {},
};

const userSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    changeValidation: (state, action: PayloadAction<boolean>) => {
      state.validate = action.payload;
    },
  },
});

export const { changeValidation } = userSlice.actions;
export default userSlice.reducer;
