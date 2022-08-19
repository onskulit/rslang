import { Word } from './../../common/types/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DifficultyLevel } from '../../common/types/enums';
import { WordsQuery } from '../../common/types/interfaces';

const BASE_URL = 'http://localhost:9011'; // http://localhost:9011 | https://rs-lang-en.herokuapp.com

function groupChecker(group: DifficultyLevel) {
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
    getWords: builder.query<Word[], WordsQuery>({
      query: ({ group = DifficultyLevel.LEVEL_0, page = 0 }) =>
        `/words?group=${groupChecker(group)}&page=${page}`,
    }),
    getWord: builder.query<Word, string>({
      query: (wordId: string) => `/words/${wordId}`,
    }),
  }),
});

export const { useGetWordsQuery, useGetWordQuery } = apiSlice;
