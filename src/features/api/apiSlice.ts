import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface groupsOfWords {
  group?: 0 | 1 | 2 | 3 | 4 | 5;
  page?: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-en.herokuapp.com' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9011' }),
  endpoints: (builder) => ({
    getWords: builder.query({
      query: ({ group, page }: groupsOfWords) =>
        `/words?group=${group}&page=${page}`,
    }),
    getWord: builder.query({
      query: (wordId: string) => `/words/${wordId}`,
    }),
  }),
});

export const { useGetWordsQuery, useGetWordQuery } = apiSlice;
