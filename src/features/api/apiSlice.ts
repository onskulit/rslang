import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WordsQuery } from '../../common/types/interfaces';

const BASE_URL = 'https://rs-lang-en.herokuapp.com'; // http://localhost:9011 | https://rs-lang-en.herokuapp.com

function groupChecker(group: number) {
  if (group < 0) {
    return 0;
  } else if (group > 5) {
    return 5;
  }
  return group;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getWords: builder.query({
      query: ({ group = 0, page = 0 }: WordsQuery) =>
        `/words?group=${groupChecker(group)}&page=${page}`,
    }),
    getWord: builder.query({
      query: (wordId: string) => `/words/${wordId}`,
    }),
  }),
});

export const { useGetWordsQuery, useGetWordQuery } = apiSlice;
