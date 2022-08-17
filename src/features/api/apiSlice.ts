import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-en.herokuapp.com' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9011' }),
  endpoints: (builder) => ({
    getWords: builder.query({
      query: (page = '0', group = '0') => `/words?group=${page}&page=${group}`,
    }),
    getWord: builder.query({
      query: (wordId) => `/words/${wordId}`,
    }),
  }),
});

export const { useGetWordsQuery, useGetWordQuery } = apiSlice;
