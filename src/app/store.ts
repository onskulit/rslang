import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { apiSlice } from '../features/api/apiSlice';
import sprintReducer from '../features/sprint/sprintSlice';
import { userAPI } from './services/UserService';
import difficultyReducer from '../features/difficulty/difficultySlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    difficulty: difficultyReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    sprint: sprintReducer,
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
