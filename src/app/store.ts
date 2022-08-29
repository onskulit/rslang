import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { apiSlice } from '../features/api/apiSlice';
import sprintReducer from '../features/sprint/sprintSlice';
import difficultyReducer from '../features/difficulty/difficultySlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    difficulty: difficultyReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    sprint: sprintReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
