import { API, BASE_URL, HEADERS, METHODS } from '../../common/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IGameStatistic {
  newWordsAmount: number;
  rightWords: number;
  wrongWords: number;
  maxStreak: number;
}

interface IStatisticData {
  learnedWords: number;
  optional: {
    textbook: {
      newWordsAmount: number;
      percentCorrectAnswers: number;
    };
    sprint: IGameStatistic;
    audiocall: IGameStatistic;
  };
}

interface IUserStatistic {
  userId: string;
  token: string;
  body: IStatisticData;
}

interface IUserStatisticQuery {
  userId: string;
  token: string;
}

export const statisticsAPI = createApi({
  reducerPath: 'statistics',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDailyStatistic: builder.query<IUserStatistic, IUserStatisticQuery>({
      query: ({ userId, token }) => ({
        url: `${API.users}/${userId}/${API.statistics}`,
        headers: {
          Authorization: HEADERS.authorization(token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
      }),
    }),
    dailyStatistic: builder.mutation<IUserStatistic, Partial<IUserStatistic>>({
      query: ({ userId, token, body }) => ({
        url: `${API.users}/${userId}/${API.statistics}`,
        method: METHODS.put,
        headers: {
          Authorization: HEADERS.authorization(token as string),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
        body: body,
      }),
    }),
  }),
});

export const { useDailyStatisticMutation, useGetDailyStatisticQuery } =
  statisticsAPI;
