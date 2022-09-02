import { IStatisticData } from './../../common/types/interfaces';
import { API, BASE_URL, HEADERS, METHODS } from '../../common/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    getDailyStatistics: builder.query<IUserStatistic, IUserStatisticQuery>({
      query: ({ userId, token }) => ({
        url: `${API.users}/${userId}/statistics`,
        headers: {
          Authorization: HEADERS.authorization(token),
          Accept: HEADERS.accept,
          'Content-Type': HEADERS.contentType,
        },
      }),
    }),
    updateDailyStatistics: builder.mutation<
      IUserStatistic,
      Partial<IUserStatistic>
    >({
      query: ({ userId, token, body }) => ({
        url: `${API.users}/${userId}/statistics`,
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

export const { useUpdateDailyStatisticsMutation, useGetDailyStatisticsQuery } =
  statisticsAPI;
