import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserAuthData {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
}

const initialState = {
  authData: {},
  validate: false,
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
