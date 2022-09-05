import { statisticsAPI } from './../features/api/statisticsSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import sprintReducer from '../features/sprint/sprintSlice';
import { userAPI } from '../features/api/userSlice';
import difficultyReducer from '../features/difficulty/difficultySlice';
import userReducer from '../features/user/userSlice';
import gameStatusReducer from '../features/gameStatus/gameStatusSlice';

export const store = configureStore({
  reducer: {
    difficulty: difficultyReducer,
    gameStatus: gameStatusReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [statisticsAPI.reducerPath]: statisticsAPI.reducer,
    sprint: sprintReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      userAPI.middleware,
      statisticsAPI.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
