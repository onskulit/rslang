import { MAX_PAGE } from './../../common/constants/numbers';
import { IWord } from './../../common/types/interfaces';
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { IWordsQuery } from '../../common/types/interfaces';
import { API, BASE_URL, REDUCER_PATH } from '../../common/constants/api';
import { INITIAL_VALUE } from '../../common/constants/numbers';
import { DifficultyLevel } from '../../common/types/enums';

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
    getWordsForPage: builder.query<IWord[], IWordsQuery>({
      query: ({ group = DifficultyLevel.LEVEL_0, page = INITIAL_VALUE }) => ({
        url: API.words,
        params: {
          group: groupChecker(group),
          page: page,
        },
      }),
    }),
    getWordsForGroup: builder.query<IWord[], IWordsQuery>({
      async queryFn(
        { group = DifficultyLevel.LEVEL_0, page = MAX_PAGE },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const pages = [];
        for (let i = 0; i <= page; i++) {
          pages.push(i);
        }
        const results = await Promise.all(
          pages.map(async (page) => {
            const result = await fetchWithBQ(
              `/words?group=${groupChecker(group)}&page=${page}`
            );
            return result.data
              ? { data: result.data as IWord[] }
              : { error: result.error as FetchBaseQueryError };
          })
        );
        const failedResults = results.filter((result) => result.error);
        if (failedResults.length) {
          return { error: failedResults[0].error as FetchBaseQueryError };
        } else {
          const flatArr = results.map((result) => result.data).flat();
          return { data: flatArr as IWord[] };
        }
      },
    }),
    getWord: builder.query<IWord, string>({
      query: (wordId: string) => `${API.words}/${wordId}`,
    }),
  }),
});

export const {
  useGetWordsForPageQuery,
  useGetWordsForGroupQuery,
  useGetWordQuery,
} = apiSlice;
