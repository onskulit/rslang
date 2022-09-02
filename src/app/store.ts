import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import sprintReducer from '../features/sprint/sprintSlice';
import { userAPI } from './services/UserService';
import difficultyReducer from '../features/difficulty/difficultySlice';
import userReducer from './reducers/userSlice';
import gameStatusReducer from '../features/gameStatus/gameStatusSlice';

export const store = configureStore({
  reducer: {
    difficulty: difficultyReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    sprint: sprintReducer,
    gameStatus: gameStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, userAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
