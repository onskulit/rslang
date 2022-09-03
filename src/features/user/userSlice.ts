import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../../common/constants/sliceNames';

const initialState = {
  authData: {},
  validate: false,
  validationData: {},
};

const userSlice = createSlice({
  name: SLICE_NAMES.validation,
  initialState,
  reducers: {
    changeValidation: (state, action: PayloadAction<boolean>) => {
      state.validate = action.payload;
    },
  },
});

export const { changeValidation } = userSlice.actions;
export default userSlice.reducer;
