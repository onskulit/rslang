import { Word } from './../../common/types/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WordsQuery } from '../../common/types/interfaces';
import { API, BASE_URL, REDUCER_PATH } from '../../common/constants/api';
import { DifficultyLevel, INITIAL_VALUE } from '../../common/constants/numbers';

const groupChecker = (group: DifficultyLevel) => {
  if (group < DifficultyLevel.LEVEL_0) {
    return DifficultyLevel.LEVEL_0;
  } else if (group > DifficultyLevel.LEVEL_5) {
    return DifficultyLevel.LEVEL_5;
  }
  return group;
};

export const apiSlice = createApi({
  reducerPath: REDUCER_PATH,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getWords: builder.query<Word[], WordsQuery>({
      query: ({ group = DifficultyLevel.LEVEL_0, page = INITIAL_VALUE }) => ({
        url: API.words,
        params: {
          group: groupChecker(group),
          page: page,
        },
      }),
    }),
    getWord: builder.query<Word, string>({
      query: (wordId: string) => `${API.words}/${wordId}`,
    }),
  }),
});

export const { useGetWordsQuery, useGetWordQuery } = apiSlice;
